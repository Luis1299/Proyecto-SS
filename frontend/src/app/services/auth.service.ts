import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Session, Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  controller: string = "/LoginController"
  url: string = environment.backendUrl

  constructor(
    private http: HttpClient,
  ) { 
  }

  login(usuario: String, password: String): Observable<Session>{
    let body = JSON.stringify({
      "Usuario": usuario,
      "Contrasena": password
    })
    return this.http.post<Session>(this.url + this.controller, body)
  }

  logout(): boolean{
    localStorage.removeItem("usuario")
    return true
  }

  async validateToken(token: string): Promise<boolean>{
    let result: boolean = false
    await this.http.put<boolean>(this.url + this.controller, JSON.stringify({token: token})).forEach(res => {
      result = res
    })
    return Promise.resolve(result)
  }

}
