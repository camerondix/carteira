import { BsGithub, BsLinkedin } from "react-icons/bs"
import ThemeToggle from "./Shared/ThemeToggle"

function Footer() {
    return (
        <footer className="text-xl p-4 w-full z-40 bg-elevatedColor dark:bg-elevatedColorDark text-graySecondary dark:text-graySecondaryDark">
            <div className="container px-4 mx-auto">
                <div className="flex flex-wrap md:mx-20 lg:mx-32 items-center justify-between">
                    <a className="my-auto [&.active]:text-darkPrimary dark:[&.active]:text-darkPrimaryDark [&.active]:border-b-4 [&.active]:border-darkPrimary dark:[&.active]:border-darkPrimaryDark" href="https://camerondix.com" target="_blank" rel="noreferrer" title="camerondix.com">
                        <div className="w-8 h-8 mx-auto dark:hidden">
                            <svg stroke-miterlimit="10" style={{ fillRule: "nonzero", clipRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round" }} version="1.1" viewBox="0 0 1024 1024" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <defs />
                                <g id="Grid">
                                    <path
                                        d="M812 872C812 838.863 838.863 812 872 812C905.137 812 932 838.863 932 872C932 905.137 905.137 932 872 932C838.863 932 812 905.137 812 872Z"
                                        fill="#e5e5ea" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M632 872C632 838.863 658.863 812 692 812C725.137 812 752 838.863 752 872C752 905.137 725.137 932 692 932C658.863 932 632 905.137 632 872Z"
                                        fill="#1c1c1e" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M452 872C452 838.863 478.863 812 512 812C545.137 812 572 838.863 572 872C572 905.137 545.137 932 512 932C478.863 932 452 905.137 452 872Z"
                                        fill="#1c1c1e" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M272 872C272 838.863 298.863 812 332 812C365.137 812 392 838.863 392 872C392 905.137 365.137 932 332 932C298.863 932 272 905.137 272 872Z"
                                        fill="#1c1c1e" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M92 872C92 838.863 118.863 812 152 812C185.137 812 212 838.863 212 872C212 905.137 185.137 932 152 932C118.863 932 92 905.137 92 872Z"
                                        fill="#e5e5ea" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M812 692C812 658.863 838.863 632 872 632C905.137 632 932 658.863 932 692C932 725.137 905.137 752 872 752C838.863 752 812 725.137 812 692Z"
                                        fill="#1c1c1e" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M632 692C632 658.863 658.863 632 692 632C725.137 632 752 658.863 752 692C752 725.137 725.137 752 692 752C658.863 752 632 725.137 632 692Z"
                                        fill="#ff3b30" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M452 692C452 658.863 478.863 632 512 632C545.137 632 572 658.863 572 692C572 725.137 545.137 752 512 752C478.863 752 452 725.137 452 692Z"
                                        fill="#ff3b30" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M272 692C272 658.863 298.863 632 332 632C365.137 632 392 658.863 392 692C392 725.137 365.137 752 332 752C298.863 752 272 725.137 272 692Z"
                                        fill="#ff3b30" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M92 692C92 658.863 118.863 632 152 632C185.137 632 212 658.863 212 692C212 725.137 185.137 752 152 752C118.863 752 92 725.137 92 692Z"
                                        fill="#ff3b30" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M812 512C812 478.863 838.863 452 872 452C905.137 452 932 478.863 932 512C932 545.137 905.137 572 872 572C838.863 572 812 545.137 812 512Z"
                                        fill="#1c1c1e" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M632 512C632 478.863 658.863 452 692 452C725.137 452 752 478.863 752 512C752 545.137 725.137 572 692 572C658.863 572 632 545.137 632 512Z"
                                        fill="#e5e5ea" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M452 512C452 478.863 478.863 452 512 452C545.137 452 572 478.863 572 512C572 545.137 545.137 572 512 572C478.863 572 452 545.137 452 512Z"
                                        fill="#e5e5ea" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M272 512C272 478.863 298.863 452 332 452C365.137 452 392 478.863 392 512C392 545.137 365.137 572 332 572C298.863 572 272 545.137 272 512Z"
                                        fill="#1c1c1e" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M92 512C92 478.863 118.863 452 152 452C185.137 452 212 478.863 212 512C212 545.137 185.137 572 152 572C118.863 572 92 545.137 92 512Z"
                                        fill="#ff3b30" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M812 332C812 298.863 838.863 272 872 272C905.137 272 932 298.863 932 332C932 365.137 905.137 392 872 392C838.863 392 812 365.137 812 332Z"
                                        fill="#e5e5ea" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M632 332C632 298.863 658.863 272 692 272C725.137 272 752 298.863 752 332C752 365.137 725.137 392 692 392C658.863 392 632 365.137 632 332Z"
                                        fill="#1c1c1e" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M452 332C452 298.863 478.863 272 512 272C545.137 272 572 298.863 572 332C572 365.137 545.137 392 512 392C478.863 392 452 365.137 452 332Z"
                                        fill="#1c1c1e" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M272 332C272 298.863 298.863 272 332 272C365.137 272 392 298.863 392 332C392 365.137 365.137 392 332 392C298.863 392 272 365.137 272 332Z"
                                        fill="#1c1c1e" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M92 332C92 298.863 118.863 272 152 272C185.137 272 212 298.863 212 332C212 365.137 185.137 392 152 392C118.863 392 92 365.137 92 332Z"
                                        fill="#ff3b30" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M812 152C812 118.863 838.863 92 872 92C905.137 92 932 118.863 932 152C932 185.137 905.137 212 872 212C838.863 212 812 185.137 812 152Z"
                                        fill="#e5e5ea" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M632 152C632 118.863 658.863 92 692 92C725.137 92 752 118.863 752 152C752 185.137 725.137 212 692 212C658.863 212 632 185.137 632 152Z"
                                        fill="#ff3b30" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M452 152C452 118.863 478.863 92 512 92C545.137 92 572 118.863 572 152C572 185.137 545.137 212 512 212C478.863 212 452 185.137 452 152Z"
                                        fill="#ff3b30" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M272 152C272 118.863 298.863 92 332 92C365.137 92 392 118.863 392 152C392 185.137 365.137 212 332 212C298.863 212 272 185.137 272 152Z"
                                        fill="#ff3b30" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M92 152C92 118.863 118.863 92 152 92C185.137 92 212 118.863 212 152C212 185.137 185.137 212 152 212C118.863 212 92 185.137 92 152Z"
                                        fill="#ff3b30" fill-rule="nonzero" opacity="1" stroke="none" />
                                </g>
                            </svg>
                        </div>
                        <div className="w-8 h-8 mx-auto hidden dark:block">
                            <svg stroke-miterlimit="10" style={{ fillRule: "nonzero", clipRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round" }} version="1.1" viewBox="0 0 1024 1024" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <defs />
                                <g id="Grid">
                                    <path
                                        d="M812 872C812 838.863 838.863 812 872 812C905.137 812 932 838.863 932 872C932 905.137 905.137 932 872 932C838.863 932 812 905.137 812 872Z"
                                        fill="#2c2c2e" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M632 872C632 838.863 658.863 812 692 812C725.137 812 752 838.863 752 872C752 905.137 725.137 932 692 932C658.863 932 632 905.137 632 872Z"
                                        fill="#f2f2f7" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M452 872C452 838.863 478.863 812 512 812C545.137 812 572 838.863 572 872C572 905.137 545.137 932 512 932C478.863 932 452 905.137 452 872Z"
                                        fill="#f2f2f7" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M272 872C272 838.863 298.863 812 332 812C365.137 812 392 838.863 392 872C392 905.137 365.137 932 332 932C298.863 932 272 905.137 272 872Z"
                                        fill="#f2f2f7" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M92 872C92 838.863 118.863 812 152 812C185.137 812 212 838.863 212 872C212 905.137 185.137 932 152 932C118.863 932 92 905.137 92 872Z"
                                        fill="#2c2c2e" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M812 692C812 658.863 838.863 632 872 632C905.137 632 932 658.863 932 692C932 725.137 905.137 752 872 752C838.863 752 812 725.137 812 692Z"
                                        fill="#f2f2f7" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M632 692C632 658.863 658.863 632 692 632C725.137 632 752 658.863 752 692C752 725.137 725.137 752 692 752C658.863 752 632 725.137 632 692Z"
                                        fill="#ff453a" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M452 692C452 658.863 478.863 632 512 632C545.137 632 572 658.863 572 692C572 725.137 545.137 752 512 752C478.863 752 452 725.137 452 692Z"
                                        fill="#ff453a" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M272 692C272 658.863 298.863 632 332 632C365.137 632 392 658.863 392 692C392 725.137 365.137 752 332 752C298.863 752 272 725.137 272 692Z"
                                        fill="#ff453a" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M92 692C92 658.863 118.863 632 152 632C185.137 632 212 658.863 212 692C212 725.137 185.137 752 152 752C118.863 752 92 725.137 92 692Z"
                                        fill="#ff453a" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M812 512C812 478.863 838.863 452 872 452C905.137 452 932 478.863 932 512C932 545.137 905.137 572 872 572C838.863 572 812 545.137 812 512Z"
                                        fill="#f2f2f7" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M632 512C632 478.863 658.863 452 692 452C725.137 452 752 478.863 752 512C752 545.137 725.137 572 692 572C658.863 572 632 545.137 632 512Z"
                                        fill="#2c2c2e" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M452 512C452 478.863 478.863 452 512 452C545.137 452 572 478.863 572 512C572 545.137 545.137 572 512 572C478.863 572 452 545.137 452 512Z"
                                        fill="#2c2c2e" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M272 512C272 478.863 298.863 452 332 452C365.137 452 392 478.863 392 512C392 545.137 365.137 572 332 572C298.863 572 272 545.137 272 512Z"
                                        fill="#f2f2f7" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M92 512C92 478.863 118.863 452 152 452C185.137 452 212 478.863 212 512C212 545.137 185.137 572 152 572C118.863 572 92 545.137 92 512Z"
                                        fill="#ff453a" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M812 332C812 298.863 838.863 272 872 272C905.137 272 932 298.863 932 332C932 365.137 905.137 392 872 392C838.863 392 812 365.137 812 332Z"
                                        fill="#2c2c2e" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M632 332C632 298.863 658.863 272 692 272C725.137 272 752 298.863 752 332C752 365.137 725.137 392 692 392C658.863 392 632 365.137 632 332Z"
                                        fill="#f2f2f7" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M452 332C452 298.863 478.863 272 512 272C545.137 272 572 298.863 572 332C572 365.137 545.137 392 512 392C478.863 392 452 365.137 452 332Z"
                                        fill="#f2f2f7" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M272 332C272 298.863 298.863 272 332 272C365.137 272 392 298.863 392 332C392 365.137 365.137 392 332 392C298.863 392 272 365.137 272 332Z"
                                        fill="#f2f2f7" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M92 332C92 298.863 118.863 272 152 272C185.137 272 212 298.863 212 332C212 365.137 185.137 392 152 392C118.863 392 92 365.137 92 332Z"
                                        fill="#ff453a" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M812 152C812 118.863 838.863 92 872 92C905.137 92 932 118.863 932 152C932 185.137 905.137 212 872 212C838.863 212 812 185.137 812 152Z"
                                        fill="#2c2c2e" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M632 152C632 118.863 658.863 92 692 92C725.137 92 752 118.863 752 152C752 185.137 725.137 212 692 212C658.863 212 632 185.137 632 152Z"
                                        fill="#ff453a" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M452 152C452 118.863 478.863 92 512 92C545.137 92 572 118.863 572 152C572 185.137 545.137 212 512 212C478.863 212 452 185.137 452 152Z"
                                        fill="#ff453a" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M272 152C272 118.863 298.863 92 332 92C365.137 92 392 118.863 392 152C392 185.137 365.137 212 332 212C298.863 212 272 185.137 272 152Z"
                                        fill="#ff453a" fill-rule="nonzero" opacity="1" stroke="none" />
                                    <path
                                        d="M92 152C92 118.863 118.863 92 152 92C185.137 92 212 118.863 212 152C212 185.137 185.137 212 152 212C118.863 212 92 185.137 92 152Z"
                                        fill="#ff453a" fill-rule="nonzero" opacity="1" stroke="none" />
                                </g>
                            </svg>
                        </div>
                    </a>
                    <ul className="flex justify-center space-x-6">
                        <li className="my-auto">
                            <ThemeToggle />
                        </li>
                        <li className="hover:text-lightPrimary dark:hover:text-lightPrimaryDark">
                            <a href="https://www.linkedin.com/in/cameron-dix/" target="_blank" rel="noreferrer" title="LinkedIn">
                                <BsLinkedin className="w-8 h-8 mx-auto" />
                            </a>
                        </li>
                        <li className="hover:text-lightPrimary dark:hover:text-lightPrimaryDark">
                            <a href="https://github.com/camerondix" target="_blank" rel="noreferrer" title="GitHub">
                                <BsGithub className="w-8 h-8 mx-auto" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer
