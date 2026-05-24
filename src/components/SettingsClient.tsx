"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Bell, BellOff, Shield, Trash2, Download,
  Moon, Volume2, VolumeX, Send, CheckCircle, AlertCircle, XCircle, Database,
} from 'lucide-react';
import { db } from '../lib/db';

interface ReminderPrefs {
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  morningEnabled: boolean;
  morningTime: string;
  eveningEnabled: boolean;
  eveningTime: string;
  sleepEnabled: boolean;
  sleepTime: string;
  fridayEnabled: boolean;
  ramadanMode: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
}

const DEFAULT_PREFS: ReminderPrefs = {
  notificationsEnabled: true,
  soundEnabled: true,
  morningEnabled: true,
  morningTime: '06:00',
  eveningEnabled: true,
  eveningTime: '17:00',
  sleepEnabled: false,
  sleepTime: '22:00',
  fridayEnabled: true,
  ramadanMode: false,
  quietHoursEnabled: false,
  quietHoursStart: '23:00',
  quietHoursEnd: '06:00',
};

const TEST_NOTIFICATIONS = [
  {
    id: 'morning',
    title: 'تذكير أذكار الصباح 🌅',
    body: 'ابدأ يومك بسكينة وراحة بال. حان وقت أذكار الصباح.',
    icon: '🌅',
  },
  {
    id: 'evening',
    title: 'تذكير أذكار المساء 🌇',
    body: 'خذ لحظة هادئة لقراءة أذكار المساء.',
    icon: '🌇',
  },
  {
    id: 'sleep',
    title: 'أذكار النوم 🌙',
    body: 'نم على ذكر الله. أذكار النوم تنتظرك.',
    icon: '🌙',
  },
  {
    id: 'friday',
    title: 'تذكير يوم الجمعة 📖',
    body: 'أكثر من الصلاة على النبي ﷺ ولا تنسَ قراءة سورة الكهف.',
    icon: '📖',
  },
];

type PermissionStatus = NotificationPermission | 'unsupported';

const playNotificationSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    const playNote = (freq: number, startTime: number, duration: number) => {
      const osc = oscGenerator(ctx, freq, startTime);
      const gainNode = ctx.createGain();
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const oscGenerator = (c: AudioContext, f: number, s: number) => {
      const o = c.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(f, s);
      return o;
    };

    const now = ctx.currentTime;
    // Play E5 (659.25Hz) and then A5 (880Hz) shortly after for a pleasant bell effect
    playNote(659.25, now, 0.8);
    playNote(880, now + 0.12, 1.2);
  } catch (e) {
    console.warn('Web Audio API chime error:', e);
  }
};

export default function SettingsClient() {
  const [prefs, setPrefs] = useState<ReminderPrefs>(DEFAULT_PREFS);
  const [notifPermission, setNotifPermission] = useState<PermissionStatus>('default');
  const [saved, setSaved] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const [testType, setTestType] = useState(0);

  useEffect(() => {
    (async () => {
      const stored = await db.preferences.get('reminderPrefs');
      if (stored) {
        setPrefs({ ...DEFAULT_PREFS, ...stored.value });
      }
      if (typeof Notification !== 'undefined') {
        setNotifPermission(Notification.permission);
      } else {
        setNotifPermission('unsupported');
      }
    })();
  }, []);

  const savePrefs = useCallback(async (newPrefs: ReminderPrefs) => {
    setPrefs(newPrefs);
    await db.preferences.put({ key: 'reminderPrefs', value: newPrefs });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, []);

  const requestNotifPermission = async () => {
    if (typeof Notification === 'undefined') return;
    const permission = await Notification.requestPermission();
    setNotifPermission(permission);
    if (permission === 'granted') {
      savePrefs({ ...prefs, notificationsEnabled: true });
    }
  };

  const sendTestNotification = async () => {
    if (typeof Notification === 'undefined') {
      alert('عذراً، متصفحك لا يدعم نظام الإشعارات.');
      return;
    }
    if (Notification.permission !== 'granted') {
      alert('يرجى تفعيل إذن الإشعارات أولاً لتتمكن من تلقي التنبيهات.');
      return;
    }

    const sample = TEST_NOTIFICATIONS[testType % TEST_NOTIFICATIONS.length];
    const options = {
      body: sample.body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'jari-test',
      dir: 'rtl' as const,
      lang: 'ar',
      silent: true, // We play our custom high-quality Web Audio chime instead of OS chime
    };

    // Play high quality chime if enabled
    if (prefs.soundEnabled) {
      playNotificationSound();
    }

    try {
      let shown = false;

      // 1. Try to display notification via Service Worker registration
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        if (registration && 'showNotification' in registration) {
          await registration.showNotification(sample.title, options);
          shown = true;
        }
      }

      // 2. Fallback to standard window constructor
      if (!shown) {
        const notif = new Notification(sample.title, {
          ...options,
          silent: !prefs.soundEnabled, // fallback to standard silent setting if no audio API
        });
        notif.onclick = () => {
          window.focus();
          notif.close();
        };
      }

      setTestSent(true);
      setTestType((prev) => prev + 1);
      setTimeout(() => setTestSent(false), 3000);
    } catch (err) {
      console.error('Error triggering notification:', err);
      // Fallback display for users when browser notification fails (e.g. Chrome android bug or OS DND)
      alert(`تنبيه تجريبي: ${sample.title}\n\n${sample.body}`);
      
      setTestSent(true);
      setTestType((prev) => prev + 1);
      setTimeout(() => setTestSent(false), 3000);
    }
  };

  const handleExportData = async () => {
    const allProgress = await db.progress.toArray();
    const allStreaks = await db.streaks.toArray();
    const allPrefs = await db.preferences.toArray();
    const exportData = {
      exportedAt: new Date().toISOString(),
      progress: allProgress,
      streaks: allStreaks,
      preferences: allPrefs,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jari-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearData = async () => {
    if (confirm('هل أنت متأكد من مسح جميع البيانات؟ لا يمكن التراجع عن هذا الإجراء.')) {
      await db.progress.clear();
      await db.streaks.clear();
      await db.preferences.clear();
      window.location.reload();
    }
  };

  const handleGenerateMockData = async () => {
    if (confirm('هل ترغب في توليد بيانات إنجاز عشوائية لآخر 40 يوماً لتجربة لوحة المتابعة والمؤشرات؟')) {
      await db.streaks.clear();
      
      const mockStreaks = [];
      const today = new Date();
      
      for (let i = 40; i >= 0; i--) {
        const d = new Date(today.getTime() - i * 86400000);
        const dateStr = d.toISOString().split('T')[0];
        
        // Randomly set completions (e.g. 70% morning, 60% evening)
        const completedMorning = Math.random() > 0.3;
        const completedEvening = Math.random() > 0.4;
        const tasbeehCount = Math.floor(Math.random() * 150);
        
        if (completedMorning || completedEvening || tasbeehCount > 0) {
          mockStreaks.push({
            date: dateStr,
            completedMorning,
            completedEvening,
            tasbeehCount,
          });
        }
      }
      
      // Save all mock streaks
      for (const streak of mockStreaks) {
        await db.streaks.put(streak);
      }
      
      alert('تم توليد البيانات التجريبية بنجاح! انتقل للصفحة الرئيسية لمشاهدة الإحصائيات ورسم المتابعة.');
      window.location.href = '/';
    }
  };

  const Toggle = ({ checked, onChange, disabled }: { checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }) => (
    <label className={`toggle-switch ${disabled ? 'toggle-disabled' : ''}`}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} disabled={disabled} />
      <span className="toggle-slider" />
    </label>
  );

  const PermissionBadge = () => {
    if (notifPermission === 'unsupported') {
      return (
        <span className="notif-badge notif-badge-unsupported">
          <XCircle size={14} />
          غير مدعوم
        </span>
      );
    }
    if (notifPermission === 'granted') {
      return (
        <span className="notif-badge notif-badge-granted">
          <CheckCircle size={14} />
          مفعّل
        </span>
      );
    }
    if (notifPermission === 'denied') {
      return (
        <span className="notif-badge notif-badge-denied">
          <XCircle size={14} />
          مرفوض
        </span>
      );
    }
    return (
      <span className="notif-badge notif-badge-default">
        <AlertCircle size={14} />
        غير مفعّل
      </span>
    );
  };

  // Current test notification preview
  const previewNotif = TEST_NOTIFICATIONS[testType % TEST_NOTIFICATIONS.length];

  return (
    <div className="settings-page animate-fade-in">
      <div className="page-header">
        <Link href="/" className="btn-back">
          <ArrowRight size={24} />
        </Link>
        <h1 className="page-title">الإعدادات</h1>
      </div>

      {/* ============================== */}
      {/* Notifications & Testing        */}
      {/* ============================== */}
      <div className="settings-section">
        <h2 className="settings-section-title">
          <Bell size={20} />
          الإشعارات
        </h2>

        {/* Permission Status */}
        <div className="settings-card glass">
          <div className="settings-row">
            <div>
              <div className="settings-row-label">حالة الإذن</div>
              <div className="settings-row-desc">
                {notifPermission === 'granted'
                  ? 'الإشعارات مفعّلة وجاهزة للعمل'
                  : notifPermission === 'denied'
                  ? 'تم رفض الإذن. يمكنك تغييره من إعدادات المتصفح'
                  : notifPermission === 'unsupported'
                  ? 'متصفحك لا يدعم الإشعارات'
                  : 'فعّل الإشعارات لتلقي التذكيرات في أوقاتها'
                }
              </div>
            </div>
            <PermissionBadge />
          </div>
          {notifPermission === 'default' && (
            <button
              className="btn-primary"
              onClick={requestNotifPermission}
              style={{ marginTop: '12px', fontSize: '0.9rem', padding: '8px 20px', width: '100%' }}
            >
              <Bell size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '6px' }} />
              تفعيل الإشعارات
            </button>
          )}
        </div>

        {/* Master Toggle */}
        <div className="settings-card glass">
          <div className="settings-row">
            <div>
              <div className="settings-row-label">
                {prefs.notificationsEnabled ? <Bell size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '6px' }} /> : <BellOff size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '6px' }} />}
                تفعيل جميع الإشعارات
              </div>
              <div className="settings-row-desc">تحكم رئيسي في جميع التذكيرات</div>
            </div>
            <Toggle
              checked={prefs.notificationsEnabled}
              onChange={(v) => savePrefs({ ...prefs, notificationsEnabled: v })}
            />
          </div>
        </div>

        {/* Sound Toggle */}
        <div className="settings-card glass">
          <div className="settings-row">
            <div>
              <div className="settings-row-label">
                {prefs.soundEnabled
                  ? <Volume2 size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '6px' }} />
                  : <VolumeX size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '6px' }} />
                }
                صوت الإشعارات
              </div>
              <div className="settings-row-desc">تشغيل صوت هادئ مع كل تذكير</div>
            </div>
            <Toggle
              checked={prefs.soundEnabled}
              onChange={(v) => savePrefs({ ...prefs, soundEnabled: v })}
              disabled={!prefs.notificationsEnabled}
            />
          </div>
        </div>

        {/* Test Notification Section */}
        <div className="notif-test-section glass">
          <h3 className="notif-test-title">
            <Send size={18} />
            تجربة الإشعارات
          </h3>
          <p className="notif-test-desc">
            أرسل إشعاراً تجريبياً للتأكد من عمل الإشعارات بشكل صحيح على جهازك.
          </p>

          {/* Preview Card */}
          <div className="notif-preview">
            <div className="notif-preview-header">
              <span className="notif-preview-app">جاري</span>
              <span className="notif-preview-time">الآن</span>
            </div>
            <div className="notif-preview-title">{previewNotif.title}</div>
            <div className="notif-preview-body">{previewNotif.body}</div>
          </div>

          <button
            className="btn-primary notif-test-btn"
            onClick={sendTestNotification}
            disabled={notifPermission !== 'granted'}
            style={{ width: '100%', marginTop: '14px', position: 'relative' }}
          >
            {testSent ? (
              <>
                <CheckCircle size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '6px' }} />
                تم الإرسال بنجاح ✓
              </>
            ) : (
              <>
                <Send size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '6px' }} />
                إرسال إشعار تجريبي
              </>
            )}
          </button>
          {notifPermission !== 'granted' && notifPermission !== 'unsupported' && (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center' }}>
              يجب تفعيل الإشعارات أولاً لتجربة هذه الميزة
            </p>
          )}
        </div>
      </div>

      {/* ============================== */}
      {/* Reminder Times                 */}
      {/* ============================== */}
      <div className="settings-section">
        <h2 className="settings-section-title">
          ⏰ مواقيت التذكيرات
        </h2>

        <div className="settings-card glass">
          <div className="settings-row">
            <div>
              <div className="settings-row-label">🌅 أذكار الصباح</div>
              <div className="settings-row-desc">تذكير يومي بعد صلاة الفجر</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {prefs.morningEnabled && (
                <input
                  type="time"
                  className="time-input"
                  value={prefs.morningTime}
                  onChange={(e) => savePrefs({ ...prefs, morningTime: e.target.value })}
                  disabled={!prefs.notificationsEnabled}
                />
              )}
              <Toggle
                checked={prefs.morningEnabled}
                onChange={(v) => savePrefs({ ...prefs, morningEnabled: v })}
                disabled={!prefs.notificationsEnabled}
              />
            </div>
          </div>
        </div>

        <div className="settings-card glass">
          <div className="settings-row">
            <div>
              <div className="settings-row-label">🌇 أذكار المساء</div>
              <div className="settings-row-desc">تذكير يومي قبيل المغرب</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {prefs.eveningEnabled && (
                <input
                  type="time"
                  className="time-input"
                  value={prefs.eveningTime}
                  onChange={(e) => savePrefs({ ...prefs, eveningTime: e.target.value })}
                  disabled={!prefs.notificationsEnabled}
                />
              )}
              <Toggle
                checked={prefs.eveningEnabled}
                onChange={(v) => savePrefs({ ...prefs, eveningEnabled: v })}
                disabled={!prefs.notificationsEnabled}
              />
            </div>
          </div>
        </div>

        <div className="settings-card glass">
          <div className="settings-row">
            <div>
              <div className="settings-row-label">🌙 أذكار النوم</div>
              <div className="settings-row-desc">تذكير قبل النوم</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {prefs.sleepEnabled && (
                <input
                  type="time"
                  className="time-input"
                  value={prefs.sleepTime}
                  onChange={(e) => savePrefs({ ...prefs, sleepTime: e.target.value })}
                  disabled={!prefs.notificationsEnabled}
                />
              )}
              <Toggle
                checked={prefs.sleepEnabled}
                onChange={(v) => savePrefs({ ...prefs, sleepEnabled: v })}
                disabled={!prefs.notificationsEnabled}
              />
            </div>
          </div>
        </div>

        <div className="settings-card glass">
          <div className="settings-row">
            <div>
              <div className="settings-row-label">📖 تذكير الجمعة</div>
              <div className="settings-row-desc">سورة الكهف والصلاة على النبي ﷺ</div>
            </div>
            <Toggle
              checked={prefs.fridayEnabled}
              onChange={(v) => savePrefs({ ...prefs, fridayEnabled: v })}
              disabled={!prefs.notificationsEnabled}
            />
          </div>
        </div>

        <div className="settings-card glass">
          <div className="settings-row">
            <div>
              <div className="settings-row-label">🌙 وضع رمضان</div>
              <div className="settings-row-desc">تذكيرات خاصة بشهر رمضان</div>
            </div>
            <Toggle
              checked={prefs.ramadanMode}
              onChange={(v) => savePrefs({ ...prefs, ramadanMode: v })}
              disabled={!prefs.notificationsEnabled}
            />
          </div>
        </div>
      </div>

      {/* ============================== */}
      {/* Quiet Hours                    */}
      {/* ============================== */}
      <div className="settings-section">
        <h2 className="settings-section-title">
          <Moon size={20} />
          ساعات الهدوء
        </h2>
        <div className="settings-card glass">
          <div className="settings-row" style={{ marginBottom: prefs.quietHoursEnabled ? '14px' : '0' }}>
            <div>
              <div className="settings-row-label">إيقاف الإشعارات مؤقتاً</div>
              <div className="settings-row-desc">لن تُرسل إشعارات خلال هذه الفترة</div>
            </div>
            <Toggle
              checked={prefs.quietHoursEnabled}
              onChange={(v) => savePrefs({ ...prefs, quietHoursEnabled: v })}
              disabled={!prefs.notificationsEnabled}
            />
          </div>
          {prefs.quietHoursEnabled && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                من
                <input type="time" className="time-input" style={{ marginRight: '6px' }} value={prefs.quietHoursStart} onChange={(e) => savePrefs({ ...prefs, quietHoursStart: e.target.value })} />
              </label>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                إلى
                <input type="time" className="time-input" style={{ marginRight: '6px' }} value={prefs.quietHoursEnd} onChange={(e) => savePrefs({ ...prefs, quietHoursEnd: e.target.value })} />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* ============================== */}
      {/* Privacy                        */}
      {/* ============================== */}
      <div className="settings-section">
        <h2 className="settings-section-title">
          <Shield size={20} />
          الخصوصية والبيانات
        </h2>
        <div className="privacy-card glass">
          <p><strong>جاري</strong> يحترم خصوصيتك.</p>
          <p>• جميع بياناتك مخزنة محلياً على جهازك فقط.</p>
          <p>• لا نجمع أي بيانات شخصية.</p>
          <p>• لا توجد إعلانات أو تتبع.</p>
          <p>• التطبيق يعمل بالكامل بدون إنترنت.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={handleGenerateMockData} style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
            <Database size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '6px' }} />
            توليد بيانات تجريبية
          </button>
          <button className="btn-secondary" onClick={handleExportData}>
            <Download size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '6px' }} />
            تصدير البيانات
          </button>
          <button className="btn-danger" onClick={handleClearData}>
            <Trash2 size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '6px' }} />
            مسح جميع البيانات
          </button>
        </div>
      </div>

      {/* Saved Indicator */}
      {saved && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--primary)',
          color: 'white',
          padding: '10px 24px',
          borderRadius: '100px',
          fontWeight: '700',
          fontSize: '0.9rem',
          boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.4)',
          zIndex: 100,
          animation: 'fadeIn 0.3s ease',
        }}>
          ✓ تم الحفظ
        </div>
      )}
    </div>
  );
}
