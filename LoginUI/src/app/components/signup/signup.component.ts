import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import validateforms from 'src/app/helpers/validateforms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthenticationService ) { }

  ngOnInit(): void {
    this.signupForm= this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required],
      Fname: ['',Validators.required],
      Lname: ['',Validators.required],

    })
  }

  onSubmit(){
    if(this.signupForm.valid){

      console.log(this.signupForm.value)
      //send the obj to DB
      this.auth.signUp(this.signupForm.value)
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
      validateforms.validateAllFormFields(this.signupForm);
      alert("Invalid")
      //throw error with required fields
    }
  }
  
}
