import { IUsuario } from "./usuario";

export interface IAlumno extends IUsuario{
    Matricula: number
}

export class Alumno implements IAlumno{
    Matricula: number = 0
    Nombre: string = ""
    ApellidoPaterno: string = ""
    ApellidoMaterno: string = ""
    Usuario: string = ""
    Estatus: string = ""
    Contrasena?: string | undefined;
    Id?: number

    getAlumno(): IAlumno {
        throw new Error("Method not implemented.");
    }

}
