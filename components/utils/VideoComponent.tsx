export const VideoComponent = () => {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-1/2 p-4 bg-white rounded-lg shadow-lg">
        <video className="w-full h-auto" controls autoPlay loop muted={true}>
          <source src="/assets/dev.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
