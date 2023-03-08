import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMateria } from 'src/app/models/materia';
import { MateriaService } from 'src/app/services/materia.service';

@Component({
  selector: 'app-buscarmateria',
  templateUrl: './buscarmateria.component.html',
  styleUrls: ['./buscarmateria.component.scss']
})
export class BuscarmateriaComponent implements OnInit {

  materias: IMateria[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private _materiaService: MateriaService
  ) { }

  ngOnInit(): void {
    document.forms[0].onsubmit = ()=>{
      return false
    }
    
  }

  async buscarMateria(){
    const form = document.forms[0]
    let data: IMateria = {
      Clave: form['cveMateria'].value || 0,
      Nombre: form['nombre'].value || "",
      Estatus: form['estatus'].value || "Todos"
    }
    this.materias = await this._materiaService.getAll()

    if(data.Clave >= 1){
      this.materias = this.materias.filter(m => m.Clave.toString().includes(data.Clave.toString()))
    }
    if(data.Nombre != ""){
      this.materias = this.materias.filter(m => m.Nombre.toLowerCase().includes(data.Nombre.toLowerCase()))
    }
    if(data.Estatus != "Todos"){
      this.materias = this.materias.filter(m => m.Estatus == data.Estatus)
    }
    return false
  }

}