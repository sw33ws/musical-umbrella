import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";
import React from "react";

function Home() {
  return (
    <div
    style={{
      textAlign: "center",
      paddingTop: "300px",
      background: "rgb(252, 111,111,10)",
      color: "antiquewhite"
    }}
    >
      <h1>Git Commit is Excited to Have YOU!</h1>
      <h2>What will you bring to the world with your new tech tribe?</h2>
      <p>We look forward to seeing you support your fellows devs, and eventualy we look forward to supporting your cause aswell!</p>
    </div>
  );
}

export default Home;