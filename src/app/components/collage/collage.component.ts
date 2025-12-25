import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lgcab-collage',
  templateUrl: './collage.component.html',
  styleUrls: ['./collage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollageComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() image = '';
}
