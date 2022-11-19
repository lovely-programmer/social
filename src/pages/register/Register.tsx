import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { User } from "../../types.d";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { register, reset } from "../../features/auth/authReducer";

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [input, setInput] = useState<User>({
    username: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null)

  const { user, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setErr(message)
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(register(input));
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Web Social</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, in
            optio.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              required
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              required
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              required
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            {err}
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
