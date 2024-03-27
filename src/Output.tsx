import { Editor } from "@monaco-editor/react";

type OutputProps = {
  value: string;
};

export function Output(props: OutputProps) {
  return (
    <Editor
      value={props.value}
      path="output.sql"
      language="sql"
      options={{ readOnly: true, minimap: { enabled: false } }}
    />
  );
}
