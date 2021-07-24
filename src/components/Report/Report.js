import React from 'react';
import Heading from '@paprika/heading';
import Table from '@paprika/table';
import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";

import { getNextTuesday, getNextSundayReadable } from "../../helpers/getDate";

const db = firebase.firestore();

function Report() {
  const [users, setUsers] = React.useState(null);

  React.useEffect(() => {
    db.collection("events").doc(getNextTuesday().split(' ').join('')).collection('users').get().then((querySnapshot => {
      const usersArr = [];
      querySnapshot.forEach((doc) => {
        // if(doc.data().checkedIn) {
          usersArr.push(doc.data());
        // }
      });
      setUsers(usersArr);
    }))
  }, []);

  function sortUsers() {
    return users.sort((a, b) => a.firstLastName.localeCompare(b.firstLastName));
  }

  function getNoWaitList() {
    const hello = users.map(blah => blah.familyMembers);
    const numberOfFamilyMembers = (hello.filter((el) => el !== undefined).flat().length)
    return users?.length + numberOfFamilyMembers;
  }

  return (
    <>
      <Heading level={1}>Report for {getNextSundayReadable()}</Heading>
      {users ? (
        <Table data={sortUsers()}>
          <Table.ColumnDefinition header="First and Last Name" cell="firstLastName" />
          <Table.ColumnDefinition header="Phone Number" cell="phoneNumber" />
          <Table.ColumnDefinition header="Email Address" cell="email" />
          <Table.ColumnDefinition header="Family Members" cell={props => {
            if (props.row?.familyMembers) {
              return props.row?.familyMembers.map(fam => <span>{fam}, </span>);
            }
          }} />
        </Table>
      ) : null}
      {users ? (
        <p>Total attendees: {getNoWaitList()}</p>
      ) : null}
    </>
  )
}

export default Report;
