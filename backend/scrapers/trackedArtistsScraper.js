import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
puppeteer.use(StealthPlugin())
import Artist from '../models/artistModel.js'
import mongoose from 'mongoose';
import dotenv from "dotenv"
dotenv.config()
import proxyChain from "proxy-chain"

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Scrape concerts of a specified tracked artist
async function scrapeTrackedArtist(artistName) {
    // const proxyURL = "http://8c1442360abc3af99287fca5c58da5f3dbbed725:premium_proxy=true@proxy.zenrows.com:8001"
    // const newProxyURL = await proxyChain.anonymizeProxy({ url: proxyURL })
    const browser = await puppeteer.launch ({
        args: [
            //`--proxy-server=${newProxyURL}`,
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--disable-gpu",
            "--single-process",
            "--no-zygote",
        ],
        executablePath: process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
        protocolTimeout: 300000,
        ignoreHTTPSErrors: true,
	})

    try {
        let encodedName = encodeURIComponent(artistName)
        console.log("Navigating to Ticketmaster general page")
        const url = `https://www.ticketmaster.com/search?q=${encodedName}`
        const page = await browser.newPage()
        await page.setRequestInterception(true)
        page.on('request', interceptedRequest => {
            if (
                interceptedRequest.url().endsWith('.png') ||
                interceptedRequest.url().endsWith('.jpg')
            ) { 
                interceptedRequest.abort()
            } else {
                interceptedRequest.continue()
            }
        })
        await page.goto(url, {waitUntil: 'networkidle2', timeout: 300000})
        console.log("Page loaded")
        await page.setViewport({ width: 1080, height: 1024 })
        const pageContent = await page.content()
        console.log(pageContent)
        await delay(5000)
        await page.waitForFunction(
            'document.querySelectorAll("div.MDVIb").length > 0'
        )
        console.log("Event listings found, scraping now")
        const events = await page.evaluate(() => {
            let eventListings = document.querySelectorAll('div.MDVIb');
            console.log(`Found ${eventListings.length} event listings`);  // Debug log

            const events = [];

            eventListings.forEach(event => {
                let month = event.querySelector('div.sc-1evs0j0-1.gwWuEQ span')?.textContent
                let day = event.querySelector('div.sc-1evs0j0-2.ftHsmv span')?.textContent
                let time = event.querySelector('span.sc-1idcr5x-1.dieHWG span')?.textContent
                let title = event.querySelector('.sc-fyofxi-6 .sc-fyofxi-5')?.textContent
                let locationElements = event.querySelectorAll('.sc-fyofxi-7 .sc-fyofxi-5')
                let location = locationElements[0]?.textContent
                let venue = locationElements[1]?.textContent
                let ticketsLink = event.querySelector('div.sc-erggfp-0.ixLVeF a')?.href
                if (day) {
                    events.push ({
                        month,
                        day,
                        time,
                        location,
                        venue,
                        title,
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
        //await proxyChain.closeAnonymizedProxy(newProxyURL, true)
    }
}

// const events = await scrapeTrackedArtist("Taylor Swift")
export { scrapeTrackedArtist }