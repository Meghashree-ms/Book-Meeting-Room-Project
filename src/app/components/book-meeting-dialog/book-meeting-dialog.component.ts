import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        userName: [data?.meeting?.userName, Validators.required],
        agenda: [data?.meeting?.agenda, Validators.required],
        meetingDate: [data?.meeting?.meetingDate, Validators.required],
        startTime: [data?.meeting?.startTime, Validators.required],
        endTime: [data?.meeting?.endTime, Validators.required],
        meetingRoom: [data?.meeting?.meetingRoom, Validators.required]
      });
    } else {
      // New meeting form
      this.meetingForm = this.fb.group({
        userName: ['', Validators.required],
        agenda: ['', Validators.required],
        meetingDate: ['', Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
        meetingRoom: ['', Validators.required]
      });
    }
    // this.meetingForm = this.fb.group({
    //   userName: ['', Validators.required],
    //   meetingDate: ['', Validators.required],
    //   startTime: ['', Validators.required],
    //   endTime: ['', Validators.required],
    //   meetingRoom:['', Validators.required],
    //   agenda: ['', Validators.required]
    // });
  }

  // openDialog() {
  //   this.showDialog = true;
  // }

  closeDialog() {
    // this.showDialog = false;
    this.dialogRef.close();

  }

  onSubmit() {
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
