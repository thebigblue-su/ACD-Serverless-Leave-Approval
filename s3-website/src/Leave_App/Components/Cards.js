import React, { useContext } from 'react';
import { GlobalContext } from '../Context';
import './Components.css';


const Cards = () => {
  const { data } = useContext(GlobalContext);




  const card_fun = (text, num, color) => {
    return <div className="col-md-3 mb-4">
      <div className="card border-left-primary shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className={`text-large font-weight-bold text-uppercase mb-1 text-${color}`}>
                Request ({text})
              </div>
              <div className="h2 mb-0 font-weight-bold text-gray-800">{num}</div>
            </div>
            <div className="col-auto">
              <i className="fas fa-calendar fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  }


  return <div className="card--div row">
    {card_fun('Total', data.log && data.log.length, 'info')}
    {card_fun('Pending', data.pendingRequests && data.pendingRequests.length, 'warning')}
  </div>
}

export default Cards
