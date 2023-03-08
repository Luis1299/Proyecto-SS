import { IUsuario } from "./usuario"

export interface ITipo {
    IdTipo: number
    Tipo: string
}

export interface IMaestro extends IUsuario{

    NoEmpleado: number,
    Tipo: ITipo

}

export class Maestro implements IMaestro{
    NoEmpleado: number = 0
    Tipo: ITipo = { IdTipo: 0, Tipo: "" }
    Nombre: string = ""
    ApellidoPaterno: string = ""
    ApellidoMaterno: string = ""
    Usuario: string = ""
    Estatus: string = ""
    Contrasena?: string | undefined = ""

}