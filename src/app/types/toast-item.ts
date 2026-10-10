export interface ToastItem {
  id: string;
  message: string;
  duration: number;
  variant: ToastVariant;
}

export enum ToastVariant {
  Info = 'info',
  Warning = 'warning',
  Danger = 'danger',
  Success = 'success',
}
