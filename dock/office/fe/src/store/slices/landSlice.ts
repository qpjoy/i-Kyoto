import { create, type StateCreator } from "zustand";
import { produce } from "immer";
import { immer } from "zustand/middleware/immer";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { createSelectors } from "@/utils/createSelectors";
import { api } from "@/store/variables";

// const url = "https://your-api.com"; // replace with actual URL

export interface LandState {
  name: string;
  email: string;
  code: string;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  message: string | null;

  status: string | null;

  register: {
    email: string;
    code: string;
    password: string;
    password2: string;
    timer: number;
    status: string;
    isAccept: boolean;
  };

  login: {
    email: string;
    password: string;
  };

  forget: {
    email: string;
    code: string;
    password: string;
    status: string;
    password2: string;
    timer: number;
  };

  setName: (name: string) => void;
  setStatus: (status: string) => void;

  setRegisterIsAccept: (isAccept: boolean) => void;
  setRegisterEmail: (email: string) => void;
  setRegisterCode: (code: string) => void;
  setRegisterTimer: (timer: number) => void;
  setRegisterStatus: (status: string) => void;
  setRegisterPassword: (password: string) => void;
  setRegisterPassword2: (password: string) => void;

  setLoginEmail: (email: string) => void;
  setLoginPassword: (password: string) => void;

  setForgetTimer: (timer: number) => void;
  setForgetEmail: (email: string) => void;
  setForgetCode: (code: string) => void;
  setForgetPassword: (password: string) => void;
  setForgetPassword2: (password: string) => void;

  getForgetCode: ({}: { email: string }) => void;

  getRegisterCode: ({}: { email: string }) => void;
  registerWithEmail: ({}: any) => Promise<any>;
  loginWithEmail: ({ email, password }: any) => Promise<void>;
  sendForgotPasswordEmail: (deviceID: string) => Promise<void>;
  changePassword: ({ email, password, code }: any) => Promise<any>;

  logout: () => void;
}

export const createLandSlice: StateCreator<LandState, any, [], LandState> = (set, get) => ({
  name: "",
  email: "",
  code: "",
  token: null,
  isLoading: false,
  error: null,
  message: null,

  status: "login",
  register: {
    status: "",
    email: "",
    code: "",
    password: "",
    password2: "",
    timer: 0,
    isAccept: false
  },
  login: {
    email: "",
    password: ""
  },
  forget: {
    status: "",
    email: "",
    code: "",
    password: "",
    password2: "",
    timer: 0
  },

  setName: (name: string) => {
    set(
      produce((state) => {
        state.name = name;
      })
    );
  },

  setStatus: (status: string) => {
    set(
      produce((state) => {
        state.status = status;
      })
    );
  },

  setRegisterIsAccept: (status: boolean) => {
    set(
      produce((state) => {
        state.register.isAccept = status;
      })
    );
  },

  setRegisterStatus: (status: string) => {
    set(
      produce((state) => {
        state.register.status = status;
      })
    );
  },

  setRegisterEmail: (email: string) => {
    set(
      produce((state) => {
        state.register.email = email;
      })
    );
  },
  setRegisterCode: (code: string) => {
    set(
      produce((state) => {
        state.register.code = code;
      })
    );
  },
  setRegisterTimer: (timer: number) => {
    set(
      produce((state) => {
        state.register.timer = timer;
      })
    );
  },
  setRegisterPassword: (password: string) => {
    set(
      produce((state) => {
        state.register.password = password;
      })
    );
  },
  setRegisterPassword2: (password: string) => {
    set(
      produce((state) => {
        state.register.password2 = password;
      })
    );
  },

  setLoginEmail: (email: string) => {
    set(
      produce((state) => {
        state.login.email = email;
      })
    );
  },

  setLoginPassword: (password: string) => {
    set(
      produce((state) => {
        state.login.password = password;
      })
    );
  },

  setForgetTimer: (timer: number) => {
    set(
      produce((state) => {
        state.forget.timer = timer;
      })
    );
  },

  setForgetCode: (code: string) => {
    set(
      produce((state) => {
        state.forget.code = code;
      })
    );
  },

  setForgetEmail: (email: string) => {
    set(
      produce((state) => {
        state.forget.email = email;
      })
    );
  },

  setForgetPassword: (password: string) => {
    set(
      produce((state) => {
        state.forget.password = password;
      })
    );
  },

  setForgetPassword2: (password2: string) => {
    set(
      produce((state) => {
        state.forget.password2 = password2;
      })
    );
  },

  changePassword: async ({ email, password, code }: any) => {
    const params = {
      code,
      email,
      password
    };
    let message,
      _code = "";
    let data = {};
    try {
      const res = await fetch(`${api}/users/change-password`, {
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
  },

  getForgetCode: async ({ email }) => {
    // const state = thunkApi.getState();
    // const token = state.account.token;
    console.log(`[getForgetCode]: `, email);
    const params = {
      email
    };
    let msg,
      code = "";
    let data = {};

    try {
      const res = await fetch(`${api}/codes/forget`, {
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

      msg = "[Success]: Forget";
    } catch (e) {
      console.log(`[Get Forget Code]: error `, e);
    }
    return {
      code,
      msg,
      ...data
    };
  },

  getRegisterCode: async ({ email }) => {
    // const state = thunkApi.getState();
    // const token = state.account.token;
    console.log(`[getRegisterCode]: `, email);
    const params = {
      email
    };
    let message,
      code = "";
    let data = {};

    try {
      const res = await fetch(`${api}/codes/send`, {
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
  },

  registerWithEmail: async ({ email, password, code }: any) => {
    console.log(`[Register]: params `, email, password, code);
    const params = {
      code,
      email,
      password
    };
    let message,
      _code: any = -1;
    let data: any = {};
    try {
      const res = await fetch(`${api}/users/email-register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(params)
      });
      data = await res.json();
      console.log("[Register]: data", data);

      if (data.code === 0) {
        if (!data.data.verified) {
          message = data.data.message;
          _code = -1;
        } else {
          message = "注册成功";
          _code = 0;
        }
      }
    } catch (e: any) {
      console.log(`[Register]: `, e);
      message = `[Error]: register ${e.message}`;
      _code = -1;
    }
    return {
      code: _code,
      message,
      ...data
    };
  },

  loginWithEmail: async ({ email, password }: any) => {
    // const email = get().email;

    set(
      produce((state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
    );
    let _data: any = null;

    try {
      const res = await fetch(`${api}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      _data = await res.json();
      console.log(`[login with email res]: `, _data);

      set(
        produce((state) => {
          state.token = _data.token ?? null;
          state.message = _data.message ?? "Logged in";
        })
      );
    } catch (err: any) {
      set(
        produce((state) => {
          state.error = err.message ?? "Login failed";
        })
      );
    } finally {
      set(
        produce((state) => {
          state.isLoading = false;
        })
      );
      return _data;
    }
  },

  sendForgotPasswordEmail: async (deviceID: string) => {
    const email = get().email;

    set(
      produce((state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
    );

    try {
      const res = await fetch(`${api}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, deviceID })
      });

      const data = await res.json();

      set(
        produce((state) => {
          state.message = data.message ?? "Reset email sent";
        })
      );
    } catch (err: any) {
      set(
        produce((state) => {
          state.error = err.message ?? "Reset failed";
        })
      );
    } finally {
      set(
        produce((state) => {
          state.isLoading = false;
        })
      );
    }
  },

  logout: () => {
    set(
      produce((state) => {
        (state.name = ""),
          (state.email = ""),
          (state.code = ""),
          (state.token = null),
          (state.isLoading = false),
          (state.error = null),
          (state.message = null),
          (state.status = "login"),
          (state.register = {
            status: "",
            email: "",
            code: "",
            password: "",
            password2: "",
            timer: 0,
            isAccept: false
          }),
          (state.login = {
            email: "",
            password: ""
          }),
          (state.forget = {
            status: "",
            email: "",
            code: "",
            password: "",
            password2: "",
            timer: 0
          });
      })
    );
  }
});

export const useLandStore = createSelectors(
  create<LandState>()(
    immer(
      devtools(subscribeWithSelector(persist(createLandSlice, { name: "land store" })), {
        enabled: true,
        name: "land store"
      })
    )
  )
);
