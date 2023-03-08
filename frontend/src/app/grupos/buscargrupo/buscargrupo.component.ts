import { Component, OnInit } from '@angular/core';
import { IGrupo } from 'src/app/models/grupo';
import { IMateria } from 'src/app/models/materia';
import { GrupoService } from 'src/app/services/grupo.service';
import { MateriaService } from 'src/app/services/materia.service';

@Component({
  selector: 'app-buscargrupo',
  templateUrl: './buscargrupo.component.html',
  styleUrls: ['./buscargrupo.component.scss']
})
export class BuscargrupoComponent implements OnInit {

  materias: IMateria[] = []
  grupos: IGrupo[] = []

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

  async buscar(){
    const form = document.forms[0]
    const materia = form['materia'].value
    const estatus = form['estatus'].value
    
    this.grupos = await this._grupoService.getGrupos()
    if(materia != "Todos")
      this.grupos = this.grupos.filter(g => g.Clave == materia)
    if(estatus != "Todos")
      this.grupos = this.grupos.filter(g => g.Estatus == estatus)


    return false
  }

}
