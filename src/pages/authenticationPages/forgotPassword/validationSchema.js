import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required!")
    .min(3, "Too Short! 3 symbols minimum")
    .max(50, "Too Long! 50 symbols maximum")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
      "Invalid email address format"
    ),
});

export default validationSchema;
