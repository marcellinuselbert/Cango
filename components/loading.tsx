function Loading() {
  return (
    <div className="pt-36 h-screen animate-color-change-2x">
      <div className="flex justify-center spinner ">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      <div className="flex justify-center animate-bounce">
        Building Cango Chat
      </div>
    </div>
  );
}
export default Loading;
