import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './login.responsividade.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  showPass: boolean = false;
  constructor(
    private loginBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = loginBuilder.group({
      email: ['', [Validators.required /*  this.emailValidator */]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  ngOnInit(): void {
  }

  onLogin(){

  }

  passShow(){
    this.showPass = !this.showPass;
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  isTeacherEmail(email: string): boolean{
    const teacherEmailRegex = /@professor\.com$/i;

    return teacherEmailRegex.test(email)
  }
}
