import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupo, IGrupo } from 'src/app/models/grupo';
import { IMateria } from 'src/app/models/materia';
import { GrupoService } from 'src/app/services/grupo.service';
import { MateriaService } from 'src/app/services/materia.service';
import { GruposComponent } from '../grupos.component';

@Component({
  selector: 'app-editargrupo',
  templateUrl: './editargrupo.component.html',
  styleUrls: ['./editargrupo.component.scss']
})
export class EditargrupoComponent implements OnInit {

  grupo: IGrupo = new Grupo()
  id: number = 0
  materias: IMateria[] = []
  result: string = ""

  constructor(
    private _grupoService: GrupoService,
    private _materiaService: MateriaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    document.forms[0].onsubmit = ()=>{return false}
    this.activatedRoute.params.forEach(val => {
      this.id = val['id']
    })
    this._grupoService.getGrupo(this.id).then(res =>{
      this.grupo = res[0]
    })
    this._materiaService.getAll().then(res => {
      this.materias = res
    })    
  }

  async editGrupo(){
    const form = document.forms[0]
    let data: IGrupo = {
      IdGrupo: this.id,
      CantidadAlumnos: form['cantidad'].value,
      Clave: form['materia'].value,
      Estatus: form['estatus'].value,
      Materia: {
        Clave: 0,
        Estatus : "",
        Nombre: ""
      },
      AlumnosInscritos: this.grupo.AlumnosInscritos,
      Nombre: ""
    }
    if(data.Clave == -1){
      data.Clave = this.grupo.Clave
    }

    if(data.CantidadAlumnos < 0){
      document.getElementById("grupo-result")?.removeAttribute("hidden")
      this.result = "Cantidad no puede ser menor a cero"
      return
    }

    this._grupoService.editGrupo(data).then(res => {
      document.getElementById("grupo-success")?.removeAttribute("hidden")
      GruposComponent.update$.next(false)
    }).catch(
      _=>{
        document.getElementById("grupo-result")?.removeAttribute("hidden")
        this.result = "Ha ocurrido un error"
    })    
  }

  deleteGrupo(){
    if(confirm("¿Eliminar grupo?")){
      this._grupoService.deleteGrupo(this.id)
      GruposComponent.update$.next(false)
      this.router.navigate(['grupos']).then(_=>location.reload())
    }
  }

}
