import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-nuevo-sitio-modal',
  templateUrl: './nuevo-sitio-modal.component.html',
  styleUrls: ['./nuevo-sitio-modal.component.scss'],
})
export class NuevoSitioModalComponent {
  sitio: string = '';

  constructor(private modalCtrl: ModalController) {}

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  guardarSitio() {
    if (this.sitio.trim() !== '') {
      this.modalCtrl.dismiss(this.sitio);
    } else {
      alert('El nombre del sitio no puede estar vacío.');
    }
  }
}
