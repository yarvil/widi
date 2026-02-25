import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

import {
  updateUserProfileThunk,
  updateNickNameThunk,
} from "@/app/store/users/usersSlice";
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
  LabelRow,
  CharCounter,
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
    .min(2, "Ім'я має містити щонайменше 2 символи")
    .max(50, "Ім'я має містити не більше 50 символів")
    .required("Ім'я обов'язкове")
    .matches(
      /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]+$/,
      "Ім'я може містити лише літери, пробіли, дефіс та апостроф",
    ),
  lastName: Yup.string()
    .min(2, "Прізвище має містити щонайменше 2 символи")
    .max(50, "Прізвище має містити не більше 50 символів")
    .required("Прізвище обов'язкове")
    .matches(
      /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]+$/,
      "Прізвище може містити лише літери, пробіли, дефіс та апостроф",
    ),
  nickName: Yup.string()
    .min(3, "Нікнейм має містити від 3 до 20 символів")
    .max(20, "Нікнейм має містити від 3 до 20 символів")
    .required("Нікнейм обов'язковий")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Лише латинські літери (a-z, A-Z), цифри та _",
    ),
  aboutMe: Yup.string()
    .max(160, "Про себе — не більше 160 символів")
    .nullable(),
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
      const newNickName = values.nickName?.trim();
      if (newNickName && newNickName !== (profile.nickName || "").trim()) {
        try {
          await dispatch(updateNickNameThunk(newNickName)).unwrap();
        } catch (err) {
          if (err?.response?.status === 400) {
            setFieldError(
              "nickName",
              "Цей нікнейм вже зайнятий. Оберіть інший.",
            );
          } else {
            setFieldError(
              "nickName",
              "Не вдалося змінити нікнейм. Спробуйте ще раз.",
            );
          }
          setLoading(false);
          return;
        }
      }

      let avatarUrl = profile.avatarUrl;
      let backgroundImgUrl = profile.backgroundImg;

      if (avatarInputRef.current?.files[0]) {
        try {
          avatarUrl = await uploadAvatar(avatarInputRef.current.files[0]);
        } catch (error) {
          setFieldError("avatar", "Не вдалося завантажити аватар");
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
          setFieldError("header", "Не вдалося завантажити зображення обкладинки");
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

      if (values.aboutMe?.trim()) {
        updatedData.aboutMe = values.aboutMe.trim();
      } else {
        updatedData.aboutMe = values.aboutMe?.trim() ?? "";
      }

      await dispatch(updateUserProfileThunk(updatedData)).unwrap();
      onSave();
    } catch (error) {
      console.error("Failed to update profile", error);
      setFieldError("general", "Не вдалося оновити профіль. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader variant="back" title="Редагувати профіль" />
      <EditContainer>
        <Formik
          initialValues={{
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            nickName: profile.nickName || "",
            aboutMe: profile.aboutMe ?? profile.bio ?? "",
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
                    Змінити фото обкладинки
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
                    Змінити фото
                  </Label>
                </AvatarOverlay>
              </AvatarWrapper>

              <FormContainer>
                <FormGroup>
                  <Label>Ім'я</Label>
                  <InputWrapper>
                    <Input
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      $isError={touched.firstName && !!errors.firstName}
                      errorMessage={errors.firstName}
                    />
                  </InputWrapper>
                </FormGroup>

                <FormGroup>
                  <Label>Прізвище</Label>
                  <InputWrapper>
                    <Input
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      $isError={touched.lastName && !!errors.lastName}
                      errorMessage={errors.lastName}
                    />
                  </InputWrapper>
                </FormGroup>

                <FormGroup>
                  <Label>Нікнейм</Label>
                  <InputWrapper>
                    <Input
                      name="nickName"
                      value={values.nickName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      $isError={
                        (touched.nickName && !!errors.nickName) || !!errors.nickName
                      }
                      placeholder="Літери, цифри, _ (3–20 символів)"
                    />
                    {(touched.nickName && errors.nickName) || errors.nickName ? (
                      <div
                        style={{
                          color: "red",
                          fontSize: "14px",
                          marginTop: "4px",
                        }}
                      >
                        {errors.nickName}
                      </div>
                    ) : null}
                  </InputWrapper>
                </FormGroup>

                <FormGroup>
                  <LabelRow>
                    <Label as="span">Про себе</Label>
                    <CharCounter>
                      {(values.aboutMe?.length ?? 0)}/160
                    </CharCounter>
                  </LabelRow>
                  <InputWrapper>
                    <BioTextarea
                      name="aboutMe"
                      value={values.aboutMe}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows="4"
                      maxLength={160}
                      $isError={touched.aboutMe && !!errors.aboutMe}
                      placeholder="Коротка біографія (необов'язково)"
                    />
                    {touched.aboutMe && errors.aboutMe && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "14px",
                          marginTop: "4px",
                        }}
                      >
                        {errors.aboutMe}
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
                    Скасувати
                  </CancelButton>
                  <SaveButton type="submit" disabled={loading} $primary>
                    {loading ? "Збереження..." : "Зберегти"}
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
