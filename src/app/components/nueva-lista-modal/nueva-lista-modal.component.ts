import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/firestore.service';

@Component({
  selector: 'app-nueva-lista-modal',
  templateUrl: './nueva-lista-modal.component.html',
  styleUrls: ['./nueva-lista-modal.component.scss'],
})
export class NuevaListaModalComponent {


  nombreLista: string = '';

  @Output() listaCreada: EventEmitter<string> = new EventEmitter();

  constructor(private modalController: ModalController,
    private firestoreService: FirestoreService,
    private toastController: ToastController, // Controlador para mostrar el toast
  ) { }

  // Método para cerrar el modal sin hacer nada
  cerrarModal() {
    this.modalController.dismiss();
  }

  // AQUI debo llamar a la base de datos para agregar nueva lista
  async aceptar() {
    if (this.nombreLista.trim()) {
      try {
        await this.firestoreService.agregarLista(this.nombreLista.trim());
        await this.mostrarToast('Lista creada con éxito', 'success');

        await this.esperar(300); // Espera  segundos
        window.location.reload();
      } catch (error) {
        console.error("Error al crear Lista", error);
      }
      this.listaCreada.emit(this.nombreLista); // Emite el nombre de la nueva lista
      this.modalController.dismiss(); // Cierra el modal
    } else {
      alert('Por favor ingrese un nombre para la lista.');
    }
  }
  async mostrarToast(mensaje: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000, // Duración en milisegundos
      position: 'top', // Posición del toast
      color: color, // Color del toast
    });

    // Mostrar el toast
    await toast.present();
  }
  // Método para esperar un tiempo específico (en milisegundos)
  esperar(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
