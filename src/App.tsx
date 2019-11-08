import React, { useCallback, useState } from "react";
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
  const [pageNumber, setPageNumber] = useState(1);
  const [_numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: any }) => {
    console.log("success");
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <div className="App">
      <nav>
        <button onClick={goToPrevPage}>Prev</button>
        <button onClick={goToNextPage}>Next</button>
      </nav>
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
        onLoadError={err => console.log(err)}
        // options={options}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
};

export default App;
