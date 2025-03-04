'use client'
import { useState } from "react";
import { diff_match_patch } from "diff-match-patch";
import '../styles/home.css'
import { toast } from "react-toastify";

export default function GrammarChecker() {
  const [inputText, setInputText] = useState("");
  const [correctedText, setCorrectedText] = useState("");
  const [incorrectText, setIncorrectText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showgrammar, setShowGrammar] = useState(false)

  const checkGrammar = async () => {
      if (!inputText.trim()) {
    toast.error('Please enter some text.');

          return;
        }    
    setShowGrammar(true)
    setLoading(true);
    setCorrectedText("Checking grammar...");
    setIncorrectText("Checking grammar...");

    try {
      const response = await fetch(
        "https://grammar-check-mocha.vercel.app/api/check-grammar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: inputText }),
        }
      );

      const data = await response.json();
      if (data.correctedText) {
        setCorrectedText(highlightChanges(inputText, data.correctedText, "corrected"));
        setIncorrectText(highlightChanges(data.correctedText, inputText, "incorrect"));
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
        return <span key={index} className={`highlighted ${type}`}>{text}</span>;
      } else {
        return text;
      }
    });
  };

  return (
    <div className="container">
      <h1>Grammar Checker</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text..."
      ></textarea>
      <button onClick={checkGrammar} className="btn" disabled={loading}>
        {loading ? "Checking..." : "Check Grammar"}
      </button>
      
      {showgrammar && <div className={`result-container`}>
        <div className="card">
          <div className="card-title">Corrected Version:</div>
          <div className="corrected">{correctedText}</div>
        </div>

        <div className="card">
          <div className="card-title">Incorrect Version:</div>
          <div className="incorrect">{incorrectText}</div>
        </div>
      </div>}
    </div>
  );
}
