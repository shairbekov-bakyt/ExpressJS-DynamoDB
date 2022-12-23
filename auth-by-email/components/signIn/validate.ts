import * as Yup from "yup";


export const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required("Это поле обязательно к заполнению")
        .email("Неверный формат email"),
    password: Yup.string()
        .required("Это поле обязательно к заполнению")
        .min(8, "Длина пароля не должна быть менее 10 символов")
        .matches(/\D+/, "Должен содержать хотя бы 1 букву")
        .matches(/\d+/, "Должен содержать хотя бы 1 цифру"),
});