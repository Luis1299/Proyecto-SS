import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Rol, Session, Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isProcessing: boolean = false

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) { 
  }

  ngOnInit(): void {
    document.forms[0].onsubmit = ()=>{return false}
    let token = this.storageService.getCurrentToken()
    if(token){
      this.authService.validateToken(token).then(isvalid => {
        if(!isvalid){
          this.storageService.removeSession()
          location.reload()
        }else{
          this.loginCorrecto()
        }
      })
    }
  }

  submitForm(){
    if(this.isProcessing) return
    this.isProcessing = true
    var form = document.forms[0]
    const usuario = form['usuario']
    if(usuario.value.match(/^[a-zA-Z0-9]+$/) && !usuario.value.includes(" ")){
      form[0].children[2].setAttribute("hidden", "")
    }else{
      form[0].children[2].removeAttribute("hidden")
    }
    const contrasena = form['contrasena']
    if(contrasena.value.match(/^[a-zA-Z0-9]+$/) && !contrasena.value.includes(" ")){
      form[2].children[2].setAttribute("hidden", "")
    }else{
      form[2].children[2].removeAttribute("hidden")
    }
    this.authService.login(usuario.value, contrasena.value).forEach(
      val => {
        if(val.token == ""){
          document.getElementById("errorText")?.removeAttribute("hidden")
          return
        }
        let session: Session = {
          rol: val.rol,
          token: val.token,
          usuario: val.usuario,
          isLogedIn: true
        }
        StorageService.update$.next(session)
        this.loginCorrecto()
      }).catch(
        err => {
          document.getElementById("errorText")?.removeAttribute("hidden")
      }).finally(()=>{this.isProcessing = false})
      return false
  }

  loginCorrecto(){
    const rol = this.storageService.getRol()
    AppComponent.update$.next(false)
    if(rol == Rol.Admin){
      this.router.navigate(['/alumnos'])
      return
    }
    if(rol == Rol.Maestro){
      this.router.navigate(['/materias'])
      return
    }
    if(rol == Rol.Alumno){
      this.router.navigate(['/inscripcion'])
      return
    }
    this.router.navigate(['/alumnos'])
    
  }
}