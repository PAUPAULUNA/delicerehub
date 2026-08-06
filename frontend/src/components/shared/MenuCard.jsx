import React from 'react'
import './MenuCard.css'

const MenuCard = ({ item, onAdd }) => {
  return (
    <>
            {item.sizes.map(size => (

                <div
                    className="menu-row"
                    key={`${item.id}-${size.id}`}
                >

                    <span>{item.name}</span>

                    <span>{size.name}</span>

                    <span>₱{size.price.toFixed(2)}</span>

                    <button>Add</button>

                </div>

            ))}
        </>

    );

};

export default MenuCard
