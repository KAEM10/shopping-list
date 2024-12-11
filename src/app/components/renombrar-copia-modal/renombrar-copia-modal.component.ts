import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/firestore.service';

@Component({
  selector: 'app-renombrar-copia-modal',
  templateUrl: './renombrar-copia-modal.component.html',
  styleUrls: ['./renombrar-copia-modal.component.scss'],
})
export class RenombrarCopiaModalComponent  {

  @Input() nombreOriginal!: string; // Recibir nombreOriginal desde el padre
  nombreLista: string = '';
  ejecutando:boolean=false;//bandera


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
    this.ejecutando=true;
    if (this.nombreLista.trim()) {
      let nombreCopia=this.nombreLista;
      try {
        await this.firestoreService.duplicarLista(this.nombreOriginal,nombreCopia);
       
        await this.mostrarToast('Lista Copiada con éxito', 'success');

        await this.esperar(300); // Espera  segundos
        this.ejecutando=false;
        window.location.reload();
      } catch (error) {
        console.error("Error al copiar Lista", error);
        this.ejecutando=false;
      }
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
