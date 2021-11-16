import {FormAction} from "redux-form"
import {BaseThunkType, InferActionsType} from "./redux-store";
import {ChatApi, ChatMessageAPIType, StatusType} from "../api/chat-api";
import {Dispatch} from "redux";
import { v1 } from 'uuid'

type ChatMessageType = ChatMessageAPIType & {id:string}

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

export type initialStateType = typeof initialState;

type ActionsType = InferActionsType<typeof actions>

type ThunkType = BaseThunkType<ActionsType | FormAction>

const chatReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m=>({...m, id:v1()}))]
                    .filter((m, index,array) => index >= array.length - 100)
            }
        case 'STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state;
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({
        type: 'MESSAGES_RECEIVED', payload: {messages}
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'STATUS_CHANGED', payload: {status}
    } as const),
}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    ChatApi.start()
    ChatApi.subscribe('message-received', newMessageHandlerCreator(dispatch))
    ChatApi.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    ChatApi.unsubscribe('message-received', newMessageHandlerCreator(dispatch))
    ChatApi.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    ChatApi.stop()
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    ChatApi.sendMessage(message)
}

export default chatReducer;