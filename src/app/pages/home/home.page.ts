import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NuevoProductoModalComponent } from '../../components/nuevo-producto-modal/nuevo-producto-modal.component';
import { NuevoSitioModalComponent } from '../../components/nuevo-sitio-modal/nuevo-sitio-modal.component';
import { FirestoreService } from 'src/app/firestore.service';
import { Producto } from 'src/app/model/shopping-list.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  nombreLista:string="";
  sitios: any[] = [];
  productos: any[] = []; // Almacena los productos obtenidos

  constructor(
    private modalCtrl: ModalController,
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    const idLista = this.route.snapshot.paramMap.get('idLista');  // Obtén el parámetro de la URL

    if (idLista) {      
      this.cargarProductosDeUnaLista(idLista);
      this.cargarSitios()
    } else {
      // Si no hay parámetro ultima
      console.log("No, ",idLista)
      this.cargarProductosDeUltimaLista();
      this.cargarSitios()
    }; 
  }

  navegar(ruta: string) {
    this.router.navigate([ruta]);
  }

  // Abrir modal de "Nuevo Producto"
  async abrirModalNuevoProducto() {
    const modal = await this.modalCtrl.create({
      component: NuevoProductoModalComponent,
      componentProps: {
        sitios: this.sitios,
        abrirModalNuevoSitio: () => this.abrirModalNuevoSitio(),
      },
    });
  
    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        if (result.data.action === 'agregarSitio') {
          // Abre el modal para agregar un sitio
          console.log("Abriendo el modal para agregar un sitio.");
          await this.abrirModalNuevoSitio();
        } else {
          const producto = result.data as Producto; // Cast seguro a Producto
          this.productos.push(producto); // Añadir nuevo producto con ID único
          console.log(`Producto agregado: ${producto.nombre}`);
        }

      }

    });

    await modal.present();
  }

  // Abrir modal de "Nuevo Sitio"
  async abrirModalNuevoSitio() {
    console.log("Abriendo el agregar sitio 2");
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

  async cargarSitios() {
    try {

      const sitios = await this.firestoreService.obtenerSitios();
      if (sitios) {
        console.log("Sitios obtenidos: "+sitios);
        this.sitios = sitios;
      } else {
        console.log("No hay listas disponibles.");
      }

    } catch (error) {
      console.error("Error cargando productos de la última lista: ", error);
      throw error;
    }
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
  async cargarProductosDeUnaLista(nombre:string) {
    const navigation = this.router.getCurrentNavigation();
    this.productos =navigation?.extras.state?.['productos'] || [];
    const urlSegments = this.router.url.split('/');
    this.nombreLista = urlSegments[urlSegments.length - 1];
    console.log('ID Lista:', this.nombreLista);
    console.log('Productos O:', this.productos);
  }
  // Marcar producto como comprado
  marcarComprado(producto: Producto) {
    producto.comprado = true;
    this.firestoreService.actualizarProductoAComprado("primeralista", producto.id)
  }

  // Editar producto
  async editarProducto(producto: Producto) {
    const modal = await this.modalCtrl.create({
      component: NuevoProductoModalComponent,
      componentProps: {
        sitios: this.sitios,
        producto: { ...producto },
        type: "edit"
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const productoEditado = result.data as Producto;
        //TODO: realizar acciones aquí
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
  async eliminarProducto(producto: Producto) {
    if (!producto.comprado) {
      this.productos = this.productos.filter((p) => p.id !== producto.id);
      await this.firestoreService.borrarProductoDeLista("primeralista", producto.id);
      
      console.log(`Producto eliminado: ${producto.nombre}`);
    } else {
      alert('No puedes eliminar un producto que ya ha sido comprado.');
    }
  }
}
