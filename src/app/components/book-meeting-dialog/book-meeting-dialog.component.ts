import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MeetingService } from 'src/app/service/meeting.service';


@Component({
  selector: 'app-book-meeting-dialog',
  templateUrl: './book-meeting-dialog.component.html',
  styleUrls: ['./book-meeting-dialog.component.css']
})
export class BookMeetingDialogComponent {

  meetingForm: FormGroup;
  showDialog: boolean = false;
  rooms = [
    {id: 1, name: 'Meeting Room 1'},
    {id: 2, name: 'Meeting Room 2'},
    {id: 3, name: ' Meeting Room 3'}
  ]
  isEditMode=false;

  constructor(private fb: FormBuilder, private meetingService: MeetingService,
    public dialogRef: MatDialogRef<BookMeetingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (data) {
      console.log('data',data);
      this.isEditMode = true;
      this.meetingForm = this.fb.group({
        userName: [data?.meeting?.userName, [Validators.required,Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]+$/)]],
        agenda: [data?.meeting?.agenda, [Validators.required,Validators.minLength(10), Validators.maxLength(250)]],
        meetingDate: [data?.meeting?.meetingDate, [Validators.required,this.validateWeekday]],
        startTime: [data?.meeting?.startTime, Validators.required],
        endTime: [data?.meeting?.endTime, Validators.required],
        meetingRoom: [data?.meeting?.meetingRoom, Validators.required]
      },{ validators: this.validateStartAndEndTime });
    } else {
      // New meeting form
      this.meetingForm = this.fb.group({
        userName: ['', [Validators.required,Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]+$/)]],
        agenda: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(250)]],
        meetingDate: ['',  [Validators.required,this.validateWeekday]],
        startTime: ['', Validators.required],
        endTime: ['', [Validators.required,this.validateStartAndEndTime]],
        meetingRoom: ['', Validators.required]
      },{ validators: this.validateStartAndEndTime });
    }

  }

  validateWeekday(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    const day = date.getDay();
    return (day >= 1 && day <= 5) ? null : { invalidWeekday: true };
  }



  validateStartAndEndTime(control: AbstractControl): ValidationErrors | null {
    const group = control as FormGroup;
    const timeFrom = group.get('startTime')?.value;
    const timeTo = group.get('endTime')?.value;

    console.log('timeFrom',timeFrom,timeTo)
  
    if (!timeFrom || !timeTo) {
      return null; // Skip validation if times are not set
    }
  
    // Convert to Date objects for comparison
    const fromTime = new Date(`1970-01-01T${timeFrom}:00`);
    const toTime = new Date(`1970-01-01T${timeTo}:00`);
    const minimumDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
  

    const timeDifference = toTime.getTime() - fromTime.getTime();

    const thirtyMinutesInMs = 30 * 60 * 1000;
  
   
    if (timeDifference !== thirtyMinutesInMs) {
      return { invalidDuration: true }; 
    }
  
    return null;
  }

  isFieldInvalid(field: string):any {
    return this.meetingForm.get(field)?.invalid && (this.meetingForm.get(field)?.touched || this.meetingForm.get(field)?.dirty);
   
  }


  closeDialog() {
    // this.showDialog = false;
    this.dialogRef.close();

  }

  onSubmit() {
    console.log('this.meetingForm.valid',this.meetingForm.valid)
    if (this.meetingForm.valid) {
      this.meetingService.saveMeeting(this.meetingForm.value).subscribe(
        response => {
          alert('Meeting saved successfully!');
          // this.closeDialog();
          this.dialogRef.close();
        },
        error => {
          console.error('Error saving meeting:', error);
        }
      );
    }
  }

}
