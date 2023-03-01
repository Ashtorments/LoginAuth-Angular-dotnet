import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import validateforms from 'src/app/helpers/validateforms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm= this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required]
    })
  }

  onLogin(){
    if(this.loginForm.valid){

      console.log(this.loginForm.value)
      //send the obj to DB
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message)
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }
    else{
      console.log("form is not valid")
      validateforms.validateAllFormFields(this.loginForm);
      alert("Invalid")
      //throw error with required fields
    }
  }
  
}
