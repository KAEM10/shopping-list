import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { autenticationGuard } from './autentication.guard';

const routes: Routes = [
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full' 
  },
  { path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) 

  },
  { path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [autenticationGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule),
    canActivate: [autenticationGuard]
    
   },
  {
    path: 'lists',
    loadChildren: () => import('./pages/lists/lists.module').then( m => m.ListsPageModule),
    canActivate: [autenticationGuard]
  },
  { path: 'home/:idLista', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) ,
    canActivate: [autenticationGuard]} // Nueva ruta con parámetro
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
