import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NuevoProductoModalComponent } from '../../components/nuevo-producto-modal/nuevo-producto-modal.component';

export interface Producto {
  id: number;          
  nombre: string;      
  sitio: string;       
  comprado: boolean;   
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  productos: Producto[] = [
    { id: 1, nombre: 'Tomate', sitio: 'Placita campesina', comprado: false },
    { id: 2, nombre: 'Jabón', sitio: 'D1', comprado: false },
  ];

  constructor(private modalCtrl: ModalController) {}

  // Paso 3: Marcar producto como comprado
  marcarComprado(producto: Producto) {
    producto.comprado = true;
  }

  // Paso 4: Editar producto (en este ejemplo solo se muestra el producto en consola)
  editarProducto(producto: Producto) {
    console.log('Editar producto:', producto);
    // Aquí puedes abrir un modal para editar el producto
  }

  // Paso 5: Eliminar producto (solo si no está marcado como comprado)
  eliminarProducto(producto: Producto) {
    if (!producto.comprado) {
      this.productos = this.productos.filter((p) => p.id !== producto.id);
    } else {
      alert('No puedes eliminar un producto ya comprado');
    }
  }

  // Paso 6: Abrir modal para agregar un nuevo producto
  async abrirModalNuevoProducto() {
    const modal = await this.modalCtrl.create({
      component: NuevoProductoModalComponent,
    });

    // Al cerrar el modal, agregar el nuevo producto si se ha proporcionado
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.productos.push(data.data);
      }
    });

    await modal.present();
  }
}
