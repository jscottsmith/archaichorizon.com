import Link from "next/link";
import Logo from "./components/Logo";
import { Button } from "./components/ui";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ROUTES } from "./constants/routes";

export default function NotFound() {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col gap-4 justify-between items-center p-4 relative bg-gradient-radial">
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
              <div className="flex flex-row gap-2 mt-4">
                <Button size="sm" asChild>
                  <Link href={ROUTES.COLLECTION}>Explore the Collection</Link>
                </Button>
                <Button size="sm" variant="secondary" asChild>
                  <Link href={ROUTES.HOME}>Go Home</Link>
                </Button>
              </div>
            </article>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
