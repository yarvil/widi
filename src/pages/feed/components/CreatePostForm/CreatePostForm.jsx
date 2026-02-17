import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  createPostThunk,
  createCommentThunk,
} from "@/app/store/posts/postsSlice";
import { selectCurrentUser } from "@/app/store/authentication/authSelectors";
import { uploadPostImage } from "@/api/upload";
import Avatar from "@/shared/ui/Avatar/Avatar";
import RemoveIcon from "shared/assets/icons/x-icon.svg?react";
import MediaIcon from "shared/assets/icons/media-icon.svg?react";
import {
  ActionButton,
  IconWrapper,
} from "@/shared/components/post/Actions/Actions.styled";
import {
  FormWrapper,
  Content,
  TextArea,
  Actions,
  Button,
  FormContainer,
  ReplyingText,
  RightAction,
  CharCounter,
  MediaWrapper,
} from "./CreatePostForm.styled";

function CreatePostForm({ parentId = null, isReply = false, username }) {
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

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

  const initials = currentUser
    ? `${currentUser.firstName?.[0] || ""}${currentUser.lastName?.[0] || ""}`.trim() ||
      "?"
    : "?";

  return (
    <FormWrapper $isReply={isReply}>
      {isReply && isExpanded && (
        <ReplyingText>
          Replying to
          <span> @{username}</span>
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
        <Avatar
          src={currentUser?.avatarUrl}
          alt={currentUser?.firstName}
          initials={initials}
          size={50}
          linkTo={`/users/${currentUser?.id}`}
        />
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
            <MediaWrapper>
              <img src={media.preview} />
              <ActionButton
                $closeMedia
                type="button"
                onClick={() => setMedia(null)}
              >
                <IconWrapper>
                  <RemoveIcon />
                </IconWrapper>
              </ActionButton>
            </MediaWrapper>
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
