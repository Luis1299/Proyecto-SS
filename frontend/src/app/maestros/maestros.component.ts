import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IMaestro } from 'src/app/models/maestro';
import { MaestroService } from 'src/app/services/maestro.service';

@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.component.html',
  styleUrls: ['./maestros.component.scss']
})
export class MaestrosComponent implements OnInit {

  maestros: IMaestro[] = []
  public static updated$: Subject<any> = new Subject()

  constructor(
    private _maestroService: MaestroService
  ){ 
    MaestrosComponent.updated$.subscribe(res =>{
      this.update()
    })
  }

  ngOnInit(): void {
    this.update()
  }

  update(){
    this._maestroService.getMaestros().then(res => {
      this.maestros = res
    }).catch(err =>{
      console.log(err)
    })
  }

}
