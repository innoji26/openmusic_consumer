const nodemailer = require('nodemailer');

class MailSender {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_ADDRESS,
                pass: process.env.MAIL_PASSWORD,
            },
        });
    }

    sendEmail(targetEmail, content) {
        const message = {
            from: `"OpenMusic App" <${process.env.MAIL_ADDRESS}>`,
            to: targetEmail,
            subject: 'Ekspor Playlist',
            text: 'Terlampir hasil dari ekspor Playlist',
            attachments: [{
                filename: 'playlists.json',
                content,
                contentType: 'application/json',
            }, ],
        };

        return this.transporter.sendMail(message);
    }
}

module.exports = MailSender;