import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateBankingComponent } from './private-banking.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PrivateBankingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: PrivateBankingComponent }
    ])
  ]
})
export class PrivateBankingModule { }
