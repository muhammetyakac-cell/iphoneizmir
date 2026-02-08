import React from 'react';
import {
  Sparkles,
  MoonStar,
  Eye,
  Hand,
  Stars,
  BookOpenText,
  Flame,
  ShieldCheck,
  Gem,
  MessageCircle,
  PhoneCall,
  HeartHandshake,
} from 'lucide-react';

const tools = [
  {
    icon: <MoonStar className="h-6 w-6" />,
    title: 'Yıldızname Analizi',
    description:
      'Doğum haritanızla kişisel yolculuğunuzu, fırsat dönemlerini ve kader çizgilerinizi keşfedin.',
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: 'Sezgi Aynası',
    description:
      'Medyumik algıların açıldığı özel seanslarla geçmiş ve geleceğin mesajlarını yorumlayın.',
  },
  {
    icon: <Hand className="h-6 w-6" />,
    title: 'Tarot & Kart Açılımı',
    description:
      'Aşk, kariyer ve ruhsal yolculuk için 12 kartlık derin okuma paketleri.',
  },
  {
    icon: <Stars className="h-6 w-6" />,
    title: 'Rüya Kodları',
    description:
      'Tekrarlayan rüyalarınıza mistik bir rehberlik ve bilinçaltı çözümlemesi.',
  },
  {
    icon: <BookOpenText className="h-6 w-6" />,
    title: 'Enerji Günlüğü',
    description:
      'Günlük aura raporları ile ruh halinizin frekansını takip edin.',
  },
  {
    icon: <Flame className="h-6 w-6" />,
    title: 'Karmik Temizleme',
    description:
      'Negatif bağlardan arınmak için özel ritüel rehberleri ve koruma çalışmaları.',
  },
];

const packages = [
  {
    title: 'Başlangıç Seansı',
    price: '750₺',
    details: ['30 dk canlı görüşme', '3 soruluk tarot açılımı', 'Kısa enerji raporu'],
  },
  {
    title: 'Derin Yolculuk',
    price: '1.450₺',
    details: [
      '60 dk medyum rehberliği',
      '12 kartlık detaylı tarot',
      'Karmik analiz + öneriler',
    ],
    highlighted: true,
  },
  {
    title: 'Aylık Rehberlik',
    price: '2.400₺',
    details: [
      'Haftalık 4 seans',
      'Günlük aura notları',
      'Öncelikli danışmanlık hattı',
    ],
  },
];

const testimonials = [
  {
    name: 'Selin A.',
    title: 'Medyum danışan',
    quote:
      'Seans sonrası hayatımda netlik geldi. Enerji raporlarıyla kararlarımı daha güvenle alıyorum.',
  },
  {
    name: 'Can B.',
    title: 'Tarot danışanı',
    quote:
      'Kart açılımları o kadar detaylıydı ki soru işaretlerim tamamen dağıldı.',
  },
  {
    name: 'Elif M.',
    title: 'Yıldızname kullanıcısı',
    quote:
      'Doğum haritamda bana özel uyarılarla yeni bir döneme hazırlandım.',
  },
];

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(217,70,239,0.35),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(14,165,233,0.25),_transparent_55%)]" />
        <nav className="relative z-10 flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-3 text-lg font-semibold tracking-[0.3em] uppercase">
            <Sparkles className="text-fuchsia-400" />
            AuraMystic
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#tools" className="hover:text-white transition">
              Araçlar
            </a>
            <a href="#packages" className="hover:text-white transition">
              Seanslar
            </a>
            <a href="#insights" className="hover:text-white transition">
              İçgörüler
            </a>
            <a href="#contact" className="hover:text-white transition">
              İletişim
            </a>
          </div>
          <button className="rounded-full bg-fuchsia-500/90 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white shadow-lg shadow-fuchsia-500/30 hover:bg-fuchsia-400">
            Hemen Başla
          </button>
        </nav>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-10 px-8 pb-24 pt-10 md:flex-row md:items-center">
          <div className="flex-1 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-fuchsia-200">
              Medyumluk & Fal Teknolojisi
            </span>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Ruhsal rehberliğinizi modern araçlarla buluşturan
              <span className="text-fuchsia-400"> mistik bir merkez.</span>
            </h1>
            <p className="max-w-xl text-lg text-slate-300">
              AuraMystic, sezgisel danışmanlık, tarot, yıldızname ve enerji
              okumalarını tek bir platformda sunar. Gerçek zamanlı sohbet,
              ritüel planları ve kişisel raporlarla yeni bir deneyime adım atın.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="rounded-full bg-fuchsia-500 px-6 py-3 text-sm font-semibold uppercase tracking-widest shadow-xl shadow-fuchsia-500/30 hover:bg-fuchsia-400">
                Ücretsiz Ön Görüşme
              </button>
              <button className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-slate-200 hover:border-fuchsia-400">
                Paketleri İncele
              </button>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                Gizlilik odaklı seanslar
              </div>
              <div className="flex items-center gap-2">
                <Gem className="h-5 w-5 text-yellow-300" />
                Özel ritüel içerikleri
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-rose-300" />
                %96 memnuniyet puanı
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative mx-auto max-w-sm rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl">
              <div className="absolute -top-6 right-6 rounded-full bg-fuchsia-500/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                Canlı
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-fuchsia-500/20 p-3 text-fuchsia-300">
                    <MoonStar />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Aura Okuma Seansı</p>
                    <p className="text-sm text-slate-400">Şu an aktif danışman</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-300">
                  “Sezginiz bugün yüksek. Yeni bir başlangıç için doğru gündesiniz.”
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Rapor tamamlanma</span>
                  <span className="text-fuchsia-200">%82</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400" />
                </div>
                <button className="w-full rounded-2xl bg-white/10 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white">
                  Seansa Katıl
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="tools" className="mx-auto max-w-6xl px-8 py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-fuchsia-300">
              Araç Kütüphanesi
            </p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
              Fal ve medyumluk için özelleştirilmiş araçlar
            </h2>
          </div>
          <p className="max-w-lg text-sm text-slate-400">
            Dijital rehberlik paneli ile kişisel ritüellerinizi planlayın, sezgi
            raporlarınızı takip edin ve danışmanlarınıza tek tıkla ulaşın.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-lg transition hover:-translate-y-1 hover:border-fuchsia-500/60"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/20 text-fuchsia-200">
                {tool.icon}
              </div>
              <h3 className="mt-5 text-xl font-semibold">{tool.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{tool.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="insights" className="bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-8 py-20">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold md:text-4xl">
                Kişisel içgörü raporlarıyla yolculuğunuzu haritalayın
              </h2>
              <p className="text-slate-300">
                Her seansın ardından enerji yoğunluğu, sezgi seviyesi ve ritüel
                önerilerini içeren özel bir rapor alırsınız. Bu raporlar, aylık
                döngülerinizi ve karar süreçlerinizi güçlendirir.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  'Seans sonrası 24 saat içinde rapor',
                  'Karmik etkiler için özel notlar',
                  'Günlük aura takvimi',
                  'Gizli soru-cevap günlüğü',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                  >
                    <Sparkles className="h-4 w-4 text-fuchsia-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-fuchsia-500/20 via-transparent to-cyan-400/30 p-8">
              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-fuchsia-200">
                    Bugünün Enerjisi
                  </p>
                  <p className="mt-4 text-3xl font-semibold">Yükseliş & Denge</p>
                  <p className="mt-3 text-sm text-slate-300">
                    Bu hafta iletişim ve yeni başlangıçlar için uygun bir enerji
                    akışı var.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
                  <p className="font-semibold text-white">Önerilen Ritüel</p>
                  <p className="mt-3">
                    Akşam saatlerinde ametist taşıyla 10 dakikalık nefes
                    meditasyonu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="mx-auto max-w-6xl px-8 py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-fuchsia-300">
            Seans Paketleri
          </p>
          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
            Size uygun danışmanlık planını seçin
          </h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {packages.map((item) => (
            <div
              key={item.title}
              className={`rounded-[32px] border p-8 shadow-xl transition ${
                item.highlighted
                  ? 'border-fuchsia-500 bg-gradient-to-br from-fuchsia-500/20 via-slate-900/70 to-cyan-500/20'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-fuchsia-200">
                {item.title}
              </p>
              <p className="mt-6 text-4xl font-semibold">{item.price}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {item.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-fuchsia-300" />
                    {detail}
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full rounded-2xl bg-white/10 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white hover:bg-fuchsia-500">
                Paketi Seç
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-8 py-20">
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="rounded-[28px] border border-white/10 bg-white/5 p-6"
              >
                <p className="text-sm text-slate-300">“{item.quote}”</p>
                <p className="mt-6 text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs text-slate-400">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-8 py-20">
        <div className="grid gap-10 rounded-[36px] border border-white/10 bg-gradient-to-br from-white/5 via-slate-900/40 to-fuchsia-500/10 p-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold md:text-4xl">
              Sizi dinlemeye hazırız
            </h2>
            <p className="text-slate-300">
              Danışmanlarımız haftanın 7 günü 10:00 - 23:00 arasında hizmet verir.
              Size en uygun zamanı seçin, sorularınızı paylaşın.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 rounded-full bg-fuchsia-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em]">
                <MessageCircle className="h-4 w-4" /> Canlı Sohbet
              </button>
              <button className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em]">
                <PhoneCall className="h-4 w-4" /> Randevu Al
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-fuchsia-200">
                İletişim
              </p>
              <p className="mt-4 text-lg font-semibold">+90 (555) 320 45 67</p>
              <p className="text-sm text-slate-400">hello@auramystic.com</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
              <p className="font-semibold text-white">Gizlilik Taahhüdü</p>
              <p className="mt-3">
                Görüşmeleriniz uçtan uca şifreli saklanır ve üçüncü kişilerle
                paylaşılmaz.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-8 py-10 text-center text-xs text-slate-500">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Sparkles className="h-5 w-5 text-fuchsia-400" /> AuraMystic
          </div>
          <p>Fal, medyumluk ve spiritüel danışmanlık platformu.</p>
          <p>© 2024 AuraMystic. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
