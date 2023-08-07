import React from "react";
import Functions from "./Functions";
import "bootstrap/dist/css/bootstrap.min.css";

function DesktopOnly() {
  return (
    // <div>
    //     <img src={image} className="img-fluid" alt="responsive " />

    <div className="card text-white bg-danger mb-3">
      <h1 className="text-center">
        This doesn't work on mobile devices. Sorry!!
      </h1>
    </div>
    // </div>
  );
}

export default function App() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  return <div>{isMobile ? <DesktopOnly /> : <Functions />}</div>;
}
