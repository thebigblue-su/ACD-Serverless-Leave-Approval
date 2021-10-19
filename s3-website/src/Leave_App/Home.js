import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import Cards from './Components/Cards';
import CreateRequest from './CreateRequest';
import RequestCond from './ManageRequest/RequestCond';



const Home = () => {
  const loc = useLocation();
  const [navLink, setNavLink] = useState(true);

  useEffect(() => {
    if (loc.pathname === '/pending-request') {
      setNavLink(true);
    } else {
      setNavLink(false);
    }
  }, [loc]);


  

  return <section className="home">
    <div className="cards--section mb-3">
      <Cards />
    </div>

    <main className="request--table">
      <article className="row">
        <div className="request--text col-md-3">
          <h2><NavLink className={`lists ${navLink ? 'list--color' : ''}`} to="/pending-request">Pending Requests</NavLink></h2>
          <h2><NavLink className={`lists ${!navLink ? 'list--color' : ''}`} to="/all-request">All Requests</NavLink></h2>
        </div>
        <CreateRequest />
      </article>

      <RequestCond />
    </main>
  </section>
}

export default Home;
