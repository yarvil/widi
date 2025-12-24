import * as Yup from "yup";

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Required!")
    .min(8, "Too Short! 8 symbols minimum")
    .max(50, "Too Long! 50 symbols maximum"),
  confirmPassword: Yup.string()
    .required("Required!")
    .min(8, "Too Short! 8 symbols minimum")
    .max(50, "Too Long! 50 symbols maximum"),
});

export default resetPasswordSchema;
