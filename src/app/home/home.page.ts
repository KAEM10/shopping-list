import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  listas: string[] = []; // Propiedad para manejar las listas

  constructor() {}

  // Método para agregar una nueva lista
  nuevaLista() {
    const nueva = prompt('Ingrese el nombre de la nueva lista:');
    if (nueva) {
      this.listas.push(nueva); // Agrega la nueva lista al array
    }
  }

  // Método para eliminar una lista por su índice
  eliminarLista(index: number) {
    this.listas.splice(index, 1); // Elimina el elemento del array
  }
}