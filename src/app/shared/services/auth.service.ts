import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../../base/environment/envirnment';
import { jwtDecode } from 'jwt-decode';
HttpClient;
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userDataDecoded: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) {}

  setRegister(data: object): Observable<any> {
    return this._httpClient.post(
      `${baseUrl}/api/v1/users/signUp`,
      data
    );
  }

  setLogin(data: object): Observable<any> {
    return this._httpClient.post(
      `${baseUrl}/api/v1/users/signIn`,
      data
    );
  }

  sharedData(): void {
    const token = localStorage.getItem('userToken');

    if (!token) {
      this.userDataDecoded.next(null);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      this.userDataDecoded.next(decoded);
    } catch (error) {
      // console.error('Invalid token:', error);
      localStorage.removeItem('userToken');
      this.userDataDecoded.next(null);
    }
  }
}
