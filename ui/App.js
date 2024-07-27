import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Communities } from '../communities/communities';
import { People } from '../people/people';
import { Meteor } from 'meteor/meteor';

export const App = () => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [checkInTimes, setCheckInTimes] = useState({});
  const { communities, people, ready } = useTracker(() => {
    const communitiesHandle = Meteor.subscribe('communities');
    const peopleHandle = Meteor.subscribe('people');
    return {
      communities: Communities.find().fetch(),
      people: People.find().fetch(),
      ready: communitiesHandle.ready() && peopleHandle.ready(),
    };
  }, []);
  const handleEventChange = useCallback((e) => {
    setSelectedEvent(e.target.value);
  }, []);
  const handleCheckIn = useCallback((personId) => {
    Meteor.call('people.checkIn', personId, (error) => {
      if (error) {
        // console.error('Check-in failed', error);
      } else {
        // console.log('Check-in successful');
        setCheckInTimes((prevTimes) => ({
          ...prevTimes,
          [personId]: new Date().getTime(),
        }));
      }
    });
  }, []);
  const handleCheckOut = useCallback((personId) => {
    Meteor.call('people.checkOut', personId, (error) => {
      if (error) {
        // console.error('Check-out failed', error);
      } else {
        // console.log('Check-out successful');
      }
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCheckInTimes((prevTimes) => {
        const now = new Date().getTime();
        const updatedTimes = { ...prevTimes };
        Object.keys(updatedTimes).forEach((personId) => {
          if (now - updatedTimes[personId] > 5000) {
            delete updatedTimes[personId];
          }
        });
        return updatedTimes;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const eventPeople = useMemo(() =>
    selectedEvent
      ? people.filter(person => person.communityId === selectedEvent)
      : []
    , [selectedEvent, people]);

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
      <div className="mb-4">
        <h3>People in the event right now: {eventPeople.filter(person => person.checkInDate && !person.checkOutDate).length}</h3>
        <h3>People not checked in: {eventPeople.filter(person => !person.checkInDate).length}</h3>
      </div>
      <ul>
        {eventPeople.map(person => {
          const checkInDate = new Date(person.checkInDate);
          const now = new Date();
          const shouldShowCheckOutButton = person.checkInDate && !person.checkOutDate && (now - checkInDate) > 5000;
          return (
            <li key={person._id} className="mb-2 p-2 border border-gray-300 rounded">
              <div>{person.firstName} {person.lastName}</div>
              <div>{person.company}</div>
              <div>{person.title}</div>
              <div>Check-in date: {person.checkInDate ? new Date(person.checkInDate).toLocaleString() : 'N/A'}</div>
              <div>Check-out date: {person.checkOutDate ? new Date(person.checkOutDate).toLocaleString() : 'N/A'}</div>
              {!person.checkInDate && (
                <button
                  onClick={() => handleCheckIn(person._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Check-in {person.firstName} {person.lastName}
                </button>
              )}
              {checkInTimes && shouldShowCheckOutButton && (
                <button
                  onClick={() => handleCheckOut(person._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
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