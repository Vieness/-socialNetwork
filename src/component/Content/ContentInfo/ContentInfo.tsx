import s from "../Content.module.css";
import React, {ChangeEvent, useState} from "react";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from '../../../accets/img/default_img_user.png'
import ProfileStatusWithHooks from "./ProfoleStatusWithHooks";
import ProfileDataForm from "./profileDataForm";
import {ContactsType, ProfileType} from "../../../types/types";


type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ContentInfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(() => {
            setEditMode(false);
        })

    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto} alt=""/>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                {editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }} profile={profile} isOwner={isOwner}/>}


                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>

    );
};
type ProfileDatePropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDatePropsType> = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}> edit</button>
        </div>}
        <div>
            <b>full name: </b> {profile.fullName}
        </div>
        <div>
            <b>looking for a job: </b>{profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJobDescription &&
        <div>
            <b>my professional skills:</b>{profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>about me: </b> {profile.aboutMe}
        </div>
        <div>
            <b>contacts: </b> {Object.keys(profile.contacts).map((key) => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
        })}
        </div>
    </div>
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}
export default ContentInfo;
