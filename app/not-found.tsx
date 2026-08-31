import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Background } from "./components/Background";
import { ROUTES } from "./constants/routes";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <>
      <Background />
      <div className="relative flex h-dvh flex-col overflow-hidden">
        <div className="flex flex-1 items-center justify-center p-4">
          <Card className="max-w-md">
            <CardHeader>
              <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
              <p>The page you&apos;re looking for doesn&apos;t exist.</p>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
