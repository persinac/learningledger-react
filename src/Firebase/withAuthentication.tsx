import React from "react";
import {db, firebase} from "./index";
import { authUserContext } from "./AuthUserContext";
import * as routes from "../Constants/routes";

interface InterfaceProps {
    authUser?: any;
}

interface InterfaceState {
    authUser?: any;
}

export const withAuthentication = (Component: any) => {
    class WithAuthentication extends React.Component<
        InterfaceProps,
        InterfaceState
        > {
        constructor(props: any) {
            super(props);

            this.state = {
                authUser: null
            };
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

        public render() {
            const { authUser } = this.state;
            return (
                <authUserContext.Provider value={authUser}>
                    <Component />
                </authUserContext.Provider>
            );
        }
    }
    return WithAuthentication;
};
