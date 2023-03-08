import { Component, OnInit } from '@angular/core';
import { IMaestro, ITipo } from 'src/app/models/maestro';
import { MaestroService } from 'src/app/services/maestro.service';

@Component({
  selector: 'app-buscarmaestro',
  templateUrl: './buscarmaestro.component.html',
  styleUrls: ['./buscarmaestro.component.scss']
})
export class BuscarMaestroComponent implements OnInit {

  tipos: ITipo[] = []
  maestros: IMaestro[] = []
  
  constructor(
    private _maestroService: MaestroService
  ) { }

  ngOnInit(): void {
    document.forms[0].onsubmit = () => {return false}
    this._maestroService.getTipos().then(res => {
      this.tipos = res
    })
  }

  async buscarMaestro(){
    const form = document.forms[0]
    let data: IMaestro = {
      NoEmpleado: form['noempleado'].value,
      Nombre: form['nombre'].value,
      Usuario: form['usuario'].value,
      ApellidoMaterno: "",
      ApellidoPaterno: "",
      Contrasena: "",
      Tipo: {
        Tipo: "",
        IdTipo: Number(form['tipo'].value)
      },
      Estatus: form['estatus'].value
    }
    let result: IMaestro[] = []
    await this._maestroService.getMaestros().then(val => {
      result = val
    })
    console.log(result)

    if(data.NoEmpleado >= 0){
      result = result.filter(m => m.NoEmpleado.toString().includes(data.NoEmpleado.toString()))
    }
    if(data.Nombre.length > 0){
      result = result.filter(m => m.Nombre.includes(data.Nombre))
    }
    if(data.Usuario.length > 0){
      result = result.filter(m => m.Usuario.includes(data.Usuario))
    }
    if(data.Tipo.IdTipo > 0){
      result = result.filter(m => m.Tipo.IdTipo == data.Tipo.IdTipo)      
    }
    if(data.Estatus != "Todos"){
      result = result.filter(m => m.Estatus == data.Estatus)
    }
    if(result.length > 0){
      document.getElementById("noMaestros")?.setAttribute("hidden", "")
    }else {
      document.getElementById("noMaestros")?.removeAttribute("hidden")
    }
    this.maestros = result


  }

}
