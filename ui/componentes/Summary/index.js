import React, { useState } from 'react';
import { BsChevronDown, BsChevronUp } from "react-icons/bs";


export const Summary = ({ eventPeople }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const peopleByCompanyString = Object.entries(peopleByCompany);

  return (
    <div className="mb-6 text-gray-800">
      <h3>People in the event right now: {peopleInEvent}</h3>

      <h3>People by company in the event right now:</h3>
      {peopleByCompanyString.map(([company, quantity], index) => {
        if (!isExpanded && index > 3) return null

        return (
          <li key={Math.random()}>
            {company}: {quantity}
          </li>
        )

      })}

      {peopleByCompanyString.length > 3 && (
        <div onClick={() => setIsExpanded(!isExpanded)} className='cursor-pointer'>
          {!isExpanded ? (
            <div className="flex items-center">
              <span className='mr-1.25'>ver mais</span> <BsChevronDown />
            </div>
          ) : (
            <div className="flex items-center">
              <span className='mr-1.25'>ver menos</span> <BsChevronUp />
            </div>
          )}
        </div>
      )}

      <h3>People not checked in: {peopleNotCheckedIn}</h3>
    </div>
  );
};