import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lgcab-collage',
  templateUrl: './collage.component.html',
  styleUrls: ['./collage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollageComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() image: string;
}
