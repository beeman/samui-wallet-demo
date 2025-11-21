import { demoPageOnboarding } from './demo-page-onboarding.ts'
import { demoPagePortfolioAirdrop } from './demo-page-portfolio-airdrop.ts'
import { demoCloseToast, demoPageToolsTokenCreator } from './demo-page-tools-token-creator.ts'
import { demoSetup, type DemoSetupOptions } from './demo-setup.ts'
import { demoTeardown } from './demo-teardown.ts'

export interface DemoOptions extends DemoSetupOptions {
  mnemonic?: string
  saveVideo?: boolean
  sleepOnEnd?: number
}

export async function demo({ height, mnemonic, saveVideo = false, sleepOnEnd = 1000, url, width }: DemoOptions) {
  const { browser, context, page } = await demoSetup({ height, url, width })

  await demoPageOnboarding(page, { mnemonic })
  await demoCloseToast(page)

  await page.waitForTimeout(1000)
  await demoPagePortfolioAirdrop(page)
  await demoCloseToast(page)

  await page.waitForTimeout(300)
  await demoPageToolsTokenCreator(page)
  await demoCloseToast(page)

  await page.waitForTimeout(sleepOnEnd)

  await demoTeardown({ browser, context, page, saveVideo })
}
