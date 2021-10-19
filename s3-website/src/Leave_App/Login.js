/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useHistory } from 'react-router';
import jwt from 'jsonwebtoken';




const Login = () => {
  const history = useHistory();
  var getParams = window.location.hash;
  var getUrl = window.location.href;


  const checkMan = (token) => {
    var check_access_1 = token && token.split('&')[0];
    var get_access_token = check_access_1 && check_access_1.replace('#id_token=', '');
    var decode2 = jwt.decode(get_access_token);

    localStorage.setItem('tokens', JSON.stringify(token));
    localStorage.setItem('users', JSON.stringify(decode2));
    history.replace('/', getUrl);
  };


  useEffect(() => {
    if (getParams) {
      checkMan(getParams);
    }
  }, []);


  return (
    <div className="text-center">
      <button className="btn" style={{ fontSize: 30, marginTop: '15%', textTransform: 'capitalize' }}>
        <a className="text-dark"
          href="https://acdleaveapproval.auth.ap-south-1.amazoncognito.com/login?client_id=970g1b8h3a28f0ggkkfl06dau&response_type=token&redirect_uri=http://localhost:3000">
          Login here
        </a>
      </button>
    </div>
  )
}

export default Login
