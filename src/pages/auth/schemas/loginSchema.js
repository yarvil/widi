import * as Yup from "yup";
const RFC5322_EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Невірна електронна адреса")
    .required("Обов'язкове поле!")
    .min(5, "Мінімум 5 символи")
    .max(100, "Максимум 100 символів")
    .matches(RFC5322_EMAIL_PATTERN, "Невірний формат електронної адреси"),
  password: Yup.string()
    .required("Обов'язкове поле!")
    .min(1, "Введіть пароль")
    .max(100, "Максимум 100 символів"),
});

export default loginSchema;
