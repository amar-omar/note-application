import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { z } from 'zod';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLoading: boolean = false;
  errorMessage: string = '';
  private readonly _AuthService = inject(AuthService);
  private readonly Router = inject(Router);
    loginForm: FormGroup = new FormGroup({
      email: new FormControl(null , [Validators.required , Validators.email]),
      password: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    });
      sendLoginData(): void {
        this.isLoading = true;
        this._AuthService.setLogin(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this._AuthService.sharedData();
        this.Router.navigate(['/home']);
        localStorage.setItem('userToken', res.token);
      },
      error: (err) => {
        console.log(err); 
        this.isLoading = false;
        this.errorMessage = err.error.msg;
      },
    });
  }
}
