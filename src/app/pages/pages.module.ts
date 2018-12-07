import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { ProjectsComponent } from './projects/projects.component';
import { StartComponent } from './start/start.component';

@NgModule({
  declarations: [StartComponent, ProjectsComponent],
  imports: [CommonModule, ComponentsModule]
})
export class PagesModule {}
