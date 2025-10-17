import TypewriterEffect from "./TypewriterEffect";

export default function Headd() {
  return (
    <div className="flex flex-row justify-between px-16 lg:px-8 w-full absolute top-7">
      <TypewriterEffect />
      <div className="self-start text-xs ">
        <h4>
         [ Available for Work ]
        </h4>
      </div>
    </div>
  );
}
