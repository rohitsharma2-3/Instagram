import React, { useEffect, useState } from "react";
import axios from "axios";
import VerifiedIcon from "@mui/icons-material/Verified"; // example icon

const Suggestion = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4040/insta/suggestions", {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.users || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-1/4">
      <h2 className="text-sm flex justify-between pr-5 font-semibold">
        <span className="text-gray-400">Suggestions for you</span>
        <span className="cursor-pointer hover:underline">See All</span>
      </h2>

      {data.length > 0 ? (
        data.slice(4, 9).map((sug) => (
          <div
            key={sug._id}
            className="flex justify-between pr-10 mt-5 items-center"
          >
            <div className="flex gap-3 items-center">
              <img
                src={sug.profilePic}
                alt="ProfilePic"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="flex items-center gap-1">
                <h2 className="text-sm font-medium">{sug.name}</h2>
              </div>
            </div>
            <button className="text-blue-500 text-xs font-semibold hover:text-blue-600">
              Follow
            </button>
          </div>
        ))
      ) : (
        <div className="text-sm text-gray-400 mt-5">No Suggestions Yet</div>
      )}

      <p className="text-gray-400 text-xs mt-5 leading-5">
        About Help Press API Jobs Privacy Terms <br />
        Locations Language Meta Verified
      </p>
      <p className="text-gray-400 text-xs mt-5">
        © 2025 Instagram from Meta
      </p>
    </div>
  );
};

export default Suggestion;
