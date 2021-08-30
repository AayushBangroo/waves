import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faMusic = faMusic;
  showLibrary: boolean = false;

  @Output() libraryEvent: EventEmitter<boolean> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  toggleLibrary() {
    this.showLibrary = !this.showLibrary;
    this.libraryEvent.emit(this.showLibrary);
  }
}
