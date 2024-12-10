import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private firestoreService: FirestoreService) { }

 
  ngOnInit(): void {
   
    this.cargarListas();
    
  }
  navigateToHome(idLista: string, productos: any[]) {
    this.router.navigate(['/home', idLista], { state: { productos } });
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
