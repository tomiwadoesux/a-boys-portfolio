import Body from "../components/Body";
import List from "../components/List";


export default function page() {
  return (
    <section>
         <Body
      activePage="/list"
      description={
        <>
          Everything you can imagine is real.. {" "}
          <span className="text-[#4447A9]"> Playground :0</span>
        </>
      }
    />
    <List/>
    </section>

  );
}
