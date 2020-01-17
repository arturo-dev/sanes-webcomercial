import { Component } from '@angular/core';
import { WebpageService } from './_shared/webpage/webpage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private webpage: WebpageService,
  ) { }
}
