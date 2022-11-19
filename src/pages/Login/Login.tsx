import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { login, reset } from "../../features/auth/authReducer";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { User } from "../../types.d";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [input, setInput] = useState<Partial<User>>({
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const { user, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setErr(message);
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

    dispatch(login(input));
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Web Social</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, in
            optio.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="password"
            />
            {err}
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
