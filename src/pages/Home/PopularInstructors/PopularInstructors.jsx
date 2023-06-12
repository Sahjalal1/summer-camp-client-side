import { useEffect, useState } from "react";


const PopularInstructors = () => {
    const [instructors, setInstructors] = useState([])

    useEffect(() => {
        fetch('https://summer-sarver-mdsahjalalrahim-gmailcom.vercel.app/instructors',)
            .then(res => res.json()).then(data => {
                const sdata = data.slice(0, 6)
                setInstructors(sdata)
                console.log('slice', sdata)
            })
    }, [instructors])


    return (
        <>
        {
             instructors.length === 0 ? <div className="flex justify-center mx-auto "><span className="loading loading-spinner loading-lg"></span></div> :
             <div className="w-[80%] mx-auto">
            <div className="lg:w-[400px] mx-auto">
                <h1 className="text-center text-4xl my-16 leading-tight border-x-4 border-error">A<span className="text-error font-serif">L</span>L IN<span className="text-error font-serif">STR</span>UC<span className="text-error font-serif">T</span>OR</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    instructors?.map(instructor => <div key={instructor._id} className="lg:w-[400px] shadow-2xl rounded-lg">
                    <figure><img className="w-full h-[250px]" src={instructor.imgURL} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Name : {instructor.name}</h2>
                        <p>Email : {instructor.email}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">See Classes</button>
                        </div>
                    </div>
                </div>
                )
                }
            </div>

        </div>
        }
        </>
    );
};

export default PopularInstructors;