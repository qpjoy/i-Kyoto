import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AssignmentIcon from "@mui/icons-material/Assignment";
// import DashboardIcon from "@mui/icons-material/Dashboard";

import Person from "@/assets/img/person.circle.fill.svg";
import Douyin from "@/assets/img/douyin.svg";
import Members from "@/assets/img/arrow.up.circle.fill.svg";
import Message from "@/assets/img/plus.bubble.fill.svg";
import Help from "@/assets/img/doc.text.fill.svg";
import { Link, NavLink } from "react-router-dom";

import "./MainListItems.css";

export const MainListItems = React.memo(() => {
  const mainList = React.useMemo(
    () => [
      {
        icon: Person,
        text: "个人账户",
        url: "/app/account"
      },
      {
        icon: Douyin,
        text: "抖音服务",
        url: "/app/tictok"
      },
      {
        icon: Members,
        text: "会员中心",
        url: "/app/members"
      },
      {
        icon: Message,
        text: "消息通知",
        url: "/app/messages"
      },
      {
        icon: Help,
        text: "帮助教程",
        url: "/app/help"
      }
    ],
    []
  );
  return (
    <>
      {mainList.map((item, idx) => (
        <NavLink
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          to={item.url}
          key={`main_${idx}`}
        >
          <ListItemButton
            sx={{
              height: "70px"
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: "unset",
                marginRight: "25px"
              }}
            >
              <img
                className="m-auto"
                src={item.icon}
                alt={item.text}
                style={{
                  height: 32
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              //   primaryTypographyProps={{ fontSize: "20px" }}
            />
          </ListItemButton>
        </NavLink>
      ))}
    </>
  );
});

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
