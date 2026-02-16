import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { updatePostThunk } from "@/app/store/posts/postsSlice";
import { uploadPostImage } from "@/api/upload";
import RemoveIcon from "shared/assets/icons/x-icon.svg?react";
import MediaIcon from "shared/assets/icons/media-icon.svg?react";
import {
  ActionButton,
  IconWrapper,
} from "@/shared/assets/components/post/Actions/Actions.styled";
import {
  CloseButton,
  Content,
  Header,
  MediaActions,
  MediaWrapper,
  Modal,
  Overlay,
  SaveButton,
  TextArea,
  Title,
} from "./EditPostModal.styled";

function EditPostModal({ post, onClose }) {
  const [text, setText] = useState(post.text);
  const [media, setMedia] = useState(null);
  const [currentImage, setCurrentImage] = useState(post.media);
  const [saving, setSaving] = useState(false);

  const dispatch = useDispatch();
  const textAreaRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMedia({ file, preview: URL.createObjectURL(file) });
    setCurrentImage(null);
  };

  const handleRemoveMedia = () => {
    setMedia(null);
    setCurrentImage(null);
  };

  const hasChanges = () => {
    if (text !== post.text) return true;
    if (media) return true;
    if (currentImage !== post.media) return true;
    return false;
  };

  const handleSave = async () => {
    if (!text.trim() || !hasChanges()) return;

    setSaving(true);
    try {
      let imageUrl = currentImage;

      if (media?.file) {
        imageUrl = await uploadPostImage(media.file);
      }

      await dispatch(
        updatePostThunk({
          postId: post.postId,
          content: text,
          imageUrl: imageUrl || undefined,
        }),
      ).unwrap();
      onClose();
    } catch (err) {
      console.error("Failed to update post:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const displayImage = media?.preview || currentImage;

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <Header>
          <CloseButton onClick={onClose}>
            <RemoveIcon />
          </CloseButton>
          <Title>Edit post</Title>
          <SaveButton
            onClick={handleSave}
            disabled={!text.trim() || !hasChanges() || saving}
          >
            {saving ? "Saving..." : "Save"}
          </SaveButton>
        </Header>
        <Content>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleMediaUpload}
          />
          <TextArea
            ref={textAreaRef}
            value={text}
            onChange={handleChange}
            maxLength={280}
          />

          {displayImage && (
            <MediaWrapper>
              <img
                src={displayImage}
                style={{ maxWidth: "100%", padding: "20px" }}
                alt="Post media"
              />
              <ActionButton
                type="button"
                $closeMedia
                onClick={handleRemoveMedia}
              >
                <IconWrapper>
                  <RemoveIcon />
                </IconWrapper>
              </ActionButton>
            </MediaWrapper>
          )}

          <MediaActions>
            <ActionButton
              type="button"
              onClick={() => fileInputRef.current.click()}
              $action="media"
              disabled={saving}
            >
              <IconWrapper>
                <MediaIcon />
              </IconWrapper>
            </ActionButton>
          </MediaActions>
        </Content>
      </Modal>
    </Overlay>
  );
}

EditPostModal.propTypes = {
  post: PropTypes.shape({
    postId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    media: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditPostModal;
