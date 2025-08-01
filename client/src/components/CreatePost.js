import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import commonButtonStyles from "../styles/buttonStyles";



const CreatePost = () => {
  const navigate = useNavigate();
  return (
    <Button
  variant="outlined"
  size="medium"
  onClick={() => navigate("/posts/create")}
  sx={{
    gap: "0.4rem",
    whiteSpace: "nowrap",
    ...commonButtonStyles,
  }}
>
  <AiOutlinePlus style={{ flexShrink: 0 }} />
  <span>New Post</span>
</Button>

  );
};

export default CreatePost;
