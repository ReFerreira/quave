import React from 'react';

export const PeopleList = ({
  eventPeople,
  handleCheckIn,
  handleCheckOut,
  checkInTimes,
}) => (
  <ul className="people-list">
    {eventPeople.map((person) => {
      const checkInDate = new Date(person.checkInDate);
      const now = new Date();
      const shouldShowCheckOutButton =
        person.checkInDate && !person.checkOutDate && now - checkInDate > 5000;
      return (
        <li
          key={person._id}
          className="mb-2 rounded border border-gray-300 p-2"
        >
          <div>
            {person.firstName} {person.lastName}
          </div>
          <div>{person.company}</div>
          <div>{person.title}</div>
          <div>
            Check-in date:{' '}
            {person.checkInDate
              ? new Date(person.checkInDate).toLocaleString()
              : 'N/A'}
          </div>
          <div>
            Check-out date:{' '}
            {person.checkOutDate
              ? new Date(person.checkOutDate).toLocaleString()
              : 'N/A '}
          </div>
          {!person.checkInDate && (
            <button
              onClick={() => handleCheckIn(person._id)}
              className="my-1.5 rounded bg-green-500 px-2 py-1 text-white"
            >
              Check-in {person.firstName} {person.lastName}
            </button>
          )}
          {checkInTimes && shouldShowCheckOutButton && (
            <button
              onClick={() => handleCheckOut(person._id)}
              className="my-1.5 rounded bg-red-500 px-2 py-1 text-white"
            >
              Check-out {person.firstName} {person.lastName}
            </button>
          )}
        </li>
      );
    })}
  </ul>
);
