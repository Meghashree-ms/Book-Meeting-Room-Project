import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private mockDatabase: any[] = [];

  constructor() { }

  saveMeeting(meetingData: any): Observable<any> {
    // this.mockDatabase.push(meetingData);
    // console.log('Saved Meeting:', this.mockDatabase);
    // return of({ message: 'Meeting saved successfully!' });

    const index = this.mockDatabase.findIndex(
      (meeting) =>
        meeting.meetingRoom === meetingData.meetingRoom &&
        meeting.date === meetingData.date &&
        meeting.timeFrom === meetingData.timeFrom
    );
  
    if (index !== -1) {
      this.mockDatabase[index] = meetingData;
     
    } else {
      this.mockDatabase.push(meetingData);
 
    }
  
    return of({ message: index !== -1 ? 'Meeting updated successfully!' : 'Meeting saved successfully!' });

    
  }


  getMeetings(): Observable<any[]> {
    return of(this.mockDatabase);
  }
}
