import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NuevaListaModalComponent } from 'src/app/components/nueva-lista-modal/nueva-lista-modal.component';
import { FirestoreService } from 'src/app/firestore.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {
  listadoEnvio = [
    {
      idLista: 'primeralista',
      productos: [{}, {}, {}], // Ejemplo
    },
  ];
  listado: any[] = []; // Almacena los productos obtenidos

  constructor(private router: Router,
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
      console.log("SSS"+JSON.stringify(resultado));
      if (resultado.data) {
        const nombreLista = resultado.data;
        console.log('Nueva lista creada:', nombreLista);
        // Aquí puedes manejar la creación de la lista en la base de datos o estado local
      }
    });

    return await modal.present();
  }
  async cargarListas() {
    try {
      const ultimaLista = await this.firestoreService.obtenerProductosDeTodasLasListas();
      
      if (ultimaLista) {
        console.log("Listado:", ultimaLista);
        this.listado = ultimaLista;
      } else {
        console.log("No hay listas disponibles.");
      }
    } catch (error) {
      console.error("Error cargando productos de la últim lista: ", error);
      throw error;
    }
  }
}
