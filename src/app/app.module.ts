import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SongComponent } from './song/song.component';
import { PlayerComponent } from './player/player.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LibraryComponent } from './library/library.component';
import { LibrarySongComponent } from './library/library-song/library-song.component';

@NgModule({
  declarations: [
    AppComponent,
    SongComponent,
    PlayerComponent,
    LibraryComponent,
    LibrarySongComponent,
  ],
  imports: [BrowserModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
