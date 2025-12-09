import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import PropTypes from "prop-types";

import { createPost } from "@/app/store/posts/postsSlice";
import RemoveIcon from "shared/assets/icons/x-icon.svg?react";
import MediaIcon from "shared/assets/icons/media-icon.svg?react";
import { ActionButton, IconWrapper } from "shared/post/Actions/Actions.styled";
import {
  FormWrapper,
  Avatar,
  Content,
  TextArea,
  Actions,
  Button,
  FormContainer,
} from "./CreatePostForm.styled";

function CreatePostForm({ parentId = null, isReply = false, username }) {
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const dispatch = useDispatch();
  const textAreaRef = useRef(null);
  const fileInputRef = useRef(null);

  const placeholder = isReply ? "Post your reply" : "What's happening?";

  const handleChange = (e) => {
    const element = e.target;
    setText(element.value);

    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setMedia({
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      return;
    }
    const newPost = {
      postId: Date.now(),
      parentId: parentId,
      createdTime: Date.now(),
      username: "yarles",
      name: "Ярослав",
      avatar:
        "https://pbs.twimg.com/profile_images/1175026726155575296/QLVwDQYh_x96.jpg",
      text,
      media: media?.preview || null,
      replies: 0,
      likes: 0,
      reposts: 0,
      liked: false,
      reposted: false,
    };
    dispatch(createPost(newPost));

    setText("");
    setMedia(null);
    textAreaRef.current.style.height = "auto";
    fileInputRef.current.value = null;
  };

  return (
    <FormWrapper>
      {isReply && (
        <p
          style={{
            fontSize: "16px",
            color: "rgb(113, 118, 123)",
            marginLeft: "62px",
            marginBlock: "0",
          }}
        >
          Replying to
          <span style={{ color: " rgb(29, 155, 240)" }}> @{username}</span>
        </p>
      )}
      <FormContainer onSubmit={handleSubmit}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleMediaUpload}
        />
        <Avatar src="https://pbs.twimg.com/profile_images/1175026726155575296/QLVwDQYh_x96.jpg" />
        <Content>
          <TextArea
            ref={textAreaRef}
            value={text}
            onChange={handleChange}
            maxLength={280}
            placeholder={placeholder}
          />
          {media && (
            <div
              style={{
                position: "relative",
                marginBlock: "10px",
                borderRadius: "16px",
                border: "1px solid #2f3336",
                minHeight: "60px",
              }}
            >
              <img
                src={media.preview}
                style={{ maxWidth: "100%", padding: "20px" }}
              />
              <ActionButton
                type="button"
                style={{
                  position: "absolute",
                  color: "white",
                  top: 5,
                  right: 5,
                }}
                onClick={() => setMedia(null)}
              >
                <IconWrapper>
                  <RemoveIcon />
                </IconWrapper>
              </ActionButton>
            </div>
          )}
          <Actions>
            <ActionButton
              type="button"
              onClick={() => {
                fileInputRef.current.click();
              }}
              $action="media"
            >
              <IconWrapper>
                <MediaIcon />
              </IconWrapper>
            </ActionButton>
            <Button type="submit" disabled={!text.trim()}>
              Post
            </Button>
          </Actions>
        </Content>
      </FormContainer>
    </FormWrapper>
  );
}

CreatePostForm.propTypes = {
  parentId: PropTypes.number,
  isReply: PropTypes.bool,
  username: PropTypes.string,
};

export default CreatePostForm;
