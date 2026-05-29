"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  BookOpen,
  Heart,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  Send
} from 'lucide-react';
import { FRIDAY_SUNNAHS, FRIDAY_VIRTUES, SALAWAT_FORMATS, FridaySunnah } from '../data/friday-sunnahs';
import styles from './FridayClient.module.css';

export default function FridayClient() {
  const [isMounted, setIsMounted] = useState(false);
  const [completedSunnahs, setCompletedSunnahs] = useState<string[]>([]);
  const [kahfRead, setKahfRead] = useState(false);
  const [salawatSession, setSalawatSession] = useState(0);
  const [salawatLifetime, setSalawatLifetime] = useState(0);
  const [activeSalawatFormat, setActiveSalawatFormat] = useState(0);
  const [expandedEvidences, setExpandedEvidences] = useState<string[]>([]);
  const [toasts, setToasts] = useState<{ id: string; text: string }[]>([]);
  
  // Track if today is Friday
  const [isFriday, setIsFriday] = useState(false);

  // Generates weekly key so checklist resets every week
  const getWeeklyKey = () => {
    const d = new Date();
    const oneJan = new Date(d.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((d.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
    const week = Math.ceil((d.getDay() + 1 + numberOfDays) / 7);
    return `${d.getFullYear()}-W${week}`;
  };

  useEffect(() => {
    setIsMounted(true);
    
    // Check if today is Friday (5 is Friday in JS getDay())
    const day = new Date().getDay();
    setIsFriday(day === 5);

    // Load persisted state from localStorage
    try {
      const weekKey = getWeeklyKey();
      
      const storedSunnahs = localStorage.getItem(`jari_friday_sunnahs_${weekKey}`);
      if (storedSunnahs) {
        setCompletedSunnahs(JSON.parse(storedSunnahs));
      }

      const storedKahf = localStorage.getItem(`jari_friday_kahf_${weekKey}`);
      if (storedKahf) {
        setKahfRead(JSON.parse(storedKahf));
      }

      const storedLifetimeSalawat = localStorage.getItem('jari_friday_salawat_lifetime');
      if (storedLifetimeSalawat) {
        setSalawatLifetime(parseInt(storedLifetimeSalawat, 10));
      }
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }
  }, []);

  const showToast = (text: string) => {
    const id = Math.random().toString();
    setToasts(prev => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const toggleSunnah = (id: string) => {
    const newCompleted = completedSunnahs.includes(id)
      ? completedSunnahs.filter(item => item !== id)
      : [...completedSunnahs, id];
    
    setCompletedSunnahs(newCompleted);
    
    try {
      const weekKey = getWeeklyKey();
      localStorage.setItem(`jari_friday_sunnahs_${weekKey}`, JSON.stringify(newCompleted));
      
      if (newCompleted.includes(id) && navigator.vibrate) {
        navigator.vibrate(30); // Subtle haptic feedback
      }
      
      if (newCompleted.length === FRIDAY_SUNNAHS.length) {
        showToast('ما شاء الله! أتممت جميع سنن الجمعة اليوم 🎉 تقبل الله طاعاتكم.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleKahf = () => {
    const newState = !kahfRead;
    setKahfRead(newState);
    try {
      const weekKey = getWeeklyKey();
      localStorage.setItem(`jari_friday_kahf_${weekKey}`, JSON.stringify(newState));
      
      if (newState) {
        if (navigator.vibrate) navigator.vibrate([40, 30, 40]);
        showToast('تقبل الله قراءتك لسورة الكهف، وجعلها لك نوراً بين الجمعتين 📖✨');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const incrementSalawat = () => {
    const newSession = salawatSession + 1;
    const newLifetime = salawatLifetime + 1;
    
    setSalawatSession(newSession);
    setSalawatLifetime(newLifetime);
    
    try {
      localStorage.setItem('jari_friday_salawat_lifetime', newLifetime.toString());
      
      if (navigator.vibrate) {
        navigator.vibrate(25); // Haptic feedback on tap
      }
      
      // Encourage milestones
      if (newSession % 10 === 0) {
        showToast(`أحسنت! صليت على النبي ﷺ ${newSession} مرات في هذه الجلسة ✨`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const resetSalawat = () => {
    if (window.confirm('هل تريد إعادة تعيين عداد الصلاة على النبي للجلسة الحالية والعداد الكلي؟')) {
      setSalawatSession(0);
      setSalawatLifetime(0);
      try {
        localStorage.removeItem('jari_friday_salawat_lifetime');
        showToast('تمت إعادة تعيين عدادات الصلاة على النبي 🔄');
      } catch (e) {
        console.error(e);
      }
    }
  };

  const toggleEvidence = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedEvidences(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCopy = async (sunnah: FridaySunnah, e: React.MouseEvent) => {
    e.stopPropagation();
    const pageUrl = typeof window !== 'undefined' ? `${window.location.origin}/sunnah` : 'https://jari-app.vercel.app/sunnah';
    const textToCopy = `${sunnah.shareText}\n\nاقرأ المزيد وتتبع سنن يوم الجمعة عبر تطبيق جاري 🤍:\n${pageUrl}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast('تم نسخ نص السنّة والحديث مع الرابط بنجاح! 📋');
    } catch (err) {
      // Fallback
      try {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('تم نسخ نص السنّة والحديث مع الرابط بنجاح! 📋');
      } catch (e) {
        showToast('عذراً، فشل النسخ التلقائي.');
      }
    }
  };

  const handleShare = async (sunnah: FridaySunnah, e: React.MouseEvent) => {
    e.stopPropagation();
    const pageUrl = typeof window !== 'undefined' ? `${window.location.origin}/sunnah` : 'https://jari-app.vercel.app/sunnah';
    const textToShare = `${sunnah.shareText}\n\nتطبيق جاري:`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: sunnah.title,
          text: textToShare,
          url: pageUrl
        });
        showToast('تمت المشاركة بنجاح ✨');
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          // If actual share fails, copy to clipboard
          handleCopy(sunnah, e);
        }
      }
    } else {
      // If Web Share not supported, copy to clipboard
      handleCopy(sunnah, e);
    }
  };

  const handleViralShare = (platform: 'whatsapp' | 'telegram' | 'general') => {
    const pageUrl = typeof window !== 'undefined' ? `${window.location.origin}/sunnah` : 'https://jari-app.vercel.app/sunnah';
    const msg = `السلام عليكم ورحمة الله وبركاته 🌷\nأذكركم ونفسي بسنن يوم الجمعة المبارك وأذكاره وآدابه العظيمة. يمكنك قراءة السنن وتتبع إنجازك اليومي والصلاة على النبي ﷺ عبر هذا الرابط:\n${pageUrl}\n\nأنشر تؤجر، فالدال على الخير كفاعله 🤍`;
    
    if (platform === 'whatsapp') {
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
      showToast('جاري فتح واتساب للمشاركة... 🟢');
    } else if (platform === 'telegram') {
      const url = `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
      showToast('جاري فتح تلغرام للمشاركة... 🔵');
    } else {
      // General copy
      try {
        navigator.clipboard.writeText(msg);
        showToast('تم نسخ نص الدعوة للمشاركة بنجاح! أنشر تؤجر 🤍');
      } catch (err) {
        showToast('عذراً، فشل النسخ التلقائي.');
      }
    }
  };

  // Safe SSR Render for checklist stats
  const completedCount = completedSunnahs.length;
  const progressPercentage = FRIDAY_SUNNAHS.length > 0 ? (completedCount / FRIDAY_SUNNAHS.length) * 100 : 0;

  // Stagger animation variables
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 15 } }
  };

  return (
    <div className={styles.container}>
      {/* Hero Banner Section */}
      <motion.div
        className={styles.heroCard}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.heroBadge}>
          <Sparkles size={14} />
          {isMounted && isFriday ? 'اليوم هو يوم الجمعة المبارك 🕌' : 'سنن وآداب يوم الجمعة 📅'}
        </div>
        <h1 className={styles.heroTitle}>سنن يوم الجمعة وأذكارها</h1>
        <p className={styles.heroIntro}>
          «خَيْرُ يَوْمٍ طَلَعَتْ عَلَيْهِ الشَّمْسُ يَوْمُ الْجُمُعَةِ»؛ محطة أسبوعية لتطهير القلوب، والتزود من الطاعات، والتقرب إلى رب السموات بالسنن المأثورة والدعاء المستجاب.
        </p>
      </motion.div>

      {/* Virtues of Friday */}
      <motion.section
        className={styles.virtuesSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className={styles.sectionHeader}>
          <Award className="text-emerald-500" style={{ color: 'var(--primary)' }} size={24} />
          <h2 className={styles.sectionTitle}>{FRIDAY_VIRTUES.title}</h2>
        </div>
        
        <div className={styles.virtuesGrid}>
          {FRIDAY_VIRTUES.points.map((point, index) => (
            <div key={index} className={styles.virtueCard}>
              <div className={styles.virtueHeader}>
                <span style={{ fontSize: '1.2rem' }}>✦</span>
                <h3 className={styles.virtueTitle}>{point.title}</h3>
              </div>
              <p className={styles.virtueText}>{point.description}</p>
              {point.evidence && (
                <div className={`${styles.evidenceBlock} arabic-text`} lang="ar">
                  {point.evidence}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Interactive Checklist & Sunnahs Card Grid */}
      <section>
        <div className={styles.checklistHeader}>
          <div className={styles.progressContainer}>
            <div className={styles.progressText}>
              إنجازك لسنن يوم الجمعة اليوم: {isMounted ? `${completedCount} من أصل ${FRIDAY_SUNNAHS.length}` : '...'}
            </div>
            <div className={styles.progressBarOuter}>
              <div
                className={styles.progressBarInner}
                style={{ width: isMounted ? `${progressPercentage}%` : '0%' }}
              />
            </div>
          </div>
          {isMounted && completedCount > 0 && (
            <button
              onClick={() => {
                if (window.confirm('هل تريد إعادة تعيين قائمة سنن الجمعة لهذا اليوم؟')) {
                  setCompletedSunnahs([]);
                  try {
                    localStorage.removeItem(`jari_friday_sunnahs_${getWeeklyKey()}`);
                    showToast('تمت إعادة تعيين قائمة السنن 🔄');
                  } catch(e) {}
                }
              }}
              className={styles.resetBtn}
              aria-label="إعادة تعيين القائمة"
            >
              <RotateCcw size={14} />
              <span>إعادة تعيين</span>
            </button>
          )}
        </div>

        <motion.div
          className={styles.sunnahsGrid}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {FRIDAY_SUNNAHS.map((sunnah) => {
            const isCompleted = isMounted && completedSunnahs.includes(sunnah.id);
            const isExpanded = expandedEvidences.includes(sunnah.id);

            return (
              <motion.article
                key={sunnah.id}
                className={`${styles.sunnahCard} ${isCompleted ? styles.sunnahCardCompleted : ''}`}
                variants={itemVariants}
                whileHover={{ y: -3, boxShadow: 'var(--shadow-lg)' }}
                onClick={() => toggleSunnah(sunnah.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Custom Checkbox on top-left (top-right in RTL layout, left absolute handles it) */}
                <div className={styles.checkboxContainer}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSunnah(sunnah.id);
                    }}
                    className={`${styles.customCheckbox} ${isCompleted ? styles.customCheckboxChecked : ''}`}
                    aria-label={isCompleted ? `إلغاء تحديد سنّة ${sunnah.title}` : `تحديد سنّة ${sunnah.title} كمكتملة`}
                  >
                    {isCompleted && <Check size={14} />}
                  </button>
                </div>

                <div className={styles.cardEmoji}>{sunnah.emoji}</div>
                
                <h3 className={styles.cardTitle}>{sunnah.title}</h3>
                <p className={styles.cardDescription}>{sunnah.description}</p>

                {sunnah.evidence && (
                  <>
                    <button
                      onClick={(e) => toggleEvidence(sunnah.id, e)}
                      className={styles.evidenceToggle}
                      aria-expanded={isExpanded}
                      aria-controls={`evidence-${sunnah.id}`}
                    >
                      <span>{isExpanded ? 'إخفاء الدليل الشرعي' : 'عرض الدليل الشرعي'}</span>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          id={`evidence-${sunnah.id}`}
                          className={`${styles.cardEvidence} arabic-text`}
                          lang="ar"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          onClick={(e) => e.stopPropagation()} // Prevent card toggle on click inside evidence
                        >
                          {sunnah.evidence}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}

                {/* Card Actions: Share & Copy */}
                <div className={styles.cardActions}>
                  <button
                    onClick={(e) => handleCopy(sunnah, e)}
                    className={styles.actionBtn}
                    title="نسخ السنّة والحديث مع الرابط"
                    aria-label="نسخ النص"
                  >
                    <Copy size={14} />
                    <span>نسخ</span>
                  </button>
                  <button
                    onClick={(e) => handleShare(sunnah, e)}
                    className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
                    title="مشاركة السنّة"
                    aria-label="مشاركة النص"
                  >
                    <Share2 size={14} />
                    <span>مشاركة</span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      {/* Surah Al-Kahf Virtue & Tracker */}
      <motion.section
        className={styles.kahfSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className={styles.kahfContent}>
          <div className={styles.kahfIconBlock}>📖</div>
          <div className={styles.kahfDetails}>
            <h2 className={styles.kahfTitle}>سورة الكهف: نور الأسبوع 💡</h2>
            <p className={styles.kahfText}>
              يُسنُّ قراءتها في يوم الجمعة أو ليلتها (تبدأ ليلة الجمعة من غروب شمس يوم الخميس وتنتهي الجمعة بغروب الشمس).
            </p>
            <div className={`${styles.kahfEvidence} arabic-text`} lang="ar">
              قال رسول الله ﷺ: «مَنْ قَرَأَ سُورَةَ الْكَهْفِ يَوْمَ الْجُمُعَةِ أَضَاءَ لَهُ مِنَ النُّورِ مَا بَيْنَ الْجُمُعَتَيْنِ» (رواه الحاكم).
            </div>
            
            {/* Kahf Checklist Button */}
            <button
              onClick={toggleKahf}
              className={`${styles.kahfTracker} ${isMounted && kahfRead ? styles.kahfTrackerActive : ''}`}
              aria-label={isMounted && kahfRead ? "تحديد سورة الكهف كغير مقروءة" : "تحديد سورة الكهف كمقروءة"}
            >
              <div className={`${styles.kahfCheckIcon} ${isMounted && kahfRead ? styles.kahfCheckIconActive : ''}`}>
                {isMounted && kahfRead && <Check size={14} />}
              </div>
              <span className={styles.kahfTrackerLabel}>
                {isMounted && kahfRead ? 'الحمد لله، قرأت سورة الكهف اليوم 🤍' : 'قرأت سورة الكهف اليوم'}
              </span>
            </button>
          </div>
        </div>
      </motion.section>

      {/* Sending Salawat Interactive Widget */}
      <motion.section
        className={styles.salawatSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className={styles.sectionHeader} style={{ justifyContent: 'center' }}>
          <Heart className="text-rose-500" style={{ color: '#ef4444' }} size={24} />
          <h2 className={styles.sectionTitle}>كثرة الصلاة على النبي ﷺ ✨</h2>
        </div>
        
        <p className={styles.heroIntro} style={{ fontSize: '0.95rem', marginBottom: '20px' }}>
          قال النبي ﷺ: «إنَّ مِنْ أفضلِ أيامِكُم يومَ الجُمُعةِ.. فأكْثِروا عليَّ مِنَ الصلاةِ فيهِ فإنَّ صلاتَكُم معروضةٌ عليَّ».
        </p>

        {/* Format Tabs */}
        <div className={styles.salawatTabs}>
          {SALAWAT_FORMATS.map((format, index) => (
            <button
              key={index}
              className={`${styles.salawatTab} ${activeSalawatFormat === index ? styles.salawatTabActive : ''}`}
              onClick={() => setActiveSalawatFormat(index)}
            >
              {format.title}
            </button>
          ))}
        </div>

        {/* Format Display Box */}
        <div className={styles.salawatTextContainer}>
          <p className={`${styles.salawatText} arabic-text`} lang="ar">
            {SALAWAT_FORMATS[activeSalawatFormat].text}
          </p>
        </div>

        {/* Counter Stats */}
        <div className={styles.salawatStats}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>
              {salawatSession}
            </div>
            <div className={styles.statLabel}>في الجلسة الحالية</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>
              {isMounted ? salawatLifetime : 0}
            </div>
            <div className={styles.statLabel}>إجمالي الصلوات المسجلة</div>
          </div>
        </div>

        {/* Interactive Clicker */}
        <button
          onClick={incrementSalawat}
          className={styles.salawatCounterCircle}
          aria-label="اضغط للصلاة على النبي ﷺ"
        >
          <span className={styles.counterClickLabel}>صلِّ عليه ﷺ</span>
          <span className={styles.counterSubLabel}>انقر للعد</span>
        </button>

        {/* Reset counters button */}
        {isMounted && (salawatSession > 0 || salawatLifetime > 0) && (
          <div>
            <button onClick={resetSalawat} className={styles.salawatResetBtn} aria-label="تصفير عدادات الصلاة على النبي">
              <RotateCcw size={14} />
              <span>إعادة تعيين العدادات</span>
            </button>
          </div>
        )}
      </motion.section>

      {/* The Hour of Acceptance */}
      <motion.section
        className={styles.hourSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className={styles.hourContent}>
          <div className={styles.hourIcon}>
            <Clock size={24} />
          </div>
          <div className={styles.hourTextContainer}>
            <h2 className={styles.hourTitle}>ساعة الاستجابة يوم الجمعة 🤲</h2>
            <p className={styles.hourText}>
              يوم الجمعة فيه ساعة عظيمة لا يسأل اللهَ فيها عبدٌ مسلمٌ خيراً إلا أعطاه إياه. وأرجح الأقوال عند العلماء أنها **آخر ساعة من نهار يوم الجمعة** (قبل أذان المغرب). فاغتنم هذا الوقت بالانكسار والضراعة وكثرة الاستغفار والدعاء لك وللمسلمين.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Spiritual / Viral Growth Sharing Section */}
      <motion.section
        className={styles.viralCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className={styles.heroBadge} style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
          <Heart size={14} />
          <span>أنشر تؤجر 🤍</span>
        </div>
        <h2 className={styles.viralTitle}>شارك الأجر مع من تحب</h2>
        <p className={styles.viralDesc}>
          قال رسول الله ﷺ: «مَنْ دَلَّ عَلَى خَيْرٍ فَلَهُ مِثْلُ أَجْرِ فَاعِلِهِ». شارك هذه السنن النبوية العظيمة مع عائلتك وأصدقائك واكسب أجر من عمِل بها.
        </p>

        <div className={styles.shareButtons}>
          <button
            onClick={() => handleViralShare('whatsapp')}
            className={`${styles.shareBtn} ${styles.shareBtnWhatsapp}`}
            aria-label="المشاركة عبر واتساب"
          >
            <Send size={16} />
            <span>المشاركة عبر واتساب</span>
          </button>
          <button
            onClick={() => handleViralShare('telegram')}
            className={`${styles.shareBtn} ${styles.shareBtnTelegram}`}
            aria-label="المشاركة عبر تلغرام"
          >
            <Send size={16} />
            <span>المشاركة عبر تلغرام</span>
          </button>
          <button
            onClick={() => handleViralShare('general')}
            className={`${styles.shareBtn} ${styles.shareBtnGeneral}`}
            aria-label="نسخ رابط الدعوة للمشاركة"
          >
            <Copy size={16} />
            <span>نسخ نص الدعوة</span>
          </button>
        </div>
      </motion.section>

      {/* Elegant Toast Notifications */}
      <div className={styles.toastContainer}>
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              className={`${styles.toast} ${styles.toastSuccess}`}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            >
              <span>{toast.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
