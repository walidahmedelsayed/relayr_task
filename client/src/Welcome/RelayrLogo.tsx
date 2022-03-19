import * as React from "react";
import "./relayrLogo.css";

type RelayrLogoProps = {
  show?: boolean;
};

function RelayrLogo(props: RelayrLogoProps) {
  const { show = true } = props;
  const [active, setActive] = React.useState(!show);

  React.useEffect(() => {
    setActive((prevActive) => !prevActive);
  }, [show]);

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 158.3 56"
      width="158.3"
      height="56"
      data-testid="relayr_logo"
      className={`relayr-logo ${active ? "active" : ""}`}
    >
      <g>
        <path
          className="letter-1"
          d="M0,12.2c2.4-1.1,6.5-1.9,10.3-1.9c2.6,0,4.5,0.3,6.3,0.8l-1,5.4c-1-0.3-2.9-0.7-5-0.7
			c-2.5,0-3.8,0.3-4.9,0.7v25.6H0V12.2z"
        ></path>
        <path
          className="letter-2"
          d="M45.8,28.7H25.5V29c0,5.5,3.4,8.2,9.5,8.2c3.5,0,7.4-0.9,9.6-2l0.8,5.4c-3,1.3-6.8,2-10.5,2
			c-10.2,0-15.3-5-15.3-16c0-9,3.4-16.3,13.7-16.3c8.4,0,13.2,4.7,13.2,13.8C46.4,25.3,46.3,27.2,45.8,28.7 M25.5,23.9H41v-0.4
			c0-5.6-2.9-8.2-7.8-8.2c-4.7,0-7.7,2.4-7.7,8.2V23.9z"
        ></path>
        <path
          className="letter-3"
          d="M53,0h5.7v32.1c0,4,1.1,5,3.1,5c0.9,0,1.9-0.1,2.5-0.4l0.8,5.2c-0.9,0.4-2.2,0.6-3.9,0.6
			c-4.7,0-8.2-2.5-8.2-9.3V0z"
        ></path>
        <path
          className="letter-4"
          d="M93.5,40.8c-3.1,1.1-7.9,1.9-12.1,1.9c-8,0-12.6-2.7-12.6-9.7s5-9.6,13.1-9.6h6v-2.7c0-3.7-2.7-5-7.3-5
			c-3.7,0-6.6,0.8-8.6,1.5l-0.8-5.3c2.6-0.7,5.9-1.4,9.6-1.4c7.3,0,12.8,2.7,12.8,10.8L93.5,40.8L93.5,40.8z M87.8,27.8h-6
			c-5,0-7.4,1.3-7.4,5c0,4,2.7,4.9,6.7,4.9c2.1,0,4.8-0.2,6.6-0.8L87.8,27.8L87.8,27.8z"
        ></path>
        <path
          className="letter-5"
          d="M113.1,34.7l9-23.8h6l-11.8,31.2c-2.7,7.3-6.9,14.1-15.5,13.9l-1.3-5.4c4.2,0.3,8.8-2.9,10.9-8.5L96.9,11
			h6.1L113.1,34.7z"
        ></path>
        <path
          className="letter-6"
          d="M132.9,12.2c2.4-1.1,6.5-1.9,10.3-1.9c2.6,0,4.5,0.3,6.3,0.8l-1,5.4c-1-0.3-2.9-0.7-5-0.7
			c-2.5,0-3.8,0.3-4.9,0.7v25.6h-5.7L132.9,12.2L132.9,12.2z"
        ></path>
        <path
          className="dot"
          d="M153.9,33.8c2.4,0,4.4,2,4.4,4.4s-2,4.4-4.4,4.4s-4.4-2-4.4-4.4C149.5,35.7,151.5,33.8,153.9,33.8"
        ></path>
      </g>
    </svg>
  );
}

export default RelayrLogo;
