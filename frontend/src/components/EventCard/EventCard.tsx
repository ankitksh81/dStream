/* eslint-disable global-require */
import React from 'react';

interface EventCardProps {
  event: StreamEvent;
  handleOpenEventDetails: (event: StreamEvent) => void;
}

export const EventCard = ({
  event,
  handleOpenEventDetails,
}: EventCardProps) => {
  return (
    <div className="flex gap-8 p-4 my-8 transition-all border rounded-sm shadow-md cursor-default border-gray-900/5 drop-shadow-sm">
      <div className="w-full ">
        <header>
          <h4 className="text-lg font-bold">{event.name}</h4>
        </header>

        <p className="pb-4 mt-1 leading-tight text-black/50">
          {event.description}
        </p>

        <div className="mt-4">
          <h5 className="mb-2 font-semibold">Timings:</h5>

          <p className="text-xs">
            {new Date(event.startsAt).toDateString()} -{' '}
            {new Date(event.endsAt).toDateString()}
          </p>
        </div>
      </div>

      <div className="flex-shrink-0 gap-4">
        <button
          className="flex items-center px-2 py-1 font-semibold text-white transition-colors bg-blue-400 rounded-sm hover:bg-blue-500"
          onClick={() => handleOpenEventDetails(event)}
        >
          Show Details
        </button>
      </div>
    </div>
  );
};
