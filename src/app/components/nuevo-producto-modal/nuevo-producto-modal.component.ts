import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-nuevo-producto-modal',
  templateUrl: './nuevo-producto-modal.component.html',
  styleUrls: ['./nuevo-producto-modal.component.scss'],
})
export class NuevoProductoModalComponent {
  @Input() sitios: string[] = []; // Lista de sitios recibida desde HomePage
  @Output() agregarSitio = new EventEmitter<void>(); // Evento para solicitar agregar un sitio

  producto = { id: 0, nombre: '', sitio: '', comprado: false };

  constructor(private modalCtrl: ModalController) {}

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  guardarProducto() {
    if (this.producto.nombre && this.producto.sitio) {
      this.modalCtrl.dismiss(this.producto);
    } else {
      alert('Por favor completa todos los campos.');
    }
  }

  // Emitir el evento para abrir el modal de Nuevo Sitio
  solicitarAgregarSitio() {
    this.agregarSitio.emit();
  }
}
