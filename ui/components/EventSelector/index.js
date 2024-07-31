import React from 'react';

export const EventSelector = ({
  selectedEvent,
  handleEventChange,
  communities,
}) => (
  <div className="mb-6">
    <label
      htmlFor="eventSelector"
      className="block font-bold mb-4"
    >
      Select an Event
    </label>
    <select
      id="eventSelector"
      value={selectedEvent}
      onChange={handleEventChange}
      className="w-full p-4 border border-gray-300 rounded-md text-base"
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
