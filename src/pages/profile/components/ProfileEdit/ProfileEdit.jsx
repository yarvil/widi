import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

import { updateUserProfileThunk } from "@/app/store/users/usersSlice";
import { uploadAvatar, uploadBackground } from "@/api/users";

import PageHeader from "@/shared/ui/PageHeader/PageHeader";
import { Input } from "@/pages/auth/ui/AuthPage.styled";
import {
  EditContainer,
  HeaderImageWrapper,
  HeaderImage,
  HeaderImageOverlay,
  AvatarWrapper,
  Avatar,
  AvatarOverlay,
  FormContainer,
  FormGroup,
  Label,
  InputWrapper,
  ButtonGroup,
  CancelButton,
  SaveButton,
  FileInput,
  BioTextarea,
  AvatarInitials,
} from "./ProfileEdit.styled";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters")
    .required("First name is required")
    .matches(
      /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]+$/,
      "First name can only contain letters, spaces, hyphens, and apostrophes",
    ),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters")
    .required("Last name is required")
    .matches(
      /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]+$/,
      "Last name can only contain letters, spaces, hyphens, and apostrophes",
    ),
  bio: Yup.string().max(160, "Bio must be at most 160 characters").nullable(),
});

export default function ProfileEdit({ profile, onCancel, onSave }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatarUrl);
  const [headerPreview, setHeaderPreview] = useState(profile.backgroundImg);
  const avatarInputRef = useRef(null);
  const headerInputRef = useRef(null);

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleHeaderChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setHeaderPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (values, { setFieldError }) => {
    setLoading(true);
    try {
      let avatarUrl = profile.avatarUrl;
      let backgroundImgUrl = profile.backgroundImg;

      if (avatarInputRef.current?.files[0]) {
        try {
          avatarUrl = await uploadAvatar(avatarInputRef.current.files[0]);
        } catch (error) {
          setFieldError("avatar", "Failed to upload avatar");
          setLoading(false);
          return;
        }
      }

      if (headerInputRef.current?.files[0]) {
        try {
          backgroundImgUrl = await uploadBackground(
            headerInputRef.current.files[0],
          );
        } catch (error) {
          setFieldError("header", "Failed to upload header image");
          setLoading(false);
          return;
        }
      }

      const updatedData = {
        firstName: values.firstName,
        lastName: values.lastName,
        avatarUrl,
        backgroundImgUrl,
      };

      if (values.bio && values.bio.trim()) {
        updatedData.bio = values.bio.trim();
      }

      await dispatch(updateUserProfileThunk(updatedData)).unwrap();
      onSave();
    } catch (error) {
      console.error("Failed to update profile", error);
      setFieldError("general", "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader variant="back" title="Edit profile" />
      <EditContainer>
        <Formik
          initialValues={{
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            bio: profile.bio || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <HeaderImageWrapper>
                <HeaderImage
                  $hasImage={!!headerPreview}
                  $imageUrl={headerPreview}
                />
                <HeaderImageOverlay>
                  <FileInput
                    type="file"
                    accept="image/*"
                    ref={headerInputRef}
                    onChange={handleHeaderChange}
                    id="header-input"
                  />
                  <Label htmlFor="header-input" as="label">
                    Change header photo
                  </Label>
                </HeaderImageOverlay>
              </HeaderImageWrapper>

              <AvatarWrapper>
                <Avatar $hasImage={!!avatarPreview} $imageUrl={avatarPreview}>
                  {!avatarPreview && (
                    <AvatarInitials>
                      {`${values.firstName?.[0] || ""}${values.lastName?.[0] || ""}`.trim() ||
                        "?"}
                    </AvatarInitials>
                  )}
                </Avatar>
                <AvatarOverlay>
                  <FileInput
                    type="file"
                    accept="image/*"
                    ref={avatarInputRef}
                    onChange={handleAvatarChange}
                    id="avatar-input"
                  />
                  <Label htmlFor="avatar-input" as="label">
                    Change profile photo
                  </Label>
                </AvatarOverlay>
              </AvatarWrapper>

              <FormContainer>
                <FormGroup>
                  <Label>First name</Label>
                  <InputWrapper>
                    <Input
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isError={touched.firstName && !!errors.firstName}
                      errorMessage={errors.firstName}
                    />
                  </InputWrapper>
                </FormGroup>

                <FormGroup>
                  <Label>Last name</Label>
                  <InputWrapper>
                    <Input
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isError={touched.lastName && !!errors.lastName}
                      errorMessage={errors.lastName}
                    />
                  </InputWrapper>
                </FormGroup>

                <FormGroup>
                  <Label>Bio</Label>
                  <InputWrapper>
                    <BioTextarea
                      name="bio"
                      value={values.bio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows="4"
                      $isError={touched.bio && !!errors.bio}
                    />
                    {touched.bio && errors.bio && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "14px",
                          marginTop: "4px",
                        }}
                      >
                        {errors.bio}
                      </div>
                    )}
                  </InputWrapper>
                </FormGroup>

                {errors.general && (
                  <div style={{ color: "red", marginBottom: "16px" }}>
                    {errors.general}
                  </div>
                )}

                <ButtonGroup>
                  <CancelButton type="button" onClick={onCancel}>
                    Cancel
                  </CancelButton>
                  <SaveButton type="submit" disabled={loading} $primary>
                    {loading ? "Saving..." : "Save"}
                  </SaveButton>
                </ButtonGroup>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </EditContainer>
    </>
  );
}

ProfileEdit.propTypes = {
  profile: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
