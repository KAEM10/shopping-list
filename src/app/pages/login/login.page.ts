import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FirebaseauthService } from 'src/app/firebaseauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private firebaseAuthService: FirebaseauthService) { }

  ngOnInit() {
  }

  async iniciarSesion() {
    // Aquí puedes integrar tu lógica de autenticación (por ejemplo, Firebase)
    if (this.username && this.password) {
      // Simular autenticación exitosa
      const userCredential = await this.firebaseAuthService.iniciarSesion(this.username, this.password);
      if (userCredential && userCredential.user?.email){
        localStorage.setItem('loggedIn', 'true');
        this.router.navigate(['/home']); // Navegar a la página principal
      } else {
        alert("Inicio de sesión incorrecto");
      }
      
    } else {
      alert('Credenciales incorrectas');
    }
  }

  async registrarse() {
    this.router.navigate(["/register"]);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false); // Desactiva el menú
  }
  
  ionViewDidLeave() {
    this.menuCtrl.enable(true); // Reactiva el menú al salir
  }

}
