import { AuthService } from './../../shared/services/auth.service';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isMenuOpen = false;
  private readonly _AuthService = inject(AuthService);
  private readonly Router = inject(Router);
  logOut(): void {
    // 1- remove token from localStorage
    localStorage.removeItem('userToken');
    //2- remove userDataDecoded = null
    this._AuthService.userDataDecoded.next(null);
    // 3- navigate to login page
    this.Router.navigate(['/login']);
  }
}
