import "@google/model-viewer";

const ThreeDPhone = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-base-200 p-12">
        <model-viewer
          src="dist/models/cell_phone.glb"
          style={{ width: "100%", height: "500px" }}
          camera-controls
          auto-rotate
          ar
        ></model-viewer>
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default ThreeDPhone;
