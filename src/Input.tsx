import { Editor, OnChange } from "@monaco-editor/react";

type InputProps = {
  value: string;
  onChange: OnChange;
};

export function Input(props: InputProps) {
  return (
    <Editor
      defaultValue={props.value}
      path="input.sql"
      language="sql"
      onChange={props.onChange}
      options={{ minimap: { enabled: false } }}
    />
  );
}
