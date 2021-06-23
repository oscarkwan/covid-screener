import React from 'react';
import Button from '@paprika/button';
import Heading from '@paprika/heading';
import Table from '@paprika/table';
import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";

import { getNextTuesday, getNextTuesdayReadable } from "../../helpers/getDate";

const db = firebase.firestore();

function Report() {
  const [users, setUsers] = React.useState(null);
  const [showToast, setShowToast] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const userFirebase = firebase.auth().currentUser;

  React.useEffect(() => {
    db.collection("userCollection").get().then((doc) => {
      const userUuids = doc.docs.map(doc => doc.data());
      const foundU = userUuids.filter(u => u.uid === userFirebase.uid);

      setCurrentUser(...foundU);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    db.collection("events").doc(getNextTuesday().split(' ').join('')).collection('users').get().then((querySnapshot => {
      const usersArr = [];
      querySnapshot.forEach((doc) => {
        if(doc.data().onWaitList) {
          usersArr.push(doc.data());
        }
      });
      setUsers(usersArr);
    }))
  }, []);

  function unWaitList(user) {
    console.log('yo');
    console.log(user);

    db.collection("events").doc(getNextTuesday().split(' ').join('')).collection('users').doc(user.uid).update({
      onWaitList: false,
    }).then(() => {
      console.log('succcess');
      setShowToast(true);
    });
  }

  function sortUsers() {
    return users.sort((a, b) => a.firstLastName.localeCompare(b.firstLastName));
  }

  return (
    <>
      {currentUser?.role === 'Church member' ? (
        <>
        <Heading level={1}>Waitlist {getNextTuesdayReadable()}</Heading>
        {users ? (
          <Table data={sortUsers()}>
            <Table.ColumnDefinition header="First and Last Name" cell="firstLastName" />
            <Table.ColumnDefinition header="Phone Number" cell="phoneNumber" />
            <Table.ColumnDefinition header="Email Address" cell="email" />
            <Table.ColumnDefinition header="Role" cell="role" />
            <Table.ColumnDefinition header="Register player" cell={props => {
            return (
              <Button kind="primary" onClick={() => unWaitList(props.row)}>Register player</Button>
            );
          }}/>
          </Table>
        ) : null}
        {users ? (
          <p>Total users: {users.length}</p>
        ) : null}
        </>
      ) : null}
    </>
  )
}

export default Report;
