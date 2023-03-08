import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno, IAlumno } from 'src/app/models/alumno';
import { AlumnoGrupo, IAlumnoGrupo } from 'src/app/models/alumnogrupo';
import { AlumnoService } from 'src/app/services/alumno-service.service';
import { MaestroService } from 'src/app/services/maestro.service';
import { AlumnosComponent } from '../alumnos.component';

@Component({
  selector: 'app-editaralumno',
  templateUrl: './editaralumno.component.html',
  styleUrls: ['./editaralumno.component.scss']
})
export class EditarAlumnoComponent implements OnInit {

  alumno: IAlumnoGrupo = new AlumnoGrupo()
  matricula: number = 0
  
  result: string = ""

  constructor(
    private _alumnoService: AlumnoService,
    private _maestroService: MaestroService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    document.forms[0].onsubmit = ()=>{return false}
    this.activatedRoute.params.forEach(v => {
      this.matricula = v['matricula']
      this._alumnoService.getAlumno(this.matricula).then(res => {
        this.alumno = res
      })
    }).then(_=>{
      
    })
  }

  async editAlumno(){
    document.getElementById("alumno-success")?.setAttribute("hidden", "")
    document.getElementById("alumno-error")?.setAttribute("hidden", "")
    document.getElementById("usuario-error")?.setAttribute("hidden", "")
    let form = document.forms[0]
    const alumno: IAlumno = {
      Matricula: this.alumno.Matricula,
      Nombre: form['nombre'].value,
      ApellidoPaterno: form['apellidoPaterno'].value,
      ApellidoMaterno: form['apellidoMaterno'].value,
      Usuario: form['usuario'].value,
      Contrasena: form['contrasena'].value,
      Estatus: form['estatus'].value
    }

    let alumnos = await this._alumnoService.getAlumnos()
    let maestros = await this._maestroService.getMaestros()
    
    if(!alumno.Nombre.match(/([a-zA-Z]+\s)*[a-zA-Z]+$/)) return
    if(!alumno.ApellidoPaterno.match(/[a-zA-Z]+$/)) return
    if(!alumno.ApellidoMaterno.match(/[a-zA-Z]+$/)) return
    if(!alumno.Usuario.match(/([a-zA-Z]+\s)*[a-zA-Z0-9]+$/)) return
    
    if(alumno.Usuario != this.alumno.Usuario){      
      console.log("1111")
      if(alumnos.filter(a=>a.Usuario == alumno.Usuario).length > 0
        || maestros.filter(m=>m.Usuario == alumno.Usuario).length > 0
      ){
        console.log("222")
        this.result = "Usuario ya en uso"
        document.getElementById("usuario-error")?.removeAttribute("hidden")
        document.getElementById("alumno-error")?.removeAttribute("hidden")
        return
      }
    }
    await this._alumnoService.editAlumno(alumno).then(res => {
      console.log(res)
      AlumnosComponent.updated$.next(false)
      document.getElementById("alumno-success")?.removeAttribute("hidden")
    }).catch(err => {
      console.log(err)
      document.getElementById("alumno-error")?.removeAttribute("hidden")
    })
    this._alumnoService.editAlumno(alumno)

    return false
  }

  deleteAlumno(){

    if(confirm("Borrar alumno?")){
      this._alumnoService.deleteAlumno(this.matricula).then(_=>{
        AlumnosComponent.updated$.next(false)
        this.router.navigate(['alumnos']).then(_=>{location.reload()})
      })
    }
  }

}
