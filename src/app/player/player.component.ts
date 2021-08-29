import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Song, SongsService } from '../song/song.service';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy, AfterViewInit {
  //Svg icons
  faPlay = faPlay;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faPause = faPause;
  //Song Info
  currentSong!: Song;
  currentTime: Number = 0;
  duration: Number = 0;
  //Audio element
  @ViewChild('audioRef') audioElement!: ElementRef;
  //Subscription
  private subscription!: Subscription;

  constructor(
    private songsService: SongsService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.subscription = this.songsService.currentSong.subscribe((song) => {
      //set previously running song inactive if it was active
      if (this.currentSong) {
        if (this.currentSong.active) {
          this.songsService.setCurrentSongInactive(this.currentSong);
          this.currentSong = song;
          this.songsService.setSongActive(this.currentSong);
          //play newly selected song if previous song was also playing
          this.playerService.playSong(this.currentSong);
        }
      }
      //select the new song but don't play it
      this.currentSong = song;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //pass audioRef to playerService after view is initialized
  ngAfterViewInit() {
    this.playerService.setAudioElement(this.audioElement);
  }

  playSongHandler() {
    if (this.currentSong.active) {
      this.playerService.pauseSong();
      this.songsService.setCurrentSongInactive(this.currentSong);
    } else {
      this.playerService.playSong(this.currentSong);
      this.songsService.setSongActive(this.currentSong);
    }
  }

  timeUpdateHandler(e: any) {
    this.currentTime = e.target.currentTime;
    this.duration = e.target.duration;
  }

  getTime(time: any) {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  }

  onDragHandler(e: any) {
    this.audioElement.nativeElement.currentTime = e.target.value;
    this.currentTime = e.target.value;
  }
}
