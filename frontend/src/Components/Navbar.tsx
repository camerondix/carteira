import { BsCalendar3Range, BsCreditCard, BsPiggyBank, BsWallet2 } from "react-icons/bs";
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="text-xl pt-2 px-3 lg:sticky top-0 w-full z-40 bg-primary dark:bg-primaryDark text-superLightPrimary dark:text-superLightPrimaryDark">
            <div className="container px-4 mx-auto">
                <div className="flex flex-wrap md:mx-20 lg:mx-32 items-center justify-center md:justify-start">
                    <NavLink className="items-center mr-auto w-12 h-12 [&.active]:text-darkPrimary dark:[&.active]:text-darkPrimaryDark hover:text-lightPrimary dark:hover:text-lightPrimaryDark" to="/" title="About">
                        <BsWallet2 className="w-11 h-11 mx-auto" />
                    </NavLink>
                    <ul className="flex justify-center space-x-6">
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
                </div>
            </div>
        </nav>
    )
}

export default Navbar
