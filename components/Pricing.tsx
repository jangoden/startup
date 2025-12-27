"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const tiers = [
  {
    name: "Basic",
    id: "tier-basic",
    href: "/contact?plan=basic",
    price: { monthly: "Rp 1.5Jt", annually: "Rp 15Jt" },
    description: "Solusi esensial untuk memulai kehadiran digital Anda.",
    features: [
      "Desain Website Kustom (hingga 5 halaman)",
      "Hosting & Domain (1 tahun)",
      "Optimasi SEO Dasar",
      "Dukungan Email",
    ],
    featured: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    href: "/contact?plan=pro",
    price: { monthly: "Rp 4Jt", annually: "Rp 40Jt" },
    description: "Untuk bisnis yang sedang berkembang dan butuh fitur lebih.",
    features: [
      "Semua di paket Basic",
      "Desain Website (hingga 12 halaman)",
      "Integrasi CMS (WordPress/Lainnya)",
      "Optimasi SEO Lanjutan",
      "Laporan Analitik Bulanan",
      "Dukungan Prioritas (Email & Telepon)",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "/contact?plan=enterprise",
    price: { monthly: "Kustom", annually: "Kustom" },
    description: "Solusi lengkap untuk perusahaan dengan kebutuhan kompleks.",
    features: [
      "Semua di paket Pro",
      "Halaman tidak terbatas",
      "Pengembangan Fitur Kustom",
      "Integrasi API & Pihak Ketiga",
      "Dedicated Account Manager",
      "Perjanjian Tingkat Layanan (SLA)",
    ],
    featured: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Pricing() {
  return (
    <section id="pricing" className="bg-slate-50 py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center" data-aos="fade-up">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold tracking-wider mb-4">
            HARGA & PAKET
          </span>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Investasi Cerdas untuk Bisnis Anda
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Pilih paket yang paling sesuai dengan skala dan kebutuhan bisnis Anda saat ini.
          </p>
        </div>

        <div className="isolate mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured ? "bg-white ring-2 ring-emerald-500 shadow-xl scale-105" : "bg-white shadow-lg ring-1 ring-slate-200 hover:shadow-xl",
                "relative rounded-3xl p-8 transition-all duration-300"
              )}
              data-aos="fade-up"
              data-aos-delay={tier.featured ? "100" : "0"}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className={classNames(tier.featured ? "text-emerald-600" : "text-slate-900", "text-xl font-bold leading-8")}>{tier.name}</h3>
                  {tier.featured && <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">Most Popular</span>}
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-slate-900">{tier.price.monthly}</span>
                  <span className="text-sm font-semibold leading-6 text-slate-600">/bulan</span>
                </p>
              </div>

              <Link
                href={tier.href}
                className={classNames(
                  tier.featured
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-500"
                    : "bg-slate-800 text-white hover:bg-slate-700",
                  "mt-8 block w-full rounded-full py-3 px-3 text-center text-sm font-bold leading-6 transition-all hover:-translate-y-1"
                )}
              >
                Pilih Paket {tier.name}
              </Link>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-slate-600">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-emerald-500" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
