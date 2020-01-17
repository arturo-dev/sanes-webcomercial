import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticularesComponent } from './particulares.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ParticularesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ParticularesComponent }
    ])
  ]
})
export class ParticularesModule { }
