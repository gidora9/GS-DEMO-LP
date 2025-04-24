"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">GS</span>
          </div>
          <span className="font-bold text-lg">GameScrobbler</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/manifesto" className="text-sm text-white/80 hover:text-white transition-colors">
            Manifesto
          </Link>
          <Link href="/features" className="text-sm text-white/80 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/about" className="text-sm text-white/80 hover:text-white transition-colors">
            About
          </Link>
          <div className="pl-4 border-l border-white/10">
            <Button variant="outline" size="sm" className="mr-2">
              Log In
            </Button>
            <Button size="sm">Sign Up</Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/manifesto"
              className="text-sm text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Manifesto
            </Link>
            <Link
              href="/features"
              className="text-sm text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/about"
              className="text-sm text-white/80 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-4 border-t border-white/10 flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                Log In
              </Button>
              <Button size="sm" className="flex-1">
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
