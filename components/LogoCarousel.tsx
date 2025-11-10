// components/LogoCarousel.tsx
import Image from "next/image";

const logos = [
  { src: "/images/logo.svg", alt: "Logo Halal" },
  { src: "/images/logooo.png", alt: "Brand Logo 1" },
  { src: "/images/logo.svg", alt: "Brand Logo 2" },
  { src: "/images/logooo.png", alt: "Brand Logo 3" },
  { src: "/images/logo.svg", alt: "Brand Logo 4" },
  { src: "/images/logooo.png", alt: "Brand Logo 5" },
];

export default function LogoCarousel() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-xl font-semibold tracking-tight text-gray-800">
          Telah Dipercaya dan Didukung Oleh
        </h2>
        <div
          className="relative mt-10 overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="animate-scroll flex w-max">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="mx-8 flex w-[150px] flex-shrink-0 items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={60}
                  className="object-contain grayscale transition-all duration-300 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
