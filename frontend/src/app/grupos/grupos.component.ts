import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IGrupo } from '../models/grupo';
import { GrupoService } from '../services/grupo.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  public static update$: Subject<any> = new Subject()

  grupos: IGrupo[] = []

  constructor(
    private _grupoService: GrupoService
  ) { 
    GruposComponent.update$.subscribe(res => {
      this.update()
    })
  }

  ngOnInit(): void {
    this.update()
  }

  update(){
    this._grupoService.getGrupos().then(r => this.grupos = r)
  }

}
