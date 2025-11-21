import { chromium } from '@playwright/test'

export interface DemoSetupOptions {
  height: number
  url: string
  width: number
}

export async function demoSetup({ height, url, width }: DemoSetupOptions) {
  const browser = await chromium.launch({
    headless: false,
  })
  const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/',
      size: { height, width },
    },
    screen: { height, width },
    viewport: { height, width },
  })
  const page = await context.newPage()
  await page.goto(url)
  return {
    browser,
    context,
    page,
  }
}
