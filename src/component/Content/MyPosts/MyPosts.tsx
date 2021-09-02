import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../../utils/validators/validators";
import {fieldCreator, GetStringKeys, Input} from "../../common/FormsControls/FormsControl";
import {PostType} from "../../../types/types";

export type MapPropsTypeMyPosts = {
    posts: Array<PostType>

}
export type DispatchPropsTypeMyPosts = {
    addPost: (newPostText: string) => void

}

const MyPosts: React.FC<MapPropsTypeMyPosts & DispatchPropsTypeMyPosts> = props => {

    let postsElements =
        [...props.posts]
            .reverse()
            .map(p => <Post key={p.id} massage={p.message} likeCounter={p.likeCounter}/>);

    let onAddPost = (values: AddFormValuesType) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            MyPosts
            <AddNewPostForm onSubmit={onAddPost}/>
            {/*<AddPostForm onSubmit={onAddPost}/>*/}

            <div className={s.posts}>
                {postsElements}

                {/*{props.likeCounter}*/}
            </div>
        </div>
    );
};


const MyPostsMemorized = React.memo(MyPosts);

type  PropsType = {}
type AddFormValuesType = {
    newPostText: string
}
type addPostFormValuesTypeKeys = GetStringKeys<AddFormValuesType>

const AddPostForm: React.FC<InjectedFormProps<AddFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {fieldCreator<addPostFormValuesTypeKeys>("Enter", "newPostText", Input, [required])}
            </div>
            <div>
                <button> ADD POST</button>
            </div>
        </form>
    )
}
const AddNewPostForm = reduxForm<AddFormValuesType, PropsType>({
    form: "ProfileAddNewPostForm"
})(AddPostForm)
export default MyPostsMemorized;
