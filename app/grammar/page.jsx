"use client";
import { useState } from "react";
import { diff_match_patch } from "diff-match-patch";
import { toast } from "react-toastify";
import isAuth from "../compnents/IsAuth";
import axios from "axios";
import { useAuth } from "../context/authContext";
import Button from "../compnents/Form/Button";
import Spinner from "../compnents/Spinner";

const GrammarChecker = () => {
  const { signOut } = useAuth();
  const [inputText, setInputText] = useState("");
  const [correctedText, setCorrectedText] = useState("");
  const [incorrectText, setIncorrectText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showgrammar, setShowGrammar] = useState(false);

  const checkGrammar = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text.");

      return;
    }
    setShowGrammar(true);
    setLoading(true);
    setCorrectedText("Checking grammar...");
    setIncorrectText("Checking grammar...");

    try {
      const response = await axios.post("/api/check-grammar", {
        text: inputText,
      });

      if (response?.data.correctedText) {
        setCorrectedText(
          highlightChanges(inputText, response?.data.correctedText, "corrected")
        );
        setIncorrectText(
          highlightChanges(response?.data.correctedText, inputText, "incorrect")
        );
      } else {
        setCorrectedText("Error: Unable to process the request.");
        setIncorrectText("Error: Unable to process the request.");
      }
    } catch (error) {
      console.error("Error:", error);
      setCorrectedText("An error occurred. Please try again.");
      setIncorrectText("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const highlightChanges = (original, corrected, type) => {
    const dmp = new diff_match_patch();
    const diffs = dmp.diff_main(original, corrected);
    dmp.diff_cleanupSemantic(diffs);

    return diffs.map(([operation, text], index) => {
      if (operation === 1) {
        return (
          <span key={index} className={`highlighted ${type}`}>
            {text}
          </span>
        );
      } else {
        return text;
      }
    });
  };

  return (
    <div className="font-sans bg-gray-100 m-0 p-5 flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col w-full justify-center items-center">
        <div className="absolute top-5 right-5 mb-10">
          <Button
            loading={loading}
            onClick={signOut}
            label={loading ? <Spinner /> : "Logout"}
          />
        </div>

        <div className="w-11/12 max-w-[600px] bg-white p-5 rounded-lg shadow-md">
          <h1 className="font-bold text-2xl text-gray-800 text-center mb-4">
            Grammar Checker
          </h1>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text..."
            className="w-full p-3 border border-gray-300 rounded-md box-border text-base resize-y min-h-[120px]"
          ></textarea>
          <Button
            loading={loading}
            label={loading ? <Spinner /> : "Check Grammar"}
            onClick={checkGrammar}
          />

          {showgrammar && (
            <div className="mt-5">
              <div className="bg-white text-center p-4 rounded-lg shadow-md mb-4">
                <div className="font-bold text-gray-800 mb-2">
                  Corrected Version:
                </div>
                <div className="corrected text-black">{correctedText}</div>
              </div>

              <div className="bg-white text-center p-4 rounded-lg shadow-md mb-4">
                <div className="font-bold text-gray-800 mb-2">
                  Incorrect Version:
                </div>
                <div className="incorrect text-black">{incorrectText}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default isAuth(GrammarChecker);
