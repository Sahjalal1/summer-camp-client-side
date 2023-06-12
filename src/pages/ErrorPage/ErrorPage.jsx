import { Link } from "react-router-dom";
import errorpageimg from "../../assets/error/245605a1.jpg"

const ErrorPage = () => {
    return (
        <div className="text-center w-screen">
            <img className=" w-screen h-[800px]" src={errorpageimg} alt="" />
            <Link to="/" className="btn bg-error"> Go to the Home</Link>
        </div>
    );
};

export default ErrorPage;