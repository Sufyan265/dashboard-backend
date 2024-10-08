const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendEmail = async (options) => {
    try {
        await transporter.sendMail(options);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
