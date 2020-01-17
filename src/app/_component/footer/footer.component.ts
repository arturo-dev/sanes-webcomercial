import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FooterItem } from './model/footer-item';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  // TODO https://www.thecodecampus.de/blog/material-2-sticky-footer-mat-sidenav/
  footerItems: FooterItem[];
  showIcon: boolean;
  mqAlias: string;

  constructor(
    media: MediaObserver,
    private http: HttpClient
  ) {
    media.media$.subscribe((change: MediaChange) => {
      this.mqAlias = change.mqAlias;
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.showIcon = false;
      } else {
        this.showIcon = true;
      }

    });
  }

  ngOnInit() {
    this.http.get<FooterItem[]>(`${environment.api}/section/footer`).subscribe(footerItems => {
      this.footerItems = footerItems;
    });
  }

}
