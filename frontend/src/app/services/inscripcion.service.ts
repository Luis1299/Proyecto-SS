import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlumnoGrupo, IAlumnoGrupo } from '../models/alumnogrupo';
import { IGrupo } from '../models/grupo';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  url: string = environment.backendUrl
  controller: string = "/InscripcionController"

  constructor(
    private http: HttpClient
  ) { }

  async getGrupos(): Promise<IGrupo[]>{
    let res: IGrupo[] =  []
    await this.http.get<IGrupo[]>(this.url + this.controller).forEach(r =>
      {
        res = r
      }).catch(err => {
        console.log(err)
      })
    return Promise.resolve(res)
  }

  async getAlumno(usuario: string): Promise<IAlumnoGrupo>{
    let res: IAlumnoGrupo = new AlumnoGrupo()
    await this.http.get<IAlumnoGrupo>(this.url + this.controller + "?usuario=" + usuario).forEach(r => {
      res = r
    }).catch(err => console.log(err))
    return Promise.resolve(res)
  }

  async inscribir(matricula: number, idGrupo: number): Promise<IGrupo[]>{
    let data = {
      Matricula: matricula,
      IdGrupo: idGrupo
    }
    let result: IGrupo[] =  []
    await this.http.put<IGrupo[]>(this.url + this.controller, JSON.stringify(data)).forEach(r => {
      result = r
    }).catch(err => console.log(err))
    return Promise.resolve(result)
  }

  async darBaja(matricula: number, idGrupo: number): Promise<IGrupo[]>{
    let data = {
      Matricula: matricula,
      IdGrupo: idGrupo
    }
    let result: IGrupo[] =  []
    await this.http.delete<IGrupo[]>(this.url + this.controller, {body:JSON.stringify(data)}).forEach(r => {
      result = r
    }).catch(err => console.log(err))
    return Promise.resolve(result)
  }

}
