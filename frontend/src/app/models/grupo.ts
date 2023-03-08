import { IEstatus } from "./estatus";
import { IMateria } from "./materia";

export interface IGrupo extends IEstatus{
    AlumnosInscritos: number;
    Materia: IMateria | null,
    CantidadAlumnos: number,
    Nombre: string,
    IdGrupo: number,
    Clave: number
}

export class Grupo implements IGrupo{
    Materia: IMateria | null = null;
    CantidadAlumnos: number = 0;
    IdGrupo: number = 0;
    Clave: number = 0;
    AlumnosInscritos: number = 0;
    Nombre: string = "";
    Estatus: string = "";
}
