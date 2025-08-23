import Link from "next/link";
import Logo from "./Logo";
import { SITE } from "../constants/site";
import { Button } from "./ui";
import { ExternalLinkIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background px-8 relative border-t pt-12 pb-8 rounded-t-xl md:rounded-none">
      {/* Logo */}
      <div className="flex justify-center flex-col items-center mb-8">
        <Logo className="h-32" />
        <h1 className="tracking-[0.75em] text-xs uppercase -mt-4">
          {SITE.name}
        </h1>
      </div>

      {/* Main blurb */}
      <div className="text-center mb-12">
        <p className="text-foreground/80 text-sm text-balance max-w-2xl mx-auto mb-4 leading-relaxed">
          Archaic Horizon was an electronic music net label active from 2006 to
          2016. All music is provided for free and hosted by the Internet
          Archive.
        </p>
        <div className="text-center">
          <Button size="sm" asChild>
            <Link href="/collection">Explore the Collection</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col w-full md:flex-row justify-between max-w-screen-lg mx-auto">
        <nav className="flex flex-col gap-4 md:flex-row">
          {/* Collection link */}

          {/* External links */}
          <div className="flex justify-center gap-6 mb-8">
            <Button size="sm" asChild variant="ghost">
              <Link
                href="https://archive.org/details/archaichorizon"
                target="_blank"
                rel="noopener noreferrer"
              >
                Internet Archive{" "}
                <ExternalLinkIcon className="w-3.5 h-3.5 inline-flex ml-1" />
              </Link>
            </Button>
            <Button size="sm" asChild variant="ghost">
              <Link
                href="https://soundcloud.com/archaichorizon"
                target="_blank"
                rel="noopener noreferrer"
              >
                SoundCloud{" "}
                <ExternalLinkIcon className="w-3.5 h-3.5 inline-flex ml-1" />
              </Link>
            </Button>
          </div>
        </nav>

        {/* Legal line */}

        <p className="text-center md:text-right max-w-screen-sm text-foreground/60 text-xs text-balance">
          All design, music, and written content on Archaic Horizon is
          distributed under and protected by the Creative Commons{" "}
          <Link
            href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground/80 transition-colors"
          >
            CC BY-NC-ND 4.0
          </Link>{" "}
          License unless otherwise specified.
        </p>
      </div>
    </footer>
  );
}
