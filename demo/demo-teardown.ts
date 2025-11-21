import type { Context } from 'node:vm'
import type { Browser, Page } from '@playwright/test'
import { convertVideo } from './convert-video.ts'

interface DemoTeardownOptions {
  browser: Browser
  context: Context
  page: Page
  saveVideo?: boolean
}

export async function demoTeardown({ browser, context, page, saveVideo }: DemoTeardownOptions) {
  await context.close()
  await browser.close()

  if (saveVideo) {
    const videoPathWebm = await page.video()?.path()
    if (videoPathWebm) {
      const videoPathMp4 = await convertVideo(videoPathWebm)
      console.log(`Video saved`, {
        videoPathMp4,
        videoPathWebm,
      })
    }
  }
  console.log('Done!')
}
