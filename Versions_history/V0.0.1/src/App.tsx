import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function App() {
  const [currentFilter, setCurrentFilter] = useState('all');
  const viewportRef = useRef<HTMLDivElement>(null);

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
    const backBtn = document.querySelector('.back-btn') as HTMLElement;

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
            if (backBtn) backBtn.classList.add('visible');
            
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
    const backBtn = document.querySelector('.back-btn') as HTMLElement;
    const scrollTopBtn = document.querySelector('.scroll-top-btn') as HTMLElement;
    if (backBtn) backBtn.classList.remove('visible');
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
        const shouldShow = filterValue === 'all' || category === filterValue;
        
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

      <button className="back-btn brutal-btn bg-white" onClick={backToLevel1}>← 返回首屏</button>
      <button className="scroll-top-btn brutal-btn bg-yellow" onClick={scrollToTop}>↑</button>

      {/* Level 1 */}
      <div className="ui-container level1">
          <h1 className="slogan brutal-font">
              [ DECODING <span className="bg-yellow text-black px-2">THE NOVEL</span> ]
          </h1>
          <p className="tags bold-cn">测控技术 / 全栈开发 / AI 探索者</p>

          <div className="hero-layout">
              <div className="micro-intro bold-cn brutal-box bg-white">
                  <p>🔥 注重细节且靠谱的极客</p>
                  <p>⚡ 热衷于从零到一开发新奇事物</p>
                  <p>💻 在 Y9000P 算力中枢上部署 AI 与全栈应用</p>
              </div>
              <div className="hero-image-box brutal-box bg-blue brutal-img-container">
                  <img src="https://picsum.photos/seed/geek/400/400" alt="Profile" className="brutal-img" referrerPolicy="no-referrer" />
              </div>
          </div>

          <div className="action-buttons-group">
              <button className="brutal-btn bg-white">社交链接</button>
              <button className="brutal-btn bg-yellow" onClick={transitionToLevel2}>展开全景宇宙 ↗</button>
          </div>

          <div className="marquee-container brutal-box bg-black text-white">
              <div className="marquee-content brutal-font">
                  <span>SYSTEM ONLINE // FULL STACK DEVELOPER // AI EXPLORER // HARDWARE GEEK // </span>
                  <span>SYSTEM ONLINE // FULL STACK DEVELOPER // AI EXPLORER // HARDWARE GEEK // </span>
              </div>
          </div>
      </div>

      {/* Level 2 */}
      <div className="ui-container level2">
          <aside className="side-nav brutal-box bg-white">
              <div className="nav-header brutal-font">SYS.MENU</div>
              <button className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`} onClick={() => applyFilter('all')}># 核心全景</button>
              <button className={`filter-btn ${currentFilter === 'code' ? 'active' : ''}`} onClick={() => applyFilter('code')}># 创造与代码</button>
              <button className={`filter-btn ${currentFilter === 'path' ? 'active' : ''}`} onClick={() => applyFilter('path')}># 专业足迹</button>
              <button className={`filter-btn ${currentFilter === 'soul' ? 'active' : ''}`} onClick={() => applyFilter('soul')}># 灵魂与温度</button>
          </aside>

          <main className="multiverse-viewport" ref={viewportRef} onScroll={handleScroll}>
              <div className="bento-grid">
                  
                  <div className="brutal-card span-2 bg-yellow" data-category="code">
                      <div className="card-tag bg-black text-white">AI for Science</div>
                      <div className="brutal-img-container bg-yellow">
                          <img src="https://picsum.photos/seed/science/800/400" alt="Project" className="brutal-img" referrerPolicy="no-referrer" />
                      </div>
                      <h3 className="brutal-font">固态电池逆合成系统</h3>
                      <p className="bold-cn">结合北化测控专业的严谨数理逻辑，利用前沿 AI 算法深入化学与材料学底层进行新设计探索。</p>
                  </div>

                  <div className="brutal-card bg-white" data-category="code">
                      <div className="card-tag bg-black text-white">Full Stack</div>
                      <h3 className="brutal-font">Gradify</h3>
                      <p className="bold-cn">FastAPI + JS 构建。为英语老师量身打造的作业智能反馈平台。</p>
                  </div>

                  <div className="brutal-card row-span-2 bg-black text-white" data-category="soul">
                      <div className="card-tag bg-blue text-white">ISFJ Core</div>
                      <div className="brutal-img-container bg-blue">
                          <img src="https://picsum.photos/seed/soul/400/600" alt="Soul" className="brutal-img" referrerPolicy="no-referrer" />
                      </div>
                      <h3 className="brutal-font text-blue mt-4">靠谱内核</h3>
                      <p className="bold-cn">担任「蓝信封」通信大使。注重细节与同理心，这些特质不仅让我的代码极少出 Bug，更让我保持与真实世界的温度连接。</p>
                  </div>

                  <div className="brutal-card bg-blue text-white" data-category="path">
                      <div className="card-tag bg-black text-white">Experience</div>
                      <h3 className="brutal-font">实战与观察</h3>
                      <p className="bold-cn">英语机构实习历练，校园招聘会实地调研。用脚步丈量行业前沿。</p>
                  </div>

                  <div className="brutal-card bg-yellow" data-category="soul">
                      <div className="card-tag bg-black text-white">Lifelong Learning</div>
                      <h3 className="brutal-font">多维雷达</h3>
                      <p className="bold-cn">CET4 636分 / CET6 570分。死磕概率论与数理统计，并坚持日语打卡。</p>
                  </div>

                  <div className="brutal-card span-2 bg-white" data-category="code">
                      <div className="card-tag bg-black text-white">Hardware</div>
                      <div className="brutal-img-container bg-white">
                          <img src="https://picsum.photos/seed/hardware/800/400" alt="Hardware" className="brutal-img" referrerPolicy="no-referrer" />
                      </div>
                      <h3 className="brutal-font">Y9000P 战车</h3>
                      <p className="bold-cn">搭载 5070Ti 显卡。支撑我跑通 ResNet 肺部 CT 图像分类模型的顶级算力中枢。</p>
                  </div>

              </div>
          </main>
      </div>
    </>
  );
}
