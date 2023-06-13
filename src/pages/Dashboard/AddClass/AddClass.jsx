import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";



const AddClass = () => {
    const {user}= useContext(AuthContext)
    const [axiosSecure]= useAxiosSecure()

    const handelSubmit = event =>{
        event.preventDefault();
        const form = event.target;
        const imgURL = form.imgURL.value;
        const classname = form.classname.value;
        const instructorname = form.instructorname.value;
        const instructoremail = form.instructoremail.value;
        const availableseats = form.availableseats.value;
        const price = form.price.value;
        console.log(imgURL, classname, instructorname, instructoremail, availableseats, price)
        const newClass = {imgURL, classname, instructorname, instructoremail, availableseats, price, status:'pending', TotalEnrolled: '0'}

        axiosSecure.post('/classes', newClass)
                .then(data => {
                    console.log('after posting new menu item', data.data)
                    if(data.data.insertedId){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Item added successfully',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
    }
    return (
        <div>
            <form onSubmit={handelSubmit} className="bg-black p-10 mx-20 my-20">
                <div className="lg:flex">
                    <div className="form-control md:w-1/2 lg:ml-4 ">
                        <label className="label">
                            <h1 className="text-xl text-white font-extrabold">Class imgURL</h1>
                        </label>
                        <input className="px-3 py-2" type="text" placeholder="Class imgURL" name="imgURL" required />
                    </div>
                    <div className="form-control md:w-1/2 lg:ml-4 ">
                        <label className="label">
                            <h1 className="text-xl text-white font-extrabold">Class Name</h1>
                        </label>
                        <input className="px-3 py-2" type="text" placeholder="Class Name" name="classname" required />
                    </div>
                </div>
                <div className="lg:flex mt-7">
                    <div className="form-control md:w-1/2 lg:ml-4 ">
                        <label className="label">
                            <h1 className="text-xl text-white font-extrabold">Instructor Name</h1>
                        </label>
                        <input defaultValue={user?.displayName} className="px-3 py-2 font-semibold" type="text" placeholder="Instructor Name" name="instructorname" required />
                    </div>
                    <div className="form-control md:w-1/2 lg:ml-4 ">
                        <label className="label">
                            <h1 className="text-xl text-white font-extrabold">Instructor Name</h1>
                        </label>
                        <input defaultValue={user?.email} className="px-3 py-2 font-semibold" type="text" placeholder="Instructor Email" name="instructoremail" required />
                    </div>
                </div>
                <div className="lg:flex mt-7">
                    <div className="form-control md:w-1/2 lg:ml-4 ">
                        <label className="label">
                            <h1 className="text-xl text-white font-extrabold">Available Seats</h1>
                        </label>
                        <input className="px-3 py-2 font-semibold" type="number" placeholder="Available Seats => Just Number" name="availableseats" required />
                    </div>
                    <div className="form-control md:w-1/2 lg:ml-4 ">
                        <label className="label">
                            <h1 className="text-xl text-white font-extrabold">Class Name</h1>
                        </label>
                        <input className="px-3 py-2 font-semibold" type="number" placeholder="Price" name="price" required />
                    </div>
                </div>
                <div className="form-control lg:w-[50%] text-center lg:ml-4 bg-white mt-4">
                    <input className="py-5" type="submit" value="Add Cart" />
                    </div>
            </form>
        </div>
    );
};

export default AddClass;