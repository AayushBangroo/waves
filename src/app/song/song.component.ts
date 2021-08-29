import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Song, SongsService } from './song.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
})
export class SongComponent implements OnInit, OnDestroy {
  currentSong!: Song;
  private subscription!: Subscription;

  constructor(private songsService: SongsService) {}

  ngOnInit(): void {
    this.subscription = this.songsService.currentSong.subscribe((song) => {
      this.currentSong = song;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
