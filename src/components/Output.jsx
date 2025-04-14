import React, { useState } from "react";
import { executeCode } from "./api";

function Output({ editorRef, language }) {
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      setOutput(null)
      setError(null)
      const { run: result } = await executeCode(language, sourceCode);

      {
        result.stderr
          ? setError(result.stderr.split("\n"))
          : setOutput(result.output.split("\n"));
      }
    } catch (error) {
      // setOutput(error.message)
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-5 mb-10">
        <div className="text-white text-lg font-bold rounded-lg p-2 w-fit">
          Output :
        </div>
        <button
          onClick={runCode}
          className="text-white bg-gray-800 cursor-pointer rounded-lg p-2 w-fit"
        >
          Run Code
        </button>
      </div>
      <div className="h-[75vh] w-full bg-[#1e1e1e] flex flex-col rounded-lg p-5">
        {error ? (
          error.map((char) => (
            <p className="text-red-400 font-medium">{char}</p>
          ))
        ) : (
          <div>
            {isLoading ? (
              <span className="text-white font-bold">loading...</span>
            ) : (
              <div>
                {output ? (
                  output.map((char) => <p className="text-white">{char}</p>)
                ) : (
                  <span className="text-white font-bold">
                    Click "run code" to see output
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Output;
