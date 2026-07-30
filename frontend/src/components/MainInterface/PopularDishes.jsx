import React from 'react'
import './PopularDishes.css'
import { popularDishes } from '../../pages/https/constants/index';

const PopularDishes = () => {
  return (
    <div className="popular-dish">
      <div className="popular-dishes-container">
        <div className="popular-dishes-title">
            <h1 className="dishes-title">
                Most Popular Dishes
            </h1>
            <a href=" " className="view-all">
                View all
            </a>
        </div>
        <div className="famous-dishes">
            {
                popularDishes.map((dish) => {
                    return (
                        <div key={dish.id} className="dish-card">
                            <h1 className="dish-rank">{dish.id < 10 ? ` 0${dish.id}` : dish.id} </h1>
                            <img src={dish.image} alt={dish.name} className="dish-image" />
                            <div>
                                <h1 className="dish-title">{dish.name}</h1>
                                <p className="number-of-orders">{dish.numberOfOrders} Orders</p>
                            </div>

                            
                        </div>
                    )
                })
            }
        </div>
      </div>
    </div>
  )
}

export default PopularDishes
