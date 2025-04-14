import { Editor } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import LangSelector from "./LangSelector";
import Output from "./Output";

function CodeEditor() {
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("python");
  const editorRef = useRef();

  useEffect(() => {
    setValue(codeSnippets[language])
  }, [language])

  const codeSnippets = {
    javascript: `
  function greet(name) {
    return "Hello, " + name + "!";
  }
  console.log(greet("Mohit")); // Hello, Mohit!
  `,
  
    typescript: `
  function greet(name: string): string {
    return "Hello, " + name + "!";
  }
  console.log(greet("Mohit")); // Hello, Mohit!
  `,
  
    python: `
def greet(name):
    return "Hello, " + name
  
print(greet("Mohit"))  # Hello, Mohit
  `,
  
    java: `
  public class Main {
    public static void main(String[] args) {
      System.out.println(greet("Mohit"));
    }
  
    public static String greet(String name) {
      return "Hello, " + name + "!";
    }
  }
  `,
  
    csharp: `
  using System;
  
  class Program {
    static void Main() {
      Console.WriteLine(Greet("Mohit"));
    }
  
    static string Greet(string name) {
      return "Hello, " + name + "!";
    }
  }
  `,
  
    php: `
  <?php
  function greet($name) {
    return "Hello, " . $name . "!";
  }
  echo greet("Mohit");
  ?>
  `
  };
  

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (lang) => {
    setLanguage(lang);
    setValue(codeSnippets[lang])
  };
  return (
    <div className="sm:w-[100%] sm:flex sm:gap-5 ">
    <div className="sm:w-1/2 w-full h-fit" >
      <LangSelector language={language} onSelect={onSelect} />
      <Editor
        theme="vs-dark"
        value={value}
        onChange={(value) => setValue(value)}
        onMount={onMount}
        language={language}
        height="75vh"
        width=''
        // defaultValue="// some comment"
      />
    </div>

    <div className="sm:w-1/2 w-full h-fit">
        <Output editorRef={editorRef} language={language} />
    </div>
    </div>
  );
}

export default CodeEditor;
