import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMaestro, ITipo, Maestro } from '../models/maestro';

@Injectable({
  providedIn: 'root'
})
export class MaestroService {

  url = environment.backendUrl
  controller: string = "/MaestroController"
  tipoController: string = "/TipoController"

  constructor(
    private http: HttpClient
  ) { }

  async getMaestros(): Promise<IMaestro[]>{
    let res: IMaestro[] = []
    try {
      await this.http.get<IMaestro[]>(this.url + this.controller).forEach(r => {
        res = r
      })
      return Promise.resolve(res)  
    } catch (error) {
      return Promise.reject(error)
    }
    
  }

  async getMaestro(noempleado: number): Promise<IMaestro[]>{
    let result: IMaestro[] = []
    result = await this.getMaestros()
    return result.filter(m => m.NoEmpleado == noempleado)    
  }

  async getTipos(): Promise<ITipo[]>{
    let result: ITipo[]= []
    await this.http.get<ITipo[]>(this.url + this.tipoController).forEach(res => {
      result = res
    }).catch(err => {
      return Promise.reject(err)
    })
    return Promise.resolve(result)
  }

  async editMaestro(maestro: IMaestro): Promise<IMaestro[]>{
    let res: IMaestro[] = []
    await this.http.put<IMaestro[]>(this.url + this.controller, JSON.stringify(maestro)).forEach(r => {
      res = r
    }).catch(error => {
      return Promise.reject(error)
    })
    return Promise.resolve(res)
  }

  async deleteMaestro(noempleado: number): Promise<IMaestro[]>{
    let result: IMaestro[] = []
    await this.http.delete<IMaestro[]>(this.url + this.controller, {
      body: JSON.stringify({"NoEmpleado": noempleado})
    }).forEach(res => {
      result = res
    })
    return result
  }

  async addMaestro(maestro: IMaestro): Promise<IMaestro[]>{
    let result: IMaestro[] = []
    await this.http.post<IMaestro[]>(this.url + this.controller, JSON.stringify(maestro)).forEach(r => {
      result = r
    }).catch(err => {
      return Promise.reject(err)
    })
    return Promise.resolve(result)

  }

}

