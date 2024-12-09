import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NuevoProductoModalComponent } from '../../components/nuevo-producto-modal/nuevo-producto-modal.component';
import { NuevoSitioModalComponent } from '../../components/nuevo-sitio-modal/nuevo-sitio-modal.component';
import { FirestoreService } from 'src/app/firestore.service';
import { Producto, ListaCompras } from 'src/app/model/shopping-list.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{

  sitios: string[] = ['Placita campesina', 'D1', 'Éxito', 'Ara'];
  productos: any[] = []; // Almacena los productos obtenidos

  constructor(
    private modalCtrl: ModalController,
    private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.cargarProductosDeUltimaLista();
  }

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
      //this.productos = this.productos.filter((p) => p.id !== producto.id);
    } else {
      alert('No puedes eliminar un producto ya comprado');
    }
  }

  // Paso 6: Abrir modal para agregar un nuevo producto
  async abrirModalNuevoProducto() {
    const modal = await this.modalCtrl.create({
      component: NuevoProductoModalComponent,
      componentProps: {
        sitios: this.sitios, // Pasar los sitios al modal
      },
    });
  
    // Obtener el componente del modal para escuchar el evento
    const { component } = await modal;
    if (component instanceof NuevoProductoModalComponent) {
      component.agregarSitio.subscribe(async () => {
        await this.abrirModalNuevoSitio();
      });
    }
  
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.productos.push(data.data); // Agregar producto a la lista
      }
    });
  
    await modal.present();
  }
  
  // Abrir el modal de nuevo sitio
  async abrirModalNuevoSitio() {
    const modal = await this.modalCtrl.create({
      component: NuevoSitioModalComponent,
    });
  
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.sitios.push(data.data); // Agregar el nuevo sitio a la lista
      }
    });
  
    await modal.present();
  }

  async cargarProductosDeUltimaLista() {
    try {
      const ultimaLista = await this.firestoreService.obtenerProductosDeListaMasReciente();
      
      if (ultimaLista) {
        console.log("Productos de la última lista:", ultimaLista);
        this.productos = ultimaLista;
      } else {
        console.log("No hay listas disponibles.");
      }
    } catch (error) {
      console.error("Error cargando productos de la última lista: ", error);
      throw error;
    }
  }
  
}
