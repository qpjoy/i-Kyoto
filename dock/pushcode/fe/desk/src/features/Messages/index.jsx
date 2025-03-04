import React, { useEffect } from "react";

import "./Messages.css";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, getMessages } from "./messageSlice";
import { useSnackbar } from "notistack";

const Messages = () => {
  const messages = useSelector(getMessages);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const fetchMoreMessages = async () => {
    return await dispatch(fetchMessages({})).unwrap();
  };

  const loadMore = async () => {
    const res = await fetchMoreMessages();
    if (res.code === 0) {
      enqueueSnackbar("已加载全部内容！");
    }
  };

  useEffect(() => {
    (async () => {
      const res = await fetchMoreMessages();
      console.log(`[res]: `, res);
      if (res.code === 0) {
        // setHelps(res.data);
        console.log(`[messages]: `, res.data);
      } else {
        // enqueueSnackbar("帮助教程出现问题", {
        //   variant: "warning",
        //   vertical: "top",
        //   horizontal: "center",
        // });
      }
    })();
  }, []);

  return (
    <Box
      className="message"
      sx={{
        position: "relative",
        display: "flex",
        // padding: "0 2rem",
        height: "100%",
        flexDirection: "column"
      }}
    >
      <List sx={{ width: "100%", padding: "0", bgcolor: "background.paper" }}>
        {messages?.length ? (
          messages?.map((message, index) => {
            return (
              <React.Fragment key={`message-${index}`}>
                <ListItem
                  sx={{
                    padding: "0"
                  }}
                  alignItems="flex-start"
                >
                  <Typography component="h6" variant="h6" color="inherit" noWrap sx={{ minWidth: "8rem" }}>
                    {message.time}
                  </Typography>

                  <ListItemText
                    // primary="Brunch this weekend?"
                    sx={{
                      fontSize: "24px",
                      color: `${
                        message.type === "success"
                          ? "var(--color-success)"
                          : message.type === "warning"
                            ? "var(--color-warning)"
                            : message.type === "error"
                              ? "var(--color-error)"
                              : message.type === "info"
                                ? "var(--color-info)"
                                : "var(--color-content)"
                      }`
                    }}
                  >
                    <React.Fragment>{message.content}</React.Fragment>
                  </ListItemText>
                </ListItem>
                {index !== messages?.length - 1 ? (
                  <Divider
                    sx={{
                      margin: "1rem 0"
                    }}
                    variant="full"
                    component="li"
                  />
                ) : null}
              </React.Fragment>
            );
          })
        ) : (
          <Typography
            sx={{
              float: "left",
              fontSize: "22px",
              color: "var(--color-content)",
              lineBreak: "anywhere",
              textWrap: "wrap",
              marginBottom: "1rem"
            }}
          >
            没有更多消息
          </Typography>
        )}

        {/* <Divider variant="full" component="li" /> */}
      </List>

      {/* <Box> */}

      {messages?.length ? (
        <Typography
          onClick={loadMore}
          sx={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            fontSize: "18px",
            color: "var(--color-button)",
            ":hover": {
              textDecoration: "underline",
              cursor: "pointer"
            }
          }}
          component="h6"
          variant="h6"
          noWrap
        >
          点击查看 更多消息
        </Typography>
      ) : null}

      {/* </Box> */}
    </Box>
  );
};

export default Messages;
