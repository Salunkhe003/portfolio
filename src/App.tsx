import React, { useState, useEffect, useMemo } from 'react';
import {
  Code2,
  Terminal,
  Database,
  Cpu,
  Layers,
  ExternalLink,
  Mail,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Server,
  Workflow,
  Copy,
  Check,
  Download,
  Menu,
  X,
  ShieldCheck,
  Zap,
  ChevronRight,
  BookOpen,
  GraduationCap,
  Award,
  Layers2
} from 'lucide-react';

const CASE_STUDIES = [
  {
    id: 'cafe-mgmt',
    title: 'Cafe Ordering & Digital Management System',
    subtitle: 'Omnichannel Order & Dynamic Kitchen Orchestration Platform',
    category: 'Full-Stack Web App',
    problem: 'Traditional paper-based cafe ordering created operational bottlenecks, billing discrepancies during rush hours, and sluggish revenue tracking for cafe leadership.',
    solution: 'Engineered an end-to-end web platform serving dynamic menu items, live kitchen dispatch status, session-based route security, and ACID-compliant transaction persistence.',
    metrics: [
      { label: 'Menu Catalog', val: '20+ dynamic items' },
      { label: 'Latency', val: '< 600ms order cycle' },
      { label: 'Data Loss', val: '0% in concurrent load' }
    ],
    tech: ['Java Servlets', 'JSP', 'JDBC', 'MySQL', 'Apache Tomcat', 'JavaScript', 'CSS3'],
    highlights: [
      'Stateless user session handling with granular route-level authorization guards',
      'Dynamic JSP views paired with servlet controllers handling simultaneous customer carts',
      'ACID-compliant JDBC transactions preventing checkout race conditions and inventory drift',
      'Real-time administrative reporting for shift-wise sales totals and ledger balancing'
    ],
    githubUrl: 'https://github.com/Salunkhe003',
    demoUrl: '#',
    featured: true
  },
  {
    id: 'inventory-engine',
    title: 'Enterprise Inventory & SKU Tracking Engine',
    subtitle: 'High-Throughput Batch Processing & Stock Alert Core',
    category: 'Backend & Systems',
    problem: 'Manual warehouse tracking and non-indexed database schemas caused severe stockout surprises, stock count drift, and multi-second query delays for enterprise SKU lists.',
    solution: 'Constructed an automated backend engine utilizing JDBC transactional batching and optimized indexing to execute 100+ record bulk updates in a single round-trip.',
    metrics: [
      { label: 'SKUs Tracked', val: '500+ Active Items' },
      { label: 'Batch Processing', val: '100+ records / trip' },
      { label: 'Query Performance', val: '< 50ms indexed reads' }
    ],
    tech: ['Core & Adv. Java', 'JDBC Batching', 'MySQL 8.0', 'PreparedStatements', 'Maven'],
    highlights: [
      'Engineered low-stock trigger routines mitigating stockout risks across supply depots',
      'Parameterized JDBC PreparedStatements eliminating SQL injection attack vectors',
      'Normalized relational schemas with multi-column composite indexing for instant filtering',
      'Comprehensive audit log generation tracking inbound, outbound, and scrap inventory events'
    ],
    githubUrl: 'https://github.com/harshalsalunkhe',
    demoUrl: '#',
    featured: true
  }
];

const SERVICES = [
  {
    id: 'web-apps',
    title: 'Custom Web Applications',
    tagline: 'End-to-End Enterprise Architecture',
    desc: 'From responsive React interfaces down to robust Spring Boot and Java backends. I architect systems that convert user workflows into secure, intuitive web apps.',
    capabilities: [
      'Role-based access control (RBAC) & session safety',
      'Modern, highly responsive React & Tailwind frontends',
      'Transactional database schema design & state logic',
      'Production-ready deployable builds'
    ],
    stack: ['Java', 'Spring Boot', 'React', 'Tailwind CSS', 'MySQL'],
    icon: Layers
  },
  {
    id: 'api-dev',
    title: 'API Development & Integration',
    tagline: 'High-Throughput Microservices & Endpoints',
    desc: 'Clean, standardized RESTful APIs built for high concurrency. I handle third-party service wiring, gateway integrations, and sub-100ms endpoint optimization.',
    capabilities: [
      'RESTful service contracts with clean documentation',
      'Payment gateways, notifications, and webhooks',
      'Database query optimization & JDBC batching',
      'Secure token verification & input sanitization'
    ],
    stack: ['Java', 'Spring Boot', 'REST APIs', 'Postman', 'MySQL'],
    icon: Server
  },
  {
    id: 'admin-dashboards',
    title: 'Admin Dashboards & Portals',
    tagline: 'Internal Tools for Operations & Data Control',
    desc: 'Custom-built administrative panels that empower business operators. Real-time data visualization, bulk data tools, and auditable operational workflows.',
    capabilities: [
      'Fast filtering, search, and CSV/Excel record export',
      'Real-time operational status and metrics indicators',
      'Granular administrative CRUD permission policies',
      'Intuitive UX reducing operator training overhead'
    ],
    stack: ['React', 'JavaScript ES6+', 'REST APIs', 'SQL'],
    icon: Workflow
  }
];

const SKILLS_MATRIX = {
  Backend: [
    { name: 'Java (Core & Adv)', level: 'Advanced', highlight: 'OOP, Collections, Threads' },
    { name: 'Spring Boot', level: 'Intermediate', highlight: 'REST Controllers, Services' },
    { name: 'Java Servlets & JSP', level: 'Advanced', highlight: 'Stateless Sessions & MVC' },
    { name: 'RESTful API Architecture', level: 'Advanced', highlight: 'Clean contracts & validation' }
  ],
  Frontend: [
    { name: 'React', level: 'Proficient', highlight: 'Hooks, State, Component architecture' },
    { name: 'JavaScript (ES6+)', level: 'Advanced', highlight: 'Async/Await, DOM, Closures' },
    { name: 'Tailwind CSS', level: 'Advanced', highlight: 'Responsive tokens & fluid UI' },
    { name: 'HTML5 & CSS3', level: 'Advanced', highlight: 'Semantic structure & accessibility' }
  ],
  'Databases & Storage': [
    { name: 'MySQL', level: 'Advanced', highlight: 'Schema Design, Foreign Keys' },
    { name: 'SQL Query Tuning', level: 'Advanced', highlight: 'Joins, Composite Indexes' },
    { name: 'JDBC & Batching', level: 'Advanced', highlight: 'PreparedStatements, Transactions' },
    { name: 'Data Normalization', level: 'Advanced', highlight: '3NF, Integrity constraints' }
  ],
  'DevOps & Tools': [
    { name: 'Git & GitHub', level: 'Advanced', highlight: 'Branching, PRs, Version Control' },
    { name: 'Postman', level: 'Proficient', highlight: 'API contract & load testing' },
    { name: 'Maven', level: 'Proficient', highlight: 'Lifecycle & dependency management' },
    { name: 'Apache Tomcat', level: 'Proficient', highlight: 'Deployment & servlet container' }
  ]
};

const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState('Backend');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Custom Web Application',
    budget: '$1,500 - $3,500',
    timeline: 'Within 1 Month',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Time tracker for Pune, India (IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('harshal.salunkhe.dev@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2200);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '360c122d-e273-40b7-a0eb-162833dfccd5', // <-- Paste your copied key inside these quotes
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormSubmitted(true);
      } else {
        alert('Failed to send message: ' + (result.message || 'Please try again.'));
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-zinc-100 font-sans selection:bg-emerald-500/20 selection:text-emerald-400">
      {/* Background ambient gradient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-emerald-500/10 via-indigo-600/5 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-1/2 -left-64 w-[500px] h-[500px] bg-emerald-600/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-20 -right-64 w-[500px] h-[500px] bg-indigo-500/5 blur-[140px] rounded-full" />
      </div>

      {}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#070b13]/85 border-b border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-indigo-600 p-[1px] shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0d131f] rounded-[7px] flex items-center justify-center text-emerald-400 font-mono font-bold text-base">
                HS
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-zinc-100 group-hover:text-emerald-400 transition-colors">
                Harshal Salunkhe
              </span>
              <span className="text-[11px] font-mono text-zinc-400">Full-Stack Engineer</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-zinc-300">
            <a href="#services" className="hover:text-emerald-400 transition-colors">Services</a>
            <a href="#projects" className="hover:text-emerald-400 transition-colors">Case Studies</a>
            <a href="#skills" className="hover:text-emerald-400 transition-colors">Tech Matrix</a>
            <a href="#about" className="hover:text-emerald-400 transition-colors">Background</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">Inquiry</a>
          </nav>

          {/* Right Action & Availability status */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Contracts</span>
            </div>
            <a
              href="#contact"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-all shadow-sm hover:shadow-emerald-500/25 active:scale-95"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-3 pb-6 bg-[#090e18] border-b border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Open to Freelance & Contract</span>
            </div>
            <div className="flex flex-col space-y-2 pt-2 text-sm font-medium text-zinc-300">
              <a onClick={() => setMobileMenuOpen(false)} href="#services" className="px-2 py-1.5 hover:text-emerald-400">Services</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#projects" className="px-2 py-1.5 hover:text-emerald-400">Projects</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#skills" className="px-2 py-1.5 hover:text-emerald-400">Skills</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#about" className="px-2 py-1.5 hover:text-emerald-400">About</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#contact" className="px-2 py-1.5 hover:text-emerald-400">Contact</a>
            </div>
            <div className="pt-2">
              <a
                onClick={() => setMobileMenuOpen(false)}
                href="#contact"
                className="block text-center w-full py-2.5 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950"
              >
                Start a Project
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {}
        <section className="pt-16 pb-16 md:pt-24 md:pb-24">
          <div className="flex flex-col items-start gap-5 max-w-3xl">
            {/* Location & Time badge */}
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 shadow-inner">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <MapPin size={13} className="text-emerald-400" />
                Pune, India
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span className="flex items-center gap-1.5 text-zinc-400 font-mono">
                <Clock size={13} className="text-indigo-400" />
                {currentTime || 'IST (UTC+5:30)'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 leading-[1.12]">
              Building resilient web apps &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
                high-throughput REST APIs
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl font-normal">
              I am <span className="text-zinc-200 font-semibold">Harshal Salunkhe</span>, a Full-Stack Software Engineer. I bridge disciplined backend architecture in <span className="text-emerald-400 font-mono text-sm">Java &amp; Spring Boot</span> with modern, responsive <span className="text-indigo-400 font-mono text-sm">React</span> interfaces to deliver secure, production-grade business tools.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-all shadow-md shadow-emerald-500/20 active:scale-95"
              >
                <span>Explore Case Studies</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-700/80 text-zinc-200 transition-colors"
              >
                <Calendar size={15} className="text-emerald-400" />
                <span>Book Inquiry</span>
              </a>
            </div>

            {/* Social quick links */}
            <div className="flex items-center gap-4 pt-2 text-zinc-400 text-xs">
              <a
                href="https://github.com/Salunkhe003"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
              >
                <GithubIcon className="w-5 h-5"/>
                <span>GitHub</span>
              </a>
              <span className="text-zinc-700">•</span>
              <a
                href="https://www.linkedin.com/in/harshal-salunkhe/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
              >
                <LinkedinIcon className="w-5 h-5"/>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </section>

        {}
        <section className="py-6 border-y border-zinc-800/80 bg-zinc-900/30 backdrop-blur-sm -mx-4 sm:-mx-6 px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">&lt; 50ms</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider font-medium">Query Optimizations</div>
              <div className="text-[11px] text-zinc-500">Indexed schema tuning &amp; batch execution</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">500+ SKUs</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider font-medium">Batch Architecture</div>
              <div className="text-[11px] text-zinc-500">Atomic database round-trips &amp; safe triggers</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-300 font-mono">Full-Stack</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider font-medium">Enterprise Scope</div>
              <div className="text-[11px] text-zinc-500">Spring Boot backend to React state flows</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-200 font-mono">100%</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider font-medium">ACID Integrity</div>
              <div className="text-[11px] text-zinc-500">Zero data drift in concurrent order checkouts</div>
            </div>
          </div>
        </section>

        {}
        <section id="services" className="py-20">
          <div className="space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium">
              CLIENT DELIVERABLES
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
              Services tailored to business outcomes
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl">
              I frame technical execution around tangible deliverables: scalable software, reduced query latency, and reliable business tools.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((srv) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="flex flex-col justify-between p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/90 hover:border-zinc-700 transition-all hover:translate-y-[-2px] group"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <IconComp size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-zinc-100 group-hover:text-emerald-400 transition-colors">
                        {srv.title}
                      </h3>
                      <div className="text-xs font-mono text-zinc-400 mt-0.5">{srv.tagline}</div>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {srv.desc}
                    </p>

                    <div className="pt-2 space-y-2 border-t border-zinc-800/60">
                      {srv.capabilities.map((cap, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 size={13} className="text-emerald-400 mt-0.5 shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-4 flex flex-wrap gap-1.5 border-t border-zinc-800/50">
                    {srv.stack.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {}
        <section id="projects" className="py-20 border-t border-zinc-800/80">
          <div className="space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
              PROVEN RESULTS
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
              Selected Project Case Studies
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl">
              Concrete breakdowns showing the core business problem, backend logic, and production capabilities shipped.
            </p>
          </div>

          <div className="space-y-12">
            {CASE_STUDIES.map((project, idx) => (
              <div
                key={project.id}
                className="rounded-2xl bg-zinc-900/70 border border-zinc-800 p-6 sm:p-8 hover:border-zinc-700 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Case Study 0{idx + 1}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">{project.category}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-100">{project.title}</h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1">{project.subtitle}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedCaseStudy(project)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-colors"
                    >
                      <span>Deep Dive</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Metrics Banner */}
                <div className="grid grid-cols-3 gap-3 my-6 p-4 rounded-xl bg-[#090f1a] border border-zinc-800/80">
                  {project.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="text-center sm:text-left">
                      <div className="text-emerald-400 font-mono font-bold text-base sm:text-lg">{m.val}</div>
                      <div className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">The Problem</h4>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{project.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">Engineered Solution</h4>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{project.solution}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Key Architecture Capabilities</h4>
                    <div className="space-y-2">
                      {project.highlights.map((hl, hlIdx) => (
                        <div key={hlIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="mt-6 pt-4 border-t border-zinc-800/60 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-zinc-500 font-mono mr-1">Tech Stack:</span>
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-800/70 text-zinc-300 border border-zinc-700/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {}
        <section id="skills" className="py-20 border-t border-zinc-800/80">
          <div className="space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono font-medium">
              TECHNICAL TOOLKIT
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
              Technical Skills &amp; Architecture Matrix
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl">
              Categorized technologies and implementation strengths for rapid engineering review.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(SKILLS_MATRIX).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveSkillCategory(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeSkillCategory === cat
                    ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards for active category */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {(SKILLS_MATRIX as any)[activeSkillCategory].map((skill: any, sIdx: number) => (
              <div
                key={sIdx}
                className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-zinc-100">{skill.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 border border-zinc-700/60">
                    {skill.level}
                  </span>
                </div>
                <div className="text-xs text-zinc-400 leading-relaxed font-mono">
                  {skill.highlight}
                </div>
              </div>
            ))}
          </div>
        </section>

        {}
        <section id="about" className="py-20 border-t border-zinc-800/80">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium">
                  PROFESSIONAL BACKGROUND
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
                  Engineering with discipline &amp; clear communication
                </h2>
              </div>

              {/* Bio Pitch */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-zinc-900/90 to-zinc-900/40 border border-zinc-800 space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Sparkles size={14} />
                  Client Value Proposition
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  I construct production-ready web applications and high-throughput REST APIs designed to scale smoothly as your business grows. Combining disciplined backend architecture in Java and Spring Boot with responsive, modern React interfaces, I ensure clean, maintainable code that prioritizes security and performance.
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Whether launching an internal management tool or engineering customer-facing workflows, I communicate proactively, respect project timelines, and deliver reliable solutions built to standard from day one.
                </p>
              </div>

              {/* Work Experience Summary */}
              <div className="space-y-4">
                <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-wider">Core Experience Highlights</h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-zinc-200">Full-Stack Software Engineer</span>
                      <span className="font-mono text-zinc-500">Contract &amp; Systems</span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Shipped end-to-end full-stack web applications, architecting robust backend services in Java/Spring Boot and integrating dynamic React frontends. Optimized relational MySQL schemas to sustain sub-50ms read latency.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-zinc-200">Technical Instruction &amp; Workshop Lead</span>
                      <span className="font-mono text-zinc-500">Corporate &amp; Academic</span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Conducted technical workshops on Data Structures, C programming, and Full-Stack Java architecture, helping aspiring developers write clean, maintainable code.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Education & Credentials sidebar */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                  <GraduationCap size={15} />
                  Education &amp; Credentials
                </h3>

                <div className="space-y-4">
                  <div className="space-y-1 pb-3 border-b border-zinc-800">
                    <div className="text-xs font-mono text-emerald-400">Post-Graduate Degree</div>
                    <div className="font-semibold text-zinc-200 text-sm">Master of Computer Applications (MCA)</div>
                    <div className="text-xs text-zinc-400">Advanced Computing, Distributed Systems &amp; Software Design</div>
                  </div>

                  <div className="space-y-1 pb-3 border-b border-zinc-800">
                    <div className="text-xs font-mono text-indigo-400">Undergraduate Degree</div>
                    <div className="font-semibold text-zinc-200 text-sm">Bachelor of Computer Applications (BCA)</div>
                    <div className="text-xs text-zinc-400">Core Computer Science, Relational Databases &amp; Web Technology</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-mono text-teal-400">Technical Leadership</div>
                    <div className="font-semibold text-zinc-200 text-sm">Instructor &amp; Workshop Conductor</div>
                    <div className="text-xs text-zinc-400">Algorithms, Memory Management &amp; Enterprise Java Best Practices</div>
                  </div>
                </div>
              </div>

              {/* Timezone & Working Modality */}
              <div className="p-6 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                  <Clock size={15} className="text-emerald-400" />
                  Availability &amp; Timezones
                </h3>
                <div className="space-y-2 text-xs text-zinc-300">
                  <div className="flex justify-between py-1 border-b border-zinc-800/80">
                    <span className="text-zinc-400">Location Base:</span>
                    <span className="font-medium text-zinc-200">Pune, Maharashtra, India</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800/80">
                    <span className="text-zinc-400">Primary Timezone:</span>
                    <span className="font-mono text-emerald-400">IST (UTC+5:30)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800/80">
                    <span className="text-zinc-400">Client Overlap:</span>
                    <span className="text-zinc-200">US EST / CET Morning Overlap</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-400">Contract Types:</span>
                    <span className="text-zinc-200">Fixed-Scope &amp; Retainer / Freelance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {}
        <section id="contact" className="py-20 border-t border-zinc-800/80">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
                START A CONVERSATION
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
                Let's discuss your application requirements
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Whether you need a full web product, a high-throughput API, or an administrative dashboard, feel free to submit project specs or book an intro call.
              </p>

              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Mail size={17} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-mono text-zinc-400">Direct Email</div>
                    <div className="text-xs sm:text-sm font-semibold text-zinc-200 truncate">
                      harshalsalunkhe399@gmail.com
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                    title="Copy Email"
                  >
                    {emailCopied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </div>

                
              </div>
            </div>

            {/* Interactive Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl">
                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100">Inquiry Received</h3>
                    <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
                      Thanks for reaching out! I will review your project specs and respond via email within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          service: 'Custom Web Application',
                          budget: '$1,500 - $3,500',
                          timeline: 'Within 1 Month',
                          message: ''
                        });
                      }}
                      className="px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Name"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">Work Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Email"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-xs font-medium text-zinc-300">Engagement Type / Service</label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                        >
                          <optgroup label="Engineering & Development" className="bg-zinc-900 text-zinc-400 font-semibold">
                            <option className="text-zinc-200">Custom Web Application</option>
                            <option className="text-zinc-200">API Development &amp; Optimization</option>
                            <option className="text-zinc-200">Admin Dashboard / Internal Portal</option>
                            <option className="text-zinc-200">Database Tuning &amp; Refactoring</option>
                          </optgroup>

                          <optgroup label="Mentorship & Advisory" className="bg-zinc-900 text-zinc-400 font-semibold">
                            <option className="text-zinc-200">1-on-1 Technical Mentorship (Java, C, Web Dev)</option>
                            <option className="text-zinc-200">Code Review &amp; Debugging Session</option>
                            <option className="text-zinc-200">System Architecture Consultation</option>
                            <option className="text-zinc-200">Academic / Technical Workshop Training</option>
                          </optgroup>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-300">Project Overview &amp; Goals *</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Briefly describe what you are looking to build, existing tech stack, or target timeline..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-all shadow-md shadow-emerald-500/20 active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                          <span>Dispatching Details...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Project Inquiry</span>
                          <ArrowRight size={15} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0b101c] border border-zinc-700/80 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">{selectedCaseStudy.category}</span>
                <h3 className="text-xl font-bold text-zinc-100">{selectedCaseStudy.title}</h3>
                <p className="text-xs text-zinc-400 mt-0.5">{selectedCaseStudy.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
              <div>
                <h4 className="font-mono text-xs uppercase text-zinc-400 font-semibold mb-1">Context &amp; Challenge</h4>
                <p className="leading-relaxed text-zinc-400">{selectedCaseStudy.problem}</p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase text-zinc-400 font-semibold mb-1">Architecture &amp; Strategy</h4>
                <p className="leading-relaxed text-zinc-400">{selectedCaseStudy.solution}</p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase text-zinc-400 font-semibold mb-2">Key Shipped Features</h4>
                <ul className="space-y-2">
                  {selectedCaseStudy.highlights.map((h: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle2 size={15} className="text-emerald-400 mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase text-zinc-400 font-semibold mb-2">Tech Stack Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCaseStudy.tech.map((t: string) => (
                    <span key={t} className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
              <a
                href={selectedCaseStudy.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:underline"
              >
                <GithubIcon className="w-5 h-5"/>
                <span>Inspect Repository on GitHub</span>
              </a>
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      <footer className="border-t border-zinc-900 bg-[#05080e] py-10 mt-20 text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-zinc-400 font-semibold">Harshal Salunkhe</span>
            <span>•</span>
            <span>Full-Stack Software Engineer</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://github.com/Salunkhe003" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/harshal-salunkhe/" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">
              LinkedIn
            </a>
            <a href="mailto:harshalsalunkhe139@gmail.com" className="hover:text-emerald-400 transition-colors">
              Email
            </a>
            <a href="#services" className="hover:text-zinc-300 transition-colors">
              Services
            </a>
          </div>

          <div className="text-zinc-600 font-mono text-[11px]">
            © {new Date().getFullYear()} • Built for performance &amp; scale
          </div>
        </div>
      </footer>
    </div>
  );
}