import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoGrupo, IAlumnoGrupo, IGrupoSemestre } from 'src/app/models/alumnogrupo';
import { IGrupo } from 'src/app/models/grupo';
import { AlumnoService } from 'src/app/services/alumno-service.service';
import { GrupoService } from 'src/app/services/grupo.service';

// interface Semestre{
//   Semestre: number
//   Promedio: number
//   Grupos: IGrupoSemestre[]
// }

@Component({
  selector: 'app-grupos',
  templateUrl: './alumnogrupos.component.html',
  styleUrls: ['./alumnogrupos.component.scss']
})
export class AlumnoGruposComponent implements OnInit {
  
  alumno: IAlumnoGrupo = new AlumnoGrupo()
  // semestres: Semestre[] = []
  matricula: number = 0
  
  constructor(
    private _AlumnoGrupoService: GrupoService,
    private _alumnoService: AlumnoService,
    private _activatedRoute: ActivatedRoute,
  ) { 
  }

  ngOnInit(): void {
    this._activatedRoute.params.forEach(param => {
      this.matricula = param['matricula']
      console.log(this.matricula)
      this.load()
    })
  }

  load(){    
    this._alumnoService.getAlumno(this.matricula).then(
      val => {
        console.log(val)
        this.alumno = val
      }
    ).then(()=>{  
      // if(this.alumno.Grupos.length == 0){
      //   // this.semestres = [
      //   //   {Semestre: 1, Promedio: 0, Grupos: []}
      //   // ]
      //   return
      // }
      // this.alumno.Grupos.sort((a,b)=>a.Semestre-b.Semestre)
      // for(let i=1; i<=this.alumno.Grupos[this.alumno.Grupos.length-1].Semestre; i++){
      //   let semestre = []
      //   let sum = 0
      //   for(let j=0; j<this.alumno.Grupos.length; j++){
      //     if(this.alumno.Grupos[j].Semestre >i ) 
      //       break;
      //     if(this.alumno.Grupos[j].Semestre == i){
      //       semestre.push(this.alumno.Grupos[j])
      //       sum+=this.alumno.Grupos[j].Calificacion
      //     }
      //   }
      //   this.semestres.push({Semestre: i, Grupos: semestre, Promedio: sum/semestre.length || 0})
      // }
      // this.semestres.sort((a,b)=>a.Semestre - b.Semestre)
    })
    
  }

}
