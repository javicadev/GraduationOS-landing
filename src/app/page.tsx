'use client';

import { useState, useRef } from 'react';
import { 
  GraduationCap, 
  Ticket, 
  Map, 
  Tv, 
  Users,
  Mail,
  User, 
  Building, 
  MessageSquare, 
  Send, 
  Sparkles,
  Lock,
  Check, 
  Plus, 
  CreditCard, 
  Sliders, 
  DollarSign
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

export default function LandingPage() {
  // Navigation & Active Demo Tab
  const [activeTab, setActiveTab] = useState<'map' | 'ticket' | 'admin'>('map');
  const [ticketFormat, setTicketFormat] = useState<'wallet' | 'pdf'>('wallet');

  // Interactive Map State
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['B3', 'B4']);

  // Admin Dashboard State
  const [adminRequests, setAdminRequests] = useState([
    { id: 1, name: 'Sofía Martín', degree: 'Doble Grado', file: 'justificante_tasas_sofia.pdf', amount: '15,00 €', status: 'pending' },
    { id: 2, name: 'Elena Gómez', degree: 'Ing. Computadores', file: 'transferencia_banco.png', amount: '15,00 €', status: 'pending' },
    { id: 3, name: 'Alejandro Ruiz', degree: 'Ing. del Software', file: 'tasas_pago_ok.pdf', amount: '15,00 €', status: 'approved' },
    { id: 4, name: 'Manuel Soler', degree: 'Ing. de la Salud', file: 'matricula_justificante.pdf', amount: '15,00 €', status: 'rejected' }
  ]);
  const [adminStats, setAdminStats] = useState({
    totalValidated: 1185,
    pendingReviews: 42,
    revenue: 17775
  });

  // Contact Form State
  const [form, setForm] = useState({ name: '', email: '', institution: '', message: '' });
  const [sending, setSending] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Card Mouse Tilt Effect (Apple Card style)
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rx = -(y - yc) / 25;
    const ry = (x - xc) / 25;
    setTilt({ rx, ry });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  // Seating Demo Actions
  const toggleSeat = (id: string) => {
    const occupiedSeats = ['A2', 'A5', 'C1', 'C4', 'C6'];
    if (occupiedSeats.includes(id)) {
      toast.error('Este asiento ya está reservado por otro estudiante.', {
        style: { background: '#1c1c1e', color: '#f5f5f7', border: '1px solid #2c2c2e' }
      });
      return;
    }
    if (selectedSeats.includes(id)) {
      setSelectedSeats(selectedSeats.filter(s => s !== id));
      toast.success(`Asiento ${id} liberado.`, {
        icon: '🎟️',
        style: { background: '#1c1c1e', color: '#f5f5f7', border: '1px solid #2c2c2e' }
      });
    } else {
      if (selectedSeats.length >= 4) {
        toast.error('Límite de demostración alcanzado (máx 4).', {
          style: { background: '#1c1c1e', color: '#f5f5f7', border: '1px solid #e53e3e' }
        });
        return;
      }
      setSelectedSeats([...selectedSeats, id]);
      toast.success(`Asiento ${id} seleccionado temporalmente.`, {
        icon: '✓',
        style: { background: '#1c1c1e', color: '#f5f5f7', border: '1px solid #10b981' }
      });
    }
  };

  // Admin Dashboard Actions
  const approveRequest = (id: number, name: string) => {
    setAdminRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'approved' } : req));
    setAdminStats(prev => ({
      totalValidated: prev.totalValidated + 1,
      pendingReviews: Math.max(0, prev.pendingReviews - 1),
      revenue: prev.revenue + 15
    }));
    toast.success(`Comprobante de ${name} aprobado. QR enviado por email.`, {
      icon: '✅',
      style: { background: '#1c1c1e', color: '#f5f5f7', border: '1px solid #10b981' }
    });
  };

  const rejectRequest = (id: number, name: string) => {
    setAdminRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'rejected' } : req));
    setAdminStats(prev => ({
      ...prev,
      pendingReviews: Math.max(0, prev.pendingReviews - 1)
    }));
    toast.error(`Justificante de ${name} rechazado. Notificación enviada.`, {
      icon: '❌',
      style: { background: '#1c1c1e', color: '#f5f5f7', border: '1px solid #e53e3e' }
    });
  };

  const resetAdminDemo = () => {
    setAdminRequests([
      { id: 1, name: 'Sofía Martín', degree: 'Doble Grado', file: 'justificante_tasas_sofia.pdf', amount: '15,00 €', status: 'pending' },
      { id: 2, name: 'Elena Gómez', degree: 'Ing. Computadores', file: 'transferencia_banco.png', amount: '15,00 €', status: 'pending' },
      { id: 3, name: 'Alejandro Ruiz', degree: 'Ing. del Software', file: 'tasas_pago_ok.pdf', amount: '15,00 €', status: 'approved' },
      { id: 4, name: 'Manuel Soler', degree: 'Ing. de la Salud', file: 'matricula_justificante.pdf', amount: '15,00 €', status: 'rejected' }
    ]);
    setAdminStats({
      totalValidated: 1185,
      pendingReviews: 42,
      revenue: 17775
    });
    toast.success('Simulación restablecida a los valores iniciales.', {
      style: { background: '#1c1c1e', color: '#f5f5f7' }
    });
  };

  // Form Submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Completa los campos obligatorios (*).');
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success('Solicitud enviada correctamente.', {
        icon: '✉️',
        style: { background: '#1c1c1e', color: '#f5f5f7' }
      });
      setForm({ name: '', email: '', institution: '', message: '' });
    }, 1200);
  };

  const copyContact = () => {
    navigator.clipboard.writeText('@javicadev');
    setCopiedText(true);
    toast.success('Contacto de Telegram copiado.');
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Mock layout configurations
  const rows = ['A', 'B', 'C'];
  const cols = [1, 2, 3, 4, 5, 6];
  const occupiedSeats = ['A2', 'A5', 'C1', 'C4', 'C6'];

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7] antialiased selection:bg-neutral-800">
      <Toaster position="bottom-right" />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-900 bg-black/85 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4.5 w-4.5 text-white" />
            <span className="text-sm font-semibold tracking-tight text-white">
              Graduation<span className="font-light">OS</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs text-neutral-400">
            <a href="#features" className="hover:text-white transition-colors">Características</a>
            <a href="#demo" className="hover:text-white transition-colors">Demos Interactiva</a>
            <a href="#impact" className="hover:text-white transition-colors">Impacto</a>
            <a href="#contact" className="hover:text-white transition-colors">Contacto</a>
          </nav>

          <div>
            <a 
              href="#contact" 
              className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors"
            >
              Solicitar Demo
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        
        {/* Hero Section */}
        <section className="pt-24 pb-20 text-center space-y-8 border-b border-neutral-900">
          <div className="space-y-4">
            <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
              GESTIÓN DE EVENTOS ACADÉMICOS
            </p>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-none">
              Organiza la graduación perfecta. <br className="hidden sm:inline" />
              Sin fricciones.
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
              La plataforma integral que automatiza las reservas de asientos, la validación de pagos y la entrega de entradas digitales. Diseñada bajo estándares de máxima simplicidad y rapidez.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a 
              href="#demo" 
              className="px-6 py-2.5 text-sm font-medium rounded-full bg-white text-black hover:bg-neutral-200 transition-colors"
            >
              Probar Demo
            </a>
            <a 
              href="#contact" 
              className="px-6 py-2.5 text-sm font-medium rounded-full bg-neutral-900 hover:bg-neutral-800 transition-colors text-white border border-neutral-800"
            >
              Solicitar Demo &rarr;
            </a>
          </div>

          {/* Interactive Tilt Device Mockup */}
          <div className="pt-10 flex justify-center">
            <div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
              className="w-full max-w-xl bg-neutral-950 rounded-2xl p-6 border border-neutral-800 shadow-2xl relative text-left"
            >
              {/* Top notch */}
              <div className="flex items-center justify-between border-b border-neutral-900 pb-4 mb-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-600"></span>
                  <span className="font-bold text-neutral-400">GraduationOS Platform</span>
                </div>
                <span className="text-neutral-500 font-mono">v1.2.0</span>
              </div>

              {/* simulated screen view */}
              <div className="bg-black rounded-lg border border-neutral-900 p-5 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-neutral-900 pb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Consola de Control del Acto</h3>
                    <p className="text-[10px] text-neutral-500">Escuela Técnica Superior de Ingeniería Informática</p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">
                    Acto Activo
                  </span>
                </div>

                {/* Dashboard Stats Preview */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-neutral-950 p-2.5 rounded border border-neutral-900">
                    <span className="text-[8px] text-neutral-500 uppercase block font-semibold">Validaciones</span>
                    <span className="text-sm font-bold text-white font-mono">1.187</span>
                  </div>
                  <div className="bg-neutral-950 p-2.5 rounded border border-neutral-900">
                    <span className="text-[8px] text-neutral-500 uppercase block font-semibold">Tasa de Aprobación</span>
                    <span className="text-sm font-bold text-green-500 font-mono">98.2%</span>
                  </div>
                  <div className="bg-neutral-950 p-2.5 rounded border border-neutral-900">
                    <span className="text-[8px] text-neutral-500 uppercase block font-semibold">Aforo Asientos</span>
                    <span className="text-sm font-bold text-white font-mono">84%</span>
                  </div>
                </div>

                {/* Student status simulated row */}
                <div className="bg-neutral-950 p-3 rounded border border-neutral-900 flex justify-between items-center text-xs">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-white">Sofía Martín (Doble Grado)</div>
                    <div className="text-[10px] text-neutral-500 flex items-center gap-1.5">
                      <span>justificante_pago.pdf</span>
                      <span>&bull;</span>
                      <span>15,00 €</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-900/30 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Pago Aprobado
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-1 flex items-center justify-between text-[11px] text-neutral-500">
                <span>Último acceso verificado: hace 2 minutos</span>
                <a href="#demo" className="text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-semibold">
                  Probar Consola &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features list */}
        <section id="features" className="py-20 border-b border-neutral-900">
          <div className="text-left space-y-3 mb-16">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
              INGENIERÍA E INTERFAZ
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Todo bajo control en un único ecosistema digital
            </h2>
            <p className="text-neutral-400 text-sm max-w-3xl leading-relaxed">
              Descubre las características que transforman la logística de la graduación en un proceso automatizado de autoservicio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Control de Pagos */}
            <div className="bg-neutral-950 border border-neutral-900 hover:border-neutral-800 transition-colors p-6 rounded-xl space-y-4">
              <div className="text-neutral-400">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-tight">Control de Pagos y Tasas</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                Los alumnos suben su justificante de pago o matrícula durante la inscripción. El sistema centraliza y procesa los documentos, listos para la validación rápida de la administración.
              </p>
            </div>

            {/* Mapa Fiel */}
            <div className="bg-neutral-950 border border-neutral-900 hover:border-neutral-800 transition-colors p-6 rounded-xl space-y-4">
              <div className="text-neutral-400">
                <Map className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-tight">El Mapa Fiel de Asientos</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                Un plano visual interactivo y sincronizado que evita que dos personas seleccionen la misma butaca. Graduados y acompañantes eligen su posición exacta en tiempo real.
              </p>
            </div>

            {/* Tickets QR */}
            <div className="bg-neutral-950 border border-neutral-900 hover:border-neutral-800 transition-colors p-6 rounded-xl space-y-4">
              <div className="text-neutral-400">
                <Ticket className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-tight">Tickets Inteligentes</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                Emisión de entradas digitales con código QR de seguridad. Permite a los usuarios agregarlos a su Apple Wallet o descargarlos en formato PDF imprimible para el acceso.
              </p>
            </div>

            {/* Orla */}
            <div className="bg-neutral-950 border border-neutral-900 hover:border-neutral-800 transition-colors p-6 rounded-xl space-y-4">
              <div className="text-neutral-400">
                <Users className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-tight">Orla Digital Integrada</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                Base de datos visual con los graduados del año. Los alumnos gestionan sus imágenes académicas y enlaces profesionales de forma interactiva y descentralizada.
              </p>
            </div>

            {/* Streaming */}
            <div className="bg-neutral-950 border border-neutral-900 hover:border-neutral-800 transition-colors p-6 rounded-xl space-y-4">
              <div className="text-neutral-400">
                <Tv className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-tight">Retransmisión Streaming HD</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                Canal de emisión en directo optimizado y embebido para familiares a distancia. Evita la saturación de redes y ofrece un reproductor integrado y limpio.
              </p>
            </div>

            {/* Panel Admin */}
            <div className="bg-neutral-950 border border-neutral-900 hover:border-neutral-800 transition-colors p-6 rounded-xl space-y-4">
              <div className="text-neutral-400">
                <Sliders className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-tight">Consola de Administración</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                Control de aforos totales, estadísticas de validación de justificantes, filtros avanzados y panel de reasignación manual de asientos para imprevistos de última hora.
              </p>
            </div>

          </div>
        </section>

        {/* INTERACTIVE DEMOS ZONE */}
        <section id="demo" className="py-20 border-b border-neutral-900 scroll-mt-6">
          <div className="text-left space-y-3 mb-12">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
              ZONA DE PRUEBAS
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Experimenta los tres pilares en vivo
            </h2>
            <p className="text-neutral-400 text-sm max-w-3xl leading-relaxed">
              Prueba los flujos del alumno (Mapa Fiel y Ticket) o simula ser un administrador validando justificantes y controlando aforos.
            </p>
          </div>

          {/* Interactive Container Block (Apple Dashboard layout) */}
          <div className="bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl">
            
            {/* Header Tabs */}
            <div className="bg-neutral-900/60 border-b border-neutral-800 p-1 flex items-center justify-start overflow-x-auto gap-1">
              <button 
                onClick={() => setActiveTab('map')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'map' ? 'bg-black text-white shadow-sm' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'}`}
              >
                <Map className="h-3.5 w-3.5" />
                <span>1. Mapa Fiel (Alumno)</span>
              </button>
              <button 
                onClick={() => setActiveTab('ticket')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'ticket' ? 'bg-black text-white shadow-sm' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'}`}
              >
                <Ticket className="h-3.5 w-3.5" />
                <span>2. Entrada Wallet / PDF</span>
              </button>
              <button 
                onClick={() => setActiveTab('admin')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'admin' ? 'bg-black text-white shadow-sm' : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'}`}
              >
                <Sliders className="h-3.5 w-3.5" />
                <span>3. Consola Admin (Organizador)</span>
              </button>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 sm:p-8 min-h-[420px] flex flex-col justify-between">
              
              {/* Tab 1: Interactive Seating Map */}
              {activeTab === 'map' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-white">Mapa Fiel Interactiva</h3>
                    <p className="text-neutral-400 text-xs mt-1 leading-relaxed max-w-2xl">
                      Haz clic en las butacas de color azul para seleccionarlas o deseleccionarlas. Los asientos grises representan butacas ya reservadas por otros alumnos de la ETSII.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
                    
                    {/* Visual Seating Plane */}
                    <div className="md:col-span-8 bg-black/50 p-6 rounded-xl border border-neutral-900 space-y-6 shadow-inner flex flex-col items-center">
                      
                      {/* Screen representation */}
                      <div className="w-[85%] flex flex-col items-center">
                        <div className="w-full h-1.5 bg-neutral-600 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]"></div>
                        <span className="text-[8px] uppercase tracking-[0.25em] text-neutral-500 mt-1.5">ESCENARIO DEL ACTO</span>
                      </div>

                      {/* Seat rows layout */}
                      <div className="flex flex-col gap-2.5 items-center">
                        {rows.map(row => (
                          <div key={row} className="flex items-center gap-2.5">
                            <span className="w-4 text-[10px] text-neutral-500 font-bold font-mono">{row}</span>
                            <div className="flex items-center gap-1.5">
                              {cols.map(col => {
                                const seatId = `${row}${col}`;
                                const isOccupied = occupiedSeats.includes(seatId);
                                const isSelected = selectedSeats.includes(seatId);

                                return (
                                  <button
                                    key={seatId}
                                    onClick={() => toggleSeat(seatId)}
                                    className={`h-7 w-7 sm:h-8 sm:w-8 rounded-lg flex items-center justify-center text-[9px] font-mono font-bold transition-all relative cursor-pointer
                                      ${isOccupied 
                                        ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed border border-neutral-900/50' 
                                        : isSelected
                                          ? 'bg-blue-600 text-white shadow-sm border border-blue-400/20 scale-[1.04]' 
                                          : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white border border-neutral-800 hover:scale-[1.04]'
                                      }
                                    `}
                                    title={isOccupied ? `Asiento ${seatId} ocupado` : `Asiento ${seatId}`}
                                  >
                                    {isSelected ? '✓' : seatId}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Legends */}
                      <div className="flex justify-center gap-4 text-[9px] text-neutral-500 pt-2 border-t border-neutral-900 w-full">
                        <div className="flex items-center gap-1">
                          <div className="w-2.5 h-2.5 rounded bg-neutral-900 border border-neutral-800"></div>
                          <span>Disponible</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2.5 h-2.5 rounded bg-slate-800 border border-neutral-900/50"></div>
                          <span>Ocupado</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2.5 h-2.5 rounded bg-blue-600"></div>
                          <span>Tu Reserva</span>
                        </div>
                      </div>
                    </div>

                    {/* Selection status */}
                    <div className="md:col-span-4 space-y-4">
                      <div className="bg-black p-4 rounded-xl border border-neutral-900 space-y-3">
                        <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">RESUMEN DE RESERVA</h4>
                        <div className="space-y-1">
                          <span className="text-[10px] text-neutral-500 block">Butacas escogidas:</span>
                          <span className="text-sm font-bold text-white font-mono block">
                            {selectedSeats.length > 0 ? selectedSeats.sort().join(', ') : 'Ninguna (haz clic en el mapa)'}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-neutral-900 flex justify-between text-xs text-neutral-400">
                          <span>Tasas académicas:</span>
                          <span className="font-semibold text-white">15,00 € (Simulación)</span>
                        </div>
                      </div>
                      <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-[10px] text-neutral-400 leading-relaxed">
                        <span className="font-bold text-white block mb-1">Control de Acceso Integrado</span>
                        En la plataforma real, el sistema valida la matrícula del alumno y el pago de tasas de forma segura antes de confirmar su asignación en base de datos.
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Tab 2: Ticket Wallet / PDF Preview */}
              {activeTab === 'ticket' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-base font-bold text-white">Descarga de Entradas Multiformato</h3>
                      <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                        Visualiza cómo se generan los tickets dinámicamente. Alterna entre los formatos oficiales.
                      </p>
                    </div>

                    {/* Format Selector tab */}
                    <div className="flex bg-neutral-900 rounded-lg p-0.5 border border-neutral-800">
                      <button 
                        onClick={() => setTicketFormat('wallet')}
                        className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all ${ticketFormat === 'wallet' ? 'bg-black text-white shadow-sm' : 'text-neutral-400 hover:text-white'}`}
                      >
                        Apple Wallet
                      </button>
                      <button 
                        onClick={() => setTicketFormat('pdf')}
                        className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all ${ticketFormat === 'pdf' ? 'bg-black text-white shadow-sm' : 'text-neutral-400 hover:text-white'}`}
                      >
                        PDF Oficial
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center items-center py-4 bg-black/30 rounded-xl border border-neutral-900 min-h-[300px]">
                    {ticketFormat === 'wallet' ? (
                      /* Apple Wallet style layout */
                      <div className="w-full max-w-[240px] bg-black rounded-xl border border-neutral-800 overflow-hidden shadow-2xl relative text-xs">
                        <div className="bg-neutral-900/60 px-4 py-2.5 flex items-center justify-between border-b border-neutral-900">
                          <div className="flex items-center gap-1.5">
                            <GraduationCap className="h-3.5 w-3.5 text-white" />
                            <span className="text-[9px] font-extrabold tracking-widest text-neutral-300">GradOS</span>
                          </div>
                          <span className="text-[8px] font-mono text-neutral-500">TKT #0428</span>
                        </div>

                        <div className="p-4 space-y-4">
                          <div>
                            <span className="text-[7px] text-neutral-500 uppercase block font-bold">Acto Oficial</span>
                            <h4 className="text-xs font-bold text-white">Acto I: ETSII Málaga</h4>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div>
                              <span className="text-[7px] text-neutral-500 uppercase block font-bold">Graduando</span>
                              <span className="font-semibold text-neutral-200">Javier @javicadev</span>
                            </div>
                            <div>
                              <span className="text-[7px] text-neutral-500 uppercase block font-bold">Butacas</span>
                              <span className="font-semibold text-neutral-200 font-mono">
                                {selectedSeats.length > 0 ? selectedSeats.sort().join(', ') : 'B3, B4'}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between -mx-4 py-2">
                            <div className="w-3.5 h-3.5 bg-[#0b0b0c] border-r border-neutral-800 rounded-full"></div>
                            <div className="w-full border-t border-dashed border-neutral-800"></div>
                            <div className="w-3.5 h-3.5 bg-[#0b0b0c] border-l border-neutral-800 rounded-full"></div>
                          </div>

                          {/* QR Mockup code */}
                          <div className="flex flex-col items-center py-1 space-y-1">
                            <div className="h-24 w-24 bg-white p-2 rounded-lg flex items-center justify-center shadow-lg relative group">
                              <svg className="w-full h-full text-black" viewBox="0 0 100 100" fill="currentColor">
                                <rect x="0" y="0" width="25" height="25" />
                                <rect x="5" y="5" width="15" height="15" fill="white" />
                                <rect x="10" y="10" width="5" height="5" />
                                <rect x="75" y="0" width="25" height="25" />
                                <rect x="80" y="5" width="15" height="15" fill="white" />
                                <rect x="0" y="75" width="25" height="25" />
                                <rect x="5" y="80" width="15" height="15" fill="white" />
                                <rect x="35" y="10" width="15" height="15" />
                                <rect x="55" y="30" width="20" height="20" />
                                <rect x="30" y="60" width="20" height="10" />
                              </svg>
                              <div className="absolute inset-0 bg-neutral-900/95 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center text-white">
                                <Lock className="h-3.5 w-3.5 mb-1" />
                                <span className="text-[7px] font-bold uppercase tracking-wider">QR de Seguridad</span>
                              </div>
                            </div>
                            <span className="text-[8px] font-mono text-neutral-500 tracking-wider">ETSII-2026-MALAGA</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* PDF style layout */
                      <div className="w-full max-w-[260px] bg-white rounded-lg p-5 border border-neutral-300 shadow-2xl text-neutral-800 space-y-3.5 text-xs">
                        <div className="flex justify-between items-center border-b pb-3 border-neutral-200">
                          <div>
                            <h4 className="text-[10px] font-bold text-neutral-900 uppercase tracking-tight">GraduationOS Ticket</h4>
                            <p className="text-[8px] text-neutral-400">ETSII UMA &bull; Evento Oficial</p>
                          </div>
                          <div className="p-1 rounded bg-black text-white">
                            <GraduationCap className="h-3.5 w-3.5" />
                          </div>
                        </div>

                        <div className="space-y-2 text-[9px] text-neutral-600">
                          <div className="bg-neutral-50 p-2 rounded border border-neutral-100 grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-[7px] text-neutral-400 block font-medium">Graduando:</span>
                              <span className="font-bold text-neutral-700">Javier @javicadev</span>
                            </div>
                            <div>
                              <span className="text-[7px] text-neutral-400 block font-medium">DNI / Pasaporte:</span>
                              <span className="font-bold text-neutral-700">77777777Y</span>
                            </div>
                          </div>

                          <div className="p-2 border border-neutral-100 rounded space-y-1">
                            <div className="flex justify-between">
                              <span className="text-neutral-400">Entradas Asignadas:</span>
                              <span className="font-bold text-neutral-800">{selectedSeats.length > 0 ? selectedSeats.length : 2}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-400">Butacas Reservadas:</span>
                              <span className="font-bold text-neutral-800 font-mono">
                                {selectedSeats.length > 0 ? selectedSeats.sort().join(', ') : 'B3, B4'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-dashed border-neutral-300 pt-2 flex items-center justify-between">
                          <div className="h-10 w-10 border border-neutral-200 p-0.5 rounded bg-white">
                            <svg className="w-full h-full text-black" viewBox="0 0 100 100" fill="currentColor">
                              <rect x="0" y="0" width="25" height="25" />
                              <rect x="75" y="0" width="25" height="25" />
                              <rect x="0" y="75" width="25" height="25" />
                              <rect x="40" y="40" width="20" height="20" />
                            </svg>
                          </div>
                          <div className="text-right space-y-0.5 text-[8px] text-neutral-400">
                            <span>ID: VAL-918239812</span>
                            <div className="h-4 w-20 bg-neutral-200 flex items-center justify-between px-1 overflow-hidden">
                              {Array.from({ length: 15 }).map((_, i) => (
                                <div key={i} style={{ width: `${i % 2 === 0 ? 1 : 2}px` }} className="h-3 bg-black" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 3: Admin Console Dashboard Demo */}
              {activeTab === 'admin' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-base font-bold text-white">Consola de Control de Pagos y Justificantes</h3>
                      <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                        Experimenta cómo el equipo de validadores aprueba justificantes de pago y emite QRs en un solo clic.
                      </p>
                    </div>

                    <button 
                      onClick={resetAdminDemo}
                      className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Restablecer Demo
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch pt-2">
                    
                    {/* Admin metrics Left side */}
                    <div className="md:col-span-4 bg-black/40 p-4 rounded-xl border border-neutral-900 space-y-4 flex flex-col justify-between">
                      <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Estadísticas del Evento</h4>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-neutral-400 flex items-center gap-1.5">
                            <Check className="h-3.5 w-3.5 text-emerald-500" /> QRs Emitidos:
                          </span>
                          <span className="font-bold text-white font-mono">{adminStats.totalValidated}</span>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-neutral-400 flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-blue-400" /> Pendientes Revisar:
                          </span>
                          <span className="font-bold text-blue-400 font-mono">{adminStats.pendingReviews}</span>
                        </div>

                        <div className="flex justify-between items-center text-xs border-t border-neutral-900 pt-2.5">
                          <span className="text-neutral-400 flex items-center gap-1.5">
                            <DollarSign className="h-3.5 w-3.5 text-white" /> Tasas Validadas:
                          </span>
                          <span className="font-bold text-white font-mono">{adminStats.revenue.toLocaleString('es-ES')} €</span>
                        </div>
                      </div>

                      <div className="bg-neutral-950 p-2.5 rounded border border-neutral-900 space-y-1.5">
                        <span className="text-[9px] text-neutral-500 block uppercase font-bold">Estado del Servidor</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                          <span className="text-[10px] text-neutral-300 font-medium">BBDD Sincronizada</span>
                        </div>
                      </div>
                    </div>

                    {/* Document Verification Table/Queue Right side */}
                    <div className="md:col-span-8 bg-black/40 rounded-xl border border-neutral-900 overflow-hidden flex flex-col">
                      <div className="bg-neutral-900/40 p-3 border-b border-neutral-900 text-xs font-semibold text-neutral-400 grid grid-cols-12 gap-2">
                        <div className="col-span-5">Estudiante</div>
                        <div className="col-span-4">Comprobante</div>
                        <div className="col-span-3 text-right">Acciones</div>
                      </div>

                      <div className="divide-y divide-neutral-900 text-xs flex-1">
                        {adminRequests.map(req => (
                          <div key={req.id} className="p-3 grid grid-cols-12 gap-2 items-center hover:bg-neutral-900/10 transition-colors">
                            <div className="col-span-5 space-y-0.5">
                              <span className="font-semibold text-white block">{req.name}</span>
                              <span className="text-[9px] text-neutral-500">{req.degree}</span>
                            </div>
                            
                            <div className="col-span-4 flex items-center gap-1.5 text-neutral-400">
                              <span className="text-[10px] truncate max-w-[130px] font-mono" title={req.file}>{req.file}</span>
                            </div>

                            <div className="col-span-3 flex justify-end gap-1.5">
                              {req.status === 'pending' ? (
                                <>
                                  <button 
                                    onClick={() => approveRequest(req.id, req.name)}
                                    className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[9px] transition-colors cursor-pointer"
                                    title="Aprobar pago"
                                  >
                                    Aprobar
                                  </button>
                                  <button 
                                    onClick={() => rejectRequest(req.id, req.name)}
                                    className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-red-400 font-semibold text-[9px] transition-all cursor-pointer"
                                    title="Rechazar justificante"
                                  >
                                    Rechazar
                                  </button>
                                </>
                              ) : req.status === 'approved' ? (
                                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/40 flex items-center gap-0.5">
                                  ✓ Validado
                                </span>
                              ) : (
                                <span className="text-[9px] font-bold text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-900/40">
                                  Rechazado
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Status details footer of the container */}
              <div className="mt-8 pt-4 border-t border-neutral-900 flex justify-between items-center text-xs text-neutral-500">
                <span>Modo demostración GraduationOS</span>
                <span className="font-semibold text-neutral-400 flex items-center gap-1">
                  Base de datos local simulada <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* METRICS / STATS SECTION */}
        <section id="impact" className="py-20 border-b border-neutral-900">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 text-center space-y-1">
              <span className="text-3xl font-black text-white font-mono block">
                &lt; 2s
              </span>
              <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">
                Tiempo de Lectura QR
              </span>
              <p className="text-xs text-neutral-400 font-light mt-1">
                Entradas validadas instantáneamente por escáner en puerta.
              </p>
            </div>

            <div className="p-6 text-center space-y-1 border-l border-neutral-900">
              <span className="text-3xl font-black text-white font-mono block">
                100%
              </span>
              <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">
                Asignación de Butacas
              </span>
              <p className="text-xs text-neutral-400 font-light mt-1">
                Completa integración entre el mapa fiel y la reserva del alumno.
              </p>
            </div>

            <div className="p-6 text-center space-y-1 border-l border-neutral-900">
              <span className="text-3xl font-black text-white font-mono block">
                99.8%
              </span>
              <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">
                Tasa de Satisfacción
              </span>
              <p className="text-xs text-neutral-400 font-light mt-1">
                Inscripciones de graduandos fluidas, autónomas y rápidas.
              </p>
            </div>

            <div className="p-6 text-center space-y-1 border-l border-neutral-900">
              <span className="text-3xl font-black text-white font-mono block">
                1500+
              </span>
              <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">
                QRs Validados
              </span>
              <p className="text-xs text-neutral-400 font-light mt-1">
                Entradas emitidas automáticamente y enviadas por correo electrónico.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT / DEMO REQUEST FORM */}
        <section id="contact" className="py-20 scroll-mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Sales Text */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3 text-center lg:text-left">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                  PROYECTO ACADÉMICO / COMERCIAL
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Implementa GraduationOS en tu institución
                </h2>
                <p className="text-neutral-400 text-sm font-light leading-relaxed">
                  ¿Estás listo para licenciar GraduationOS para tu universidad, facultad o ceremonia de posgrado? Rellena el formulario para obtener más detalles o contacta directamente con el desarrollador del proyecto.
                </p>
              </div>

              {/* Developer contact card (Apple Badge style) */}
              <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-neutral-900 flex items-center justify-center border border-neutral-800 text-white font-bold text-xs">
                    @J
                  </div>
                  <div className="text-left space-y-0.5">
                    <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider block">DESARROLLADOR PRINCIPAL</span>
                    <h4 className="text-xs font-bold text-white">Javier &bull; @javicadev</h4>
                    <p className="text-[10px] text-neutral-500">Autor del Proyecto GraduationOS</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-900">
                  <button 
                    onClick={copyContact}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-[10px] text-neutral-300 font-semibold border border-neutral-800 transition-colors cursor-pointer"
                  >
                    <Plus className="h-3 w-3" />
                    <span>{copiedText ? 'Copiado' : 'Telegram: @javicadev'}</span>
                  </button>
                  <a 
                    href="mailto:hello@javicadev.com"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-[10px] text-neutral-300 font-semibold border border-neutral-800 transition-colors"
                  >
                    <Mail className="h-3 w-3" />
                    <span>hello@javicadev.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Request Demo Form */}
            <div className="lg:col-span-7 w-full max-w-xl mx-auto">
              <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
                <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                  <MessageSquare className="h-4.5 w-4.5 text-neutral-400" />
                  <span>Solicitar Información y Demo</span>
                </h3>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-[10px] font-semibold text-neutral-500 uppercase flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        <span>Nombre Completo <span className="text-red-400">*</span></span>
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Tu nombre" 
                        required
                        className="input-field text-xs rounded-lg"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-[10px] font-semibold text-neutral-500 uppercase flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5" />
                        <span>Correo Institucional <span className="text-red-400">*</span></span>
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="nombre@universidad.edu" 
                        required
                        className="input-field text-xs rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="institution" className="text-[10px] font-semibold text-neutral-500 uppercase flex items-center gap-1.5">
                      <Building className="h-3.5 w-3.5" />
                      <span>Universidad / Entidad Organizadora</span>
                    </label>
                    <input 
                      type="text" 
                      id="institution"
                      value={form.institution}
                      onChange={e => setForm({ ...form, institution: e.target.value })}
                      placeholder="Universidad de Málaga, etc." 
                      className="input-field text-xs rounded-lg"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-[10px] font-semibold text-neutral-500 uppercase flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>Detalles del Requerimiento <span className="text-red-400">*</span></span>
                    </label>
                    <textarea 
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Indícanos cuántas personas asistirán a tu acto y qué características deseas probar..."
                      required
                      className="input-field text-xs rounded-lg resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={sending}
                    className="btn-primary w-full text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer bg-neutral-900 border border-neutral-800 text-white rounded-lg py-2.5 hover:bg-neutral-800 transition-all active:scale-[0.98]"
                  >
                    {sending ? (
                      <>
                        <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-neutral-400 border-t-transparent"></span>
                        <span>Procesando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Enviar Solicitud</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-10 bg-neutral-950/20 mt-20 text-xs">
        <div className="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-white" />
            <span className="font-semibold text-white">
              Graduation<span className="font-light">OS</span>
            </span>
          </div>

          <p className="text-neutral-500 text-center sm:text-right">
            Desarrollado por <a onClick={copyContact} className="text-neutral-400 hover:text-white cursor-pointer transition-colors font-semibold">@javicadev</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}
