import { Suspense, useEffect, useState } from "react";
import "./App.css";
import { Init } from "./Init";
import { Direction, InOut } from "./InOut";

function App() {
  const [direction, setDirection] = useState<Direction>("horizontal");

  // ウィンドウの縦横比からパネルの配置を決定する
  useEffect(() => {
    const listener = () => {
      const newDirection =
        window.innerWidth / window.innerHeight > 1.4
          ? "horizontal"
          : "vertical";
      setDirection(newDirection);
    };
    listener();
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  return (
    <Suspense fallback={"Skeleton Screen"}>
      <Init />
      <InOut direction={direction} />
    </Suspense>
  );
}

export default App;
