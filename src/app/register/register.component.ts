import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm!:FormGroup;
  constructor(private builder:FormBuilder, private toastr:ToastrService, private service:AuthService, private router:Router, private route:ActivatedRoute){}

  ngOnInit(){
    this.registrationForm = this.builder.group({
      "id" : ['',[Validators.required, Validators.minLength(5)]],
      'name' : ['',[Validators.required]],
      'password' : ['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      'email' : ['', [Validators.required, Validators.email]],
      'gender' : ['male'],
      'role' : ['',[]],
      'isActive' : [false,[]]
    })
  }

  submit(){
    if(this.registrationForm.valid){
      console.log(this.registrationForm.value)
      this.service.registerData(this.registrationForm.value).subscribe((res:any)=>{
        this.toastr.success('Please Contact Admin to get access','Registration Successful');
        this.router.navigate(['login']);
      })
    }else{
      this.toastr.warning('Pleas Enter Valid Data');
    }
  }
}
