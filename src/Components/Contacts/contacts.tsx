import React, {useEffect, useState} from "react";
import "./contacts.scss";
import {LogoutOutlined} from '@ant-design/icons';
import ContactsTable from "./ContactsTable/contactsTable";
import ContactModal from "./ContactModal/contactModal";
import Title from "antd/lib/typography/Title";
import {Button, Col, Row} from "antd";
import {IContact} from "../../Types/contact";
import {IModal} from "../../Types/modal";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../Redux/store";
import {getContacts, logout} from "../../Redux/actionCreater";
import {isAuthorized} from "../../Redux/auth";
import {useNavigate} from "react-router";


export function Contacts() {

    const dispatch = useDispatch<AppDispatch>()
    const {isLogin} = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(isAuthorized())
        dispatch(getContacts())
    }, [])

    useEffect(() => {
        if (!isLogin) {
            navigate('/login')
        }
    }, [isLogin])

    const [contactModal, setContactModal] = useState<IModal>({
        open: false,
        contact: null
    });
    const [deleteContactModal, setDeleteContactModal] = useState<IModal>({
        open: false,
        contact: null
    });

    const openDeleteContact = (contact: IContact) => {
        setDeleteContactModal({open: true, contact});
    };
    const hideDeleteContact = () => {
        setDeleteContactModal({open: false, contact: null});
    };
    const openContactModal = (contact: IContact | null) => {
        setContactModal({open: true, contact});
    };
    const hideContactModal = () => {
        setContactModal({open: false, contact: null});
    };
    return (
        <div className={"contacts-wrapper"}>
            <Title className="module-title">Contacts</Title>
            <div className="contact-buttons">
                <Button
                    type="dashed"
                    className="add-contact-button"
                    onClick={() => openContactModal(null)}
                >
                    Add
                </Button>
            </div>
            <Row>
                <Col span={20} className={"contacts-table"}>
                    <ContactsTable
                        openDeleteContact={openDeleteContact}
                        openEditContact={openContactModal}
                    />
                </Col>
            </Row>
            {(contactModal.open || deleteContactModal.open) &&
            <ContactModal
                visible={contactModal.open}
                hide={hideContactModal}
                contact={contactModal.contact}
                deleteVisible={deleteContactModal.open}
                deleteHide={hideDeleteContact}
                deleteContact={deleteContactModal.contact}
            />
            }
            <Button
                type="primary"
                className={"logout-button"}
                icon={<LogoutOutlined/>}
                onClick={() => dispatch(logout())}
            >Log Out</Button>
        </div>
    );
}

export default Contacts;
