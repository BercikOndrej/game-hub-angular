export interface ToastItem {
  id: string;
  message: string;
  duration: number;
  variant: ToastVariant;
}

export const TOAST_VARIANT = {
  INFO: 'Info',
  WARNING: 'Warning',
  DANGER: 'Danger',
  SUCCESS: 'Success',
} as const;

export type ToastVariant = keyof typeof TOAST_VARIANT;
