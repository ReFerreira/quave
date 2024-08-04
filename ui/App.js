import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Communities } from '../communities/communities';
import { People } from '../people/people';
import { Meteor } from 'meteor/meteor';

import { EventSelector } from './componentes/EventSelector';
import { PeopleList } from './componentes/PeopleList';
import { Summary } from './componentes/Summary';

export const App = () => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [checkInTimes, setCheckInTimes] = useState({});
  const [timerActive, setTimerActive] = useState(false);

  const { communities, people, ready } = useTracker(() => {
    const communitiesHandle = Meteor.subscribe('communities');
    const peopleHandle = Meteor.subscribe('people');

    return {
      communities: Communities.find().fetch(),
      people: People.find().fetch(),
      ready: communitiesHandle.ready() && peopleHandle.ready(),
    };
  }, []);

  const handleEventChange = useCallback(
    (e) => setSelectedEvent(e.target.value),
    []
  );

  const handleCheckIn = useCallback((personId) => {
    Meteor.call('people.checkIn', personId, (error) => {
      if (error) {
        // console.error('Check-in failed', error);
      } else {
        setCheckInTimes((prevTimes) => ({
          ...prevTimes,
          [personId]: new Date().getTime(),
        }));
        setTimerActive(true);
      }
    });
  }, []);

  const handleCheckOut = useCallback((personId) => {
    Meteor.call('people.checkOut', personId, (error) => {
      if (error) {
        // console.error('Check-out failed', error);
      } else {
        setCheckInTimes((prevTimes) => {
          const updatedTimes = { ...prevTimes };
          delete updatedTimes[personId];
          return updatedTimes;
        });
      }
    });
  }, []);

  useEffect(() => {
    if (!timerActive) {
      return () => { };
    }

    const interval = setInterval(() => {
      setCheckInTimes((prevTimes) => {
        const now = new Date().getTime();
        const updatedTimes = { ...prevTimes };
        let hasActiveCheckIns = false;

        Object.keys(updatedTimes).forEach((personId) => {
          if (now - updatedTimes[personId] > 5000) {
            delete updatedTimes[personId];
          } else {
            hasActiveCheckIns = true;
          }
        });

        if (!hasActiveCheckIns) {
          setTimerActive(false);
          clearInterval(interval);
        }

        return updatedTimes;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive]);

  const eventPeople = useMemo(
    () =>
      selectedEvent
        ? people.filter((person) => person.communityId === selectedEvent)
        : [],
    [selectedEvent, people]
  );

  if (!ready) {
    return <div className="mx-auto flex w-full flex-col items-center p-4 lg:w-3/4 justify-center h-screen">
      Loading...
    </div>;
  }

  return (
    <div className="mx-auto flex w-full flex-col items-center p-4 lg:w-3/4">
      <h1 className="text-lg font-bold">Event Check-in</h1>
      <EventSelector
        selectedEvent={selectedEvent}
        handleEventChange={handleEventChange}
        communities={communities}
      />

      <Summary eventPeople={eventPeople} />
      <PeopleList
        eventPeople={eventPeople}
        handleCheckIn={handleCheckIn}
        handleCheckOut={handleCheckOut}
        checkInTimes={checkInTimes}
      />
    </div>
  );
};