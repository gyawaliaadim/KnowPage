"use client"
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; 
import { useNavigation } from '@/store/NavigationContext';
import ToggleTheme from "@/components/ToggleTheme";

export default function Topbar({ className }: { className?: string }) {
  const pathname = usePathname();
    const { navigate } = useNavigation();




  const navLinks = [
    { href: "/", name: "Home" },
    { href: "/about", name: "About" },
  ];

  const navLinkClasses = (href: string) =>
    `flex items-center justify-center py-2 px-3 rounded-sm transition-colors font-extrabold cursor-pointer
     ${status === "loading" ? "text-gray-500 pointer-events-none" : `hover:text-blue-700 ${pathname === href ? "dark:text-blue-400 text-blue-500" : "dark:text-white text-black"}`}`;

  return (
    <nav
      className={`h-20 sticky top-0 z-50 flex w-full justify-around text-black dark:text-white bg-white dark:bg-black p-2 xs:p-5 shadow-2xl dark:shadow-2xl shadow-blue-200 dark:shadow-gray-700 ${className}`}
    >
      {/* Logo */}
      <div>
        <Image
          src="/logo.png"
          alt="Logo"
          width={70}
          height={70}
          className={`cursor-pointer ${status === "loading" ? " w-[70px] h-[70px] opacity-50 pointer-events-none" : ""}`}
          onClick={status === "loading" ? undefined : () => navigate("/")}
        />
      </div>

      {/* Navigation Links */}
      <ul className="flex w-[200px] justify-around">
        {navLinks.map((link, index) => (
          <li key={index}  className="flex justify-center items-center">
            <p
              onClick={()=>navigate(link.href)}
              className={navLinkClasses(link.href)}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.name}
            </p>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="flex items-center justify-center gap-1 xs:gap-5">
       <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button
      className="rounded-full w-10 h-10 focus:ring-2 focus:ring-gray-300 cursor-pointer flex items-center justify-center bg-gray-800 overflow-hidden"
      aria-label="User menu"
    >
      
    </button>
  </DropdownMenuTrigger>

  <DropdownMenuContent align="end" className="w-56">
    <DropdownMenuLabel className="flex flex-col gap-1">
      <span className="text-lg font-bold">User Name</span>
      <span className="text-base text-gray-500 truncate">user@email.com</span>
    </DropdownMenuLabel>

    <DropdownMenuItem
      className="cursor-pointer"
      onClick={() => navigate("/dashboard")}
    >
      Dashboard
    </DropdownMenuItem>

    <DropdownMenuItem
      className="cursor-pointer"
      onClick={() => console.log("Sign out")}
    >
      Sign out
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
  <ToggleTheme padding={2}/>
      </div>
    </nav>
  );
}