import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";




const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const {signIn} = useContext(AuthContext)
    const [showorhide, setShoworhide] = useState(false)

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log('email', email, 'password',password)
        signIn(email, password)
        .then(result => {
            navigate(from, { replace: true })
            const user = result.user;
            console.log(user)   
        })
        .catch(error => {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: "wrong-password"
              })
        })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content lg:w-[450px]">
                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showorhide ? "text" : "password"} name="password" placeholder="password" className="input input-bordered" />
                            {
                                showorhide === true ? <h2 className="absolute lg:right-14 right-11 mt-12" onClick={() => setShoworhide(!showorhide)}><FaRegEye className="w-6 h-6"></FaRegEye></h2>
                                    : <h2 className="absolute lg:right-14 right-11 mt-12" onClick={() => setShoworhide(!showorhide)}><FaRegEyeSlash className="w-6 h-6"></FaRegEyeSlash></h2>
                            }
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="LogIn" />
                        </div>

                        <div>
                            <h2 className="link link-error"><Link to='/signup'> SignUp Link </Link></h2>
                        </div>

                            <SocialLogin></SocialLogin>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;