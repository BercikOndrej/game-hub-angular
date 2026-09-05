import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, Host } from '@angular/core';
import { Button } from '../button/button';

export interface ConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  imports: [Button],
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.html',
  host: {
    class: 'block rounded-xl p-4 space-y-4 bg-white',
  },
})
export class ConfirmDialog {
  readonly dialogRef = inject(DialogRef<boolean>);
  readonly data = inject<ConfirmDialogData>(DIALOG_DATA);
}
