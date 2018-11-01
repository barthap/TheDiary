import * as React from "react";
import '../../../res/scss/Login-Form-Dark.css';
import {connect} from "react-redux";
import {IAuthState, LoginStatus} from "../../reducers/auth.reducer";
import {Dispatch} from "redux";
import {authActions, IAuthAction} from "../../actions/auth.actions";
import {IAppState} from "../../reducers";


interface ILoginPageProps {
    state: IAuthState;
    doLogin: (username: string, password: string) => void;
    doLogout: () => void;
}
interface ILoginPageState {
    username: string;
    password: string;
}

class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {

    public constructor(props: ILoginPageProps) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    private handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        if(event.target.name === "username")
            this.setState({username: event.target.value});
        else if(event.target.name === "password")
            this.setState({password: event.target.value});

    }

    private handleLogin(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const {username, password} = this.state;
        this.props.doLogin(username, password);
    }

    public componentWillMount() {
        this.props.doLogout();
    }

    public render()  {
        return (
            <main role="main" className="main">
                <div className="login-dark">

                    <form>

                        <h2 className="sr-only">Login Form</h2>
                        <div className="illustration">
                            <i className="icon ion-ios-locked-outline"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control"
                                   type="text" name="username"
                                   placeholder="Username"
                                    value={this.state.username}
                                    onChange={this.handleInputChange}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control"
                                   type="password" name="password"
                                   placeholder="Password"
                                    value={this.state.password}
                                   onChange={this.handleInputChange}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block"
                                onClick={this.handleLogin}>Log In</button>
                        </div>
                        {this.props.state.status === LoginStatus.FAIL &&
                        <p className="well alert-danger">Failed to login! Try again</p>
                        }
                    </form>
                </div>

            </main>
        );
    }

}

function mapStateToProps(state: IAppState) {
    return {
        state: state.auth
    }
}
function mapDispatchToProps(dispatch: Dispatch<IAuthAction>) {
    return {
        doLogin: (username: string, password: string) => dispatch(authActions.login(username, password)),
        doLogout: () => dispatch(authActions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);