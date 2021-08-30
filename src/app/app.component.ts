import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'music-app';

  showLibrary: boolean = false;

  toggleLibrary(showLibrary: boolean) {
    this.showLibrary = showLibrary;
  }
}
