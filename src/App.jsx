import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Battery,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Droplets,
  Loader2,
  Lock,
  LogOut,
  Menu,
  MessageCircle,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  Smartphone,
  Wrench,
  X,
  Zap,
} from 'lucide-react';

const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbztX6gRkelRy6MrZ29J_LnM1re01jR1hYMF3sqPM65MBrrG6mR5O3PSnjm2fmU6q5s7/exec';

const App = () => {
  const [view, setView] = useState('user');
  const [activeArticle, setActiveArticle] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [formStep, setFormStep] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [trackCode, setTrackCode] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [toolAnswers, setToolAnswers] = useState({
    screenCrack: '',
    touchIssue: '',
    batteryDrain: '',
    faceIdIssue: '',
    waterDamage: '',
  });
  const [toolBudget, setToolBudget] = useState('Bütçe seçiniz');
  const [toolNeedPickup, setToolNeedPickup] = useState('Evet');
  const [tradeModel, setTradeModel] = useState('');
  const [tradeCondition, setTradeCondition] = useState('');
  const [tradeEstimate, setTradeEstimate] = useState(null);
  const [warrantyStatus, setWarrantyStatus] = useState('Bilmiyorum');
  const [etaModel, setEtaModel] = useState('');
  const [etaService, setEtaService] = useState('');

  const getEnv = (key, fallback) => {
    try {
      return import.meta.env[key] || fallback;
    } catch (error) {
      return fallback;
    }
  };

  const ADMIN_USERNAME = getEnv('VITE_ADMIN_USER', 'lapella');
  const ADMIN_PASSWORD = getEnv('VITE_ADMIN_PASS', 'Mami@@@2812');

  const [adminCreds, setAdminCreds] = useState({ username: '', password: '' });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: 'Buca',
    address: '',
    bookingDate: '',
    bookingTime: 'Öğleden Önce (09:00 - 12:00)',
  });

  const phoneNumber = '0532 427 28 12';
  const whatsappNumber = '905324272812';

  const prices = {
    'iPhone X': { screen: 2850, battery: 1350 },
    'iPhone XR': { screen: 2650, battery: 1350 },
    'iPhone XS': { screen: 2950, battery: 1400 },
    'iPhone XS Max': { screen: 3450, battery: 1450 },
    'iPhone 11': { screen: 3100, battery: 1550 },
    'iPhone 11 Pro': { screen: 3850, battery: 1650 },
    'iPhone 11 Pro Max': { screen: 4250, battery: 1750 },
    'iPhone 12 mini': { screen: 4450, battery: 1850 },
    'iPhone 12': { screen: 4950, battery: 1950 },
    'iPhone 12 Pro': { screen: 5450, battery: 1950 },
    'iPhone 12 Pro Max': { screen: 6250, battery: 2100 },
    'iPhone 13 mini': { screen: 5850, battery: 2250 },
    'iPhone 13': { screen: 6450, battery: 2250 },
    'iPhone 13 Pro': { screen: 8750, battery: 2450 },
    'iPhone 13 Pro Max': { screen: 9850, battery: 2650 },
    'iPhone 14': { screen: 7850, battery: 2650 },
    'iPhone 14 Plus': { screen: 8950, battery: 2850 },
    'iPhone 14 Pro': { screen: 11250, battery: 3100 },
    'iPhone 14 Pro Max': { screen: 12450, battery: 3350 },
    'iPhone 15': { screen: 10500, battery: 3250 },
    'iPhone 15 Plus': { screen: 11850, battery: 3450 },
    'iPhone 15 Pro': { screen: 14250, battery: 3650 },
    'iPhone 15 Pro Max': { screen: 15950, battery: 3850 },
    'iPhone 16': { screen: 12500, battery: 3550 },
    'iPhone 16 Plus': { screen: 13850, battery: 3750 },
    'iPhone 16 Pro': { screen: 16500, battery: 3950 },
    'iPhone 16 Pro Max': { screen: 18500, battery: 4250 },
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchRequests = async () => {
    if (!SHEET_URL) return;
    setIsLoading(true);
    try {
      const response = await fetch(SHEET_URL);
      const data = await response.json();
      if (Array.isArray(data)) setRequests(data.reverse());
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (view === 'admin') fetchRequests();
  }, [view]);

  const scrollToSection = (id) => {
    if (view !== 'user') {
      setView('user');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const currentPrice =
    selectedModel && selectedService && prices[selectedModel]
      ? selectedService === 'Ekran Değişimi'
        ? prices[selectedModel].screen
        : prices[selectedModel].battery
      : null;

  const handleSliderMove = (event) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    if (clientX < rect.left || clientX > rect.right) return;
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  const handleTrack = (event) => {
    event.preventDefault();
    setIsLoading(true);
    fetch(SHEET_URL)
      .then((res) => res.json())
      .then((data) => {
        const order = data.find((r) =>
          r.phone.replace(/\s/g, '').includes(trackCode),
        );
        setTrackedOrder(order || 'NOT_FOUND');
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedModel || !selectedService) {
      alert('Model ve işlem seçiniz.');
      return;
    }
    setIsLoading(true);

    const payload = {
      ...formData,
      model: selectedModel,
      service: selectedService,
      price: currentPrice
        ? `${currentPrice.toLocaleString('tr-TR')} ₺`
        : 'Fiyat Sorunuz',
    };

    const message =
      `🛠️ *YENİ SERVİS TALEBİ* 🛠️\n\n` +
      `👤 *Müşteri:* ${payload.name}\n` +
      `📞 *Tel:* ${payload.phone}\n` +
      `📅 *Randevu:* ${payload.bookingDate} (${payload.bookingTime})\n` +
      `📍 *Bölge:* ${payload.area}\n` +
      `🏠 *Adres:* ${payload.address}\n\n` +
      `📱 *Cihaz:* ${payload.model}\n` +
      `🔧 *İşlem:* ${payload.service}\n` +
      `💰 *Fiyat:* ${payload.price}`;

    try {
      if (SHEET_URL)
        fetch(SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      setTimeout(() => {
        window.open(
          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
          '_blank',
        );
        setFormStep(2);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        '_blank',
      );
      setFormStep(2);
      setIsLoading(false);
    }
  };

  const handleAdminLogin = (event) => {
    event.preventDefault();
    if (
      adminCreds.username === ADMIN_USERNAME &&
      adminCreds.password === ADMIN_PASSWORD
    ) {
      setView('admin');
    } else {
      alert('Giriş bilgileri yanlış!');
    }
  };

  const faqItems = [
    {
      question: 'Aynı gün servis mümkün mü?',
      answer:
        'Evet. İzmir içi yoğunluk durumuna göre aynı gün kurye yönlendirmesi ve onarım sağlıyoruz.',
    },
    {
      question: 'Ekran değişiminde True Tone korunuyor mu?',
      answer:
        'Evet. Cihazınız uygunsa True Tone kalibrasyonu yapıyoruz ve panel uyumluluğunu kontrol ediyoruz.',
    },
    {
      question: 'Garanti süresi ne kadar?',
      answer:
        'İşleme göre değişmekle birlikte ekran ve batarya değişimlerinde 6 ay servis garantisi sunuyoruz.',
    },
    {
      question: 'Randevu almadan gelebilir miyim?',
      answer:
        'Yoğunluk nedeniyle randevu öneriyoruz. Formu doldurmanız yeterli, en kısa sürede dönüş sağlıyoruz.',
    },
  ];

  const testimonials = [
    {
      name: 'Ece K.',
      area: 'Karşıyaka',
      text: 'Kurye 40 dakika içinde geldi, ekran değişimi aynı gün tamamlandı. Şeffaf fiyat, temiz işçilik.',
    },
    {
      name: 'Mehmet T.',
      area: 'Bornova',
      text: 'Batarya değişiminden sonra telefonum yeniden hızlandı. WhatsApp bilgilendirmeleri çok iyiydi.',
    },
    {
      name: 'Zeynep A.',
      area: 'Buca',
      text: 'Face ID sorunu çözüldü, süreç boyunca sürekli bilgi aldım. Güvenilir servis.',
    },
  ];

  const processSteps = [
    {
      title: 'Talep Oluştur',
      desc: 'Formdan cihaz ve işlem bilgilerini gir, fiyatı anında gör.',
    },
    {
      title: 'Kurye Planla',
      desc: 'Size uygun saat aralığını seç, kurye adresinden teslim alsın.',
    },
    {
      title: 'Onarım & Test',
      desc: 'Uzman teknisyenler onarım ve kalite kontrol yapar.',
    },
    {
      title: 'Teslimat',
      desc: 'Cihazınız güvenle aynı gün adresinize teslim edilir.',
    },
  ];

  const serviceAreas = [
    'Buca',
    'Bornova',
    'Karşıyaka',
    'Konak',
    'Balçova',
    'Gaziemir',
    'Bayraklı',
    'Çiğli',
    'Mavişehir',
    'Narlıdere',
    'Karabağlar',
    'Çeşme',
  ];

  const blogHighlights = [
    {
      title: 'iPhone ekran değişimi sonrası dikkat edilmesi gerekenler',
      desc: 'True Tone, ekran parlaklığı ve su yalıtımı için kritik öneriler.',
    },
    {
      title: 'iPhone batarya sağlığı nasıl yükseltilir?',
      desc: 'Şarj alışkanlıkları, sıcaklık etkisi ve bakım ipuçları.',
    },
    {
      title: 'Face ID sorunları neden olur?',
      desc: 'TrueDepth onarımı ve mikro lehimleme süreçleri.',
    },
  ];

  const leadMagnetItems = [
    'Ücretsiz ön arıza analizi',
    'Modelinize özel fiyat danışmanlığı',
    'Kurye planlama desteği',
  ];

  const socialProof = [
    { label: 'Aylık Onarım', value: '480+' },
    { label: 'Ortalama Süre', value: '2-4 Saat' },
    { label: 'Memnuniyet', value: '%98' },
  ];

  const tradeInBase = {
    'iPhone 11': 9500,
    'iPhone 12': 12500,
    'iPhone 13': 15500,
    'iPhone 14': 18500,
    'iPhone 15': 23500,
    'iPhone 16': 28500,
  };

  const tradeInModifiers = {
    'Mükemmel': 1,
    'İyi': 0.9,
    'Orta': 0.78,
    'Hasarlı': 0.6,
  };

  const budgetPriority = [
    'Hız',
    'Uygun Fiyat',
    'Orijinal Parça',
    'Kapsamlı Kontrol',
  ];

  const handleTradeEstimate = () => {
    if (!tradeModel || !tradeCondition) {
      setTradeEstimate(null);
      return;
    }
    const base = tradeInBase[tradeModel] || 0;
    const multiplier = tradeInModifiers[tradeCondition] || 0;
    setTradeEstimate(Math.round(base * multiplier));
  };

  const handleToolAnswer = (key, value) => {
    setToolAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const toolScore = Object.values(toolAnswers).filter(Boolean).length;
  const toolPriority =
    toolScore >= 4
      ? 'Cihazınız acil müdahale gerektiriyor.'
      : toolScore >= 2
        ? 'Kısa sürede servis önerilir.'
        : 'Ön kontrol ve fiyat önerisi sunabiliriz.';

  const etaResult = () => {
    if (!etaModel || !etaService) return null;
    if (etaService === 'Ekran Değişimi') return '40-60 dk';
    if (etaService === 'Batarya Değişimi') return '25-40 dk';
    return '60-120 dk';
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'İzmir iPhone Kapında Servisi',
    description:
      'İzmir genelinde iPhone ekran değişimi, batarya değişimi ve yerinde teknik servis.',
    areaServed: 'İzmir',
    telephone: phoneNumber,
    url: '',
    sameAs: [],
    openingHours: 'Mo-Su 09:00-21:00',
    serviceType: [
      'iPhone ekran değişimi',
      'iPhone batarya değişimi',
      'iPhone Face ID onarımı',
    ],
  };

  if (view === 'blog') {
    return (
      <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-fuchsia-500/30">
        <nav className="glass-nav border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <BookOpen className="text-fuchsia-400" />
            <span className="font-black text-slate-100 uppercase tracking-[0.2em] text-xs">
              iPhone Rehberi
            </span>
          </div>
          <button
            onClick={() => {
              setView('user');
              setActiveArticle(null);
            }}
            className="text-slate-400 font-bold hover:text-fuchsia-300 transition flex items-center gap-2"
          >
            <ArrowRight className="rotate-180" size={18} /> Geri Dön
          </button>
        </nav>

        <div className="container mx-auto p-6 max-w-4xl py-12 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

          {!activeArticle ? (
            <div className="space-y-12 relative z-10">
              <div className="text-center space-y-4">
                <span className="bg-white/10 backdrop-blur text-fuchsia-200 px-4 py-1 rounded-full text-xs font-black uppercase tracking-[0.25em]">
                  İzmir Teknik Servis Blogu
                </span>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                  iPhone Bakım & Onarım Rehberi
                </h1>
                <p className="text-slate-300 font-medium max-w-2xl mx-auto text-lg">
                  Cihazınızın ömrünü uzatacak ipuçları ve teknik servis süreçleri
                  hakkında uzman görüşleri.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    id: 'battery',
                    icon: <Battery size={28} />,
                    color: 'bg-emerald-500/20 text-emerald-300',
                    title: 'iPhone Pil Sağlığı Nasıl Korunur?',
                    desc: "Batarya sağlığınızı %100'de tutmanın sırları, şarj döngüleri ve İzmir sıcağının pile etkileri.",
                  },
                  {
                    id: 'faceid',
                    icon: <Lock size={28} />,
                    color: 'bg-fuchsia-500/20 text-fuchsia-200',
                    title: 'Face ID Tamiri Mümkün mü?',
                    desc: '"Face ID kullanılamıyor" hatası, TrueDepth kamera onarımı ve mikro lehimleme detayları.',
                  },
                  {
                    id: 'screen',
                    icon: <Smartphone size={28} />,
                    color: 'bg-cyan-500/20 text-cyan-200',
                    title: 'Revize Ekran vs Orijinal Ekran',
                    desc: 'Cam değişimi ile panel değişimi arasındaki farklar ve True Tone aktarımı.',
                  },
                  {
                    id: 'water',
                    icon: <Droplets size={28} />,
                    color: 'bg-indigo-500/20 text-indigo-200',
                    title: "Suya Düşen iPhone'a İlk Müdahale",
                    desc: 'Pirince koymak işe yarar mı? Oksitlenmeyi önleme ve güvenli kurtarma adımları.',
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveArticle(item.id)}
                    className="glass-card p-8 rounded-[32px] hover:scale-[1.02] transition cursor-pointer group border border-white/10 shadow-xl bg-white/5"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.color}`}
                    >
                      {item.icon}
                    </div>
                    <h2 className="text-2xl font-black mb-3 group-hover:text-white transition">
                      {item.title}
                    </h2>
                    <p className="text-slate-300 line-clamp-3">{item.desc}</p>
                    <span className="text-fuchsia-200 font-bold text-sm mt-4 block uppercase tracking-wide">
                      Devamını Oku &rarr;
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-[40px] shadow-2xl border border-white/10 relative z-10 animate-in fade-in slide-in-from-bottom-4">
              <button
                onClick={() => setActiveArticle(null)}
                className="mb-8 text-slate-400 font-bold flex items-center gap-2 hover:text-fuchsia-300"
              >
                <ArrowRight className="rotate-180" /> Listeye Dön
              </button>

              {activeArticle === 'battery' && (
                <article className="prose prose-invert lg:prose-xl">
                  <h1 className="text-4xl font-black text-white mb-6">
                    iPhone Pil Sağlığı Nasıl Korunur?
                  </h1>
                  <p className="text-lg leading-relaxed mb-6">
                    iPhone’unuzun bataryası zamanla tükenen kimyasal bir
                    bileşendir. Ancak doğru kullanım alışkanlıkları ile bu
                    süreci yavaşlatabilir ve telefonunuzu yıllarca tam
                    performansla kullanabilirsiniz.
                  </p>
                  <h3 className="text-2xl font-bold text-white mt-8 mb-4">
                    1. Şarj Döngüsünü Yönetin
                  </h3>
                  <p className="mb-4">
                    Apple lityum-iyon pilleri %20 ile %80 arasında tutmayı sever.
                    Telefonunuzu sürekli %0’a kadar bitirmek veya gece boyu
                    %100’de tutmak pil hücrelerini strese sokar.
                  </p>
                  <h3 className="text-2xl font-bold text-white mt-8 mb-4">
                    2. Sıcaklık Düşmanınızdır
                  </h3>
                  <p className="mb-4">
                    İzmir gibi sıcak şehirlerde, telefonu güneş altında araç ön
                    konsolunda bırakmak pile kalıcı hasar verir. 35°C üzeri
                    sıcaklıklar pil kapasitesini düşürebilir.
                  </p>
                  <div className="bg-white/10 border border-white/10 p-4 rounded-2xl">
                    <p className="font-bold text-fuchsia-200">Servis Notu:</p>
                    <p className="text-slate-200">
                      Pil sağlığınız %80’in altına düştüyse yazılımsal
                      yavaşlatma başlar. Servisimizde 20 dakikada, pil
                      sağlığını %100’e getiren orijinal kapasiteli değişim
                      yapıyoruz.
                    </p>
                  </div>
                </article>
              )}

              {activeArticle === 'faceid' && (
                <article className="prose prose-invert lg:prose-xl">
                  <h1 className="text-4xl font-black text-white mb-6">
                    Face ID Tamiri Mümkün mü?
                  </h1>
                  <p className="text-lg leading-relaxed mb-6">
                    Birçok kullanıcı Face ID bozulduğunda telefonun bir daha
                    asla yüz okumayacağını sanır. Ancak bu doğru değildir. Face
                    ID, TrueDepth kamera sistemi ve Dot Projector bileşenlerinden
                    oluşur.
                  </p>
                  <h3 className="text-2xl font-bold text-white mt-8 mb-4">
                    Onarım Süreci
                  </h3>
                  <p className="mb-6">
                    Eskiden Face ID parçaları anakarta şifreliydi ve değişimi
                    imkansızdı. Ancak yeni tekniklerle, eski sensörden şifreli
                    çip alınıp yeni bir flex kabloya aktarılarak (mikro
                    lehimleme) Face ID %100 onarılabilmektedir.
                  </p>
                </article>
              )}

              {(activeArticle === 'screen' || activeArticle === 'water') && (
                <div className="text-center py-20">
                  <Wrench size={64} className="mx-auto text-slate-600 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-400">
                    Bu makale hazırlanıyor...
                  </h2>
                  <p className="text-slate-500">Çok yakında eklenecek.</p>
                </div>
              )}

              <button
                onClick={() => scrollToSection('appointment')}
                className="w-full bg-fuchsia-500 text-white py-4 rounded-2xl font-black text-lg hover:bg-fuchsia-400 transition shadow-lg shadow-fuchsia-500/30 mt-12"
              >
                Hemen Servis Randevusu Al
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (view === 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
        <nav className="glass-nav bg-white/5 border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="bg-fuchsia-500/80 p-2 rounded-lg text-white">
              <Smartphone size={20} />
            </div>
            <span className="font-black text-slate-100 uppercase tracking-[0.35em] text-xs">
              YÖNETİCİ PANELİ
            </span>
          </div>
          <button
            onClick={() => setView('user')}
            className="text-rose-300 font-bold flex items-center gap-2 px-4 py-2 rounded-xl transition text-sm hover:text-rose-200"
          >
            <LogOut size={18} /> Çıkış
          </button>
        </nav>
        <div className="container mx-auto p-6 max-w-5xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-black">Talepler ({requests.length})</h2>
            <button
              onClick={fetchRequests}
              className="p-2 bg-fuchsia-500 text-white rounded-xl shadow-lg shadow-fuchsia-500/30"
            >
              <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
            </button>
          </div>
          <div className="grid gap-4">
            {requests.map((req, idx) => (
              <div
                key={idx}
                className="glass-card bg-white/5 p-6 rounded-[32px] border border-white/10 shadow-sm flex flex-col md:flex-row justify-between gap-6 hover:shadow-md transition backdrop-blur-sm"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="bg-fuchsia-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      YENİ
                    </span>
                    <span className="text-slate-400 text-xs font-bold">
                      {req.date
                        ? new Date(req.date).toLocaleString('tr-TR')
                        : 'Bugün'}
                    </span>
                  </div>
                  <h4 className="font-black text-xl">{req.name}</h4>
                  <p className="text-fuchsia-200 font-bold flex items-center gap-2 underline">
                    <Phone size={14} /> {req.phone}
                  </p>
                  <p className="text-slate-400 text-sm font-medium">
                    {req.area} - {req.address}
                  </p>
                  <p className="text-amber-300 text-xs font-bold uppercase tracking-widest">
                    🗓️ Randevu: {req.bookingDate} | {req.bookingTime}
                  </p>
                </div>
                <div className="bg-slate-900 text-white p-6 rounded-3xl md:w-64 flex flex-col justify-center text-center border border-white/10 shadow-xl">
                  <p className="text-[10px] text-fuchsia-200 font-bold uppercase mb-1 tracking-widest">
                    {req.model}
                  </p>
                  <p className="text-sm font-medium">{req.service}</p>
                  <p className="font-black mt-2 text-2xl text-white">{req.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-fuchsia-500 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

        <div className="glass-card bg-white/5 p-10 rounded-[40px] w-full max-w-md shadow-2xl backdrop-blur-xl border border-white/10 relative z-10">
          <div className="text-center mb-8">
            <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur">
              <Lock className="text-white" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-[0.35em] text-white">
              GİRİŞ YAP
            </h2>
          </div>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <input
              required
              type="text"
              placeholder="Kullanıcı"
              className="w-full p-4 bg-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-fuchsia-400 border border-white/10 font-bold text-white placeholder-white/30"
              value={adminCreds.username}
              onChange={(event) =>
                setAdminCreds({ ...adminCreds, username: event.target.value })
              }
            />
            <input
              required
              type="password"
              placeholder="Şifre"
              className="w-full p-4 bg-white/5 rounded-2xl outline-none focus:ring-2 focus:ring-fuchsia-400 border border-white/10 font-bold text-white placeholder-white/30"
              value={adminCreds.password}
              onChange={(event) =>
                setAdminCreds({ ...adminCreds, password: event.target.value })
              }
            />
            <button className="w-full bg-fuchsia-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-fuchsia-500/40 hover:bg-fuchsia-400 transition">
              Panel Girişi
            </button>
            <button
              type="button"
              onClick={() => setView('user')}
              className="w-full text-white/50 font-bold text-sm hover:text-white transition"
            >
              İptal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-fuchsia-500/30 overflow-x-hidden">
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/80 backdrop-blur-md shadow-lg border-b border-white/10'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="bg-fuchsia-500/90 p-2 rounded-lg text-white shadow-lg shadow-fuchsia-500/30">
              <Smartphone size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white uppercase">
              iZMiR iPHONE <span className="text-fuchsia-300 font-black">KAPINDA</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium">
            <button
              onClick={() => scrollToSection('home')}
              className="hover:text-fuchsia-200 transition font-bold text-sm"
            >
              Ana Sayfa
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="hover:text-fuchsia-200 transition font-bold text-sm"
            >
              Hizmetler
            </button>
            <button
              onClick={() => setView('blog')}
              className="hover:text-fuchsia-200 transition font-bold text-sm"
            >
              Rehber
            </button>
            <button
              onClick={() => scrollToSection('appointment')}
              className="bg-fuchsia-500 text-white px-6 py-2 rounded-full hover:bg-fuchsia-400 transition shadow-lg shadow-fuchsia-500/30 text-white font-bold text-sm"
            >
              Randevu Al
            </button>
          </div>
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/10 absolute w-full p-4 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top">
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-left font-bold text-slate-200 py-2 border-b border-white/10"
            >
              Fiyatlar
            </button>
            <button
              onClick={() => {
                setView('blog');
                setIsMenuOpen(false);
              }}
              className="text-left font-bold text-slate-200 py-2 border-b border-white/10"
            >
              Bakım Rehberi
            </button>
            <button
              onClick={() => scrollToSection('appointment')}
              className="bg-fuchsia-500 text-white p-3 rounded-lg text-center font-bold"
            >
              Randevu Al
            </button>
          </div>
        )}
      </nav>

      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div
          className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-fuchsia-500 rounded-full blur-[140px] opacity-20 -z-10"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
        <div
          className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[140px] opacity-20 -z-10"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        ></div>

        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 glass-card bg-white/10 border border-white/10 backdrop-blur px-4 py-1 rounded-full text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-200 shadow-sm">
              <Zap size={14} />
              İzmir’in En Hızlı iPhone Teknik Servisi
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight uppercase">
              İzmir iPhone <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-300">
                Tamir Hizmeti
              </span>
            </h1>
            <p className="text-lg text-slate-300 max-w-lg mx-auto md:mx-0 font-medium leading-relaxed">
              İzmir’in her semtinde kapınızdan alıyor, orijinal kalitede
              parçalarla onarıp aynı gün adresinize teslim ediyoruz.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              {[
                { label: 'Aynı Gün', value: '2-4 Saat' },
                { label: 'Garanti', value: '6 Ay' },
                { label: 'Puan', value: '4.9/5' },
                { label: 'Hizmet', value: '9+ İlçe' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {stat.label}
                  </p>
                  <p className="text-lg font-black text-white">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4 text-white">
              <button
                onClick={() => scrollToSection('appointment')}
                className="bg-fuchsia-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-fuchsia-400 transition shadow-xl shadow-fuchsia-500/30 flex items-center justify-center gap-2 text-white"
              >
                Hemen Randevu Oluştur <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                className="glass-card bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition shadow-xl flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" /> WhatsApp
                Destek
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs uppercase tracking-[0.4em] text-slate-400">
              {socialProof.map((item) => (
                <div
                  key={item.label}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2"
                >
                  <span className="text-white font-black">{item.value}</span>{' '}
                  {item.label}
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 relative flex justify-center">
            <div className="relative z-10 animate-float bg-white/5 backdrop-blur-xl p-4 rounded-[40px] shadow-2xl border border-white/10 overflow-hidden max-w-sm">
              <lottie-player
                src="https://assets10.lottiefiles.com/packages/lf20_96onscat.json"
                background="transparent"
                speed="1"
                style={{ width: '300px', height: '300px' }}
                loop
                autoplay
              ></lottie-player>
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/70 backdrop-blur p-4 rounded-3xl text-center shadow-lg">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
                  Canlı Durum
                </p>
                <p className="text-lg font-black tracking-tight text-white">
                  Kurye Yolda
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-16 uppercase tracking-[0.25em] text-white leading-tight">
            İzmir Yerinde iPhone Servisi
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-white">
            {[
              {
                icon: <Smartphone size={32} />,
                title: 'Ekran Değişimi',
                desc: '30 dakikada montaj, True Tone aktarımı ve sıvı koruma bandı.',
              },
              {
                icon: <Battery size={32} />,
                title: 'Batarya Değişimi',
                desc: '%100 pil sağlığı, garantili montaj ve yüksek kapasite.',
              },
              {
                icon: <ShieldCheck size={32} />,
                title: 'Garantili Onarım',
                desc: 'Lazer teknolojisi ile kasa değişmeden kusursuz cam onarımı.',
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="group p-8 rounded-[32px] bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner text-fuchsia-200 group-hover:scale-110 transition">
                  {item.icon}
                </div>
                <h3 className="font-black text-xl mb-3 uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="rounded-[40px] border border-white/10 bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/10 p-10">
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
              <div className="space-y-5">
                <span className="text-xs uppercase tracking-[0.4em] text-fuchsia-200 font-bold">
                  Trafik Çekici İçerik
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white">
                  Haftalık bakım rehberi + fiyat alarmı
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  İzmir iPhone servis rehberini düzenli olarak güncelliyoruz.
                  Ücretsiz mini rehberimizi alarak ekran ve batarya değişim
                  ipuçlarını öğrenin, kampanya bildirimlerini kaçırmayın.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => scrollToSection('appointment')}
                    className="bg-fuchsia-500 text-white px-6 py-3 rounded-2xl font-bold"
                  >
                    Rehberi Al & Randevu Oluştur
                  </button>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    className="bg-white/10 text-white px-6 py-3 rounded-2xl font-bold text-center"
                  >
                    WhatsApp Bildirim
                  </a>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Ücretsiz İçerik
                </p>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  {leadMagnetItems.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    SEO Odaklı Blog
                  </p>
                  <p className="text-sm text-slate-200">
                    En çok aranan konulara göre hazırlanan rehberler.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs uppercase tracking-[0.4em] text-fuchsia-200 font-bold">
              Kullanışlı Araçlar
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              Kullanıcıların faydalanabileceği araçlar
            </h2>
            <p className="text-slate-300">
              Hızlı teşhis, süre tahmini ve takas değeri gibi araçlarla kararınızı
              netleştirin.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 space-y-4">
              <h3 className="text-xl font-black text-white">Hızlı Arıza Analizi</h3>
              <p className="text-sm text-slate-300">
                Cihazınızın durumunu işaretleyin, önerilen servis önceliğini görün.
              </p>
              <div className="space-y-3">
                {[
                  { key: 'screenCrack', label: 'Ekran kırık/çatlak' },
                  { key: 'touchIssue', label: 'Dokunmatik tepki vermiyor' },
                  { key: 'batteryDrain', label: 'Pil hızlı tükeniyor' },
                  { key: 'faceIdIssue', label: 'Face ID çalışmıyor' },
                  { key: 'waterDamage', label: 'Sıvı teması oldu' },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3"
                  >
                    <span className="text-sm text-slate-200">{item.label}</span>
                    <div className="flex gap-2">
                      {['Evet', 'Hayır'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleToolAnswer(item.key, option)}
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            toolAnswers[item.key] === option
                              ? 'bg-fuchsia-500 text-white'
                              : 'bg-white/10 text-slate-300'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Öneri
                </p>
                <p className="text-white font-bold mt-2">{toolPriority}</p>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 space-y-4">
              <h3 className="text-xl font-black text-white">Onarım Süresi Tahmini</h3>
              <p className="text-sm text-slate-300">
                Model ve işlem seçerek tahmini servis süresini öğrenin.
              </p>
              <select
                className="w-full p-4 bg-slate-950/60 border border-white/10 rounded-2xl text-white font-bold"
                value={etaModel}
                onChange={(event) => setEtaModel(event.target.value)}
              >
                <option value="">Model seçiniz</option>
                {Object.keys(prices).map((model) => (
                  <option key={model}>{model}</option>
                ))}
              </select>
              <select
                className="w-full p-4 bg-slate-950/60 border border-white/10 rounded-2xl text-white font-bold"
                value={etaService}
                onChange={(event) => setEtaService(event.target.value)}
              >
                <option value="">İşlem seçiniz</option>
                <option value="Ekran Değişimi">Ekran Değişimi</option>
                <option value="Batarya Değişimi">Batarya Değişimi</option>
                <option value="Diğer">Diğer</option>
              </select>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Tahmini Süre
                </p>
                <p className="text-white font-bold mt-2">
                  {etaResult() || 'Seçim yapınız'}
                </p>
              </div>
              <button
                onClick={() => scrollToSection('appointment')}
                className="w-full bg-fuchsia-500 text-white py-3 rounded-2xl font-bold"
              >
                Uygun Saat İçin Randevu Al
              </button>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 space-y-4">
              <h3 className="text-xl font-black text-white">Takas Değeri Hesapla</h3>
              <p className="text-sm text-slate-300">
                Cihaz durumunuza göre tahmini takas değerini görün.
              </p>
              <select
                className="w-full p-4 bg-slate-950/60 border border-white/10 rounded-2xl text-white font-bold"
                value={tradeModel}
                onChange={(event) => setTradeModel(event.target.value)}
              >
                <option value="">Model seçiniz</option>
                {Object.keys(tradeInBase).map((model) => (
                  <option key={model}>{model}</option>
                ))}
              </select>
              <select
                className="w-full p-4 bg-slate-950/60 border border-white/10 rounded-2xl text-white font-bold"
                value={tradeCondition}
                onChange={(event) => setTradeCondition(event.target.value)}
              >
                <option value="">Durum seçiniz</option>
                {Object.keys(tradeInModifiers).map((condition) => (
                  <option key={condition}>{condition}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleTradeEstimate}
                className="w-full bg-white/10 text-white py-3 rounded-2xl font-bold"
              >
                Değer Hesapla
              </button>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Tahmini Değer
                </p>
                <p className="text-white font-bold mt-2">
                  {tradeEstimate ? `${tradeEstimate.toLocaleString('tr-TR')} ₺` : '---'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-10">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 space-y-3">
              <h4 className="text-lg font-black text-white">Bütçe & Öncelik</h4>
              <p className="text-sm text-slate-300">
                Önceliğinizi seçin, size özel öneri hazırlayalım.
              </p>
              <select
                className="w-full p-4 bg-slate-950/60 border border-white/10 rounded-2xl text-white font-bold"
                value={toolBudget}
                onChange={(event) => setToolBudget(event.target.value)}
              >
                <option>Bütçe seçiniz</option>
                {budgetPriority.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Önerilen Akış
                </p>
                <p className="text-white font-bold mt-2">
                  {toolBudget === 'Hız'
                    ? 'Ekspres kurye ile aynı gün servis.'
                    : toolBudget === 'Uygun Fiyat'
                      ? 'Fiyat avantajlı parça seçenekleri.'
                      : toolBudget === 'Orijinal Parça'
                        ? 'Orijinal kalite parça önceliği.'
                        : toolBudget === 'Kapsamlı Kontrol'
                          ? 'Detaylı test ve rapor.'
                          : 'Seçim yapınız.'}
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 space-y-3">
              <h4 className="text-lg font-black text-white">Garanti Kontrol</h4>
              <p className="text-sm text-slate-300">
                Cihazınız garanti kapsamında mı? Hızlı yönlendirme alın.
              </p>
              <select
                className="w-full p-4 bg-slate-950/60 border border-white/10 rounded-2xl text-white font-bold"
                value={warrantyStatus}
                onChange={(event) => setWarrantyStatus(event.target.value)}
              >
                <option>Garanti durumunu seçiniz</option>
                <option value="Evet">Evet</option>
                <option value="Hayır">Hayır</option>
                <option value="Bilmiyorum">Bilmiyorum</option>
              </select>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Bilgilendirme
                </p>
                <p className="text-white font-bold mt-2">
                  {warrantyStatus === 'Evet'
                    ? 'Garanti kapsamı için ön inceleme yapalım.'
                    : warrantyStatus === 'Hayır'
                      ? 'Garanti dışı onarım için hızlı teklif sunabiliriz.'
                      : 'Garanti durumunu birlikte kontrol edebiliriz.'}
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 space-y-3">
              <h4 className="text-lg font-black text-white">Kurye İhtiyacı</h4>
              <p className="text-sm text-slate-300">
                Kurye ile alım/teslimat ihtiyacınızı belirtin.
              </p>
              <select
                className="w-full p-4 bg-slate-950/60 border border-white/10 rounded-2xl text-white font-bold"
                value={toolNeedPickup}
                onChange={(event) => setToolNeedPickup(event.target.value)}
              >
                <option value="Evet">Evet, kurye istiyorum</option>
                <option value="Hayır">Hayır, kendim teslim edeceğim</option>
              </select>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Öneri
                </p>
                <p className="text-white font-bold mt-2">
                  {toolNeedPickup === 'Evet'
                    ? 'Randevu oluştur, kurye saatini planlayalım.'
                    : 'Yoğunluğa göre servis randevusu ayarlayalım.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.4em] text-fuchsia-200 font-bold">
                4 Adımda Onarım
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                Hızlı, güvenli ve izlenebilir süreç
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Cihazınızın onarım sürecini baştan sona şeffaf şekilde yönetiyoruz.
                Talep oluşturduktan sonra kurye planlama, teknik servis ve teslimat
                adımlarını anlık bilgilendirmelerle takip edebilirsiniz.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {processSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                      0{index + 1}
                    </p>
                    <h3 className="text-lg font-black text-white">{step.title}</h3>
                    <p className="text-sm text-slate-300">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[40px] border border-white/10 bg-slate-950/60 p-8 shadow-2xl">
              <div className="space-y-4">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Ortalama Süre
                  </p>
                  <p className="text-3xl font-black text-white">2-4 Saat</p>
                  <p className="text-sm text-slate-300 mt-2">
                    Model ve işlem türüne göre aynı gün teslimat hedeflenir.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Garanti & Güven
                  </p>
                  <p className="text-lg font-black text-white">6 Ay Servis Garantisi</p>
                  <p className="text-sm text-slate-300 mt-2">
                    Orijinal kalite parça, uzman teknisyen ve kalite kontrol.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.4em] text-fuchsia-200 font-bold">
                Blog Önerileri
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                İzmir iPhone bakım rehberleriyle trafiği büyüt
              </h2>
              <p className="text-slate-300 leading-relaxed">
                SEO için düzenli güncellenen rehber içerikleri, arama motorlarında
                daha görünür olmanızı sağlar. Aşağıdaki konular kullanıcıların en
                sık aradığı başlıklar arasında.
              </p>
            </div>
            <div className="space-y-4">
              {blogHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="text-lg font-black text-white">{item.title}</h3>
                  <p className="text-sm text-slate-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.4em] text-fuchsia-200 font-bold">
                Neden Biz?
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                İzmir’de iPhone onarımında güven, hız ve şeffaflık
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Şeffaf fiyatlandırma, hızlı kurye akışı ve uzman teknisyen
                kadromuzla cihazınızı güvenle teslim ediyoruz. Orijinal kalite
                parça kullanımı, ayrıntılı kontrol ve WhatsApp üzerinden anlık
                bilgilendirme ile süreci baştan sona takip edebilirsiniz.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Ekran & batarya değişiminde kalite kontrol',
                  'Güvenli kurye teslim alma ve bırakma',
                  'Şeffaf fiyatlar ve sürpriz ücret yok',
                  'İzmir genelinde geniş servis ağı',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                  >
                    <CheckCircle2 size={18} className="text-emerald-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[40px] border border-white/10 bg-white/5 p-8 shadow-2xl">
              <div className="grid gap-6">
                {[
                  {
                    title: 'Hızlı Onarım',
                    desc: 'Yoğunluğa göre 2-4 saat içinde teslim.',
                    icon: <Zap size={24} />,
                  },
                  {
                    title: 'Güvenli Parça',
                    desc: 'Orijinal kalite ve cihaz uyumluluğu garantisi.',
                    icon: <ShieldCheck size={24} />,
                  },
                  {
                    title: 'Şeffaf Süreç',
                    desc: 'WhatsApp üzerinden adım adım bilgilendirme.',
                    icon: <MessageCircle size={24} />,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-3xl border border-white/10 bg-slate-950/40 p-5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/20 text-fuchsia-200">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white">{item.title}</h3>
                      <p className="text-sm text-slate-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fuchsia-500/10 rounded-full blur-[150px] -z-10"></div>
        <div className="container mx-auto px-4 max-w-4xl text-center text-white">
          <div className="glass-card bg-white/5 p-8 rounded-[50px] border border-white/10 shadow-xl backdrop-blur-xl grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 text-left">
              <h2 className="text-3xl font-black tracking-tight uppercase">Fiyat Hesapla</h2>
              <p className="text-slate-300 text-sm font-medium">
                Modelinizi seçin, İzmir iPhone ekran ve batarya değişim
                fiyatlarını anında görün.
              </p>
              <select
                className="w-full p-5 bg-slate-950/60 border border-white/10 rounded-2xl font-bold shadow-sm outline-none text-white appearance-none"
                value={selectedModel}
                onChange={(event) => setSelectedModel(event.target.value)}
              >
                <option value="">Model Seçiniz...</option>
                {Object.keys(prices).map((model) => (
                  <option key={model}>{model}</option>
                ))}
              </select>
              <div className="flex gap-2">
                {['Ekran Değişimi', 'Batarya Değişimi'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedService(type)}
                    className={`flex-1 p-4 rounded-2xl font-black text-xs transition ${
                      selectedService === type
                        ? 'bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30'
                        : 'bg-white/5 text-slate-400 border border-white/10'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-fuchsia-500 to-cyan-400 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 text-white/10 group-hover:scale-110 transition duration-500">
                <Zap size={150} />
              </div>
              <p className="text-white/70 text-xs font-bold uppercase mb-2 tracking-widest relative z-10">
                Net Ücret (Kurye Dahil)
              </p>
              <div className="text-5xl font-black tracking-tight uppercase relative z-10">
                {currentPrice ? `${currentPrice.toLocaleString('tr-TR')} ₺` : '---'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="appointment" className="py-20 relative">
        <div className="container mx-auto px-4 max-w-2xl text-white relative z-10">
          <div className="glass-card bg-white/5 p-8 md:p-12 rounded-[50px] shadow-2xl border border-white/10 backdrop-blur-xl">
            {formStep === 1 ? (
              <form onSubmit={handleSubmit} className="space-y-6 text-white">
                <h2 className="text-3xl font-black text-center mb-8 uppercase text-white tracking-tight">
                  Hemen Başvur
                </h2>

                <div className="grid md:grid-cols-2 gap-4 text-white">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-3">
                      Ad Soyad
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Örn: Ahmet Yılmaz"
                      className="w-full p-5 bg-slate-950/50 rounded-2xl outline-none focus:ring-2 focus:ring-fuchsia-400 border border-white/10 shadow-inner font-bold text-white placeholder-slate-500"
                      value={formData.name}
                      onChange={(event) =>
                        setFormData({ ...formData, name: event.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-3">
                      Telefon
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="05XX XXX XX XX"
                      className="w-full p-5 bg-slate-950/50 rounded-2xl outline-none focus:ring-2 focus:ring-fuchsia-400 border border-white/10 shadow-inner font-bold text-white placeholder-slate-500"
                      value={formData.phone}
                      onChange={(event) =>
                        setFormData({ ...formData, phone: event.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1 text-white">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-3">
                      Tarih
                    </label>
                    <input
                      required
                      type="date"
                      className="w-full p-5 bg-slate-950/50 rounded-2xl outline-none focus:ring-2 focus:ring-fuchsia-400 border border-white/10 shadow-inner font-bold text-white"
                      value={formData.bookingDate}
                      onChange={(event) =>
                        setFormData({ ...formData, bookingDate: event.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1 text-white">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-3">
                      Saat
                    </label>
                    <select
                      className="w-full p-5 bg-slate-950/50 rounded-2xl outline-none focus:ring-2 focus:ring-fuchsia-400 border border-white/10 shadow-inner font-bold text-white"
                      value={formData.bookingTime}
                      onChange={(event) =>
                        setFormData({ ...formData, bookingTime: event.target.value })
                      }
                    >
                      <option>Sabah (09:00 - 12:00)</option>
                      <option>Öğleden Sonra (12:00 - 18:00)</option>
                      <option>Akşam (18:00 - 21:00)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1 text-white">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-3">
                    Bölge
                  </label>
                  <select
                    className="w-full p-5 bg-slate-950/50 rounded-2xl outline-none focus:ring-2 focus:ring-fuchsia-400 border border-white/10 shadow-inner font-bold text-white"
                    value={formData.area}
                    onChange={(event) =>
                      setFormData({ ...formData, area: event.target.value })
                    }
                  >
                    {[
                      'Buca',
                      'Bornova',
                      'Karşıyaka',
                      'Konak',
                      'Balçova',
                      'Gaziemir',
                      'Bayraklı',
                      'Çiğli',
                      'Mavişehir',
                      'Diğer',
                    ].map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1 text-white">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-3">
                    Tam Adres
                  </label>
                  <textarea
                    required
                    placeholder="Cihazın teslim alınacağı tam adresiniz..."
                    className="w-full p-5 bg-slate-950/50 rounded-2xl outline-none focus:ring-2 focus:ring-fuchsia-400 border border-white/10 h-24 shadow-inner font-bold text-white placeholder-slate-500"
                    value={formData.address}
                    onChange={(event) =>
                      setFormData({ ...formData, address: event.target.value })
                    }
                  ></textarea>
                </div>

                <div className="bg-white/5 p-6 rounded-[32px] space-y-4 border border-white/10">
                  <p className="text-xs font-black text-fuchsia-200 uppercase tracking-[0.4em] text-center mb-2">
                    Onarım Özeti
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1 text-white">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-3">
                        Model
                      </label>
                      <div className="relative">
                        <select
                          required
                          className="w-full p-4 bg-slate-950/50 rounded-xl outline-none focus:ring-2 focus:ring-fuchsia-400 border border-white/10 shadow-sm font-bold appearance-none text-sm text-white"
                          value={selectedModel}
                          onChange={(event) => setSelectedModel(event.target.value)}
                        >
                          <option value="">Seçiniz...</option>
                          {Object.keys(prices).map((model) => (
                            <option key={model} value={model}>
                              {model}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                          size={16}
                        />
                      </div>
                    </div>
                    <div className="space-y-1 text-white">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] ml-3">
                        İşlem
                      </label>
                      <div className="relative">
                        <select
                          required
                          className="w-full p-4 bg-slate-950/50 rounded-xl outline-none focus:ring-2 focus:ring-fuchsia-400 border border-white/10 shadow-sm font-bold appearance-none text-sm text-white"
                          value={selectedService}
                          onChange={(event) => setSelectedService(event.target.value)}
                        >
                          <option value="">Seçiniz...</option>
                          <option value="Ekran Değişimi">Ekran Değişimi</option>
                          <option value="Batarya Değişimi">Batarya Değişimi</option>
                        </select>
                        <ChevronDown
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                          size={16}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-slate-950/60 p-4 rounded-2xl shadow-sm border border-white/10 text-white">
                    <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-tight">
                      <CreditCard size={18} className="text-fuchsia-200" />
                      <span className="text-[10px]">Onarım Bedeli</span>
                    </div>
                    <div className="text-xl font-black text-white tracking-tight">
                      {currentPrice ? `${currentPrice.toLocaleString('tr-TR')} ₺` : '---'}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-fuchsia-500 text-white py-6 rounded-3xl font-black text-xl hover:bg-fuchsia-400 transition flex items-center justify-center gap-3 shadow-xl shadow-fuchsia-500/30 uppercase tracking-[0.3em]"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Talebi Onayla & WhatsApp'}
                </button>
              </form>
            ) : (
              <div className="text-center py-10 animate-in zoom-in text-white">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-black mb-2 uppercase tracking-tight text-white">
                  Randevunuz Hazır!
                </h3>
                <p className="text-slate-300 mb-8 font-medium">
                  Lütfen WhatsApp ekranında mesajı gönderin. Randevu saatinizde{' '}
                  <b className="text-fuchsia-200">{phoneNumber}</b> teknik
                  ekibimiz adresinizde olacaktır.
                </p>
                <button
                  onClick={() => setFormStep(1)}
                  className="text-fuchsia-200 font-bold hover:underline tracking-tight"
                >
                  Yeni Bir Talep Gönder
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="rounded-[40px] border border-white/10 bg-white/5 p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-fuchsia-200 font-bold">
                  Müşteri Yorumları
                </p>
                <h2 className="text-3xl md:text-4xl font-black text-white">
                  İzmir’de binlerce cihaz güvenle onarıldı
                </h2>
                <p className="text-slate-300 mt-3">
                  Gerçek kullanıcı deneyimleri ile servis kalitemizi görün.
                </p>
              </div>
              <div className="flex items-center gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    type="button"
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-3 w-3 rounded-full ${
                      activeTestimonial === index
                        ? 'bg-fuchsia-400'
                        : 'bg-white/20'
                    }`}
                    aria-label={`Yorum ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/60 p-8">
              <p className="text-lg text-white font-medium leading-relaxed">
                “{testimonials[activeTestimonial].text}”
              </p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-white font-black">
                    {testimonials[activeTestimonial].name}
                  </p>
                  <p className="text-sm text-slate-400">
                    {testimonials[activeTestimonial].area}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-amber-300">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={`star-${index}`}>★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="bg-white/5 p-10 rounded-[40px] shadow-xl text-center space-y-6 border border-white/10">
            <div className="bg-fuchsia-500/80 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-fuchsia-500/30 text-white">
              <Search />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-[0.3em] text-white">
              Cihaz Takip Sistemi
            </h2>
            <p className="text-slate-300 font-medium">
              Telefon numaranızı yazarak onarım durumunuzu anlık görün.
            </p>
            <form onSubmit={handleTrack} className="space-y-4">
              <input
                required
                type="tel"
                placeholder="05XX XXX XX XX"
                className="w-full p-5 bg-slate-950/70 rounded-2xl outline-none focus:ring-2 focus:ring-fuchsia-400 text-center font-black text-white"
                value={trackCode}
                onChange={(event) =>
                  setTrackCode(event.target.value.replace(/\s/g, ''))
                }
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white/10 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 uppercase tracking-[0.3em]"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <RefreshCw size={18} /> Sorgula
                  </>
                )}
              </button>
            </form>

            {trackedOrder === 'NOT_FOUND' && (
              <div className="bg-rose-500/10 text-rose-200 p-4 rounded-2xl text-sm font-bold animate-in fade-in">
                Bu numara ile kayıtlı talep bulunamadı.
              </div>
            )}

            {trackedOrder && trackedOrder !== 'NOT_FOUND' && (
              <div className="bg-white/5 p-6 rounded-3xl space-y-3 animate-in slide-in-from-bottom border border-white/10">
                <p className="text-xs font-black text-fuchsia-200 uppercase tracking-[0.3em]">
                  Onarım Durumu
                </p>
                <div className="flex justify-between items-center bg-slate-950/70 p-3 rounded-xl shadow-sm">
                  <span className="font-bold text-white">{trackedOrder.model}</span>
                  <span className="bg-emerald-400/80 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase">
                    İşlemde
                  </span>
                </div>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <p className="font-black text-sm text-white">Talep Onaylandı</p>
                      <p className="text-xs text-slate-400">Kurye ataması yapıldı.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-8 h-8 rounded-full bg-fuchsia-500 flex items-center justify-center text-white animate-pulse">
                      <Smartphone size={16} />
                    </div>
                    <div>
                      <p className="font-black text-sm text-white">Onarım Başladı</p>
                      <p className="text-xs text-slate-400">
                        Teknisyenimiz adresinize yaklaşıyor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.4em] text-fuchsia-200 font-bold">
                SEO Odaklı Bilgi
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                İzmir iPhone servis hizmetleri hakkında kapsamlı rehber
              </h2>
              <p className="text-slate-300 leading-relaxed">
                İzmir iPhone ekran değişimi, batarya değişimi ve Face ID
                onarımı gibi işlemler için hızlı ve güvenilir servis sunuyoruz.
                Buca, Bornova, Karşıyaka, Konak, Balçova, Gaziemir ve Bayraklı
                başta olmak üzere tüm ilçelerde kurye desteği sağlıyoruz.
              </p>
              <p className="text-slate-400 text-sm">
                Servis araması yaparken “İzmir iPhone ekran değişimi” veya “iPhone
                batarya değişimi İzmir” gibi anahtar kelimelerde bizi kolayca
                bulabilirsiniz. Form üzerinden randevu alarak cihazınızın
                onarım sürecini hızlandırabilirsiniz.
              </p>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-black text-white mb-4">
                Sık Sorulan Sorular
              </h3>
              <div className="space-y-3">
                {faqItems.map((item, index) => (
                  <button
                    key={item.question}
                    type="button"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left rounded-2xl border border-white/10 bg-slate-950/50 p-4"
                  >
                    <div className="flex items-center justify-between text-white font-bold">
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`transition ${
                          openFaq === index ? 'rotate-180 text-fuchsia-200' : 'text-slate-400'
                        }`}
                      />
                    </div>
                    {openFaq === index && (
                      <p className="mt-3 text-sm text-slate-300">{item.answer}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.4em] text-fuchsia-200 font-bold">
                Hizmet Bölgeleri
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                İzmir genelinde kapıda servis
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Merkez ilçelerden sahil bölgelerine kadar geniş servis ağımızla
                kurye hizmeti sunuyoruz. Bölgeniz listede olmasa bile talep
                oluşturabilirsiniz.
              </p>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-200 uppercase tracking-widest"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[36px] border border-white/10 bg-slate-950/60 p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                Hızlı İletişim
              </p>
              <h3 className="text-2xl font-black text-white mt-3">
                7/24 WhatsApp destek
              </h3>
              <p className="text-slate-300 mt-3">
                Sorularınızı iletin, uzman ekibimiz en hızlı şekilde dönüş yapsın.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  className="flex-1 bg-emerald-500 text-white py-3 rounded-2xl font-bold text-center"
                >
                  WhatsApp ile Yaz
                </a>
                <button
                  onClick={() => scrollToSection('appointment')}
                  className="flex-1 bg-white/10 text-white py-3 rounded-2xl font-bold"
                >
                  Randevu Al
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-white pt-20 pb-10 text-center relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <p className="font-black text-xl mb-4 uppercase tracking-tight">
            İzmir iPhone Kapında Servisi
          </p>
          <p className="text-slate-400 text-xs mb-4 max-w-sm mx-auto font-medium leading-relaxed">
            Buca, Bornova, Karşıyaka ve İzmir'in tüm bölgelerinde kapıda iPhone
            ekran değişimi, batarya tamiri ve teknik servis desteği.
          </p>
          <p className="text-slate-500 text-[11px] mb-8 max-w-md mx-auto">
            Anahtar kelimeler: İzmir iPhone servis, iPhone ekran değişimi İzmir,
            iPhone batarya değişimi, yerinde teknik servis.
          </p>
          <div className="flex justify-center gap-6 mb-12">
            <a
              href={`tel:${phoneNumber.replace(/\s/g, '')}`}
              aria-label="Bizi Arayın"
              className="bg-white/5 p-4 rounded-2xl hover:bg-fuchsia-500 transition text-white"
            >
              <Phone size={24} />
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              aria-label="WhatsApp Hattı"
              className="bg-white/5 p-4 rounded-2xl hover:bg-emerald-500 transition text-white"
            >
              <MessageCircle size={24} />
            </a>
          </div>
          <p className="text-[10px] text-slate-500 font-black uppercase mb-12 tracking-[6px]">
            İLETİŞİM HATTI: {phoneNumber}
          </p>
          <button
            onClick={() => setView('login')}
            className="text-[10px] text-slate-500 hover:text-fuchsia-300 transition uppercase tracking-[3px] font-bold outline-none opacity-70 hover:opacity-100"
          >
            Yönetici Girişi
          </button>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <a
          href={`tel:${phoneNumber.replace(/\s/g, '')}`}
          className="bg-fuchsia-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition flex items-center justify-center border-4 border-slate-950 text-white shadow-fuchsia-500/30"
        >
          <Phone size={24} />
        </a>
        <a
          href={`https://wa.me/${whatsappNumber}`}
          className="bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition flex items-center justify-center border-4 border-slate-950 text-white shadow-emerald-500/30"
        >
          <MessageCircle size={24} />
        </a>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .glass-card { background: rgba(15, 23, 42, 0.55); backdrop-filter: blur(14px); }
            .glass-nav { background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(16px); }
            @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
            .animate-float { animation: float 6s ease-in-out infinite; }
            @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
            .animate-blob { animation: blob 7s infinite; }
            .animation-delay-2000 { animation-delay: 2s; }
          `,
        }}
      />
    </div>
  );
};

export default App;
