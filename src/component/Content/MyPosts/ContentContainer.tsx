import React from "react";
import Content from "../Content";
import {connect} from "react-redux";
import {getStatus, getUserContent, savePhoto, saveProfile, updateStatus} from "../../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../../redux/redux-store";
import {ProfileType} from "../../../types/types";

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserContent: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (text: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile:ProfileType) => Promise<any>
}
type PathParamsType = {
    userId: string
}



type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ContentContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
       if(!userId){
           console.error("ID Should be exists")
       }else {
           this.props.getUserContent(userId );
           this.props.getStatus(userId );
       }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps:PropsType, prevState:PropsType) {
        if (this.props.match.params.userId != prevProps.match.params.userId)
            this.refreshProfile();
    }



    render() {
        return (
            <div>
                <Content {...this.props}
                         isOwner={!this.props.match.params.userId}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                         savePhoto={this.props.savePhoto}
                />
            </div>
        );
    }
}


let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,

});


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserContent, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ContentContainer)
