import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AlumnoGruposComponent } from './alumnos/alumnogrupos/alumnogrupos.component';
import { MaestrosComponent } from './maestros/maestros.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BuscarAlumnoComponent } from './alumnos/buscar/buscaralumno.component';
import { EditarMaestroComponent } from './maestros/editar/editarmaestro.component';
import { NuevoMaestroComponent } from './maestros/nuevo/nuevomaestro.component';
import { BuscarMaestroComponent } from './maestros/buscar/buscarmaestro.component';
import { MateriasComponent } from './materias/materias.component';
import { NuevamateriaComponent } from './materias/nuevamateria/nuevamateria.component';
import { EditarmateriaComponent } from './materias/editarmateria/editarmateria.component';
import { BuscarmateriaComponent } from './materias/buscarmateria/buscarmateria.component';
import { GruposComponent } from './grupos/grupos.component';
import { BuscargrupoComponent } from './grupos/buscargrupo/buscargrupo.component';
import { EditargrupoComponent } from './grupos/editargrupo/editargrupo.component';
import { NuevogrupoComponent } from './grupos/nuevogrupo/nuevogrupo.component'
import { TokenInterceptor } from './interceptor/token.interceptor';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { InscritosComponent } from './inscripcion/inscritos/inscritos.component';
import { EditarAlumnoComponent } from './alumnos/editar/editaralumno.component';
import { NuevoAlumnoComponent } from './alumnos/nuevo/nuevoalumno.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlumnosComponent,
    AlumnoGruposComponent,
    MaestrosComponent,
    BuscarAlumnoComponent,
    EditarMaestroComponent,
    NuevoMaestroComponent,
    BuscarMaestroComponent,
    MateriasComponent,
    NuevamateriaComponent,
    EditarmateriaComponent,
    BuscarmateriaComponent,
    GruposComponent,
    BuscargrupoComponent,
    EditargrupoComponent,
    NuevogrupoComponent,
    InscripcionComponent,
    InscritosComponent,
    EditarAlumnoComponent,
    NuevoAlumnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
