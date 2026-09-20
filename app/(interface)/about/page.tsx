import { AboutContent } from "@/app/components/AboutContent";
import { ContentWrapper } from "@/app/components/ContentWrapper";
import { PanelHeader } from "@/app/components/PanelHeader";
import { PanelChrome } from "@/app/components/PanelChrome";

export default function AboutPage() {
  return (
    <PanelChrome header={<PanelHeader title="About" />}>
      <ContentWrapper className="px-8 pt-12 pb-8">
        <AboutContent />
      </ContentWrapper>
    </PanelChrome>
  );
}
