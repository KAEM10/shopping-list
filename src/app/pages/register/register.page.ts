import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from 'src/app/firebaseauth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  ngOnInit() {
  }

  username: string = '';
  password: string = '';
  passwordConfirm: string = '';

  constructor(
    private authService: FirebaseauthService,
    private router: Router,
    private menuCtrl: MenuController) {}

  async registrarse() {
    try {

      if (this.password.length >= 6) {
        if (this.password === this.passwordConfirm) {

          const userCredential = await this.authService.registrarUsuario(this.username, this.password);
          if (userCredential.user?.email !== "") {
            console.log('Registro exitoso');
            alert("Registro exitoso");
            // Simular autenticación exitosa
            localStorage.setItem('loggedIn', 'true');
            this.router.navigate(['/home']); // Navegar a la página principal
            
          } else {
            console.log("Registro imposible");
            alert("Registro erroneo");
          }
          
        } else {
          console.log("Las contraseñas no coinciden");
          alert("Las contraseñas no coinciden");
        }
      } else {
        console.log("La contraseña debe tener almenos 6 caracteres");
        alert("Usa una contraseña de almenos 6 caracteres");
      }
      
    } catch (error) {
      console.error('Error en el registro', error);
    }
  }

  regresarALogin() {
    this.router.navigate(["/login"]);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false); // Desactiva el menú
  }
  
  ionViewDidLeave() {
    this.menuCtrl.enable(true); // Reactiva el menú al salir
  }

}
