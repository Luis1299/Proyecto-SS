import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AlumnoGrupo, IAlumnoGrupo } from '../models/alumnogrupo';
import { IGrupo } from '../models/grupo';
import { InscripcionService } from '../services/inscripcion.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {

  grupos: IGrupo[] = []
  alumno: IAlumnoGrupo = new AlumnoGrupo()
  inscritos: IGrupo[] = []
  selected: IGrupo | null = null;

  msg: string = ""
  isLoading: boolean = true

  update$: Subject<any> = new Subject()

  constructor(
    private _inscripcionService: InscripcionService,
    private _storageService: StorageService
  ) { 
    this.update$.subscribe(val => {
      this.load()
    })
  }

  ngOnInit(): void {
    this.isLoading = true
    this.load()
  }

  async load(){
    let ses = this._storageService.getSession()
    if(ses){
      await this._inscripcionService.getAlumno(ses.usuario).then(res =>{
        this.alumno = res
      })
    }
    await this._inscripcionService.getGrupos().then(res => {
      this.grupos = res
      this.inscritos = this.alumno.Grupos
      this.inscritos = this.grupos.filter(g => this.inscritos.findIndex(gi => gi.IdGrupo == g.IdGrupo) > -1) 
      this.grupos = this.grupos.filter(g => g.Estatus != "Inactivo")
      this.grupos = this.grupos.filter(g => g.CantidadAlumnos > g.AlumnosInscritos)
      this.grupos = this.grupos.filter(g => this.inscritos.findIndex(i => i.Clave == g.Clave) == -1)
      this.grupos = this.grupos.filter(g => this.inscritos.findIndex(i => i.IdGrupo == g.IdGrupo) == -1)
    })
  }

  inscribir(grupo: IGrupo){
    this.isLoading = true
    this.selected = grupo
    let size = this.alumno.Grupos.length
    this._inscripcionService.inscribir(this.alumno.Matricula, grupo.IdGrupo).then(res => {
      this.isLoading = false
      this.msg = "<div>Alumno inscrito con éxito</div><p>Matricula:"+this.alumno.Matricula+"<br> Materia: "+grupo.Nombre+"<br> Grupo:"+grupo.IdGrupo+"</p>"
      this.update$.next(false)
    })
  }

  darBaja(grupo: IGrupo){
    this.isLoading = true
    this.selected = grupo
    this._inscripcionService.darBaja(this.alumno.Matricula, grupo.IdGrupo).then(res => {
      this.isLoading = false
      this.msg = "<div>Alumno dado de baja con éxito</div>"
      this.update$.next(false)
    })    
  }

}
