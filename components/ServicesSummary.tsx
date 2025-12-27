"use client";

import { useState } from "react";

import {
  ComputerDesktopIcon,
  PaintBrushIcon,
  ChartBarIcon,
  CloudIcon,
} from "@heroicons/react/24/outline";

// Data untuk kartu layanan dengan ikon SVG
const services = [
  {
    Icon: ComputerDesktopIcon,
    title: "Pengembangan Website & Aplikasi",
    description:
      "Membangun website dan aplikasi mobile yang responsif, cepat, dan aman untuk menjangkau audiens Anda.",
  },
  {
    Icon: PaintBrushIcon,
    title: "Desain UI/UX",
    description:
      "Merancang antarmuka yang intuitif dan pengalaman pengguna yang memikat untuk meningkatkan kepuasan pelanggan.",
  },
  {
    Icon: ChartBarIcon,
    title: "Strategi Digital & SEO",
    description:
      "Meningkatkan visibilitas online Anda dan mendatangkan trafik berkualitas melalui strategi SEO yang terbukti.",
  },
  {
    Icon: CloudIcon,
    title: "Solusi Enterprise & Cloud",
    description:
      "Mengoptimalkan proses bisnis dengan sistem enterprise dan infrastruktur cloud yang andal dan skalabel.",
  },
];

export default function ServicesSummary() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="services" className="relative overflow-hidden py-24 sm:py-32 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-slate-50 blur-3xl opacity-50 pointer-events-none"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div data-aos="fade-up">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold tracking-wider mb-4 border border-emerald-100">
            LAYANAN KAMI
          </span>
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Solusi Digital untuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">Pertumbuhan Anda</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 leading-relaxed">
            Kami menawarkan solusi digital terintegrasi yang dirancang khusus untuk membuat bisnis Anda berjalan lebih efektif dan kompetitif.
          </p>
        </div>

        {/* Grid Kartu Layanan */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className={`group relative rounded-3xl border p-8 text-left shadow-lg transition-all duration-300 cursor-pointer ${activeIndex === index
                ? "bg-emerald-600 border-emerald-600 shadow-xl shadow-emerald-600/20 -translate-y-2"
                : "bg-white border-slate-100 shadow-slate-200/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/30"
                }`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${activeIndex === index
                  ? "bg-white/20 text-white scale-110"
                  : "bg-slate-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-110"
                  }`}
              >
                <service.Icon className="h-7 w-7" />
              </div>
              <h3
                className={`mb-3 text-xl font-bold transition-colors ${activeIndex === index
                  ? "text-white"
                  : "text-slate-900 group-hover:text-emerald-600"
                  }`}
              >
                {service.title}
              </h3>
              <p
                className={`leading-relaxed transition-colors ${activeIndex === index ? "text-emerald-100" : "text-slate-600"
                  }`}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
