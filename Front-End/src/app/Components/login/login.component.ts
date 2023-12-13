import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


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
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = loginBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  ngOnInit(): void {
  }

  onLogin(): void{
    const { name, password } = this.loginForm.value;

    this.authService.login({name: name, password: password}).subscribe(
      response => {
        console.log('Usuário logado com sucesso!', response);
        this.router.navigate(['/user']);

      },
      error =>{
        console.error('Erro ao fazer login!', error);
      }
    )
  }

  passShow(){
    this.showPass = !this.showPass;
  }

  get name() {
    return this.loginForm.get('name')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

}
