import React from "react";
import {Link} from "react-router-dom";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/selectors/auth-selectors";
import {logout} from "../../redux/auth-reducer";

export type MapPropsType = {}


export const Header: React.FC<MapPropsType> = (props) => {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch = useDispatch()

    const logoutCallBack = () => {
        dispatch(logout())
    }
    const {Header} = Layout;

    return (

        <Header className="header">
            <Row>

                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="9"><Link to="/users"> Users</Link></Menu.Item>
                    </Menu>
                </Col>
                {isAuth
                    ? <>
                        <Col span={1}>
                            <Avatar alt={login || ''} size={40} icon={<UserOutlined/>}/>
                        </Col>
                        <Col span={5}>
                            <Button onClick={logoutCallBack}>LogOut</Button>
                        </Col>
                    </>
                    : <Col span={6}>
                        <Button>
                            <Link to={'/login'}>Login</Link>
                        </Button>
                    </Col>}

            </Row>
        </Header>
        /* <header className={s.header}>
             <img
                 src="https://images.vexels.com/media/users/3/137707/isolated/preview/e4de2c0fef339f3ba3713a21cef10cbd-geometric-logo-triangle-polygonal-by-vexels.png"
                 alt=""/>
             <div className={s.loginBlock}>
                 {props.isAuth
                     ? <div>{props.login}
                         <button onClick={props.logout}>LogOut</button>
                     </div>
                     : <NavLink to={'/login'}>Login</NavLink>}
             </div>
         </header>*/
    );
};
