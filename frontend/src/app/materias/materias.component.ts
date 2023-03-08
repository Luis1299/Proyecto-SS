import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IMateria } from '../models/materia';
import { MateriaService } from '../services/materia.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit {

  public static updated$: Subject<any> = new Subject()

  materias: IMateria[] = []

  constructor(
    private _materiaService: MateriaService
  ) { 
    MateriasComponent.updated$.subscribe(res =>{
      this.update()
    })
  }

  ngOnInit(): void {
    this.update()
  }

  update(){
    this._materiaService.getAll().then(res =>{
      this.materias = res
    })
  }

}
