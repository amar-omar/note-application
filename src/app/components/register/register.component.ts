import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isLoading: boolean = false;
  errorMessage: string = '';
  private readonly _AuthService = inject(AuthService);
  private readonly Router = inject(Router);
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null , [Validators.required  , Validators.minLength(3) , Validators.maxLength(20)]),
    phone: new FormControl(null , [Validators.required ,   Validators.pattern(/^01[0125][0-9]{8}$/)]),
    email: new FormControl(null , [Validators.required , Validators.email]),
    password: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    age: new FormControl(null , [Validators.required , Validators.min(18)]),
  });
  sendRegisterData(): void {
     this.isLoading = true;
    this._AuthService.setRegister(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this.registerForm.reset();
        this.Router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err); 
        this.isLoading = false;
        this.errorMessage = err.error.msg;
      },
    });
  }
}
