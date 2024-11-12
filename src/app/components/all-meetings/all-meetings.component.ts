import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookMeetingDialogComponent } from '../book-meeting-dialog/book-meeting-dialog.component';
import { MeetingService } from 'src/app/service/meeting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-meetings',
  templateUrl: './all-meetings.component.html',
  styleUrls: ['./all-meetings.component.css']
})
export class AllMeetingsComponent {
  public  meetingList: any[] = [
    {
      "userName": "megha",
      "meetingDate": "2023-12-01",
      "startTime": "22:00",
      "endTime": "23:00",
      "meetingRoom": 3,
      "agenda": "test"
  }
  ];

  constructor(private meetingService: MeetingService,
    private dialog: MatDialog,
    private router:Router
  ){
 

  }

  ngOnInit(): void {
   
   this.fetchList();
  }

  fetchList(){
    this.meetingService.getMeetings().subscribe(data => {
      this.meetingList= data;
    });
  }
  // editMeeting(index: number): void {
  //   const meetingToEdit = this.meetingList[index];

  //   console.log('Editing meeting:', meetingToEdit);



  
  // }



  openDialog(): void {
    const dialogRef = this.dialog.open(BookMeetingDialogComponent,{
      width: '50vw',
      height:'50vh',
      data: ''
    });
  

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.meetingList.push(result); // Add the new meeting to the list
      }
    });
  }


  deleteMeeting(index: number): void {
    if (confirm('Are you sure you want to delete this meeting?')) {
      this.meetingList.splice(index, 1);
      console.log('Deleted meeting at index:', index);
   
    }
  }



editMeeting(index: number) {
  const dialogRef = this.dialog.open(BookMeetingDialogComponent, {
    width: '50vw',
    height:'50vh',
    data: { meeting: this.meetingList[index] }
  });

  dialogRef.afterClosed().subscribe((result:any) => {
    if (result) {
      // Update the meeting list with the edited data
      this.meetingList[index] = result;
      // Optionally, persist the updated data using your service or backend logic
    }
  });
}


logout(){
  this.router.navigate(['/login']);
}

 

 



}
