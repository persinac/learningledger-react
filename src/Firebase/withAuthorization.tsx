import React from "react";
import {withRouter} from "react-router-dom";
import * as routes from "../Constants/routes";
import {firebase, db} from "./index";
import {authUserContext} from "./AuthUserContext";
import {ComponentType} from "react";
import {Roles} from "../State";

interface InterfaceProps {
	history?: any;
	roles?: Roles;
}

export const withAuthorization = (condition: any, routeRedirect?: any) => (Component: ComponentType, extras?: any) => {
	class WithAuthorization extends React.Component<InterfaceProps, {}> {
		constructor(props: InterfaceProps) {
			super(props);
		}

		public componentDidMount() {
			console.log("With Author: Here?");
			firebase.auth.onAuthStateChanged((authUser: any) => {
				db
					.getUserById(authUser.uid)
					.then(snapshot => {
						console.log("Author: 1");
						const dbUser = snapshot.val();
						// default empty roles
						console.log("Author: 2");
						if (!dbUser.roles) {
							dbUser.roles = {};
						}
						console.log("Author: 3");
						// merge auth and db user
						authUser = {
							uid: authUser.uid,
							email: authUser.email,
							...dbUser,
							...extras
						};
						console.log("Author: 4");
						let route = routeRedirect ? routeRedirect(authUser) : routes.SIGN_IN;
						console.log(this.props);
						// this.props.roles.isSales = dbUser.roles ? dbUser.roles['isSales'] : false;
						// this.props.roles.isAdmin = dbUser.roles ? dbUser.roles['isAdmin'] : false;
						console.log("Author: 5");
						if (!condition(authUser)) {
							this.props.history.push(route);
						}
						console.log("Author: 6");
					});
			})
		}

		public render() {
			return (
				<authUserContext.Consumer>
					{authUser => (authUser ? <Component {...authUser} /> : null)}
				</authUserContext.Consumer>
			);
		}
	}

	return withRouter(WithAuthorization as any);
};
