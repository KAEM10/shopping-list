export interface Producto {
    id: string;
    nombre: string;
    comprado: boolean;
    idSitio: string;
    idLista: string;
}
  
export interface ListaCompras {
    id?: string;
    fechaRegistro: Date;
    productos: Producto[];
}

export interface Sitio {
    id?: string;
    nombre: string;
    fechaRegistro: Date;
}