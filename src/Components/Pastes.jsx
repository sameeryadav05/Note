import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import "./Pastes.css";
import toast from "react-hot-toast";
import { removeFromPastes } from "../Redux/paste";
import { NavLink } from "react-router-dom";
const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  console.log(pastes);

  const dispatch = useDispatch();
  const [searchValue, setsearchValue] = useState("");
  const filteredData =
    searchValue === ""
      ? []
      : pastes.filter((paste) =>
          paste.Title.toLowerCase().includes(searchValue.toLowerCase())
        );

  console.log(filteredData);

  function update() {}
  function Delete(PasteId) {
    dispatch(removeFromPastes(PasteId));
  }
  function Copy(content) {
    navigator.clipboard.writeText(content).then(() => {
      toast("Copied to clipboard!", {
        icon: "📋",
        style: {
          color: "#065f46",
          background: "#d1fae5",
        },
      });
    });
  }
  function view() {}

  return (
    <div className="MainContainer">
      <div className="SearchBar">
        <input
          placeholder="search paste .."
          value={searchValue}
          onChange={(e) => setsearchValue(e.target.value)}
        />
      </div>
      <div className="pasteContainer">
        {filteredData.length > 0
          ? filteredData.map((paste) => {
              return (
                <div className="paste">
                  <div className="pasteTop">
                    <div className="pasteTitle">
                      <p>{paste.Title}</p>
                    </div>
                    <div className="pasteButtons">
                      <button className="Edit">
                        <Tooltip title="update">
                          <IconButton>
                            <NavLink to={`/?pasteId=${paste._id}`}>
                              <EditIcon />
                            </NavLink>
                          </IconButton>
                        </Tooltip>
                      </button>
                      <button
                        className="Delete"
                        onClick={() => Delete(paste._id)}
                      >
                        <Tooltip title="Delete">
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </button>
                      <button className="view">
                        <Tooltip title="View">
                          <IconButton>
                            <NavLink to={`/pastes/${paste._id}`}>
                              <VisibilityIcon />
                            </NavLink>
                          </IconButton>
                        </Tooltip>
                      </button>
                      <button
                        className="copy"
                        onClick={() => Copy(paste.content)}
                      >
                        <Tooltip title="copy">
                          <IconButton>
                            <ContentCopyIcon />
                          </IconButton>
                        </Tooltip>
                      </button>
                    </div>
                  </div>
                  <div className="pasteContent">
                    <p>{paste.content}</p>
                  </div>
                  <hr></hr>
                  <div className="date-info">
                    <div className="Calendar">
                      <CalendarTodayIcon style={{ marginRight: "4px" }} />
                    </div>
                    <div className="date">
                      <span>
                        {new Date(paste.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          : pastes.map((paste) => {
              return (
                <div className="paste">
                  <div className="pasteTop">
                    <div className="pasteTitle">
                      <p>{paste.Title}</p>
                    </div>
                    <div className="pasteButtons">
                      <button className="Edit">
                        <Tooltip title="update">
                          <IconButton>
                            <NavLink to={`/?pasteId=${paste._id}`}>
                              <EditIcon />
                            </NavLink>
                          </IconButton>
                        </Tooltip>
                      </button>
                      <button
                        className="Delete"
                        onClick={() => Delete(paste._id)}
                      >
                        <Tooltip title="Delete">
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </button>
                      <button className="view">
                        <Tooltip title="View">
                          <IconButton>
                            <NavLink to={`/pastes/${paste._id}`}>
                              <VisibilityIcon />
                            </NavLink>
                          </IconButton>
                        </Tooltip>
                      </button>
                      <button
                        className="copy"
                        onClick={() => Copy(paste.content)}
                      >
                        <Tooltip title="copy">
                          <IconButton>
                            <ContentCopyIcon />
                          </IconButton>
                        </Tooltip>
                      </button>
                    </div>
                  </div>
                  <div className="pasteContent">
                    <p>{paste.content}</p>
                  </div>
                  <hr></hr>
                  <div className="date-info">
                    <div className="Calendar">
                      <CalendarTodayIcon style={{ marginRight: "4px" }} />
                    </div>
                    <div className="date">
                      <span>
                        {new Date(paste.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Pastes;
