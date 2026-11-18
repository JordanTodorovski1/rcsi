import {chromium} from '/Users/jordantodorovski/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const browser=await chromium.launch({executablePath:'/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(String(e)));await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});await page.screenshot({path:'research/home-desktop.png',fullPage:true});await page.setViewportSize({width:390,height:844});await page.screenshot({path:'research/home-mobile.png',fullPage:true});console.log({title:await page.title(),errors});await browser.close();
