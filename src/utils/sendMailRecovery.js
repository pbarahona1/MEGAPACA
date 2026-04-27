const HTMLRecoveryEmail = (name, code) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            .button {
                background-color: #ff4500;
                color: white;
                padding: 15px 25px;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                display: inline-block;
                font-size: 20px;
                letter-spacing: 2px;
            }
        </style>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #2c2f33; color: #ffffff; padding: 40px; border-radius: 10px; text-align: center;">
            <h1 style="color: #ffffff;">Password Recovery</h1>
            <p>Hello <strong>${name}</strong>,</p>
            <p>We received a request to reset your password. Use the verification code below to proceed:</p>
           
            <div style="margin: 30px 0;">
                <span class="button">${code}</span>
            </div>
           
            <p style="color: #99aab5; font-size: 14px;">This code is valid for the next 15 minutes. If you didn't request this email, you can safely ignore it.</p>
            <hr style="border: 0; border-top: 1px solid #4f545c; margin: 30px 0;">
            <p style="font-size: 12px; color: #72767d;">If you need further assistance, please contact our support team.</p>
        </div>
    </body>
    </html>
    `;
};
 
export default HTMLRecoveryEmail;
 