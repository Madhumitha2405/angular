import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-create-dialog',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatSnackBarModule,
  ],
  templateUrl: './user-create-dialog.html',
  styleUrl: './user-create-dialog.scss',
})
export class UserCreateDialog {
  userForm: FormGroup;
  hidePassword = true;
  imagePreview: string | ArrayBuffer | null = null;


  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserCreateDialog>,
    private snackBar: MatSnackBar) {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      employeeId: ['', Validators.required],
      designation: ['', Validators.required],
      primaryProject: ['', Validators.required],
      billable: [false],
      status: ['Active'],
      dateFreeze: [null],
      reportingManager: ['', Validators.required],
      managerId:['',Validators.required],
      department: ['', Validators.required],
      reportingLocation: [''],
      email: ['', [Validators.required, Validators.email]],
      role: ['Team member'],
      username: [''],
      password: ['', Validators.required],
      dob: ['', Validators.required],
      doj: ['', Validators.required],
    });
  }
  onSubmit() {
  if (this.userForm.valid) {
    // Alert the user
    this.snackBar.open('User Created Successfully!', 'OK', { duration: 3000 });

    const formData = this.userForm.value;
    
    //  Reset the form to its original state
    this.userForm.reset({
      status: 'Active', // Default values you want to keep
      billable: false,
      role: 'Team member'
    });
    
    // Reset the image preview
    this.imagePreview = null;

    // Finally close the dialog
    this.dialogRef.close(formData);
  }
}
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
