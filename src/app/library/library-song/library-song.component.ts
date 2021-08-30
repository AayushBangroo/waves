import { Component, Input, OnInit } from '@angular/core';
import { Song, SongsService } from 'src/app/song/song.service';

@Component({
  selector: 'app-library-song',
  templateUrl: './library-song.component.html',
  styleUrls: ['./library-song.component.scss'],
})
export class LibrarySongComponent implements OnInit {
  @Input() song!: Song;

  constructor(private songsService: SongsService) {}

  ngOnInit(): void {}

  onClickLibrarySong() {
    this.songsService.currentSong.next(this.song);
    //make clicked song active rest inactive
    this.songsService.setSongActive(this.song);
  }
}
