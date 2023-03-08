import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AlumnoGruposComponent } from './alumnos/alumnogrupos/alumnogrupos.component';
import { LoginComponent } from './login/login.component';
import { MaestrosComponent } from './maestros/maestros.component';
import { AuthGuard } from './guard/auth-guard.guard';
import { BuscarAlumnoComponent } from './alumnos/buscar/buscaralumno.component';
import { EditarMaestroComponent } from './maestros/editar/editarmaestro.component';
import { NuevoMaestroComponent } from './maestros/nuevo/nuevomaestro.component';
import { MateriasComponent } from './materias/materias.component';
import { EditarmateriaComponent } from './materias/editarmateria/editarmateria.component';
import { BuscarmateriaComponent } from './materias/buscarmateria/buscarmateria.component';
import { NuevamateriaComponent } from './materias/nuevamateria/nuevamateria.component';
import { GruposComponent } from './grupos/grupos.component';
import { EditargrupoComponent } from './grupos/editargrupo/editargrupo.component';
import { NuevogrupoComponent } from './grupos/nuevogrupo/nuevogrupo.component';
import { BuscargrupoComponent } from './grupos/buscargrupo/buscargrupo.component';
import { BuscarMaestroComponent } from './maestros/buscar/buscarmaestro.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { EditarAlumnoComponent } from './alumnos/editar/editaralumno.component';
import { NuevoAlumnoComponent } from './alumnos/nuevo/nuevoalumno.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'alumnos',
        component: AlumnosComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'buscar',
            component: BuscarAlumnoComponent,
            pathMatch: "full"
          },
          {
            path: 'grupos/:matricula',
            component: AlumnoGruposComponent
          },
          {
            path: 'editar/:matricula',
            component: EditarAlumnoComponent
          },
          {
            path: 'nuevo',
            component: NuevoAlumnoComponent
          }
        ]
      },
      {
        path: 'maestros',
        component: MaestrosComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'editar/:noempleado',
            component: EditarMaestroComponent
          },
          {
            path: 'nuevo',
            component: NuevoMaestroComponent
          },
          {
            path: 'buscar',
            component: BuscarMaestroComponent
          }
        ]
      },
      {
        path: 'materias',
        component: MateriasComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'editar/:cvemateria',
            component: EditarmateriaComponent
          },
          {
            path: 'nuevo',
            component: NuevamateriaComponent
          },
          {
            path: 'buscar',
            component: BuscarmateriaComponent
          }
        ]
      },
      {
        path: 'grupos',
        component: GruposComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'editar/:id',
            component: EditargrupoComponent
          },
          {
            path: 'nuevo',
            component: NuevogrupoComponent
          },
          {
            path: 'buscar',
            component: BuscargrupoComponent
          }
        ]
      },
      {
        path: 'inscripcion',
        component: InscripcionComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
