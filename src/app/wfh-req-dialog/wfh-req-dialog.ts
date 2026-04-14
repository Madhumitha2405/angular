import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wfh-req-dialog',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSnackBarModule
  ],
  templateUrl: './wfh-req-dialog.html',
  styleUrl: './wfh-req-dialog.scss',
})
export class WfhReqDialog {
  wfhForm: FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<WfhReqDialog>,
    private snackBar: MatSnackBar
  ) {
    this.wfhForm = this.fb.group({
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
      noOfDays: [{ value: 0, disabled: true }],
      reason: ['', Validators.required],
      reportingManager: ['Shrinivas S G'], // Default from your screenshot
      pdoManager: ['', Validators.required],
      backlog: ['']
    });
  }
  calculateDays() {
    const fromDate = this.wfhForm.get('fromDate')?.value;
    const toDate = this.wfhForm.get('toDate')?.value;
    if (fromDate && toDate) {
      const timeDiff = Math.abs(toDate.getTime() - fromDate.getTime());
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1 to include both start and end date
      this.wfhForm.get('noOfDays')?.setValue(dayDiff);
    } else {
      this.wfhForm.get('noOfDays')?.setValue(0);
    }
  }

  onSubmit() {
    if (this.wfhForm.valid) {
      // 1. Show the success message
      this.snackBar.open('WFH Request Submitted Successfully!', 'Close', {
        duration: 3000,          // Message stays for 3 seconds
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['success-snackbar'] // Custom green style
      });

      // Close the dialog and pass the data back
      this.dialogRef.close(this.wfhForm.getRawValue());
    } 
    else {
      // Show an error message if the form is incomplete
      this.snackBar.open('Please fill all required fields.', 'Error', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      this.wfhForm.markAllAsTouched();
    }
  }
  onSave() {
    if (this.wfhForm.dirty) { // Only save if the user actually changed something
      const draftData = this.wfhForm.getRawValue();

      // In a real app, you would call a service here: 
      // this.wfhService.saveDraft(draftData).subscribe(...)

      console.log('Draft saved locally:', draftData);

      this.snackBar.open('Draft saved successfully!', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
    } 
    else {
      this.snackBar.open('No changes to save.', 'OK', { duration: 2000 });
    }
  }
}
