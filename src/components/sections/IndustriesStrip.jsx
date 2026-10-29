import React from 'react'
const IndustriesStrip = ({ items = [], activeIndex = 0 }) => {
  const gridRowClass = 'proofband-grid-row';
  
  return (
    <div className="industries-strip">
      {items.map((item, index) => (
        <div
          key={index}
          className={`industry-card ${gridRowClass}`}
          style={{ gridRow: `${index * 25}px` }}
        >
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default IndustriesStrip;
