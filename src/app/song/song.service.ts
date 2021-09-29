import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { PlayerService } from '../player/player.service';

export interface Song {
  name: string;
  artist: string;
  cover: string;
  background: Array<string>;
  audio: string;
  id: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SongsService {
  private songs: Song[] = [
    {
      name: 'Hotel Lobby Birthday Party',
      artist: 'Aviino, Oliv',
      cover:
        'https://chillhop.com/wp-content/uploads/2020/10/23fdd99adc3e16abcb67b004ea3e748ebf433a49-1024x1024.jpg',
      background: ['#8574B8', '#0E436C'],
      audio: 'https://mp3.chillhop.com/serve.php/?mp3=10452',
      id: uuidv4(),
      active: true,
    },
    {
      name: 'Not A Cloud In Sight',
      artist: 'Aviino',
      cover:
        'https://chillhop.com/wp-content/uploads/2020/10/23fdd99adc3e16abcb67b004ea3e748ebf433a49-1024x1024.jpg',
      background: ['#8574B8', '#0E436C'],
      audio: 'https://mp3.chillhop.com/serve.php/?mp3=10450',
      id: uuidv4(),
      active: false,
    },
    {
      name: 'Wildlife',
      artist: 'Philanthrope, chromonicci',
      cover:
        'https://chillhop.com/wp-content/uploads/2020/09/2899f7cc22ab12e17d0119819aac3ca9dbab46e6-1024x1024.jpg',
      background: ['#915746', '#6B2A26'],
      audio: 'https://mp3.chillhop.com/serve.php/?mp3=10263',
      id: uuidv4(),
      active: false,
    },
  ];

  currentSong: BehaviorSubject<Song> = new BehaviorSubject(this.songs[0]);

  constructor() {}

  getSongs() {
    return this.songs.slice();
  }

  getSongsArrayLength() {
    return this.songs.length;
  }

  getCurrentSong() {
    return this.currentSong;
  }

  getSongIndex(song: Song) {
    return this.songs.findIndex((s) => s.id === song.id);
  }

  setCurrentSong(song: Song) {
    this.currentSong.next(song);
  }

  setSongActive(song: Song) {
    this.songs.forEach((s) => {
      if (s.id === song.id) {
        s.active = true;
      } else {
        s.active = false;
      }
    });
  }
}
