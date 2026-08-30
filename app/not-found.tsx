import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ROUTES } from "./constants/routes";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <>
      <div className="bg-gradient-radial relative flex min-h-screen w-full flex-col items-center justify-between gap-4 p-4">
        <Header />
        {/* <div className="flex flex-col justify-self-start items-center justify-center">
          <Link href="/">
            <Logo className="text-gray-900" width={150} />
          </Link>
          <h1 className="tracking-[0.75em] text-gray-900 text-xs uppercase -mt-4">
            Archaic Horizon
          </h1>
        </div> */}
        <Card className="my-auto max-w-md">
          <CardHeader>
            <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
            <p>The page you&apos;re looking for doesn&apos;t exist.</p>
          </CardHeader>
          <CardContent>
            <article>
              <p>
                However while you&apos;re here feel free to browse around and
                have a listen to some of the music we released.
              </p>
              <div className="mt-4 flex flex-row gap-2">
                <Link
                  href={ROUTES.COLLECTION}
                  className={cn(buttonVariants({ size: "sm" }))}
                >
                  Explore the Collection
                </Link>
                <Link
                  href={ROUTES.HOME}
                  className={cn(
                    buttonVariants({ size: "sm", variant: "secondary" })
                  )}
                >
                  Go Home
                </Link>
              </div>
            </article>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
