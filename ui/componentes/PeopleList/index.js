import React, { useState } from 'react';

export const PeopleList = ({
  eventPeople,
  handleCheckIn,
  handleCheckOut,
  checkInTimes,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!eventPeople || eventPeople.length === 0) {
    return null;
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEventPeople = eventPeople
    .filter((person) => {
      const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

  return (
    <div className="mx-auto flex w-full max-w-[736px] flex-col justify-end">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by name"
        className="mb-4 w-full rounded border border-gray-300 p-2 sm:ml-auto sm:w-auto"
      />
      <ul className="m-0 list-none p-0">
        {filteredEventPeople.map((person) => {
          const checkInDate = new Date(person.checkInDate);
          const now = new Date();
          const shouldShowCheckOutButton =
            person.checkInDate &&
            !person.checkOutDate &&
            now - checkInDate > 5000;
          return (
            <li
              key={person._id}
              className="mb-2 flex flex-col rounded border border-gray-300 p-2"
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
                  : 'N/A'}
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
    </div>
  );
};