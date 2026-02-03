import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  createPostThunk,
  createCommentThunk,
} from "@/app/store/posts/postsSlice";
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
  const currentUser = useSelector((state) => state.user.currentUser);

  const placeholder = isReply ? "Post your reply" : "What's happening?";

  const handleChange = (e) => {
    const element = e.target;
    setText(element.value);
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMedia({ file, preview: URL.createObjectURL(file) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !currentUser) return;

    if (isReply && parentId) {
      dispatch(
        createCommentThunk({
          postId: parentId,
          userId: currentUser.id,
          content: text,
        }),
      );
    } else {
      dispatch(
        createPostThunk({
          content: text,
          imageUrl: media?.preview || null,
        }),
      );
    }

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
          <span style={{ color: "rgb(29, 155, 240)" }}> @{username}</span>
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
        <Avatar src={currentUser?.avatarUrl || ""} />
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
              onClick={() => fileInputRef.current.click()}
              $action="media"
            >
              <IconWrapper>
                <MediaIcon />
              </IconWrapper>
            </ActionButton>
            <Button type="submit" disabled={!text.trim()}>
              {isReply ? "Reply" : "Post"}
            </Button>
          </Actions>
        </Content>
      </FormContainer>
    </FormWrapper>
  );
}

CreatePostForm.propTypes = {
  parentId: PropTypes.string,
  isReply: PropTypes.bool,
  username: PropTypes.string,
};

export default CreatePostForm;
