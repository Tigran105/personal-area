import React, { useEffect, useState } from "react";
import { Input, Table, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { IContact } from "../../../Types/contact";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Redux/store";
import { getContacts } from "../../../Redux/actionCreater";

export interface ContactsTableProps {
  openDeleteContact: (contact: IContact) => void;
  openEditContact: (contact: IContact) => void;
}

export const ContactsTable = (props: ContactsTableProps) => {
  const { openDeleteContact, openEditContact }: ContactsTableProps = props;

  const dispatch = useDispatch<AppDispatch>();

  const { contacts, loading } = useSelector(
    (state: RootState) => state.contacts
  );

  const [contactsData, setContactsData] = useState<IContact[]>([...contacts]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  useEffect(() => {
    setContactsData([...contacts]);
    setQuery("");
  }, [contacts]);

  const columns = [
    {
      title: "Contact Name",
      dataIndex: "name",
      width: "31%",
    },
    {
      title: "Contact Email",
      width: "31%",
      dataIndex: "email",
    },
    {
      title: "Contact Address",
      width: "31%",
      dataIndex: "address",
    },
    {
      title: "Actions",
      width: "5%",
      render: (record: IContact) => (
        <div className="actions">
          <Tooltip title="Edit contact">
            <EditOutlined
              onClick={() => {
                openEditContact(record);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete contact">
            <DeleteOutlined onClick={() => openDeleteContact(record)} />
          </Tooltip>
        </div>
      ),
    },
    { title: "", dataIndex: "", key: "expand" },
  ];

  const searchChange = (e: React.ChangeEvent<{ value: string }>) => {
    setQuery(e.target.value);
    const newContactsData: IContact[] = contacts.filter((contact) =>
      contact.name
        .toLowerCase()
        .trim()
        .includes(e.target.value.toLowerCase().trim())
    );
    setContactsData(newContactsData);
  };

  return (
    <div className="contacts">
      <Input
        className="search"
        value={query}
        placeholder="Search Contacts"
        prefix={<SearchOutlined />}
        onChange={searchChange}
      />
      <Table
        columns={columns}
        dataSource={[...contactsData]}
        rowKey="id"
        loading={loading}
        pagination={false}
        size="small"
      />
    </div>
  );
};

export default ContactsTable;
