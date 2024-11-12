import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private mockDatabase: any[] = [];

  constructor() { }

  saveMeeting(meetingData: any): Observable<any> {
    this.mockDatabase.push(meetingData);
    console.log('Saved Meeting:', this.mockDatabase);
    return of({ message: 'Meeting saved successfully!' });
  }


  getMeetings(): Observable<any[]> {
    return of(this.mockDatabase);
  }
}
