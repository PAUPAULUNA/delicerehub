import React from 'react'
import './CreateOrder.css'
import { useNavigate } from 'react-router-dom';
import Processing from "../../components/shared/Processing";

const CreateOrder = () => {

  const navigate = useNavigate();

  return (
    <div className="parent-order">
        <div className="create-order">
            <button onClick={() => navigate("/processing")} className="order-creation"> <p> CREATE AN ORDER </p></button>
        </div>
    </div>
  )
}

export default CreateOrder
