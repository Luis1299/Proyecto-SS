import { IEstatus } from "./estatus";

export enum Rol {
    Alumno='Alumno',
    Maestro='Maestro',
    Admin='Admin',
    Ninguno='Ninguno'
}

export interface IUsuario extends IEstatus{
    
    Nombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    Usuario: string;
    Contrasena?: string;

}

export class Usuario implements IUsuario{

    Nombre: string = ""
    ApellidoPaterno: string = ""
    ApellidoMaterno: string = ""
    Usuario: string = ""
    Estatus: string = ""
    Contrasena?: string | undefined;
    
}


export class Session {
    token: string = ""
    rol: Rol = Rol.Ninguno
    usuario: string = ""
    isLogedIn: boolean = false
}