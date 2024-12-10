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
  @Output() agregarSitio = new EventEmitter<void>(); // Evento para solicitar agregar un sitio

  producto = { id: 0, nombre: '', sitio: '', comprado: false };

  ngOnInit() {}

  constructor(
    private modalCtrl: ModalController,
    private firestoreService: FirestoreService) {}

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  async guardarProducto() {
    if (this.producto.nombre && this.producto.sitio) {
      
      try {
        const nuevoProducto: Producto = {
          nombre: this.producto.nombre,
          comprado: false,
          idSitio: this.producto.sitio,
          idLista: "Primera lista",
          id: ""
        };
        
        await this.firestoreService.agregarProductoALista("primeralista", nuevoProducto);
      } catch (error) {
        console.error("Error al agregar producto", error);
      }

      this.modalCtrl.dismiss(this.producto);
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
