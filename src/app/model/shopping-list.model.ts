export interface Producto {
    nombre: string;
    comprado: boolean;
    idSitio: string;
    idLista: string;
}
  
export interface ListaCompras {
    fechaRegistro: Date;
    productos: Producto[];
}

export interface Sitio {
    nombre: string;
    fechaRegistro: Date;
}