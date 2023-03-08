import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IAlumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno-service.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {

  result: string  = ""
  alumnos: IAlumno[] = []
  page: number = 1
  lastPage: number = 0
  size: number = 10
  selected: IAlumno = {
    Matricula: 0,
    Nombre: '',
    ApellidoMaterno: '',
    ApellidoPaterno: '',
    Usuario: '',
    Estatus: ''
  }

  public static updated$: Subject<any> = new Subject()

  constructor(
    private _alumnoService: AlumnoService
  ) {
    AlumnosComponent.updated$.subscribe(res => {
      this.update()
      this.changePage(this.page)
    })
  }

  ngOnInit(): void {
    this.update()
  }

  update(){
    this._alumnoService.getAlumnosByPage(1).then(
      res => {
        this.alumnos = res
        this.lastPage = this._alumnoService.pages
      }
    )
  }

  changePage(page: number){
    this.page = page
    this._alumnoService.getAlumnosByPage(page, this.size).then(
      res => this.alumnos = res
    )
  }

}
