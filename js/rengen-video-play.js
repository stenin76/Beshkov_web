document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.video-hover-wrapper').forEach(wrapper => {
    const playButton = wrapper.querySelector('.play-button');
    const closeButton = wrapper.querySelector('.close-button');
    const video = wrapper.querySelector('.hover-video');
    const img = wrapper.querySelector('img');
    const text = wrapper.querySelector('.text-content');
    const heading = wrapper.querySelector('h3');

    const showVideo = () => {
      img.style.display = 'none';
      text.style.display = 'none';
      heading.style.display = 'none';
      playButton.style.display = 'none';
      closeButton.style.display = 'block';
      video.style.display = 'block';
      video.play();
    };

    const closeVideo = () => {
      video.pause();
      video.currentTime = 0;
      video.style.display = 'none';
      closeButton.style.display = 'none';
      img.style.display = 'block';
      text.style.display = 'block';
      heading.style.display = 'block';
      playButton.style.display = 'block';
    };

    playButton.addEventListener('click', showVideo);
    closeButton.addEventListener('click', closeVideo);
    video.addEventListener('ended', closeVideo); // Auto-close on end
  });
});