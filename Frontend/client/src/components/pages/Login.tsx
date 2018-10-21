import * as React from "react";
import '../../../res/scss/Login-Form-Dark.css';
import AlertBox from "../ui/AlertBox";

const Login = () => (
    <main role="main" className="main">
        <div className="login-dark">

            <form method="post">

                <h2 className="sr-only">Login Form</h2>
                <div className="illustration"><i className="icon ion-ios-locked-outline"/></div>
                <div className="form-group"><input className="form-control" type="email" name="email"
                                                   placeholder="Email"/></div>
                <div className="form-group"><input className="form-control" type="password" name="password"
                                                   placeholder="Password"/></div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block" type="submit">Log In</button>
                </div>
                <a href="#" className="forgot">Forgot your email or password?</a>
            </form>
        </div>

    </main>
);

export default Login;