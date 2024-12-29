import Link from "next/link";
import { cn, nFormatter } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

export default async function Etjah() {
  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-24">
      <div className="container flex max-w-screen-md flex-col items-center gap-5 text-center">
        
        {/* External Link to start your company */}
        <Link
          href="https://next-saas-stripe-starter.vercel.app/"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm", rounded: "xl" }),
            "px-4"
          )}
          target="_blank"
        >
          <span className="mr-3">🎉</span> All you need to start your company
        </Link>

        {/* Main Heading */}
        <h1 className="text-balance font-satoshi text-[40px] font-black leading-[1.15] tracking-tight sm:text-5xl md:text-6xl md:leading-[1.15]">
          All in one app{" "}
          <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Start Now!
          </span>
        </h1>

        {/* Optional Description */}
        <p className="max-w-2xl text-balance text-muted-foreground sm:text-lg">
          {/* You can add a description or benefits here */}
        </p>

        {/* CTA Button to Dashboard */}
        <div className="flex justify-center space-x-2">
          <Link
            href="/dashboard"
            prefetch={true}
            className={cn(
              buttonVariants({ rounded: "xl", size: "lg" }),
              "gap-2 px-5 text-[15px]"
            )}
          >
            <span>Go to Dashboard</span>
            <Icons.arrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
