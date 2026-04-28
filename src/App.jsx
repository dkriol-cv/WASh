import React, { useState, useMemo, useEffect } from 'react';
import { useScorm } from './hooks/useScorm';
import { modulesData } from './data/courseData';
import NavigationBar from './components/NavigationBar';
import WelcomeScreen from './components/WelcomeScreen';
import ModuleSelection from './components/ModuleSelection';
import CourseSidebar from './components/CourseSidebar';
import { Menu, Home, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Module Components imports
import Modulo1 from './modules/Modulo1';
import Modulo2 from './modules/Modulo2';
import Modulo3 from './modules/Modulo3';
import Modulo4 from './modules/Modulo4';
import Modulo5 from './modules/Modulo5';

function App() {
  const { isReady, lessonStatus, score, resumeData, saveProgress, saveScore, completeCourse, clearProgress } = useScorm();

  // Stages: 'welcome' | 'selection' | 'course'
  const [currentView, setCurrentView] = useState('welcome');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState(1);
  const [currentSlideInModule, setCurrentSlideInModule] = useState(1);
  const [maxUnlockedModule, setMaxUnlockedModule] = useState(1);
  const [maxUnlockedSlidePerModule, setMaxUnlockedSlidePerModule] = useState({ 1: 1 });
  const [canAdvance, setCanAdvance] = useState(true);
  const [isModuleFinished, setIsModuleFinished] = useState(false);

  const currentModule = useMemo(() => modulesData.find(m => m.id === currentModuleId), [currentModuleId]);

  // Update maxUnlockedModule and slide as user reaches new parts
  useEffect(() => {
    if (currentView === 'course') {
      const currentModuleMax = maxUnlockedSlidePerModule[currentModuleId] || 1;
      if (currentSlideInModule > currentModuleMax) {
        setMaxUnlockedSlidePerModule(prev => ({
          ...prev,
          [currentModuleId]: currentSlideInModule
        }));
      }
    }
  }, [currentSlideInModule, currentModuleId, currentView]);

  // Restore unlock state silently when SCORM is ready and resume data exists
  useEffect(() => {
    if (!isReady || !resumeData) return;
    setMaxUnlockedModule(resumeData.maxUnlockedModule || 1);
    setMaxUnlockedSlidePerModule(resumeData.maxUnlockedSlidePerModule || { 1: 1 });
  }, [isReady]); // intentionally run only once on ready

  // Auto-save progress to SCORM on every slide change (defensive try/catch)
  useEffect(() => {
    if (!isReady || currentView !== 'course') return;
    try {
      saveProgress({
        moduleId: currentModuleId,
        slideId: currentSlideInModule,
        view: 'course',
        maxUnlockedModule,
        maxUnlockedSlidePerModule,
      });
    } catch (err) {
      console.warn('[App] saveProgress threw (SCORM error isolated):', err?.message || err);
    }
  }, [isReady, currentView, currentModuleId, currentSlideInModule]);

  const handleStart = () => {
    setCurrentView('selection');
  };

  // Resume: go directly to the last slide the user was on
  const handleResume = () => {
    if (!resumeData) return;
    setCurrentModuleId(resumeData.moduleId);
    setCurrentSlideInModule(resumeData.slideId);
    setCurrentView('course');
    setIsModuleFinished(false);
  };

  // Start over — clear all SCORM progress
  const handleStartFresh = () => {
    clearProgress();
    setCurrentModuleId(1);
    setCurrentSlideInModule(1);
    setMaxUnlockedModule(1);
    setMaxUnlockedSlidePerModule({ 1: 1 });
    setCurrentView('selection');
    setIsModuleFinished(false);
  };

  const handleSelectModule = (id) => {
    if (id === 0) {
      setCurrentView('welcome');
      return;
    }
    setCurrentModuleId(id);
    // If resuming the exact module the user was on, restore their last slide
    const resumeSlide = (resumeData && resumeData.moduleId === id) ? resumeData.slideId : 1;
    setCurrentSlideInModule(resumeSlide);
    setCurrentView('course');
    setIsModuleFinished(false);
  };

  const handleHome = () => {
    setCurrentView('welcome');
    setIsSidebarOpen(false);
    setIsModuleFinished(false);
  };

  const handleNext = () => {
    if (currentSlideInModule < currentModule.slidesCount) {
      setCurrentSlideInModule(prev => prev + 1);
    } else {
      setIsModuleFinished(true);
    }
  };

  const handleProceedToNextModule = () => {
    const nextId = currentModuleId + 1;
    if (nextId <= modulesData.length) {
      if (nextId > maxUnlockedModule) {
        setMaxUnlockedModule(nextId);
        setMaxUnlockedSlidePerModule(prev => ({ ...prev, [nextId]: 1 }));
      }
      setCurrentModuleId(nextId);
      setCurrentSlideInModule(1);
      setIsModuleFinished(false);
    }
  };

  const handlePrev = () => {
    if (currentSlideInModule > 1) {
      setCurrentSlideInModule(prev => prev - 1);
      setIsModuleFinished(false);
    } else {
      setCurrentView('selection');
    }
  };

  const handleJumpToSlide = (mId, sId) => {
    setCurrentModuleId(mId);
    setCurrentSlideInModule(sId);
    setIsModuleFinished(false);
    setIsSidebarOpen(false);
  };

  const renderCurrentModule = () => {
    const props = {
      currentSlide: currentSlideInModule,
      setCanAdvance,
      handleNext,
      saveScore,
      completeCourse
    };

    switch (currentModuleId) {
      case 1: return <Modulo1 {...props} />;
      case 2: return <Modulo2 {...props} />;
      case 3: return <Modulo3 {...props} />;
      case 4: return <Modulo4 {...props} />;
      case 5: return <Modulo5 {...props} />;
      default: return <div>Módulo não encontrado</div>;
    }
  };

  const totalSlides = useMemo(() => modulesData.reduce((acc, m) => acc + m.slidesCount, 0), []);
  const currentGlobalSlide = useMemo(() => {
    let count = 0;
    for (let i = 0; i < currentModuleId - 1; i++) {
       count += modulesData[i].slidesCount;
    }
    return count + (currentView === 'course' ? currentSlideInModule : 0);
  }, [currentModuleId, currentSlideInModule, currentView]);

  const progressPercent = Math.min(100, Math.round((currentGlobalSlide / totalSlides) * 100));

  return (
    <div className="flex flex-col h-full w-full bg-[#0f1f36] text-white font-sans overflow-hidden">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-4 sm:px-10 bg-white text-[#0f1f36] shadow-md z-30 shrink-0 border-b-4 border-[#3ac4ee]">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleHome}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#0f1f36]"
            title="Ir para o Início"
          >
            <Home className="w-6 h-6" />
          </button>
          <img src="./assets/WASH_LOGO.png" alt="WASH Logo" className="h-10 object-contain hidden sm:block" />
          <h1 className="font-bold text-lg hidden lg:block text-[#0f1f36]">Escola Amiga do WASH</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {currentView === 'course' && (
            <div className="flex items-center gap-3 sm:gap-6 mr-2 sm:mr-4">
              <div className="text-right hidden sm:block leading-tight">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#3ac4ee]">Módulo {currentModuleId}</p>
                <p className="text-sm font-bold truncate max-w-[150px] lg:max-w-[300px]">{currentModule.title}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#fdec00] text-[#0f1f36] flex items-center justify-center font-black border-2 border-[#fdec00] shadow-sm shrink-0">
                {currentModuleId}
              </div>
            </div>
          )}
          
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 sm:px-4 sm:py-2 rounded-lg bg-[#0f1f36] text-white hover:bg-[#1a2f4d] transition-colors flex items-center gap-2 shadow-lg"
          >
            <Menu className="w-6 h-6 sm:w-5 sm:h-5 text-[#fdec00]" />
            <span className="hidden sm:inline font-bold uppercase text-xs tracking-widest">Menu</span>
          </button>
        </div>
      </header>
      
      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-gray-100 shrink-0 z-20">
        <div 
          className="h-full bg-[#3ac4ee] transition-all duration-700 ease-out shadow-[0_0_10px_#3ac4ee]" 
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative bg-[url('./assets/Background-03.png')] bg-cover bg-center bg-no-repeat bg-fixed">
        <div className="absolute inset-0 bg-[#0f1f36]/85 backdrop-blur-[1px]" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto h-full p-3 sm:p-5 flex flex-col overflow-y-auto custom-scrollbar">
          {currentView === 'welcome' && (
            <WelcomeScreen
              onStart={handleStart}
              onResume={resumeData ? handleResume : null}
              onStartFresh={resumeData ? handleStartFresh : null}
              resumeInfo={resumeData}
            />
          )}
          {currentView === 'selection' && (
            <ModuleSelection
              maxUnlockedModule={maxUnlockedModule}
              onSelectModule={handleSelectModule}
              resumeModuleId={resumeData?.moduleId}
              resumeSlideId={resumeData?.slideId}
            />
          )}
          {currentView === 'course' && !isModuleFinished && renderCurrentModule()}

          {/* Module Completion Overlay */}
          <AnimatePresence>
            {isModuleFinished && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 z-50 flex items-center justify-center p-6"
              >
                <div className="bg-white text-[#0f1f36] p-8 sm:p-12 rounded-[var(--brand-radius)] shadow-2xl max-w-lg w-full text-center border-t-8 border-[#3ac4ee]">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-black uppercase mb-4 tracking-tight text-[#0f1f36]">Módulo Concluído!</h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Excelente trabalho! O <strong>{currentModule.title}</strong> foi finalizado. 
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => setCurrentView('selection')}
                      className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-5 h-5 text-gray-500" />
                      Ver Módulos
                    </button>
                    {currentModuleId < modulesData.length && (
                      <button 
                        onClick={handleProceedToNextModule}
                        className="flex-1 px-6 py-4 bg-[#fdec00] hover:bg-[#eedb00] rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        Próximo Módulo
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Navigation */}
      {currentView === 'course' && !isModuleFinished && (
        <NavigationBar 
          canAdvance={canAdvance} 
          handleNext={handleNext} 
          handlePrev={handlePrev}
          isFirst={currentModuleId === 1 && currentSlideInModule === 1}
          isLast={currentModuleId === modulesData.length && currentSlideInModule === currentModule.slidesCount}
          currentGlobalSlide={currentGlobalSlide}
          totalGlobalSlides={totalSlides}
        />
      )}

      {/* Sidebar Overlay */}
      <CourseSidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentModuleId={currentModuleId}
        currentSlideInModule={currentSlideInModule}
        maxUnlockedModule={maxUnlockedModule}
        maxUnlockedSlide={maxUnlockedSlidePerModule[currentModuleId] || 1}
        onSelectSlide={handleJumpToSlide}
      />
    </div>
  );
}

export default App;
