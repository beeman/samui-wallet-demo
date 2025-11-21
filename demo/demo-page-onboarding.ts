import type { Page } from '@playwright/test'

export async function demoPageOnboarding(page: Page, { mnemonic }: { mnemonic?: string }) {
  // Remove the Experimental Software banner
  await page.getByRole('button').click()
  await page.waitForTimeout(1000)

  // Either import or generate
  if (!mnemonic?.length) {
    await demoPageOnboardingCreate(page)
    return
  }
  await demoPageOnboardingImport(page, { mnemonic })
}

async function demoPageOnboardingCreate(page: Page) {
  await page.getByRole('link', { name: 'Create a new wallet' }).click()
  await page.waitForTimeout(500)
  await page.getByRole('button', { name: 'Create wallet' }).click()
}

async function demoPageOnboardingImport(page: Page, { mnemonic }: { mnemonic: string }) {
  await page.getByRole('link', { name: 'I already have a wallet' }).click()

  const words = mnemonic.split(' ')
  for (let i = 0; i < words.length; i++) {
    await page.fill(`#word-${i + 1}`, words[i] as string)
  }

  await page.getByRole('button', { name: 'Import wallet' }).click()
}
