import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER || '',
                pass: process.env.SMTP_PASS || '',
            },
        });
    }

    public async sendEmail(to: string, subject: string, text: string, html?: string): Promise<void> {
        const mailOptions = {
            from: `"Mongolian Youth Nadam" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
            ...(html && { html }),
        };
        await this.transporter.sendMail(mailOptions);
        console.log('Email sent to:', to);
    }

    public async sendConfirmationEmail(to: string, name: string): Promise<void> {
        const subject = 'モンゴル青年ナーダム - 参加登録完了';
        const text = `${name} 様\n\nモンゴル青年ナーダムへのご登録ありがとうございます。\nご参加をお待ちしております！\n\nMongolian Youth Nadam Team`;
        const html = `
            <h2>${name} 様</h2>
            <p>モンゴル青年ナーダムへのご登録ありがとうございます。</p>
            <p>ご参加をお待ちしております！</p>
            <br>
            <p>Mongolian Youth Nadam Team</p>
        `;
        await this.sendEmail(to, subject, text, html);
    }
}
