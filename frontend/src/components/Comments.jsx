import axios from "axios";
import React, { useEffect, useState } from "react";

const Comments = () => {
  const [formData, setFormData] = useState({
    text: "",
  });

  const inputHandler = (e) => {
    let { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // axios.post(`http://localhost:4040/insta/commentonpost/`, formData, {
    //   withCredentials: true,
    // });
    console.log(formData);
    setFormData({
      text: "",
    });
  };

  useEffect(() => {
axios.get(`http://localhost:4040/insta/allcomments/`)
  }, [])
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          name="text"
          value={formData.text}
          onChange={inputHandler}
          placeholder="Add comment..."
          className="w-full outline-none px-2 py-2"
        />
      </form>
    </div>
  );
};

export default Comments;
