import * as Yup from "yup";

const resetPasswordSchema = Yup.object().shape({
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

export default resetPasswordSchema;
