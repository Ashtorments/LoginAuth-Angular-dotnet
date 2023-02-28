import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import validateforms from 'src/app/helpers/validateforms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm= this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required]
    })
  }

  onSubmit(){
    if(this.loginForm.valid){

      console.log(this.loginForm.value)
      //send the obj to DB
    }
    else{
      console.log("form is not valid")
      validateforms.validateAllFormFields(this.loginForm);
      alert("Invalid")
      //throw error with required fields
    }
  }
  
}
