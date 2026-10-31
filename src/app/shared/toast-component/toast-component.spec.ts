import { render } from 'vitest-browser-angular';
import { page } from 'vitest/browser';
import { ToastComponent } from './toast-component';

const TEST_MESSAGE = 'Test message';

describe('ToastComponent', () => {
  it.each([
    { variant: 'INFO', className: 'toast--info', role: 'status', ariaLive: 'polite' },
    {
      variant: 'WARNING',
      className: 'toast--warning',
      role: 'status',
      ariaLive: 'polite',
    },
    {
      variant: 'DANGER',
      className: 'toast--danger',
      role: 'alert',
      ariaLive: 'assertive',
    },
    {
      variant: 'SUCCESS',
      className: 'toast--success',
      role: 'status',
      ariaLive: 'polite',
    },
  ])(
    'renders the $variant variant with role="$role" and aria-live="$ariaLive"',
    async ({ variant, className, role, ariaLive }) => {
      await render(ToastComponent, {
        inputs: { message: TEST_MESSAGE, variant },
      });

      const toast = page.getByRole(role);

      await expect.element(toast).toHaveClass(new RegExp(className));
      await expect.element(toast).toHaveAttribute('aria-live', ariaLive);
    },
  );

  it('close button has an accessible name', async () => {
    await render(ToastComponent, {
      inputs: { message: TEST_MESSAGE, variant: 'INFO' },
    });

    await expect.element(page.getByRole('button', { name: 'Close' })).toBeVisible();
  });

  it('emits dismiss when the close button is clicked', async () => {
    const { componentClassInstance } = await render(ToastComponent, {
      inputs: { message: TEST_MESSAGE, variant: 'INFO' },
    });

    const emitSpy = vi.fn();
    componentClassInstance.dismiss.subscribe(emitSpy);

    await page.getByRole('button', { name: 'Close' }).click();

    expect(emitSpy).toHaveBeenCalledOnce();
  });
});
