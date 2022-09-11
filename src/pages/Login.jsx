import React from "react";
import {useNavigate, Link} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";

const Login = () => {
    const [err, setErr] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (e) {
            setErr(true)
        }

    };

    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <span className="logo">Lama chat</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder={'enter email'}/>
                    <input type="password" placeholder={'enter password'}/>
                    <button>Sign in</button>
                    {err && <span>can't login right now</span>}
                </form>
                <p>you don't have an account? <Link to='/register'>Register</Link></p>
            </div>
        </div>
    )
}

export default Login;
