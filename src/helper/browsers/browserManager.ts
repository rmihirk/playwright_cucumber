import { LaunchOptions, chromium, firefox, webkit } from "playwright-core";
let headmodeParValue = (process.env.npm_config_HEADLESS || "false").toLowerCase() === "true"
let headmode = Boolean(headmodeParValue)

const options: LaunchOptions = {
    headless: headmode
}

export const invokeBrowser = () => {
    const browserType = process.env.npm_config_BROWSER || "chrome";
    switch (browserType) {
        case "chrome":
            return chromium.launch({ channel: 'chrome', ...options });
        case "firefox":
            return firefox.launch(options);
        case "webkit":
            return webkit.launch(options);
        case "edge":
            return chromium.launch({ channel: 'msedge', ...options }); // Launch Edge using Chromium.Need to enable remoteDebugging in the system for Edge before execution     
        default:
            throw new Error("Please set the proper browser!")
    }
}