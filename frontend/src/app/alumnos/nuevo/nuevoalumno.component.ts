import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAlumno } from 'src/app/models/alumno';
import { IMaestro } from 'src/app/models/maestro';
import { AlumnoService } from 'src/app/services/alumno-service.service';
import { MaestroService } from 'src/app/services/maestro.service';
import { AlumnosComponent } from '../alumnos.component';

@Component({
  selector: 'app-nuevoalumno',
  templateUrl: './nuevoalumno.component.html',
  styleUrls: ['./nuevoalumno.component.scss']
})
export class NuevoAlumnoComponent implements OnInit {

  result: string = ""

  constructor(
    private _alumnoService: AlumnoService,
    private _maestroService: MaestroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    document.forms[0].onsubmit = ()=>{return false}
  }

  async agregarAlumno(){
    let form = document.forms[0]
    const alumno: IAlumno = {
      Matricula: form['matricula'].value,
      Nombre: form['nombre'].value,
      ApellidoPaterno: form['apellidoPaterno'].value,
      ApellidoMaterno: form['apellidoMaterno'].value,
      Usuario: form['usuario'].value,
      Contrasena: form['contrasena'].value,
      Estatus: form['estatus'].value
    }

    let alumnos: IAlumno[] = []
    let maestros: IMaestro[] = [];
    await this._alumnoService.getAlumnos().then(r => alumnos = r)
    await this._maestroService.getMaestros().then(r => maestros = r)

    if(!alumno.Nombre.match(/([a-zA-Z]+\s)*[a-zA-Z]+$/)) return
    if(!alumno.ApellidoPaterno.match(/[a-zA-Z]+$/)) return
    if(!alumno.ApellidoMaterno.match(/[a-zA-Z]+$/)) return
    if(!alumno.Usuario.match(/([a-zA-Z]+\s)*[a-zA-Z0-9]+$/)) return

    if(alumnos.filter(a => a.Matricula == alumno.Matricula).length > 0){
      document.getElementById("matricula-error")?.removeAttribute("hidden")
      document.getElementById("alumno-result")?.removeAttribute("hidden")
      this.result = "Matricula en uso"
      return 
    }else{
      document.getElementById("matricula-error")?.setAttribute("hidden", "")
      document.getElementById("alumno-result")?.setAttribute("hidden", "")
    } 

    if(alumnos.filter(a=>a.Usuario == alumno.Usuario).length > 0
      || maestros.filter(m=>m.Usuario == alumno.Usuario).length > 0
    ){
      document.getElementById("usuario-error")?.removeAttribute("hidden")
      document.getElementById("alumno-result")?.removeAttribute("hidden")
      this.result = "Usuario en uso"
      return
    }else{
      document.getElementById("usuario-error")?.setAttribute("hidden", "")
      document.getElementById("alumno-result")?.setAttribute("hidden", "")
    } 
    this._alumnoService.createAlumno(alumno)
    .then(_ => {
      AlumnosComponent.updated$.next(false)
      this.router.navigate(['/alumnos'])
      window.location.reload()
    })
    .catch(err => {
      document.getElementById("usuario-error")?.removeAttribute("hidden")
      document.getElementById("alumno-result")?.removeAttribute("hidden")
      this.result = "Usuario en uso"
    })
    
    return false
  }



}
