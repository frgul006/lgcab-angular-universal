import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { ComponentsModule } from '../components/components.module';
import { ContainersModule } from '../containers/containers.module';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsDialogComponent } from './projects/projects.dialog.component';
import { StartComponent } from './start/start.component';

@NgModule({
  declarations: [StartComponent, ProjectsComponent, ProjectsDialogComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ContainersModule,
    MarkdownModule.forChild(),
    MatCardModule,
    MatExpansionModule,
    MatDialogModule,
    RouterModule
  ],
  entryComponents: [ProjectsDialogComponent]
})
export class PagesModule {}
