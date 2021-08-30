import { ElementRef, Injectable } from '@angular/core';
import { Song, SongsService } from '../song/song.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  audioElement!: ElementRef;
  isPlaying: boolean = false;

  constructor() {}

  setAudioElement(audioElement: ElementRef) {
    this.audioElement = audioElement;
  }

  playSong(song: Song) {
    if (this.audioElement) {
      const audioPromise = this.audioElement.nativeElement.play();
      if (audioPromise) {
        audioPromise.then(() => this.audioElement.nativeElement.play());
      }
      this.isPlaying = true;
    }
  }

  pauseSong() {
    this.audioElement.nativeElement.pause();
    this.isPlaying = false;
  }
}
