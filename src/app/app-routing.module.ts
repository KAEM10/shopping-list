import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
  },
  {
    path: 'addshoppinglist',
    loadChildren: () => import('./pages/addshoppinglist/addshoppinglist.module').then( m => m.AddshoppinglistPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule) },
  {
    path: 'lists',
    loadChildren: () => import('./pages/lists/lists.module').then( m => m.ListsPageModule)
  },
  { path: 'home/:idLista', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) } // Nueva ruta con parámetro
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
