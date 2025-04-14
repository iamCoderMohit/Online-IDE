import axios from "axios";
import { version } from "react";
import { langversion } from "./constant";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode) => {
  console.log('clcik')
  const response = await API.post("/execute", {
    language: language,
    version: langversion[language],
    files: [
      {     
        content: sourceCode,
      },  
    ],
  });
  return response.data
};
