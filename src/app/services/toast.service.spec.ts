import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, inject, model } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { render } from 'vitest-browser-angular';
import { page } from 'vitest/browser';
import { ToastService } from './toast.service';
import { ToastItem, ToastVariant } from '../types/toast-item';

const TEST_MESSAGE = 'Test message';
const SHORT_DURATION = 200;

describe('ToastService', () => {
  afterEach(() => {
    TestBed.inject(OverlayContainer).ngOnDestroy();
  });

  it('should show initial toast', async () => {
    await setup();
    showToasts();

    await expect.element(page.getByText(TEST_MESSAGE)).toBeVisible();
  });

  it('toast component should close after short duration of time', async () => {
    await setup();
    showToasts();

    await new Promise((resolve) => setTimeout(resolve, SHORT_DURATION / 2));
    await expect.element(page.getByText(TEST_MESSAGE)).toBeVisible();

    await expect
      .element(page.getByText(TEST_MESSAGE), { timeout: SHORT_DURATION })
      .not.toBeInTheDocument();
  });

  it('should display given variant of the toast', async () => {
    await setup({
      toastItems: [
        {
          ...testToast,
          variant: ToastVariant.Danger,
        },
      ],
    });
    showToasts();

    await expect.element(page.getByRole('alert')).toHaveClass(/toast--danger/);
  });

  it('should has proper aria-live attributte', async () => {
    await setup({
      toastItems: [
        {
          ...testToast,
          variant: ToastVariant.Danger,
        },
      ],
    });

    await page.getByRole('button', { name: 'Show toast' }).click();

    const element = await page.getByRole('alert');
    await expect.element(element).toHaveClass(/toast--danger/);
    await expect.element(element).toHaveAttribute('aria-live', 'assertive');
  });

  it('toast component should disapear after user dismiss it manually by close button', async () => {
    await setup();
    showToasts();

    await expect.element(page.getByText(TEST_MESSAGE)).toBeVisible();

    await page.getByRole('button', { name: 'Close' }).click();
    await expect.element(page.getByText(TEST_MESSAGE)).not.toBeInTheDocument();
  });

  it('toast container should disapear after user last toast is dismissed', async () => {
    await setup({ toastItems: multipleTestToasts });
    showToasts();

    const toast1 = page.getByRole('status').filter({ hasText: TEST_MESSAGE });
    const toast2 = page.getByRole('status').filter({ hasText: 'msg-2' });
    const toast3 = page.getByRole('status').filter({ hasText: 'msg-3' });

    // First toast dismiss
    await toast1.getByRole('button', { name: 'Close' }).click();
    await expect.element(page.getByText(TEST_MESSAGE)).not.toBeInTheDocument();
    await expect.element(page.getByText('msg-2')).toBeVisible();
    await expect.element(page.getByText('msg-3')).toBeVisible();
    await expect.element(page.getByTestId('toast-container')).toBeInTheDocument();

    // Second toast dismiss
    await toast2.getByRole('button', { name: 'Close' }).click();
    await expect.element(page.getByText('msg-2')).not.toBeInTheDocument();
    await expect.element(page.getByText('msg-3')).toBeVisible();
    await expect.element(page.getByTestId('toast-container')).toBeInTheDocument();

    // Third toast dismiss
    await toast3.getByRole('button', { name: 'Close' }).click();
    await expect.element(page.getByText('msg-3')).not.toBeInTheDocument();
    await expect.element(page.getByTestId('toast-container')).toBeInTheDocument();

    await expect
      .element(page.getByTestId('toast-container'), { timeout: 600 + 1200 })
      .not.toBeInTheDocument();
  });
});

async function showToasts(): Promise<void> {
  await page.getByRole('button', { name: 'Show toast' }).click();
}

interface SetupOptions {
  toastItems?: ToastItem[];
}

interface SetupResult {
  setInputs(inputs: Partial<SetupOptions>): void;
}

const testToast: ToastItem = {
  id: 'test-toast-1',
  message: TEST_MESSAGE,
  variant: ToastVariant.Info,
  duration: SHORT_DURATION,
};

const multipleTestToasts = [
  testToast,
  {
    ...testToast,
    id: 'test-toast-2',
    message: 'msg-2',
    duration: 400,
  },
  {
    ...testToast,
    id: 'test-toast-3',
    message: 'msg-3',
    duration: 600,
  },
];

async function setup({ toastItems = [testToast] }: SetupOptions = {}): Promise<SetupResult> {
  const { componentClassInstance } = await render(TestComponent, {
    inputs: { toastItems },
  });

  return {
    setInputs: (inputs: Partial<SetupOptions>) => {
      if (inputs.toastItems) {
        componentClassInstance.toastItems.set(inputs.toastItems);
      }
    },
  };
}

@Component({
  selector: 'app-test',
  template: ` <button (click)="showToast()">Show toast</button> `,
})
class TestComponent {
  private readonly service = inject(ToastService);

  public readonly toastItems = model<ToastItem[]>([]);

  protected showToast(): void {
    this.toastItems().forEach((item) =>
      this.service.show(item.message, item.variant, item.duration),
    );
  }
}
