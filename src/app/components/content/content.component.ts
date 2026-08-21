import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})
export class ContentComponent {
private readonly _Router = inject(Router);

  onGetStarted() {
    const token = localStorage.getItem('userToken'); 

    if (token) {
      this._Router.navigate(['/notes']);
    } else {
      this._Router.navigate(['/login']);
    }
  }
}
