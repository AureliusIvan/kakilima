"use server";

import {FaGithub} from "react-icons/fa";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";

/**
 * Enhanced Footer component with professional styling
 */
async function Footer() {
  return (
      <footer className="gradient-primary mt-16 animate-fade-in">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🥘</span>
              <div className="text-white">
                <h3 className="text-xl font-bold">KakiLima</h3>
                <p className="text-sm opacity-90">Authentic Indonesian Street Food</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                  href={'/'}
                  className={cn(
                      buttonVariants({variant: `default`}),
                      `
                        flex items-center space-x-2 
                        bg-white/90 hover:bg-white 
                        text-primary hover:text-primary-dark 
                        font-semibold px-6 py-3 
                        rounded-xl shadow-card 
                        transition-all duration-300 
                        hover:shadow-card-hover 
                        btn-hover-lift
                        focus-ring
                      `
                  )}
              >
                <span>Contribute on</span>
                <FaGithub className={'h-5 w-5'} />
              </Link>

              <span className="text-white/70 text-xl">|</span>

              <a
                  target={'_blank'}
                  href={'https://forms.gle/KUfWM3KrhXke8LD2A'}
                  className={cn(
                      buttonVariants({variant: `default`}),
                      `
                        bg-white/90 hover:bg-white 
                        text-primary hover:text-primary-dark 
                        font-semibold px-6 py-3 
                        rounded-xl shadow-card 
                        transition-all duration-300 
                        hover:shadow-card-hover 
                        btn-hover-lift
                        focus-ring
                      `
                  )}
              >
                Report an issue
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-white/20 text-center">
            <p className="text-white/80 text-sm">
              © {new Date().getFullYear()} KakiLima. Made with ❤️ for Indonesian street food lovers.
            </p>
          </div>
        </div>
      </footer>
  )
}

export {
  Footer
}