import React from 'react';
import logo from '../../../res/images/logo.png';
import {alertActions} from "../../actions/alert.actions";
import {connect} from "react-redux";

const Home = (props) => (
    <main role="main">
        <img src={logo} />
        <h1> Diary Home</h1>
        <p>
            This is homepage of TheDiary project.
            See details <a href="https://github.com/barthap/TheDiary">here</a>.
        </p>
        <button onClick={()=>props.showAlert("Hello")}>Click me</button>
    </main>
);

function mapDispatchToProps(dispatch) {
    return {
        showAlert: (message) => dispatch(alertActions.success(message))
    }
}
export default connect(null, mapDispatchToProps)(Home);
