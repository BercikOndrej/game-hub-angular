import { render } from 'vitest-browser-angular';
import { page } from 'vitest/browser';
import { ToastVariant } from '../../types/toast-item';
import { ToastComponent } from './toast-component';

const TEST_MESSAGE = 'Test message';

describe('ToastComponent', () => {
  it.each([
    { variant: ToastVariant.Info, className: 'toast--info', role: 'status', ariaLive: 'polite' },
    {
      variant: ToastVariant.Warning,
      className: 'toast--warning',
      role: 'status',
      ariaLive: 'polite',
    },
    {
      variant: ToastVariant.Danger,
      className: 'toast--danger',
      role: 'alert',
      ariaLive: 'assertive',
    },
    {
      variant: ToastVariant.Success,
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
      inputs: { message: TEST_MESSAGE, variant: ToastVariant.Info },
    });

    await expect.element(page.getByRole('button', { name: 'Close' })).toBeVisible();
  });

  it('emits dismiss when the close button is clicked', async () => {
    const { componentClassInstance } = await render(ToastComponent, {
      inputs: { message: TEST_MESSAGE, variant: ToastVariant.Info },
    });

    const emitSpy = vi.fn();
    componentClassInstance.dismiss.subscribe(emitSpy);

    await page.getByRole('button', { name: 'Close' }).click();

    expect(emitSpy).toHaveBeenCalledOnce();
  });
});
