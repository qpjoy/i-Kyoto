import React, { useEffect, useState } from "react";

import { shell } from "electron";

import "./Help.css";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchHelpers, getHelpers } from "./helpSlice";
import { useSnackbar } from "notistack";

const Help = () => {
  const helps = useSelector(getHelpers);
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const res = await dispatch(fetchHelpers({})).unwrap();
      console.log(`[res]: `, res);
      if (res.code === 0) {
        // setHelps(res.data);
        console.log(`[helps]: `, res.data);
      } else {
        // enqueueSnackbar("帮助教程出现问题", {
        //   variant: "warning",
        //   vertical: "top",
        //   horizontal: "center",
        // });
      }
    })();
  }, []);

  const handleOpenLink = (e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        justifyContent: "center"

        // height: "100%",
        // width: "100%",
        // padding: "0 2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20rem"
        }}
      >
        {helps.map((help, idx) => {
          return (
            <Box
              key={`help-${idx}`}
              sx={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%"
              }}
            >
              <Typography
                component="h6"
                variant="h6"
                color="inherit"
                noWrap
                sx={{
                  // float: "left",
                  fontSize: "1.25rem",
                  // color: "var(--color-content)",
                  lineBreak: "anywhere",
                  textWrap: "wrap",
                  marginBottom: "1rem"
                }}
              >
                {help.name}
              </Typography>

              <Typography
                sx={{
                  // float: "left",
                  // fontSize: "22px",
                  fontSize: "18px",
                  color: "var(--color-button)",
                  lineBreak: "anywhere",
                  textWrap: "wrap",
                  marginBottom: "1rem",
                  ":hover": {
                    textDecoration: "underline",
                    cursor: "pointer"
                  }
                }}
                onClick={(e) => handleOpenLink(e, help.url)}
              >
                {help.url}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Help;
