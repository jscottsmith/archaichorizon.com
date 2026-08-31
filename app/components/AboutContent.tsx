import Link from "next/link";
import Logo from "@/app/components/Logo";
import { SITE } from "@/app/constants/site";
import { buttonVariants } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";
import { ROUTES } from "@/app/constants/routes";
import { cn } from "@/lib/utils";

export function AboutContent() {
  return (
    <div className="space-y-8">
      <div className="mb-8 flex flex-col items-center justify-center">
        <Logo className="h-32" />
        <h1 className="-mt-4 text-xs tracking-[0.75em] uppercase">
          {SITE.name}
        </h1>
      </div>

      <div className="mb-12 text-center">
        <p className="mx-auto mb-4 max-w-2xl text-sm leading-relaxed text-balance text-foreground/80">
          Archaic Horizon was an electronic music net label active from 2006 to
          2016. All music is provided for free and hosted by the Internet
          Archive.
        </p>
        <div className="text-center">
          <Link
            href={ROUTES.COLLECTION}
            className={cn(buttonVariants({ size: "sm" }))}
          >
            Explore the Collection
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-24 flex w-full max-w-screen-lg flex-col justify-between lg:flex-row">
        <nav className="flex flex-col lg:flex-row">
          <div className="mb-8 flex flex-wrap justify-center sm:gap-2 lg:shrink-0">
            <Link
              href={ROUTES.CONTACT}
              className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
            >
              Contact
            </Link>
            <Link
              href={ROUTES.EXTERNAL.ARCHIVE_ORG}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
            >
              Internet Archive{" "}
              <ExternalLinkIcon className="ml-1 inline-flex h-3.5 w-3.5" />
            </Link>
            <Link
              href={ROUTES.EXTERNAL.SOUNDCLOUD}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
            >
              SoundCloud{" "}
              <ExternalLinkIcon className="ml-1 inline-flex h-3.5 w-3.5" />
            </Link>
            <Link
              href={ROUTES.EXTERNAL.DISCOGS}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "sm", variant: "ghost" }))}
            >
              Discogs{" "}
              <ExternalLinkIcon className="ml-1 inline-flex h-3.5 w-3.5" />
            </Link>
          </div>
        </nav>

        <p className="mx-auto max-w-lg text-center text-xs text-balance text-foreground/60 lg:text-right">
          All design, music, and written content on Archaic Horizon is protected
          by the Creative Commons{" "}
          <Link
            href={ROUTES.EXTERNAL.CREATIVE_COMMONS}
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-colors hover:text-foreground/80"
          >
            CC BY-NC-ND 4.0
          </Link>{" "}
          License unless otherwise specified.
        </p>
      </div>
    </div>
  );
}
