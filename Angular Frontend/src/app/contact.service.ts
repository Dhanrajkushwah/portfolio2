import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private _http: HttpClient) { }
//Add Contact----------------------------------->
addContact(obj: any) {
  return this._http.post<any>(environment._api + "/api/user/create", obj)
}
//Get Contact----------------------------------->
getContact() {
  return this._http.get<any>(environment._api + "/api/user/list")
}
}
