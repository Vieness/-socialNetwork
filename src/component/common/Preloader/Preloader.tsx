import preloader from '../../../accets/img/isFetching.svg'
import React from "react";

type PropsType = {}

let Preloader:React.FC = () => {
    return <div>
        <img src={preloader}/>
    </div>


}
export default Preloader;
