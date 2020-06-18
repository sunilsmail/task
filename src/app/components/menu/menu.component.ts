import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  title = 'task';
  constructor(public loginService: AuthenticationService,private router: Router){

  }
  logout(){
    this.loginService.logout();
    this.router.navigate(['login']);
  }
}
