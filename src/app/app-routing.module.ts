import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'particulares',
    loadChildren: './particulares/particulares.module#ParticularesModule'
  },
  {
    path: 'empresas',
    loadChildren: './empresas/empresas.module#EmpresasModule'
  },
  {
    path: 'private-banking',
    loadChildren: './private-banking/private-banking.module#PrivateBankingModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
