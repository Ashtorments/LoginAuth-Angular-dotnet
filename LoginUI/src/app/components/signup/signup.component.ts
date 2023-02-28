import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import validateforms from 'src/app/helpers/validateforms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

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
    }
    else{
      console.log("form is not valid")
      this.validateAllFormFields(this.signupForm);
      alert("Invalid")
      //throw error with required fields
    }
  }
  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      } else if (control instanceof FormGroup){
        validateforms.validateAllFormFields(control)
      }
    })
  }
}
