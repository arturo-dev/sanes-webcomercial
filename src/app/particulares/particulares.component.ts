import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ScrollService } from '../_shared/scroll/scroll.service';

@Component({
  selector: 'app-particulares',
  templateUrl: './particulares.component.html',
  styleUrls: ['./particulares.component.scss']
})
export class ParticularesComponent implements OnInit {

  @ViewChild('banner', { static: true }) banner: ElementRef<HTMLImageElement>;
  showBanner = false;

  constructor(
    private scroll: ScrollService
  ) { }

  ngOnInit() {
    this.scroll.scrollMainElement.addEventListener('scroll', (event) => {
      const top = (<HTMLElement>event.srcElement).scrollTop;
      const bannerHeight = this.banner.nativeElement.clientHeight / 1.2;

      if (top >= (bannerHeight)) {
        this.showBanner = true;
      } else {
        this.showBanner = false;
      }
    });
  }

}
