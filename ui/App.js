import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Communities } from '../communities/communities';
import { People } from '../people/people';
import { Meteor } from 'meteor/meteor';

export const App = () => {
  const [selectedEvent, setSelectedEvent] = useState('');

  const { communities, people, ready } = useTracker(() => {
    const communitiesHandle = Meteor.subscribe('communities');
    const peopleHandle = Meteor.subscribe('people');
    return {
      communities: Communities.find().fetch(),
      people: People.find().fetch(),
      ready: communitiesHandle.ready() && peopleHandle.ready(),
    };
  }, []);

  const handleEventChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  // Filtrando pessoas com base no evento selecionado
  const eventPeople = selectedEvent
    ? people.filter(person => person.communityId === selectedEvent)
    : [];

  if (!ready) {
    return <div>Loading...</div>;
  }



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg font-bold">Event Check-in</h1>

      <div className="mb-4">
        <label htmlFor="eventSelector" className="block text-sm font-medium text-gray-700">Select an Event</label>
        <select
          id="eventSelector"
          value={selectedEvent}
          onChange={handleEventChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select an event</option>
          {communities.map(event => (
            <option key={event._id} value={event._id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>

      <ul>
        {eventPeople.map(person => (
          <li key={person._id} className="mb-2 p-2 border border-gray-300 rounded">
            <div>{person.firstName} {person.lastName}</div>
            <div>{person.companyName || 'N/A'}</div>
            <div>{person.title || 'N/A'}</div>
            <div>Check-in date: {person.checkInDate ? new Date(person.checkInDate).toLocaleString() : 'N/A'}</div>
            <div>Check-out date: {person.checkOutDate ? new Date(person.checkOutDate).toLocaleString() : 'N/A'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
