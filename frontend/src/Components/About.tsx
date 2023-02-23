import dayjs from "dayjs"
import { BsArrowDownUp, BsArrowLeftRight, BsCashStack, BsCupStraw, BsWallet2 } from "react-icons/bs"
import { SiApollographql, SiDocker, SiGraphql, SiJava, SiPostgresql, SiReact, SiSpring, SiTailwindcss, SiTypescript, SiVisualstudiocode } from "react-icons/si/index"
import { AccountType } from "../gql/generated/graphql"
import AccountBalanceDisplay from "./Account/AccountBalanceDisplay"
import EnumDisplay from "./Shared/EnumDisplay"
import MoneyValue from "./Shared/MoneyValue"
import ThemeToggle from "./Shared/ThemeToggle"

function About() {
    return (
        <div className="container mx-auto">
            <div className="absolute right-4 md:right-8 top-20">
                <ThemeToggle />
            </div>
            <div className="flex min-h-screen flex-col p-4 md:mx-20 lg:mx-40 xl:mx-80">
                <h1 className="text-5xl text-center my-3">Check out Carteira</h1>
                <h2 className="text-3xl text-center my-2 text-graySecondary dark:text-graySecondaryDark">a self-hosted personal finance web application</h2>
                <div className="flex mx-2 my-3">
                    <div className="w-full">
                        <h3 className="text-center text-3xl underline decoration-primary dark:decoration-primaryDark">portuguese</h3>
                        <h3 className="p-2 m-2 rounded-lg text-2xl text-center bg-elevatedColor dark:bg-elevatedColorDark">carteira</h3>
                    </div>
                    <div className="text-2xl mx-auto flex text-primary dark:text-primaryDark">
                        <div className="self-end mb-5">
                            <BsArrowLeftRight />
                        </div>
                    </div>
                    <div className="w-full">
                        <h3 className="text-center text-3xl underline decoration-primary dark:decoration-primaryDark">english</h3>
                        <h3 className="p-2 m-2 rounded-lg text-2xl text-center bg-elevatedColor dark:bg-elevatedColorDark">wallet</h3>
                    </div>
                </div>
                <BsWallet2 className="w-40 h-40 mx-auto my-10 text-primary dark:text-primaryDark" />
                <h3 className="text-3xl text-center my-2 text-graySecondary dark:text-graySecondaryDark">view, edit, and organize transactions</h3>
                <div className="border-b-2 my-2 border-b-baseColor dark:border-b-baseColorDark">
                    <div className="w-full rounded-xl bg-elevatedColor dark:bg-elevatedColorDark">
                        <div className="flex flex-row p-2">
                            <div className="pr-2 m-auto w-2/12 text-lightPrimary dark:text-lightPrimaryDark">
                                <BsCupStraw className="mx-auto text-3xl" />
                            </div>
                            <div className="flex flex-row justify-between w-10/12 pr-2">
                                <div className="text-left space-y-1 flex-shrink my-auto w-8/12">
                                    <h2 className="text-lg truncate">Taco Bell</h2>
                                    <small className="text-sm text-graySecondary dark:text-graySecondaryDark">Fast Food</small>
                                </div>
                                <div className="text-right space-y-1 w-4/12">
                                    <h2 className="flex justify-end text-xl">
                                        <MoneyValue value={-23.15} />
                                        <div className="pl-1 my-2 ml-1 rounded-lg bg-red dark:bg-redDark"></div>
                                    </h2>
                                    <div>
                                        <small className="text-sm text-graySecondary dark:text-graySecondaryDark">{new Date().toString().slice(0, 16)}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 className="text-3xl text-center my-2 text-graySecondary dark:text-graySecondaryDark">monitor account balances</h3>
                <div className="border-b-2 my-2 border-baseColor dark:border-baseColorDark last:border-0">
                    <div className="w-full rounded-xl bg-elevatedColor dark:bg-elevatedColorDark" >
                        <div className="flex flex-row p-2">
                            <div className="pr-2 m-auto w-2/12 text-3xl text-lightPrimary dark:text-lightPrimaryDark">
                                <BsCashStack className="mx-auto" />
                            </div>
                            <div className="flex flex-row justify-between w-full pr-4">
                                <div className="my-auto text-left space-y-1">
                                    <h2 className="text-xl">Cash Under the Mattress</h2>
                                    <small className="text-sm text-graySecondary dark:text-graySecondaryDark">
                                        <EnumDisplay value="Cash" />
                                    </small>
                                </div>
                                <div className="my-auto text-right space-y-1">
                                    <h2 className="text-xl">
                                        <AccountBalanceDisplay balance={1000000} type={AccountType.Cash} />
                                    </h2>
                                    <small className="text-sm text-graySecondary dark:text-graySecondaryDark">{dayjs(new Date()).fromNow()}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b-2 border-lightPrimary dark:border-lightPrimaryDark my-10" />
                <h3 className="text-4xl text-center my-4">The Stack</h3>
                <div className="flex flex-col text-center items-center text-graySecondary dark:text-graySecondaryDark">
                    <div className="flex flex-col p-2 rounded-xl w-full lg:w-9/12 bg-elevatedColor dark:bg-elevatedColorDark">
                        <h5 className="text-2xl">presentation</h5>
                        <div className="flex my-2 justify-center space-x-10">
                            <a target="_blank" rel="noreferrer" href="https://tailwindcss.com/" className="flex flex-col space-y-2 items-center text-[#38bdf8] hover:text-grayPrimary dark:hover:text-grayPrimaryDark">
                                <SiTailwindcss className="w-16 h-16" />
                                <h5 className="text-sm">TailwindCSS</h5>
                            </a>
                            <a target="_blank" rel="noreferrer" href="https://reactjs.org/" className="flex flex-col space-y-2 items-center text-[#61dafb] hover:text-grayPrimary dark:hover:text-grayPrimaryDark">
                                <SiReact className="w-16 h-16" />
                                <h5 className="text-sm">React</h5>
                            </a>
                            <a target="_blank" rel="noreferrer" href="https://www.typescriptlang.org/" className="flex flex-col space-y-2 items-center text-[#3178c6] hover:text-grayPrimary dark:hover:text-grayPrimaryDark">
                                <SiTypescript className="w-16 h-16" />
                                <h5 className="text-sm">TypeScript</h5>
                            </a>
                        </div>
                    </div>
                    <BsArrowDownUp className="text-3xl m-5 text-primary dark:text-primaryDark" />
                    <div className="flex flex-col p-2 rounded-xl w-full lg:w-9/12 bg-elevatedColor dark:bg-elevatedColorDark">
                        <h5 className="text-2xl">communication</h5>
                        <div className="flex my-2 justify-center space-x-10">
                            <a target="_blank" rel="noreferrer" href="https://www.apollographql.com/" className="flex flex-col space-y-2 items-center text-[#3f20ba] hover:text-grayPrimary dark:hover:text-grayPrimaryDark">
                                <SiApollographql className="w-16 h-16" />
                                <h5 className="text-sm">Apollo</h5>
                            </a>
                            <a target="_blank" rel="noreferrer" href="https://graphql.org/" className="flex flex-col space-y-2 items-center text-[#e10098] hover:text-grayPrimary dark:hover:text-grayPrimaryDark">
                                <SiGraphql className="w-16 h-16" />
                                <h5 className="text-sm">GraphQL</h5>
                            </a>
                        </div>
                    </div>
                    <BsArrowDownUp className="text-3xl m-5 text-primary dark:text-primaryDark" />
                    <div className="flex flex-col p-2 rounded-xl w-full lg:w-9/12 bg-elevatedColor dark:bg-elevatedColorDark">
                        <h5 className="text-2xl">logic</h5>
                        <div className="flex my-2 justify-center space-x-10">
                            <a target="_blank" rel="noreferrer" href="https://www.java.com/" className="flex flex-col space-y-2 items-center text-[#f19011] hover:text-grayPrimary dark:hover:text-grayPrimaryDark">
                                <SiJava className="w-16 h-16" />
                                <h5 className="text-sm">Java</h5>
                            </a>
                            <a target="_blank" rel="noreferrer" href="https://spring.io/projects/spring-boot" className="flex flex-col space-y-2 items-center text-[#6cb52d] hover:text-grayPrimary dark:hover:text-grayPrimaryDark">
                                <SiSpring className="w-16 h-16 " />
                                <h5 className="text-sm">Spring Boot</h5>
                            </a>
                        </div>
                    </div>
                    <BsArrowDownUp className="text-3xl m-5 text-primary dark:text-primaryDark" />
                    <div className="flex flex-col p-2 rounded-xl w-full lg:w-9/12 bg-elevatedColor dark:bg-elevatedColorDark">
                        <h5 className="text-2xl">data</h5>
                        <div className="flex my-2 justify-center space-x-10">
                            <a target="_blank" rel="noreferrer" href="https://plaid.com/" className="flex flex-col space-y-2 items-center text-[#111111] hover:text-grayPrimary dark:hover:text-grayPrimaryDark">
                                <Plaid className="w-16 h-16" />
                                <h5 className="text-sm">Plaid</h5>
                            </a>
                            <a target="_blank" rel="noreferrer" href="https://www.postgresql.org/" className="flex flex-col space-y-2 items-center text-[#336791] hover:text-grayPrimary dark:hover:text-grayPrimaryDark">
                                <SiPostgresql className="w-16 h-16" />
                                <h5 className="text-sm">PostgreSQL</h5>
                            </a>
                        </div>
                    </div>
                    <BsArrowDownUp className="text-3xl m-5 text-primary dark:text-primaryDark" />
                    <div className="flex flex-col p-2 rounded-xl w-full lg:w-9/12 bg-elevatedColor dark:bg-elevatedColorDark">
                        <h5 className="text-2xl">tools</h5>
                        <div className="flex my-2 justify-center space-x-10">
                            <a target="_blank" rel="noreferrer" href="https://www.docker.com/" className="flex flex-col space-y-2 items-center text-[#1f97ee] hover:text-grayPrimary dark:hover:text-grayPrimaryDark">
                                <SiDocker className="w-16 h-16" />
                                <h5 className="text-sm">Docker</h5>
                            </a>
                            <a target="_blank" rel="noreferrer" href="https://code.visualstudio.com/" className="flex flex-col space-y-2 items-center text-[#0066b8] hover:text-grayPrimary dark:hover:text-grayPrimaryDark">
                                <SiVisualstudiocode className="w-16 h-16" />
                                <h5 className="text-sm">VS Code</h5>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="my-10" />
            </div>
        </div>
    )
}

function Plaid({ className }: { className: string }) {
    return (
        <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.135 0.2635L4.588 4.0735L0.579 18.7025L5.593 23.8505L0.498 28.9135L4.271 43.6065L18.755 47.6535L23.851 42.5895L28.865 47.7365L43.412 43.9265L47.42 29.2965L42.407 24.1505L47.502 19.0875L43.729 4.3935L29.243 0.3465L24.149 5.4095L19.135 0.2635ZM10.208 6.8875L17.871 4.8795L21.222 8.3195L16.335 13.1755L10.208 6.8875ZM27.03 8.3655L30.435 4.9825L38.065 7.1145L31.838 13.3015L27.03 8.3655ZM5.17 17.5015L7.281 9.7965L13.406 16.0845L8.52 20.9405L5.17 17.5005L5.17 17.5015ZM34.717 16.2585L40.944 10.0695L42.93 17.8095L39.526 21.1935C39.526 21.1935 34.717 16.2585 34.717 16.2585ZM19.215 16.1315L24.102 11.2755L28.909 16.2115L24.023 21.0675C24.023 21.0675 19.215 16.1315 19.215 16.1315ZM11.401 23.8965L16.287 19.0405L21.097 23.9765L16.209 28.8325C16.209 28.8325 11.401 23.8965 11.401 23.8965ZM26.904 24.0235L31.79 19.1675L36.598 24.1035L31.711 28.9595L26.904 24.0235ZM5.068 30.1905L8.474 26.8055L13.281 31.7425L7.056 37.9285C7.056 37.9285 5.068 30.1905 5.068 30.1905ZM19.089 31.7885L23.976 26.9325L28.784 31.8685L23.898 36.7245L19.089 31.7885ZM34.591 31.9165L39.478 27.0605L42.829 30.4995L40.719 38.2045C40.719 38.2045 34.591 31.9165 34.591 31.9165ZM9.935 40.8865L16.161 34.6975L20.971 39.6335L17.565 43.0185L9.935 40.8855L9.935 40.8865ZM26.778 39.6805L31.664 34.8245L37.79 41.1135L30.128 43.1205C30.128 43.1205 26.778 39.6805 26.778 39.6805Z" />
        </svg>
    )
}

export default About
