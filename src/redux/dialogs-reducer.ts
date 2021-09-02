import {InferActionsType} from "./redux-store";

type MessageType = {
    id: number
    message: string
}

type DialogsType = {
    id: number
    name: string
}

let initialState = {
    messages: [
        {id: 1, message: 'HI'},
        {id: 2, message: 'How are you '},
        {id: 3, message: 'yo'},
        {id: 4, message: 'yo'},
        {id: 5, message: 'yo'}
    ] as Array<MessageType>,
    dialogs: [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Vano'},
        {id: 3, name: 'Yr'},
        {id: 4, name: 'Lexa'},
        {id: 5, name: 'Iga'}
    ] as Array<DialogsType>,
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SEND_MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            };
        default:
            return state;
    }
}

export const actions = {
    sendMessage: (newMessageBody: string) => ({type: 'SEND_MESSAGE', newMessageBody} as const)
}

export default dialogsReducer;