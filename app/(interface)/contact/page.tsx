import { SITE } from "@/app/constants/site";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen h-full flex-col">
      <Card className="my-auto mx-auto max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold">Contact</h1>
        </CardHeader>
        <CardContent>
          <article>
            <p>
              Reach out to us at{" "}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </article>
        </CardContent>
      </Card>
    </div>
  );
}
