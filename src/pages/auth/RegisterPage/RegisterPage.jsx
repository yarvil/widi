import React from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import registerSchema from "../schemas/registerSchema";
import {
  PageWrapper,
  LogotypeWrapper,
  Title,
  ContainerForm,
  Form,
  Input,
  InputName,
  InputError,
  Label,
  Button,
  ButtonClose,
  Legend,
} from "../ui/AuthPage.styled";
import { Option, Select, DateWrapper } from "../ui/RegisterPage.styled";
import Logotype from "@/shared/assets/logo/logotype.svg?react";
import CloseIcon from "@/shared/assets/icons/x-icon.svg?react";
import { fetchPost } from "../../../api/client";
import { checkAuth, setUserEmail } from "@/app/store/authentication/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showStatusMessage } from "@/app/store/authentication/authThunk";
import { DAYS, MONTHS, YEARS } from "./dateConstants";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    validateField,
    setFieldTouched,
    values,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      birthDate: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        const user = {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email,
          birthDate: values.birthDate,
          password: values.password,
        };

        const response = await fetchPost(user, "api/auth/register");

        if (response.ok) {
          dispatch(
            showStatusMessage({
              message: "Реєстрація пройшла успішно!",
              type: "success",
            }),
          );
        }

        localStorage.setItem("token", response.token);

        await dispatch(checkAuth());

        dispatch(setUserEmail(values.email));
        navigate("/");
      } catch (error) {
        dispatch(
          showStatusMessage({
            error: error || "Помилка реєстрації",
            type: "error",
          }),
        );
      }
    },
  });

  useEffect(() => {
    if (values.birthDay && values.birthMonth && values.birthYear) {
      const day = values.birthDay.padStart(2, "0");
      const month = values.birthMonth.padStart(2, "0");
      const year = values.birthYear;
      const birthDate = `${day}.${month}.${year}`;
      setFieldValue("birthDate", birthDate);
      setFieldTouched("birthDate", true);
      validateField("birthDate");
    }
  }, [
    values.birthDay,
    values.birthMonth,
    values.birthYear,
    setFieldValue,
    setFieldTouched,
    validateField,
  ]);

  return (
    <>
      <PageWrapper>
        <LogotypeWrapper>
          <Logotype />
          <Title>Tereveni</Title>
        </LogotypeWrapper>
        <ContainerForm>
          <ButtonClose to="/auth">
            <CloseIcon />
          </ButtonClose>
          <Legend>Реєстрація</Legend>
          <Form onSubmit={handleSubmit}>
            <Label
              htmlFor="firstName"
              $isError={touched.firstName && errors.firstName}
            >
              <InputName>Ім`я</InputName>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                autoComplete="given-name"
                $isError={touched.firstName && errors.firstName}
                {...getFieldProps("firstName")}
              />
              {touched.firstName && <InputError>{errors.firstName}</InputError>}
            </Label>

            <Label
              htmlFor="lastName"
              $isError={touched.lastName && errors.lastName}
            >
              <InputName>Прізвище</InputName>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                autoComplete="family-name"
                $isError={touched.lastName && errors.lastName}
                {...getFieldProps("lastName")}
              />
              {touched.lastName && <InputError>{errors.lastName}</InputError>}
            </Label>

            <Label htmlFor="email" $isError={touched.email && errors.email}>
              <InputName>Електронна пошта</InputName>
              <Input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                $isError={touched.email && errors.email}
                {...getFieldProps("email")}
              />
              {touched.email && <InputError>{errors.email}</InputError>}
            </Label>

            <DateWrapper>
              <Label
                htmlFor="birthDay"
                $isError={touched.birthDay && errors.birthDay}
              >
                <InputName>Дата</InputName>
                <Select
                  name="birthDay"
                  id="birthDay"
                  $isError={touched.birthDay && errors.birthDay}
                  {...getFieldProps("birthDay")}
                >
                  {DAYS.map(({ value, nameElement, disabled }) => (
                    <Option key={value} value={value} disabled={disabled}>
                      {nameElement}
                    </Option>
                  ))}
                  )
                </Select>
              </Label>

              <Label
                htmlFor="birthMonth"
                $isError={touched.birthMonth && errors.birthMonth}
              >
                <InputName>Місяць</InputName>
                <Select
                  name="birthMonth"
                  id="birthMonth"
                  $isError={touched.birthMonth && errors.birthMonth}
                  {...getFieldProps("birthMonth")}
                >
                  {MONTHS.map(({ value, nameElement, disabled }) => (
                    <Option key={value} value={value} disabled={disabled}>
                      {nameElement}
                    </Option>
                  ))}
                </Select>
              </Label>

              <Label
                htmlFor="birthYear"
                $isError={touched.birthYear && errors.birthYear}
              >
                <InputName>Рік</InputName>
                <Select
                  name="birthYear"
                  id="birthYear"
                  $isError={touched.birthYear && errors.birthYear}
                  {...getFieldProps("birthYear")}
                >
                  {YEARS.map(({ value, nameElement, disabled }) => (
                    <Option key={value} value={value} disabled={disabled}>
                      {nameElement}
                    </Option>
                  ))}
                </Select>
              </Label>
            </DateWrapper>

            <Input
              type="text"
              name="birthDate"
              id="birthDate"
              $style="display: none;"
              value={values.birthDate}
              $isError={touched.birthDate && errors.birthDate}
              {...getFieldProps("birthDate")}
            />
            {touched.birthDate && <InputError>{errors.birthDate}</InputError>}

            <Label
              htmlFor="password"
              $isError={touched.password && errors.password}
            >
              <InputName>Пароль</InputName>
              <Input
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                $isError={touched.password && errors.password}
                {...getFieldProps("password")}
              />
              {touched.password && <InputError>{errors.password}</InputError>}
            </Label>

            <Label
              htmlFor="confirmPassword"
              $isError={touched.confirmPassword && errors.confirmPassword}
            >
              <InputName>Підтвердження паролю</InputName>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="new-password"
                $isError={touched.confirmPassword && errors.confirmPassword}
                {...getFieldProps("confirmPassword")}
              />
              {touched.confirmPassword && (
                <InputError>{errors.confirmPassword}</InputError>
              )}
            </Label>

            <Button $primary type="submit">
              Зареєструватися
            </Button>
          </Form>
        </ContainerForm>
      </PageWrapper>
    </>
  );
}

export default RegisterPage;
