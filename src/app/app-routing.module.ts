import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './pages_and_components/auth/auth.guard';
import { LoginPage } from './pages_and_components/auth/login/login.page';
import { SignupPage } from './pages_and_components/auth/signup/signup.page';


const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: 'login', component: LoginPage
  },
  {
    path: 'signup', component: SignupPage
  },
  {
    path: 'home', loadChildren: () => import('./pages_and_components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'client_list',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages_and_components/client-list/client-list.module').then(m => m.ClientListModule)
  },
  {
    path: 'tax_invoice_list',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages_and_components/tax-invoice-list/tax-invoice-list.module').then(m => m.TaxInvoiceListModule)
  },
  {
    path: '**', loadChildren: () => import('./pages_and_components/error404/error404.module').then(m => m.Error404Module)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
