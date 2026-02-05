import * as Yup from "yup";

const verificationSchema = Yup.object().shape({
  verificationCode: Yup.string().required("Обов'язкове поле!"),
});

export default verificationSchema;
