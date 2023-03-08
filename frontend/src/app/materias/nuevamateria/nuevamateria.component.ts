import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMateria } from 'src/app/models/materia';
import { MateriaService } from 'src/app/services/materia.service';
import { MateriasComponent } from '../materias.component';

@Component({
  selector: 'app-nuevamateria',
  templateUrl: './nuevamateria.component.html',
  styleUrls: ['./nuevamateria.component.scss']
})
export class NuevamateriaComponent implements OnInit {

  constructor(
    private _materiaService: MateriaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    document.forms[0].onsubmit = ()=>{
      return false
    }
  }

  async nuevaMateria(){
    const form = document.forms[0]
    let data: IMateria = {
      Clave: form['cveMateria'].value,
      Nombre: form['nombre'].value,
      Estatus: form['estatus'].value
    }

    let anterior: IMateria[] = await this._materiaService.get(data.Clave)
    let flag = false

    if(data.Clave < 1 || anterior.length > 0){
      document.getElementById("cveMateria-error")?.removeAttribute("hidden")
      flag = true
    }else{
      document.getElementById("cveMateria-error")?.setAttribute("hidden", "")
    }
    if(!data.Nombre.match(/^[a-zA-Z][\sa-zA-Z0-9]+$/) || data.Nombre.length < 6){
      document.getElementById("nombre-error")?.removeAttribute("hidden")
      flag = true
    }else{
      document.getElementById("nombre-error")?.setAttribute("hidden", "")
    }
    if(flag == false){
      this._materiaService.add(data).then(
        _=>{
          MateriasComponent.updated$.next(false)
          document.getElementById("materia-success")?.removeAttribute("hidden")
        }
      )
    }

    return false

  }

}
