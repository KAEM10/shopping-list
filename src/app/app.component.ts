import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private menuCtrl: MenuController) {}

  cerrarSesion() {
    // Aquí puedes agregar lógica para limpiar datos de sesión o desloguear al usuario
    localStorage.removeItem('loggedIn'); // Ejemplo: eliminar el estado de autenticación
    this.menuCtrl.close(); // Cerrar el menú
    this.router.navigate(['/login']); // Redirigir al login
  }
}
