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
    const safe = Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, escapeHtml(value)]));

    await transporter.sendMail({
      from: `${senderName} <${smtpEmail}>`,
      to: recipient,
      replyTo: fields.email,
      subject: `Portfolio Contact: ${fields.subject.replace(/[\r\n]/g, ' ')}`,
      text: `Name: ${fields.name}\nEmail: ${fields.email}\nSubject: ${fields.subject}\n\n${fields.message}`,
      html: `<!doctype html>
        <html lang="en">
          <body style="margin:0;padding:0;background:#07080d;font-family:Arial,sans-serif;color:#f7f8fb;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#07080d;padding:32px 12px;">
              <tr><td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#12131b;border:1px solid #303342;border-radius:20px;overflow:hidden;">
                  <tr>
                    <td width="34%" height="4" style="background:#5488ff;font-size:0;line-height:0;">&nbsp;</td>
                    <td width="33%" height="4" style="background:#8c6cff;font-size:0;line-height:0;">&nbsp;</td>
                    <td width="33%" height="4" style="background:#ff4d59;font-size:0;line-height:0;">&nbsp;</td>
                  </tr>
                  <tr><td colspan="3" style="padding:32px 32px 18px;">
                    <p style="margin:0 0 8px;color:#9ab2ff;font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;">Portfolio Contact</p>
                    <h1 style="margin:0;color:#ffffff;font-size:26px;line-height:1.25;">New message received</h1>
                    <p style="margin:10px 0 0;color:#9ca3b3;font-size:14px;line-height:1.6;">A visitor submitted the contact form on your portfolio.</p>
                  </td></tr>
                  <tr><td colspan="3" style="padding:0 32px 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;border-spacing:0;background:#191b27;border:1px solid #2b2e3d;border-radius:14px;overflow:hidden;">
                      <tr>
                        <td style="width:110px;padding:14px 16px;border-bottom:1px solid #2b2e3d;color:#8ba9ff;font-size:12px;font-weight:700;text-transform:uppercase;">Name</td>
                        <td style="padding:14px 16px;border-bottom:1px solid #2b2e3d;color:#f7f8fb;font-size:14px;">${safe.name}</td>
                      </tr>
                      <tr>
                        <td style="padding:14px 16px;border-bottom:1px solid #2b2e3d;color:#8ba9ff;font-size:12px;font-weight:700;text-transform:uppercase;">Email</td>
                        <td style="padding:14px 16px;border-bottom:1px solid #2b2e3d;font-size:14px;"><a href="mailto:${safe.email}" style="color:#b8c9ff;text-decoration:none;">${safe.email}</a></td>
                      </tr>
                      <tr>
                        <td style="padding:14px 16px;color:#8ba9ff;font-size:12px;font-weight:700;text-transform:uppercase;">Subject</td>
                        <td style="padding:14px 16px;color:#f7f8fb;font-size:14px;">${safe.subject}</td>
                      </tr>
                    </table>
                  </td></tr>
                  <tr><td colspan="3" style="padding:0 32px 32px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0d0f17;border-left:3px solid #8c6cff;border-radius:10px;">
                      <tr><td style="padding:20px;color:#d9dfeb;font-size:15px;line-height:1.7;">${safe.message.replaceAll('\n', '<br>')}</td></tr>
                    </table>
                    <p style="margin:20px 0 0;color:#747b8d;font-size:12px;line-height:1.5;">Reply directly to this email to respond to ${safe.name}.</p>
                  </td></tr>
                </table>
              </td></tr>
            </table>
          </body>
        </html>`,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Contact email failed:', error);
    return Response.json({ error: 'Unable to send your message right now.' }, { status: 500 });
  }
}
