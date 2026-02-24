import * as Yup from "yup";
const RFC5322_EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required("Обов'язкове поле!")
    .min(3, "Мінімум 3 символи")
    .max(20, "Максимум 20 символів")
    .matches(
      /^\s*[A-Za-zА-Яа-яІіЇїЄєҐґ]+([ -][A-Za-zА-Яа-яІіЇїЄєҐґ]+)?\s*$/,
      "Тільки літери!",
    ),
  lastName: Yup.string()
    .trim()
    .required("Обов'язкове поле!")
    .min(3, "Мінімум 3 символи")
    .max(30, "Максимум 30 символів")
    .matches(
      /^\s*[A-Za-zА-Яа-яІіЇїЄєҐґ]+([ -][A-Za-zА-Яа-яІіЇїЄєҐґ]+)?\s*$/,
      "Тільки літери!",
    ),
  nickName: Yup.string()
    .trim()
    .notRequired()
    .matches(
      /^[A-Za-z0-9._-]*$/,
      "Нікнейм може містити лише латинські літери, цифри та символи . - _",
    ),
  email: Yup.string()
    .email("Невірна електронна адреса")
    .required("Обов'язкове поле!")
    .min(5, "Мінімум 5 символів")
    .max(100, "Максимум 100 символів")
    .matches(RFC5322_EMAIL_PATTERN, "Невірний формат електронної адреси"),
  birthDay: Yup.string().required("Обов'язкове поле!"),
  birthMonth: Yup.string().required("Обов'язкове поле!"),
  birthYear: Yup.string().required("Обов'язкове поле!"),
  birthDate: Yup.date()
    .nullable()
    .transform((value, originalValue) => {
      if (!originalValue) return null;
      if (typeof originalValue === "string") {
        const [day, month, year] = originalValue.split(".");

        if (day && month && year) return new Date(year, month - 1, day);
      }
      return value;
    }, "Введіть всі поля дати народження!")
    .max(new Date(), "Дата народження не може бути в майбутньому!"),
  password: Yup.string()
    .required("Обов'язкове поле!")
    .min(8, "Мінімум 8 символів")
    .max(100, "Максимум 100 символів")
    .matches(
      /^[A-Za-z\d!@#$%^&*()_+-]*$/,
      "Дозволені символи: A-Z a-z 0-9 ! @ # $ % ^ & * ( ) _ + -",
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Для безпечності пароль має містити: велику літеру, малу літеру, цифру",
    ),
  confirmPassword: Yup.string()
    .required("Обов'язкове поле!")
    .oneOf([Yup.ref("password")], "Паролі не співпадають"),
});

export default RegisterSchema;
