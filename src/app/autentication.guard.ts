import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const autenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inyectamos el servicio Router
  const loggedIn = localStorage.getItem('loggedIn') === 'true'; // Verificamos si el usuario está autenticado

  if (loggedIn) {
    return true; // Permitir la navegación
  } else {
    router.navigate(['/login']); // Redirigir al login si no está autenticado
    return false; // Bloquear la navegación
  }
};



