import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Rol, Session } from './models/usuario';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public static update$: Subject<boolean> = new Subject()

  links: string[] = []
  Rol = Rol
  
  user: Session = {
    usuario: "",
    token: "",
    rol: Rol.Ninguno,
    isLogedIn: false    
  }
  title: any = "frontend";

  constructor(
    private storageService: StorageService,
    private router: Router
  ){
    document.title = "Sistema"
    AppComponent.update$.subscribe(res => {
      storageService.loadSession()
      this.load()
    })
    storageService.loadSession()
    this.load()
  }

  load(){
    let res = this.storageService.getSession()
    if(res != null && res.rol != Rol.Ninguno){
      this.user = res
    }else{
      this.user = {
        usuario: "",
        token: "",
        rol: Rol.Ninguno,
        isLogedIn: false    
      }
    }
  }

  logout(){
    this.storageService.removeSession()
    this.load()
    this.router.navigate(['/login'])
  }

}