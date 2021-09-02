import React from 'react';
import './App.css';
import 'antd/dist/antd.css';

import {Link, Route, withRouter} from "react-router-dom";
import News from "./component/News/News";
import Music from "./component/Music/Music";
import Settings from "./component/Settings/Settings";
import {Login} from "./component/Login/Login";
import {compose} from "redux";
import {connect} from "react-redux";
import {initializedApp} from "./redux/app-reducer";
import Preloader from "./component/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import {AppStateType} from "./redux/redux-store";
import {UserPage} from "./component/Users/UsersContainer";


import {Layout, Menu, Breadcrumb, Switch, Avatar, Row, Col} from 'antd';
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons';
import {Header} from "./component/Header/Header";



const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;
const DialogsContainer = React.lazy(() => import('./component/Dialogs/DialogsContainer'));
const ContentContainer = React.lazy(() => import('./component/Content/MyPosts/ContentContainer'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializedApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
/*
const SuspendedUsers = withSuspense(UserPage)
*/
const SuspendedProfile = withSuspense(ContentContainer)
const SuspendedChatPage = withSuspense(ChatPage)

class App extends React.Component <MapPropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    }

    componentDidMount() {
        this.props.initializedApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <Layout>
                <Header/>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined/>} title="My Profile">
                                    <Menu.Item key="1"><Link to="/profile"> Profile</Link> </Menu.Item>

                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Dialogs">
                                    <Menu.Item key="5"><Link to="/dialogs"> Messages</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined/>} title="Users">
                                    <Menu.Item key="9"><Link to="/users"> Users</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub4" icon={<NotificationOutlined/>} title="Chat">
                                    <Menu.Item key="9"><Link to="/chat"> Chat</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>

                            <Route path="/profile/:userId?"
                                   render={() => <SuspendedProfile/>}/>

                            <Route path="/dialogs"
                                   render={() => <SuspendedDialogs/>}/>

                            <Route path="/users"
                                   render={() => <UserPage/>}/>

                            <Route path="/chat"
                                   render={() => <SuspendedChatPage/>}/>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}> Created by Vieness</Footer>
            </Layout>
            /*        <div className='app-wraper'>
                        <HeaderContainer/>
                        <Nav/>
                        <div className='app-wraper-content'>
                        <Switch>
                           {/!* <Redirect exact from="/" to="/profile"/>*!/}
                            {/!* <Route path="/"
                                   render={withSuspense(ContentContainer)}/>*!/}

                            <Route path="/profile/:userId?"
                                   render={() => <SuspendedProfile/>}/>

                            <Route path="/dialogs"
                                   render={() => <SuspendedDialogs/>}/>

                            <Route path="/users"
                                   render={() => <SuspendedUsers/>}/>

                            <Route path="/news"
                                   render={() => <News/>}/>

                            <Route path="/music"
                                   render={() => <Music/>}/>

                            <Route path="/settings"
                                   render={() => <Settings/>}/>

                            <Route path="/login"
                                   render={() => <Login/>}/>
                        <Switch/>
                        </div>

                    </div>*/
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})
export default compose(
    withRouter,
    connect(mapStateToProps, {initializedApp}))(App);




