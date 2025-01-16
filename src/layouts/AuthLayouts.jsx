import { Outlet } from "react-router-dom";


const AuthLayouts = () => {
    return (
        <div>
            <section>
                <Outlet></Outlet>
            </section>
        </div>
    );
};

export default AuthLayouts;