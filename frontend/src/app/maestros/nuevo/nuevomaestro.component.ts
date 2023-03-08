import { Component, OnInit } from '@angular/core';
import { IAlumno } from 'src/app/models/alumno';
import { IMaestro, ITipo, Maestro } from 'src/app/models/maestro';
import { AlumnoService } from 'src/app/services/alumno-service.service';
import { MaestroService } from 'src/app/services/maestro.service';
import { MaestrosComponent } from '../maestros.component';

@Component({
  selector: 'app-nuevomaestro',
  templateUrl: './nuevomaestro.component.html',
  styleUrls: ['./nuevomaestro.component.scss']
})
export class NuevoMaestroComponent implements OnInit {

  tipos: ITipo[] = []
  result: string = ""

  constructor(
    private _maestroService: MaestroService,
    private _alumnoService: AlumnoService
  ) { }

  ngOnInit(): void {
    document.forms[0].onsubmit = ()=>{return false}
    this._maestroService.getTipos().then(res => {
      this.tipos = res
    })
  }

  async nuevoMaestro(){
    const form = document.forms[0]
    const data: IMaestro = {
      NoEmpleado: form['numeroEmpleado'].value,
      Nombre: form['nombre'].value,
      ApellidoPaterno: form['apellidoPaterno'].value,
      ApellidoMaterno: form['apellidoMaterno'].value,
      Usuario: form['usuario'].value,
      Contrasena: form['contrasena'].value,
      Tipo: {
        IdTipo: form['tipo'].value,
        Tipo: ""
      },
      Estatus: form["estatus"].value
    }
    
    if(!data.Nombre.match(/([a-zA-Z]+\s)*[a-zA-Z]+$/)) return
    if(!data.ApellidoPaterno.match(/[a-zA-Z]+$/)) return
    if(!data.ApellidoMaterno.match(/[a-zA-Z]+$/)) return
    if(!data.Usuario.match(/([a-zA-Z]+\s)*[a-zA-Z0-9]+$/)) return

    let maestros: IMaestro[] = []
    let alumnos: IAlumno[] = []
    await this._maestroService.getMaestros().then(r => maestros = r)
    await this._alumnoService.getAlumnos().then(r => alumnos = r)

    if(maestros.filter(m => m.NoEmpleado == data.NoEmpleado).length > 0){
      document.getElementById("maestro-result")?.removeAttribute("hidden")
      this.result = "Numero de empleado ya en uso"
      return 
    }else{
      document.getElementById("maestro-result")?.setAttribute("hidden", "")
    }    
    
    if(alumnos.filter(a=>a.Usuario == data.Usuario).length > 0
     || maestros.filter(m=>m.Usuario == data.Usuario).length > 0
    ){
      document.getElementById("maestro-result")?.removeAttribute("hidden")
      this.result = "Usuario ya en uso"
      return 
    }else{
      document.getElementById("maestro-result")?.setAttribute("hidden", "")
    }

    await this._maestroService.addMaestro(data)
    MaestrosComponent.updated$.next(false)
  }

}
