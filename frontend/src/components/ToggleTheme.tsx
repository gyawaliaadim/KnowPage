import React from 'react'
import Image from 'next/image';
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useTheme } from "next-themes";

const ToggleTheme = ({ width, padding,className }: { width?: number; padding?: 1|2;className?:string }) => {

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false)
    const [themeUrl, setThemeUrl] = useState<string | null>(null)
    useEffect(() => {
        setMounted(true)
        if (theme == "light") {
            setThemeUrl("/svgs/dark_theme.svg")
        }
        else {
            setThemeUrl("/svgs/light_theme.svg")

        }
    }, [theme])
    if (!mounted) return null
    const toggleTheme = () => {
        let themeToSet= theme === 'dark' ? 'light' : 'dark';
        setTheme(themeToSet);
    };
    return (
        <button
            onClick={toggleTheme}
            className={clsx(
                `rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 cursor-pointer dark:hover:bg-gray-700 transition-colors ${className}`,
                {
                    'invisible': status === 'loading',
                    'p-1':padding==1,
                    'p-2':padding==2
                }
            )}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            disabled={status === 'loading'}
        >
            {themeUrl ?

                <Image
                    src={themeUrl}
                    alt={theme === 'dark' ? 'Light mode icon' : 'Dark mode icon'}
                    width={width?width:24}
                    height={width?width:24}

                /> :
                null
            }
        </button>
    )
}

export default ToggleTheme