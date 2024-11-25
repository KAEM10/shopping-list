import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-nuevo-producto-modal',
  templateUrl: './nuevo-producto-modal.component.html',
  styleUrls: ['./nuevo-producto-modal.component.scss'],
})
export class NuevoProductoModalComponent {
  producto = { nombre: '', sitio: '' };

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
}
