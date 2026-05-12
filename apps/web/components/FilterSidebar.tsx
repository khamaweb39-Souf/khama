'use client';
import React, { useReducer, useState } from 'react';
import { ChevronDown, ChevronUp, X, Filter, Save, Share2, Info } from 'lucide-react';

// ─── 1. Types & State ────────────────────────────────────────────────────────
type FilterState = {
  fiberTypes: string[];
  gsm: [number, number];
  width: [number, number];
  treatments: string[];
  certifications: string[];
  origins: string[];
  moq: number;
  delivery: string[];
};

type Action = 
  | { type: 'TOGGLE_ARRAY'; field: keyof FilterState; value: string }
  | { type: 'SET_RANGE'; field: 'gsm' | 'width'; value: [number, number] }
  | { type: 'SET_MOQ'; value: number }
  | { type: 'CLEAR_ALL' };

const initialState: FilterState = {
  fiberTypes: [],
  gsm: [50, 800],
  width: [90, 320],
  treatments: [],
  certifications: [],
  origins: [],
  moq: 10,
  delivery: [],
};

function filterReducer(state: FilterState, action: Action): FilterState {
  switch (action.type) {
    case 'TOGGLE_ARRAY':
      const currentArray = state[action.field] as string[];
      return {
        ...state,
        [action.field]: currentArray.includes(action.value)
          ? currentArray.filter((v) => v !== action.value)
          : [...currentArray, action.value]
      };
    case 'SET_RANGE':
      return { ...state, [action.field]: action.value };
    case 'SET_MOQ':
      return { ...state, moq: action.value };
    case 'CLEAR_ALL':
      return initialState;
    default:
      return state;
  }
}

// ─── 2. Data Definitions ─────────────────────────────────────────────────────
const FIBER_TYPES = ['Coton Organic', 'Laine Mérinos', 'Soie', 'Lin', 'Polyester Recyclé', 'Nylon', 'Viscose'];
const TREATMENTS = ['DWR (Imperméable)', 'Anti-UV', 'Anti-bactérien', 'Ignifuge (M1/M2)', 'Anti-froissement'];
const CERTIFICATIONS = ['GOTS', 'OEKO-TEX Standard 100', 'ISO 9001', 'REACH', 'BCI Cotton', 'Bluesign'];
const ORIGINS = ['France', 'Italie', 'Turquie', 'Chine', 'Inde', 'Maroc'];
const DELIVERIES = ['En Stock', 'Précommande', '< 1 Semaine', '1-3 Mois'];

// ─── 3. Sub-components ───────────────────────────────────────────────────────
const Accordion = ({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/60 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex w-full items-center justify-between text-left group"
      >
        <span className="font-bold text-charcoal group-hover:text-gold transition-colors">{title}</span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-muted" /> : <ChevronDown className="w-4 h-4 text-muted" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
        {children}
      </div>
    </div>
  );
};

const Checkbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
  <label className="flex items-center gap-3 cursor-pointer group py-1">
    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all
      ${checked ? 'bg-burgundy border-burgundy' : 'border-muted group-hover:border-gold'}`}>
      {checked && <div className="w-2 h-2 bg-white rounded-sm" />}
    </div>
    <span className={`text-body-small transition-colors ${checked ? 'text-burgundy font-medium' : 'text-charcoal group-hover:text-gold'}`}>
      {label}
    </span>
  </label>
);

// ─── 4. Main Component ───────────────────────────────────────────────────────
export default function FilterSidebar() {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  // Derive active filters count for UI
  const getActiveCount = () => {
    let count = 0;
    count += state.fiberTypes.length + state.treatments.length + state.certifications.length + state.origins.length + state.delivery.length;
    if (state.gsm[0] > 50 || state.gsm[1] < 800) count++;
    if (state.moq > 10) count++;
    return count;
  };

  const handleShare = () => {
    alert("URL des filtres copiée dans le presse-papier !");
  };

  return (
    <div className="w-full lg:w-[320px] bg-white border border-border rounded-xl shadow-sm flex flex-col h-fit sticky top-28 font-body">
      
      {/* Header */}
      <div className="p-5 border-b border-border/60 flex items-center justify-between bg-ecru/30 rounded-t-xl">
        <div className="flex items-center gap-2 text-burgundy">
          <Filter className="w-5 h-5" />
          <h2 className="text-subheading !text-lg mb-0 font-bold">Filtres Experts</h2>
        </div>
        <span className="bg-white border border-gold/30 text-gold text-label px-2 py-1 rounded">
          {getActiveCount()} actifs
        </span>
      </div>

      {/* Active Chips Area */}
      {getActiveCount() > 0 && (
        <div className="p-4 border-b border-border/60 bg-gray-50 flex flex-wrap gap-2">
          {state.fiberTypes.map(f => (
            <span key={f} className="flex items-center gap-1 bg-burgundy/10 text-burgundy text-[11px] px-2 py-1 rounded-full font-medium">
              {f} <X className="w-3 h-3 cursor-pointer" onClick={() => dispatch({ type: 'TOGGLE_ARRAY', field: 'fiberTypes', value: f })} />
            </span>
          ))}
          {/* Add more chips mapping here as needed */}
          <button 
            onClick={() => dispatch({ type: 'CLEAR_ALL' })}
            className="text-[11px] text-muted hover:text-red-500 underline ml-auto"
          >
            Effacer tout
          </button>
        </div>
      )}

      {/* Scrollable Filters List */}
      <div className="px-5 overflow-y-auto max-h-[calc(100vh-280px)] custom-scrollbar">
        
        {/* 1. Fibre */}
        <Accordion title="Type de Fibre" defaultOpen={true}>
          <div className="flex flex-col gap-1">
            {FIBER_TYPES.map(fiber => (
              <Checkbox 
                key={fiber} 
                label={fiber} 
                checked={state.fiberTypes.includes(fiber)}
                onChange={() => dispatch({ type: 'TOGGLE_ARRAY', field: 'fiberTypes', value: fiber })}
              />
            ))}
          </div>
        </Accordion>

        {/* 2. Specs Techniques */}
        <Accordion title="Caractéristiques (GSM & Largeur)">
          <div className="flex flex-col gap-5 pt-2">
            <div>
              <div className="flex justify-between text-caption text-muted mb-2">
                <span>Poids (GSM)</span>
                <span className="text-burgundy">{state.gsm[0]}g - {state.gsm[1]}g</span>
              </div>
              <input 
                type="range" min="50" max="800" step="10" 
                value={state.gsm[1]} 
                onChange={(e) => dispatch({ type: 'SET_RANGE', field: 'gsm', value: [state.gsm[0], parseInt(e.target.value)] })}
                className="w-full accent-gold"
              />
            </div>
            <div>
              <div className="flex justify-between text-caption text-muted mb-2">
                <span>Largeur (cm)</span>
                <span className="text-burgundy">{state.width[0]}cm - {state.width[1]}cm</span>
              </div>
              <input 
                type="range" min="90" max="320" step="5" 
                value={state.width[1]} 
                onChange={(e) => dispatch({ type: 'SET_RANGE', field: 'width', value: [state.width[0], parseInt(e.target.value)] })}
                className="w-full accent-gold"
              />
            </div>
          </div>
        </Accordion>

        {/* 3. Traitements */}
        <Accordion title="Traitements & Finitions">
          <div className="flex flex-col gap-1">
            {TREATMENTS.map(t => (
              <Checkbox 
                key={t} label={t} 
                checked={state.treatments.includes(t)}
                onChange={() => dispatch({ type: 'TOGGLE_ARRAY', field: 'treatments', value: t })}
              />
            ))}
          </div>
        </Accordion>

        {/* 4. Certifications */}
        <Accordion title="Certifications">
          <div className="flex flex-wrap gap-2">
            {CERTIFICATIONS.map(cert => {
              const isActive = state.certifications.includes(cert);
              return (
                <button
                  key={cert}
                  onClick={() => dispatch({ type: 'TOGGLE_ARRAY', field: 'certifications', value: cert })}
                  className={`px-3 py-1.5 rounded text-[11px] font-medium border transition-all
                    ${isActive ? 'bg-success/10 border-success text-success' : 'border-border text-muted hover:border-gold hover:text-gold'}`}
                >
                  {cert}
                </button>
              );
            })}
          </div>
        </Accordion>

        {/* 5. Origine */}
        <Accordion title="Origine & Traçabilité">
          <div className="flex flex-col gap-1">
            {ORIGINS.map(origin => (
              <Checkbox 
                key={origin} label={origin} 
                checked={state.origins.includes(origin)}
                onChange={() => dispatch({ type: 'TOGGLE_ARRAY', field: 'origins', value: origin })}
              />
            ))}
          </div>
        </Accordion>

        {/* 6. Commercial */}
        <Accordion title="Conditions Commerciales">
          <div className="flex flex-col gap-4">
            <div>
               <div className="flex justify-between text-caption text-muted mb-2">
                <span>MOQ (Minimum)</span>
                <span className="font-bold">{state.moq} mètres</span>
              </div>
              <input 
                type="range" min="10" max="10000" step="10" 
                value={state.moq} 
                onChange={(e) => dispatch({ type: 'SET_MOQ', value: parseInt(e.target.value) })}
                className="w-full accent-gold"
              />
            </div>
            
            <div className="pt-2 border-t border-border/50">
               <span className="text-caption text-muted block mb-3">Délai de livraison</span>
               <div className="flex flex-col gap-1">
                 {DELIVERIES.map(d => (
                   <Checkbox 
                     key={d} label={d} 
                     checked={state.delivery.includes(d)}
                     onChange={() => dispatch({ type: 'TOGGLE_ARRAY', field: 'delivery', value: d })}
                   />
                 ))}
               </div>
            </div>
          </div>
        </Accordion>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border/60 bg-white rounded-b-xl flex gap-3">
        <button 
          onClick={handleShare}
          className="flex items-center justify-center gap-2 flex-1 border border-border text-charcoal rounded hover:bg-gray-50 transition-colors py-2 text-sm font-medium"
        >
          <Share2 className="w-4 h-4" /> Partager
        </button>
        <button className="flex items-center justify-center gap-2 flex-1 bg-burgundy text-white rounded hover:bg-gold transition-colors py-2 text-sm font-medium">
          <Save className="w-4 h-4" /> Sauvegarder
        </button>
      </div>

    </div>
  );
}
