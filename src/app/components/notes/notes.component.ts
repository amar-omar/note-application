import { Component, inject, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { NoteService } from '../../shared/services/note.service';
import { SendData } from '../../shared/interfaces/send-data';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [ReactiveFormsModule , FormsModule, SearchPipe],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent implements OnInit {
  noteId: string = '';
  notesList: SendData[] = [];
  searchTermInput: string = '';
  
  private readonly _NoteService = inject(NoteService);
  private readonly _Renderer2 = inject(Renderer2);

  // مراجع الـ Modals باستخدام ViewChild للتحكم بها من الـ TS
  @ViewChild('addModal') addModal!: ElementRef;
  @ViewChild('updateModal') updateModal!: ElementRef;

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

  // دوال فتح وإغلاق المودال باستخدام ElementRef و Renderer2
// تعديل النوع هنا ليكون HTMLDivElement مباشرة لتجنب أي أخطاء مطابقة أنواع
 openModal(modalElement: HTMLDivElement) {
  this._Renderer2.removeClass(modalElement, 'hidden');
  this._Renderer2.addClass(modalElement, 'flex');
}

closeModal(modalElement: HTMLDivElement) {
  this._Renderer2.removeClass(modalElement, 'flex');
  this._Renderer2.addClass(modalElement, 'hidden');
}
  onSubmit(): void {
    if (this.addNoteForm.invalid) {
      this.addNoteForm.markAllAsTouched();
      return;
    }

    this._NoteService.addNote(this.addNoteForm.value).subscribe({
      next: (res) => {
        this.addNoteForm.reset();
        this.getNote();
this.closeModal(this.addModal.nativeElement);      },
      error: (err) => {},
    });
  }

  getNote(): void {
    this._NoteService.getNote().subscribe({
      next: (res) => {
        this.notesList = res.notes;
      },
      error: (err) => {
        if (err.error.msg === 'not notes found') {
          this.notesList = [];
        }
      },
    });
  }

  updateNote(note: SendData, id: string): void {
    this.updateNoteForm.patchValue(note);
    this.noteId = id;
this.openModal(this.updateModal.nativeElement);  }

  updateNoteForms(): void {
    if (this.updateNoteForm.invalid) {
      this.updateNoteForm.markAllAsTouched();
      return;
    }

    this._NoteService
      .updateNote(this.noteId, this.updateNoteForm.value)
      .subscribe({
        next: (res) => {
          this.updateNoteForm.reset();
          this.getNote();
this.closeModal(this.updateModal.nativeElement);        },
        error: (err) => {
          err.error.msg === 'not notes found' ? (this.notesList = []) : '';
        },
      });
  }

  deleteUserNote(id: string): void {
    this._NoteService.deleteNote(id).subscribe({
      next: (res) => {
        this.getNote();
      },
      error: (err) => {},
    });
  }
}