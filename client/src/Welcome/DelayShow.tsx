import * as React from "react";
import "./delayShow.css";

type DelayProps = {
  delay?: number;
  children: React.ReactChild;
};

function DelayShow(props: DelayProps) {
  const { delay = 100, children: child } = props;
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, delay);

    return () => clearTimeout(timeout);
    // show only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (React.isValidElement(child)) {
    let newClassName = child.props?.className ? child.props.className : "";

    if (show) {
      newClassName = `${newClassName} delay-transition delay--show`;
    } else {
      newClassName = `${newClassName} delay-transition`;
    }

    return React.cloneElement(child, {
      className: newClassName,
    });
  }

  return <>{child}</>;
}

export default DelayShow;
