import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header  = () => {
    const {currentUser , logout} = useAuth();
    <header className="bg-blue text-black">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-3xl font-bold">Social App</Link>;
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    {currentUser ? (
                        <>
                        <li><Link to="/create-post">Create Post</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><button onClick={logout}>Logout</button></li>
                        </>
                    ) : (
                        <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to = "/register">Register</Link>
                        </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    </header>
}

export default Header;