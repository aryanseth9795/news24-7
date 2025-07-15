import Image from "next/image";
import Landing from "./_component/Landing";
import Header from "./_component/Header";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">

      <Header
        style={{ position: "static", top: 0, left: 0, right: 0, zIndex: 10 }}
      />
      <div className="flex h-screen  p-25 ">
        <Landing />
      </div>

     
    </div>
  );
}
