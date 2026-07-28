import './Dashboard.css'
import Greetings from '../../components/MainInterface/Greetings'
import InfoCards from '../../components/MainInterface/InfoCards'
import orderBell from '../../assets/orderBell.png'
import money from '../../assets/money.png'
import alarmclock from '../../assets/alarm-clock.png'

const Dashboard = () => {
    
    return (
        <div className="dashboard">        
              <section className="body">
                        {/* Left Section */}
                                <div className="left-section">
                                        <Greetings />
                                        <div className="info-Cards">
                                                <InfoCards title="Recent Orders" icon={<img src={orderBell} className="orderBell" alt="orderBell" />} number={16} footerNum={35}/>
                                                <InfoCards title="Total Sales" icon={<img src={money} className="money" alt="money" />} number={50} footerNum={4}/>
                                                <InfoCards title="Waiting List" icon={<img src={alarmclock} className="alarmclock" alt="alarmclock" />} number={7} footerNum={2}/>
                                        </div>
                                </div>
                         {/* Right Section */}
                                <div className="right-section">
                                        
                                </div>
                </section>
        </div>                 
    )
}

export default Dashboard;