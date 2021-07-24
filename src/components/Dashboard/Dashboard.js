import React from "react";
import { Redirect } from "react-router-dom";
import { Fieldset } from "@paprika/form-element";
import Avatar from "@paprika/avatar";
import { getAvatarColors, getInitialsFromText } from '@paprika/avatar/lib/helpers';
import Card from "@paprika/card";
import Confirmation from "@paprika/confirmation";
import Counter from "@paprika/counter";
import FormElement from "@paprika/form-element";
import Heading from "@paprika/heading";
import Button from "@paprika/button";
import Toast from "@paprika/toast";
import NotificationCard from "@paprika/notification-card";
import Radio from "@paprika/radio";
import Pill from "@paprika/pill";
import Panel from "@paprika/panel";
import Input from "@paprika/input";
import Takeover from "@paprika/takeover";
import Check from "@paprika/icon/lib/Check";
import Add from "@paprika/icon/lib/Add";
import Times from "@paprika/icon/lib/Times";
import moment from "moment";
import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";

import CollapsibleFamily from './CollapsibleFamily';

import { getNextTuesday, getNextSundayReadable } from "../../helpers/getDate";
import './Dashboard.css';

const { Label, Content } = Fieldset;

const MAX_PEOPLE = 30;

const db = firebase.firestore();
const batch = db.batch();

const bubblieString = `<title>Bubbly Mascot</title>
<defs>
    <path id="a" d="m117.2 137.01c-12.021 8.1954-26.549 12.987-42.195 12.987-15.221 0-29.382-4.534-41.208-12.325 12.496-4.2393 27.102-6.6749 42.708-6.6749 14.776 0 28.655 2.1832 40.695 6.0134z"></path>
</defs>
<g fill="none" fill-rule="evenodd">
    <g transform="translate(-359 -86)">
        <g transform="translate(359 86)">
            <circle cx="75" cy="75" r="75" fill="#F2F2F2" fill-rule="evenodd"></circle>
            <mask fill="white">
                <use xlink:href="#a"></use>
            </mask>
            <use fill="#E9E9E9" fill-rule="evenodd" xlink:href="#a"></use>
            <g transform="translate(27 34)">
                <path d="m97 40.559c0-22.4-21.714-40.559-48.5-40.559s-48.5 18.159-48.5 40.559 21.714 40.559 48.5 40.559c8.0399 0 15.623-1.636 22.299-4.5316 2.2574 1.8182 6.2727 3.8692 13.415 5.4133-2.8609-5.0481-3.4736-8.7474-3.1376-11.392 9.7813-7.4204 15.924-18.135 15.924-30.049zm-10.176 39.962c1.2776 2.2543-0.71124 4.959-3.2439 4.4114-5.7818-1.25-10.108-2.9213-13.178-4.9325-6.7887 2.6986-14.228 4.1185-21.902 4.1185-28.336 0-51.5-19.372-51.5-43.559s23.164-43.559 51.5-43.559 51.5 19.372 51.5 43.559c0 12.143-5.8904 23.444-16.008 31.577 0.038706 2.1972 0.89607 4.9701 2.8311 8.3846z" fill="#2666AB" fill-rule="nonzero"></path>
                <path d="m81.076 70.608c9.7813-7.4204 15.924-18.135 15.924-30.049 0-22.4-21.714-40.559-48.5-40.559s-48.5 18.159-48.5 40.559 21.714 40.559 48.5 40.559c8.0399 0 15.623-1.636 22.299-4.5316 2.2574 1.8182 6.2727 3.8692 13.415 5.4133-2.8609-5.0481-3.4736-8.7474-3.1376-11.392z" fill="#6DA9E9" fill-rule="evenodd"></path>
                <path d="m27.5 29c2.4853 0 4.5-2.0147 4.5-4.5s-2.0147-4.5-4.5-4.5-4.5 2.0147-4.5 4.5 2.0147 4.5 4.5 4.5z" fill="#2666AB" fill-rule="evenodd"></path>
                <circle cx="54.5" cy="24.5" r="4.5" fill="#2666AB" fill-rule="evenodd"></circle>
                <path transform="translate(69.5 78) rotate(1) translate(-69.5 -78)" d="m64.975 81.923c0.099995-0.033332 0.2795-0.095075 0.5273-0.18332 0.40863-0.14552 0.86288-0.31364 1.3516-0.50251 1.398-0.54027 2.7969-1.1404 4.1097-1.7873 1.8557-0.91441 3.3903-1.8485 4.5132-2.811 0.62899-0.53913 0.70183-1.4861 0.1627-2.1151-0.53913-0.62899-1.4861-0.70183-2.1151-0.1627-0.89807 0.76977-2.2368 1.5847-3.8868 2.3977-1.2246 0.60343-2.5444 1.1696-3.8652 1.6801-0.46285 0.17888-0.8922 0.33779-1.2765 0.47465-0.22798 0.081185-0.38831 0.13633-0.46957 0.16342-0.78591 0.26197-1.2107 1.1114-0.94868 1.8974s1.1114 1.2106 1.8974 0.94868z" fill="#2666AB" fill-rule="nonzero"></path>
            </g>
            <g transform="translate(54 72)">
                <path d="m27.99 1.3717c0.044068-0.4513 4e-7 -1.3717-1.3392-1.3717h-25.298c-1.3417 0-1.3881 0.94482-1.3417 1.4078 0.70896 7.0709 6.7009 12.592 13.988 12.592 7.2993 0 13.299-5.5401 13.991-12.628zm-13.991 15.628c-8.78 0-16.105-6.6411-16.973-15.293-0.23936-2.3873 1.1293-4.7071 4.3267-4.7071h25.298c3.1749 0 4.5567 2.2897 4.325 4.6632-0.84674 8.6715-8.1807 15.337-16.977 15.337z" fill="#2666AB" fill-rule="nonzero"></path>
                <path d="m27.99 1.3717c-0.69214 7.0882-6.6921 12.628-13.991 12.628-7.2869 0-13.279-5.5213-13.988-12.592-0.046422-0.463 0-1.4078 1.3417-1.4078 1.3417-3.5598e-17 16.872-4.2146e-15 25.298 3.5598e-17 1.3392 5.4375e-16 1.3832 0.92039 1.3392 1.3717z" fill="#fff" fill-rule="evenodd"></path>
            </g>
        </g>
    </g>
</g>`;

const Dashboard = () => {
  const [formValues, setFormValues] = React.useState([0, 0, 0]);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [beastUser, setBeastUser] = React.useState(null);
  const [familyMembers, setFamilyMembers] = React.useState([]);
  const [tempFamilyMember, setTempFamilyMember] = React.useState(null);
  const [eventUsers, setEventUsers] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [isOpenSidePanel, setIsOpenSidePanel] = React.useState(false);
  const [isOpenToast, setOpenToast] = React.useState({ open: false, message: '', kind: 'success' });

  const userFirebase = firebase.auth().currentUser;

  React.useEffect(() => {
    db.collection("events").doc(getNextTuesday().split(' ').join('')).collection('users').get().then((querySnapshot => {
      const usersArr = [];
      querySnapshot.forEach((doc) => {
        usersArr.push(doc.data());
      });
      setEventUsers(usersArr);
    }))
  }, [refresh]);

  React.useEffect(() => {
    db.collection("userCollection").get().then((doc) => {
      const userUuids = doc.docs.map(doc => doc.data());
      const foundU = userUuids.filter(u => u.uid === userFirebase.uid);

      setCurrentUser(...foundU);
    });

    db.collection('userCollection').doc(userFirebase?.uid).get().then((doc => {
      if(doc.data()?.familyMembers) {
        setFamilyMembers(doc.data()?.familyMembers);
      }
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    db.collection("events").doc(getNextTuesday().split(' ').join('')).collection('users').doc(userFirebase.uid).get().then((doc) => {
      if(doc) {
        setBeastUser(doc.data());
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React.useEffect(() => {
  //   db.collection('userCollection').doc(currentUser?.uid).get().then((doc => {
  //     if(doc.data()?.familyMembers) {
  //       console.log(doc.data()?.familyMembers);
  //       setFamilyMembers(doc.data()?.familyMembers);
  //     }
  //     setRefresh(!refresh);
  //   }))
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (!userFirebase) {
    return <Redirect to="/login" />;
  }

  function checkIn() {
    setIsLoading(true);
    db.collection("events").doc(getNextTuesday().split(' ').join('')).collection('users').doc(userFirebase.uid).update({
      checkedIn: true,
    })
    .then(() => {
        setIsLoading(false);
        setModal(!modal);
        setRefresh(!refresh);
    })
    .catch((error) => {
        setIsLoading(false);
    });
  }

  const toggleSidePanel = () => {
    setIsOpenSidePanel(!isOpenSidePanel);
  }

  const register = handleCloseConfirm => {
    setIsLoading(true);

    db.collection('userCollection').doc(userFirebase.uid).get().then(
      (doc) => {
        const actualData = doc.data();

        db.collection("events").doc(getNextTuesday().split(' ').join('')).collection('users').doc(userFirebase.uid).set({
          uid: actualData.uid,
          firstLastName: actualData.firstLastName,
          email: actualData.email,
          phoneNumber: actualData.phoneNumber,
          role: actualData.role,
          familyMembers: actualData.familyMembers,
          checkedIn: false,
          isRegistered: true,
          onWaitList: false,
        })
        .then(() => {
            setIsLoading(false);
            setOpenToast({ open: true, message: "You successfully registered for this session.", kind: 'success'});
            setRefresh(!refresh);
            handleCloseConfirm();
        })
        .catch((error) => {
            setIsLoading(false);
            setOpenToast({ open: true, message: "Something went wrong. Please try again or contact admin.", kind: 'error'});
            handleCloseConfirm();
        });
      }
    );
  };

  const registerWaitlist = () => {
    setIsLoading(true);

    db.collection('userCollection').doc(userFirebase.uid).get().then(
      (doc) => {
        const actualData = doc.data();

        db.collection("events").doc(getNextTuesday().split(' ').join('')).collection('users').doc(userFirebase.uid).set({
          uid: actualData.uid,
          firstLastName: actualData.firstLastName,
          email: actualData.email,
          phoneNumber: actualData.phoneNumber,
          role: actualData.role,
          checkedIn: false,
          isRegistered: true,
          onWaitList: true,
        })
        .then(() => {
            setIsLoading(false);
            setOpenToast({ open: true, message: "You have signed up for the waitlist. You will be notified if you will play this tuesday.", kind: 'success'});
            setRefresh(!refresh);
        })
        .catch((error) => {
            setIsLoading(false);
            setOpenToast({ open: true, message: "Something went wrong. Please try again or contact admin.", kind: 'error'});
        });
      }
    );
  };

  const handleChange = (position, activeIndex) => {
    const newItems = [...formValues];
    newItems[position] = activeIndex;
    setFormValues(newItems);
  };

  const handleRemove = () => {
    db.collection("events").doc(getNextTuesday().split(' ').join('')).collection('users').doc(userFirebase.uid).delete().then(() => {
      setOpenToast({ open: true, message: "You successfully unregistered for this session.", kind: 'success'});
      setRefresh(!refresh);
    }).catch((error => {
      setOpenToast({ open: true, message: "Something went wrong. Please try again or contact admin.", kind: 'error'});
      setRefresh(!refresh);
    }))
  };

  function saveFamilyMembers() {
    const userCollection = db.collection('userCollection');

    userCollection.doc(userFirebase.uid).update({
      familyMembers: [...familyMembers, tempFamilyMember],
    });

    userCollection.doc(userFirebase?.uid).get().then((doc => {
      if(doc.data()?.familyMembers) {
        setFamilyMembers(doc.data()?.familyMembers);
      }
    }));

    db.collection("events").doc(getNextTuesday().split(' ').join('')).collection('users').doc(userFirebase.uid).update({
      familyMembers: [...familyMembers, tempFamilyMember],
    });

    setTempFamilyMember(null);
  }

  function removeFamilyMember(fam) {
    const userCollection = db.collection('userCollection');

    const newFamily = familyMembers.filter(f => !f.includes(fam));

    userCollection.doc(userFirebase.uid).update({
      familyMembers: newFamily
    });

    db.collection("events").doc(getNextTuesday().split(' ').join('')).collection('users').doc(userFirebase.uid).update({
      familyMembers: newFamily,
    });

    userCollection.doc(userFirebase?.uid).get().then((doc => {
      if(doc.data()?.familyMembers) {
        setFamilyMembers(doc.data()?.familyMembers);
      }
    }))
  }

  function registerAllChurchMembers() {
    const userCollection = db.collection('userCollection');
    
    userCollection.where("role", "==", "Church member").get().then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        const docRef = db.collection("events").doc(getNextTuesday().split(' ').join('')).collection('users').doc(doc.data().uid);
        batch.set(docRef, doc.data())
      });

      batch.commit();
      setRefresh(!refresh);
    });
  }

  function getPillColor(user) {
    if (user.role === 'Church member') {
      return Pill.types.color.BLUE;
    } else if (user.role === 'Regular') {
      return Pill.types.color.LIGHT_BLUE;
    } else {
      return Pill.types.color.GREY;
    }
  }

  function sortedEventUsers() {
    return eventUsers?.sort((a, b) => b.checkedIn - a.checkedIn || a.role.localeCompare(b.role));
  }

  function isCheckInDisabled(user) {
    return (moment().weekday() !== 0) || user.uid !== userFirebase.uid;
  }

  function getNoWaitList() {
    const hello = eventUsers.map(blah => blah.familyMembers);
    const numberOfFamilyMembers = (hello.filter((el) => el !== undefined).flat().length)
    return eventUsers?.length + numberOfFamilyMembers;
  }

  return (
    <div className="dashboard">
      {isOpenToast.open && (
        <Toast kind={isOpenToast.kind} isFixed hasCloseButton={false} canAutoClose autoCloseDelay={4000}>
          {isOpenToast.message}
        </Toast>
      )}
      <Heading level={1} className="title">RGAC Sunday Service</Heading>
      <header>
        {currentUser && (
          <Heading className="current-user-name" level={2} displayLevel={5}>{currentUser.firstLastName}</Heading>
        )}
        <Heading level={2} displayLevel={4}>Upcoming Sunday, {getNextSundayReadable()}</Heading>
        <div>
          {currentUser?.role === 'Church member' && getNoWaitList() === 0 && (
            <Button className="register-modal" kind="primary" onClick={() => registerAllChurchMembers()}>Start new session</Button>
          )}
          {!beastUser?.isRegistered && eventUsers?.length > 0 && eventUsers?.length < MAX_PEOPLE && (
            <Confirmation
              body="Are you sure you want to register for this upcoming session?"
              confirmLabel="Register"
              onConfirm={register}>
              <Confirmation.TriggerButton className="register-trigger" kind="primary" isDisabled={getNoWaitList() > MAX_PEOPLE}>Register</Confirmation.TriggerButton>
            </Confirmation>
          )}

          <Button icon={<Add />} onClick={toggleSidePanel}>
            Add family members
          </Button>
          {/* <Button onClick={() => config.auth().signOut().then(() => history.push('/'))}>Sign out</Button> */}
        </div>        
      </header>
      
      <hr />
      {eventUsers && (
        <>
          {eventUsers.length === 0 ? (
            <NotificationCard className="bubbly">
              <NotificationCard.Image>
                <svg
                  style={{ width: "100%" }}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: bubblieString }}
                  version="1.1"
                  viewBox="0 0 150 150"
                  xmlns="http://www.w3.org/2000/svg"
                />
              </NotificationCard.Image>
              <NotificationCard.Header level={2}>The session has not started yet</NotificationCard.Header>
              <NotificationCard.Body>
                Come back later when one of the admins starts the upcoming session.
              </NotificationCard.Body>
            </NotificationCard>
          ) : (
            <>
              <div style={{display: "flex", justifyContent: "center"}}>
                <Heading className="total-players" level={3} displayLevel={3}>Total attendees: <Counter size="large" quantity={`${getNoWaitList()} / 30`} /></Heading>
              </div>
              <ul>
                {sortedEventUsers().map((user, idx) => {
                  if (user.onWaitList) {
                    return null;
                  }
                  return (
                    <li key={idx}>
                      <Card
                        size="small"
                        className={user.uid === userFirebase.uid ? 'current-user' : ''}
                      >
                        <Card.Header>
                        </Card.Header>
                        <Card.Content>
                          <Card.Title>
                            <Avatar backgroundColor={getAvatarColors(user.firstLastName).backgroundColor} color={getAvatarColors(user.firstLastName).fontColor} isRound size="large">
                              {getInitialsFromText(user.firstLastName, 2).toUpperCase()}
                            </Avatar> {user.firstLastName} {user.uid === userFirebase.uid ? '(you)' : ''}
                          </Card.Title>

                          {user?.familyMembers?.length > 0 && (
                            <CollapsibleFamily familyMembers={user.familyMembers} />
                          )}
                        </Card.Content>
                        <Card.Footer style={{"height": "60px"}}>
                          {user.checkedIn ? (
                            <p className="check-in-button checked-in"><Check /> Checked In</p>
                          ) : ( 
                            <>
                            <Button kind={Button.types.kind.DESTRUCTIVE} size={Button.types.size.LARGE} onClick={() => handleRemove()} isDisabled={user.uid !== userFirebase.uid}>Unregister</Button>
                            <Button size={Button.types.size.LARGE} isDisabled={isCheckInDisabled(user)} className="check-in-button" kind="primary" onClick={() => { 
                              setModal(!modal);
                              setTimeout(window.scrollTo(0, 0), 100);
                            }}>Check in</Button>
                            </>
                          )}
                        </Card.Footer>
                      </Card>
                    </li>
                    );
                  }
                )}
              </ul>
            </>
          )}
        </>
      )}

      <Panel isOpen={isOpenSidePanel} onClose={toggleSidePanel} width="66%">
        <Panel.Overlay />
        <Panel.Header>Adding family members</Panel.Header>
        <Panel.Content>
          {familyMembers.length === 0 && (
            <NotificationCard className="bubbly">
              <NotificationCard.Image>
                <svg
                  style={{ width: "100%" }}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: bubblieString }}
                  version="1.1"
                  viewBox="0 0 150 150"
                  xmlns="http://www.w3.org/2000/svg"
                />
              </NotificationCard.Image>
              <NotificationCard.Header level={2}>No Family members have been added</NotificationCard.Header>
              <NotificationCard.Body>
                Follow the form below to add family members
              </NotificationCard.Body>
            </NotificationCard>
          )}

          {familyMembers?.map((familyMember) => (
            <Card size="small" >
              <Card.Header>
              </Card.Header>
              <Card.Content>
                <Card.Title>
                  <Avatar isRound size="large">
                  {getInitialsFromText(familyMember, 2).toUpperCase()}
                  </Avatar> {familyMember}
                  <Button.Close onClick={() => removeFamilyMember(familyMember)}/>
                </Card.Title>
              </Card.Content>
            </Card>         
          ))}
 

          <div className="family-member-form">
            <FormElement isRequired size={FormElement.types.size.LARGE} width="33%">
              <FormElement.Label>First and last name</FormElement.Label>
              <FormElement.Content>
                {a11yProps => (
                  <>
                    <Input size={Input.types.size.LARGE} onChange={e => setTempFamilyMember(e.target.value)}/>
                    <br />
                    <Button isDisabled={tempFamilyMember === null} onClick={() => saveFamilyMembers()}>Add family member</Button>
                  </>
                )}
              </FormElement.Content>
            </FormElement>
          </div>    
        </Panel.Content>
      </Panel>

      <Takeover isOpen={modal} onClose={() => setModal(!modal)} width="80%">
        <Takeover.Header>Check in</Takeover.Header>
        <Takeover.Content>
          <Heading level={2}>Sunday, {getNextSundayReadable()}</Heading>
          <hr />
          <br />
          <Fieldset>
            <Label>In the past 14 days, have you experienced any COVID-19 symptoms.</Label>
            <Content>
              {a11yProps => (
                <Radio.Group
                    onChange={activeIndex => {
                      handleChange(0, activeIndex);
                    }}
                  >
                  <Radio>Yes</Radio>
                  <Radio>No</Radio>
                </Radio.Group>
              )}
            </Content>
          </Fieldset>

          <Fieldset>
            <Label>In the past 14 days, have you had close contact with a person that is feeling unwell.</Label>
            <Content>
              {a11yProps => (
                <Radio.Group
                  onChange={activeIndex => {
                      handleChange(1, activeIndex);
                    }}
                  >
                  <Radio>Yes</Radio>
                  <Radio>No</Radio>
                </Radio.Group>
              )}
            </Content>
          </Fieldset>

          <Fieldset>
            <Label>In the past 14 days, have you returned to Canada from any country (including the United States).</Label>
            <Content>
              {a11yProps => (
                <Radio.Group
                  onChange={activeIndex => {
                      handleChange(2, activeIndex);
                    }}
                  >
                  <Radio>Yes</Radio>
                  <Radio>No</Radio>
                </Radio.Group>
              )}
            </Content>
          </Fieldset>
          <br />
          <Button isPending={isLoading} kind="primary" isDisabled={formValues.includes(0)} onClick={() => checkIn()}>Check in</Button>
          <Button kind="minor" onClick={() => setModal(!modal)}>Cancel</Button>
        </Takeover.Content>
      </Takeover>
    </div>
  );
};

export default Dashboard;
