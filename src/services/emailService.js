import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async (recipient, subject, htmlContent) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false // Ignorar certificados autofirmados
            }
        });
        // Configuración del correo
        let info = await transporter.sendMail({
            from: `"Ecommerce" <${process.env.EMAIL_USER}>`,
            to: recipient,
            subject: subject,
            html: htmlContent
        });
    } catch (error) {
        console.error(`Error al enviar el correo a ${recipient} con el asunto "${subject}":`, error);
    }
}
