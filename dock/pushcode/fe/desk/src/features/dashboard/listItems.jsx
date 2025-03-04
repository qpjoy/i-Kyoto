import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";

import Person from "@/assets/img/person.circle.fill.svg";
import Douyin from "@/assets/img/douyin.svg";
import Members from "@/assets/img/arrow.up.circle.fill.svg";
import Message from "@/assets/img/plus.bubble.fill.svg";
import Help from "@/assets/img/doc.text.fill.svg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        {/* <DashboardIcon /> */}
        {/* <Person className="" /> */}
        <img className="m-auto" src={Person} alt="Person" />
      </ListItemIcon>
      <ListItemText primary="个人账户" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        {/* <ShoppingCartIcon /> */}
        <img className="m-auto" src={Douyin} alt="Douyin" />
      </ListItemIcon>
      <ListItemText primary="TikTok 服务" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        {/* <PeopleIcon /> */}
        <img className="m-auto" src={Members} alt="Members" />
      </ListItemIcon>
      <ListItemText primary="会员中心" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        {/* <BarChartIcon /> */}
        <img className="m-auto" src={Message} alt="Message" />
      </ListItemIcon>
      <ListItemText primary="消息通知" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        {/* <LayersIcon /> */}
        <img className="m-auto" src={Help} alt="Help" />
      </ListItemIcon>
      <ListItemText primary="帮助教程" />
    </ListItemButton>
  </React.Fragment>
);

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
