import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMateria, Materia } from 'src/app/models/materia';
import { MateriaService } from 'src/app/services/materia.service';
import { MateriasComponent } from '../materias.component';

@Component({
  selector: 'app-editarmateria',
  templateUrl: './editarmateria.component.html',
  styleUrls: ['./editarmateria.component.scss']
})
export class EditarmateriaComponent implements OnInit {

  materia: Materia = new Materia()
  clave: number = 0

  constructor(
    private activatedRoute: ActivatedRoute,
    private _materiaService: MateriaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.forEach(val => {
      this.clave = val['cvemateria']
    })
    this._materiaService.get(this.clave).then(
      res =>{ 
        this.materia = res[0] 
        console.log(res)
      }
    )
    document.forms[0].onsubmit = ()=>{
      return false
    }
  }

  editMateria(){

    const form = document.forms[0]
    let data: IMateria = {
      Clave: this.materia.Clave,
      Nombre: form['nombre'].value,
      Estatus: form['estatus'].value
    }

    this._materiaService.edit(data).then(
      _=>MateriasComponent.updated$.next(false)
    )
    return false
  }

  deleteMateria(){

    if(confirm("¿Eliminar materia?")){
      this._materiaService.delete(this.clave).then(
        _=>MateriasComponent.updated$.next(false)
      ).then(
        _=>{
          this.router.navigate(['/materia'])
          location.reload()
        }
      )
    }

    return false
  }

}
