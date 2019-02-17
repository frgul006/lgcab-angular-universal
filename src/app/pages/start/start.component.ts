import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SeoService } from '../../seo.service';
import { QueryService } from '../../queries/query.service';
import { Philosophy } from '../../model/philosophy.model';
import { Observable } from 'rxjs';
import { PageComponent } from '../../model/page-component.model';
import { Splash } from '../../model/splash.model';
import { Contact } from '../../model/contact.model';

@Component({
  selector: 'lgcab-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  public innerHeight: number;
  public philosophies$: Observable<Philosophy[]>;
  public intro$: Observable<PageComponent>;
  public pbl$: Observable<PageComponent>;
  public splash$: Observable<Splash>;
  public contact$: Observable<Contact>;

  constructor(
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private readonly queryService: QueryService
  ) {}

  ngOnInit() {
    this.setSEOTags();
    this.setInnerHeight();
    this.getPhilosophies();
    this.getIntro();
    this.getPBL();
    this.getSplash();
    this.getContact();
  }

  private getContact() {
    this.contact$ = this.queryService.getContact();
  }

  private getSplash() {
    this.splash$ = this.queryService.getSplash();
  }

  private getIntro() {
    this.intro$ = this.queryService.getPageComponentBySlug('valkommen');
  }

  private getPBL() {
    this.pbl$ = this.queryService.getPageComponentBySlug('pbl');
  }

  private getPhilosophies() {
    this.philosophies$ = this.queryService.getAllPhilosophies();
  }

  private setSEOTags() {
    this.seo.generateTags({
      title: 'LGCAB - Lennart Gullberg Consulting AB',
      description:
        'Vi är projektledare. Det säger allt och ingenting. Ibland lägger vi till att vi hjälper företag i förändring. Vi upprättar dessutom kontrollplaner enl PBL. ',
      slug: ''
    });
  }

  private setInnerHeight() {
    if (isPlatformBrowser(this.platformId)) {
      this.innerHeight = window.innerHeight;
    } else {
      this.innerHeight = 0;
    }
  }
}
