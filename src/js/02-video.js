import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const CURRENT_TIME_KEY = `video-player-timekey`;
function getCurrentTimeKey(timeKey){
    localStorage.setItem(CURRENT_TIME_KEY, timeKey.seconds);
}
player.on('timeupdate', throttle(getCurrentTimeKey, 1000));

const currentTimeValue = localStorage.getItem(CURRENT_TIME_KEY);
player.setCurrentTime(currentTimeValue || 0);