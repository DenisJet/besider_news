import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b">
      <div className="max-w-7xl m-auto relative p-[20px]">
        <Sheet>
          <SheetTrigger className="absolute left-[20px] top-[24px] cursor-pointer">
            <Menu />
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-[540px]">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Main nav menu
            </SheetDescription>
            <nav className="px-[20px] h-full flex flex-col justify-center">
              <ul className="font-bold text-[22px] text-neutral-950 uppercase flex flex-col gap-[28px]">
                <li>
                  <a href="/">Science</a>
                </li>
                <li>
                  <a href="/">General</a>
                </li>
                <li>
                  <a href="/">Entertainment</a>
                </li>
                <li>
                  <a href="/">Technology</a>
                </li>
                <li>
                  <a href="/">Business</a>
                </li>
                <li>
                  <a href="/">Health</a>
                </li>
                <li>
                  <a href="/">Sports</a>
                </li>
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
        <p className="font-bold text-2xl uppercase">Besider</p>
      </div>
    </header>
  );
}
