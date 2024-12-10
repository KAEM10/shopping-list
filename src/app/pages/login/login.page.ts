import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private menuCtrl: MenuController) { }

  ngOnInit() {
  }

  iniciarSesion() {
    // Aquí puedes integrar tu lógica de autenticación (por ejemplo, Firebase)
    if (this.email === 'demo@demo.com' && this.password === '123456') {
      // Simular autenticación exitosa
      localStorage.setItem('loggedIn', 'true');
      this.router.navigate(['/home']); // Navegar a la página principal
    } else {
      alert('Credenciales incorrectas');
    }
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false); // Desactiva el menú
  }
  
  ionViewDidLeave() {
    this.menuCtrl.enable(true); // Reactiva el menú al salir
  }

}
