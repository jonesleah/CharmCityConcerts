import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
puppeteer.use(StealthPlugin())
import Artist from '../models/artistModel.js'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


// Get all of the user's tracked artists from the db
async function getArtists() {
    try {
        const artists = await Artist.find()
        console.log(artists)
        return artists
    }
    catch (err) {
        console.log('Error getting artists:', err)
    }
}


// Scrape concerts of a specified tracked artist
async function scrapeTrackedArtist(artistName) {
    const browser = await puppeteer.launch ({
		headless: false,
		defaultViewport: null,
		userDataDir: "./tempDir"
	})

    try {
        let encodedName = encodeURIComponent(artistName)
        const url = `https://www.ticketmaster.com/search?q=${encodedName}`
        const page = await browser.newPage()
        await page.goto(url)
        await delay(5000)
        await page.waitForFunction(
            'document.querySelectorAll("div.MDVIb").length > 0',
            { timeout: 0 }
        );
        console.log("reached")
        const events = await page.evaluate(() => {
            console.log("reached2")
            let eventListings = document.querySelectorAll('div.MDVIb');
            console.log(`Found ${eventListings.length} event listings`);  // Debug log

            const events = [];

            eventListings.forEach(event => {
                let month = event.querySelector('div.sc-1evs0j0-1.gwWuEQ span')?.textContent
                let day = event.querySelector('div.sc-1evs0j0-2.ftHsmv span')?.textContent
                let time = event.querySelector('span.sc-1idcr5x-1.dieHWG span')?.textContent
                let title = event.querySelector('.sc-fyofxi-6 .sc-fyofxi-5')?.textContent
                let locationElements = event.querySelectorAll('.sc-fyofxi-7 .sc-fyofxi-5')
                let city = locationElements[0]?.textContent
                let venue = locationElements[1]?.textContent
                let ticketsLink = event.querySelector('div.sc-erggfp-0.ixLVeF a')?.href
                if (day) {
                    events.push ({
                        title,
                        month,
                        day,
                        time,
                        city,
                        venue,
                        ticketsLink
                    })
                }            
            });
            return events
        });
        console.log(events)
        return events
    }
    catch (err) {
        console.log('Error during scraping:', err)
    }
    finally {
        await browser.close()
    }
}


// Update artist's concerts in db
async function updateDB(artistName, events) {
    const artist = await Artist.findOne({ name: artistName })
    if (artist) {
        events.forEach(async event => {
            artist.concerts.push ({
                month: event.month,
                day: event.day,
                time: event.time,
                location: event.location,
                venue: event.venue,
                title: event.title,
                ticketsLink: event.ticketsLinks
            })
        })
        await artist.save()
        console.log(`${artistName}'s concerts added to db`)
    }
    else {
        console.log(`Could not find ${artistName} in db`)
    }
}

// // Scrape ALL tracked artists in db and update db contents
// async function scrapeAllArtists() {
//     const artists = await getArtists()
//     for (const artist of artists) {
//         const events = await scrapeTrackedArtist(artist.name);
//         await updateDB(artist.name, events);
//     }

// }

scrapeTrackedArtist("Taylor Swift")
export { scrapeTrackedArtist }