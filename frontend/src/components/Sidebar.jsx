import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = () => {
    axios.get("http://localhost:4040/insta/logout", {
        withCredentials: true
    })
    .then((res) => {
      if (res.data.Success === true) {
        toast.success(res.data.message);
        navigate("/login");
      }
    })
    .catch((err) =>  {
        toast.error(err.response?.data?.message)
    });
  };

  const content = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Search", icon: <SearchIcon />, path: "/search" },
    { text: "Explore", icon: <ExploreIcon />, path: "/explore" },
    { text: "Message", icon: <MailOutlineIcon />, path: "/message" },
    { text: "Create", icon: <AddBoxIcon />, path: "/create" },
    { text: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
    { text: "Logout", icon: <LogoutIcon />, click: logout },
  ];
  return (
    <div className="w-1/3 md:w-1/5 xl:w-1/5 border-x border-gray-400 h-screen">
      <h3>Logo</h3>
      <ul className="p-3 flex flex-col gap-5 mt-10">
        {content.map((content, i) => {
          return (
            <div
              className="flex gap-4 hover:bg-gray-200 p-2 rounded cursor-pointer"
              key={i}
              onClick={content.click}
            >
              <li>{content.icon}</li>
              <li>{content.text}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
