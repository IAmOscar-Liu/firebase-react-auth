import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


// const PrivateRoute = ({ component: Component, ...rest }:any) => {
//     const { currentUser } = useAuth();

//     return (
//         <Route
//             {...rest}
//             render = {props => {
//                 return currentUser ? <Component {...props}/> : <Redirect to='/login'/>
//             }}
//         />
//     );
// }

interface PrivateRouteProps extends RouteProps {}

export const PrivateRoute: React.FC<PrivateRouteProps> = props => {
    const { currentUser } = useAuth();

    if (currentUser) {
        return <Route {...props}/>;
    } else {
        const redirectComponent = () => <Redirect to='/login'/>;
        return <Route {...props} component={redirectComponent}/>;
    }

}

export default PrivateRoute;