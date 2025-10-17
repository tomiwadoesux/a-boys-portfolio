export default function VideoDisplay({ video }) {
  return (
    <div>
      <div className="w-full h-[28vw] flex items-center justify-center bg-gray-200 relative">
        {/* Replace with <video controls src={video.src} /> or an actual thumbnail */}
        <div className="text-center text-basetext-gray-700">{video.title}</div>
      </div>
      <div className=" flex pt-3 flex-row justify-between">
        <h6 className="text-xs">Hon Odedo</h6>
        <h6 className="underline text-xs underline-offset-2">Visit Website</h6>
      </div>
      
    </div>
  );
}
