import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-organize',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './organize.component.html',
  styleUrl: './organize.component.css',
})
export class OrganizeComponent {}
