import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {

  isMeanuRequire:boolean = false;
  isAdmin:boolean = false;
  constructor(private router:Router, private service:AuthService){}

  // hide navbar if login and register component appears

  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if(currentUrl == '/login' || currentUrl == '/register'){
      this.isMeanuRequire = false;
    }else{
      this.isMeanuRequire = true;
    }
    if(this.service.getUserRole() === 'admin'){
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }
  }

}
