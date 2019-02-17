import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ComponentsModule } from '../components/components.module';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [NavComponent],
  imports: [CommonModule, ComponentsModule, MatMenuModule, MatIconModule],
  exports: [NavComponent]
})
export class ContainersModule {}
