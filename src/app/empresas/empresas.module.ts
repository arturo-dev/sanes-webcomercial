import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresasComponent } from './empresas.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [EmpresasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: EmpresasComponent }
    ])
  ]
})
export class EmpresasModule { }
