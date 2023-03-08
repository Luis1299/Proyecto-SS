import { IEstatus } from "./estatus";

export interface IMateria extends IEstatus{
    Clave: number
    Nombre: string
}

export class Materia implements IMateria{
    Clave: number = 0;
    Nombre: string = "";
    Estatus: string = "";
}
