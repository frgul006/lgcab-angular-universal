import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { PhilosophyComponent } from './philosophy/philosophy.component';

@NgModule({
  declarations: [PhilosophyComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [PhilosophyComponent]
})
export class ContainersModule {}
