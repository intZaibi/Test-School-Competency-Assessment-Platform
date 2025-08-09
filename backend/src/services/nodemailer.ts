import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Email utility for sending various types of emails
 */
const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });


  /**
   * Send OTP verification email
   */
  const sendOTPEmail = async (email: string, otp: string, name: string): Promise<void> => {
    const subject = 'Test School - Email Verification OTP';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Test School Assessment Platform</h2>
        <p>Hello ${name},</p>
        <p>Your email verification OTP is:</p>
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #007bff; font-size: 32px; margin: 0;">${otp}</h1>
        </div>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you didn't request this verification, please ignore this email.</p>
        <p>Best regards,<br>Test School Team</p>
      </div>
    `;

    await sendEmail(email, subject, html);
  }

  /**
   * Send password reset email
   */
  const sendPasswordResetEmail = async (email: string, resetToken: string, name: string): Promise<void> => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const subject = 'Test School - Password Reset Request';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Test School Assessment Platform</h2>
        <p>Hello ${name},</p>
        <p>You requested a password reset for your account.</p>
        <p>Click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
        </div>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this reset, please ignore this email.</p>
        <p>Best regards,<br>Test School Team</p>
      </div>
    `;

    await sendEmail(email, subject, html);
  }

  /**
   * Send certificate email
   */
  const sendCertificateEmail = async (email: string, name: string, certificateUrl: string, level: string): Promise<void> => {
    const subject = 'Test School - Your Assessment Certificate';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Test School Assessment Platform</h2>
        <p>Congratulations ${name}!</p>
        <p>You have successfully completed the competency assessment and achieved level <strong>${level}</strong>.</p>
        <p>Your digital certificate is ready for download:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${certificateUrl}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Download Certificate</a>
        </div>
        <p>Keep this certificate safe as proof of your competency level.</p>
        <p>Best regards,<br>Test School Team</p>
      </div>
    `;

    await sendEmail(email, subject, html);
  }

  /**
   * Send welcome email
   */
  const sendWelcomeEmail = async (email: string, name: string): Promise<void> => {
    const subject = 'Welcome to Test School Assessment Platform';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Test School Assessment Platform</h2>
        <p>Hello ${name},</p>
        <p>Welcome to the Test School Competency Assessment Platform!</p>
        <p>Your account has been successfully created and verified.</p>
        <p>You can now:</p>
        <ul>
          <li>Take competency assessments</li>
          <li>Track your progress</li>
          <li>Download your certificates</li>
          <li>View your assessment history</li>
        </ul>
        <p>Start your assessment journey today!</p>
        <p>Best regards,<br>Test School Team</p>
      </div>
    `;

    await sendEmail(email, subject, html);
  }

  /**
   * Generic email sending method
   */
  const sendEmail = async (to: string, subject: string, html: string): Promise<void> => {
    try {
      const mailOptions = {
        from: `"Test School" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${to}: ${info.messageId}`);
    } catch (error) {
      console.log(`Failed to send email to ${to}:`, error);
      throw new Error('Failed to send email');
    }
  }

  /**
   * Verify email configuration
   */
  const verifyConnection = async (): Promise<boolean> => {
    try {
      await transporter.verify();
      console.log('Email service connection verified');
      return true;
    } catch (error) {
      console.log('Email service connection failed:', error);
      return false;
    }
  }

export { sendOTPEmail, sendPasswordResetEmail, sendCertificateEmail, sendWelcomeEmail, verifyConnection };
