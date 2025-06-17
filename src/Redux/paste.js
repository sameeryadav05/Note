import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};
export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;
      const normalizedNewTitle = paste.Title.trim().toLowerCase();

      const alreadyExists = state.pastes.some(
        (item) => item.Title.trim().toLowerCase() === normalizedNewTitle
      );

        if(normalizedNewTitle==='')
        {
            toast.error("Enter valid Title", {
            icon: "❌",
        });

        }
        else if(alreadyExists) {
        console.log("Paste with similar title already exists");
        toast.error("Note with similar title already exists", {
          icon: "❌",
        });
      } 
      else {
        state.pastes.push(paste);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste created successfully", {
          icon: "✅",
        });
      }
    },
    updateToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Updated successfully", {
          icon: "✅",
        });
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      console.log(pasteId);
      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("removed successfully", {
          icon: "✅",
        });
      }
    },
  },
});

export const { addToPaste, updateToPaste, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;
export default pasteSlice.reducer;
