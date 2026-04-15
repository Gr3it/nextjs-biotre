"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Menu, X } from "lucide-react";
import { SessionData } from "@auth0/nextjs-auth0/types";

function NavLink({
  href,
  children,
  isExternal,
  onClick,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const baseClasses = `flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-text hover:text-primary hover:bg-primary/5 transition-all font-medium ${className}`;

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={baseClasses}
      >
        {children} <ExternalLink className="w-4 h-4 ml-0.5" />
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={baseClasses}>
      {children}
    </Link>
  );
}

export default function Navbar({ session }: { session: SessionData | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-12 bg-bg border-b border-border">
      <div className="max-w-[1400px] w-full mx-auto flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* Mobile Logo */}
          <div className="md:hidden flex items-center h-full">
            <Image
              src="/logo/LogoSmall.png"
              alt="Biotre GAS Logo"
              width={512}
              height={512}
              className="object-contain w-auto h-10"
            />
          </div>
          {/* Desktop Logo */}
          <div className="hidden md:flex items-center h-full">
            <Image
              src="/logo/LogoFull.png"
              alt="Biotre GAS Logo"
              width={1080}
              height={532}
              className="object-contain w-auto h-12"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="http://www.agora-gas.it/gas/ag3_biotre/" isExternal>
            Gestionale Ordini
          </NavLink>
          <NavLink href="http://webmail.biotre-tn.it/" isExternal>
            Webmail
          </NavLink>
          <div className="pl-4 ml-2 border-l border-border/50 flex items-center gap-3">
            {user ? (
              <a
                href="/auth/logout"
                className="inline-block px-5 py-2.5 bg-error text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                title="Logout"
              >
                Logout
              </a>
            ) : (
              <a
                href="/auth/login"
                className="inline-block px-5 py-2.5 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Area Riservata
              </a>
            )}
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-text hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="md:hidden bg-bg border-b border-border absolute top-20 left-0 w-full flex flex-col pt-2 pb-6 px-4 gap-2 shadow-sm">
          <NavLink
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-lg w-full"
          >
            Home
          </NavLink>
          <NavLink
            href="http://www.agora-gas.it/gas/ag3_biotre/"
            isExternal
            onClick={() => setIsOpen(false)}
            className="text-lg w-full"
          >
            Gestionale Ordini
          </NavLink>
          <NavLink
            href="http://webmail.biotre-tn.it/"
            isExternal
            onClick={() => setIsOpen(false)}
            className="text-lg w-full"
          >
            Webmail
          </NavLink>
          <div className="mt-2 text-center w-full">
            {user ? (
              <a
                href="/auth/logout"
                onClick={() => setIsOpen(false)}
                className="block w-full px-5 py-2.5 bg-error text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Logout
              </a>
            ) : (
              <a
                href="/auth/login"
                onClick={() => setIsOpen(false)}
                className="block w-full px-5 py-2.5 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Area Riservata
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
