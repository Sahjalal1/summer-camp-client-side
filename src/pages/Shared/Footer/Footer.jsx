

const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-200 text-base-content mt-20">
            <div>
                <img className="w-20 h-20" src="data:image/png;base64,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" alt="" />
                <p>MUSIC INSTRUMENT LEARNING SCHOOL<br />Providing reliable tech since 2022</p>
            </div>
            <div>
                <span className="footer-title">Services</span>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </div>
            <div>
                <span className="footer-title">Company</span>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </div>
            <div>
                <span className="footer-title">Legal</span>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </div>
        </footer>
    );
};

export default Footer;