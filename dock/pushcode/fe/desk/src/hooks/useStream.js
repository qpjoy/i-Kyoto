import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeviceID, setDeviceID } from "../features/Account/accountSlice";
import { getRoutes } from "../features/Tictok/tictokSlice";

const useStream = () => {
  // const [deviceID, setDeviceID] = useState("");
  const dispatch = useDispatch();
  const routes = useSelector(getRoutes);
  useEffect(() => {
    ipcRenderer.on("obs:setted-stream-setting", (event, arg) => {
      console.log(`[obs:setted-stream-setting]: `, arg);

      dispatch(setDeviceID(arg));
      // setDeviceID(arg);
    });
    return () => {
      ipcRenderer.off("ate:device-id", (event, arg) => {
        console.log(`[obs:setted-stream-setting]: off`, arg);
      });
    };
  }, []);
  return [deviceID];
};

export default useStream;
