import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword 
} from 'firebase/auth';  // Asegúrate de importar 'getAuth' y 'createUserWithEmailAndPassword' desde 'firebase/auth'
import * as forge from 'node-forge';  // Librería para cifrado RSA
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  private app = initializeApp(environment.firebaseConfig);  // Inicializamos la aplicación de Firebase
  private firebaseAuth = getAuth(this.app);  // Obtenemos la instancia de auth desde la app inicializada

  // Método para registrar usuario
  async registrarUsuario(username: string, password: string) {
    // Validación de longitud de email (máximo 40 caracteres)
    if (username.length > 40) {
      throw new Error('El email no puede tener más de 40 caracteres.');
    }

    // Validación de email sin distinción de mayúsculas/minúsculas
    const normalizedUsername = username.toLowerCase();

    // Validación de longitud de password (máximo 200 caracteres)
    if (password.length > 200) {
      throw new Error('La contraseña no puede tener más de 200 caracteres.');
    }

    // Registrar el usuario en Firebase
    try {
      const email = normalizedUsername+"@shoppinglist.com";  // Crear el email
      const userCredential = await createUserWithEmailAndPassword(this.firebaseAuth, email, password);  // Registro del usuario
      console.log('Usuario registrado exitosamente', userCredential);
      return userCredential;  // Retorna la credencial de usuario
    } catch (error) {
      console.error('Error al registrar usuario:', error);  // Manejo de errores
      throw error;  // Lanza el error
    }
  }

  // Método para ingresar con email y password
  async iniciarSesion(username: string, password: string) {
    // Validación de longitud de email (máximo 40 caracteres)
    if (username.length > 40) {
      throw new Error('El email no puede tener más de 40 caracteres.');
    }

    // Validación de email sin distinción de mayúsculas/minúsculas
    const normalizedUsername = username.toLowerCase();

    // Validación de longitud de password (máximo 200 caracteres)
    if (password.length > 200) {
      throw new Error('La contraseña no puede tener más de 200 caracteres.');
    }

    try {
      const email = normalizedUsername + '@shoppinglist.com';
      const userCredential = await signInWithEmailAndPassword(
        this.firebaseAuth,
        email,
        password
      );
      console.log('Usuario ingresado exitosamente', userCredential);
      return userCredential;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert("Intente nuevamente...")
      throw error;
    }
  }
}
