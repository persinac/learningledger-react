import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as firebase from "../../Firebase/firebase";
import { Navigation } from '../Navigation/Navigation';
import { SignUp } from '../SignUp';
import { SignIn } from '../SignIn';
import { PasswordForget }from '../PasswordForget';
import { Home } from '../Home';
import { Account } from '../Account';
import { AdminPage } from '../Admin';
import { IAppState } from '../../State';
import '../../Styles/general.css';

import * as ROUTES from '../../Constants/routes';
import {withAuthentication} from "../../Firebase/withAuthentication";
import {db} from "../../Firebase";

interface IProps {
	history?: any;
}

class AppComponent extends React.Component<any, IAppState> {
	constructor(props: any) {
		super(props);
		this.state = { authUser: null };
	}

	public componentDidMount() {
		firebase.auth.onAuthStateChanged(authUser => {
			db
				.getUserById(authUser.uid)
				.then(snapshot => {
					const dbUser = snapshot.val();
					// default empty roles
					if (!dbUser.roles) {
						dbUser.roles = {};
					}
					// merge auth and db user
					authUser = {
						uid: authUser.uid,
						email: authUser.email,
						roles: dbUser.roles,
						...dbUser
					};
					this.setState({authUser: authUser});
				});
		});
	}
	render () {
		if(this.state.authUser !== undefined) {
			return (
				<div className={"height-100"}>
					<Router>
						<div className={"height-100"}>
							<Navigation />
							<Route exact path={ROUTES.SIGN_UP} component={SignUp}/>
							<Route path={ROUTES.SIGN_IN} component={SignIn}/>
							<Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget}/>
							<Route path={ROUTES.HOME} component={Home}/>
							<Route path={ROUTES.ACCOUNT} component={Account}/>
							<Route path={ROUTES.ADMIN} component={AdminPage}/>
						</div>
					</Router>
				</div>
			);
		}
	}
}

export const App = withAuthentication(AppComponent);
