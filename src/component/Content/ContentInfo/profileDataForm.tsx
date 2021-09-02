import React from "react";
import {fieldCreator, GetStringKeys, Input, Textarea} from "../../common/FormsControls/FormsControl";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from "../Content.module.css";
import styles from "../../common/FormsControls/FormsControl.module.css";
import {ProfileType} from "../../../types/types";

type PropsType = {

    profile: ProfileType

}
type ProfileTypeKeys = GetStringKeys<ProfileType>
    


const ProfileDataForm:React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit,profile,error}) => {
    return <form onSubmit={handleSubmit}>

        <div><button > save </button></div>
        {error && <div className={styles.formSummaryError}>
            {error}
        </div>}
        <div>
            <b>Full name: </b>
            {fieldCreator<ProfileTypeKeys>("Full name", "fullName", Input, [])}
        </div>
        <div>
            <b>looking for a job: </b>
            {fieldCreator<ProfileTypeKeys>(" ", "lookingForAJob", Input, [],{type: "checkbox"} )}
        </div>

        <div>
            my professional skills:
            {fieldCreator<ProfileTypeKeys>(" my professional skills", "lookingForAJobDescription", Textarea, [] )}
        </div>

        <div>
            <b>about me: </b>
            {fieldCreator<ProfileTypeKeys>("about me", "aboutMe", Textarea, [] )}
        </div>
        <div>
            <b>contacts: </b> {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                <b>{key}:</b>
                {fieldCreator(key, "contacts."+key, Input, [])}

            </div>
        })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({
    form: 'edit-profile'
})(ProfileDataForm)

export default ProfileDataFormReduxForm