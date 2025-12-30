import PageConfig from "../components/PageConfig";
import WritingsList from "../components/WritingsList";
import Down from "../components/Down";
import MusicWidgetWrapper from "../components/MusicWidgetWrapper";

export const metadata = {
  title: "Writings | Wale-Durojaye Ayotomiwa",
  description: "Thoughts",
};

export default function Writings() {
  return (
    <div className="pt-16 md:pt-20">
      <PageConfig
        description={
          <>
            <span className="text-[#4447A9]">Writings</span> on Anything
          </>
        }
        activePage="/writings"
      />

      <WritingsList />
    </div>
  );
}
