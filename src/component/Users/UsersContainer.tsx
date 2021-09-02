import React from 'react';
import {useSelector} from 'react-redux';

import Preloader from "../common/Preloader/Preloader";
import {getIsFetching} from "../../redux/selectors/user-selectors";
import {Users} from "./Users";


type UserPagePropsType = {}

export const UserPage: React.FC<UserPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)

    return (<>
            {isFetching ? <Preloader/> : null}
            <Users/>
        </>
    );
}



