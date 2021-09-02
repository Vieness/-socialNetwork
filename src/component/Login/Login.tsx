import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {fieldCreator, GetStringKeys, Input} from "../common/FormsControls/FormsControl";
import {required} from "../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";

import styles from "./../common/FormsControls/FormsControl.module.css";
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";

type LoginFormOwnProps = {
    captchaUrl: string | null
}


const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> =
    ({
         handleSubmit,
         error,
         captchaUrl
     }) => {
        return <div>
            <form action="" onSubmit={handleSubmit}>
                {fieldCreator<LoginFormValuesTypeKeys>("Email", "email", Input, [required])}
                {fieldCreator<LoginFormValuesTypeKeys>("Password", "password", Input, [required], {type: "password"})}
                {fieldCreator<LoginFormValuesTypeKeys>(undefined, "rememberMe", Input, [], {type: "checkbox"}, "remember me")}
                {/*<div>
                <Field placeholder={"Email"} name={"email"} type="text" component={Input}
                       validate={[required,]}/>
            </div>*/}
                {captchaUrl && <img src={captchaUrl} alt=""/>}
                {captchaUrl && fieldCreator("symbols from img", "captcha", Input, [required],)}
                {error && <div className={styles.formSummaryError}>
                    {error}
                </div>}
                <div>
                    <button>Login</button>
                </div>
            </form>
        </div>
    }

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm)

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

export const Login: React.FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch()
    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1> Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}

