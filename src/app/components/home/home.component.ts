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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule , SearchPipe , FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';
  noteId!: string;
  notesList: SendData[] = [];
  searchTermInput: string = '';
  private readonly _NoteService = inject(NoteService);
  addNoteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });
  updateNoteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });
  ngOnInit(): void {
    this.getNote();
  }
  onSubmit(): void {
    if (this.addNoteForm.invalid) {
      this.addNoteForm.markAllAsTouched();
      return;
    }

    this._NoteService.addNote(this.addNoteForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.addNoteForm.reset();
        this.getNote();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
getNote(): void {
  this._NoteService.getNote().subscribe({
    next: (res) => {
      this.notesList = res.notes;
    },
    error: (err) => {
      console.log(err);

      if (err.error.msg === 'not notes found') {
        this.notesList = [];
      }
    },
  });
}
  updateNote(note: any, id: string): void {
    this.updateNoteForm.patchValue(note);
    this.noteId = id;
  }
  updateNoteForms(): void {
    if (this.updateNoteForm.invalid) {
      this.updateNoteForm.markAllAsTouched();
      return;
    }

    this._NoteService
      .updateNote(this.noteId, this.updateNoteForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getNote();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  deleteUserNote(id: string): void {
    this._NoteService.deleteNote(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getNote();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
