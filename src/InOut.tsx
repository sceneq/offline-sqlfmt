import { useCallback, useState } from "react";
import { Input } from "./Input";
import { Output } from "./Output";
import { useLocalStorage } from "./useLocalStorage";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { format } from "#sqlformat_wasm";

export type Direction = "horizontal" | "vertical";

const sampleCode = `
with  g as(              select
a,b,sum(c) over(partition by a)
as c from tab where a =1 and b=
2 or c =3) select    a,  sum(b)
, avg( c ) from g    group by a`;

export function InOut(props: { direction: Direction }) {
  const { direction } = props;
  const [input, setInput] = useLocalStorage<string>("code", sampleCode);
  const [formatted, setFormatted] = useState(format(input));

  const onInputChange = useCallback((value: string | undefined) => {
    if (value) {
      setInput(value);
      setFormatted(format(value));
    }
  }, []);

  return (
    <PanelGroup direction={direction} className="main">
      <Panel>
        <Input value={input} onChange={onInputChange} />
      </Panel>
      <PanelResizeHandle
        className="resize-handle"
        style={
          direction === "horizontal"
            ? { width: "0.1rem" }
            : { height: "0.1rem" }
        }
      />
      <Panel>
        <Output value={formatted} />
      </Panel>
    </PanelGroup>
  );
}

