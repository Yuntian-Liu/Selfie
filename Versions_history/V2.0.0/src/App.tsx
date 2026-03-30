import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { 
  MessageCircle, 
  MessageSquare, 
  Github, 
  Mail, 
  Tv, 
  BookOpen, 
  Music, 
  Gamepad2, 
  Globe,
  PenTool,
  Sun,
  Moon
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  icon: string;
  role: string;
  isFlagship: boolean;
  layoutClass: string;
  tagClass: string;
  images: string[];
  coverImages?: string[];
  shortDesc: string;
  details: string[];
  githubUrl?: string;
  liveUrls?: { label: string; url: string }[];
}

const techProjects: Project[] = [
  {
    id: 'solid-state',
    title: '基于LLM的高通量固态电池分子逆合成系统',
    category: 'AI for Science / MCTS',
    icon: '🔋',
    role: '模型训练与开发',
    isFlagship: true,
    layoutClass: 'span-2 bg-yellow',
    tagClass: 'bg-black text-white',
    images: ['/images/SolidState_Agent_1.jpg', '/images/SolidState_Agent_2.jpg', '/images/SolidState_Agent_3.png'],
    coverImages: ['/images/SolidState_Agent_3.png', '/images/SolidState_Agent_1.jpg', '/images/SolidState_Agent_2.jpg'],
    shortDesc: '基于高通量逆合成分析模型，结合经LoRA微调的LLM与蒙特卡洛树搜索（MCTS），实现改性聚氨酯弹性自愈电池材料的高通量筛选与发现，突破黑盒限制提供化学直觉解释。',
    details: [
      '构建基于大语言模型 (LLM) 的高通量分子逆合成分析系统，针对固态电池材料研发痛点提供AI解决方案。',
      '采用 LoRA 技术对开源大模型进行微调，注入化学领域专业知识，提升模型在特定领域的表现。',
      '结合蒙特卡洛树搜索 (MCTS) 算法，优化合成路径规划，突破传统黑盒模型的不可解释性，提供具有化学直觉的路径解释。',
      '成功应用于改性聚氨酯弹性自愈电池材料的筛选，大幅缩短研发周期，展现了 AI for Science 的巨大潜力。'
    ],
    githubUrl: 'https://github.com/Yuntian-Liu/SolidState_Agent'
  },
  {
    id: 'medical-ai',
    title: '极小样本医学图像诊断',
    category: 'Computer Vision',
    icon: '👁️',
    role: '独立开发者',
    isFlagship: false,
    layoutClass: 'bg-white',
    tagClass: 'bg-black text-white',
    images: ['/images/AI_Medical_1.jpg', '/images/AI_Medical_2.jpg'],
    coverImages: ['/images/AI_Medical_2.jpg', '/images/AI_Medical_1.jpg'],
    shortDesc: '基于PyTorch构建多模态分类系统，引入Focal Loss与强数据增强，实现肺癌CT等10类病变高精度识别，Top-3准确率达95.24%。',
    details: [
      '独立完成基于 PyTorch 的极小样本医学图像分类系统开发。',
      '针对医疗数据稀缺问题，设计并实施了强数据增强策略（如 CutMix, Mixup 等），有效扩充训练样本。',
      '引入 Focal Loss 解决类别不平衡问题，优化模型收敛过程，提升难样本的识别率。',
      '在肺癌 CT 等 10 类病变数据集上进行严格测试，Top-3 准确率达到 95.24%，具备较高的临床辅助诊断价值。'
    ]
  },
  {
    id: 'gradify',
    title: 'Gradify 自动化批改',
    category: 'LLM Application',
    icon: '📝',
    role: '全栈开发 / 独立开发者',
    isFlagship: false,
    layoutClass: 'bg-white',
    tagClass: 'bg-black text-white',
    images: ['/images/Gradify_1.png', '/images/Gradify_2.png', '/images/Gradify_3.png'],
    coverImages: ['/images/Gradify_3.png', '/images/Gradify_1.png', '/images/Gradify_2.png'],
    shortDesc: 'FastAPI+JS构建，独创“三明治式”Prompt架构，结合Few-shot约束LLM生成解析，采用SSE流式输出，批改效率提升7.5倍。',
    details: [
      '独立负责前后端全栈开发，后端采用 FastAPI 提供高性能接口，前端采用原生 JS + Tailwind CSS 构建响应式界面。',
      '设计独创的“三明治式” Prompt 架构，结合 Few-shot 提示工程，精准约束 LLM 的输出格式与解析质量，避免幻觉。',
      '实现基于 SSE (Server-Sent Events) 的流式输出，让用户实时看到批改过程，大幅提升交互体验。',
      '系统上线后，英语作业批改效率提升 7.5 倍，有效释放教学人力，获得师生一致好评。'
    ],
    githubUrl: 'https://github.com/Yuntian-Liu/Gradify'
  },
  {
    id: 'myscore',
    title: 'MyScore 全栈成绩管理系统',
    category: 'Full Stack / Serverless',
    icon: '📊',
    role: '全栈开发 / 独立开发者',
    isFlagship: false,
    layoutClass: 'span-2 bg-blue text-white',
    tagClass: 'bg-black text-white',
    images: ['/images/MyScore_1.png', '/images/MyScore_2.png', '/images/MyScore_3.png'],
    coverImages: ['/images/MyScore_3.png', '/images/MyScore_1.png', '/images/MyScore_2.png'],
    shortDesc: '原生JS+Tailwind构建高性能SPA。依托Supabase实现Serverless架构与行级安全（RLS），集成DeepSeek大模型提供智能学习反馈，支持Canvas高保真成绩单导出。',
    details: [
      '独立设计并开发高性能单页应用 (SPA)，采用原生 JS 与 Tailwind CSS，追求极致的加载速度与流畅体验。',
      '基于 Supabase 构建 Serverless 后端架构，利用行级安全 (RLS) 策略保障用户数据隐私与权限隔离。',
      '深度集成 DeepSeek 大模型 API，根据学生成绩分布与历史数据，自动生成个性化学习反馈与提分建议。',
      '实现基于 Canvas 的高保真成绩单渲染与一键导出功能，满足用户分享与存档需求。'
    ],
    githubUrl: 'https://github.com/Yuntian-Liu/MyScore',
    liveUrls: [
      { label: '国内站 (V7.0)', url: 'http://ytun.com.cn' },
      { label: '国际站 (V7.5)', url: 'https://ytun.ltd' }
    ]
  }
];

const worldProjects: Project[] = [
  {
    id: 'houhai',
    title: '厚海教育 助教老师',
    category: 'Internship',
    icon: '💼',
    role: '英语助教',
    isFlagship: false,
    layoutClass: 'span-2 bg-yellow',
    tagClass: 'bg-black text-white',
    images: ['/images/Work_3.jpg', '/images/Work_4.jpg', '/images/Work_2.jpg', '/images/Work_1.jpg'],
    shortDesc: '入职时间：2025.09。负责英语作业批改与辅导。在实践中发现痛点，并独立开发 Gradify 自动化批改系统，服务百余名学员，有效释放教学人力，实现技术赋能教育。',
    details: [
      '入职时间：2025.09',
      '负责英语作业批改与辅导，跟进学生学习进度。',
      '在实践中发现痛点，并独立开发 Gradify 自动化批改系统，服务百余名学员。',
      '有效释放教学人力，实现技术赋能教育。'
    ]
  }
];

type TimelineEventType = 'success' | 'failure' | 'milestone' | 'neutral';

interface TimelineItem {
  date: string;
  events: {
    text: string;
    type: TimelineEventType;
  }[];
}

const pastTimeline: TimelineItem[] = [
  { date: '2024.06', events: [{ text: '第一志愿录取至北京化工大学、第六志愿专业录取至自动化类（高端装备与智能制造）', type: 'success' }] },
  { date: '2024.08', events: [{ text: '新生代表发言竞选 落选', type: 'failure' }] },
  { date: '2024.09', events: [{ text: '担任机自A2420班临时负责人', type: 'milestone' }, { text: '班长、学习委员竞选 落选', type: 'failure' }] },
  { date: '2024.10', events: [{ text: '入党积极分子竞选 落选', type: 'failure' }, { text: '学生会面试：学术科技部、团委办公室均通过一面（20/110）进入二面，二面均落选', type: 'failure' }] },
  { date: '2024.11', events: [{ text: '北京化工大学智能小车竞速赛 优秀奖', type: 'success' }] },
  { date: '2025.01', events: [{ text: '大一上期末GPA：A-', type: 'success' }] },
  { date: '2025.03', events: [{ text: '入党积极分子竞选 落选', type: 'failure' }] },
  { date: '2025.06', events: [{ text: 'CET-4考试：笔试636分，听力203，阅读249，写译184；口试：优秀', type: 'success' }] },
  { date: '2025.07', events: [{ text: '大一下期末GPA：B-', type: 'neutral' }, { text: '专业分流—进入测控技术与仪器专业—测控2402', type: 'milestone' }] },
  { date: '2025.08', events: [{ text: '厚海教育面试', type: 'neutral' }] },
  { date: '2025.09', events: [{ text: '厚海教育入职—实习—助教老师', type: 'success' }] },
  { date: '2025.10', events: [{ text: '入党积极分子竞选 票数第一当选', type: 'success' }] },
  { date: '2025.11', events: [{ text: '人工智能+竞赛 无奖', type: 'failure' }] },
  { date: '2025.12', events: [{ text: '入党积极分子考试 一次通过', type: 'success' }, { text: 'CET-6考试：笔试530分，听力188，阅读215，写译127；口试：良好', type: 'success' }] },
  { date: '2026.01', events: [{ text: '基于LLM的固态电池高通量分子逆合成模型 项目启动', type: 'milestone' }, { text: '大二上期末GPA：B', type: 'neutral' }, { text: 'MyScore 全栈开发 项目启动', type: 'milestone' }] },
  { date: '2026.03', events: [{ text: '获评2025~2026年度优秀团员', type: 'success' }, { text: 'Selfie 「碳碳四键丨多维空间」年度旗舰项目发布', type: 'success' }, { text: 'Gradify 全栈开发 项目启动', type: 'milestone' }] },
];

const futureTimeline: TimelineItem[] = [
  { date: '2026.03.17', events: [{ text: '参加米哈游北京城市宣讲会', type: 'neutral' }] },
  { date: '2026.03.18', events: [{ text: '递交2025~2026年度优秀共青团员申请，参加团支部选举', type: 'neutral' }] },
  { date: '2026.03.19', events: [{ text: '投递米哈游实习', type: 'neutral' }] },
  { date: '2026.03.20', events: [{ text: '米哈游AI产品岗终止', type: 'failure' }] },
  { date: '2026.03.21', events: [{ text: '投递小米实习', type: 'neutral' }] },
  { date: '2026.03.23', events: [{ text: '投递字节跳动实习', type: 'neutral' }] },
  { date: '2026.03.25', events: [{ text: '米哈游AI Agent开发岗 初筛通过', type: 'success' }] },
  { date: '2026.03.26', events: [{ text: '发布Selfie 「碳碳四键丨多维空间」年度旗舰项目', type: 'success' }, { text: '获评北京化工大学2025~2026年度优秀共青团员', type: 'success' }] },
];

export default function App() {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [activeTimelineTab, setActiveTimelineTab] = useState<'past' | 'future'>('past');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-dark-mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  // Phase 1 States
  const [isBooting, setIsBooting] = useState(true);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  // Social Unlock State
  const [isSocialUnlocked, setIsSocialUnlocked] = useState(false);
  const [socialPasswordInput, setSocialPasswordInput] = useState('');
  const [socialError, setSocialError] = useState('');

  // Resume Modal State
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [resumeAuthMode, setResumeAuthMode] = useState<'quiz' | 'fa'>('quiz');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [faPasswordInput, setFaPasswordInput] = useState('');
  const [resumeError, setResumeError] = useState('');
  const [isResumeReady, setIsResumeReady] = useState(false);
  const [isHobbiesModalOpen, setIsHobbiesModalOpen] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);

  const QUIZ_OPTIONS = ['小米', '米哈游', '鹰角网络', '哔哩哔哩', '腾讯', '美团', '字节跳动', '京东', '厚海教育', '华为', '网易游戏', '阿里巴巴'];
  const CORRECT_OPTIONS = ['小米', '米哈游', '字节跳动', '厚海教育'];

  const handleSocialUnlock = () => {
    if (socialPasswordInput === 'Ti2O3CX86_210121') {
      setIsSocialUnlocked(true);
      setSocialError('');
    } else {
      setSocialError('密钥错误，访问拒绝。');
    }
  };

  const toggleCompanySelection = (company: string) => {
    setSelectedCompanies(prev => 
      prev.includes(company) ? prev.filter(c => c !== company) : [...prev, company]
    );
    setResumeError(''); // Clear error on change
  };

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = '刘云天_简历.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResumeQuizSubmit = () => {
    if (selectedCompanies.length === CORRECT_OPTIONS.length && CORRECT_OPTIONS.every(c => selectedCompanies.includes(c))) {
      setIsResumeReady(true);
      setResumeError('');
    } else {
      setResumeError('验证失败：选项不正确，请重新选择。');
    }
  };

  const handleResumeFASubmit = () => {
    if (faPasswordInput === 'liuyunt_buct2024') {
      setIsResumeReady(true);
      setResumeError('');
    } else {
      setResumeError('FA密钥错误，访问拒绝。');
    }
  };

  const filterNames: Record<string, string> = {
      all: '核心全景',
      unique: '独一无二',
      tech: '奇思妙想',
      world: '大千世界',
      soul: '灵魂与温度',
      timeline: '回首与向前'
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('portfolio-dark-mode', String(isDarkMode));
  }, [isDarkMode]);

  // Phase 1: Boot Sequence Effect
  useEffect(() => {
    const lines = [
        "INITIATING SYSTEM BOOT...",
        "LOADING KERNEL MODULES [OK]",
        "MOUNTING VIRTUAL FILESYSTEM [OK]",
        "STARTING NEURAL NETWORK ENGINE...",
        "CONNECTING TO MULTIVERSE NODES...",
        "ESTABLISHING SECURE UPLINK [OK]",
        "DECODING THE FUTURE...",
        "ACCESS GRANTED."
    ];
    
    let currentLine = 0;
    const interval = setInterval(() => {
        if (currentLine < lines.length) {
            setBootLines(prev => [...prev, lines[currentLine]]);
            currentLine++;
        } else {
            clearInterval(interval);
            setTimeout(() => setIsBooting(false), 800);
        }
    }, 150);
    
    return () => clearInterval(interval);
  }, []);

  // Phase 1: Custom Cursor Effect
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isClickable = 
            window.getComputedStyle(target).cursor === 'pointer' || 
            target.tagName.toLowerCase() === 'a' || 
            target.tagName.toLowerCase() === 'button' ||
            target.closest('a') ||
            target.closest('button');
            
        setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
        window.removeEventListener('mousemove', updateCursor);
        window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    if (!isBooting) {
        // Initial entrance animation
        gsap.to(".slogan", { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 });
        gsap.to(".tags", { opacity: 1, duration: 1, delay: 0.4 });
        gsap.to(".hero-layout", { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.6 });
        gsap.to(".action-buttons-group", { opacity: 1, duration: 1, delay: 0.8 });
    }
  }, [isBooting]);

  // Phase 2: Canvas Dynamic Background
  useEffect(() => {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number, y: number, vx: number, vy: number, radius: number }[] = [];

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    };

    const initParticles = () => {
        particles = [];
        const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 15000); // Responsive density
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 1.5 + 0.5
            });
        }
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Brutalist tech colors: dark grey lines on light bg
        ctx.fillStyle = 'rgba(17, 17, 17, 0.4)';
        ctx.strokeStyle = 'rgba(17, 17, 17, 0.15)';
        ctx.lineWidth = 1;

        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
        animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationFrameId);
        if (container.contains(canvas)) container.removeChild(canvas);
    };
  }, []);

  const transitionToLevel2 = () => {
    const overlay = document.querySelector('.transition-overlay');
    const level1 = document.querySelector('.level1') as HTMLElement;
    const level2 = document.querySelector('.level2') as HTMLElement;
    const topBar = document.querySelector('.top-bar');

    // Phase 2: Enhanced Cinematic Transition
    // 1. Scale down and fade out Level 1 like a CRT TV turning off
    gsap.to(level1, { 
        scale: 0.9, 
        opacity: 0, 
        duration: 0.6, 
        ease: "power3.inOut" 
    });

    // 2. Slam down the transition overlay
    gsap.to(overlay, { 
        y: "0%", 
        duration: 0.5,
        delay: 0.3, // Wait for Level 1 to start shrinking
        ease: "power4.inOut",
        onComplete: () => {
            if (level1) level1.style.display = 'none';
            if (level2) {
              level2.style.pointerEvents = "auto";
              gsap.set(level2, { opacity: 1 });
            }
            
            // Top bar animation
            gsap.fromTo(topBar, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });

            animateCardsEntrance();
            
            // 3. Pull up the overlay to reveal Level 2
            gsap.to(overlay, { 
                y: "-100%", 
                duration: 0.6, 
                ease: "power4.inOut",
                onComplete: () => gsap.set(overlay, { y: "100%" })
            });
        }
    });
  };

  const animateCardsEntrance = () => {
    const cards = document.querySelectorAll('.brutal-card');
    gsap.fromTo(cards, 
        { y: 60, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out"
        }
    );
  };

  const backToLevel1 = () => {
    const scrollTopBtn = document.querySelector('.scroll-top-btn') as HTMLElement;
    if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
    
    const overlay = document.querySelector('.transition-overlay');
    const level1 = document.querySelector('.level1') as HTMLElement;
    const level2 = document.querySelector('.level2') as HTMLElement;
    
    // 1. Fade out Level 2
    gsap.to(level2, { opacity: 0, duration: 0.4, ease: "power2.in" });

    // 2. Slam down overlay
    gsap.to(overlay, { 
        y: "0%", 
        duration: 0.5,
        delay: 0.2,
        ease: "power4.inOut",
        onComplete: () => {
            if (level2) {
              level2.style.pointerEvents = "none";
              gsap.set(level2, { opacity: 0 });
            }
            
            if (level1) {
              level1.style.display = 'flex';
              gsap.set(level1, { scale: 0.9, opacity: 0 });
            }
            
            // 3. Pull up overlay and scale up Level 1
            gsap.to(overlay, { 
                y: "100%", 
                duration: 0.6, 
                ease: "power4.inOut"
            });

            gsap.to(level1, {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "back.out(1.2)",
                delay: 0.2
            });
        }
    });
  };

  const applyFilter = (filterValue: string) => {
    setCurrentFilter(filterValue);
    const cards = document.querySelectorAll('.brutal-card');
    
    let delay = 0;
    cards.forEach((card: any) => {
        const category = card.getAttribute('data-category');
        const shouldShow = category === filterValue;
        
        if (shouldShow) {
            gsap.to(card, { 
                scale: 1, opacity: 1, y: 0,
                duration: 0.4, delay: delay,
                ease: "power3.out",
                onStart: () => { card.style.display = card.classList.contains('timeline-container') ? 'block' : 'flex'; }
            });
            delay += 0.05;
        } else {
            gsap.to(card, { 
                scale: 0.9, opacity: 0, y: 20,
                duration: 0.3,
                onComplete: () => { card.style.display = 'none'; }
            });
        }
    });
  };

  const openLightbox = (e: React.MouseEvent, src: string) => {
      e.stopPropagation();
      setLightboxImg(src);
  };

  const closeLightbox = () => {
      setLightboxImg(null);
  };

  const openProjectModal = (project: Project) => {
      setActiveProject(project);
      setActiveImgIdx(0);
  };

  const closeProjectModal = () => {
      setActiveProject(null);
  };

  const handleScroll = () => {
    const btn = document.querySelector('.scroll-top-btn') as HTMLElement;
    if (!viewportRef.current || !btn) return;
    
    if (viewportRef.current.scrollTop > 300) {
        btn.classList.add('visible');
    } else {
        btn.classList.remove('visible');
    }
  };

  const scrollToTop = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Phase 1: Custom Cursor */}
      <div 
          className={`custom-cursor ${isHovering ? 'hovering' : ''}`} 
          style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      ></div>

      {/* Phase 1: Terminal Boot Screen */}
      {isBooting && (
          <div className="terminal-loader">
              {bootLines.map((line, i) => (
                  <div key={i} className="terminal-line">{line}</div>
              ))}
              <div className="terminal-line"><span className="terminal-cursor"></span></div>
          </div>
      )}

      <div className="noise-overlay"></div>
      <div className="brutal-bg-dots"></div>

      <div id="canvas-container"></div>

      <div className="transition-overlay">
          <span className="glitch-text" data-text="[ SYSTEM OVERRIDE ]">[ SYSTEM OVERRIDE ]</span>
      </div>

      <button className="scroll-top-btn brutal-btn bg-yellow" onClick={scrollToTop}>↑</button>

      {/* Level 1 */}
      <div className="ui-container level1" style={{ display: isBooting ? 'none' : 'flex' }}>
          <h1 className="slogan brutal-font">
              <span className="glitch-text" data-text="[ DECODING THE FUTURE ]">
                  [ DECODING <span className="bg-yellow text-black px-2">THE FUTURE</span> ]
              </span>
          </h1>
          <p className="tags bold-cn">AI算法 / 全栈开发 / 多智能体架构</p>

          <div className="hero-layout">
              <div className="micro-intro bold-cn brutal-box bg-white">
                  <p>🔥 测控技术与仪器专业，跨学科AI探索者</p>
                  <p>⚡ 熟练掌握 PyTorch, 大模型微调, LangGraph</p>
                  <p>💻 独立完成从算法到全栈的工程化落地</p>
              </div>
              <div className="hero-image-box brutal-box bg-blue brutal-img-container">
                  <img src="/images/Me_1.jpg" alt="刘云天" className="brutal-img" loading="lazy" referrerPolicy="no-referrer" />
              </div>
          </div>

          <div className="action-buttons-group">
              <button onClick={() => setIsResumeModalOpen(true)} className="brutal-btn bg-white inline-block text-center no-underline text-black">简历下载</button>
              <button className="brutal-btn bg-yellow" onClick={transitionToLevel2}>展开全景宇宙 ↗</button>
          </div>

          <div className="marquee-container brutal-box bg-black text-white">
              <div className="marquee-content brutal-font">
                  <span>SYSTEM ONLINE // AI ALGORITHM INTERN // FULL STACK DEVELOPER // MULTI-AGENT ARCHITECT // </span>
                  <span>SYSTEM ONLINE // AI ALGORITHM INTERN // FULL STACK DEVELOPER // MULTI-AGENT ARCHITECT // </span>
              </div>
          </div>
      </div>

      {/* Level 2 */}
      <div className="ui-container level2">
          {/* 顶部导航栏 */}
          <header className="top-bar">
              <div className="top-bar-left">
                  <div className="user-profile-mini">
                      <div className="avatar-wrapper">
                          <img src="/images/Me_1.jpg" alt="Avatar" className="avatar-mini" loading="lazy" referrerPolicy="no-referrer" />
                      </div>
                      <div className="user-info">
                          <span className="nickname brutal-font">碳碳四键</span>
                          <span className="status-text"><span className="status-dot"></span> ONLINE</span>
                      </div>
                  </div>
                  <div className="breadcrumb brutal-font hidden md:flex">
                      <span className="dim">SYS.ROOT</span> <span className="separator">/</span> 
                      <span>MULTIVERSE</span> <span className="separator">/</span> 
                      <span className="text-blue">[{filterNames[currentFilter]}]</span>
                  </div>
              </div>
              <div className="flex items-center gap-4">
                  <button 
                      className="w-10 h-10 flex items-center justify-center border-2 border-black dark:border-white shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#f4f4f0] bg-white dark:bg-black text-black dark:text-white hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#000] dark:hover:shadow-[4px_4px_0px_#f4f4f0] active:translate-y-1 active:shadow-none transition-all"
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      aria-label="Toggle Dark Mode"
                  >
                      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  <button className="top-back-btn brutal-font" onClick={backToLevel1}>
                      <span className="btn-icon">↤</span> RETURN
                  </button>
              </div>
          </header>

          <div className="level2-content">
              <aside className="side-nav brutal-box">
                  <div className="nav-header brutal-font">SYS.MENU</div>
                  <button className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`} onClick={() => applyFilter('all')}># 核心全景</button>
                  <button className={`filter-btn ${currentFilter === 'unique' ? 'active' : ''}`} onClick={() => applyFilter('unique')}># 独一无二</button>
                  <button className={`filter-btn ${currentFilter === 'tech' ? 'active' : ''}`} onClick={() => applyFilter('tech')}># 奇思妙想</button>
                  <button className={`filter-btn ${currentFilter === 'world' ? 'active' : ''}`} onClick={() => applyFilter('world')}># 大千世界</button>
                  <button className={`filter-btn ${currentFilter === 'soul' ? 'active' : ''}`} onClick={() => applyFilter('soul')}># 灵魂与温度</button>
                  <button className={`filter-btn ${currentFilter === 'timeline' ? 'active' : ''}`} onClick={() => applyFilter('timeline')}># 回首与向前</button>
              </aside>

              <main className="multiverse-viewport" ref={viewportRef} onScroll={handleScroll}>
                  <div className="bento-grid">
                      
                      {/* ==================== 核心全景 (all) ==================== */}
                      
                      {/* 独一无二 Summary */}
                      <div className="brutal-card bg-white overflow-hidden" data-category="all" onClick={() => applyFilter('unique')}>
                          <div className="card-watermark">👤</div>
                          <div className="card-header">
                              <div className="card-tag bg-black text-white">01 / 独一无二</div>
                              <div className="card-icon">👤</div>
                          </div>
                          <h3 className="brutal-font">个人档案</h3>
                          <p className="bold-cn">刘云天 / 2005 / ISFJ / 共青团员。<br/>北京化工大学测控技术与仪器专业 (2024-2028)。<br/>跨学科的 AI 探索者，具备将算法理论转化为实际应用的全栈能力。</p>
                          <div className="mt-4 text-sm font-bold underline cursor-pointer">探索更多个人信息 ↗</div>
                      </div>

                      {/* 奇思妙想 Summary */}
                      <div className="brutal-card span-2 bg-black text-white overflow-hidden" data-category="all" onClick={() => applyFilter('tech')}>
                          <div className="card-watermark">💻</div>
                          <div className="card-header">
                              <div className="card-tag bg-blue text-white">02 / 奇思妙想</div>
                              <div className="card-icon">💻</div>
                          </div>
                          <div className="img-stack dual-stack pointer-events-none">
                              <img src="/images/SolidState_Agent_1.jpg" alt="Tech 1" className="stack-img img-1 brutal-filter" loading="lazy" referrerPolicy="no-referrer" />
                              <img src="/images/AI_Medical_2.jpg" alt="Tech 2" className="stack-img img-2 brutal-filter" loading="lazy" referrerPolicy="no-referrer" />
                          </div>
                          <h3 className="brutal-font text-blue">算法与工程的熔炉</h3>
                          <p className="bold-cn">涵盖 PyTorch, 大模型微调, LangGraph 等 AI 算法，以及 React, Tailwind, Serverless 等全栈工程。<br/>从极小样本医学图像诊断到多智能体协同架构，再到全栈落地。</p>
                          <div className="mt-4 text-sm font-bold text-yellow underline cursor-pointer">查看技术栈与项目 ↗</div>
                      </div>

                      {/* 大千世界 Summary */}
                      <div className="brutal-card bg-yellow overflow-hidden" data-category="all" onClick={() => applyFilter('world')}>
                          <div className="card-watermark">🌍</div>
                          <div className="card-header">
                              <div className="card-tag bg-black text-white">03 / 大千世界</div>
                              <div className="card-icon">🌍</div>
                          </div>
                          <h3 className="brutal-font">实践与探索</h3>
                          <p className="bold-cn">用脚步丈量行业。<br/>包含厚海教育助教实习经历，以及参与米哈游等前沿科技公司校招宣讲会的实地调研与行业探索。</p>
                          <div className="mt-4 text-sm font-bold underline cursor-pointer">了解实践经历 ↗</div>
                      </div>

                      {/* 灵魂与温度 Summary */}
                      <div className="brutal-card span-2 bg-blue text-white overflow-hidden" data-category="all" onClick={() => applyFilter('soul')}>
                          <div className="card-watermark">❤️</div>
                          <div className="card-header">
                              <div className="card-tag bg-black text-white">04 / 灵魂与温度</div>
                              <div className="card-icon">❤️</div>
                          </div>
                          <h3 className="brutal-font">代码之外的温度</h3>
                          <p className="bold-cn">100+小时蓝信封通信大使志愿服务。<br/>持续精进英语与数学，自学日语。<br/>在技术之外，探索丰富的精神世界与多维爱好。</p>
                          <div className="mt-4 text-sm font-bold text-yellow underline cursor-pointer">感受人文与热爱 ↗</div>
                      </div>

                      {/* 回首与向前 Summary */}
                      <div className="brutal-card span-full bg-[#fef08a] overflow-hidden" data-category="all" onClick={() => applyFilter('timeline')} style={{ gridColumn: '1 / -1' }}>
                          <div className="card-watermark">⏳</div>
                          <div className="card-header">
                              <div className="card-tag bg-black text-white">05 / 回首与向前</div>
                              <div className="card-icon">⏳</div>
                          </div>
                          <h3 className="brutal-font">时间线与足迹</h3>
                          <p className="bold-cn">过去与未来的交汇点。<br/>记录大学以来的重要时刻，以及近期的前行足迹与展望。</p>
                          <div className="mt-4 text-sm font-bold underline cursor-pointer">查看完整时间线 ↗</div>
                      </div>

                      {/* ==================== 独一无二 (unique) ==================== */}
                      
                      <div className="brutal-card bg-white" data-category="unique" style={{display: 'none'}}>
                          <div className="card-header">
                              <div className="card-tag bg-black text-white">Profile</div>
                              <div className="card-icon">🆔</div>
                          </div>
                          <h3 className="brutal-font">基础档案</h3>
                          <ul className="bold-cn">
                              <li><strong>姓名:</strong> 刘云天</li>
                              <li><strong>出生年月:</strong> 2005年11月</li>
                              <li><strong>家乡:</strong> 四川绵阳</li>
                              <li><strong>状态:</strong> 本科在读</li>
                              <li><strong>政治面貌:</strong> 共青团员</li>
                          </ul>
                      </div>

                      <div className="brutal-card span-2 bg-yellow overflow-hidden" data-category="unique" style={{display: 'none'}}>
                          <div className="card-watermark">🎓</div>
                          <div className="card-header">
                              <div className="card-tag bg-black text-white">Education</div>
                              <div className="card-icon">🎓</div>
                          </div>
                          <h3 className="brutal-font">教育经历</h3>
                          <p className="bold-cn text-xl mb-2"><strong>北京化工大学</strong></p>
                          <p className="bold-cn">测控技术与仪器专业 (2024-2028)</p>
                          <p className="bold-cn mt-2">在跨学科的背景下，探索测量、控制与人工智能的深度融合。</p>
                      </div>

                      <div className="brutal-card span-2 bg-black text-white overflow-hidden" data-category="unique" style={{display: 'none'}}>
                          <div className="card-watermark">⚡</div>
                          <div className="card-header">
                              <div className="card-tag bg-blue text-white">Advantages</div>
                              <div className="card-icon">⚡</div>
                          </div>
                          <h3 className="brutal-font text-blue">核心优势</h3>
                          <ul className="bold-cn mt-4 space-y-4">
                              <li><strong>AI 算法实践力:</strong> 熟练掌握 PyTorch，具备从模型微调 (LoRA) 到复杂架构 (Transformer, ResNet) 的实战经验。</li>
                              <li><strong>全栈工程思维:</strong> 不局限于算法，能独立完成从后端 API (FastAPI) 到前端交互 (React/Tailwind) 的完整产品交付。</li>
                              <li><strong>多智能体架构:</strong> 深入理解并应用 LangGraph，能设计复杂的 Multi-Agent 协同工作流。</li>
                              <li><strong>快速学习与英文能力:</strong> CET-4 636分，CET-6 530分，无障碍阅读最新英文 Paper 与技术文档，保持对前沿技术的敏锐嗅觉。</li>
                              <li><strong>主观能动性强:</strong> 善于主动学习相关内容，对于工作/学习所需要的东西能很好安排自主学习，快速上手。同时对于新兴技术部保持开放接受状态，能快速跟上技术革新与发展。积极探索如Openclaw、Skills、MCP、Prompt Engineering等创新新项目~</li>
                          </ul>
                      </div>

                      <div className="brutal-card bg-blue text-white overflow-hidden" data-category="unique" style={{display: 'none'}}>
                          <div className="card-watermark">🧩</div>
                          <div className="card-header">
                              <div className="card-tag bg-black text-white">Personality</div>
                              <div className="card-icon">🧩</div>
                          </div>
                          <h3 className="brutal-font">MBTI: ISFJ</h3>
                          <p className="bold-cn">守卫者人格。喜欢有规划、有计划地完成任务。心思算是非常细腻吧！能够敏锐地感知到他人情绪。当然同样也就会比较敏感，会稍稍有点过度在意他人看法（）不过我在努力调整啦！善于主动学习，自主性强。社交方面上大学后有点小社恐，但是熟悉了就会很自然！很乐意和大家交朋友！也很喜欢探索自己感兴趣的内容，为梦想付诸努力~</p>
                      </div>

                      <div className="brutal-card span-3 bg-black text-white" data-category="unique" style={{display: 'none'}}>
                          <div className="card-header">
                              <div className="card-tag bg-yellow text-black">Contact</div>
                              <div className="card-icon">🔗</div>
                          </div>
                          <h3 className="brutal-font text-yellow">社交网络与联系方式</h3>
                          
                          {!isSocialUnlocked ? (
                              <div className="mt-6 p-6 border-4 border-white bg-black">
                                  <p className="bold-cn mb-4 text-lg">⚠️ 访问受限：请输入社交密钥以解锁联系方式。</p>
                                  <div className="flex flex-col sm:flex-row gap-4">
                                      <input 
                                          type="password" 
                                          value={socialPasswordInput} 
                                          onChange={(e) => setSocialPasswordInput(e.target.value)} 
                                          className="flex-1 bg-white text-black px-4 py-3 outline-none border-4 border-white focus:border-yellow font-bold text-lg" 
                                          placeholder="Enter Key..." 
                                      />
                                      <button onClick={handleSocialUnlock} className="brutal-btn bg-yellow text-black px-8 py-3 text-lg hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all">
                                          UNLOCK
                                      </button>
                                  </div>
                                  {socialError && <p className="text-red-500 mt-4 text-base font-bold bg-red-100/10 inline-block px-3 py-1 border-l-4 border-red-500">{socialError}</p>}
                              </div>
                          ) : (
                              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 bold-cn">
                                  <div className="border-4 border-white p-4 bg-white text-black">
                                      <h4 className="font-black text-lg mb-3 border-b-4 border-black pb-1 uppercase">核心联系</h4>
                                      <ul className="space-y-2 font-bold">
                                          <li className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-1"><span className="flex items-center gap-2"><MessageCircle size={18} /> QQ:</span> <span>1589099855</span></li>
                                          <li className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-1"><span className="flex items-center gap-2"><MessageCircle size={18} /> 微信:</span> <span>Ti2O3CX86</span></li>
                                          <li className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-1"><span className="flex items-center gap-2"><MessageSquare size={18} /> 飞书:</span> <span>18048610069</span></li>
                                          <li className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-1"><span className="flex items-center gap-2"><Mail size={18} /> 工作邮箱:</span> <span>liuyuntian@ytunx.com</span></li>
                                          <li className="flex justify-between items-center pb-1"><span className="flex items-center gap-2"><Mail size={18} /> 日常邮箱:</span> <span>tian_lktjb2024@163.com</span></li>
                                      </ul>
                                  </div>
                                  <div className="flex flex-col gap-6">
                                      <div className="border-4 border-white p-4">
                                          <h4 className="font-black text-lg mb-3 border-b-4 border-white pb-1 text-yellow uppercase">技术与主页</h4>
                                          <ul className="space-y-2 font-bold">
                                              <li className="flex justify-between items-center pb-1"><span className="flex items-center gap-2"><Github size={18} /> GitHub:</span> <a href="https://github.com/Yuntian-Liu" target="_blank" rel="noreferrer" className="underline hover:text-yellow">Yuntian-Liu</a></li>
                                          </ul>
                                      </div>
                                      <div className="border-4 border-white p-4">
                                          <h4 className="font-black text-lg mb-3 border-b-4 border-white pb-1 text-yellow uppercase">自媒体与生活</h4>
                                          <ul className="space-y-2 font-bold">
                                              <li className="flex justify-between items-center border-b-2 border-dashed border-gray-600 pb-1"><span className="flex items-center gap-2"><Tv size={18} /> BiliBili:</span> <span>碳碳四键_</span></li>
                                              <li className="flex justify-between items-center border-b-2 border-dashed border-gray-600 pb-1"><span className="flex items-center gap-2"><BookOpen size={18} /> 小红书:</span> <span>Ti2O3CX86</span></li>
                                              <li className="flex justify-between items-center pb-1"><span className="flex items-center gap-2"><Music size={18} /> 抖音:</span> <span>Ti2O3CX86</span></li>
                                          </ul>
                                      </div>
                                  </div>
                                  <div className="flex flex-col gap-6">
                                      <div className="border-4 border-white p-4">
                                          <h4 className="font-black text-lg mb-3 border-b-4 border-white pb-1 text-yellow uppercase">游戏与学习</h4>
                                          <ul className="space-y-2 font-bold">
                                              <li className="flex justify-between items-center border-b-2 border-dashed border-gray-600 pb-1"><span className="flex items-center gap-2"><Gamepad2 size={18} /> 原神:</span> <span>309845461</span></li>
                                              <li className="flex justify-between items-center border-b-2 border-dashed border-gray-600 pb-1"><span className="flex items-center gap-2"><PenTool size={18} /> 百词斩:</span> <span>1668941582</span></li>
                                              <li className="flex justify-between items-center pb-1"><span className="flex items-center gap-2"><Globe size={18} /> 多邻国:</span> <span>Ti2O3CX86</span></li>
                                          </ul>
                                      </div>
                                  </div>
                              </div>
                          )}
                      </div>

                      {/* ==================== 奇思妙想 (tech) ==================== */}
                      
                      <div className="brutal-card span-2 bg-white overflow-hidden flex flex-col" data-category="tech" style={{display: 'none'}}>
                          <div className="card-watermark">🛠️</div>
                          <div className="card-header">
                              <div className="card-tag bg-black text-white">Tech Stack</div>
                              <div className="card-icon">🛠️</div>
                          </div>
                          <h3 className="brutal-font">技能栈</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 relative z-10 flex-grow">
                              <div className="border-4 border-black p-4 bg-yellow transform transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_#111]">
                                  <h4 className="font-black text-lg mb-2 border-b-4 border-black pb-1">🤖 AI 算法</h4>
                                  <p className="bold-cn text-sm leading-relaxed">PyTorch, Transformer, LLM微调(LoRA), LangGraph, MCTS, RL, ResNet, CV</p>
                              </div>
                              <div className="border-4 border-black p-4 bg-blue text-white transform transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_#111]">
                                  <h4 className="font-black text-lg mb-2 border-b-4 border-white pb-1">💻 全栈工程</h4>
                                  <p className="bold-cn text-sm leading-relaxed">Python, JavaScript, TypeScript, React, Tailwind CSS, FastAPI</p>
                              </div>
                              <div className="border-4 border-black p-4 bg-white transform transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_#111]">
                                  <h4 className="font-black text-lg mb-2 border-b-4 border-black pb-1">📚 学科知识</h4>
                                  <p className="bold-cn text-sm leading-relaxed">化学, 英语, 概率论与数理统计, 数电, MATLAB</p>
                              </div>
                          </div>
                          {/* Decorative Footer to fill space */}
                          <div className="mt-auto pt-6 relative z-10">
                              <div className="border-t-4 border-black pt-3 flex justify-between items-center">
                                  <div className="font-mono text-sm font-bold flex items-center gap-2">
                                      <span className="inline-block w-3 h-3 bg-[#00FF00] rounded-full animate-pulse border-2 border-black"></span>
                                      SYSTEM_ONLINE // KNOWLEDGE_BASE_EXPANDING...
                                  </div>
                                  <div className="flex gap-1 hidden sm:flex">
                                      {[1,2,3,4,5].map(i => (
                                          <div key={i} className={`w-6 h-3 border-2 border-black ${i <= 3 ? 'bg-black' : 'bg-transparent'}`}></div>
                                      ))}
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="brutal-card bg-yellow overflow-hidden" data-category="tech" style={{display: 'none'}}>
                          <div className="card-watermark">☁️</div>
                          <div className="card-header">
                              <div className="card-tag bg-black text-white">Hardware & Cloud</div>
                              <div className="card-icon">☁️</div>
                          </div>
                          <h3 className="brutal-font">设备与云端</h3>
                          <div className="mt-4 space-y-4 relative z-10">
                              <div className="bg-white border-4 border-black p-3 shadow-[4px_4px_0px_#111]">
                                  <h4 className="font-black text-md mb-2 flex items-center gap-2"><span className="text-xl">💻</span> 硬件算力</h4>
                                  <ul className="bold-cn text-sm space-y-1">
                                      <li><strong>CPU:</strong> Intel Ultra 9</li>
                                      <li><strong>GPU:</strong> NVIDIA RTX 5070 Ti</li>
                                  </ul>
                              </div>
                              <div className="bg-black text-white border-4 border-black p-3 shadow-[4px_4px_0px_#fff]">
                                  <h4 className="font-black text-md mb-2 flex items-center gap-2"><span className="text-xl">☁️</span> 云端基建</h4>
                                  <ul className="bold-cn text-sm space-y-1 mb-3">
                                      <li><strong>服务器:</strong> Ubuntu 22.04 LTS</li>
                                      <li><strong>架构:</strong> Supabase, Netlify, Serverless</li>
                                  </ul>
                                  <div className="border-t-2 border-dashed border-gray-600 pt-3 mt-2">
                                      <strong className="text-sm block mb-2 text-yellow">🌐 个人域名矩阵:</strong>
                                      <div className="flex flex-wrap gap-2">
                                          {['ytunx.com', 'ytunx.cn', 'ytun.com.cn', 'ytun.team', 'ytun.ltd'].map(domain => (
                                              <span key={domain} className="border-2 border-white px-1.5 py-0.5 text-xs font-bold bg-black text-white">{domain}</span>
                                          ))}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      {techProjects.map((project) => (
                          <div 
                              key={project.id} 
                              className={`brutal-card overflow-hidden ${project.layoutClass}`} 
                              data-category="tech" 
                              style={{display: 'none'}}
                              onClick={() => openProjectModal(project)}
                          >
                              <div className="card-header">
                                  <div className={`card-tag ${project.tagClass}`}>{project.category}</div>
                                  <div className="card-icon">{project.icon}</div>
                              </div>
                              
                              <div className={`img-stack ${project.images.length === 2 ? 'dual-stack' : ''} pointer-events-none`}>
                                  {(project.coverImages || project.images).slice(0, 3).map((img, idx) => (
                                      <img key={idx} src={img} alt={`${project.title} ${idx + 1}`} className={`stack-img img-${idx + 1} brutal-filter`} />
                                  ))}
                              </div>
                              
                              <h3 className="brutal-font">{project.title}</h3>
                              
                              <div className="badge-container">
                                  {project.isFlagship && <span className="badge-flagship">🌟 旗舰项目</span>}
                                  <span className="badge-role">👨‍💻 {project.role}</span>
                              </div>
                              
                              <p className="bold-cn">{project.shortDesc}</p>
                              
                              <div className="card-footer">
                                  <div className="text-sm font-bold underline">点击查看详情 ↗</div>
                                  <div className="card-links">
                                      {project.githubUrl && (
                                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="icon-link" title="GitHub">
                                              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                          </a>
                                      )}
                                      {project.liveUrls && project.liveUrls.length > 0 && (
                                          <a href={project.liveUrls[0].url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="icon-link" title="Live Site">
                                              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                          </a>
                                      )}
                                  </div>
                              </div>
                          </div>
                      ))}

                      {/* ==================== 大千世界 (world) ==================== */}
                      
                      {worldProjects.map((project) => (
                          <div 
                              key={project.id} 
                              className={`brutal-card overflow-hidden ${project.layoutClass}`} 
                              data-category="world" 
                              style={{display: 'none'}}
                              onClick={() => openProjectModal(project)}
                          >
                              <div className="card-header">
                                  <div className={`card-tag ${project.tagClass}`}>{project.category}</div>
                                  <div className="card-icon">{project.icon}</div>
                              </div>
                              
                              <div className={`img-stack ${project.images.length === 2 ? 'dual-stack' : ''} pointer-events-none`}>
                                  {(project.coverImages || project.images).slice(0, 3).map((img, idx) => (
                                      <img key={idx} src={img} alt={`${project.title} ${idx + 1}`} className={`stack-img img-${idx + 1} brutal-filter`} />
                                  ))}
                              </div>
                              
                              <h3 className="brutal-font">{project.title}</h3>
                              
                              <div className="badge-container">
                                  {project.isFlagship && <span className="badge-flagship">🌟 旗舰项目</span>}
                                  <span className="badge-role">👨‍💻 {project.role}</span>
                              </div>
                              
                              <p className="bold-cn">{project.shortDesc}</p>
                              
                              <div className="card-footer">
                                  <div className="text-sm font-bold underline">点击查看详情 ↗</div>
                                  <div className="card-links">
                                      {project.githubUrl && (
                                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="icon-link" title="GitHub">
                                              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                          </a>
                                      )}
                                      {project.liveUrls && project.liveUrls.length > 0 && (
                                          <a href={project.liveUrls[0].url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="icon-link" title="Live Site">
                                              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                          </a>
                                      )}
                                  </div>
                              </div>
                          </div>
                      ))}

                      <div className="brutal-card bg-black text-white overflow-hidden flex flex-col" data-category="world" style={{display: 'none'}}>
                          <div className="card-watermark">🚀</div>
                          <div className="card-header">
                              <div className="card-tag bg-blue text-white">Exploration</div>
                              <div className="card-icon">🚀</div>
                          </div>
                          <h3 className="brutal-font text-blue">行业探索</h3>
                          <p className="bold-cn mb-4">积极参与校招投递与前沿企业交流。曾参加米哈游等头部科技公司的宣讲会，实地调研行业需求，保持对技术落地与商业化的敏锐度。</p>
                          <div className="mt-auto pt-4 border-t-4 border-white dark:border-white">
                              <img 
                                  src="/images/Me_1.jpg" 
                                  alt="行业探索" 
                                  className="w-full h-48 object-cover border-4 border-white cursor-pointer hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
                                  loading="lazy" 
                                  referrerPolicy="no-referrer"
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      setLightboxImg('/images/Me_1.jpg');
                                  }}
                              />
                          </div>
                      </div>

                      {/* ==================== 灵魂与温度 (soul) ==================== */}
                      
                      <div className="brutal-card span-3 bg-blue text-white overflow-hidden" data-category="soul" style={{display: 'none'}}>
                          <div className="card-watermark">💌</div>
                          <div className="flex flex-col md:flex-row gap-8 relative z-10 w-full">
                              {/* Left side */}
                              <div className="md:w-1/3 flex flex-col justify-center">
                                  <div className="card-header">
                                      <div className="card-tag bg-black text-white">Humanities Coordinate</div>
                                      <div className="card-icon">💌</div>
                                  </div>
                                  <h3 className="brutal-font">人文坐标</h3>
                                  <p className="bold-cn mt-2">担任蓝信封通信大使，累计志愿服务时长 100+ 小时。用书信陪伴乡村儿童成长，在冰冷的代码世界之外，传递人性的温暖与关怀。</p>
                              </div>
                              {/* Right side */}
                              <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {/* Item 1 */}
                                  <div className="flex items-center gap-4 bg-black p-4 border-4 border-white transform transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_white]">
                                      <img 
                                          src="/images/MAIL.png" 
                                          alt="蓝信封" 
                                          className="w-16 h-16 object-cover border-2 border-white cursor-pointer hover:opacity-80 transition-opacity" 
                                          onClick={(e) => { e.stopPropagation(); setLightboxImg('/images/MAIL.png'); }}
                                      />
                                      <div>
                                          <h4 className="font-bold text-lg flex items-center gap-2 brutal-font tracking-wide">
                                              蓝信封 
                                              <a href="https://mp.weixin.qq.com/s/Dgeaefqq7v0N1eaQP9kehA" target="_blank" rel="noopener noreferrer" className="text-yellow hover:text-white" onClick={(e) => e.stopPropagation()}>
                                                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                              </a>
                                          </h4>
                                          <p className="text-sm opacity-80 font-bold mt-1">2025.10—至今</p>
                                      </div>
                                  </div>
                                  {/* Item 2 */}
                                  <div className="flex items-center gap-4 bg-black p-4 border-4 border-white transform transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_white]">
                                      <img 
                                          src="/images/Volunteer_1.jpg" 
                                          alt="迎新志愿者" 
                                          className="w-16 h-16 object-cover border-2 border-white cursor-pointer hover:opacity-80 transition-opacity" 
                                          onClick={(e) => { e.stopPropagation(); setLightboxImg('/images/Volunteer_1.jpg'); }}
                                      />
                                      <div>
                                          <h4 className="font-bold text-lg brutal-font tracking-wide">2025级开学迎新志愿者</h4>
                                          <p className="text-sm opacity-80 font-bold mt-1">2025.09.07</p>
                                      </div>
                                  </div>
                                  {/* Item 3 */}
                                  <div className="flex items-center gap-4 bg-black p-4 border-4 border-white transform transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_white]">
                                      <img 
                                          src="/images/OFO.png" 
                                          alt="单车猎人行动" 
                                          className="w-16 h-16 object-cover border-2 border-white cursor-pointer hover:opacity-80 transition-opacity" 
                                          onClick={(e) => { e.stopPropagation(); setLightboxImg('/images/OFO.png'); }}
                                      />
                                      <div>
                                          <h4 className="font-bold text-lg flex items-center gap-2 brutal-font tracking-wide">
                                              单车猎人行动
                                              <a href="https://mp.weixin.qq.com/s/cMWpKK1iwAYdYyT1nqr3sA" target="_blank" rel="noopener noreferrer" className="text-yellow hover:text-white" onClick={(e) => e.stopPropagation()}>
                                                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                              </a>
                                          </h4>
                                          <p className="text-sm opacity-80 font-bold mt-1">2017.01—2018.06</p>
                                      </div>
                                  </div>
                                  {/* Item 4 */}
                                  <div className="flex items-center gap-4 bg-black p-4 border-4 border-white transform transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_white]">
                                      <img 
                                          src="/images/TAI.png" 
                                          alt="诗琳通公主访华" 
                                          className="w-16 h-16 object-cover border-2 border-white cursor-pointer hover:opacity-80 transition-opacity" 
                                          onClick={(e) => { e.stopPropagation(); setLightboxImg('/images/TAI.png'); }}
                                      />
                                      <div>
                                          <h4 className="font-bold text-lg flex items-center gap-2 brutal-font tracking-wide">
                                              诗琳通公主访华
                                              <a href="https://mp.weixin.qq.com/s/oIh-6JUrhOcxSTF1YznmYw" target="_blank" rel="noopener noreferrer" className="text-yellow hover:text-white" onClick={(e) => e.stopPropagation()}>
                                                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                              </a>
                                          </h4>
                                          <p className="text-sm opacity-80 font-bold mt-1">2018.04.07</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="brutal-card bg-white overflow-hidden" data-category="soul" style={{display: 'none'}}>
                          <div className="card-watermark">📚</div>
                          <div className="card-header">
                              <div className="card-tag bg-black text-white">Lifelong Learning</div>
                              <div className="card-icon">📚</div>
                          </div>
                          <h3 className="brutal-font">终身学习</h3>
                          <p className="bold-cn">保持对未知的好奇心。持续精进英语能力（CET-6），深入探索概率论等数学基础，并自学日语，拓宽文化与技术的视野边界。</p>
                      </div>

                      <div 
                          className="brutal-card span-2 bg-yellow overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform" 
                          data-category="soul" 
                          style={{display: 'none'}}
                          onClick={() => setIsHobbiesModalOpen(true)}
                      >
                          <div className="card-watermark">🎨</div>
                          <div className="card-header">
                              <div className="card-tag bg-black text-white">Multi-dimensional Hobbies</div>
                              <div className="card-icon">🎨</div>
                          </div>
                          <h3 className="brutal-font">多维爱好</h3>
                          <p className="bold-cn">在技术之外，拥有丰富的精神世界。探索不同的生活方式，保持对生活的热爱与创造力。</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                              <span className="border-2 border-black px-2 py-1 bg-white text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">📺 ACG及衍生IP</span>
                              <span className="border-2 border-black px-2 py-1 bg-[#bbf7d0] text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">🎮 游戏IP</span>
                              <span className="border-2 border-black px-2 py-1 bg-[#fecaca] text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">🎬 影视IP</span>
                              <span className="border-2 border-black px-2 py-1 bg-[#bfdbfe] text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">🏃 运动</span>
                              <span className="border-2 border-black px-2 py-1 bg-white text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">🛠️ 综合技能</span>
                          </div>
                          <div className="mt-4 text-sm font-bold text-black underline">点击查看详情 ↗</div>
                      </div>

                      {/* ==================== 回首与向前 (timeline) ==================== */}
                      
                      <div className="brutal-card bg-white timeline-container p-4 md:p-8" data-category="timeline" style={{display: 'none', gridColumn: '1 / -1', flexDirection: 'column'}}>
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b-4 md:border-b-8 border-black pb-6 gap-4 w-full">
                              <div>
                                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter brutal-font">回首与向前</h2>
                                  <p className="text-lg font-bold mt-4 bg-black text-white inline-block px-3 py-1">
                                  {activeTimelineTab === 'past' ? '大事件：大学以来的重要节点' : '近期时间线：最近与未来的足迹'}
                                  </p>
                              </div>
                              
                              <div className="flex border-4 border-black font-bold text-base md:text-lg bg-white">
                                  <button 
                                  className={`px-4 py-2 md:px-6 md:py-3 transition-colors ${activeTimelineTab === 'past' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                                  onClick={() => setActiveTimelineTab('past')}
                                  >
                                  ⏪ 回首 (Past)
                                  </button>
                                  <div className="w-1 bg-black"></div>
                                  <button 
                                  className={`px-4 py-2 md:px-6 md:py-3 transition-colors ${activeTimelineTab === 'future' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
                                  onClick={() => setActiveTimelineTab('future')}
                                  >
                                  向前 (Future) ⏩
                                  </button>
                              </div>
                          </div>

                          <div className="relative w-full max-w-4xl mx-auto py-10">
                              {/* The Line */}
                              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1.5 bg-black md:-translate-x-1/2"></div>
                              
                              {[...(activeTimelineTab === 'past' ? pastTimeline : futureTimeline)].reverse().map((item, index) => {
                              const isEven = index % 2 === 0;
                              return (
                                  <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center w-full mb-12 md:mb-20 group ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                  
                                  {/* Center Node */}
                                  <div className="absolute left-4 md:left-1/2 w-6 h-6 bg-white border-4 border-black transform -translate-x-1/2 rotate-45 z-10 mt-1 md:mt-0 group-hover:bg-black transition-colors duration-300"></div>
                                  
                                  {/* Content Box */}
                                  <div className={`w-full pl-12 md:pl-0 md:w-1/2 flex flex-col ${isEven ? 'md:items-end md:pr-12' : 'md:items-start md:pl-12'}`}>
                                      <div className="text-2xl md:text-4xl font-black mb-4 inline-block bg-black text-white px-3 py-1 transform -skew-x-6 brutal-font">{item.date}</div>
                                      <div className={`flex flex-col gap-4 w-full max-w-md ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                                      {item.events.map((ev, i) => {
                                          let bgColor = 'bg-white';
                                          let label = '';
                                          if (ev.type === 'success') { bgColor = 'bg-[#bbf7d0]'; label = '🎯 达成 / Success'; }
                                          else if (ev.type === 'failure') { bgColor = 'bg-[#fecaca]'; label = '💥 挫折 / Setback'; }
                                          else if (ev.type === 'milestone') { bgColor = 'bg-[#fef08a]'; label = '🚀 启程 / Milestone'; }
                                          else if (ev.type === 'neutral') { bgColor = 'bg-gray-100'; label = '📌 记录 / Record'; }

                                          return (
                                          <div key={i} className={`border-4 border-black p-4 w-full text-left ${bgColor} hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all`}>
                                              <div className="text-xs font-black mb-1 opacity-70 uppercase tracking-widest">{label}</div>
                                              <div className="font-bold text-base md:text-lg leading-snug">{ev.text}</div>
                                          </div>
                                          );
                                      })}
                                      </div>
                                  </div>
                                  
                                  </div>
                              );
                              })}
                          </div>
                      </div>

                  </div>

                  {/* Footer */}
                  <footer className="mt-16 border-t-8 border-black pt-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
                          <h2 className="text-xl md:text-2xl font-black brutal-font uppercase tracking-tight">碳碳四键的个人开发实践项目-3</h2>
                          <div className="font-bold text-sm md:text-base opacity-80 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
                              <span>Copyright ©LYT 2024-2026</span>
                              <span className="hidden sm:inline">|</span>
                              <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600 transition-colors">蜀ICP备2026006689-3号</a>
                          </div>
                      </div>
                      
                      <a 
                          href="https://github.com/Yuntian-Liu/Selfie" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 bg-black text-white px-6 py-4 border-4 border-black hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black transition-all group"
                      >
                          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="group-hover:fill-black transition-colors">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                          <span className="font-black text-lg uppercase tracking-wider brutal-font">Open Source</span>
                      </a>
                  </footer>
              </main>
          </div>
      </div>

      {/* Lightbox Overlay */}
      <div className={`lightbox-overlay ${lightboxImg ? 'active' : ''}`} onClick={closeLightbox}>
          <div className="lightbox-close" onClick={closeLightbox}>✕</div>
          {lightboxImg && <img src={lightboxImg} alt="Enlarged view" className="lightbox-img" loading="lazy" referrerPolicy="no-referrer" />}
      </div>

      {/* Project Detail Modal */}
      <div className={`project-modal-overlay ${activeProject ? 'active' : ''}`} onClick={closeProjectModal}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-close-btn" onClick={closeProjectModal}>✕</div>
              
              {activeProject && (
                  <>
                      {/* Left Side: Image Gallery */}
                      <div className="modal-left">
                          <div className="modal-main-img-container">
                              <img 
                                  key={activeImgIdx} // Force re-render for animation
                                  src={activeProject.images[activeImgIdx]} 
                                  alt={`${activeProject.title} main`} 
                                  className="modal-main-img" 
                              />
                          </div>
                          <div className="modal-thumbnails">
                              {activeProject.images.map((img, idx) => (
                                  <img 
                                      key={idx} 
                                      src={img} 
                                      alt={`Thumbnail ${idx}`} 
                                      className={`modal-thumb ${idx === activeImgIdx ? 'active' : ''}`}
                                      onClick={() => setActiveImgIdx(idx)}
                                  />
                              ))}
                          </div>
                      </div>

                      {/* Right Side: Details */}
                      <div className="modal-right">
                          <h2 className="brutal-font">{activeProject.title}</h2>
                          
                          <div className="badge-container">
                              {activeProject.isFlagship && <span className="badge-flagship">🌟 旗舰项目</span>}
                              <span className="badge-role">👨‍💻 {activeProject.role}</span>
                              <span className="badge-role" style={{background: '#111', color: '#fff'}}>🏷️ {activeProject.category}</span>
                          </div>

                          <div className="modal-links">
                              <div className="modal-links-row">
                                  {activeProject.liveUrls && activeProject.liveUrls.map((link, idx) => (
                                      <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="modal-link-btn">
                                          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                          {link.label}
                                      </a>
                                  ))}
                              </div>
                              {activeProject.githubUrl && (
                                  <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer" className="modal-link-btn github-btn">
                                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                      GitHub 开源
                                  </a>
                              )}
                          </div>

                          <h4 className="brutal-font">项目详情</h4>
                          <ul className="bold-cn">
                              {activeProject.details.map((detail, idx) => (
                                  <li key={idx}>{detail}</li>
                              ))}
                          </ul>
                      </div>
                  </>
              )}
          </div>
      </div>

      {/* Hobbies Modal */}
      {isHobbiesModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto" onClick={() => setIsHobbiesModalOpen(false)}>
              <div className="bg-white border-4 md:border-8 border-black w-full max-w-4xl relative shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] md:shadow-[16px_16px_0px_0px_rgba(255,255,255,0.2)] my-4 md:my-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <button className="absolute top-4 right-4 w-10 h-10 bg-black text-white font-black text-xl hover:bg-red-500 transition-colors z-10" onClick={() => setIsHobbiesModalOpen(false)}>✕</button>
                  
                  <div className="p-4 md:p-8 border-b-4 md:border-b-8 border-black bg-yellow sticky top-0 z-10">
                      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter brutal-font">多维爱好</h2>
                      <p className="font-bold text-lg mt-2">在技术之外，探索丰富的精神世界与生活方式。</p>
                  </div>

                  <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                      {/* ACG及衍生IP */}
                      <div className="border-4 border-black p-6 bg-white hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                          <h3 className="text-xl font-black mb-4 border-b-4 border-black pb-2 inline-block bg-black text-white px-2">📺 ACG及衍生IP</h3>
                          <div className="flex flex-wrap gap-2 font-bold">
                              {['Chiikawa', 'bilibili', '小林家的龙女仆', '测不准的阿波连同学', '请问您今天要来点兔子吗？', '间谍过家家', '孤独摇滚', '某科学的超电磁炮', '魔法禁书目录', '名侦探柯南', '哆啦A梦', '蜡笔小新'].map(item => (
                                  <span key={item} className="border-2 border-black px-2 py-1 bg-gray-100">{item}</span>
                              ))}
                          </div>
                      </div>

                      {/* 游戏IP */}
                      <div className="border-4 border-black p-6 bg-white hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                          <h3 className="text-xl font-black mb-4 border-b-4 border-black pb-2 inline-block bg-black text-white px-2">🎮 游戏IP</h3>
                          <div className="flex flex-wrap gap-2 font-bold">
                              {['原神·空月之歌', '星布谷地', '蓝色星原', '无限大', '初音未来·缤纷舞台'].map(item => (
                                  <span key={item} className="border-2 border-black px-2 py-1 bg-[#bbf7d0]">{item}</span>
                              ))}
                          </div>
                      </div>

                      {/* 影视IP */}
                      <div className="border-4 border-black p-6 bg-white hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                          <h3 className="text-xl font-black mb-4 border-b-4 border-black pb-2 inline-block bg-black text-white px-2">🎬 影视IP</h3>
                          <div className="flex flex-wrap gap-2 font-bold">
                              {['《碟中谍》', '《神偷奶爸》', '《侏罗纪世界》', '《疯狂动物城》', '《头脑特工队》', '《唐人街探案》'].map(item => (
                                  <span key={item} className="border-2 border-black px-2 py-1 bg-[#fecaca]">{item}</span>
                              ))}
                          </div>
                      </div>

                      {/* 运动 */}
                      <div className="border-4 border-black p-6 bg-white hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                          <h3 className="text-xl font-black mb-4 border-b-4 border-black pb-2 inline-block bg-black text-white px-2">🏃 运动</h3>
                          <div className="flex flex-wrap gap-2 font-bold">
                              {['匹克球', '乒乓球', '跳绳', '跑步'].map(item => (
                                  <span key={item} className="border-2 border-black px-2 py-1 bg-[#bfdbfe]">{item}</span>
                              ))}
                          </div>
                      </div>

                      {/* 综合技能 */}
                      <div className="border-4 border-black p-6 bg-white hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all md:col-span-2">
                          <h3 className="text-xl font-black mb-4 border-b-4 border-black pb-2 inline-block bg-black text-white px-2">🛠️ 综合技能</h3>
                          <div className="flex flex-wrap gap-2 font-bold">
                              {['AI大模型', 'Coding', 'Agent', '英语学习', '日语学习', '教育'].map(item => (
                                  <span key={item} className="border-2 border-black px-2 py-1 bg-yellow">{item}</span>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Resume Download Modal */}
      {isResumeModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setIsResumeModalOpen(false)}>
              <div className="bg-white border-4 md:border-8 border-black w-full max-w-4xl relative shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] md:shadow-[16px_16px_0px_0px_rgba(255,255,255,0.2)] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <button className="absolute top-4 right-4 w-10 h-10 bg-black text-white font-black text-xl hover:bg-red-500 transition-colors" onClick={() => setIsResumeModalOpen(false)}>✕</button>
                  
                  <div className="p-4 md:p-8 border-b-4 md:border-b-8 border-black bg-yellow">
                      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter brutal-font">SECURITY CHECK</h2>
                      <p className="font-bold text-lg mt-2">为了保护隐私安全，请完成身份验证以获取简历。</p>
                  </div>

                  <div className="p-4 md:p-8">
                      {isResumeReady ? (
                          <div className="flex flex-col md:flex-row gap-8 py-4 items-stretch">
                              {/* Left: Preview */}
                              <div className="flex-1 flex flex-col gap-4">
                                  <div className="bg-black text-white px-3 py-1 inline-block font-bold self-start">📄 简历预览 (PREVIEW)</div>
                                  <div className="w-full h-[500px] border-4 border-black bg-gray-100 overflow-hidden">
                                      <iframe src="/resume.pdf" className="w-full h-full" title="Resume Preview" />
                                  </div>
                              </div>
                              
                              {/* Right: Status & Download */}
                              <div className="md:w-1/3 flex flex-col gap-4">
                                  <div className="bg-black text-white px-3 py-1 inline-block font-bold self-start">📥 下载选项 (DOWNLOAD)</div>
                                  <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 border-4 border-dashed border-black p-6 bg-green-50 min-h-[500px]">
                                      <div className="text-6xl animate-bounce">✅</div>
                                      <h3 className="text-2xl font-black brutal-font">验证成功</h3>
                                      <p className="font-bold text-base">您的身份已确认，请点击下方按钮下载完整 PDF 文件。</p>
                                      <a 
                                          href="resume.pdf" 
                                          download="刘云天_简历.pdf" 
                                          className="brutal-btn bg-green-400 text-black px-6 py-4 text-lg hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all w-full"
                                          onClick={() => {
                                              setTimeout(() => {
                                                  setIsResumeModalOpen(false);
                                                  setIsResumeReady(false);
                                                  setSelectedCompanies([]);
                                                  setFaPasswordInput('');
                                              }, 1000);
                                          }}
                                      >
                                          ⬇️ 立即下载
                                      </a>
                                      <div className="text-xs font-bold opacity-60 mt-auto">
                                          * 预览仅供快速查看<br/>建议下载后阅读
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ) : resumeAuthMode === 'quiz' ? (
                          <div className="flex flex-col gap-6">
                              <div className="bg-black text-white p-4 font-bold text-lg">
                                  ❓ 验证问题：我投递过哪些公司的实习？（多选，需全部选对）
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                  {QUIZ_OPTIONS.map((company) => (
                                      <button 
                                          key={company}
                                          onClick={() => toggleCompanySelection(company)}
                                          className={`border-4 border-black p-3 font-bold transition-all ${selectedCompanies.includes(company) ? 'bg-black text-white translate-y-1 shadow-none' : 'bg-white text-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
                                      >
                                          {company}
                                      </button>
                                  ))}
                              </div>
                              <button onClick={handleResumeQuizSubmit} className="brutal-btn bg-yellow text-black w-full py-4 text-xl mt-4 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                                  验证并下载
                              </button>
                          </div>
                      ) : (
                          <div className="flex flex-col gap-6">
                              <div className="bg-black text-white p-4 font-bold text-lg">
                                  🔑 快速通行卡 (FA) 验证
                              </div>
                              <input 
                                  type="password" 
                                  value={faPasswordInput} 
                                  onChange={(e) => setFaPasswordInput(e.target.value)} 
                                  className="w-full bg-gray-100 text-black px-6 py-4 outline-none border-4 border-black focus:border-yellow font-bold text-xl" 
                                  placeholder="Enter FA Key..." 
                              />
                              <button onClick={handleResumeFASubmit} className="brutal-btn bg-yellow text-black w-full py-4 text-xl mt-4 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                                  验证并下载
                              </button>
                          </div>
                      )}

                      {resumeError && <div className="mt-6 p-4 bg-red-100 border-l-8 border-red-500 font-bold text-red-700">{resumeError}</div>}

                      <div className="mt-8 pt-6 border-t-4 border-dashed border-gray-300 flex justify-between items-center">
                          {resumeAuthMode === 'quiz' ? (
                              <div className="flex items-center gap-2">
                                  <button onClick={() => setResumeAuthMode('fa')} className="font-bold underline hover:text-blue-600 transition-colors">
                                      使用快速通行卡 (FA)
                                  </button>
                                  <div className="relative group cursor-help">
                                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black text-white font-bold text-sm">?</span>
                                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-black text-white text-sm font-bold opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 text-center">
                                          请向身边的朋友或者我索要快速通行卡密钥
                                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                                      </div>
                                  </div>
                              </div>
                          ) : (
                              <button onClick={() => setResumeAuthMode('quiz')} className="font-bold underline hover:text-blue-600 transition-colors">
                                  返回趣味问答
                              </button>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      )}
    </>
  );
}
