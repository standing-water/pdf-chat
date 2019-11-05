import React, { useCallback } from "react";
import { Document, Page } from "react-pdf/dist/entry.webpack";
// import pdf from "./sample.pdf";

import "./App.css";

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true
};

const App: React.FC = () => {
  // const onDocumentLoadSuccess = () => {
  //   console.log("Test");
  // };

  return (
    <div className='App'>
      test
      <Document
        file={{
          url: "http://localhost:7070"
          // httpHeaders: {
          //   "Access-Control-Request-Method": "GET",
          //   "Access-Control-Allow-Origin": "*",
          //   "X-CustomHeader": "40359820958024350238508234"
          // },
          // withCredentials: true
        }}
        onLoadError={(err) => console.log(err)}
        // options={options}
        // onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default App;
