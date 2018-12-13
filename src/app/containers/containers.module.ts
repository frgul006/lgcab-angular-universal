import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ComponentsModule } from '../components/components.module';
import { NavComponent } from './nav/nav.component';
import { PhilosophyComponent } from './philosophy/philosophy.component';

@NgModule({
  declarations: [NavComponent, PhilosophyComponent],
  imports: [CommonModule, ComponentsModule, MatMenuModule, MatIconModule],
  exports: [NavComponent, PhilosophyComponent]
})
export class ContainersModule {}
