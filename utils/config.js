import nodemailer from 'nodemailer'

const noreplyTransport = nodemailer.createTransport({
    port: 587,
    host: 'smtp-relay.brevo.com',
    secure: false,
    auth: {
        user: 'nemale6857@hebeer.com',
        pass: 'xsmtpsib-17ab387fe2b9afdc1a7b71e76463959bedbe056e153bad22eb2025713afaed38-q25VzNSkjwrUJcG9',
    },
})


export const sendEmail = async (subject, email, html) => {
    let mailOptions = {
      from: 'Ophir institute no-reply@ophirinstitute.com',
      to: email,
      subject: subject,
      html: html
    };
  
    try {
      await noreplyTransport.sendMail(mailOptions)
    }
    catch (err) {
      await noreplyTransport.sendMail(mailOptions)
    }
  }