import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Logindetails } from 'src/app/models/login.model';
import { LoginStatusService } from 'src/app/service/login-status.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // constructor(private _login: LoginService,private _loginStatus: LoginStatusService,private router:Router) { }


  // userLoginDetails:Logindetails = new Logindetails();

  

  // status:boolean=false;
  // loginErrorMessage:string='';

  // onSubmit(){
  
  //   this.status=!this.status;

   
  //    this._login.loginUser(this.userLoginDetails).subscribe((data:any) => {
  //     this.router.navigate(['/allProducts']);
  //     this._loginStatus.setData(true);

  //    },(error:any) =>{
  //     this.loginErrorMessage="Username/Password is incorrect";
  //     this._loginStatus.setData(false);

  //    });

  //     this._loginStatus.setData(this.status);
     
  // }



  loginForm: FormGroup;
  loginError: string | null = null;
  readonly validUsername = 'infrrdAdmin';
  readonly validPassword = 'password123';

  constructor(private fb: FormBuilder,private router:Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    if (username === this.validUsername && password === this.validPassword) {
      alert('Login successful!');
      this.loginError = null;
      this.router.navigate(['/allMeetings']);
    } else {
      this.loginError = 'Invalid username or password';
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }




}
