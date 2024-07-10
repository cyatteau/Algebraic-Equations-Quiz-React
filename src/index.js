import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import TicTacToe from "./TicTacToe";
import Quiz from "./Quiz";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Quiz />
  </StrictMode>
);
