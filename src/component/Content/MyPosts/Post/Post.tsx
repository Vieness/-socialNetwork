import React from "react";
import s from "./Post.module.css";

type PropsType = {
    massage: string
    likeCounter: number
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={s.item}>
            <img
                src="https://i.pinimg.com/originals/8b/6e/c6/8b6ec60427f9b17c1d9aaf4c415babe3.png"
                alt=""
            />
            {props.massage}
            <div>
                like {props.likeCounter}
            </div>
        </div>
    );
};
export default Post;
