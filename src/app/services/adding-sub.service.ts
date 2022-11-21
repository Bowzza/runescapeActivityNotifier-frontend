import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../model/Profile';

// const URL = 'http://localhost:3000/';
const URL = 'https://runescapenotifier-backend.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class AddingSubService {

  constructor(private http: HttpClient) { }

  searchUsername(): Observable<string> {
    return this.http.get<string>(URL+'username');
  }
  
  savingSub(sub: any, username: string) {
    return this.http.post(URL, {sub, username});
  }

  getUsernames(): Observable<Profile[]> {
    return this.http.get<Array<Profile>>(URL+'names');
  }
}