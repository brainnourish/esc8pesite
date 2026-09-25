import { Xray } from "./components/Xray/Xray";
import { Nav } from "./components/Nav/Nav";
import { Hero } from "./components/Hero/Hero";

export default function Home() {
  return (
    <>
      <Xray />
      <Nav />
      <main>
        <Hero />
      </main>
    </>
  );
}
