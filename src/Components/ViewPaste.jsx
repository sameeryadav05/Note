import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { nanoid } from "@reduxjs/toolkit";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import toast from "react-hot-toast";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ViewPaste = () => {
  const [title, settitle] = useState("");
  const [Value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();
  const dispatch = useDispatch();
  const textareaRef = useRef(null);

  const allPaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    const matchedPaste = allPaste.find((item) => item._id === id);
    if (matchedPaste) {
      settitle(matchedPaste.Title);
      setValue(matchedPaste.content);
    }
  }, [id, allPaste]);

  function copyPaste() {
    if (textareaRef.current) {
      textareaRef.current.select();
      textareaRef.current.classList.add("highlight");
    }

    navigator.clipboard.writeText(Value).then(() => {
      toast("Copied to clipboard!", {
        icon: "📋",
        style: {
          color: "#065f46",
          background: "#d1fae5",
        },
      });
    });

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.classList.remove("highlight");
        textareaRef.current.blur();
      }
    }, 2000);
  }

  return (
    <div className="HomeContainer">
      <div className="title">
        <input
          type="text"
          required
          placeholder="Enter Title ..."
          value={title}
          disabled
          style={{ width: "100%" }}
        />
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
        <hr />
        <div className="content-body">
          <textarea
            placeholder="write your content here ..."
            value={Value}
            ref={textareaRef}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
