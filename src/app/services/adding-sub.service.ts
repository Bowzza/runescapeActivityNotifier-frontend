import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../model/Profile';

// const URL = 'http://localhost:3000/';
const URL = 'https://rsnotifybackend.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class AddingSubService {

  constructor(private http: HttpClient) { }

  savingSub(sub: any, username: string) {
    return this.http.post(URL, {sub, username});
  }

  getUsernames() {
    return this.http.get<Array<Profile>>(URL+'names');
  }
}