import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  createPostThunk,
  createCommentThunk,
} from "@/app/store/posts/postsSlice";
import { selectCurrentUser } from "@/app/store/authentication/authSelectors";
import { uploadPostImage } from "@/api/upload";
import { setNewNotification } from "@/app/store/notifications/notificationsSlice";
import RemoveIcon from "shared/assets/icons/x-icon.svg?react";
import MediaIcon from "shared/assets/icons/media-icon.svg?react";
import {
  ActionButton,
  IconWrapper,
} from "@/shared/assets/components/post/Actions/Actions.styled";
import {
  FormWrapper,
  Avatar,
  Content,
  TextArea,
  Actions,
  Button,
  FormContainer,
  AvatarWrapper,
  ReplyingText,
  RightAction,
  CharCounter,
} from "./CreatePostForm.styled";

function CreatePostForm({ parentId = null, isReply = false, username }) {
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const textAreaRef = useRef(null);
  const fileInputRef = useRef(null);
  const currentUser = useSelector(selectCurrentUser);

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

  const handleFocus = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || !currentUser) return;

    if (parentId) {
      dispatch(
        createCommentThunk({
          postId: parentId,
          userId: currentUser.id,
          content: text,
        }),
      );
    } else {
      setUploading(true);
      try {
        let imageUrl = null;
        if (media?.file) {
          imageUrl = await uploadPostImage(media.file);
        }
        dispatch(createPostThunk({ content: text, imageUrl }));
        dispatch(setNewNotification());
      } catch (err) {
        console.error("Upload failed:", err);
      } finally {
        setUploading(false);
      }
    }

    setText("");
    setMedia(null);
    setIsExpanded(false);
    textAreaRef.current.style.height = "auto";
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <FormWrapper $isReply={isReply}>
      {isReply && isExpanded && (
        <ReplyingText>
          Replying to
          <span style={{ color: "rgb(29, 155, 240)" }}> @{username}</span>
        </ReplyingText>
      )}
      <FormContainer onSubmit={handleSubmit}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleMediaUpload}
        />
        {currentUser && (
          <AvatarWrapper>
            <Avatar src={currentUser.avatarUrl} />
          </AvatarWrapper>
        )}
        <Content>
          <TextArea
            ref={textAreaRef}
            value={text}
            onChange={handleChange}
            onFocus={handleFocus}
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
          {(isExpanded || !isReply) && (
            <Actions $isExpanded={isExpanded} $isReply={isReply}>
              {!isReply && (
                <ActionButton
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  $action="media"
                  disabled={uploading}
                >
                  <IconWrapper>
                    <MediaIcon />
                  </IconWrapper>
                </ActionButton>
              )}
              <RightAction>
                {isExpanded && (
                  <CharCounter $warning={text.length > 260}>
                    {text.length > 0 && `${text.length}/280`}
                  </CharCounter>
                )}
                <Button type="submit" disabled={!text.trim() || uploading}>
                  {uploading ? "Uploading..." : isReply ? "Reply" : "Post"}
                </Button>
              </RightAction>
            </Actions>
          )}
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
