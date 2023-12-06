import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.scss']
})
export class UpdatePopupComponent implements OnInit {

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    public dialogRef: MatDialogRef<UpdatePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr:ToastrService
  ){}

  // updateForm!:FormGroup;

  roleList:any;
  editData:any;
  ngOnInit(){
    this.service.getAllRole().subscribe((res:any)=>{
      this.roleList = res;
    })
    if(this.data.userCode != null && this.data.userCode != ''){
      this.loadUserData(this.data.usercode);

    }
  }

  updateForm:FormGroup = this.builder.group({
      "id" : ['',[]],
      'name' : ['',[]],
      'password' : ['',[]],
      'email' : ['', []],
      'gender' : ['male'],
      'role' : ['',[Validators.required]],
      'isActive' : [false,[]]
    })

    loadUserData(code:any){
      this.service.getById(code).subscribe(res =>{
        this.editData = res;
        this.service.getById(this.data.userCode).subscribe(res =>{
          this.editData = res;
          this.updateForm.setValue({
            id : this.editData.id,
            name : this.editData.name,
            password : this.editData.password,
            email : this.editData.email,
            gender : this.editData.gender,
            role : this.editData.role,
            isActive : this.editData.isActive
          })
        })
      })
    }

  updateUser(){
   if(this.updateForm.valid){
    this.service.updateData(this.updateForm.value.id, this.updateForm.value).subscribe(res => {
      this.toastr.success('user updated Succssfully!');
      this.dialogRef.close();
    });
   }else{
    this.toastr.warning('Please Select Role for User')
   }
  }
}

