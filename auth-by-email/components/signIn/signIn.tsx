import React, {useState, useContext} from "react";
import {useFormik} from 'formik';
import {validationSchema} from "./validate";
import {BASE_URL} from "../../next.config";
import * as S from "./styles";
import axios from "axios";


export const SignIn = (props: { isAuth: boolean, setIsAuth: any }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [active, setActive] = useState(false);
    const [password, setPassword] = useState(false)
    const [isValidateOnChange, setIsValidateOnChange] = useState(false);
    const toggleIsVisible = () => setIsVisible(prev => !prev);
    const setLocalStorage = (email: string, accessToken: string, refreshToken: string) => {
        localStorage.setItem("email", email)
        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("refreshToken", refreshToken)
        props.setIsAuth(true)
    }
    const sendData = (email: string, password: string) => {
        axios.post('http://ec2-44-202-244-46.compute-1.amazonaws.com/api/v1/users/signIn', {email, password})
            .then((response) => {
                const {email, accessToken, refreshToken} = response.data
                if (email && accessToken && refreshToken) {
                    setLocalStorage(email, accessToken, refreshToken)
                } else {
                    alert(response.data.name)
                }
            })
            .catch((err) => console.log(err))
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        validateOnChange: isValidateOnChange,
        onSubmit: (values, {resetForm}) => {
            resetForm()
            sendData(formik.values.email, formik.values.password)
        },
        validate: () => {
            setIsValidateOnChange(true);
        }
    });
    return (
        <S.Content>
            <S.Form onSubmit={formik.handleSubmit}>
                <div>
                    <S.FormTitle> Sign In </ S.FormTitle>
                </div>
                <div style={{width: '100%'}}>
                    <div style={{width: '100%'}}>
                        <S.Input
                            type="email"
                            {...formik.getFieldProps("email")}
                            onFocus={() => {
                                setActive(true);
                            }}
                            onBlur={() => {
                                setActive(false);
                            }
                            }
                        />
                        <div style={{
                            pointerEvents: "none",
                            transform: `
        translateY(${active ? "-44px" : formik.values.email ? "-44px" : "-26px"})
        translateX(${active ? "8px" : formik.values.email ? "8px" : "15px"})`,
                            transition: "transform 150ms cubic-bezier(0.4,0,0.2,1),opacity 150ms cubic-bezier(0.4,0,0.2,1)",
                            backgroundColor: `${formik.values.email ? "none" : "white"}`,
                            padding: "0 5px",
                            width: "fit-content",
                            zIndex: 2,
                            fontSize: `${active ? "13px" : formik.values.email ? "13px" : "15px"}`,
                            color: `${active ? "blue" : "gray"}`,
                        }}>
                            Email
                        </div>
                        <S.ErrorLabel>{formik.errors.email}</S.ErrorLabel>
                    </div>
                    <S.Div>
                        <S.Input isError={Boolean(formik.errors.password)}
                                 type={isVisible ? "text" : "password"}  {...formik.getFieldProps("password")}
                                 onFocus={() => {
                                     setPassword(true);
                                 }}
                                 onBlur={() => {
                                     setPassword(false);
                                 }
                                 }/>
                        <div style={{
                            pointerEvents: "none",
                            transform: `
        translateY(${password ? "-44px" : formik.values.password ? "-44px" : "-26px"})
        translateX(${password ? "8px" : formik.values.password ? "8px" : "15px"})`,
                            transition: "transform 150ms cubic-bezier(0.4,0,0.2,1),opacity 150ms cubic-bezier(0.4,0,0.2,1)",
                            backgroundColor: `${formik.values.password ? "none" : "white"}`,
                            padding: "0 5px",
                            width: "fit-content",
                            zIndex: 2,
                            fontSize: `${password ? "13px" : formik.values.password ? "13px" : "15px"}`,
                            color: `${password ? "blue" : "gray"}`,
                        }}>
                            password
                        </div>
                        <S.ErrorLabel>{formik.errors.password}</S.ErrorLabel>
                        <S.Button
                            type="button"
                            onClick={toggleIsVisible}
                        >
                            {
                                isVisible ? <S.AView/> : <S.ANoView/>
                            }
                        </S.Button>
                    </S.Div>
                </div>
                <div>
                    <S.Svg xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 488 512">
                        <path
                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                    </S.Svg>
                    <S.Svg xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 512 512">
                        <path
                            d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
                    </S.Svg>
                </div>
                <S.SubmitButton type="submit">SignIn</S.SubmitButton>
            </S.Form>
        </S.Content>
    );
}
