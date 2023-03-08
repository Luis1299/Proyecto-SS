import { IAlumno } from "./alumno";
import { IGrupo } from "./grupo";

export interface IGrupoSemestre extends IGrupo{
    Calificacion: number
    Estatus: string
}

export interface IAlumnoGrupo extends IAlumno{
    Grupos: IGrupoSemestre[]
}

export class AlumnoGrupo implements IAlumnoGrupo{
    Grupos: IGrupoSemestre[] = [];
    Matricula: number = 0;
    Nombre: string = "";
    ApellidoPaterno: string = "";
    ApellidoMaterno: string = "";
    Usuario: string = "";
    Estatus: string = "Activo";
    Contrasena?: string | undefined = "";
}
