import type { Page } from '@playwright/test'

export async function demoCloseToast(page: Page) {
  await page.waitForTimeout(300)
  await page.getByRole('button', { name: 'Close toast' }).click()
}
export async function demoPageToolsTokenCreator(page: Page) {
  await page.getByRole('link', { name: 'Tools' }).click()
  await page.waitForTimeout(500)
  await page.getByRole('link', { name: 'Token Creator' }).click()
  await page.waitForTimeout(1000)

  const mintDecimalsInput = page.getByPlaceholder('Decimals')
  await mintDecimalsInput.fill('5')
  await page.waitForTimeout(300)

  const mintSupplyInput = page.getByPlaceholder('Supply')
  await mintSupplyInput.fill('10000')

  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: 'Create Token' }).click()
  await page.waitForTimeout(1000)
  await page.getByRole('link', { name: 'Portfolio' }).click()
}
