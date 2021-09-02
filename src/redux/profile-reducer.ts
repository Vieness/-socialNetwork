import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api";
import {BaseThunkType, InferActionsType} from "./redux-store";


let initialState = {
    posts: [
        {id: 1, message: 'hi how are you', likeCounter: 20},
        {id: 2, message: 'its my first post', likeCounter: 230}
    ] as Array<PostType>,

    profile: null as ProfileType | null,
    status: '',

}
export type initialStateTypo = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType|FormAction>

const profileReducer = (state = initialState, action: any): initialStateTypo => {
    switch (action.type) {
        case 'ADD_POST': {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likeCounter: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }

        case 'SET_SUER_PROFILE': {
            return {
                ...state, profile: action.profile
            }
        }
        case 'SET_STATUS': {
            return {
                ...state, status: action.status
            }
        }
        case 'SET_SAVE_PHOTO': {
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state;

    }
}
export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'ADD_POST', newPostText} as const),
    setUserContent: (profile: ProfileType) => ({type: 'SET_SUER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SET_SAVE_PHOTO', photos} as const)
}


export const getUserContent = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserContent(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data));
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status));
        }
    } catch (error) {
        //error
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);

    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
        if(userId!==null){
            dispatch(getUserContent(userId));
        }else {
            throw new Error("userId can't be null")
        }
    } else {
        dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer;