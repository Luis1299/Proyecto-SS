import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Session } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public static update$: Subject<Session> = new Subject();
  private session: Session | null = new Session()
  private storage: Storage = localStorage

  constructor(
    private router: Router
  ) {  
    StorageService.update$.subscribe(res => {
      this.setSession(res)
    })
    this.session = this.loadSession()
   }

  setSession(session: Session): void{
    this.session = session
    this.storage.setItem('usuario', JSON.stringify(session))
  }

  loadSession(): Session | null{
    var session = this.storage.getItem('usuario')
    let result =  (session)? <Session> JSON.parse(session) : null
    return result
  }

  getSession(): Session | null{
    return this.session
  }

  removeSession(): void{
    this.storage.removeItem('usuario')
    this.session = null
  }

  isAuthenticated(): boolean{
    return (this.getSession() != null) ? true : false
  }

  getCurrentToken(): string | null {
    this.loadSession()
    var session = this.getSession()
    return (session && session.token) ? session.token : null
  }

  getRol(): string | null {
    var session = this.getSession()
    return (this.session && session?.rol)? session.rol : null
  }

  logout(): void{
    this.removeSession()
    this.router.navigate(['/login'])
  }

  getRolRoutes(){
    let rol = this.getRol()
    // console.log(rol)
  }

}
