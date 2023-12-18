import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.baseApiURL;
  private authToken: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { name: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap((response) => {
          if (response && response.token) {
            this.authToken = response.token;
            if (this.authToken) {
              localStorage.setItem('token', this.authToken);
            }
          }
        })
      );
  }

  getToken(): string | null {
    var token = localStorage.getItem('token');
    return this.authToken || token
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authToken = null;
    this.router.navigate(['/logizn']);
  }
}
