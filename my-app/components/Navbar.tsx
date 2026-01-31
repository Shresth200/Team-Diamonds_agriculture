"use client";

import React, { useState } from "react";
import {
     Navbar as HeroNavbar,
     NavbarBrand,
     NavbarContent,
     NavbarItem,
     Link,
     Button,
     NavbarMenuToggle,
     NavbarMenu,
     NavbarMenuItem,
} from "@heroui/react";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
     const [isMenuOpen, setIsMenuOpen] = useState(false);

     const menuItems = [
          { label: "Products", href: "/products" },
          { label: "About", href: "/about" },
          { label: "Science", href: "/science" },
          { label: "Blog", href: "/blog" },
          { label: "Contact", href: "/contact" },
     ];

     return (
          <HeroNavbar
               onMenuOpenChange={setIsMenuOpen}
               maxWidth="xl"
               className="bg-black/50 backdrop-blur-md fixed top-0 w-full z-50 border-b border-white/10"
               isBordered
               classNames={{
                    item: [
                         "flex",
                         "relative",
                         "h-full",
                         "items-center",
                         "data-[active=true]:after:content-['']",
                         "data-[active=true]:after:absolute",
                         "data-[active=true]:after:bottom-0",
                         "data-[active=true]:after:left-0",
                         "data-[active=true]:after:right-0",
                         "data-[active=true]:after:h-[2px]",
                         "data-[active=true]:after:rounded-[2px]",
                         "data-[active=true]:after:bg-emerald-500",
                    ],
               }}
          >
               <NavbarContent>
                    <NavbarMenuToggle
                         aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                         className="sm:hidden text-white"
                    />
                    <NavbarBrand>
                         <div className="w-8 h-8 mr-2 bg-emerald-500 rounded-sm flex items-center justify-center">
                              <div className="w-4 h-4 bg-black/20" />
                         </div>
                         <p className="font-bold text-white tracking-tight text-xl">FARM MINERALS</p>
                    </NavbarBrand>
               </NavbarContent>

               <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    {menuItems.slice(0, 3).map((item) => (
                         <NavbarItem key={item.href}>
                              <Link color="foreground" href={item.href} className="text-white/80 hover:text-emerald-400 transition-colors">
                                   {item.label}
                              </Link>
                         </NavbarItem>
                    ))}
               </NavbarContent>

               <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                         <Link href="/contact" className="text-white/80 hover:text-emerald-400">Contact</Link>
                    </NavbarItem>
                    <NavbarItem>
                         <SignedOut>
                              <div className="flex gap-2">
                                   <SignInButton mode="modal">
                                        <Button as={Link} color="primary" href="#" variant="flat" className="bg-transparent text-white hover:bg-white/10">
                                             Sign In
                                        </Button>
                                   </SignInButton>
                                   <SignUpButton mode="modal">
                                        <Button as={Link} color="primary" href="#" variant="solid" className="bg-emerald-500 text-black font-semibold">
                                             Join
                                        </Button>
                                   </SignUpButton>
                              </div>
                         </SignedOut>
                         <SignedIn>
                              <UserButton
                                   appearance={{
                                        elements: {
                                             avatarBox: "w-10 h-10 border-2 border-emerald-500/50"
                                        }
                                   }}
                              />
                         </SignedIn>
                    </NavbarItem>
               </NavbarContent>

               <NavbarMenu className="bg-black/90 pt-8">
                    {menuItems.map((item, index) => (
                         <NavbarMenuItem key={`${item}-${index}`}>
                              <Link
                                   color={
                                        index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                                   }
                                   className="w-full text-2xl text-white py-2 hover:text-emerald-400"
                                   href={item.href}
                                   size="lg"
                              >
                                   {item.label}
                              </Link>
                         </NavbarMenuItem>
                    ))}
               </NavbarMenu>
          </HeroNavbar>
     );
}
