import nodemailer from 'nodemailer';

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const body = await req.json();
  const { name, email, contactNumber } = body;

  const ownerEmail = 'villanuevajohn519@gmail.com';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Send to owner
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: ownerEmail,
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nContact Number: ${contactNumber}`,
    });

    // Send thank-you email to client
    await transporter.sendMail({
      from: `"Your Business" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank You for Contacting Us!',
      text: `Hi ${name},\n\nThank you for reaching out. We'll be in touch shortly.\n\n— Your Company`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
  }
}
