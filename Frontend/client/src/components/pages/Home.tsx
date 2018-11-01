import * as React from 'react';
import * as logo from '../../../res/images/logo.png';
import {alertActions, IAlertAction} from "../../actions/alert.actions";
import {connect} from "react-redux";
import {IAppState} from "../../reducers";
import {Dispatch} from "redux";

type HomeProps = {
    name: string;
    showAlert: (message: string) => void;
}

const Home: React.SFC<HomeProps> = (props) => (
    <main role="main">
        <img src={logo} />
        <h1> Diary Home</h1>
        <h3>Hello, {props.name}</h3>
        <p>
             This is homepage of TheDiary project.
            See details <a href="https://github.com/barthap/TheDiary">here</a>.
        </p>
        <button onClick={()=>props.showAlert("Hello")}>Click me</button>
    </main>
);


const mapStateToProps = (state: IAppState) => ({
    name: state.auth.user.username
});
const mapDispatchToProps = (dispatch: Dispatch<IAlertAction>) => ({
    showAlert: (message: string) => dispatch(alertActions.success(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
