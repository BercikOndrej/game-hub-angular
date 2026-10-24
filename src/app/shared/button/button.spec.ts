import { Component } from '@angular/core';
import { render } from 'vitest-browser-angular';
import { describe, expect, it } from 'vitest';

import { Button } from './button';

describe('Button', () => {
  it('is enabled by default', async () => {
    const { locator } = await render(Button);

    await expect.element(locator.getByRole('button')).not.toBeDisabled();
  });

  it('disables the native button when the disabled input is true', async () => {
    const { locator } = await render(Button, {
      inputs: { disabled: true },
    });

    await expect.element(locator.getByRole('button')).toBeDisabled();
  });

  it('projects content into the button', async () => {
    @Component({
      imports: [Button],
      template: `<app-button>Play</app-button>`,
    })
    class ButtonHost {}

    const { locator } = await render(ButtonHost);

    await expect.element(locator.getByRole('button', { name: 'Play' })).toBeVisible();
  });

  it('omits popup ARIA attributes by default', async () => {
    const { locator } = await render(Button);

    const button = locator.getByRole('button');
    await expect.element(button).not.toHaveAttribute('aria-haspopup');
    await expect.element(button).not.toHaveAttribute('aria-expanded');
  });

  it('forwards popup ARIA attributes to the native button', async () => {
    const { locator } = await render(Button, {
      inputs: { ariaHasPopup: 'listbox', ariaExpanded: false },
    });

    const button = locator.getByRole('button');
    await expect.element(button).toHaveAttribute('aria-haspopup', 'listbox');
    await expect.element(button).toHaveAttribute('aria-expanded', 'false');
  });
});
