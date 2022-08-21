import React, {ChangeEvent, useState} from "react";
import {Button, Form, Input, Modal} from "antd";

import {IContact} from "../../../Types/contact";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../Redux/store";
import {
    addContact,
    updateContact,
    deleteContact as deleteMember
} from "../../../Redux/actionCreater";

export interface ContactModalProps {
    visible?: boolean;
    hide?: () => void;
    contact?: IContact | null;
    deleteVisible?: boolean;
    deleteHide?: () => void;
    deleteContact?: IContact | null;
}


export function ContactModal(props: ContactModalProps) {

    const {visible, hide, contact, deleteVisible, deleteHide, deleteContact} = props;

    const dispatch = useDispatch<AppDispatch>();

    let titleText: string = "";
    if (deleteVisible) {
        titleText = `Delete ${deleteContact?.name} Contact ?`;
    } else {
        titleText = contact ? `Edit ${contact.name} contact` : "Add Contact";
    }

    const [member, setMember] = useState<Omit<IContact, "id">>(
        {
            name: contact ? contact.name : "",
            email: contact ? contact.email : "",
            address: contact ? contact.address : ""
        });

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        member.name = e.target.value;
        setMember({...member});
    };
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        member.email = e.target.value;
        setMember({...member});
    };
    const onChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
        member.address = e.target.value;
        setMember({...member});
    };
    const onFinish = () => {
        if (deleteContact) {
            if (deleteHide) {
                dispatch(deleteMember(deleteContact.id));
                deleteHide();
            }
        } else {
            if (contact) {
                dispatch(updateContact({...member, id: contact.id}));
            } else {
                dispatch(addContact(member));
            }
            hide && hide();
        }

    }
    if (deleteVisible) {
        return (
            <Modal
                title={titleText}
                visible={deleteVisible}
                onCancel={deleteHide}
                footer={null}
                width={350}
                maskTransitionName=""
            >
                <Form
                    name="bas/ic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    className={"formForDeleteModal"}
                    autoComplete="off"
                >
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Delete
                        </Button>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button
                            type={"dashed"}
                            onClick={deleteHide}
                            htmlType="button">
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>
        );
    }
    ;
    return (
        <Modal
            title={titleText}
            visible={visible}
            onCancel={hide}
            footer={null}
            maskTransitionName=""
        >

            <Form
                name="bas/ic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                autoComplete="off"
            >

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{required: !contact, message: 'Please input your name!'}]}
                >
                    <Input
                        placeholder={"Name"}
                        name={"name"}
                        value={member.name}
                        defaultValue={member.name}
                        onChange={onChangeName}
                    />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{required: !contact, message: 'Please input your email!'}]}
                >
                    <Input
                        type={"email"}
                        placeholder={"Email"}
                        value={member.email}
                        defaultValue={member.email}
                        onChange={onChangeEmail}
                    />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{required: !contact, message: 'Please input your address!'}]}
                >
                    <Input
                        placeholder={"Address"}
                        value={member.address}
                        defaultValue={member.address}
                        onChange={onChangeAddress}
                    />
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ContactModal;
