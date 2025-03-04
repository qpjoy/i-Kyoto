import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "@/states/variables";

export const verifyToken = createAsyncThunk("account/token", async function (api = {}, thunkApi) {
  const state = thunkApi.getState();
  const _token = api.token || state.account.token;
  if (!_token) {
    return {
      code: -1,
      message: "No token"
    };
  }
  const params = {
    token: _token,
    deviceID: state.account.deviceID
  };
  let message,
    code = "";
  let data = {};
  try {
    const res = await fetch(`${url}/users/verify-token`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      //   mode: "cors", // no-cors, *cors, same-origin
      //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      //   credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${_token}`
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      //   redirect: "follow", // manual, *follow, error
      //   referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(params)
    });
    data = await res.json();
    console.log(`[Res]: `, data);

    message = "[Success]: Login";
  } catch (e) {
    console.log(e);
    message = `[Error]: login ${e.message}`;
    code = -1;
  }

  return {
    code,
    message,
    ...data
  };
});

export const fetchDevices = createAsyncThunk("account/fetchDevices", async function (api = {}, thunkApi) {
  const state = thunkApi.getState();
  const _token = api.token || state.account.token;
  if (!_token) {
    return {
      code: -1,
      message: "No token"
    };
  }

  const res = await fetch(`${url}/devices/mine`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    //   mode: "cors", // no-cors, *cors, same-origin
    //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${_token}`
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
    //   redirect: "follow", // manual, *follow, error
    //   referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  const data = await res.json();
  console.log(`[Res]: `, data);

  return data;
});

export const login = createAsyncThunk("account/login", async function ({ email, password, deviceID }) {
  console.log(`[Account Slice]: `, email, password);
  const params = {
    email,
    password,
    deviceID
  };
  let message,
    code = "";
  let data = {};
  try {
    const res = await fetch(`${url}/users/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      //   mode: "cors", // no-cors, *cors, same-origin
      //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      //   credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        //   Authorization:
        //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjM0NS5jb20iLCJpYXQiOjE3MDk4NjAyMDQsImV4cCI6MTc0MTM5NjIwNH0.XXek3wy7vvuBVyAmuAnSL1dkii4wLeptpKYbeKGyj2E",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      //   redirect: "follow", // manual, *follow, error
      //   referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(params)
    });
    data = await res.json();
    console.log(`[Res]: `, data);

    message = "[Success]: Login";
  } catch (e) {
    console.log(e);
    message = `[Error]: login ${e.message}`;
    code = -1;
  }

  return {
    code,
    message,
    ...data
  };
});

export const getRegisterCode = createAsyncThunk(
  "account/getRegisterCode",
  async ({ email, deviceID }, thunkApi) => {
    // const state = thunkApi.getState();
    // const token = state.account.token;
    console.log(`[thunkApi]: `, thunkApi, email);
    const params = {
      email,
      deviceID
    };
    let message,
      code = "";
    let data = {};

    try {
      const res = await fetch(`${url}/code/send`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        //   mode: "cors", // no-cors, *cors, same-origin
        //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //   credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
          // Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        //   redirect: "follow", // manual, *follow, error
        //   referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(params)
      });
      data = await res.json();
      console.log(`[Res]: `, data);

      message = "[Success]: Login";
    } catch (e) {
      console.log(`[Get Register Code]: `, e);
    }
    return {
      code,
      message,
      ...data
    };
  }
);

export const getPasswordCode = createAsyncThunk("account/getPasswordCode", async ({ email }, thunkApi) => {
  // const state = thunkApi.getState();
  // const token = state.account.token;
  console.log(`[thunkApi]: `, thunkApi, email);
  const params = {
    email
  };
  let message,
    code = "";
  let data = {};

  try {
    const res = await fetch(`${url}/code/forget`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      //   mode: "cors", // no-cors, *cors, same-origin
      //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      //   credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      //   redirect: "follow", // manual, *follow, error
      //   referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(params)
    });
    data = await res.json();
    console.log(`[Res]: `, data);

    message = "[Success]: Login";
  } catch (e) {
    console.log(`[Forget Password Code]: `, e);
    message = "找回密码，邮箱不存在！";
  }
  return {
    code,
    message,
    ...data
  };
});

export const register = createAsyncThunk(
  "account/register",
  async ({ email, password, code, deviceID }, thunkApi) => {
    console.log(`[Register]: params `, email, password, code);
    const params = {
      code,
      email,
      password,
      deviceID
    };
    let message,
      _code = "";
    let data = {};
    try {
      const res = await fetch(`${url}/users/email-register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });
      data = await res.json();
      console.log("[Register]: data", data);
      message = "[Success]: Register";
    } catch (e) {
      console.log(`[Register]: `, e);
      message = `[Error]: register ${e.message}`;
      _code = -1;
    }
    return {
      code: _code,
      message,
      ...data
    };
  }
);

export const changePassword = createAsyncThunk(
  "account/changePassword",
  async ({ email, password, code }, thunkApi) => {
    console.log(`[Register]: params `, email, password, code);
    const params = {
      code,
      email,
      password
    };
    let message,
      _code = "";
    let data = {};
    try {
      const res = await fetch(`${url}/users/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      });
      data = await res.json();
      console.log("[Register]: data", data);
      message = "[Success]: Register";
    } catch (e) {
      console.log(`[Register]: `, e);
      message = `[Error]: register ${e.message}`;
      _code = -1;
    }
    return {
      code: _code,
      message,
      ...data
    };
  }
);

const initialState = {
  user: null,
  token: "",
  deviceID: "",
  devices: [],
  maxDeviceNum: 0,
  subscriptionTimer: 0,
  isAuthenticated: false,
  isExpired: true,
  expiredAt: "",
  register: {
    email: "",
    code: "",
    password: "",
    password2: "",
    isAccept: false,
    isDisabled: false,
    timer: 0
  },
  login: {
    email: "",
    password: "",
    status: "idle"
  },
  forget: {
    email: "",
    code: "",
    password: "",
    timer: 0
  }
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logout(state, action) {
      state.user = null;
      state.isAuthenticated = false;
      state.isExpired = true;
      state.token = "";
    },
    toggleAccept(state, action) {
      state.register.isAccept = action.payload;
    },
    setRegisterEmail(state, action) {
      state.register.email = action.payload;
    },
    setRegisterCode(state, action) {
      state.register.code = action.payload;
    },

    setRegisterCodeDisabled(state, action) {
      state.register.isDisabled = action.payload;
    },

    setTimer(state, action) {
      state.register.timer = action.payload;
    },

    setPasswordForgetEmail(state, action) {
      state.forget.email = action.payload;
    },
    setPasswordForgetCode(state, action) {
      state.forget.code = action.payload;
    },

    setForgetPasswordTimer(state, action) {
      state.forget.timer = action.payload;
    },

    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setIsExpired(state, action) {
      state.isExpired = action.payload;
    },

    setToken(state, action) {
      state.token = action.payload;
    },
    setDeviceID(state, action) {
      state.deviceID = action.payload;
    },
    setDevices(state, action) {
      state.devices = action.payload;
    },
    setMaxDeviceNum(state, action) {
      state.maxDeviceNum = action.payload;
    },
    setSubscriptionTimer(state, action) {
      state.subscriptionTimer = action.payload;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(login.pending, (state, action) => {
        state.login.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(`[Success]: Fulfill login `, state, action);
        const statusCode = action.payload.statusCode;

        if (statusCode === 200) {
          state.user = action.payload.data.user;
          state.token = action.payload.data.token;
          state.maxDeviceNum = action.payload.data?.member?.amount;
          state.isExpired = action.payload.data?.member?.isExpired;
          state.expiredAt = action.payload.data?.member?.expiredAt;
        } else if (statusCode === 400) {
          console.log(`[Login Reducer]: 登录出现问题！`);
        }
        state.login.status = "idle";
      })
      .addCase(login.rejected, (state, action) => {
        state.login.status = "error";
        state.error = `There was a problem getting your login!`;
      })
      .addCase(verifyToken.pending, (state, action) => {
        console.log(`[Verify Token]: `);
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        console.log(`[Success]: Verify Token `, state, action);
        const code = action.payload.code;
        const statusCode = action.payload.statusCode;

        if (code === 0) {
          console.log(`[action.payload]: `, action.payload);
          state.maxDeviceNum = action.payload.data?.member?.amount;
          state.isExpired = action.payload.data?.member?.isExpired;
          state.expiredAt = action.payload.data?.member?.expiredAt;
        } else if (statusCode === 400) {
          console.log(`[Login Reducer]: 登录出现问题！`);
        }
      })
      .addCase(verifyToken.rejected, (state, action) => {
        console.log(`[Rejected]: ...`);
      })
      .addCase(fetchDevices.pending, (state, action) => {
        console.log(`[fetchDevices]: `, "loading");
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        console.log(`[Success]: Fulfill getDevices `, state, action);
        const statusCode = action.payload.statusCode;

        if (statusCode === 200) {
          state.devices = action.payload.data?.devices;
          state.maxDeviceNum = action.payload.data?.member?.amount;
          state.isExpired = action.payload.data?.member?.isExpired;
          state.expiredAt = action.payload.data?.member?.expiredAt;
        } else if (statusCode === 400) {
          console.log(`[Login Reducer]: 登录出现问题！`);
        }
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        console.log(`[Logger]: `, `There was a problem getting your devices!`);
      })
});

export const {
  logout,
  toggleAccept,
  setRegisterEmail,
  setRegisterCode,
  setRegisterCodeDisabled,
  setTimer,
  setPasswordForgetEmail,
  setPasswordForgetCode,
  setForgetPasswordTimer,
  setIsAuthenticated,
  setIsExpired,
  setDeviceID,
  setDevices,
  setMaxDeviceNum,
  setSubscriptionTimer
} = accountSlice.actions;
export default accountSlice;

export const getUser = (state) => state.account.user;
export const getToken = (state) => state.account.token;
export const getDeviceID = (state) => state.account.deviceID;
export const getDevices = (state) => state.account.devices;
export const getIsAuthenticated = (state) => state.account.isAuthenticated;
export const getIsExpired = (state) => state.account.isExpired;
export const getExpiredAt = (state) => state.account.expiredAt;
export const getMaxDeviceNum = (state) => state.account.maxDeviceNum;
export const getSubscriptionTimer = (state) => state.account.subscriptionTimer;
