import { Chofer } from "./chofer";
import { Facturista } from "./facturista";

export interface Transporte {

    id: string
    numero: string
    descripcion: string
    placas?: string
    marca?: string
    modelo?: string
    anio?: string
    capacidad: number
    chofer: Chofer
    facturista: Facturista
    dateCreated?: string
    lastUpdated?: string
    createUser?: string
    updateUser?: string
}