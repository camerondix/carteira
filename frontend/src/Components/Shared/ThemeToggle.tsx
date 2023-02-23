import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

enum Theme {
    light,
    dark,
}

const getTheme = (): Theme => {
    if (!('theme' in localStorage)) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.dark : Theme.light;
    } else {
        return localStorage.theme as Theme;
    }
}

const toggleTheme = (theme: Theme) => {
    let systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.dark : Theme.light;
    if (systemPreference === theme) {
        localStorage.removeItem("theme");
    } else if (theme !== undefined) {
        localStorage.theme = theme;
    }
    applyTheme();
};

const applyTheme = () => {
    switch (Number(getTheme())) {
        case Theme.dark:
            document.documentElement.classList.add('dark');
            break;
        case Theme.light:
            document.documentElement.classList.remove('dark');
            break;
    }
}

function ThemeToggle() {

    const [theme, setTheme] = useState(getTheme);
    useEffect(() => toggleTheme(theme), [theme]);

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        setTheme(getTheme);
    });

    return (
        <Switch checked={theme === Theme.dark} onChange={() => theme === Theme.dark ? setTheme(Theme.light) : setTheme(Theme.dark)} className="relative inline-flex h-6 w-11 items-center rounded-full bg-lightPrimary dark:bg-lightPrimaryDark">
            <span className={`${theme === Theme.dark ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full transition text-superLightPrimary dark:text-superLightPrimaryDark`}>
                <BsMoonFill className="dark:h-4 dark:w-4 h-0 w-0" />
                <BsSunFill className="h-4 w-4 dark:h-0 dark:w-0" />
            </span>
        </Switch>
    )
}

export { applyTheme as ApplyTheme };
export default ThemeToggle
