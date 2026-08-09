import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendOtpEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"ClipMyGame" <${process.env.EMAIL}>`,
    to: email,
    subject: "Verify Your ClipMyGame Account",

    html: `
      <div style="font-family:sans-serif">
        <h2>Welcome to ClipMyGame 🏆</h2>

        <p>Your verification code is</p>

        <h1>${otp}</h1>

        <p>This OTP expires in 10 minutes.</p>
      </div>
    `,
  });
};
