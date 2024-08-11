import {cn} from "@/lib/utils";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  // TODO: Add a Skeleton UI
  return (
      <section
          className={cn(`
          min-h-screen
          flex justify-center items-center
          `)}
      >
        Loading...
      </section>
  );
}