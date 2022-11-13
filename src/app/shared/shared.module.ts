import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [NavbarComponent, ModalComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavbarComponent]
})
export class SharedModule { }
