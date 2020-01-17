import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebPageType } from './model/webpage-type.enum';
import { Router, NavigationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class WebpageService {

  current: WebPageType = WebPageType.PARTICULARES;
  private changes$ = new Subject<{ page: WebPageType, alias: 'particulares' | 'private-banking' | 'empresas' }>();
  change = this.changes$.asObservable();

  constructor(
    private router: Router,
    private title: Title
  ) {
    this.detectWebpage();
  }

  setPage(pageType: WebPageType): void {
    this.current = pageType;

    switch (pageType) {
      case WebPageType.PARTICULARES:
        this.changes$.next({ page: pageType, alias: 'particulares' });
        this.title.setTitle('Santander Particulares');
        break;
      case WebPageType.PRIVATE_BANKING:
        this.changes$.next({ page: pageType, alias: 'private-banking' });
        this.title.setTitle('Santander Private Banking');
        break;
      case WebPageType.EMPRESAS:
        this.changes$.next({ page: pageType, alias: 'empresas' });
        this.title.setTitle('Santander Empresas');
        break;
    }
  }

  detectWebpage() {
    const routerEvents = this.router.events.subscribe(events => {
      if (events instanceof NavigationStart) {
        const page = events.url.substr(1, events.url.length - 1);
        switch (page) {
          case 'particulares':
            this.setPage(WebPageType.PARTICULARES);
            break;
          case 'private-banking':
            this.setPage(WebPageType.PRIVATE_BANKING);
            break;
          case 'empresas':
            this.setPage(WebPageType.EMPRESAS);
            break;
        }

        routerEvents.unsubscribe();
      }
    });
  }

}
