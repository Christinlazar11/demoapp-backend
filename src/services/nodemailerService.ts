// utils/mailer.ts

import nodemailer from 'nodemailer';

export const sendMail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use "host", "port", and "auth" for other providers
    auth: {
      user: process.env.SMTP_EMAIL,       // your email
      pass: process.env.SMTP_PASSWORD     // your app password or email password
    }
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
