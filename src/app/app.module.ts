import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ContainerComponent } from './components/container/container.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';  
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContainerComponent,
    NavigationComponent,
    AllMeetingsComponent,
    BookMeetingDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule ,
    MatDialogModule,
    MatFormFieldModule ,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule
     
  ],

  // providers: [],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
],
  bootstrap: [AppComponent]

})
export class AppModule { }

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AllMeetingsComponent } from './components/all-meetings/all-meetings.component';
import { BookMeetingDialogComponent } from './components/book-meeting-dialog/book-meeting-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';


