import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private router:Router, private toaster:ToastrService, private service:AuthService){
    sessionStorage.clear();
  }

  loginForm!:FormGroup;

  ngOnInit(){
    this.loginForm = this.fb.group({
      'userName' : ['',[Validators.required]],
      'password' : ['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    })
  }

  credentials:any;
  login(){
    if(this.loginForm.valid){
      this.service.getById(this.loginForm.value.userName).subscribe((res:any)=>{
        this.credentials = res;
        console.log(this.credentials)
        if(this.credentials.password === this.loginForm.value.password){
          if(this.credentials.isActive){
            sessionStorage.setItem('username', this.credentials.id)
            sessionStorage.setItem('role',this.credentials.role)
            this.router.navigate([''])
          }else{
            this.toaster.error('Please Contact To Admin!','InActive user!!')
          }
        }else{
          this.toaster.error('Invalid Credentails')
        }
      })
    }else{
      this.toaster.warning("Please Enter Valid Data")
    }
  }
}
