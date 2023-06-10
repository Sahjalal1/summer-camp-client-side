import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";


const Classes = () => {
    const { user } = useContext(AuthContext)
    const [classes, setClasses] = useState([])
    console.log(classes)

    useEffect(() => {
        fetch('http://localhost:5000/approveclasses')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])

    const handelAddCart = item => {
        console.log(item)
        const { _id, name, img, price, AvailableSeats } = item
        if (user && user.email) {
            const data = { classId: _id, name, img, price, AvailableSeats, email: user.email }
            fetch('http://localhost:5000/addclass', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        alert('done')
                        // refetch(); // refetch cart to update the number of items in the cart.
                        // Swal.fire({
                        //     position: 'top-end',
                        //     icon: 'success',
                        //     title: 'Food added on the cart.',
                        //     showConfirmButton: false,
                        //     timer: 1500
                        // })
                    }
                })
        }
        else {
            alert('soy')
            // Swal.fire({
            //     title: 'Please login to order the food',
            //     icon: 'warning',
            //     showCancelButton: true,
            //     confirmButtonColor: '#3085d6',
            //     cancelButtonColor: '#d33',
            //     confirmButtonText: 'Login now'
            // }).then((result) => {
            //     if (result.isConfirmed) {
            //         navigate('/login', { state: { from: location } })
            //     }
            // })
        }
    }


    return (
        <div className="w-[80%] mx-auto">
            <div className="lg:w-[350px] mx-auto">
                <h1 className="text-center text-4xl my-16 leading-tight border-x-4 border-error">A<span className="text-error font-serif">L</span>L Cl<span className="text-error font-serif">AS</span>SES</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    classes.map(classe => <div key={classe._id} className="w-[400px] shadow-2xl rounded-lg">
                        <figure><img src={classe.imgURL} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Name : {classe.classname}</h2>
                            <p>Name : {classe.instructorname}</p>
                            <p>Available Seats : <span className="text-error">{classe.availableseats}</span></p>
                            <p>Price : <span className="text-error">{classe.price}</span></p>
                            <div className="card-actions justify-end">
                                <button onClick={() => handelAddCart(classe)} className="btn btn-primary">See Classes</button>
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>

        </div>
    );
};

export default Classes;