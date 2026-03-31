import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendNotification = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: `"HMIF UMJ" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log(`Email berhasil dikirim ke: ${to}`);
  } catch (error) {
    console.error("Gagal kirim email:", error);
  }
};

export default transporter;
