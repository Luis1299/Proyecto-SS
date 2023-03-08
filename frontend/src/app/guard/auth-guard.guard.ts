import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Rol } from '../models/usuario';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private storageService: StorageService,
    private router: Router
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // return true
      var url = state.url
      var rol = this.storageService.getRol()
      console.log(url, rol)
      if(this.storageService.isAuthenticated()){
        if(rol == Rol.Admin){
          var rutas = ["/maestros", "/alumnos"]
          if(rutas.includes(url)){  
            return true
          }
        }
        if(rol == Rol.Maestro){
          var rutas = ["/materias", "/grupos"]
          if(rutas.includes(url)){  
            return true
          }
        }
        if(rol == Rol.Alumno){
          var rutas = ["/inscripcion"]
          if(rutas.includes(url)){  
            return true
          }
        }
      }
      this.router.navigate(['/login'])
      return false
  }


  
}
