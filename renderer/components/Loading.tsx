export function Loading() {
  return (
    <div className="absolute w-screen h-screen flex items-center justify-center">
      <img width={64} height={64} className="opacity-20" src="https://liveblocks.io/loading.svg" alt="Loading" />
    </div>
  );
}