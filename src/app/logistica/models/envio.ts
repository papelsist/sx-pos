import { Cliente } from "app/models";
import { Embarque } from "./embarque";

export interface Envio {
    id?: string
    cliente?: Cliente
    origen: string
    entidad: string
    porCobrar?: number
    parcial?: boolean
    paquetes?: number
    kilos?: number
    comision?: number
    valor?: number
    totalDocumento?: number
    arriboLatitud?: number
    arriboLongitud?: number
    recepcionLatitud?: number
    recepcionLongitud?: number
    arribo?: string
    recepcion?: string
    recibio?: string
    comentario?: string
    documento?: string
    fechaDocumento?: string
    nombre?: string
    tipoDocumento?: string
    area?: string
    formaPago?: string
    entregado?: boolean
    completo?: boolean
    matratado?: boolean
    impreso?: boolean
    cortado?: boolean
    motivo?: string
    reportoNombre?: string
    reportoPuesto?: string
    partidas?: Array<any>
    reated?: string
    lastUpdated?: string
    embarque?: Embarque
    numeroDePartidas?: number
}   
    
    
    