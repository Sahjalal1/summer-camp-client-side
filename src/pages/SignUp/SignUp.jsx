import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth"
import { useState } from "react";

const SignUp = () => {
    const { createUser, updateUserProfile } = useAuth()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [show, setHide] = useState(false)


    const onSubmit = data => {
        if(data.password === data.confirmpassword){
            createUser(data.email, data.password)
            .then(result => {
                console.log(result)
                updateUserProfile(data.name, data.photoURL)
                .then(result => {
                        const saveUser = { name: data.name, email: data.email, imgURl: data.photoURL, role: 'student'}
                        console.log("20line", saveUser)
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    // Swal.fire({
                                    //     position: 'top-end',
                                    //     icon: 'success',
                                    //     title: 'User created successfully.',
                                    //     showConfirmButton: false,
                                    //     timer: 1500
                                    // });
                                    // navigate('/');
                                }
                            })



                    })
                    .catch(error => console.log(error))

            })
            .catch(error => console.log(error)) 
        }
        else{
            alert('rss')
        }
            

    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content lg:w-[450px]">
                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} placeholder="Name" className="py-3 px-3 " />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">PhotoURL</span>
                            </label>
                            <input type="text" {...register("photoURL", { required: true })} placeholder="PhotoURL" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" {...register("password", {
                                    required: true,
                                    minLength: 6,                           
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}                  
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" {...register("confirmpassword", { required: true })} placeholder="Confirm Password" className="input input-bordered" />
                            <label className="label">
                                <h2 onClick={()=>setHide(!show)}>rahim</h2>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Sign Up" />
                        </div>

                        <div>
                            <h2>Login <Link to='/login'>This Link </Link></h2>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;