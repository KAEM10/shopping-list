import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/firestore.service';
import { Producto, ListaCompras } from 'src/app/model/shopping-list.model';

@Component({
  selector: 'app-nuevo-producto-modal',
  templateUrl: './nuevo-producto-modal.component.html',
  styleUrls: ['./nuevo-producto-modal.component.scss'],
})
export class NuevoProductoModalComponent implements OnInit{
  @Input() sitios: any[] = []; // Lista de sitios recibida desde HomePage
  @Input() producto: any;
  @Input() type: string = "";
  @Output() agregarSitio = new EventEmitter<void>(); // Evento para solicitar agregar un sitio

  newProducto = { id: 0, nombre: '', sitio: '', comprado: false };

  ngOnInit() {
    if(this.producto && this.producto.nombre && this.producto.sitio) {
      this.newProducto.nombre = this.producto.nombre;
      this.newProducto.sitio = this.producto.sitio;
      this.newProducto.id = this.producto.id;
    }
  }

  constructor(
    private modalCtrl: ModalController,
    private firestoreService: FirestoreService) {}

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  async guardarProducto() {
    if (this.newProducto.nombre && this.newProducto.sitio) {
      
      try {
        if (this.producto && this.producto.id) {
          const nuevoProducto: Producto = {
            nombre: this.newProducto.nombre,
            comprado: this.producto.comprado,
            idSitio: this.newProducto.sitio,
            idLista: this.producto.idLista,
            id: this.producto.id
          };

          await this.firestoreService.agregarOActualizarProducto("primeralista", nuevoProducto);
        } else {

          const nuevoProducto: Producto = {
            nombre: this.newProducto.nombre,
            comprado: false,
            idSitio: this.newProducto.sitio,
            idLista: "Primera lista",
            id: ""
          };
          await this.firestoreService.agregarOActualizarProducto("primeralista", nuevoProducto);
        }
        
      } catch (error) {
        console.error("Error al agregar producto", error);
      }

      this.modalCtrl.dismiss(this.newProducto);
    } else {
      alert('Por favor completa todos los campos.');
    }
  }

  // Emitir el evento para abrir el modal de Nuevo Sitio
  abrirModalNuevoSitio() {
    console.log("Abriendo el agregar sitio en NUEVOPROD");
    this.modalCtrl.dismiss({
      action: 'agregarSitio', // Indica que se desea agregar un sitio
    });
  }
}
