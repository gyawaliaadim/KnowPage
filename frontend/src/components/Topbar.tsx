"use client"
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useTheme } from "next-themes";
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

  const { theme } = useTheme();


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
      className="rounded-full w-10 h-10 focus:ring-2 focus:ring-gray-300 cursor-pointer flex items-center justify-center bg-gray-100 dark:bg-gray-800 overflow-hidden"
      aria-label="User menu"
    >
      <HamburgerMenuIcon 
      color={theme==="light"? "black":"white"}
      className="w-5 h-5 text-black " />
    </button>
  </DropdownMenuTrigger>

  <DropdownMenuContent align="end" className="w-56">
    <DropdownMenuLabel className="flex flex-col gap-1">
      <span className="text-lg font-bold">Info</span>
    </DropdownMenuLabel>

    <DropdownMenuItem
      className="cursor-pointer"
      onClick={() => navigate("/dashboard")}
    >
      Dashboard
    </DropdownMenuItem>

    <DropdownMenuItem
      className="cursor-pointer"
      onClick={() => window.open("https://www.linkedin.com/in/aadimgyawali", "_blank")}
    >
      My Linkedin
    </DropdownMenuItem>
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={() => window.open("https://github.com/gyawaliaadim", "_blank")}
    >
      My GitHub
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
  <ToggleTheme padding={2}/>
      </div>
    </nav>
  );
}