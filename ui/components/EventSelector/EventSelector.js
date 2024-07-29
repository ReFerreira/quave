import React from 'react';
import './EventSelector.css';

export const EventSelector = ({
  selectedEvent,
  handleEventChange,
  communities,
}) => (
  <div className="event-selector">
    <label
      htmlFor="eventSelector"
      className="block text-sm font-medium text-gray-700"
    >
      Select an Event
    </label>
    <select
      id="eventSelector"
      value={selectedEvent}
      onChange={handleEventChange}
      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
    >
      <option value="">Select an event</option>
      {communities.map((event) => (
        <option key={event._id} value={event._id}>
          {event.name}
        </option>
      ))}
    </select>
  </div>
);
