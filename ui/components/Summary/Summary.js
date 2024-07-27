import React from 'react';
import './Summary.css';

export const Summary = ({ eventPeople }) => (
  // const peopleInEvent = eventPeople.filter(person => person.checkInDate && !person.checkOutDate).length;
  // const peopleNotCheckedIn = eventPeople.filter(person => !person.checkInDate).length;
  // const peopleByCompany = eventPeople.reduce((acc, person) => {
  //   if (person.checkInDate && !person.checkOutDate) {
  //     acc[person.company] = (acc[person.company] || 0) + 1;
  //   }
  //   return acc;
  // }, {});
  // <div className="mb-4">
  //   <h3>People in the event right now: {peopleInEvent}</h3>
  //   <h3>People by company in the event right now: {Object.entries(peopleByCompany).map(([company, count]) => company count )).join(', ')}</h3>
  //   <h3>People not checked in: {peopleNotCheckedIn}</h3>
  // </div>
  <div className="mb-4">
    <h3>
      People in the event right now:{' '}
      {
        eventPeople.filter(
          (person) => person.checkInDate && !person.checkOutDate
        ).length
      }
    </h3>
    {/* <h3>People by company in the event right now: {Object.entries(peopleByCompany).map(([company, count]) => company (count)).join(', ')}</h3> */}
    <h3>
      People not checked in:{' '}
      {eventPeople.filter((person) => !person.checkInDate).length}
    </h3>
  </div>
);
