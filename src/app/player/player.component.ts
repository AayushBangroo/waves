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
  animationPercentage: Number = 0;
  //Audio element
  @ViewChild('audioRef') audioElement!: ElementRef;
  //Subscription
  private subscription!: Subscription;

  constructor(
    private songsService: SongsService,
    public playerService: PlayerService
  ) {}

  ngOnInit() {
    this.subscription = this.songsService.currentSong.subscribe((song) => {
      //set previously running song inactive if it was active
      if (this.currentSong) {
        if (this.playerService.isPlaying) {
          this.currentSong = song;
          //play newly selected song if previous song was also playing
          this.playerService.playSong(this.currentSong);
        }
      }
      //select the new song but don't play it
      this.currentSong = song;
      this.songsService.setSongActive(this.currentSong);
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
    if (this.playerService.isPlaying) {
      this.playerService.pauseSong();
    } else {
      this.playerService.playSong(this.currentSong);
    }
  }

  playLeftSong() {
    const currentIndex = this.songsService.getSongIndex(this.currentSong);
    const N = this.songsService.getSongsArrayLength();

    this.songsService.currentSong.next(
      this.songsService.getSongs()[(currentIndex - 1 + N) % N]
    );
  }

  playRightSong() {
    const currentIndex = this.songsService.getSongIndex(this.currentSong);
    const N = this.songsService.getSongsArrayLength();

    this.songsService.currentSong.next(
      this.songsService.getSongs()[(currentIndex + 1) % N]
    );
  }

  timeUpdateHandler(e: any) {
    this.currentTime = e.target.currentTime;
    this.duration = e.target.duration;

    const currentTimeRounded = Math.round(this.currentTime.valueOf());
    const durationRounded = Math.round(this.duration.valueOf());
    const animationPercentage = Math.round(
      (currentTimeRounded / durationRounded) * 100
    );
    this.animationPercentage = animationPercentage;
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

  onSongEnded() {
    this.playRightSong();
  }
}
