import { useState, useLayoutEffect } from "react";
import type { State } from "../index";

export const createUseState = <T extends State<any>>(state: T) => {
  return <S extends (state: T["state"]) => any>(selector: S) => {
    const [props, setProps] = useState<ReturnType<S>>(selector(state.state));

    useLayoutEffect(() => {
      const ID = state.subscribe((state) => {
        setProps(selector(state));
      });

      return () => {
        state.unsubscribe(ID);
      };
    }, []);

    return props;
  };
};
