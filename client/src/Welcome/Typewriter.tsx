import * as React from "react";

type TypewritterProps = {
  blinkSpeed?: number;
  text: (string | number)[];
};

type ReducerState = {
  blinkSpeed: number;
  text: (string | number)[];
  phrase: string;
  itemIndex: number;
  letterIndex: number;
  stop: boolean;
  blink: boolean;
  erase: boolean;
};

type ReducerAction = {
  type: string;
  payload?: unknown;
};

const initializeState = (options: TypewritterProps): ReducerState => {
  const { text = [], blinkSpeed = 500 } = options;
  const initialPhrase = "";

  return {
    blinkSpeed,
    text: [initialPhrase, ...text],
    phrase: initialPhrase,
    itemIndex: 0,
    letterIndex: 0,
    stop: false,
    blink: false,
    erase: false,
  };
};

const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  const { type, payload } = action;

  switch (type) {
    case "STOP":
      return { ...state, stop: true };

    case "TOGGLE_BLINK":
      return { ...state, blink: !state.blink };

    case "SET_ERASE":
      return { ...state, erase: payload as boolean };

    case "SET_PHRASE":
      return { ...state, phrase: payload as string };

    case "INCREMENT_LETTER_INDEX":
      return { ...state, letterIndex: state.letterIndex + 1 };

    case "DECREMENT_LETTER_INDEX":
      return { ...state, letterIndex: state.letterIndex - 1 };

    case "RESET_LETTER_INDEX":
      return { ...state, letterIndex: 0 };

    case "INCREMENT_ITEM_INDEX":
      return { ...state, itemIndex: state.itemIndex + 1 };

    default:
      throw new Error("⚠️ Typewritter unsupported reducer action");
  }
};

const actionCreator = (dispatch: (action: ReducerAction) => void) => {
  return {
    nextLetter: () => dispatch({ type: "INCREMENT_LETTER_INDEX" }),
    prevLetter: () => dispatch({ type: "DECREMENT_LETTER_INDEX" }),
    nextItem: () => dispatch({ type: "INCREMENT_ITEM_INDEX" }),
    setPhrase: (phrase: string) =>
      dispatch({ type: "SET_PHRASE", payload: phrase }),
    startErase: () => dispatch({ type: "SET_ERASE", payload: true }),
    stopErase: () => dispatch({ type: "SET_ERASE", payload: false }),
    stop: () => dispatch({ type: "STOP" }),
    toggleBlink: () => dispatch({ type: "TOGGLE_BLINK" }),
  };
};

const getTypeSpeed = (type: "erase" | "text"): number => {
  switch (type) {
    case "erase":
      return Math.max(25, Number.parseInt(`${Math.random() * 50}`));

    case "text":
    default:
      return Math.max(50, Number.parseInt(`${Math.random() * 150}`));
  }
};

function Typewritter(props: TypewritterProps) {
  const [state, dispatch] = React.useReducer(
    reducer,
    {
      blinkSpeed: props.blinkSpeed,
      text: props.text,
    },
    initializeState
  );
  const {
    text,
    phrase,
    erase,
    stop,
    blink,
    itemIndex,
    letterIndex,
    blinkSpeed,
  } = state;
  const actions = React.useMemo(() => actionCreator(dispatch), [dispatch]);

  React.useEffect(() => {
    if (stop) {
      return;
    }

    let timeoutSpeed = getTypeSpeed("text");
    const phraseOrDelay = text[itemIndex];
    const isDelay = Number.isInteger(phraseOrDelay);

    if (isDelay) {
      timeoutSpeed = phraseOrDelay as number;
    }

    if (erase) {
      timeoutSpeed = getTypeSpeed("erase");
    }

    const timeout = setTimeout(() => {
      if (isDelay) {
        actions.nextItem();

        return;
      }

      const endOfPhrase = letterIndex >= phrase.length;
      const noMoreItems = endOfPhrase && itemIndex === text.length;

      if (noMoreItems) {
        actions.stop();

        return;
      }

      const processNextPhrase = erase && letterIndex <= 0;

      if (processNextPhrase) {
        actions.stopErase();
        actions.setPhrase(phraseOrDelay as string);

        return;
      }

      if (erase) {
        actions.prevLetter();

        return;
      }

      const startErase = phrase !== phraseOrDelay;

      if (startErase) {
        actions.startErase();

        return;
      }

      if (endOfPhrase) {
        actions.nextItem();

        return;
      }

      actions.nextLetter();
    }, timeoutSpeed);

    return () => clearTimeout(timeout);
  }, [actions, itemIndex, letterIndex, phrase, stop, text, erase]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      actions.toggleBlink();
    }, blinkSpeed);

    return () => clearTimeout(timeout);
  }, [actions, blink, blinkSpeed]);

  return (
    <>
      {phrase.substring(0, letterIndex)}{blink ? "|" : "\xa0"}
    </>
  );
}

export default Typewritter;
