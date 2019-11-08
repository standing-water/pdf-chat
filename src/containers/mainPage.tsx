import React from "react";
import { Document, Page } from "react-pdf/dist/entry.webpack";

interface Props {}

export const MainPage: React.FC<Props> = ({}) => {
  return (
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
    >
      <Page pageNumber={1} />
    </Document>
  );
};
