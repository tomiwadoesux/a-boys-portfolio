import Body from "../components/Body";
import List from "../components/List";


export default function page() {
  return (
    <section>
         <Body
      description={
        <>
          Everything you can imagine is real.. {" "}
          <span className="text-[#027864]"> Playground :0</span>
        </>
      }
    />
    <List/>
    </section>
   
  );
}
