"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative isolate pt-[var(--header-h)] overflow-hidden bg-slate-50">
      {/* Background Gradients/Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-emerald-300/20 blur-[100px] animate-blob" />
        <div className="absolute top-[20%] -right-[10%] h-[500px] w-[500px] rounded-full bg-blue-300/20 blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-[10%] left-[20%] h-[500px] w-[500px] rounded-full bg-purple-300/20 blur-[100px] animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-start lg:items-stretch gap-12 px-6 pt-4 pb-0 lg:pt-12 lg:pb-0 min-h-[520px] lg:min-h-[560px]">
        {/* Left: Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-slate-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-semibold text-slate-700">Partner Transformasi Digital</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
            Transformasikan Bisnis Anda Menjadi Go <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Digital</span>
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Kami membantu Anda membangun kehadiran digital yang kuat dengan website modern, aplikasi custom, dan strategi marketing yang terukur.
          </p>

          <div className="flex flex-row gap-4 w-full sm:w-auto justify-center">
            <Link
              href="/contact"
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 sm:px-8 py-2.5 sm:py-3.5 text-sm sm:text-base font-bold text-white transition-all bg-slate-900 rounded-lg hover:bg-slate-800 hover:shadow-lg hover:-translate-y-1"
            >
              Konsultasi Gratis
            </Link>
            <Link
              href="/services"
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 sm:px-8 py-2.5 sm:py-3.5 text-sm sm:text-base font-bold text-slate-700 transition-all bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm"
            >
              Lihat Layanan
            </Link>
          </div>

          {/* Social Proof removed per request */}
        </div>

        {/* Right: Visual */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none flex items-end justify-center lg:h-full">
          <img
            src="/images/model.webp"
            alt="Model"
            className="w-64 sm:w-80 lg:w-[28rem] h-auto"
          />
          {/* Decorative elements */}
          <div className="absolute -top-12 -right-12 h-24 w-24 bg-primary/10 rounded-full blur-2xl animate-pulse-soft" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse-soft" />
        </div>
      </div>
    </section>
  );
}
