import React from 'react';

export const EventSelector = ({
  selectedEvent,
  handleEventChange,
  communities,
}) => (
  <div className="mx-auto mb-6 flex w-full max-w-[736px] flex-col items-center">
    <label htmlFor="eventSelector" className="mb-4 block font-bold">
      Select an Event
    </label>
    <select
      id="eventSelector"
      value={selectedEvent}
      onChange={handleEventChange}
      className="w-full max-w-[736px] rounded-md border border-gray-300 p-4 text-base"
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
