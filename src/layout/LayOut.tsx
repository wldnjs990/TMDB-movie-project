import { Outlet } from "react-router";

export default function LayOut() {
  return (
    <main className="bg-black text-white flex flex-col gap-[20px] min-h-screen">
      <section className="w-[80%] mx-auto py-[50px] px-[50px]">
        <Outlet />
      </section>
    </main>
  );
}
