import { Component, OnInit } from '@angular/core';
import { IAlumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno-service.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscaralumno.component.html',
  styleUrls: ['./buscaralumno.component.scss']
})
export class BuscarAlumnoComponent implements OnInit {

  alumnos: IAlumno[] = []

  constructor(
    private alumnoService: AlumnoService
  ) { }

  ngOnInit(): void {
    this.alumnoService.getAlumnos()
  }

  async buscarAlumno(){
    var form = document.forms[0]
    let alumno: IAlumno = {
      Nombre: form['nombre'].value,
      Usuario: form['usuario'].value,
      Matricula: form['matricula'].value,
      Estatus: "Activo",
      ApellidoMaterno: '',
      ApellidoPaterno: ''
    }

    let result = await this.alumnoService.getAlumnos()
    
    if(alumno.Nombre.length > 0){
      result = result.filter(a => a.Nombre.toLowerCase().includes(alumno.Nombre.toLowerCase()))
    }
    if(alumno.Usuario.length > 0){
      result = result.filter(a => a.Usuario.toLowerCase().includes(alumno.Usuario.toLowerCase()))
    }
    if(alumno.Matricula > 0){
      result = result.filter(a => a.Matricula == alumno.Matricula)
    }
    const estatus = form['estatus'].value
    if(estatus != "Todos"){
      result = result.filter(a => a.Estatus == estatus)
    }
    this.alumnos = result
    if(result.length == 0){
      document.getElementById("noAlumnos")?.removeAttribute("hidden")
      console.log("2")
    }
    else{
      document.getElementById("noAlumnos")?.setAttribute("hidden", "")  
    }

    return false

  }

}
