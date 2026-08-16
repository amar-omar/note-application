import { Pipe, PipeTransform } from '@angular/core';
import { SendData } from '../interfaces/send-data';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(notes: SendData[], term: string): SendData[] {
    if (!term) {
      return notes;
    }
    return notes.filter(note => note.title.toLowerCase().includes(term.toLowerCase()));
  }

}
