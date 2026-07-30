import React from 'react'
import './OrderList.css'
import search from '../../assets/loupe.png'
import preparing from '../../assets/wok.png'
import serving from '../../assets/accept.png'

const OrderList = () => {
  return (
    <section className="content-grid">
	{ /* Order List */ }
		<div className="panel">

			<h3>Order List</h3>
      <div className="search-bar">
        <img src={search} className="search" alt="Search" />
				<input
					type="text"
					placeholder="search order"
					className="input"
					/>
      </div>
      
				<div className="order-list">
          <ul className="listing-orders">
            <li><span className="name">Mark Smith</span><span className="status">Processing...</span></li>
            <li><span className="name">Felix Moore</span><span className="status">Processing...</span></li>
          </ul>
				</div>	

		</div>
	{ /* Wait List */ }
		<div className="panel">

			<h3>Waiting</h3>

				<div className="search-bar">
        <img src={search} className="search" alt="Search" />
				<input
					type="text"
					placeholder="search wait list"
					className="input"
					/>
      </div>
				<div className="Wait-list">
          <ul className="serving">
            <li><span className="name">John Doe<p>Order #012</p></span><span className="status">
  <img src={serving} className="serve" alt="Now Serving" />
  <span className="status-info">
    <span className="status-text">Now Serving!</span>
    <span className="update">🟢Just now</span>
  </span>
</span></li>
            <li><span className="name">Jane Doe<p>Order #345</p></span><span className="status">
  <img src={serving} className="serve" alt="Now Serving" />
  <span className="status-info">
    <span className="status-text">Now Serving!</span>
    <span className="update">🟢Just now</span>
  </span>
</span></li>
            <li><span className="name">Juan Dela Cruz<p>Order #678</p></span><span className="status">
  <img src={preparing} className="prepare" alt="Preparing" />
  <span className="status-info">
    <span className="status-text">Preparing...</span>
    <span className="update">🟡5 mins ago</span>
  </span>
</span></li>
          </ul>
				</div>
		</div>
	{ /* Payment */ }
		<div className="panel">

			<h3>Payment</h3>

				<div className="search-bar">
        <img src={search} className="search" alt="Search" />
				<input
					type="text"
					placeholder="search payment"
					className="input"
					/>
      </div>
				<div className="payment-list">
          <div className="payment">
						<ul className="item-invoice">
							<li><span className="name">Steve Rogers<p>Order #900</p></span><button className="pay-btn">Payment</button></li>
							<li><span className="name">Tony Stark<p>Order #112</p></span><button className="pay-btn">Payment</button></li>
							<li><span className="name">Bruce Banner<p>Order #223</p></span><button className="pay-btn">Payment</button></li>
							<li><span className="name">Stan Lee<p>Order #344</p></span><button className="pay-btn">Payment</button></li>
              				<li><span className="name">Sam Wilson<p>Order #456</p></span><button className="pay-btn">Payment</button></li>
						</ul>
					</div>
				</div>
		</div>
</section>
  )
}

export default OrderList
