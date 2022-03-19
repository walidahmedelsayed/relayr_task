import * as React from "react";

const useUserFocus = (onUserFocus: () => void, dependencies: any[] = []) => {
  const firstLoadRef = React.useRef(false);

  // run onceWhenVisible only when browser didn't run onVisible yet, e.g. due to focus on different tab
  React.useEffect(() => {
    const firstFocusListener = () => {
      if (!firstLoadRef.current) {
        onUserFocus();
      }
      window.removeEventListener("focus", firstFocusListener);
    };

    window.addEventListener("focus", firstFocusListener);

    return () => {
      window.removeEventListener("focus", firstFocusListener);
    };
    // run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // run onVisible only when browser window is visible
  React.useEffect(() => {
    if (document.visibilityState === "visible") {
      firstLoadRef.current = true;
      onUserFocus();
    }

    // allow user to pass dependencies which will re-run effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  return firstLoadRef.current;
};

export default useUserFocus;
