import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

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
    shortDesc: '原生JS+Tailwind构建高性能SPA。依托Supabase实现Serverless架构与行级安全（RLS），集成DeepSeek大模型提供智能学习反馈，支持Canvas高保真成绩单导出。',
    details: [
      '独立设计并开发高性能单页应用 (SPA)，采用原生 JS 与 Tailwind CSS，追求极致的加载速度与流畅体验。',
      '基于 Supabase 构建 Serverless 后端架构，利用行级安全 (RLS) 策略保障用户数据隐私与权限隔离。',
      '深度集成 DeepSeek 大模型 API，根据学生成绩分布与历史数据，自动生成个性化学习反馈与提分建议。',
      '实现基于 Canvas 的高保真成绩单渲染与一键导出功能，满足用户分享与存档需求。'
    ],
    githubUrl: 'https://github.com/Yuntian-Liu/MyScore',
    liveUrls: [
      { label: '国内站 (V7.0)', url: 'https://ytun.com.cn' },
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
    images: ['/images/Work_1.jpg', '/images/Work_2.jpg', '/images/Work_3.jpg', '/images/Work_4.jpg'],
    shortDesc: '入职时间：2025.09。负责英语作业批改与辅导。在实践中发现痛点，并独立开发 Gradify 自动化批改系统，服务百余名学员，有效释放教学人力，实现技术赋能教育。',
    details: [
      '入职时间：2025.09',
      '负责英语作业批改与辅导，跟进学生学习进度。',
      '在实践中发现痛点，并独立开发 Gradify 自动化批改系统，服务百余名学员。',
      '有效释放教学人力，实现技术赋能教育。'
    ]
  }
];

export default function App() {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  const filterNames: Record<string, string> = {
      all: '核心全景',
      unique: '独一无二',
      tech: '奇思妙想',
      world: '大千世界',
      soul: '灵魂与温度'
  };

  useEffect(() => {
    // Initial entrance animation
    gsap.to(".slogan", { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 });
    gsap.to(".tags", { opacity: 1, duration: 1, delay: 0.4 });
    gsap.to(".hero-layout", { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.6 });
    gsap.to(".action-buttons-group", { opacity: 1, duration: 1, delay: 0.8 });
  }, []);

  const transitionToLevel2 = () => {
    const overlay = document.querySelector('.transition-overlay');
    const level1 = document.querySelector('.level1') as HTMLElement;
    const level2 = document.querySelector('.level2') as HTMLElement;
    const topBar = document.querySelector('.top-bar');

    gsap.to(overlay, { 
        y: "0%", 
        duration: 0.5,
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
            
            gsap.to(overlay, { 
                y: "-100%", 
                duration: 0.5, 
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
    
    gsap.to(overlay, { 
        y: "0%", 
        duration: 0.5,
        ease: "power4.inOut",
        onComplete: () => {
            if (level2) {
              level2.style.pointerEvents = "none";
              gsap.set(level2, { opacity: 0 });
            }
            
            if (level1) {
              level1.style.display = 'flex';
            }
            
            gsap.to(overlay, { 
                y: "100%", 
                duration: 0.5, 
                ease: "power4.inOut"
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
                onStart: () => { card.style.display = 'flex'; }
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
      <div className="noise-overlay"></div>
      <div className="brutal-bg-dots"></div>

      <div id="canvas-container"></div>

      <div className="transition-overlay"></div>

      <button className="scroll-top-btn brutal-btn bg-yellow" onClick={scrollToTop}>↑</button>

      {/* Level 1 */}
      <div className="ui-container level1">
          <h1 className="slogan brutal-font">
              [ DECODING <span className="bg-yellow text-black px-2">THE FUTURE</span> ]
          </h1>
          <p className="tags bold-cn">AI算法 / 全栈开发 / 多智能体架构</p>

          <div className="hero-layout">
              <div className="micro-intro bold-cn brutal-box bg-white">
                  <p>🔥 测控技术与仪器专业，跨学科AI探索者</p>
                  <p>⚡ 熟练掌握 PyTorch, 大模型微调, LangGraph</p>
                  <p>💻 独立完成从算法到全栈的工程化落地</p>
              </div>
              <div className="hero-image-box brutal-box bg-blue brutal-img-container">
                  <img src="/images/Me_1.jpg" alt="刘云天" className="brutal-img" referrerPolicy="no-referrer" />
              </div>
          </div>

          <div className="action-buttons-group">
              <a href="/resume.pdf" download="刘云天_简历.pdf" className="brutal-btn bg-white inline-block text-center no-underline text-black">简历下载</a>
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
                          <img src="/images/Me_1.jpg" alt="Avatar" className="avatar-mini" />
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
              <button className="top-back-btn brutal-font" onClick={backToLevel1}>
                  <span className="btn-icon">↤</span> RETURN
              </button>
          </header>

          <div className="level2-content">
              <aside className="side-nav brutal-box bg-white">
                  <div className="nav-header brutal-font">SYS.MENU</div>
                  <button className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`} onClick={() => applyFilter('all')}># 核心全景</button>
                  <button className={`filter-btn ${currentFilter === 'unique' ? 'active' : ''}`} onClick={() => applyFilter('unique')}># 独一无二</button>
                  <button className={`filter-btn ${currentFilter === 'tech' ? 'active' : ''}`} onClick={() => applyFilter('tech')}># 奇思妙想</button>
                  <button className={`filter-btn ${currentFilter === 'world' ? 'active' : ''}`} onClick={() => applyFilter('world')}># 大千世界</button>
                  <button className={`filter-btn ${currentFilter === 'soul' ? 'active' : ''}`} onClick={() => applyFilter('soul')}># 灵魂与温度</button>
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
                          <p className="bold-cn">刘云天 / 2005 / ISFJ。<br/>北京化工大学测控技术与仪器专业 (2024-2028)。<br/>跨学科的 AI 探索者，具备将算法理论转化为实际应用的全栈能力。</p>
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
                              <img src="/images/SolidState_Agent_1.jpg" alt="Tech 1" className="stack-img img-1 brutal-filter" />
                              <img src="/images/AI_Medical_2.jpg" alt="Tech 2" className="stack-img img-2 brutal-filter" />
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

                      <div className="brutal-card span-2 row-span-2 bg-black text-white overflow-hidden" data-category="unique" style={{display: 'none'}}>
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
                              <li><strong>快速学习与英文能力:</strong> CET-6 530分，无障碍阅读最新英文 Paper 与技术文档，保持对前沿技术的敏锐嗅觉。</li>
                          </ul>
                      </div>

                      <div className="brutal-card bg-blue text-white overflow-hidden" data-category="unique" style={{display: 'none'}}>
                          <div className="card-watermark">🧩</div>
                          <div className="card-header">
                              <div className="card-tag bg-black text-white">Personality</div>
                              <div className="card-icon">🧩</div>
                          </div>
                          <h3 className="brutal-font">MBTI: ISFJ</h3>
                          <p className="bold-cn">守卫者人格。拥有靠谱的内核，注重细节，责任心强。在团队协作中是稳定输出的基石，在代码世界里是严谨的架构者。</p>
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
                                  {project.images.slice(0, 3).map((img, idx) => (
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
                                  {project.images.slice(0, 3).map((img, idx) => (
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

                      <div className="brutal-card bg-black text-white overflow-hidden" data-category="world" style={{display: 'none'}}>
                          <div className="card-watermark">🚀</div>
                          <div className="card-header">
                              <div className="card-tag bg-blue text-white">Exploration</div>
                              <div className="card-icon">🚀</div>
                          </div>
                          <h3 className="brutal-font text-blue">行业探索</h3>
                          <p className="bold-cn">积极参与校招投递与前沿企业交流。曾参加米哈游等头部科技公司的宣讲会，实地调研行业需求，保持对技术落地与商业化的敏锐度。</p>
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
                                      <img src="/images/MAIL.png" alt="蓝信封" className="w-16 h-16 object-cover border-2 border-white" />
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
                                      <img src="/images/Volunteer_1.jpg" alt="迎新志愿者" className="w-16 h-16 object-cover border-2 border-white" />
                                      <div>
                                          <h4 className="font-bold text-lg brutal-font tracking-wide">2025级开学迎新志愿者</h4>
                                          <p className="text-sm opacity-80 font-bold mt-1">2025.09.07</p>
                                      </div>
                                  </div>
                                  {/* Item 3 */}
                                  <div className="flex items-center gap-4 bg-black p-4 border-4 border-white transform transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_white]">
                                      <img src="/images/OFO.png" alt="单车猎人行动" className="w-16 h-16 object-cover border-2 border-white" />
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
                                      <img src="/images/TAI.png" alt="诗琳通公主访华" className="w-16 h-16 object-cover border-2 border-white" />
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

                      <div className="brutal-card span-2 bg-yellow overflow-hidden" data-category="soul" style={{display: 'none'}}>
                          <div className="card-watermark">🎨</div>
                          <div className="card-header">
                              <div className="card-tag bg-black text-white">Multi-dimensional Hobbies</div>
                              <div className="card-icon">🎨</div>
                          </div>
                          <h3 className="brutal-font">多维爱好</h3>
                          <p className="bold-cn">在技术之外，拥有丰富的精神世界。探索不同的生活方式，保持对生活的热爱与创造力。</p>
                      </div>

                  </div>
              </main>
          </div>
      </div>

      {/* Lightbox Overlay */}
      <div className={`lightbox-overlay ${lightboxImg ? 'active' : ''}`} onClick={closeLightbox}>
          <div className="lightbox-close" onClick={closeLightbox}>✕</div>
          {lightboxImg && <img src={lightboxImg} alt="Enlarged view" className="lightbox-img" />}
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
    </>
  );
}
