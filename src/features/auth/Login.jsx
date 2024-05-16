import React from "react";
import { useRef, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authApiSlice";

import { useDispatch } from "react-redux";

import { setCredentials } from "./authSlice";

import Loading from "../../app/components/LoadingComponent";

const Login = () => {
  const userRef = useRef();

  const errRef = useRef();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, email }));
      setEmail("");
      setPassword("");
      navigate("/welcome");
    } catch (error) {
      if (!error?.response) {
        setErrorMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrorMsg("Missing Username and Password");
      } else if (error.response?.status === 401) {
        setErrorMsg("Unauthorized");
      } else {
        setErrorMsg("Login Failed");
      }
      //   errRef.current.focus();
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);

  const handlePasswordInput = (e) => setPassword(e.target.value);

  const content = isLoading ? (
    <Loading />
  ) : (
    // <h1>Loading...</h1>
    <section className="login">
      <div className="flex justify-center items-center min-h-screen">
        <div className="wrapper md:w-[400px] md:h-[440px]">
          <div className="form-box login">
            <p ref={errRef} className={errorMsg ? "errorMsg" : "offScreen"}></p>
            <h2 className="text-center 12pro:text-2xl md:text-3xl">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <input
                  type="text"
                  name="email"
                  id="email"
                  ref={userRef}
                  value={email}
                  onChange={handleEmailInput}
                  required
                />
                <label htmlFor="email" className="font-semibold">
                  Email
                </label>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordInput}
                  required
                />
                <label htmlFor="" className="font-semibold">
                  Password
                </label>
              </div>
              <div className="flex justify-center flex-col">
                <div>
                  {errorMsg && (
                    <p className="flex justify-center text-red-500 font-medium">
                      {errorMsg}
                    </p>
                  )}
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="12pro:text-lg md:text-xl login-btn"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );

  return content;
};

export default Login;
// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useLoginMutation } from "./authApiSlice";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "../auth/authSilce";

// const Login = () => {
//   const userRef = useRef();
//   const errRef = useRef();
//   const [email, setEmail] = useState("");
//   const [password, setPwd] = useState("");
//   const [errMsg, seterrMsg] = useState("");
//   const navigate = useNavigate();

//   const [login, { isLoading }] = useLoginMutation();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     userRef.current.focus();
//   }, []);

//   useEffect(() => {
//     seterrMsg("");
//   }, [email, password]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const userData = await login({ email, password }).unwrap();
//       dispatch(setCredentials({ ...userData, email }));
//       setEmail("");
//       setPwd("");
//       navigate("/products/0");
//     } catch (err) {
//       if (!err?.response) {
//         seterrMsg("No Server Response");
//       } else if (err.response?.status === 400) {
//         seterrMsg("Missing Username or Password");
//       } else if (err.response?.status === 401) {
//         seterrMsg("Unauthorized");
//       } else {
//         seterrMsg("Login Failed");
//       }
//       errRef.current.focus();
//     }
//   };

//   const content = isLoading ? (
//     <h1>Loading...</h1>
//   ) : (
//     <section>
//       <p
//         ref={errRef}
//         className={errMsg ? "errmsg" : "offscreen"}
//         aria-label=""
//       />

//       <h1>Login</h1>
//       <form
//         className="flex flex-col items-center gap-4 p-10"
//         onSubmit={handleSubmit}
//       >
//         yp
//         <div>
//           <input
//             name="email"
//             type="text"
//             ref={userRef}
//             value={email}
//             placeholder="Username"
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <input
//             name="password"
//             type="password"
//             value={password}
//             placeholder="Password"
//             onChange={(e) => setPwd(e.target.value)}
//             required
//           />
//         </div>
//         <button className="bg-sky-500 rounded px-8" type="submit">
//           Login
//         </button>
//       </form>
//     </section>
//   );

//   return content;
// };

// export default Login;
