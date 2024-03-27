import { useCallback, useRef, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (newValue: T) => void] {
  const serialize = JSON.stringify;
  const deserialize = JSON.parse;

  const initialize = useRef(() => {
    let value = defaultValue;

    const rawValue = localStorage.getItem(key);
    if (rawValue) {
      value = deserialize(rawValue);
    }

    return value;
  });

  const [state, setState] = useState(initialize.current);

  const setter = useCallback(
    (newValue: T) => {
      localStorage.setItem(key, serialize(newValue));
      setState(newValue);
    },
    [key, setState]
  );

  return [state, setter];
}
