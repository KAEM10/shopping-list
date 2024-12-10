import { Injectable } from '@angular/core';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  private auth = getAuth(); // Inicializar el servicio de autenticación

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);

      // Usuario autenticado
      const user = result.user;
      console.log('Usuario autenticado:', user);
      return user;
    } catch (error) {
      console.error('Error en la autenticación con Google:', error);
      throw error;
    }
  }
  
}
