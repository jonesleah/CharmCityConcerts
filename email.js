const nodeMailer = require('nodemailer');
const { getEvents } = require('./scraper');
const cron = require('node-cron')
require('dotenv').config();

function formatEmail(events) {
    if (!events || !Array.isArray(events) || events.length === 0) {
        console.error('Invalid or empty events data.');
        return '';
    }
    let html = `<html><head><style>table { border-collapse: collapse; } th, td { border: 1px solid black; padding: 8px; }</style></head><body>`;
    html += `<h2>Event Listings</h2>`;
    html += `<table>`;
    html += `<tr><th>Title</th><th>Date</th><th>Days</th><th>Location</th><th>URL</th></tr>`;

    events.forEach(event => {
        html += `<tr>`;
        html += `<td>${event.title}</td>`;
        html += `<td>${event.date}</td>`;
        html += `<td>${event.days}</td>`;
        html += `<td>${event.location}</td>`;
        html += `<td><a href="${event.url}">${event.url}</a></td>`;
        html += `</tr>`;
    });

    html += `</table></body></html>`;
    return html;
}


async function sendEmail() {
    const events = await getEvents();
    const html = formatEmail(events)
    const transporter = nodeMailer.createTransport ({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'leahjones1403@gmail.com',
            pass: process.env.SMTP_PASSWORD
        }
    });

    const info = await transporter.sendMail({
        from: 'CharmCityConcerts <leahjones1403@gmail.com>',
        to: 'leahjones1403@gmail.com',
        subject: 'Next Month\'s Concerts!',
        html: html
    })

    console.log("Message sent: " + info.messageId);
}

cron.schedule('0 9 1 * *', async () => {
    await sendEmail().catch(e => console.log(e));;
})