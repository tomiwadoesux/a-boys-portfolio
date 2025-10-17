import Body from "../components/Body";
import Now from "../components/Now";
export default function page() {
  return (
    <section>
      <Body
        description={
          <>
            The Future is Present.. <span className="text-[#027864]"> Now</span>
          </>
        }
      />
      <Now/>
    </section>
  );
}
