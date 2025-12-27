import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'lgcab-collage',
    templateUrl: './collage.component.html',
    styleUrls: ['./collage.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CollageComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() image = '';
}
