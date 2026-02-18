import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import registerSchema from "../schemas/registerSchema";
import {
  ContainerForm,
  Form,
  Input,
  Label,
  Button,
  ButtonClose,
  Legend,
  Select,
  Option,
} from "../ui";
import { fetchPost } from "../sendRequest";
import { checkAuth, setUserEmail } from "@/app/store/authentication/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showStatusMessage } from "@/app/store/authentication/authThunk";
import { DAYS, MONTHS, YEARS } from "./dateConstants";

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: clamp(6px, 2vw, 12px);
`;

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
        const { ...user } = values;

        const response = await fetchPost(user, "api/auth/register");

        if (response.ok) {
          dispatch(
            showStatusMessage({
              message: "Реєстрація пройшла успішно!",
              type: "success",
            }),
          );
        }
        const currentUser = await dispatch(checkAuth());

        if (!currentUser.ok) {
          dispatch(
            showStatusMessage({
              message: "Помилка при отриманні даних користувача",
              type: "error",
            }),
          );
        }

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
  }, [values.birthDay, values.birthMonth, values.birthYear, setFieldValue]);

  return (
    <>
      <ContainerForm>
        <ButtonClose to="/auth" />
        <Legend>Реєстрація</Legend>
        <Form onSubmit={handleSubmit}>
          <Label
            htmlFor="firstName"
            text="Ім'я"
            isError={touched.firstName && errors.firstName}
          >
            <Input
              type="text"
              name="firstName"
              id="firstName"
              autoComplete="given-name"
              isError={touched.firstName && errors.firstName}
              errorMessage={errors.firstName}
              {...getFieldProps("firstName")}
            />
          </Label>
          <Label
            htmlFor="lastName"
            text="Прізвище"
            isError={touched.lastName && errors.lastName}
          >
            <Input
              type="text"
              name="lastName"
              id="lastName"
              autoComplete="family-name"
              isError={touched.lastName && errors.lastName}
              errorMessage={errors.lastName}
              {...getFieldProps("lastName")}
            />
          </Label>
          <Label
            htmlFor="email"
            text="Електронна пошта"
            isError={touched.email && errors.email}
          >
            <Input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              isError={touched.email && errors.email}
              errorMessage={errors.email}
              {...getFieldProps("email")}
            />
          </Label>

          <DateContainer>
            <Label
              htmlFor="birthDay"
              text="День"
              isError={touched.birthDay && errors.birthDay}
            >
              <Select
                name="birthDay"
                id="birthDay"
                isError={touched.birthDay && errors.birthDay}
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
              text="Місяць"
              isError={touched.birthMonth && errors.birthMonth}
            >
              <Select
                name="birthMonth"
                id="birthMonth"
                isError={touched.birthMonth && errors.birthMonth}
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
              text="Рік"
              isError={touched.birthYear && errors.birthYear}
            >
              <Select
                name="birthYear"
                id="birthYear"
                isError={touched.birthYear && errors.birthYear}
                {...getFieldProps("birthYear")}
              >
                {YEARS.map(({ value, nameElement, disabled }) => (
                  <Option key={value} value={value} disabled={disabled}>
                    {nameElement}
                  </Option>
                ))}
              </Select>
            </Label>
          </DateContainer>
          <Input
            type="text"
            name="birthDate"
            id="birthDate"
            $style="display: none;"
            value={values.birthDate}
            isError={touched.birthDate && errors.birthDate}
            errorMessage={errors.birthDate}
            {...getFieldProps("birthDate")}
          />
          <Label
            htmlFor="password"
            text="Пароль"
            isError={touched.password && errors.password}
          >
            <Input
              type="password"
              name="password"
              id="password"
              autoComplete="new-password"
              isError={touched.password && errors.password}
              errorMessage={errors.password}
              {...getFieldProps("password")}
            />
          </Label>
          <Label
            htmlFor="confirmPassword"
            text="Підтвердження паролю"
            isError={touched.confirmPassword && errors.confirmPassword}
          >
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="new-password"
              isError={touched.confirmPassword && errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              {...getFieldProps("confirmPassword")}
            />
          </Label>
          <Button $primary type="submit" $style="margin-top: 10px;">
            Зареєструватися
          </Button>
        </Form>
      </ContainerForm>
    </>
  );
}

export default RegisterPage;
