import Body from "../components/Body";
import Now from "../components/Now";
export default function page() {
  return (
    <section>
      <Body
        activePage="/now"
        description={
          <>
            The Future is Present.. <span className="text-[#4447A9]"> Now</span>
          </>
        }
      />
      <Now/>
    </section>
  );
}
