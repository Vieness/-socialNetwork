import React from "react"
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {InjectedFormProps, reduxForm} from "redux-form";
import {fieldCreator, Textarea} from "../common/FormsControls/FormsControl";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {InitialStateType} from "../../redux/dialogs-reducer";

type OwnPropsType = {
    messagesPage: InitialStateType
    sendMessage: (messageText: string) => void
}

export type NewMessageFormType = {
    newMessageBody: string
}


const maxLength50 = maxLengthCreator(50);
const Dialogs: React.FC<OwnPropsType> = (props) => {

    let state = props.messagesPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);

    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>);

    let addNewMessage = (values: NewMessageFormType) => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>

            </div>
            <AddMassageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}

type PropsType ={}
type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormType, string>
const AddMassageForm:React.FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {fieldCreator<NewMessageFormValuesKeysType>("Enter", "newMessageBody", Textarea, [required,maxLength50])}

            </div>

            <div>
                <button>SEND</button>
            </div>
        </form>
    )

}
const AddMassageFormRedux = reduxForm<NewMessageFormType>({
    form: "dialogAddMassageForm"
})(AddMassageForm)
export default Dialogs;
