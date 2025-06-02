"use server";

import {FaGithub} from "react-icons/fa";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";

/**
 * Footer component
 */
async function Footer() {
  return (
      <section
          className={`bg-primary p-4 sm:p-6 flex flex-row justify-center items-center gap-2`}
      >
        {/* Footer */}
        <Link
            href={'/'}
            className={
              cn(
                  buttonVariants({variant: `default`}),
                  `flex flex-row justify-center items-center gap-2`
              )
            }
        >
          Contribute on
          <FaGithub
              className={'h-5 w-5'}
          />
        </Link>
        |
        <a
            target={'_blank'}
            href={'https://forms.gle/KUfWM3KrhXke8LD2A'}
            className={
              cn(buttonVariants({variant: `default`}))
            }
        >
          Report an issue
        </a>
      </section>
  )
}

export {
  Footer
}