import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Philosophy } from '../../model/philosophy.model';

@Component({
  selector: 'lgcab-philosophy',
  templateUrl: './philosophy.component.html',
  styleUrls: ['./philosophy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhilosophyComponent {
  @Input() philosophies: Philosophy[] | null = null;
}
