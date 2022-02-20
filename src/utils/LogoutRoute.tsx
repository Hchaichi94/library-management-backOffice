import { Fragment } from 'react';
import { Outlet, Navigate } from 'react-router-dom';


const LogoutRoute = () => {
    return (
        <Fragment>
            {
                localStorage.getItem('token') ? <Navigate to='/' /> : <Outlet />
            }
        </Fragment>

    )
};

export default LogoutRoute