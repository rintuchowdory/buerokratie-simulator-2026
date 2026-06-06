import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { translations } from "@/lib/translations";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface Step {
  id: StepId;
  progress: number;
  title: string;
  content: React.ReactNode;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<StepId>(1);
  const [isLoadingStep5, setIsLoadingStep5] = useState(false);
  const [step5Ready, setStep5Ready] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  const t = translations[language];

  // Verzögerungslogik für Schritt 5 mit Countdown
  const [countdown, setCountdown] = useState(0);

  const handleEnterStep5 = () => {
    setIsLoadingStep5(true);
    setStep5Ready(false);
    setCountdown(5);
    // 5 Sekunden Verzögerung
    const timer = setTimeout(() => {
      setStep5Ready(true);
      setIsLoadingStep5(false);
    }, 5000);
    return () => clearTimeout(timer);
  };

  // Countdown-Timer
  useEffect(() => {
    if (countdown > 0 && !step5Ready) {
      const countdownTimer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(countdownTimer);
    }
  }, [countdown, step5Ready]);

  // Wenn wir zu Schritt 5 navigieren, Verzögerung starten
  const handleNextStep = (stepId: StepId) => {
    if (stepId === 5) {
      handleEnterStep5();
    } else {
      setStep5Ready(false);
    }
    setCurrentStep(stepId);
    window.scrollTo(0, 0);
  };

  const steps: Record<StepId, Step> = {
    1: {
      id: 1,
      progress: 15,
      title: t.step1.title,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t.step1.description}
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold mb-2">
                {t.step1.nameLabel}
              </label>
              <input
                type="text"
                placeholder={t.step1.namePlaceholder}
                className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                {t.step1.officeLabel}
              </label>
              <input
                type="text"
                placeholder={t.step1.officePlaceholder}
                className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                {t.step1.purposeLabel}
              </label>
              <select className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background text-foreground">
                <option>{t.step1.purposeOption1}</option>
                <option>{t.step1.purposeOption2}</option>
                <option>{t.step1.purposeOption3}</option>
              </select>
            </div>
          </div>
          <Button
            onClick={() => handleNextStep(2)}
            className={`w-full ${
              theme === "dark"
                ? "bg-slate-700 hover:bg-slate-600"
                : "bg-[#003366] hover:bg-[#002244]"
            }`}
          >
            {t.step1.button}
          </Button>
        </div>
      ),
    },
    2: {
      id: 2,
      progress: 25,
      title: t.step2.title,
      content: (
        <div className="space-y-4">
          <div
            className={`border-l-4 p-4 ${
              theme === "dark"
                ? "bg-red-950 border-red-700"
                : "bg-red-50 border-red-700"
            }`}
          >
            <p
              className={`text-sm font-semibold ${
                theme === "dark" ? "text-red-200" : "text-red-900"
              }`}
            >
              {t.step2.errorTitle}
            </p>
            <p
              className={`text-sm mt-1 ${
                theme === "dark" ? "text-red-300" : "text-red-800"
              }`}
            >
              {t.step2.errorMessage}
            </p>
          </div>
          <p className="text-sm">
            {t.step2.description}
          </p>
          <Button
            onClick={() => handleNextStep(3)}
            className={`w-full ${
              theme === "dark"
                ? "bg-slate-700 hover:bg-slate-600"
                : "bg-[#003366] hover:bg-[#002244]"
            }`}
          >
            {t.step2.button}
          </Button>
        </div>
      ),
    },
    3: {
      id: 3,
      progress: 35,
      title: t.step3.title,
      content: (
        <div className="space-y-4">
          <p className="text-sm">
            {t.step3.description}
          </p>
          <div
            className={`border-l-4 p-4 ${
              theme === "dark"
                ? "bg-blue-950 border-blue-700"
                : "bg-blue-50 border-blue-700"
            }`}
          >
            <p
              className={`text-sm font-semibold ${
                theme === "dark" ? "text-blue-200" : "text-blue-900"
              }`}
            >
              {t.step3.availabilityTitle}
            </p>
            <p
              className={`text-sm mt-1 ${
                theme === "dark" ? "text-blue-300" : "text-blue-800"
              }`}
            >
              {t.step3.availabilityMessage}
            </p>
          </div>
          <p className="text-sm font-semibold">{t.step3.termTitle}</p>
          <div
            className={`p-4 border font-mono text-sm space-y-1 ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            <div>{t.step3.office}</div>
            <div>{t.step3.date}</div>
            <div>{t.step3.time}</div>
          </div>
            <Button
            onClick={() => handleNextStep(4)}
            className={`w-full ${
              theme === "dark"
                ? "bg-slate-700 hover:bg-slate-600"
                : "bg-[#003366] hover:bg-[#002244]"
            }`}
          >
            {t.step3.button}
          </Button>
        </div>
      ),
    },
    4: {
      id: 4,
      progress: 45,
      title: t.step4.title,
      content: (
        <div className="space-y-4">
          <div
            className={`border-l-4 p-4 ${
              theme === "dark"
                ? "bg-red-950 border-red-700"
                : "bg-red-50 border-red-700"
            }`}
          >
            <p
              className={`text-sm font-semibold ${
                theme === "dark" ? "text-red-200" : "text-red-900"
              }`}
            >
              {t.step4.warningTitle}
            </p>
            <p
              className={`text-sm mt-1 ${
                theme === "dark" ? "text-red-300" : "text-red-800"
              }`}
            >
              {t.step4.warningMessage}
            </p>
          </div>
          <p className="text-sm">
            {t.step4.description}
          </p>
          <Button
            onClick={() => handleNextStep(5)}
            className={`w-full ${
              theme === "dark"
                ? "bg-slate-700 hover:bg-slate-600"
                : "bg-[#003366] hover:bg-[#002244]"
            }`}
          >
            {t.step4.button}
          </Button>
        </div>
      ),
    },
    5: {
      id: 5,
      progress: 60,
      title: t.step5.title,
      content: (
        <div className="space-y-6 text-center py-8">
          <div className="flex justify-center">
            <div
              className={`w-12 h-12 border-4 rounded-full animate-spin ${
                theme === "dark"
                  ? "border-slate-600 border-t-slate-400"
                  : "border-gray-300 border-t-[#003366]"
              }`}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {t.step5.heading}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t.step5.description}
            </p>
            <p className={`text-xs mt-3 ${theme === "dark" ? "text-slate-500" : "text-gray-500"}`}>
              {t.step5.warning}
            </p>
          </div>
          <Button
            onClick={() => handleNextStep(6)}
            disabled={!step5Ready}
            className={`w-full ${
              !step5Ready
                ? "opacity-50 cursor-not-allowed"
                : ""
            } ${
              theme === "dark"
                ? "bg-slate-700 hover:bg-slate-600"
                : "bg-[#003366] hover:bg-[#002244]"
            }`}
          >
            {step5Ready ? t.step5.button : `${t.step5.button} (${countdown}s)`}
          </Button>
        </div>
      ),
    },
    6: {
      id: 6,
      progress: 85,
      title: t.step6.title,
      content: (
        <div className="space-y-4">
          <p className="text-sm">
            {t.step6.description}
          </p>
          <ul className="text-sm space-y-2 ml-4 list-disc">
            <li>{t.step6.item1}</li>
            <li>{t.step6.item2}</li>
            <li>{t.step6.item3}</li>
          </ul>
          <Button
            onClick={() => handleNextStep(7)}
            className={`w-full ${
              theme === "dark"
                ? "bg-slate-700 hover:bg-slate-600"
                : "bg-[#003366] hover:bg-[#002244]"
            }`}
          >
            {t.step6.button}
          </Button>
        </div>
      ),
    },
    7: {
      id: 7,
      progress: 100,
      title: t.step7.title,
      content: (
        <div className="space-y-6 text-center py-8">
          <h3 className="text-lg font-semibold text-green-700">
            {t.step7.heading}
          </h3>
          <p className="text-sm">
            {t.step7.description}
          </p>
          <div
            className={`p-6 text-center border-l-4 ${
              theme === "dark"
                ? "bg-slate-800 border-slate-600"
                : "bg-blue-50 border-blue-700"
            }`}
          >
            <p className={`text-xs uppercase tracking-wide mb-2 ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
              {t.step7.statsLabel}
            </p>
            <div className="text-4xl font-bold text-red-700 mb-1">487 Tage</div>
            <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
              {t.step7.processingTime}
            </p>
          </div>
          <p className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-gray-500"}`}>
            {t.step7.warning}
          </p>
          <Button
            onClick={() => {
              handleNextStep(1);
              setStep5Ready(false);
            }}
            className={`w-full ${
              theme === "dark"
                ? "bg-slate-700 hover:bg-slate-600"
                : "bg-[#003366] hover:bg-[#002244]"
            }`}
          >
            {t.step7.button}
          </Button>
        </div>
      ),
    },
  };

  const step = steps[currentStep];

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-900" : "bg-gray-50"}`}>
      {/* Header */}
      <header
        className={`border-b-4 border-yellow-400 ${
          theme === "dark"
            ? "bg-slate-800 text-white"
            : "bg-[#003366] text-white"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <span className="text-2xl">🇩🇪</span>
              <div>
                <h1 className="text-xl font-bold tracking-wide">{t.header.title}</h1>
                <p className="text-xs opacity-90">{t.header.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className={`px-3 py-2 rounded-md transition-colors text-sm font-semibold ${
                  theme === "dark"
                    ? "bg-slate-700 hover:bg-slate-600"
                    : "bg-[#002244] hover:bg-[#001a33]"
                }`}
                title={language === "de" ? "Switch to English" : "Zu Deutsch wechseln"}
              >
                {language === "de" ? "EN" : "DE"}
              </button>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-md transition-colors ${
                  theme === "dark"
                    ? "bg-slate-700 hover:bg-slate-600"
                    : "bg-[#002244] hover:bg-[#001a33]"
                }`}
                title={theme === "dark" ? "Tagmodus" : "Nachtschicht-Modus"}
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <nav className="text-xs opacity-75 flex gap-6 mt-4">
            <span>{t.header.help}</span>
            <span>{t.header.accessibility}</span>
            <span>{t.header.language}</span>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
          {t.breadcrumb}
        </p>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-12">
        <div
          className={`border p-8 rounded-none ${
            theme === "dark"
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-300"
          }`}
        >
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold">
                {t.progress} <span>{step.progress}%</span>
              </label>
            </div>
            <div
              className={`w-full h-3 ${
                theme === "dark" ? "bg-slate-700" : "bg-gray-200"
              }`}
            >
              <div
                className={`h-full transition-all duration-700 ${
                  theme === "dark" ? "bg-slate-500" : "bg-[#003366]"
                }`}
                style={{ width: `${step.progress}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <h1
              className={`text-2xl font-bold border-b-2 pb-3 mb-6 ${
                theme === "dark"
                  ? "text-slate-100 border-slate-600"
                  : "text-[#003366] border-[#003366]"
              }`}
            >
              {step.title}
            </h1>
            {step.content}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`border-t ${
          theme === "dark"
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-gray-300"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div
            className={`flex gap-6 text-xs mb-4 ${
              theme === "dark" ? "text-slate-400" : "text-gray-700"
            }`}
          >
            <span className="underline cursor-pointer">{t.footer.imprint}</span>
            <span className="underline cursor-pointer">{t.footer.privacy}</span>
            <span className="underline cursor-pointer">{t.footer.contact}</span>
            <span className="underline cursor-pointer">{t.footer.legalNotice}</span>
          </div>
          <p className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-gray-600"}`}>
            {t.footer.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}
