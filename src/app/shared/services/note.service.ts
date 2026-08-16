import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../base/environment/envirnment';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private _HttpClient: HttpClient) {}
  addNote(data: object): Observable<any> {
    return this._HttpClient.post(`${baseUrl}/api/v1/notes`, data, {
      headers: { token: '3b8ny__' + localStorage.getItem('userToken') },
    });
  }
  getNote(): Observable<any> {
    return this._HttpClient.get(`${baseUrl}/api/v1/notes`, {
      headers: { token: '3b8ny__' + localStorage.getItem('userToken') },
    });
  }
  updateNote(id:string , data:object): Observable<any> {
    return this._HttpClient.put(`${baseUrl}/api/v1/notes/${id}`, data, {
      headers: { token: '3b8ny__' + localStorage.getItem('userToken') },
    });
  }
  
  deleteNote(id:string ): Observable<any> {
    return this._HttpClient.delete(`${baseUrl}/api/v1/notes/${id}`,  {
      headers: { token: '3b8ny__' + localStorage.getItem('userToken') },
    });
  }
isLoggedIn(): boolean {
  return localStorage.getItem('userToken') !== null;
}

}
