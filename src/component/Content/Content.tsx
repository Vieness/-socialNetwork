import React from "react";
import ContentInfo from "./ContentInfo/ContentInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/types";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const Content: React.FC<PropsType> = (props) => {

    return (
        <div>
            <ContentInfo savePhoto={props.savePhoto}
                         profile={props.profile}
                         isOwner={props.isOwner}
                         status={props.status}
                         saveProfile={props.saveProfile}
                         updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    );
};
export default Content;
