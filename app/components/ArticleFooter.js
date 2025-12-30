import Signature from "./svg/Signature";

export default function ArticleFooter({ authorName = "Ayotomiwa" }) {
  return (
    <div className="mt-12 pt-10 border-t border-gray-200 text-[#333]">
      <p className="mb-4">Have a wonderful day.</p>
      <p className="text-sm mb-2 text-[#111]">– {authorName}</p>
      <div className="w-32 opacity-80">
        <Signature />
      </div>
    </div>
  );
}
