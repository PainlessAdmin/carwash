import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

interface BookingData {
  vehicle: string;
  vehicleLabel: string;
  service: string;
  serviceLabel: string;
  price: string;
  name: string;
  email: string;
  phone: string;
  date: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function getCustomerEmailHtml(data: BookingData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #19576d; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Painless Car & Van Wash</h1>
      <p style="color: #f5e642; margin: 10px 0 0 0; font-size: 14px;">Southmead, Bristol</p>
    </div>

    <div style="background-color: #ffffff; padding: 40px 30px; border-radius: 0 0 12px 12px;">
      <h2 style="color: #333; margin: 0 0 20px 0; font-size: 20px;">Hi ${data.name},</h2>

      <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
        Thank you for your booking request! We've received your details and will be in touch shortly to confirm your appointment.
      </p>

      <!-- Important Notice -->
      <div style="background-color: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 25px 0;">
        <p style="color: #92400e; margin: 0; font-weight: bold; font-size: 16px;">
          ⚠️ Your appointment is NOT confirmed yet
        </p>
        <p style="color: #a16207; margin: 10px 0 0 0; font-size: 14px;">
          A member of our team will call or text you shortly to confirm your booking. Please keep your phone nearby.
        </p>
      </div>

      <h3 style="color: #19576d; margin: 30px 0 15px 0; font-size: 16px; border-bottom: 2px solid #e5e5e5; padding-bottom: 10px;">
        Your Booking Details
      </h3>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; color: #666; border-bottom: 1px solid #eee;">Vehicle Type</td>
          <td style="padding: 12px 0; color: #333; font-weight: 600; text-align: right; border-bottom: 1px solid #eee;">${data.vehicleLabel}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #666; border-bottom: 1px solid #eee;">Service</td>
          <td style="padding: 12px 0; color: #333; font-weight: 600; text-align: right; border-bottom: 1px solid #eee;">${data.serviceLabel}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #666; border-bottom: 1px solid #eee;">Estimated Price</td>
          <td style="padding: 12px 0; color: #19576d; font-weight: 700; text-align: right; border-bottom: 1px solid #eee; font-size: 18px;">${data.price}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #666; border-bottom: 1px solid #eee;">Preferred Date</td>
          <td style="padding: 12px 0; color: #333; font-weight: 600; text-align: right; border-bottom: 1px solid #eee;">${formatDate(data.date)}</td>
        </tr>
      </table>

      <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 30px 0;">
        <h4 style="color: #333; margin: 0 0 10px 0; font-size: 14px;">📍 Our Location</h4>
        <p style="color: #666; margin: 0; font-size: 14px;">290-294 Southmead Road, Bristol BS10 5EN</p>
        <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">📞 07 977 889747</p>
        <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">🕐 Open 9am - 7pm, 7 days a week</p>
      </div>

      <p style="color: #666; line-height: 1.6; margin: 20px 0 0 0; font-size: 14px;">
        If you have any questions or need to modify your request, please don't hesitate to call us.
      </p>

      <p style="color: #666; margin: 30px 0 0 0;">
        See you soon!<br>
        <strong style="color: #19576d;">The Painless Car & Van Wash Team</strong>
      </p>
    </div>

    <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
      <p style="margin: 0;">© ${new Date().getFullYear()} Painless Van & Car Valeting Ltd</p>
      <p style="margin: 5px 0 0 0;">290-294 Southmead Road, Bristol BS10 5EN</p>
    </div>
  </div>
</body>
</html>
  `;
}

function getOfficeEmailHtml(data: BookingData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #19576d; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
      <h1 style="color: #f5e642; margin: 0; font-size: 24px;">🚗 New Booking Request</h1>
    </div>

    <div style="background-color: #ffffff; padding: 40px 30px; border-radius: 0 0 12px 12px;">

      <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px 20px; margin: 0 0 25px 0;">
        <p style="color: #1e40af; margin: 0; font-weight: bold;">Action Required</p>
        <p style="color: #1e40af; margin: 5px 0 0 0; font-size: 14px;">Please contact this customer to confirm their appointment.</p>
      </div>

      <h3 style="color: #19576d; margin: 0 0 15px 0; font-size: 16px; border-bottom: 2px solid #e5e5e5; padding-bottom: 10px;">
        Customer Details
      </h3>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; color: #666; border-bottom: 1px solid #eee; width: 40%;">Name</td>
          <td style="padding: 12px 0; color: #333; font-weight: 600; border-bottom: 1px solid #eee;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #666; border-bottom: 1px solid #eee;">Email</td>
          <td style="padding: 12px 0; color: #333; font-weight: 600; border-bottom: 1px solid #eee;">
            <a href="mailto:${data.email}" style="color: #19576d;">${data.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #666; border-bottom: 1px solid #eee;">Phone</td>
          <td style="padding: 12px 0; color: #333; font-weight: 700; border-bottom: 1px solid #eee; font-size: 18px;">
            <a href="tel:${data.phone}" style="color: #19576d;">${data.phone}</a>
          </td>
        </tr>
      </table>

      <h3 style="color: #19576d; margin: 30px 0 15px 0; font-size: 16px; border-bottom: 2px solid #e5e5e5; padding-bottom: 10px;">
        Booking Details
      </h3>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; color: #666; border-bottom: 1px solid #eee; width: 40%;">Vehicle Type</td>
          <td style="padding: 12px 0; color: #333; font-weight: 600; border-bottom: 1px solid #eee;">${data.vehicleLabel}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #666; border-bottom: 1px solid #eee;">Service</td>
          <td style="padding: 12px 0; color: #333; font-weight: 600; border-bottom: 1px solid #eee;">${data.serviceLabel}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #666; border-bottom: 1px solid #eee;">Estimated Price</td>
          <td style="padding: 12px 0; color: #19576d; font-weight: 700; border-bottom: 1px solid #eee; font-size: 18px;">${data.price}</td>
        </tr>
        <tr style="background-color: #f0fdf4;">
          <td style="padding: 12px; color: #166534; font-weight: 600;">Preferred Date</td>
          <td style="padding: 12px; color: #166534; font-weight: 700; font-size: 16px;">${formatDate(data.date)}</td>
        </tr>
      </table>

      <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
        <a href="tel:${data.phone}" style="display: inline-block; background-color: #19576d; color: #ffffff; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: 600;">
          📞 Call Customer Now
        </a>
      </div>

      <p style="color: #999; margin: 30px 0 0 0; font-size: 12px; text-align: center;">
        Sent at ${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: BookingData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.date || !data.service) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Send email to customer
    const customerEmail = await resend.emails.send({
      from: 'Painless Car & Van Wash <bookings@bristolcarwash.co.uk>',
      to: data.email,
      subject: `Booking Request Received - ${data.serviceLabel}`,
      html: getCustomerEmailHtml(data)
    });

    // Send email to office
    const officeEmail = await resend.emails.send({
      from: 'Website Bookings <bookings@bristolcarwash.co.uk>',
      to: 'office@bristolcarwash.co.uk',
      subject: `🚗 New Booking: ${data.name} - ${data.serviceLabel} - ${formatDate(data.date)}`,
      html: getOfficeEmailHtml(data)
    });

    return new Response(JSON.stringify({
      success: true,
      customerEmailId: customerEmail.data?.id,
      officeEmailId: officeEmail.data?.id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Booking error:', error);
    return new Response(JSON.stringify({ error: 'Failed to send booking' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
