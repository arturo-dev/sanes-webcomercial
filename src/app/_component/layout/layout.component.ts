import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterContentInit, AfterContentChecked } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { MenuComponent } from '../menu/menu.component';
import { WebpageService } from 'src/app/_shared/webpage/webpage.service';
import { WebPageType } from 'src/app/_shared/webpage/model/webpage-type.enum';
import { MatToolbar } from '@angular/material/toolbar';
import { MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterContentChecked {
  opened: boolean;
  mode: 'over' | 'side';

  @ViewChild('sidenav', { static: true }) sidenav: MatDrawer;
  @ViewChild('bgToolbar', { static: true }) bgToolbar: MatToolbar;
  @ViewChild('scrollerDown', { static: true }) scrollerDown: MatButton;
  @ViewChild('imgMain', { static: true }) imgMain: ElementRef<HTMLImageElement>;
  @ViewChild('branding', { static: true }) branding: ElementRef<HTMLDivElement>;
  @ViewChild('parallax', { static: false }) parallax: ElementRef<HTMLDivElement>;

  @ViewChild('textPromo', { static: false }) textPromo: ElementRef<HTMLDivElement>;
  @ViewChild('sencillo', { static: false }) sencillo: ElementRef<HTMLDivElement>;
  @ViewChild('personal', { static: false }) personal: ElementRef<HTMLDivElement>;
  @ViewChild('justo', { static: false }) justo: ElementRef<HTMLDivElement>;
  @ViewChild('comoDeberia', { static: false }) comoDeberia: ElementRef<HTMLDivElement>;

  currentPageType: WebPageType;
  loaded = false;
  showBranding = false;
  doBranding = true;
  allowTextPromoAnims = false;

  WebpageType = WebPageType;
  window = window;

  private media$: Subscription;

  constructor(
    media: MediaObserver,
    private webpage: WebpageService
  ) {
    this.media$ = media.media$.subscribe((change: MediaChange) => {
      // this.imgMain.nativeElement.height = window.innerHeight;
      this.parallax.nativeElement.style.height = window.innerHeight + 'px';
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.opened = false;
        this.mode = 'over';
      } else {
        this.opened = true;
        this.mode = 'side';
      }
    });

    window.addEventListener('resize', (e) => {
      // this.imgMain.nativeElement.height = window.innerHeight;
      this.parallax.nativeElement.style.height = window.innerHeight + 'px';
    });
  }

  ngOnInit() {
    MenuComponent.events.subscribe(event => {
      if (this.mode == 'over') {
        this.sidenav.close();
      }
    });

    this.webpage.change.subscribe(change => {
      this.currentPageType = change.page;
    });

    setTimeout(() => {
      this.loaded = true;
    }, 400);
  }

  ngAfterContentChecked() {
    if (this.parallax) {
      this.parallax.nativeElement.style.height = window.innerHeight + 'px';
    }

    if (this.textPromo) {
      this.textPromo.nativeElement.style.top = `${(window.innerHeight / 2) - this.textPromo.nativeElement.scrollHeight / 2}px`;
    }

    if (this.justo) {
      this.justo.nativeElement.addEventListener('animationend', () => { this.allowTextPromoAnims = true }, false);
    }
  }

  ngOnDestroy() {
    this.media$.unsubscribe();
  }

  onScroll(event: Event) {
    const top = (<HTMLElement>event.srcElement).scrollTop;

    if (top > 30) {
      this.bgToolbar._elementRef.nativeElement.style.opacity = (top / 1000) + 0.3;

      if (top > (window.innerHeight - this.bgToolbar._elementRef.nativeElement.clientHeight - 1)) {
        this.bgToolbar._elementRef.nativeElement.style.opacity = 1;
      }
    }

    if (top > (window.innerHeight - 100)) {
      if (this.doBranding && window.innerWidth >= 476) {
        this.doBranding = false;
        this.loaded = false;
        setTimeout(() => {
          this.showBranding = true;
          setTimeout(() => this.showBranding = false, 6300);
          setTimeout(() => this.loaded = true, 7000);
        }, 400);
      }
    }

    if (this.allowTextPromoAnims) {
      this.sencillo.nativeElement.style.transform = `translateX(${top * 4}px)`;
      this.personal.nativeElement.style.transform = `translateX(${top > 30 ? (top * 3) - 90 : 0}px)`;
      this.justo.nativeElement.style.transform = `translateX(${top > 90 ? (top * 2) - 180 : 0}px)`;
      this.comoDeberia.nativeElement.style.transform = `translateX(${top > 240 ? top - 240 : 0}px)`;
    }

    this.scrollerDown._elementRef.nativeElement.style.opacity = 0.8 - ((top / 1000));
    this.scrollerDown._elementRef.nativeElement.style.right = `${top > 20 ? 20 + (top / 4) : 20}%`;
  }

  scrollToContent(drawerContent: MatDrawerContent) {
    drawerContent.scrollTo({ top: window.innerHeight - this.bgToolbar._elementRef.nativeElement.clientHeight, behavior: 'smooth' });
  }

}
