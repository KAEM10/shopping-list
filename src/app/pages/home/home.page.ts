import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NuevoProductoModalComponent } from '../../components/nuevo-producto-modal/nuevo-producto-modal.component';
import { NuevoSitioModalComponent } from '../../components/nuevo-sitio-modal/nuevo-sitio-modal.component';

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

  sitios: string[] = ['Placita campesina', 'D1', 'Éxito', 'Ara'];

  constructor(private modalCtrl: ModalController) {}

  // Abrir modal de "Nuevo Producto"
  async abrirModalNuevoProducto() {
    const modal = await this.modalCtrl.create({
      component: NuevoProductoModalComponent,
      componentProps: {
        sitios: this.sitios,
        abrirModalNuevoSitio: () => this.abrirModalNuevoSitio(),
      },
    });

    // Manejar el cierre del modal de forma segura
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const producto = result.data as Producto; // Cast seguro a Producto
        this.productos.push({ ...producto, id: Date.now() }); // Añadir nuevo producto con ID único
        console.log(`Producto agregado: ${producto.nombre}`);
      }
    });

    await modal.present();
  }

  // Abrir modal de "Nuevo Sitio"
  async abrirModalNuevoSitio() {
    const modal = await this.modalCtrl.create({
      component: NuevoSitioModalComponent,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const nuevoSitio = result.data as string;
        this.sitios.push(nuevoSitio);
        console.log(`Nuevo sitio agregado: ${nuevoSitio}`);
      }
    });

    await modal.present();
  }

  // Marcar producto como comprado
  marcarComprado(producto: Producto) {
    producto.comprado = true;
  }

  // Editar producto
  async editarProducto(producto: Producto) {
    const modal = await this.modalCtrl.create({
      component: NuevoProductoModalComponent,
      componentProps: {
        sitios: this.sitios,
        producto: { ...producto },
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const productoEditado = result.data as Producto;
        const index = this.productos.findIndex((p) => p.id === producto.id);
        if (index > -1) {
          this.productos[index] = productoEditado;
          console.log(`Producto editado: ${productoEditado.nombre}`);
        }
      }
    });

    await modal.present();
  }

  // Eliminar producto si no está marcado como comprado
  eliminarProducto(producto: Producto) {
    if (!producto.comprado) {
      this.productos = this.productos.filter((p) => p.id !== producto.id);
      console.log(`Producto eliminado: ${producto.nombre}`);
    } else {
      alert('No puedes eliminar un producto que ya ha sido comprado.');
    }
  }
}
