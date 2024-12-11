import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { NuevaListaModalComponent } from 'src/app/components/nueva-lista-modal/nueva-lista-modal.component';
import { RenombrarCopiaModalComponent } from 'src/app/components/renombrar-copia-modal/renombrar-copia-modal.component';
import { FirestoreService } from 'src/app/firestore.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {

  ejecutando:boolean=false;
  listado: any[] = []; // Almacena los productos obtenidos

  constructor(private router: Router,private toastController: ToastController,
    private firestoreService: FirestoreService,
    private modalController: ModalController) { }

 
  ngOnInit(): void {
   
    this.cargarListas();
    
  }

  navigateToHome(idLista: string, productos: any[]) {
    this.router.navigate(['/home', idLista], { state: { productos } });
  }

  async abrirModal() {
    const modal = await this.modalController.create({
      component: NuevaListaModalComponent,
    });

    modal.onDidDismiss().then((resultado:any) => {
      console.log("result:"+JSON.stringify(resultado));
      if (resultado.data) {
        const nombreLista = resultado.data;
        console.log('Nueva lista creada:', nombreLista);
        // Aquí puedes manejar la creación de la lista en la base de datos o estado local
      }
    });

    return await modal.present();
  }

  async cargarListas() {
    this.ejecutando=true;
    try {
      const ultimaLista = await this.firestoreService.obtenerProductosDeTodasLasListas();
      this.ejecutando=false;
      if (ultimaLista) {
        console.log("Listado:", ultimaLista);
        this.listado = ultimaLista;
      } else {
        console.log("No hay listas disponibles.");
      }
    } catch (error) {
      this.ejecutando=false;
      console.error("Error cargando productos de la últim lista: ", error);
      throw error;
    }
  }

  async duplicar(nombreOriginal: string) {
    const modal = await this.modalController.create({
      component: RenombrarCopiaModalComponent,
      componentProps: {
        nombreOriginal: nombreOriginal, // Pasar el valor al modal
      },
    });

    await modal.present();
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
