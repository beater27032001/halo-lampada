/** Versão em CSS da luminária, para navegadores sem WebGL. */
export function Fallback() {
  return (
    <div className="absolute inset-x-[14%] bottom-[11%] aspect-square rounded-full bg-[conic-gradient(from_210deg,#f4f4f1,#b9bbb6,#ecedea,#9fa29c,#f4f4f1)] p-[clamp(10px,2.4vw,18px)] shadow-[0_30px_50px_-20px_rgb(0_0_0/.35)]">
      <div className="size-full rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,#f6f4ef_78%,rgb(var(--k)))_0%,rgb(var(--k))_100%)] shadow-[inset_0_0_0_10px_rgb(var(--k)),0_0_24px_6px_rgb(var(--k)/.9)]" />
    </div>
  )
}
