import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlumno } from 'src/app/models/alumno';
import { IMaestro, ITipo, Maestro } from 'src/app/models/maestro';
import { AlumnoService } from 'src/app/services/alumno-service.service';
import { MaestroService } from 'src/app/services/maestro.service';
import { MaestrosComponent } from '../maestros.component';

@Component({
  selector: 'app-editarmaestro',
  templateUrl: './editarmaestro.component.html',
  styleUrls: ['./editarmaestro.component.scss']
})
export class EditarMaestroComponent implements OnInit {

  selected: Maestro = new Maestro()
  tipos: ITipo[] = []
  noEmpleado: number = 0
  result: string = ""

  constructor(
    private _maestroService: MaestroService,
    private _alumnoService: AlumnoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    document.forms[0].onsubmit = ()=>{return false}
    this.activatedRoute.params.forEach(v => {
      this.noEmpleado = v['noempleado']
    })
    this._maestroService.getMaestro(this.noEmpleado).then(
      res => {
        this.selected = res[0]
      }
    )
    this._maestroService.getTipos().then(val =>{
      this.tipos = val
    })
  }

  async editMaestro(){
    
    document.getElementById("maestro-success")?.setAttribute("hidden", "")
    document.getElementById("maestro-result")?.setAttribute("hidden", "")

    const form = document.forms[0]
    const maestro: IMaestro = {
      NoEmpleado: form['numeroEmpleado'].value,
      Nombre: form['nombre'].value,
      ApellidoPaterno: form['apellidoPaterno'].value,
      ApellidoMaterno: form['apellidoMaterno'].value,
      Usuario: form['usuario'].value,
      Estatus: form['estatus'].value,
      Tipo: {
        IdTipo: form['tipo'].value,
        Tipo: ""
      }
    }

    if(maestro.Tipo.IdTipo == -1){
      maestro.Tipo.IdTipo = this.selected.Tipo.IdTipo
    }
    if(!maestro.Nombre.match(/([a-zA-Z]+\s)*[a-zA-Z]+$/)) return
    if(!maestro.ApellidoPaterno.match(/[a-zA-Z]+$/)) return
    if(!maestro.ApellidoMaterno.match(/[a-zA-Z]+$/)) return
    if(!maestro.Usuario.match(/([a-zA-Z]+\s)*[a-zA-Z0-9]+$/)) return

    let maestros: IMaestro[] = []
    let alumnos: IAlumno[] = []
    await this._maestroService.getMaestros().then(r => maestros = r)
    await this._alumnoService.getAlumnos().then(r => alumnos = r)

    if(maestros.filter(m => m.NoEmpleado == maestro.NoEmpleado).length > 0){
      document.getElementById("maestro-result")?.removeAttribute("hidden")
      this.result = "Numero de empleado ya en uso"
      return 
    }else{
      document.getElementById("maestro-result")?.setAttribute("hidden", "")
    }    
    
    if(alumnos.filter(a=>a.Usuario == maestro.Usuario).length > 0
     || maestros.filter(m=>m.Usuario == maestro.Usuario).length > 0
    ){
      document.getElementById("maestro-result")?.removeAttribute("hidden")
      this.result = "Usuario ya en uso"
      return 
    }else{
      document.getElementById("maestro-result")?.setAttribute("hidden", "")
    }


    this._maestroService.editMaestro(maestro).then(res => {
      MaestrosComponent.updated$.next(false)
      document.getElementById("maestro-success")?.removeAttribute("hidden")
    }).catch(err => {
      document.getElementById("maestro-result")?.removeAttribute("hidden")
      this.result = "Ocurrio un error"
      return
    })
  }

  deleteMaestro(){

    if(confirm("Borrar maestro?")){
      this._maestroService.deleteMaestro(this.noEmpleado)
      MaestrosComponent.updated$.next(false)
      this.router.navigate(['maestros']).then(_=>{location.reload()})      
    }

    return false
  }


}
