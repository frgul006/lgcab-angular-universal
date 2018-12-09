import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, filter, map, pairwise, share, throttleTime } from 'rxjs/operators';

enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}

enum Direction {
  Up = 'Up',
  Down = 'Down'
}

@Component({
  selector: 'lgcab-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('toggle', [
      state(VisibilityState.Hidden, style({ opacity: 0, transform: 'translateY(-100%)' })),
      state(VisibilityState.Visible, style({ opacity: 1, transform: 'translateY(0)' })),
      transition('* => *', animate('200ms ease-in'))
    ])
  ]
})
export class NavComponent implements OnInit, AfterViewInit {
  private isVisible = true;

  @HostBinding('@toggle')
  get toggle(): VisibilityState {
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  }

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );

    const goingUp$ = scroll$.pipe(filter(direction => direction === Direction.Up));

    const goingDown$ = scroll$.pipe(filter(direction => direction === Direction.Down));

    goingUp$.subscribe(() => (this.isVisible = true));
    goingDown$.subscribe(() => (this.isVisible = false));
  }
}
