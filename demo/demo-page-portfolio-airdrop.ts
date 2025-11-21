import type { Page } from '@playwright/test'

export async function demoPagePortfolioAirdrop(page: Page) {
  await page.getByRole('button', { name: 'Request Airdrop' }).click()
}
