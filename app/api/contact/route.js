import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const limits = { name: 100, email: 254, subject: 160, message: 5000 };

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

export async function POST(request) {
  try {
    const body = await request.json();
    const website = typeof body.website === 'string' ? body.website.trim() : '';
    if (website) return Response.json({ ok: true });

    const fields = Object.fromEntries(
      ['name', 'email', 'subject', 'message'].map((key) => [key, typeof body[key] === 'string' ? body[key].trim() : '']),
    );

    const invalid = Object.entries(fields).some(([key, value]) => !value || value.length > limits[key]);
    if (invalid || !emailPattern.test(fields.email)) {
      return Response.json({ error: 'Please check the form fields and try again.' }, { status: 400 });
    }

    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpAppPassword = process.env.SMTP_APP_PASSWORD;
    const recipient = process.env.CONTACT_TO_EMAIL || smtpEmail;
    const senderName = process.env.SMTP_FROM_NAME || 'Portfolio No-Reply';
    if (!smtpEmail || !smtpAppPassword || !recipient) {
      console.error('Contact email environment variables are missing.');
      return Response.json({ error: 'Email service is not configured.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: smtpEmail, pass: smtpAppPassword },
    });

    await transporter.sendMail({
      from: `${senderName} <${smtpEmail}>`,
      to: recipient,
      replyTo: fields.email,
      subject: `Portfolio Contact: ${fields.subject.replace(/[\r\n]/g, ' ')}`,
      text: `Name: ${fields.name}\nEmail: ${fields.email}\nSubject: ${fields.subject}\n\n${fields.message}`,
      html: `
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${escapeHtml(fields.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(fields.subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(fields.message).replaceAll('\n', '<br>')}</p>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Contact email failed:', error);
    return Response.json({ error: 'Unable to send your message right now.' }, { status: 500 });
  }
}
