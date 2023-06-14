import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";


const PopularClasses = () => {
    const {user}= useContext(AuthContext)
    const navigate = useNavigate
    const [classes, setClasses]= useState([])
    const [refetch, setRefetch]= useState('')
    const token = localStorage.getItem('access-token')
    const [role, setRole]= useState()


    useEffect(()=>{
        fetch(`https://summer-sarver-mdsahjalalrahim-gmailcom.vercel.app/users/${user?.email}`,{ headers: {
                     authorization: `bearer ${token}`}})
            .then(res=> res.json()).then(data => {
                const dat = data[0].role
                setRole(dat)
        })
       },[user,token])


    useEffect(() => {
        fetch('https://summer-sarver-mdsahjalalrahim-gmailcom.vercel.app/approveclasses')
            .then(res => res.json()).then(data => {
              const datas = data.sort((a,b)=> a.TotalEnrolled <b.TotalEnrolled ? 1 : -1)
                const sdata = datas.slice(0, 6)
                setClasses(sdata)
            })
    }, [refetch])

    const handelAddCart = item => {
        console.log(item)
        const { _id, classname, imgURL, price, availableseats, TotalEnrolled,instructoremail,instructorname,status } = item
        console.log(imgURL)
        if (user && user.email) {
            const data = { classId: _id, classname, imgURL, price, availableseats, TotalEnrolled,instructoremail,instructorname,status, email: user.email }
            console.log(data)
            fetch('https://summer-sarver-mdsahjalalrahim-gmailcom.vercel.app/addclass', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        setRefetch(data.insertedId)
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Food added on the cart.',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please login to order the food',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }

    return (
        <div className="w-[80%]  mx-auto  lg:px-20 lg:py-16">
            <div className="lg:w-[400px] mx-auto">
                <h1 className="text-center text-4xl my-16 leading-tight border-x-4 border-error">Po<span className="text-error font-serif">pu</span>lar Cl<span className="text-error font-serif">as</span>ses</h1>
            </div>
        
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                    classes.map(classe => <div key={classe._id} className="lg:w-[400px] shadow-2xl rounded-2xl">
                        <figure><img  className="w-full h-[250px]" src={classe.imgURL} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Name : {classe.classname}</h2>
                            <p>Instructor Name : {classe.instructorname}</p>
                            <p>Available Seats : <span className="text-error">{classe.availableseats}</span></p>
                            <p>TotalEnrolled : <span className="text-error">{classe.TotalEnrolled}</span></p>
                            <p>Price : <span className="text-error">{classe.price}</span></p>
                            <div className="card-actions justify-end">
                               {
                                classe.availableseats === 0 || role === 'admin' || role === 'instructor' ?  <button disabled  className="btn btn-error">Booking</button>
                                :  <button onClick={() => handelAddCart(classe)} className="btn btn-primary">Booking</button>
                               }
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>

            
        </div>
    );
};

export default PopularClasses;