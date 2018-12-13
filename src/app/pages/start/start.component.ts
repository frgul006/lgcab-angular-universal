import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'lgcab-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  public innerHeight: number;
  constructor(private seo: SeoService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.seo.generateTags({
      title: 'Start',
      description: '',
      slug: ''
    });

    if (isPlatformBrowser(this.platformId)) {
      this.innerHeight = window.innerHeight;
    } else {
      this.innerHeight = 0;
    }
  }
}
