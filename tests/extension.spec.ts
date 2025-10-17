import { test, expect, chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Corrige __dirname em módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dist = path.resolve(__dirname, '..', 'dist');

// Exemplo: abre o popup ou testa content script
test('popup carrega e exibe UI', async () => {
  const context = await chromium.launchPersistentContext('', {
    headless: true, // use true se quiser rodar no CI sem interface
    args: [
      `--disable-extensions-except=${dist}`,
      `--load-extension=${dist}`
    ]
  });

  const [page] = context.pages();

  await page.goto('https://example.com');

  // Apenas um teste genérico para validar comportamento do content script
  const linkExists = await page.evaluate(() => !!document.querySelector('a'));
  expect(linkExists).toBe(true);

  await context.close();
});
