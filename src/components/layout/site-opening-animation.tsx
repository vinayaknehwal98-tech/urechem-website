import Image from "next/image";

export function SiteOpeningAnimation() {
  return (
    <div aria-hidden="true" className="site-opening-animation">
      <div className="site-opening-animation__spread" />
      <div className="site-opening-animation__shadow" />
      <div className="site-opening-animation__drop">
        <Image
          alt=""
          className="h-full w-full object-contain"
          height={256}
          priority
          src="/brand/urechem-mark.png"
          width={256}
        />
      </div>
    </div>
  );
}
