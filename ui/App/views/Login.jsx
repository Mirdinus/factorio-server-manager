import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import user from "../../api/resources/user";
import Button from "../elements/Button";
import {useHistory, useLocation} from "react-router";
import Panel from "../elements/Panel";

const Login = ({handleLogin}) => {
    const {register, handleSubmit, errors} = useForm();
    const history = useHistory();
    const location = useLocation()

    const onSubmit = async data => {
        const status = await user.login(data)
        if (status.success) {
            handleLogin()
            history.push('/')
        }
    };

    // on mount check if user is authenticated
    useEffect(() => {
        user.status().then(status => {
            if (status.success) {
                handleLogin()
                history.push(location?.state?.from || '/');
            }
        })
    }, [])

    return (
        <div className="h-screen overflow-hidden flex items-center justify-center bg-banner">
            <Panel
                title="Login"
                content={
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input className="shadow appearance-none border w-full py-2 px-3 text-black"
                                   ref={register({required: true})}
                                   id="username"
                                   name="username"
                                   type="text" placeholder="Username"/>
                            {errors.password && <span className="block text-red">Username is required</span>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none w-full py-2 px-3 text-black"
                                ref={register({required: true})}
                                name="password"
                                id="password" type="password" placeholder="******************"/>
                            {errors.password && <span className="block text-red">Password is required</span>}
                        </div>
                        <div className="text-center">
                            <Button type="success" className="w-full" isSubmit={true}>Sign In</Button>
                        </div>
                    </form>
                }
            />
        </div>
    );
};

export default Login;