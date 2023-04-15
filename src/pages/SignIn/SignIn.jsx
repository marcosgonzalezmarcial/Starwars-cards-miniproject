import { useState } from "react";
import { useUsers } from "hooks/useUsers";
import FormInput from "components/FormInput";
import { inputs } from "pages/SignIn/signInFormInputs";
import yellowSwLogo from "assets/yellow-sw-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import "../RegisterForm.scss";

const initialUserDataState = { email: "", password: "" };

export default function SignIn() {
  const { setLoggedIn, isUserRegistered = false } = useUsers();
  const [values, setValues] = useState(initialUserDataState);

  let navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isRegistered = isUserRegistered({ user: values });
    if (isRegistered === false) {
      alert("El usuario introducido no existe");
      return;
    }
    setLoggedIn(true);
    alert("El usuario se registró correctamente");
    navigate("/");
    setValues(initialUserDataState);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit} action="">
      <div className="register-form__inner-wrapper">
        <img className="register-form__img" src={yellowSwLogo} alt="logo" />
        <h1 className="register-form__title">SIGN IN</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={handleChange}
            className="register-form__input-field"
          />
        ))}

        <button disabled={false} type="submit">
          Sign In
        </button>
        <div className="register-form__signup-link">
          <Link to="/signup">Create an account</Link>
        </div>
      </div>
    </form>
  );
}

// anterior

// return (
//   <form className={`register-form `} onSubmit={handleSubmit}>
//     <div className="register-form__inner-wrapper">
//       <img className="register-form__img" src={yellowSwLogo} alt="logo" />
//       <h1 className="register-form__title">SIGN IN</h1>
//       <input
//         className="register-form__input-field"
//         onChange={handleChangeEmail}
//         placeholder="Email Address"
//         type="email"
//         value={userData.email}
//         required={true}
//       />
//       {emailErrorMessage && <p style={{ color: "red" }}>{emailErrorMessage}</p>}
//       <input
//         className="register-form__input-field"
//         onChange={handleChangePassword}
//         placeholder="Password"
//         type="password"
//         value={userData.password}
//         required={true}
//       />
//       {passwordErrorMessage && (
//         <p style={{ color: "red" }}>{passwordErrorMessage}</p>
//       )}
//       <button disabled={areValidCredentials()} type="submit">
//         Sign In
//       </button>
//       <div className="register-form__signup-link">
//         <Link to="/signup">Create an account</Link>
//       </div>
//     </div>
//   </form>
// );
