import React from 'react';
import Heading from '@paprika/heading';
import Table from '@paprika/table';
import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";

import { getNextTuesday } from "../../helpers/getDate";

const db = firebase.firestore();

function Report() {
  const [users, setUsers] = React.useState(null);

  React.useEffect(() => {
    db.collection("events").doc(getNextTuesday().split(' ').join('')).collection('users').get().then((querySnapshot => {
      const usersArr = [];
      querySnapshot.forEach((doc) => {
        if(doc.data().checkedIn) {
          usersArr.push(doc.data());
        }
      });
      setUsers(usersArr);
    }))
  }, []);

  return (
    <>
      <Heading level={1}>Report for this Tuesday</Heading>
      {users ? (
        <Table data={users}>
          <Table.ColumnDefinition header="First and Last Name" cell="firstLastName" />
          <Table.ColumnDefinition header="Phone Number" cell="phoneNumber" />
          <Table.ColumnDefinition header="Email Address" cell="email" />
          <Table.ColumnDefinition header="Role" cell="role" />
        </Table>
      ) : null}
      {users ? (
        <p>Total users: {users.length}</p>
      ) : null}
    </>
  )
}

export default Report;
