import { Injectable, Logger } from '@nestjs/common'; // Добавим логгер
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendResetCode(email: string, code: string) {
    try {
      await this.transporter.sendMail({
        from: `"SpaceFlow Support" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Verification Code',
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>Restore Access</h2>
            <p>Your verification code is: <b style="font-size: 1.2em; color: #8b5cf6;">${code}</b></p>
            <p>This code expires in 15 minutes.</p>
          </div>
        `,
      });
      this.logger.log(`Email sent successfully to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${email}`, error.stack);
      throw error;
    }
  }
}
