import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { ComponentsModule } from '../components/components.module';
import { ContainersModule } from '../containers/containers.module';
import { StartComponent } from './start/start.component';

@NgModule({
  declarations: [StartComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ContainersModule,
    MarkdownModule.forChild(),
    MatExpansionModule,
    RouterModule
  ]
})
export class PagesModule {}
