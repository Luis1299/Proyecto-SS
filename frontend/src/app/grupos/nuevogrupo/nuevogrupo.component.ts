import { Component, OnInit } from '@angular/core';
import { Grupo, IGrupo } from 'src/app/models/grupo';
import { IMateria } from 'src/app/models/materia';
import { GrupoService } from 'src/app/services/grupo.service';
import { MateriaService } from 'src/app/services/materia.service';
import { GruposComponent } from '../grupos.component';

@Component({
  selector: 'app-nuevogrupo',
  templateUrl: './nuevogrupo.component.html',
  styleUrls: ['./nuevogrupo.component.scss']
})
export class NuevogrupoComponent implements OnInit {


  grupo: IGrupo = new Grupo()
  materias: IMateria[] = []
  result: string = ""

  constructor(
    private _materiaService: MateriaService,
    private _grupoService: GrupoService
  ) { }

  ngOnInit(): void {
    document.forms[0].onsubmit = ()=>{return false}
    this._materiaService.getAll().then(res => {
      this.materias = res
    })
  }

  nuevoGrupo(){
    const form = document.forms[0]
    let data: IGrupo = {
      IdGrupo: 0,
      Clave: form['materia'].value,
      CantidadAlumnos: form['cantidad'].value,
      Estatus: "Activo",
      AlumnosInscritos: 0,
      Materia: {
        Clave: 0,
        Estatus: "",
        Nombre: "",
      },
      Nombre: ""
    }

    document.getElementById("grupo-result")?.setAttribute("hidden", "")
    document.getElementById("grupo-success")?.setAttribute("hidden", "")

    this._grupoService.addGrupo(data).then(res => {
      document.getElementById("grupo-success")?.removeAttribute("hidden")
      GruposComponent.update$.next(false)
    }).catch(err => {
      document.getElementById("grupo-result")?.removeAttribute("hidden")
      this.result = "Ha ocurrido un error"      
    })

    return false
  }

}
