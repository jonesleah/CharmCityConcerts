import pkg from 'puppeteer-extra';
const { use, launch } = pkg;
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
use(StealthPlugin())

// Scrape all popular concerts near me for the following month
function getDateRange() {
    const currentDate = new Date()
    const nextMonthFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    const nextMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0)
    const firstDay = formatDate(nextMonthFirstDay)
    const lastDay = formatDate(nextMonthLastDay)
    return { firstDay: firstDay, lastDay: lastDay }
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}${month}${day}`;
}

async function getEvents() {
	const browser = await launch({
		headless: false,
		defaultViewport: null,
		userDataDir: "./tempDir"
	});

	const { firstDay, lastDay } = getDateRange()
	const url = `https://www.ticketmaster.com/discover/concerts/baltimore?sort=relevance%2Cdesc&daterange=from${firstDay}-${lastDay}`
	console.log(url)
	const page = await browser.newPage()
	await page.goto(url)

	const events = await page.evaluate(() => {
		const eventListings = document.querySelectorAll('div.event-listing__item')
		const events = []
		eventListings.forEach(event => {
			let url = event.querySelector('a')
			let date = event.querySelector('div.event-listing__date .event-tile__date-title')
			let days = event.querySelector('div.event-listing__date .event-tile__sub-title')
			let title = event.querySelector('div.header .event-tile__title')
			let location = event.querySelector('div.header .event-tile__sub-title')
			
			events.push({
				url: url.href,
				date: date.textContent,
				days: days.textContent,
				title: title.textContent,
				location: location.textContent
			});
			
		});
		
		return events
	});

	console.log(events)
	await browser.close()
	return events
}

//getEvents()
export default { getEvents }