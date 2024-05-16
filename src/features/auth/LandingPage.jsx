import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "./authSlice";
import { Link } from "react-router-dom";

import React from "react";

const LandingPage = () => {
  const email = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const welcome = email ? `Welcome ${email}!` : "Welcome!";

  const tokenAbbr = `${token}...`;

  const content = (
    <section className="welcome">
      <h1>{welcome}</h1>
      <p>Token : {tokenAbbr}</p>
      <p>
        <Link to="/userslist">Go to Users List</Link>
      </p>
    </section>
  );

  return content;
};

export default LandingPage;
