import { Button } from "@/components/ui/button";
import { useState } from "react";

type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface Step {
  id: StepId;
  progress: number;
  title: string;
  content: React.ReactNode;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<StepId>(1);

  const steps: Record<StepId, Step> = {
    1: {
      id: 1,
      progress: 15,
      title: "Abschnitt A: Erfassung der Stammdaten",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Bitte füllen Sie alle Pflichtfelder gemäß § 3 VwVfG wahrheitsgemäß aus.
          </p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Nachname, Vorname (gemäß Ausweisdokument):
              </label>
              <input
                type="text"
                placeholder="MUSTERMANN, ERIKA"
                className="w-full px-3 py-2 border border-input rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Zuständiges Finanzamt:
              </label>
              <input
                type="text"
                placeholder="FA Berlin-Mitte"
                className="w-full px-3 py-2 border border-input rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Zweck des Antrags:
              </label>
              <select className="w-full px-3 py-2 border border-input rounded-md text-sm">
                <option>Erteilung einer Berechtigung</option>
                <option>Verlängerung einer Frist</option>
                <option>Einspruch gegen Nichtbescheidung</option>
              </select>
            </div>
          </div>
          <Button
            onClick={() => setCurrentStep(2)}
            className="w-full bg-[#003366] hover:bg-[#002244]"
          >
            Eingaben validieren
          </Button>
        </div>
      ),
    },
    2: {
      id: 2,
      progress: 25,
      title: "Systemvalidierung fehlgeschlagen",
      content: (
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-700 p-4">
            <p className="text-sm text-red-900 font-semibold">
              Systemvalidierung fehlgeschlagen:
            </p>
            <p className="text-sm text-red-800 mt-1">
              Das Dokument "Nachweis der steuerlichen Unbedenklichkeit (Anlage 4c)" wurde nicht im System gefunden.
            </p>
          </div>
          <p className="text-sm">
            Ihr Antrag kann ohne dieses Dokument nicht prozessiert werden. Bitte laden Sie die Anlage erneut herunter.
          </p>
          <Button
            onClick={() => setCurrentStep(3)}
            className="w-full bg-[#003366] hover:bg-[#002244]"
          >
            Anlage 4c (PDF, 4.2 MB) generieren
          </Button>
        </div>
      ),
    },
    3: {
      id: 3,
      progress: 35,
      title: "Abschnitt B: Identitätsprüfung",
      content: (
        <div className="space-y-4">
          <p className="text-sm">
            Für das gewählte Verfahren ist eine persönliche Vorsprache in der Dienststelle zwingend erforderlich (§ 9 Abs. 1 Nr. 4 DigG).
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-700 p-4">
            <p className="text-sm font-semibold text-blue-900">Verfügbarkeit:</p>
            <p className="text-sm text-blue-800 mt-1">
              Aufgrund hoher Auslastung sind derzeit keine Termine in Ihrer Region verfügbar.
            </p>
          </div>
          <p className="text-sm font-semibold">Nächster bundesweit verfügbarer Termin:</p>
          <div className="bg-gray-100 p-4 border border-gray-300 font-mono text-sm space-y-1">
            <div>Dienststelle: Außenstelle Helgoland-Süd</div>
            <div>Datum: 14. September 2026</div>
            <div>Uhrzeit: 04:15 Uhr (Kernarbeitszeit)</div>
          </div>
          <Button
            onClick={() => setCurrentStep(4)}
            className="w-full bg-[#003366] hover:bg-[#002244]"
          >
            Termin verbindlich buchen
          </Button>
        </div>
      ),
    },
    4: {
      id: 4,
      progress: 45,
      title: "Fristablauf-Warnung",
      content: (
        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-700 p-4">
            <p className="text-sm text-red-900 font-semibold">
              Fristablauf-Warnung:
            </p>
            <p className="text-sm text-red-800 mt-1">
              Während der Terminbuchung ist die Gültigkeit Ihres eingereichten Wohnsitznachweises abgelaufen (Gültigkeit max. 48 Stunden).
            </p>
          </div>
          <p className="text-sm">
            Bitte fordern Sie bei Ihrem lokalen Einwohnermeldeamt eine "Aktualisierte Bescheinigung zur Vorlage bei Bundesbehörden" an.
          </p>
          <Button
            onClick={() => setCurrentStep(5)}
            className="w-full bg-[#003366] hover:bg-[#002244]"
          >
            Erneute Einreichung bestätigen
          </Button>
        </div>
      ),
    },
    5: {
      id: 5,
      progress: 60,
      title: "Verwaltungsverfahren eingeleitet",
      content: (
        <div className="space-y-6 text-center py-8">
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-[#003366] rounded-full animate-spin" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Verwaltungsverfahren eingeleitet
            </h3>
            <p className="text-sm text-muted-foreground">
              Ihre Daten werden mit dem Zentralregister abgeglichen. Dieser Vorgang kann je nach Netzauslastung mehrere Minuten dauern.
            </p>
            <p className="text-xs text-gray-500 mt-3">
              Bitte schließen Sie dieses Fenster nicht.
            </p>
          </div>
          <Button
            onClick={() => setCurrentStep(6)}
            className="w-full bg-[#003366] hover:bg-[#002244]"
          >
            Prüfstatus abrufen
          </Button>
        </div>
      ),
    },
    6: {
      id: 6,
      progress: 85,
      title: "Nachforderung von Mitwirkungspflichten",
      content: (
        <div className="space-y-4">
          <p className="text-sm">
            Der zuständige Sachbearbeiter hat Ihren Antrag gesichtet. Zur abschließenden Bescheidung fehlen folgende Unterlagen:
          </p>
          <ul className="text-sm space-y-2 ml-4 list-disc">
            <li>Beglaubigte Kopie der Geburtsurkunde der Großmutter mütterlicherseits</li>
            <li>Nachweis über die Zahlung der Verwaltungsgebühr (14,20 €) per Verrechnungsscheck</li>
            <li>Handgeschriebene Begründung der Dringlichkeit (min. 500 Wörter)</li>
          </ul>
          <Button
            onClick={() => setCurrentStep(7)}
            className="w-full bg-[#003366] hover:bg-[#002244]"
          >
            Unterlagen digital nachreichen
          </Button>
        </div>
      ),
    },
    7: {
      id: 7,
      progress: 100,
      title: "Verfahren abgeschlossen",
      content: (
        <div className="space-y-6 text-center py-8">
          <h3 className="text-lg font-semibold text-green-700">
            Verfahren abgeschlossen
          </h3>
          <p className="text-sm">
            Ihr Antrag wurde erfolgreich in das Langzeitarchiv überführt. Ein Bescheid wird Ihnen auf dem Postweg (Zustellungsurkunde) übermittelt.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-700 p-6 text-center">
            <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">
              Statistische Auswertung
            </p>
            <div className="text-4xl font-bold text-red-700 mb-1">487 Tage</div>
            <p className="text-xs text-gray-600">Gesamtbearbeitungsdauer</p>
          </div>
          <p className="text-xs text-gray-500">
            Hinweis: Die Einlegung eines Widerspruchs verlängert die Bearbeitungszeit um voraussichtlich 24 Monate.
          </p>
          <Button
            onClick={() => {
              setCurrentStep(1);
              window.scrollTo(0, 0);
            }}
            className="w-full bg-[#003366] hover:bg-[#002244]"
          >
            Neuen Vorgang anlegen
          </Button>
        </div>
      ),
    },
  };

  const step = steps[currentStep];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#003366] text-white border-b-4 border-yellow-400">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-2xl">🇩🇪</span>
            <div>
              <h1 className="text-xl font-bold tracking-wide">Service-Portal Bund</h1>
              <p className="text-xs opacity-90">Digitales Verwaltungsmanagement</p>
            </div>
          </div>
          <nav className="text-xs opacity-75 flex gap-6 mt-4">
            <span>Hilfe</span>
            <span>Barrierefreiheit</span>
            <span>DE</span>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <p className="text-xs text-gray-600">
          Startseite &gt; Anträge &gt; Bürgerdienste &gt; Formular 42-B
        </p>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-12">
        <div className="bg-white border border-gray-300 p-8 rounded-none">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold">
                Bearbeitungsfortschritt: <span>{step.progress}%</span>
              </label>
            </div>
            <div className="w-full h-3 bg-gray-200">
              <div
                className="h-full bg-[#003366] transition-all duration-700"
                style={{ width: `${step.progress}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <h1 className="text-2xl font-bold text-[#003366] border-b-2 border-[#003366] pb-3 mb-6">
              {step.title}
            </h1>
            {step.content}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-300 mt-12">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex gap-6 text-xs mb-4 text-gray-700">
            <span className="underline cursor-pointer">Impressum</span>
            <span className="underline cursor-pointer">Datenschutz</span>
            <span className="underline cursor-pointer">Kontakt</span>
            <span className="underline cursor-pointer">Rechtsbehelfsbelehrung</span>
          </div>
          <p className="text-xs text-gray-600">
            &copy; 2026 Bundesamt für digitale Verzögerung (BaDV). Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
}
