import { Chofer } from "app/logistica/models/chofer";
import { Sucursal } from "app/models";
import { Envio } from "./envio";

export interface Embarque {
    id?: string
    sucursal: Sucursal
    fecha: string
    documento?: number
    cerrado?: string
    chofer: Chofer
    comentario?: string
    kilos?: number
    regreso?: string
    salida?: string
    valor?: number
    partidas?: Array<Envio>
    dateCreated?: string
    lastUpdated?: string
    createUser?: string
    updateUser?: string
    numeroDePartidas?: number
    empleado?: string
}