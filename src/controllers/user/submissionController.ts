import { Request, Response } from 'express';
import Submission, { ISubmission } from '../../models/Submission';
import { v4 as uuidv4 } from 'uuid';
import { sendMail } from '../../services/nodemailerService';
import { applicationSubmisionTemplate } from '../../utils/emailTemplates';
import { SubmissionStatus } from '../../utils/enums';

export const createSubmission = async (req: Request, res: Response): Promise<void> => {
  console.log("reached here")
  try {
    const { fullName, phoneNumber, email, dob, address, timestamp, aadhaar, photograph, signature } = req.body;


    // Age check (should be >= 18)
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    if (age < 18) {
      res.json({ ageLessthan18: true, message: 'Applicant must be at least 18 years old.' });
      return;
    }

    // Check if submission already exists (by email and dob)
    const existingSubmission = await Submission.findOne({ email });
    if (existingSubmission) {
      res.json({ existing: true, message: 'Submission already exists for this email and date of birth.' });
      return;
    }

    const submissionId = 'LL-' + uuidv4().split('-')[0].toUpperCase();
    const newSubmission: ISubmission = new Submission({
      fullName,
      phoneNumber,
      email,
      dob,
      address,
      aadhaar: aadhaar,
      photograph: photograph,
      signature: signature,
      submissionId,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      status: SubmissionStatus.Pending
    });
  
    await newSubmission.save();

    const htmlContent = applicationSubmisionTemplate(
      fullName,
      email,
      phoneNumber,
      SubmissionStatus.Pending,
      new Date() // Pass a Date object instead of a number
    );

    await sendMail(
      // process.env.ADMIN_EMAIL as string,
      process.env.LANE_EMAIL as string,
      `LEARNER'S APPLICATION`,
      htmlContent
    );

    res.status(201).json({ save: true, message: 'Submission successful', submissionId });
    return;
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

