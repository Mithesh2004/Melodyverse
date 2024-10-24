import Mailjet from 'node-mailjet';
import dotenv from 'dotenv'
dotenv.config()

const apiKey = process.env.MAILJET_API_KEY
const secretKey = process.env.MAILJET_SECRET_KEY

if(!apiKey || !secretKey) throw new Error("No Mailjet API key or Secret key ")

const mailjet = Mailjet.apiConnect(
    apiKey, // Replace with your API key
    secretKey // Replace with your API secret
);

export const sendEmail = async (options) => {
    const { fromEmail, fromName, toEmail, toName, subject, textPart, htmlPart, customId } = options;

    const request = {
        Messages: [
            {
                From: {
                    Email: fromEmail,
                    Name: fromName
                },
                To: [
                    {
                        Email: toEmail,
                        Name: toName
                    }
                ],
                Subject: subject,
                TextPart: textPart,
                HTMLPart: htmlPart,
                CustomID: customId
            }
        ]
    };

    try {
        const result = await mailjet.post("send", { version: 'v3.1' }).request(request);
        console.log(result.body);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');
    }
};