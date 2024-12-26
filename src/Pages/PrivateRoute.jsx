import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { AppContext } from "../Context/AppContext";

const PrivateRoute = ({ element }) => {
    const { user } = useContext(AppContext);
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 100);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!user) {
        const currentPath = location.pathname;
        localStorage.setItem("redirectPath", currentPath);
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return element;
};

export default PrivateRoute;