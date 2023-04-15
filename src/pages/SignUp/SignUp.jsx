import { useState } from "react";
import { useUsers } from "hooks/useUsers";
import FormInput from "components/FormInput";
import { inputs } from "pages/SignUp/signUpFormInputs";
import yellowSwLogo from "assets/yellow-sw-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import "../RegisterForm.scss";

const initialUserDetailsState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUp() {
  const [values, setValues] = useState(initialUserDetailsState);
  const { setUsers } = useUsers();

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers((prev) => [...prev, values]);
    setValues(initialUserDetailsState);
    alert("User created, you can login now");
    navigate("/login");
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <form className="register-form" onSubmit={handleSubmit} action="">
      <div className="register-form__inner-wrapper">
        <img className="register-form__img" src={yellowSwLogo} alt="logo" />
        <h1 className="register-form__title">CREATE YOUR ACCOUNT</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={handleChange}
            className="register-form__input-field"
            pattern={
              input.name === "confirmPassword" ? values.password : input.pattern
            }
          />
        ))}
        <button type="submit">Create Account</button>
        <div className="register-form__signin-link">
          <p>Already have an account?</p>
          <span>
            <Link to="/login">Sign In</Link>
          </span>
        </div>
      </div>
    </form>
  );
}
