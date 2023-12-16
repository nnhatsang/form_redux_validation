import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrUser: [],
  arrFilter: [],
  showErr: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getValueUser: (state, action) => {
      console.log(state);
      console.log(action);
      // kiểm tra tồn tại ID
      const user = state.arrUser.find((item) => item.ID == action.payload.ID);
      if (!user) {
        state.arrUser.push(action.payload);
        state.showErr = "";
      } else {
        state.showErr = "Mã sinh viên tồn tại trong dữ liệu";
      }
    },
    updateUser: (state, actions) => {
      console.log(actions);
      const index = state.arrUser.findIndex(
        (item) => item.ID == actions.payload.ID
      );
      if (index != -1) {
        state.arrUser[index] = actions.payload;
      }
    },
    removeUser: (state, action) => {
      // xoá: cần ID để xoá
      const index = state.arrUser.findIndex((item) => {
        //id = 5 , action.payload =5
        return item.ID == action.payload;
      });
      if (index != -1) {
        state.arrUser.splice(index, 1);
      }
    },
    filterUsers: (state, action) => {
      const { keyword } = action.payload;
      state.arrFilter = state.arrUser.filter((user) => {
        return user.fullName.toLowerCase().includes(keyword.toLowerCase());
      });
    },
  },
});

export const { getValueUser, updateUser, removeUser, filterUsers } =
  userSlice.actions;

export default userSlice.reducer;
