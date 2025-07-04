export const applicationSubmisionTemplate = (fullName:string,email:string,phone:string,status:string,createdAt:string | Date) =>
`
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <h2 style="color: #2c3e50;">New Learner Application Received</h2>
  
  <p>Dear Admin,</p>

  <p>We have received a new learner's application. Below are the details:</p>

  <ul style="padding-left: 20px;">
    <li><strong>Name:</strong> ${fullName}/li>
    <li><strong>Email:</strong> ${email}</li>
    <li><strong>Phone:</strong> ${phone || 'N/A'}</li>
    <li><strong>Submitted At:</strong> ${new Date(createdAt).toLocaleString()}</li>
    <li><strong>Status:</strong> ${status}</li>
  </ul>

  <p>Please review the application in the admin panel.</p>

  <p>Best regards,<br><strong>Learner Submission System</strong></p>
</div>
`;


export const statusUpdateTemplate = (fullName: string, status: string) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.5;">
    <h2>Hello ${fullName || 'Learner'},</h2>
    <p>Your application status has been updated to: <strong>${status}</strong>.</p>
    <p>Thank you for applying. We’ll keep you posted on any further updates.</p>
    <p>Best regards,<br><strong>The Team</strong></p>
  </div>
`;

