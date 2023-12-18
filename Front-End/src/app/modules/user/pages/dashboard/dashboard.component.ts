import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/auth/login'])
    }
  }

  constructor(private authService: AuthService, private router: Router){}
}
