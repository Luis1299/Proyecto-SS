import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IGrupo } from '../models/grupo';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  url: string = environment.backendUrl
  controller: string = "/GrupoController"

  grupos: IGrupo[] = []

  constructor(
    private http: HttpClient
  ) { }

  async getGrupos(): Promise<IGrupo[]>{
    let result: IGrupo[] = []
    await this.http.get<IGrupo[]>(this.url + this.controller).forEach(r =>
      {
        result = r
      })
    return Promise.resolve(result)
  }

  async getGrupo(id: number): Promise<IGrupo[]>{
    let result: IGrupo[] = []
    result = await this.getGrupos()
    return result.filter(g => g.IdGrupo == id)
  }

  async editGrupo(grupo: IGrupo): Promise<IGrupo[]>{
    let result: IGrupo[] = []
    await this.http.put<IGrupo[]>(this.url + this.controller, JSON.stringify(grupo)).forEach(
      res => result = res
    )
    return result
  }

  async deleteGrupo(id: number): Promise<IGrupo[]>{
    let result: IGrupo[] = []
    await this.http.delete<IGrupo[]>(this.url + this.controller, {body:JSON.stringify({
      IdGrupo: id
    })}).forEach(
      res => result = res
    )
    return result
  }

  async addGrupo(grupo: IGrupo): Promise<IGrupo[]>{
    let result: IGrupo[] = []
    await this.http.post<IGrupo[]>(this.url + this.controller, JSON.stringify(grupo)).forEach(
      res => result = res
    )
    return result
  }


}
