import { Request, Response } from 'express';
import { signAdminToken } from '../../services/jwtService';
import Submission, { ISubmission } from '../../models/Submission';
import { sendMail } from '../../services/nodemailerService';
import { statusUpdateTemplate } from '../../utils/emailTemplates';
import { EmailTemplateSubject } from '../../utils/enums';

export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const {email,password} = req.body
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token =  signAdminToken(email);
        res.cookie('admin_token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: false, 
          });
        res.status(200).json({ message: 'Login successful', token });
        return;
    }else{
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};

export const getAllSubmissions = async (req:Request,res:Response): Promise<void>  =>{
    try {
      const submissionData = await Submission.find({})
      res.status(200).json({ message: 'Login successful', submissionData });
    } catch (error: unknown) {
      res.status(500).json({ message: 'Server error' });
      return;
    }
  }

export const updateSubmissionStatus = async (req:Request,res:Response): Promise<void>  =>{
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const updated = await Submission.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!updated) {
        res.status(404).json({ message: 'Submission not found' });
        return;
      }
      const htmlContent = statusUpdateTemplate(updated.fullName, status);

      await sendMail(process.env.LANE_EMAIL as string, EmailTemplateSubject.updation, htmlContent);
  
      res.json({ message: 'Status updated successfully', submission: updated });
    } catch (err: unknown) {
      res.status(500).json({ message: 'Error updating status', error: err });
    }
  }