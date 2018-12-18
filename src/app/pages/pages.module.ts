import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { ContainersModule } from '../containers/containers.module';
import { MarkdownModule } from 'ngx-markdown';
import { NgModule } from '@angular/core';
import { ProjectsComponent } from './projects/projects.component';
import { StartComponent } from './start/start.component';

@NgModule({
  declarations: [StartComponent, ProjectsComponent],
  imports: [CommonModule, ComponentsModule, ContainersModule, MarkdownModule.forChild()]
})
export class PagesModule {}
