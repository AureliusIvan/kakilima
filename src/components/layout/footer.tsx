"use server";

import {FaGithub} from "react-icons/fa";
import Link from "next/link";


async function Footer() {
  return (
      <section
      className={'bg-primary p-6'}
      >
        {/* Footer */}
        <Link
            href={'/'}
            className={'flex flex-row justify-center items-center gap-2'}
        >
          Contribute on
          <FaGithub
              className={'h-5 w-5'}
          />
        </Link>
      </section>
  )
}


export {
  Footer
}