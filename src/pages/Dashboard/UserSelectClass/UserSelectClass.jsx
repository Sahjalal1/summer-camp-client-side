import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";


const UserSelectClass = () => {
    const { user } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()

    const { data: selectClasses = [], refetch } = useQuery(['selectClasses'], async () => {
        const res = await axiosSecure.get(`/addclass/${user?.email}`)
        return res.data;
    })
    console.log(selectClasses)

    const handelDelete = id => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/deleteitem/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Good job!',
                                'You clicked the button!',
                                'success'
                            )
                        }
                    })
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }


    return (
        <div>
            <div className="w-[300px] lg:w-[330px] mx-auto">
                <h1 className="text-center text-4xl my-16 leading-tight border-x-4 border-error">
                    M<span className="text-error font-serif">y</span> Se<span className="text-error font-serif">l</span>ect
                    Cl<span className="text-error font-serif">as</span>ses</h1>
            </div>
            {
                selectClasses.length === 0 && <h2 className="text-center text-error text-2xl lg:text-4xl mt-48">You have not added a cart {selectClasses.length}</h2>
            }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {

                    selectClasses?.map(select => <div key={select._id} className="w-[90%] mx-auto lg:w-[400px] shadow-2xl rounded-lg">
                        <figure><img src={select.imgURL} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Name : {select.classname}</h2>
                            <p>Email : {select.email}</p>
                            <p>Email : {select.price}</p>
                            <div className="card-actions justify-end">
                                <button onClick={() => handelDelete(select._id)}>Delete Item</button>
                                <Link to={`/dashboard/payment/${select._id}`}><button className="">payment</button></Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default UserSelectClass;