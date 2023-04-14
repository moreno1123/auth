import Navigation from "@/components/navigation/Navigation";

export default function Home() {

  return (
    <div className="home min-h-screen flex flex-col gap-10 items-start justify-start">
      <Navigation/>

      <div className="w-full self-center flex items-center justify-center">
        <p>Home screen</p>
      </div>
    </div>
  );
}
