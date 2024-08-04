import React from 'react';

export const Summary = ({ eventPeople }) => {

  if (!eventPeople || eventPeople.length === 0) {
    return null;
  }

  const peopleInEvent = eventPeople.filter(
    (person) => person.checkInDate && !person.checkOutDate
  ).length;

  const peopleNotCheckedIn = eventPeople.filter(
    (person) => !person.checkInDate
  ).length;

  const peopleByCompany = eventPeople.reduce((acc, person) => {
    if (person.checkInDate && !person.checkOutDate && person.companyName) {
      acc[person.companyName] = (acc[person.companyName] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div className="mx-auto mb-6 flex w-full max-w-[736px] flex-col text-gray-800">
      <h3>People in the event right now: {peopleInEvent}</h3>

      <h3>People by company in the event right now: {Object.entries(peopleByCompany).map(([company, count]) => `${company} (${count})`).join(', ')}</h3>
      

      <h3>People not checked in: {peopleNotCheckedIn}</h3>
    </div>
  );
};
