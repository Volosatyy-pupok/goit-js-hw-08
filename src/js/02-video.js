import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Vimeo.Player(document.getElementById('vimeo-player'));

const localStorageKey = 'videoplayer-current-time';

// Function to save the current playback time to local storage
const savePlaybackTime = (time) => {
  localStorage.setItem(localStorageKey, time);
};

// Function to load the saved playback time from local storage
const loadPlaybackTime = () => {
  const savedTime = localStorage.getItem(localStorageKey);
  return savedTime ? parseFloat(savedTime) : 0;
};

// Initialize the player with the saved playback time (if available)
const initializePlayer = () => {
  const savedTime = loadPlaybackTime();
  player.setCurrentTime(savedTime).catch((error) => {
    console.error('Error setting current time:', error);
  });
};

// Throttle the saving of playback time to once per second
const savePlaybackTimeThrottled = throttle((time) => {
  savePlaybackTime(time);
}, 1000);

// Listen for the 'timeupdate' event and save the playback time to local storage
player.on('timeupdate', (data) => {
  const currentTime = data.seconds;
  savePlaybackTimeThrottled(currentTime);
});

// Initialize the player with the saved playback time
initializePlayer();






