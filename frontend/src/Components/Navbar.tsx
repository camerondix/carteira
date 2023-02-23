import { BsCalendar3Range, BsCreditCard, BsPiggyBank } from "react-icons/bs";
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="text-xl pt-2 sticky top-0 w-full z-40 bg-primary dark:bg-primaryDark text-superLightPrimary dark:text-superLightPrimaryDark">
            <ul className="flex w-full md:w-6/12 lg:w-4/12 mx-auto justify-around">
                <li className="hidden hover:text-lightPrimary dark:hover:text-lightPrimaryDark">
                    <NavLink className="[&.active]:text-darkPrimary dark:[&.active]:text-darkPrimaryDark [&.active]:border-b-4 [&.active]:border-darkPrimary dark:[&.active]:border-darkPrimaryDark" to="/budgets" title="Budgets">
                        <BsCalendar3Range className="w-8 h-8 mx-auto" />
                        <small className="block text-s">Budget</small>
                    </NavLink>
                </li>
                <li className="flex hover:text-lightPrimary dark:hover:text-lightPrimaryDark">
                    <NavLink className="[&.active]:text-darkPrimary dark:[&.active]:text-darkPrimaryDark [&.active]:border-b-4 [&.active]:border-darkPrimary dark:[&.active]:border-darkPrimaryDark" to="/transactions" title="Transactions">
                        <BsCreditCard className="w-8 h-8 mx-auto" />
                        <small className="block text-s">Transactions</small>
                    </NavLink>
                </li>
                <li className="flex hover:text-lightPrimary dark:hover:text-lightPrimaryDark">
                    <NavLink className="[&.active]:text-darkPrimary dark:[&.active]:text-darkPrimaryDark [&.active]:border-b-4 [&.active]:border-darkPrimary dark:[&.active]:border-darkPrimaryDark" to="/accounts" title="Accounts">
                        <BsPiggyBank className="w-8 h-8 mx-auto" />
                        <small className="block text-s">Accounts</small>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
