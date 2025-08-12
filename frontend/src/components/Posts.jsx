import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Comments from "./Comments";

const Posts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4040/insta/allposts", {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.post || []);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
      });
  }, []);

  return (
    <div className="min-h-screen w-2/5 mx-auto">
      {data.length > 0 ? (
        data.map((post) => (
          <div key={post._id} className="mb-10 border-b pb-4 ml-40">
            {/* Post Header */}
            <div className="flex gap-3 items-center pt-2">
              <img
                src={post.author.profilePic || "https://via.placeholder.com/40"}
                alt={post.author.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <h3 className="font-semibold">{post.author.name}</h3>
            </div>

            {/* Post Image */}
            <img
              src={post.image}
              alt={post.caption}
              className="w-full object-cover rounded"
            />

            {/* Action Icons */}
            <div className="flex justify-between px-2 py-2">
              <div className="flex gap-4">
                <FavoriteBorderIcon sx={{ fontSize: 28 }} className="cursor-pointer" />
                <ChatBubbleOutlineIcon sx={{ fontSize: 28 }} className="cursor-pointer" />
                <SendOutlinedIcon sx={{ fontSize: 28 }} className="cursor-pointer" />
              </div>
              <BookmarkBorderIcon sx={{ fontSize: 28 }} className="cursor-pointer" />
            </div>

            {/* Caption */}
            <div className="px-2">
              <p className="text-sm">
                <span className="font-semibold">{post.author.name}</span> {post.caption}
              </p>
            </div>
            <Comments />
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 mt-5">No posts found</div>
      )}
    </div>
  );
};

export default Posts;
