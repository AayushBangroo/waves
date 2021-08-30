import { Component, Input, OnInit } from '@angular/core';
import { Song, SongsService } from '../song/song.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  @Input() showLibrary: boolean = false;
  songsList!: Song[];

  constructor(private songsService: SongsService) {}

  ngOnInit(): void {
    this.songsList = this.songsService.getSongs();
  }
}
