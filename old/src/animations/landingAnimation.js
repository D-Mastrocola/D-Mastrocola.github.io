import anime from '../anime.es.js';
function landingAnimation() {
  console.log('landing Animation');
  // Wrap every letter in a span
  var titleTextWrapper = document.querySelector('#title-text');
  titleTextWrapper.innerHTML = titleTextWrapper.textContent.replace(/./g, "<span class='title-letter'>$&</span>");

  var subTitleTextWrapper = document.querySelector('#subtitle-text');
  subTitleTextWrapper.innerHTML = subTitleTextWrapper.textContent.replace(/./g, "<span class='subtitle-letter'>$&</span>");

  anime.timeline({ loop: false })
  .add({
      targets: '.title-letter',
      opacity: [0, 1],
      easing: "linear",
      duration: 100,
      offset: '-=775',
      delay: (el, i) => 100 * (i)
    })
    .add({
      targets: '.subtitle-letter',
      opacity: [0, 1],
      easing: "linear",
      duration: 100,
      offset: '-=775',
      delay: (el, i) => 100 * (i + 1)
    }).add({
      targets: '#load-portfolio',
      width: '9em',
      height: '2.5em',
      opacity: 1,
    })
}

export default landingAnimation;