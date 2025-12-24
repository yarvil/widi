import * as Yup from "yup";

const signupSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Required!")
    .min(3, "Too Short! 3 symbols minimum")
    .max(15, "Too Long! 15 symbols maximum")
    .matches(/^[a-zA-Zа-яА-Я]+$/, "Only letters!"),
  lastName: Yup.string()
    .required("Required!")
    .min(3, "Too Short! 3 symbols minimum")
    .max(20, "Too Long! 20 symbols maximum")
    .matches(/^[a-zA-Zа-яА-Я]+$/, "Only letters!"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Required!")
    .min(3, "Too Short! 3 symbols minimum")
    .max(50, "Too Long! 50 symbols maximum")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
      "Invalid email address format"
    ),
  birthDate: Yup.date()
    .required("Required!")
    .min(new Date(1900, 0, 1), "Date must be at least 01.01.1900")
    .max(new Date(), "Date must be in the past"),
  password: Yup.string()
    .required("Required!")
    .min(8, "Too Short! 8 symbols minimum")
    .max(50, "Too Long! 50 symbols maximum"),
  confirmPassword: Yup.string()
    .required("Required!")
    .min(8, "Too Short! 8 symbols minimum")
    .max(50, "Too Long! 50 symbols maximum"),
});

export default signupSchema;
