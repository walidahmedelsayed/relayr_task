import React from "react";
import RelayrLogo from "./RelayrLogo";
import Typewritter from "./Typewriter";
import DelayShow from "./DelayShow";
import useWhenVisible from "./useWhenVisible.hook";

import "./intro.css";

function Intro() {
  const [hasUserFocus, setHasUserFocus] = React.useState(false);

  useWhenVisible(() => setHasUserFocus(true));

  return hasUserFocus ? (
    <article className="intro">
      <header className="intro-header">
        <RelayrLogo />
        <DelayShow delay={2000}>
          <h2 className="intro-header--text">🏆 Hello Champ 👋</h2>
        </DelayShow>
      </header>
      <DelayShow delay={3000}>
        <p className="intro-congrats">
          <Typewritter
            text={[
              4500,
              "Congratulations on advancing to the next round!",
              16000,
              "Time is ticking... ⏱",
              4000,
              "We're counting on you! ʕ•̫͡•ʕ*̫͡*ʕ•͓͡•ʔ-̫͡-ʕ•̫͡•ʔ*̫͡*ʔ•̫͡-ʔ",
            ]}
          />
          <DelayShow delay={10000}>
            <span className="intro-congrats--sign">– Frontend Team</span>
          </DelayShow>
        </p>
      </DelayShow>
      <DelayShow delay={13000}>
        <p className="intro-box">
          You will find all of the instructions in the&nbsp;
          <span className="intro--mark">README.md</span> file.
          <br />
          Please remember that the entire&nbsp;
          <code className="intro--mark">/client</code> directory is at your
          disposal.
        </p>
      </DelayShow>
      <DelayShow delay={17000}>
        <p>
          Are you ready?&nbsp;
          <span className="intro--mark">
            <strong>Let's get started!</strong>
          </span>
        </p>
      </DelayShow>
    </article>
  ) : null;
}

export default Intro;
