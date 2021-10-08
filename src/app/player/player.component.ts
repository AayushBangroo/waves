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
  faToggleOff,
  faToggleOn,
  faRedo,
  faVolumeDown,
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
  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;
  faRedo = faRedo;
  faVolumeDown = faVolumeDown;
  //Song Info
  currentSong!: Song;
  currentTime: Number = 0;
  duration: Number = 0;
  animationPercentage: Number = 0;
  //player
  autoplay: boolean = true;
  repeat: boolean = false;
  showVolumeControl: boolean = false;
  volumeValue: Number = 1;
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
      this.resetState();
      //set previously running song inactive if it was active
      if (this.currentSong) {
        if (this.playerService.isPlaying) {
          this.currentSong = song;
          //play newly selected song if previous song was also playing
          this.playerService.playSong(this.currentSong);
        } else {
          //select the new song but don't play it
          this.currentSong = song;
        }
      } else {
        //set initial song when page loads
        this.currentSong = song;
      }
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

  resetState() {
    this.autoplay = true;
    this.repeat = false;
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
    const currentIndex = this.songsService.getSongIndex(this.currentSong);
    const N = this.songsService.getSongsArrayLength();
    const nextSong = this.songsService.getSongs()[(currentIndex + 1) % N];
    //check if repeat is enabled
    if (this.repeat) {
      this.playerService.playSong(this.currentSong);
      return;
    }
    //check autoplay condition
    if (!this.autoplay) this.playerService.isPlaying = false;
    this.songsService.currentSong.next(nextSong);
  }

  onAutoplay() {
    this.autoplay = !this.autoplay;
  }

  onRepeat() {
    this.repeat = !this.repeat;
  }

  onVolumeClick() {
    this.showVolumeControl = !this.showVolumeControl;
  }

  onVolumeDrag(e: any) {
    this.volumeValue = e.target.value;
    this.playerService.setVolume(this.volumeValue);
  }
}
