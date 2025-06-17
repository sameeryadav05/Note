import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./Home.css";
import { nanoid } from "@reduxjs/toolkit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToPaste, updateToPaste } from "../Redux/paste";
const Home = () => {
  const [title, settitle] = useState("");
  const [Value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  // const [isCopied, setisCopied] = useState(false);
  const dispatch = useDispatch();
  const textareaRef = useRef(null);
  const randomRef = useRef(null);

  function createPaste() {
    const date = new Date();
    const Paste = {
      Title: title,
      content: Value,
      _id: pasteId || nanoid(),
      createdAt: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    if (pasteId) {
      dispatch(updateToPaste(Paste));
    } else {
      dispatch(addToPaste(Paste));
    }
    settitle("");
    setValue("");
    setSearchParams({});
  }

  function copyPaste() {
    if (textareaRef.current) {
      textareaRef.current.select();
      textareaRef.current.classList.add("highlight");
    } // Selects text before isCopied updates

    console.log("copied to clipboard");
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.classList.remove("highlight");
        textareaRef.current.blur();
      }
    }, 2000);
    navigator.clipboard.writeText(Value).then(() => {
      toast("Copied to clipboard!", {
        icon: "📋",
        style: {
          color: "#065f46",
          background: "#d1fae5",
        },
      });
    });
  }

  useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("pastes") || "[]"); // Parse the string to array
  const update = stored.find((item) => item._id === pasteId);
  if (update) {
    settitle(update.Title);
    setValue(update.content);
  }
  
  }, [pasteId])
  

  return (
    <div className="HomeContainer">
      <div className="title">
        <input
          type="text"
          required
          placeholder="Enter Title ..."
          value={title}
          onChange={(e) => settitle(e.target.value)}
        ></input>
        <button onClick={createPaste}>
          {pasteId ? "Update Note" : "Create Note"}
        </button>
      </div>
      <div className="content">
        <div className="content-head">
          <div className="navigator">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="copy">
            <button onClick={copyPaste}>
              <ContentCopyIcon />
            </button>
          </div>
        </div>
        <hr></hr>
        <div className="content-body">
          <textarea
            placeholder="write your content here ..."
            value={Value}
            onChange={(e) => setValue(e.target.value)}
            ref={textareaRef}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Home;
