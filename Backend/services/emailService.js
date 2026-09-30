const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendFacultyRegistrationEmail = async ({
  facultyName,
  facultyEmail,
  facultyPassword,
}) => {
  const mailOptions = {
    from: `"OpenQG" <${process.env.EMAIL_USER}>`,
    to: facultyEmail,
    subject: "Your OpenQG Faculty Account Has Been Created",

    text: `Dear ${facultyName},

Your faculty account has been successfully created by the OpenQG administrator.

Your OpenQG login credentials are:

Registered Email: ${facultyEmail}
Password: ${facultyPassword}

You can now use these credentials to log in to OpenQG.

Please keep your password secure and do not share it with anyone.

Regards,
OpenQG Team`,

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

        <h2>Welcome to OpenQG</h2>

        <p>Dear <strong>${facultyName}</strong>,</p>

        <p>
          Your faculty account has been successfully created by
          the <strong>OpenQG administrator</strong>.
        </p>

        <p>Your OpenQG login credentials are:</p>

        <div style="
          background-color: #f5f5f5;
          padding: 15px;
          border-radius: 8px;
          margin: 15px 0;
        ">
          <p>
            <strong>Registered Email:</strong><br />
            ${facultyEmail}
          </p>

          <p>
            <strong>Password:</strong><br />
            ${facultyPassword}
          </p>
        </div>

        <p>
          You can now use these credentials to log in to
          <strong>OpenQG</strong>.
        </p>

        <p>
          Please keep your password secure and do not share it with anyone.
        </p>

        <br />

        <p>
          Regards,<br />
          <strong>OpenQG Team</strong>
        </p>

      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendFacultyRegistrationEmail,
};