import { useState } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Agenda } from './components/Agenda';
import { VisitDetail } from './components/VisitDetail';
import { AttentionForm } from './components/AttentionForm';
import { ClinicalHistory } from './components/ClinicalHistory';

export type Screen = 'login' | 'dashboard' | 'agenda' | 'visit-detail' | 'attention-form' | 'clinical-history';

export interface Visit {
  id: string;
  petName: string;
  ownerName: string;
  time: string;
  type: string;
  status: 'pending' | 'in-progress' | 'completed';
  petType: string;
  breed: string;
  age: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

  const navigateTo = (screen: Screen, visit?: Visit) => {
    if (visit) {
      setSelectedVisit(visit);
    }
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] max-h-[800px] flex flex-col">
        {currentScreen === 'login' && <Login onNavigate={navigateTo} />}
        {currentScreen === 'dashboard' && <Dashboard onNavigate={navigateTo} />}
        {currentScreen === 'agenda' && <Agenda onNavigate={navigateTo} />}
        {currentScreen === 'visit-detail' && selectedVisit && (
          <VisitDetail visit={selectedVisit} onNavigate={navigateTo} />
        )}
        {currentScreen === 'attention-form' && selectedVisit && (
          <AttentionForm visit={selectedVisit} onNavigate={navigateTo} />
        )}
        {currentScreen === 'clinical-history' && selectedVisit && (
          <ClinicalHistory visit={selectedVisit} onNavigate={navigateTo} />
        )}
      </div>
    </div>
  );
}
