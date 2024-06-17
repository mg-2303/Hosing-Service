import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedinUser: string = "";
  constructor(private router: Router, private alertifyService: AlertifyService) { }

  ngOnInit(): void {
  }
  loggedin() {
    const userFromStorage = localStorage.getItem('token');
    if (userFromStorage) {
      this.loggedinUser = userFromStorage;
    }
    return this.loggedinUser;
  }
  onLogout() {
    localStorage.removeItem('token');
    this.alertifyService.success("LogOut successfully");
    this.router.navigate(['/login']);
  }
}
