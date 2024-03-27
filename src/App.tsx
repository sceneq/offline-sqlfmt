import { Suspense, useCallback, useState } from "react";
import "./App.css";
import { Init } from "./Init";
import { useLocalStorage } from "./useLocalStorage"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { format } from "#sqlformat_wasm";
import { Editor, OnChange } from "@monaco-editor/react";

type InputProps = {
  value: string;
  onChange: OnChange;
};

function Input(props: InputProps) {
  return (
    <Editor
      defaultValue={props.value}
      path="input.sql"
      language="sql"
      onChange={props.onChange}
    />
  );
}

type OutputProps = {
  value: string;
};

function Output(props: OutputProps) {
  return (
    <Editor
      value={props.value}
      path="output.sql"
      language="sql"
      options={{ readOnly: true }}
    />
  );
}

function InOut() {
  const [input, setInput] = useLocalStorage<string>(
    "code",
    `
with  g as(                                        select
a,b,sum(c) over(partition by a) as     c from tab where a
=1 and b=
2 or c =3
) select a,sum(b),avg(c) from g                group by a`
  );
  const [formatted, setFormatted] = useState(format(input));

  const onInputChange = useCallback((value: string | undefined) => {
    if (value) {
      setInput(value);
      setFormatted(format(value));
    }
  }, []);

  return (
    <PanelGroup direction="horizontal" className="main">
      <Panel>
        <Input value={input} onChange={onInputChange} />
      </Panel>
      <PanelResizeHandle />
      <Panel>
        <Output value={formatted} />
      </Panel>
    </PanelGroup>
  );
}

function App() {
  return (
    <Suspense fallback={"..."}>
      <Init />
      <InOut />
    </Suspense>
  );
}

export default App;
