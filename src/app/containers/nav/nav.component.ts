import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'lgcab-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class.lgcab-nav--past-splash') isPastSplash;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Client only code.
      const isPastSplash$ = fromEvent(window, 'scroll').pipe(
        throttleTime(10),
        map(() => window.pageYOffset > window.innerHeight - 96),
        distinctUntilChanged()
      );

      isPastSplash$.pipe(takeUntil(this.unsubscribe$)).subscribe(isPastSplash => (this.isPastSplash = isPastSplash));
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
