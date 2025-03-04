import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeviceID, setDeviceID } from "../features/Account/accountSlice";

const useDeviceID = () => {
  // const [deviceID, setDeviceID] = useState("");
  const dispatch = useDispatch();
  const deviceID = useSelector(getDeviceID);
  useEffect(() => {
    ipcRenderer.on("ate:device-id", (event, arg) => {
      console.log(`[ate:device-id]: `, arg);

      dispatch(setDeviceID(arg));
      // setDeviceID(arg);
    });
    return () => {
      ipcRenderer.off("ate:device-id", (event, arg) => {
        console.log(`[ate:device-id]: off`, arg);
      });
    };
  }, []);
  return [deviceID];
};

export default useDeviceID;
