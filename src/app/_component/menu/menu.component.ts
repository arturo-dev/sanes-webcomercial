import { Component, OnInit } from '@angular/core';
import { MenuMain } from './model/menu-main';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { WebpageService } from 'src/app/_shared/webpage/webpage.service';
import { WebPageType } from 'src/app/_shared/webpage/model/webpage-type.enum';
import { FormControl } from '@angular/forms';
import { takeUntil, delay } from 'rxjs/operators';
import { LayoutComponent } from '../layout/layout.component';
import { ScrollService } from 'src/app/_shared/scroll/scroll.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private static events$ = new Subject();
  static events = MenuComponent.events$.asObservable();

  activePage: any;
  pages: { label: string; icon: string, type: WebPageType, path: string }[] = [
    { label: 'Particulares', icon: 'account_box', type: WebPageType.PARTICULARES, path: 'particulares' },
    { label: 'Private Banking', icon: 'account_balance_wallet', type: WebPageType.PRIVATE_BANKING, path: 'private-banking' },
    { label: 'Empresas', icon: 'account_balance', type: WebPageType.EMPRESAS, path: 'empresas' }
  ]

  WebpageType = WebPageType;

  currentPage: WebPageType;
  menuMain: MenuMain[];
  currentSidenav: any;
  options: { value: string, html: string }[];
  searchInput = new FormControl();
  searchLoading = false;
  opened = false;

  loadingMenu = false;

  currentLanguage = 'es_ES';

  constructor(
    private http: HttpClient,
    private router: Router,
    public webpage: WebpageService,
    private scroll: ScrollService
  ) { }

  ngOnInit() {
    this.selectActivePage(this.pages[0]);
    this.webpage.change.subscribe(change => {
      this.queryMenu(change.alias);
      this.currentPage = change.page;
    });

    this.initAutocomplete();
  }

  queryMenu(page: string) {
    this.loadingMenu = true;
    this.http.get<MenuMain[]>(`${environment.api}/menu/${page}`).subscribe(menuMain => {
      setTimeout(() => {
        this.menuMain = menuMain;
        this.loadingMenu = false;
      }, 300)
    });
  }

  selectActivePage(page) {
    if (this.activePage) {
      this.pages.push(this.activePage);
    }

    this.activePage = page;
    for (let i = 0; i < this.pages.length; i++) {
      if (this.activePage.label === this.pages[i].label) {
        this.pages.splice(i, 1);
      }
    }
  }

  initAutocomplete() {
    this.searchInput.valueChanges.subscribe(value => {
      if (!value || value.length < 3) {
        this.options = [];
        return;
      }

      this.searchLoading = true;
      this.http.get<string[]>(`${environment.api}/autocomplete/options`).pipe(delay(1000))
        .subscribe(options => {
          this.options = options.map(option => {
            return {
              html: option.replace(new RegExp(`${value}`, 'g'), `<b>${value}</b>`).replace(' ', '&nbsp;'),
              value: option
            }
          });
          this.searchLoading = false;
        })
    });
  }

  loadItems(menu) {
    this.currentSidenav = menu.items;
  }

  emitClose() {
    setTimeout(() => this.opened = false, 300);
    MenuComponent.events$.next();
    this.scroll.scrollToContent();
  }

  backSidenav() {
    setTimeout(() => this.opened = false, 300);
  }

  navigate(view: string) {
    this.webpage.detectWebpage();
    this.router.navigate([view]);
  }

  reoder(view: string) {
    this.pages.forEach((item, i) => {
      if (item.path === view) {
        this.pages.splice(i, 1);
        this.pages.unshift(item);
      }
    });
  }

}
