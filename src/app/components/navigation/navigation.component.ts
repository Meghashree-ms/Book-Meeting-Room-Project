import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public loginStatus: boolean = false;


  constructor() { 
    // private _loginStatus:LoginstatusService
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this._loginStatus.currentData.subscribe((data:any) => {
    //   this.loginStatus=data;

    // })
    console.log(this.loginStatus)
    
  }


}
