import { Fragment } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';


const LoginRoute = () => {
    return (
        <Fragment>
            {
                localStorage.getItem('token') ? <AuthLayout>
                    <Outlet />
                </AuthLayout> : <Navigate to='/login' />
            }
        </Fragment>

    )
};

export default LoginRoute