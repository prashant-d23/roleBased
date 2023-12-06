import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if(authService.isLoggedIn()){
    if(route.url.length > 0){
      let menu = route.url[0].path;
      if(menu == 'user'){
        if(authService.getUserRole() == 'admin'){
          return true;
        }else{
          toastr.warning("You don't have access to this data")
          router.navigate([''])
          return false;
        }
      }else{
        return true;
      }
    }else{
      return true;
    }
  }else{
    router.navigate(['login'])
    return false;
  }

  // if(authService.isLoggedIn()){
  //   return true;
  // }else{
  //   router.navigate(['login'])
  //   console.log('working')
  //   return false;
  // }
};



// import { Injectable } from '@angular/core';
// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   UrlTree,
//   Router,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';
// import { ToastrService } from 'ngx-toastr';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router, private service:AuthService, private toastr:ToastrService) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     return true;
//   }
// }

//in service we are implementing all the guards interfaces with their methods
