import React from "react";

export function SceneFX() {
  return (
    <div className="bg-blobs" aria-hidden>
      <div className="blob w-[34vw] h-[34vw] min-w-[220px] min-h-[220px] left-[-8vw] top-[10vh]" />
      <div
        className="blob blob-pink w-[24vw] h-[24vw] min-w-[170px] min-h-[170px] left-[26vw] top-[6vh]"
        style={{ animationDelay: "1.2s" }}
      />
      <div
        className="blob w-[38vw] h-[38vw] min-w-[260px] min-h-[260px] right-[-10vw] top-[20vh]"
        style={{ animationDelay: "2.3s" }}
      />
      <div
        className="blob w-[28vw] h-[28vw] min-w-[180px] min-h-[180px] left-[8vw] bottom-[10vh]"
        style={{ animationDelay: "0.7s" }}
      />
      <div
        className="blob blob-pink w-[32vw] h-[32vw] min-w-[220px] min-h-[220px] right-[15vw] bottom-[-4vh]"
        style={{ animationDelay: "3.2s" }}
      />
      <div
        className="blob blob-glass w-[10vw] h-[10vw] min-w-[70px] min-h-[70px] left-[14vw] top-[34vh]"
        style={{ animationDuration: "8s" }}
      />
    </div>
  );
}

export default SceneFX;
