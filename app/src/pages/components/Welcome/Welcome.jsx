import ThreeCanvas from "../ThreeCanvas/ThreeCanvas";
import anime, { easings } from "animejs";
import { Component } from "react";

class Welcome extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    anime({
      targets: '#welcome-button',
      rotate: '2deg',
      opacity: 1,
      delay: 3000,
      duration: 1000,
      easing: 'easeInExpo',
      update: function(anim) {
        console.log(Math.round(anim.progress)+'%');
      }

    });
  }
  render() {
    return (
      <>
        <ThreeCanvas />
        <button id='welcome-button'>Enter Site</button>
      </>
    );
  }
}

export default Welcome;
