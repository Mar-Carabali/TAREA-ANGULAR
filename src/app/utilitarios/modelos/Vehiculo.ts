export interface Vehiculo {
    codigo: string;
    imagenURL?: string |null ;
    marca: string;
    modelo?: string;
    anio?: string;
    kilometraje?: string;
    precio?: number;
    calificacion?: number | null;
}

export interface Respuesta{
    codigo: string;
    mensaje:string;
    data:Array<Vehiculo>|Vehiculo|any;
    rows:number;
    pages:number;
    records:number;
    page:number
}