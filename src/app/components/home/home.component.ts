import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NoteService } from '../../shared/services/note.service';
import { SendData } from '../../shared/interfaces/send-data';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { ContentComponent } from "../content/content.component";
import { OrganizeComponent } from "../organize/organize.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, SearchPipe, FormsModule, ContentComponent, OrganizeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent  {
 
}
