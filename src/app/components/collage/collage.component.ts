import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lgcab-collage',
  templateUrl: './collage.component.html',
  styleUrls: ['./collage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollageComponent implements OnInit {
  @Input() title;
  @Input() description;
  @Input() image;

  constructor() {}

  ngOnInit() {}
}
