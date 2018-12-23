import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { Philosophy } from '../../model/philosophy.model';

@Component({
  selector: 'lgcab-philosophy',
  templateUrl: './philosophy.component.html',
  styleUrls: ['./philosophy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhilosophyComponent implements OnInit {
  @Input() philosophies: Philosophy[];

  constructor() {}

  ngOnInit() {}
}
