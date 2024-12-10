import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/firestore.service';
import { Sitio } from 'src/app/model/shopping-list.model';

@Component({
  selector: 'app-nuevo-sitio-modal',
  templateUrl: './nuevo-sitio-modal.component.html',
  styleUrls: ['./nuevo-sitio-modal.component.scss'],
})
export class NuevoSitioModalComponent {
  sitio: string = '';

  constructor(
    private modalCtrl: ModalController,
    private firestoreService: FirestoreService) {}

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  async guardarSitio() {
    if (this.sitio.trim() !== '') {

      try {
        const nuevoSitio: Sitio = {
          nombre: this.sitio,
          fechaRegistro: new Date()
        };
        
        await this.firestoreService.agregarSitio(nuevoSitio);
      } catch (error) {
        console.error("Error al agregar producto", error);
      }

      this.modalCtrl.dismiss(this.sitio);
    } else {
      alert('El nombre del sitio no puede estar vacío.');
    }
  }
}
