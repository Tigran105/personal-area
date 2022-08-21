import {notification} from 'antd';
import type {NotificationPlacement} from 'antd/es/notification';
import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../Redux/store";
import {clearMessage} from "../../Redux/notification"
interface IProps {
    message: string
}

const Context = React.createContext({name: 'Default'});


const Notification: React.FC<IProps> = (props: IProps) => {
    const {message} = props
    const dispatch = useDispatch<AppDispatch>()
    const [api, contextHolder] = notification.useNotification();

    const clearNotification = () => {
        setTimeout(() => {
            dispatch(clearMessage())
        },3000)
    }

    useEffect(() => {
        if (message) {
            openNotification('topRight')
            clearNotification()
        }
    }, [message])

    const openNotification = (placement: NotificationPlacement) => {
        api.info({
            message: `Notification`,
            description: <Context.Consumer>{() => `${message}!`}</Context.Consumer>,
            placement,
        });
    };
    return (
        <Context.Provider value={{name: message}}>
            {contextHolder}
        </Context.Provider>
    );
};

export default Notification;