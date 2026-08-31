import { SITE } from "@/app/constants/site";
import { PanelContent } from "@/app/components/PanelContent";

export default function ContactPage() {
  return (
    <PanelContent>
      <h1 className="mb-4 text-2xl font-bold">Contact</h1>
      <p className="text-sm leading-relaxed text-foreground/80">
        Reach out to us at{" "}
        <a
          href={`mailto:${SITE.email}`}
          className="underline transition-colors hover:text-foreground"
        >
          {SITE.email}
        </a>
      </p>
    </PanelContent>
  );
}
