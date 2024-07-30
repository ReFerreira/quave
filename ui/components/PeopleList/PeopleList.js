import React from 'react';
import './PeopleList.css';

export const PeopleList = ({
  eventPeople,
  handleCheckIn,
  handleCheckOut,
  checkInTimes,
}) => {
  if (!eventPeople || eventPeople.length === 0) {
    return null;
  }

  return (<table className="table-auto min-w-full border-spacing-y-2 border-collapse border border-separate">
    <thead>
      <tr>
        <th>FullName</th>
        <th>Company</th>
        <th>Title</th>
        <th>Check-In Date</th>
        <th>Check-Out Date</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {eventPeople.map((person) => {
        const checkInDate = new Date(person.checkInDate);
        const now = new Date();
        const shouldShowCheckOutButton =
          person.checkInDate && !person.checkOutDate && now - checkInDate > 5000;
        return (
          <tr
            key={person._id}
            className="mb-2 rounded border border-gray-300 p-2 text-center hover:bg-gray-200"
          >
            <td>
              {person.firstName} {person.lastName}
            </td>
            <td>{person.company ?? ' - '}</td>
            <td>{person.title}</td>
            <td>

              {person.checkInDate
                ? new Date(person.checkInDate).toLocaleString()
                : 'N/A'}
            </td>
            <td>

              {person.checkOutDate
                ? new Date(person.checkOutDate).toLocaleString()
                : 'N/A'}
            </td>
            <td>
              {!person.checkInDate && (
                <button
                  onClick={() => handleCheckIn(person._id)}
                  className="rounded bg-green-500 px-2 py-1 text-white"
                >
                  Check-in {person.firstName} {person.lastName}
                </button>
              )}
              {checkInTimes && shouldShowCheckOutButton && (
                <button
                  onClick={() => handleCheckOut(person._id)}
                  className="rounded bg-red-500 px-2 py-1 text-white"
                >
                  Check-out {person.firstName} {person.lastName}
                </button>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
  );
}
