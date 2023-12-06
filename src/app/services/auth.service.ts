import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseApi:string = 'http://localhost:3000/user';

  constructor(private http:HttpClient) { }

  //return all data via get method
   getAll(){
    return this.http.get(this.baseApi);
   }

   //get record by single id
   getById(id:any){
    const url = this.baseApi + '/' + id;
    return this.http.get(url);
  }

  //register use via post method
  registerData(inputData:any){
    return this.http.post(this.baseApi, inputData);
  }

  //update user via put method
  updateData(id:any, inputData:any){
     const url = this.baseApi + '/' + id;
     return this.http.put(url,inputData);
    };

    //remove user via delete method
    deleteData(){
      return this.http.delete(this.baseApi);
   }

   //get username
   isLoggedIn(){
    return sessionStorage.getItem('username') != null;
   }

   // get role
   getUserRole(){
    return sessionStorage.getItem('role') != null ? sessionStorage.getItem('role')?.toString() : '' ;
   }

   getAllRole(){
    return this.http.get('http://localhost:3000/role');
   }
}
