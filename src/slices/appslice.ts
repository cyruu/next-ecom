import redis from "@/helper/redis";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
console.log("runningggggggggg slice fileeeeeeeee");

// async thunk not used
export const getCookieUser = createAsyncThunk(
  "slice/cookieUser",
  async (thunkAPI) => {
    console.log("thunk start");
    // await new Promise((res, rej) => {
    //   setTimeout(() => {
    //     res("sdf");
    //   }, 1000);
    // });
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/users/getuser`
    );
    console.log("thunk resp", response.data);

    if (response.data.statusCode == 200) {
      return response.data.jwtTokenData;
    }

    return null;
  }
);

const slice = createSlice({
  name: "appSlice",
  initialState: {
    loggedInUser: null,
    loggedOut: false,
    userLoading: true,
  },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload.loggedInUser;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCookieUser.pending, (state) => {
        state.loggedInUser = null;
        state.userLoading = false;
      })
      .addCase(getCookieUser.fulfilled, (state, action) => {
        // console.log("user loggedin checked", action.payload);
        state.loggedInUser = action.payload;
        state.userLoading = false;
      })
      .addCase(getCookieUser.rejected, (state) => {
        state.loggedInUser = null;
        state.userLoading = false;
      });
  },
});
export const { setLoggedInUser } = slice.actions;
export default slice.reducer;
