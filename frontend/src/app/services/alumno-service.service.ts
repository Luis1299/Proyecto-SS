import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAlumno } from '../models/alumno';
import { AlumnoGrupo, IAlumnoGrupo } from '../models/alumnogrupo';

interface IAlumnoGet {
  Matricula: number
  Id: number
  Nombre: string
  ApellidoPaterno: string
  ApellidoMaterno: string
  Usuario: string
  Estatus: string
}


@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  adminPass: string = "123456"
  pages: number = 0
  controller: string = "/AlumnosController"
  alumnos: IAlumno[] = []

  constructor(
    private http: HttpClient
  ) { 

  }

  async getAlumnos(): Promise<IAlumno[]>{
    let result: IAlumno[] = []
    await this.http.get<IAlumno[]>(environment.backendUrl + this.controller).forEach(
      res => {result = res}
    )
    this.pages = result.length / 10
    return result
  }

  async getAlumno(matricula: number): Promise<IAlumnoGrupo>{
    let res: IAlumnoGrupo = new AlumnoGrupo();
    await this.http.get<IAlumnoGrupo>(environment.backendUrl + this.controller + "?matricula="+matricula).forEach(
      val => { 
        res = val
      }
    )
    return Promise.resolve(res)
    
  }

  async getAlumnosByPage(page: number, size:number = 10): Promise<IAlumno[]>{
    let res: IAlumno[] = []
    await this.http.get<IAlumnoGet[]>(environment.backendUrl + this.controller).forEach(
      data => {
        const newArray = data.map((id, ...keep)=>keep)
        this.pages = data.length / size + 1
        res = data.slice((page-1) * size, page*size)
      }
    )
    return Promise.resolve(res)
  }

  async editAlumno(data: IAlumno): Promise<String>{
    let res: String = ""
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    await this.http.put<String>(environment.backendUrl + this.controller, JSON.stringify(data), {
      headers: headers
    }).forEach(r => {
      res = r
    }).catch(error => {
      Promise.reject(error)
    })
    return Promise.resolve(res)
  }

  async createAlumno(data: IAlumno): Promise<String>{
    let res: String = ""
    try{
      await this.http.post<String>(environment.backendUrl + this.controller, JSON.stringify(data)).forEach(
        res => {
          
        })
      return Promise.resolve(res)
    }catch(err){
      return Promise.reject(err)
    }
   
  }

  async deleteAlumno(matricula: Number): Promise<IAlumno[]>{
    let result: IAlumno[] = []
    await this.http.delete<IAlumno[]>(environment.backendUrl + this.controller,{
      body: JSON.stringify({"Matricula": matricula})
    }).forEach(res => { 
      result = res
    })
    return Promise.resolve(result)
  }

}
