import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IMateria } from '../models/materia';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {


  url = environment.backendUrl
  controller = '/MateriaController'

  constructor(
    private http: HttpClient
  ) { }

  async getAll(): Promise<IMateria[]>{
    let result: IMateria[] = []
    await this.http.get<IMateria[]>(this.url + this.controller).forEach(
      res => {
        result = res
      }
    ).catch(err => {
      return Promise.reject("Error")
    })
    return Promise.resolve(result)
  }

  async get(clave: number): Promise<IMateria[]>{
    let result: IMateria[] = []
    result = await this.getAll()
    return result.filter(m => m.Clave == clave)
  }

  async edit(materia: IMateria): Promise<IMateria[]>{
    let result: IMateria[] = []
    let body = JSON.stringify(materia)
    await this.http.put<IMateria[]>(this.url + this.controller, body=body).forEach(
      res => result = res
    ).catch(err => {
      return Promise.reject("Error")
    })
    return Promise.resolve(result)
  }

  async delete(clave: number): Promise<IMateria[]>{
    let result: IMateria[] = []
    let data = {
      Clave: clave
    }
    await this.http.delete<IMateria[]>(this.url + this.controller, {body:JSON.stringify(data)}).forEach(
      res => result = res
    ).catch(err => {
      return Promise.reject("Error")
    })
    return Promise.resolve(result)
  }

  async add(materia: IMateria): Promise<IMateria[]>{
    let result: IMateria[] = []
    await this.http.post<IMateria[]>(this.url + this.controller, JSON.stringify(materia)).forEach(
      res => result = res
    ).catch(err => {
      return Promise.reject("Error")
    })
    return Promise.resolve(result)
  }


}
