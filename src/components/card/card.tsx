"use server";

import React from "react";

interface Time {
  start?: string;
  end?: string;
}

interface CardProps {
  title: string;
  description: string;
  image: string;
  time: Time;
}

async function Card({title, description, image, time}: CardProps) {
  return (
      <div className={`
        w-1/4
        h-1/4
        bg-gray-300
        border border-gray-400
        `}>
        <div className={'w-1/4 h-1/4 bg-gray-300'}>
          <h2>{title}</h2>
          <p>{description}</p>

          <h3>
            {/* TODO: add time logic */}
            {time?.start} - {time?.end}
          </h3>
        </div>
      </div>
  )
}

Card.defaultProps = {
  title: 'Title',
  description: 'Description',
  image: 'https://via.placeholder.com/150',
  time: {
    start: '00:00',
    end: '00:00'
  }
}

export {Card};