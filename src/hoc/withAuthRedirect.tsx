import React from "react";

import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {Redirect} from "react-router-dom";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});

type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {

}


export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
       const {isAuth, ...restProps} = props

        if (!props.isAuth) return <Redirect to={"/login"}/>

        return <WrappedComponent{...restProps as WCP}/>
    }

    let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>
        (mapStateToPropsForRedirect)
    (RedirectComponent)

    return ConnectedAuthRedirectComponent;
}