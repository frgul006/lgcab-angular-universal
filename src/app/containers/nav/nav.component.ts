import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  OnInit,
  OnDestroy,
  PLATFORM_ID
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, fromEvent } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'lgcab-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements AfterViewInit, OnDestroy, OnInit {
  @HostBinding('class.lgcab-nav--past-splash') isPastSplash = false;
  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router
  ) {}

  ngOnInit() {
    this.isPastSplash = this.isNonHomeRoute(this.router.url);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Client only code.
      const isPastSplash$ = fromEvent(window, 'scroll').pipe(
        throttleTime(10),
        map(() => this.isNonHomeRoute(window.location.pathname) || window.pageYOffset > window.innerHeight - 96),
        distinctUntilChanged()
      );

      this.isPastSplash =
        this.isNonHomeRoute(window.location.pathname) || window.pageYOffset > window.innerHeight - 96;

      isPastSplash$.pipe(takeUntil(this.unsubscribe$)).subscribe(isPastSplash => (this.isPastSplash = isPastSplash));
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private isNonHomeRoute(url: string): boolean {
    const path = url.split('#')[0].split('?')[0];
    return path !== '' && path !== '/';
  }
}
