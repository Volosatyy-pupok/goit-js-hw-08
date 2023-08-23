import Player, { Vimeo } from '@vimeo/player'; // Додайте Vimeo у імпорт
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const vimeoPlayerInstance = new Player(iframe);

const CURRENT_TIME_KEY = `video-player-timekey`;
function getCurrentTimeKey(timeKey){
    localStorage.setItem(CURRENT_TIME_KEY, timeKey.seconds);
}
vimeoPlayerInstance.on('timeupdate', throttle(getCurrentTimeKey, 1000));

const currentTimeValue = localStorage.getItem(CURRENT_TIME_KEY);
vimeoPlayerInstance.setCurrentTime(currentTimeValue || 0);

class VideoHandler {
  constructor(player) {
    this.player = player;
    this.localStorageKey = 'videoplayer-current-time';
    this.init();
  }
  
  init() {
    this.player.on('timeupdate', this.handleTimeUpdate.bind(this));
    this.initializePlayer();
  }

  handleTimeUpdate(data) {
    const currentTime = data.seconds;
    this.savePlaybackTimeThrottled(currentTime);
  }

  savePlaybackTime(time) {
    localStorage.setItem(this.localStorageKey, time);
  }

  loadPlaybackTime() {
    const savedTime = localStorage.getItem(this.localStorageKey);
    return savedTime ? parseFloat(savedTime) : 0;
  }

  initializePlayer() {
    const savedTime = this.loadPlaybackTime();
    this.player.setCurrentTime(savedTime).catch((error) => {
      console.error('Error setting current time:', error);
    });
  }

  savePlaybackTimeThrottled = throttle((time) => {
    this.savePlaybackTime(time);
  }, 1000);
}
const videoHandler = new VideoHandler(vimeoPlayerInstance);