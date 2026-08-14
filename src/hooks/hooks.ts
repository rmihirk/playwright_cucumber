import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext } from 'playwright';
import { options } from "../utils/logger";
import { createLogger } from "winston";
import { invokeBrowser } from '../helper/browsers/browserManager';
import { fixture } from './fixtures';
import { getEnv } from '../env/env';
import { SHOTS_DIR, VIDS_DIR, ensureOutputDirs, safeName, ffmpegAvailable, convertWebmToMp4, copyWebmToOut } from './video-converter';

import * as fs from 'fs';
import * as path from 'path';

let browser: Browser;
let context: BrowserContext;

setDefaultTimeout(60000);

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
  const scenarioName = pickle.name
  context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: process.env.RECORD_VIDEO === "YES" ? { dir: './reports/videos' } : undefined,
  });
  const page = await context.newPage();
  fixture.page = page;
  fixture.logger = createLogger(options(scenarioName));
});

After(async function ({ pickle }) {
  ensureOutputDirs();
  const scenarioName = safeName(pickle.name);

  // --- 1) Screenshot (PNG) ---
  const pngPath = path.join(SHOTS_DIR, `${scenarioName}.png`);
  const screenshotBuffer = await fixture.page.screenshot({
    path: pngPath,
    type: 'png',
    fullPage: false, // set true if you prefer full-page
  });

  // Always await attach in cucumber-js
  this.attach(screenshotBuffer, 'image/png');

  // --- 2) Grab Video object BEFORE closing page/context ---
  const videoObj = fixture.page.video();

  // --- 3) Close Playwright resources ---
  await fixture.page.close();
  await context.close();

  // --- 4) Video handling (copy, convert, attach as HTML) ---
  const recordVideo = process.env.RECORD_VIDEO === 'YES';
  const convertToMp4 = process.env.CONVERT_TO_MP4 === 'YES';

  if (recordVideo && videoObj) {
    const webmSourcePath = await videoObj.path(); // resolves after close
    const webmOutPath = copyWebmToOut(webmSourcePath, scenarioName);

    // Default to WebM
    let finalPath = webmOutPath;
    let finalMime = 'video/webm';

    // Optional conversion to MP4 (if ffmpeg is available)
    if (convertToMp4 && await ffmpegAvailable()) {
      try {
        const mp4OutPath = path.join(VIDS_DIR, `${scenarioName}.mp4`);
        await convertWebmToMp4(webmOutPath, mp4OutPath);
        finalPath = mp4OutPath;
        finalMime = 'video/mp4';
      } catch (err) {
        console.error('Video conversion failed, using WebM instead:', err);
      }
    }

    const bin = fs.readFileSync(finalPath);
    await this.attach(bin, finalMime);
  }

});

AfterAll(async function () {
  await browser.close();
});