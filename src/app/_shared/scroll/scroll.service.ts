import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  get scrollMainElement() {
    return document.querySelector('mat-drawer-content');
  }

  scrollToContent() {
    const toolbarHeight = document.querySelector('mat-toolbar.bg-toolbar').clientHeight;
    document.querySelector('mat-drawer-content').scrollTo({ top: window.innerHeight - toolbarHeight, behavior: 'smooth' });
  }
}
