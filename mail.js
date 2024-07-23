import nodemailer from 'nodemailer';
import { google } from 'googleapis';

// Replace with your actual credentials and details
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'YOUR_EMAIL@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: 'YOUR_EMAIL@gmail.com',
      to: 'RECEIVER_EMAIL@gmail.com',
      subject: 'Test Email from Node.js',
      text: 'Hello from Node.js!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Template</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #4CAF50;
              color: white;
              padding: 10px 0;
              text-align: center;
            }
            .content {
              padding: 20px;
              text-align: left;
            }
            .footer {
              background-color: #f4f4f4;
              color: #555555;
              text-align: center;
              padding: 10px 0;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Bookstore Notification</h1>
            </div>
            <div class="content">
              <p>Dear [Recipient],</p>
              <p>We are excited to inform you about the latest updates in our bookstore. We have added new books to our collection and we have special offers just for you!</p>
              <p>Thank you for being a valued customer. We hope you enjoy our new selection of books.</p>
              <p>Best regards,</p>
              <p>Bookstore Team</p>
            </div>
            <div class="footer">
              <p>&copy; 2024 Bookstore. All rights reserved.</p>
              <p><a href="#">Unsubscribe</a> | <a href="#">Privacy Policy</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const result = await transport.sendMail(mailOptions);
    console.log('Email sent...', result);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
}

sendMail();
