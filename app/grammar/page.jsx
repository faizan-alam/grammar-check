"use client";
import { useState } from "react";
import { diff_match_patch } from "diff-match-patch";
import "../styles/home.css";
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
    <div className="flex flex-col w-full justify-center items-center">
      <div className="absolute top-5 right-5 mb-10">
        <Button
          loading={loading}
          onClick={signOut}
          label={loading ? <Spinner /> : "Logout"}
        />
      </div>

      <div className="container w-full">
        <h1 className="font-bold text-2xl">Grammar Checker</h1>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text..."
        ></textarea>
        <Button
          loading={loading}
          label={loading ? <Spinner /> : "Check Grammar"}
          onClick={checkGrammar}
        />

        {showgrammar && (
          <div className={`result-container`}>
            <div className="card">
              <div className="card-title">Corrected Version:</div>
              <div className="corrected">{correctedText}</div>
            </div>

            <div className="card">
              <div className="card-title">Incorrect Version:</div>
              <div className="incorrect">{incorrectText}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default isAuth(GrammarChecker);
