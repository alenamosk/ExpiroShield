import NavBar from "@/components/NavBar";
import Timeline from "@/components/Timeline";

const MyProducts = () => {
  return (
    <>
      <div className="">
        <div className="py-20 fixed right-0 pointer-events-none h-screen">
          <div className="timeline-main w-40 h-full" />
        </div>
        <NavBar />
        <Timeline />
      </div>
    </>
  );
};
export default MyProducts;
