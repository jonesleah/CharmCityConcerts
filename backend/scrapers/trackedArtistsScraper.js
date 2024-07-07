import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
puppeteer.use(StealthPlugin())

// Scrape concerts of tracked artists
async function scrapeTrackedArtists(artistName) {

}

export { scrapeTrackedArtists }