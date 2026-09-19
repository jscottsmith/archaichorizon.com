import { SITE } from "@/app/constants/site";
import { ContentWrapper } from "@/app/components/ContentWrapper";
import { PanelHeader } from "@/app/components/PanelHeader";
import { PanelChrome } from "@/app/components/PanelChrome";

export default function ContactPage() {
  return (
    <PanelChrome header={<PanelHeader title="Contact" />}>
      <ContentWrapper>
        <p className="text-sm leading-relaxed text-foreground/80">
          Reach out to us at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="underline transition-colors hover:text-foreground"
          >
            {SITE.email}
          </a>
        </p>
      </ContentWrapper>
    </PanelChrome>
  );
}
