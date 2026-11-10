// pulse.jsx — "Pulse" tab: fast markets that settle in minutes
const PULSE_EVENTS = [
  { id:'p1', sport:'football', league:'Brazil / Brasileirão Série A', minute:"63'", home:'Flamengo', away:'Palmeiras', homeLogo:'assets/logo-flamengo.svg', awayLogo:'assets/logo-palmeiras.svg', hs:1, as:1,
    window:{ label:'Next 5 minutes', secs:300, left:222 },
    markets:[['Goal','4.50','1.15'],['Corner','2.10','1.65'],['Card','6.00','1.08']] },
  { id:'p2', sport:'football', league:'England / Premier League', minute:"38'", home:'Arsenal', away:'Chelsea', homeLogo:'assets/logo-arsenal.svg', awayLogo:'assets/logo-chelsea.svg', hs:0, as:0,
    window:{ label:'Next 5 minutes', secs:300, left:48 },
    markets:[['Goal','5.20','1.12'],['Corner','1.95','1.80'],['Card','5.50','1.10']] },
  { id:'p3', sport:'basketball', league:'NBA', minute:'Q3 · 04:12', home:'Lakers', away:'Celtics', hs:78, as:81,
    window:{ label:'Next 2 minutes', secs:120, left:95 },
    markets:[['6+ points (either)','1.72','2.05'],['3-pointer made','1.30','3.40'],['Foul called','1.18','4.60']] },
  { id:'p4', sport:'tennis', league:'ATP Shanghai', minute:'Set 2 · 4–3', home:'Sinner', away:'Alcaraz', hs:'6 4', as:'4 3',
    window:{ label:'This game', secs:null, left:null, status:'Sinner serving · 30–15' },
    markets:[['Break of serve','3.80','1.25'],['Goes to deuce','2.40','1.55'],['Love game','9.00','1.04']] },
];
const PULSE_ICONS = { football:'assets/icon-football-color.svg', tennis:'assets/icon-tennis-color.svg', basketball:'assets/icon-basketball-color.svg' };
const PULSE_LABELS = { football:'Football', tennis:'Tennis', basketball:'Basketball' };

function PulseTeam({ name, logo }){
  return <span style={{ display:'flex', alignItems:'center', gap:8, minWidth:0 }}>{logo && <img src={asset(logo)} width="20" height="20" alt="" style={{ display:'block', flex:'0 0 auto', objectFit:'contain' }}/>}<span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{name}</span></span>;
}
function pulseFmt(s){ const m=Math.floor(s/60), r=s%60; return String(m).padStart(2,'0')+':'+String(r).padStart(2,'0'); }
function pulseJitter(p){ const v=parseFloat(p)*(0.9+Math.random()*0.2); return Math.max(1.01,v).toFixed(2); }

function PulseIcon({ size=18, color='currentColor' }){
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{display:'block'}}><path d="M2 12h4l2.5-6 4 12 3-8 1.5 2H22" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
}

function PulseOdd({ label, price, selected, onClick, disabled }){
  return (
    <button onClick={onClick} disabled={disabled} style={{
      height:38, borderRadius:6, border:'none',
      background: selected ? '#fad749' : '#323232', display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'0 10px', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.4 : 1, transition:'background 150ms, border-color 150ms',
    }}>
      <span style={{ fontSize:11, color: selected ? '#000' : '#828282', fontWeight:500 }}>{label}</span>
      <span style={{ fontSize:13, fontWeight:700, color: selected ? '#000' : '#fad749' }}>{price}</span>
    </button>
  );
}

function PulseCard({ ev, left, selections, onPick }){
  const w = ev.window;
  const timed = w.secs != null;
  const closing = timed && left <= 0;
  const urgent = timed && left > 0 && left <= 60;
  const accent = '#FF5353';
  const pct = timed ? Math.max(0, left / w.secs) * 100 : 100;
  return (
    <div style={{ background:'#1e1e1e', borderRadius:12, padding:12, display:'flex', flexDirection:'column', gap:10 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6, flex:'0 0 auto' }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'#00dd70', flex:'0 0 auto' }}></span>
          <span style={{ color:'#00dd70', fontWeight:600, fontSize:11, whiteSpace:'nowrap' }}>{ev.minute}</span>
        </div>
        <span style={{ color:'#828282', fontSize:11, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', minWidth:0, textAlign:'right' }}>{ev.league}</span>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr auto', rowGap:4, alignItems:'center', fontSize:14, color:'#fff', fontWeight:500 }}>
        <PulseTeam name={ev.home} logo={ev.homeLogo}/><span style={{ color:'#00dd70', fontWeight:700, textAlign:'right' }}>{ev.hs}</span>
        <PulseTeam name={ev.away} logo={ev.awayLogo}/><span style={{ color:'#00dd70', fontWeight:700, textAlign:'right' }}>{ev.as}</span>
      </div>
      <div style={{ position:'relative', height:20, borderRadius:6, background:'#000', overflow:'hidden' }}>
        {timed && <div style={{ position:'absolute', right:0, top:0, bottom:0, width:pct+'%', background: 'rgba(0,221,112,0.2)', borderLeft:'3px solid rgba(0,221,112,0.3)', boxSizing:'border-box', transition:'width 1s linear' }}></div>}
        <div style={{ position:'relative', height:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 11px 2px' }}>
          <span></span>
          {timed
            ? <span style={{ fontSize:10, fontWeight:700, color:'#00dd70', fontVariantNumeric:'tabular-nums' }}>{closing ? 'Settling…' : pulseFmt(left)}</span>
            : <span style={{ fontSize:10, fontWeight:600, color:'#00dd70' }}>{w.status}</span>}
        </div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
        {ev.markets.map(([name, yes, no], i) => (
          <div key={name} style={{ display:'grid', gridTemplateColumns:'minmax(0,1fr) 84px 84px', gap:6, alignItems:'center' }}>
            <span style={{ fontSize:13, color:'#fff', fontWeight:500, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{name}</span>
            <PulseOdd label="Yes" price={yes} disabled={closing} selected={selections[ev.id+i]==='y'} onClick={() => onPick(ev.id+i,'y')}/>
            <PulseOdd label="No" price={no} disabled={closing} selected={selections[ev.id+i]==='n'} onClick={() => onPick(ev.id+i,'n')}/>
          </div>
        ))}
      </div>
    </div>
  );
}

function PulseTab(){
  const { SectionHeader } = window.UI;
  const [events, setEvents] = useState(PULSE_EVENTS);
  const [left, setLeft] = useState(() => Object.fromEntries(PULSE_EVENTS.map(e => [e.id, e.window.left])));
  const [selections, setSelections] = useState({});
  useEffect(() => {
    const t = setInterval(() => {
      setLeft(prev => {
        const next = { ...prev };
        events.forEach(e => {
          if (e.window.secs == null) return;
          const v = prev[e.id] - 1;
          if (v <= -3) {
            next[e.id] = e.window.secs;
            setEvents(evs => evs.map(x => x.id === e.id ? { ...x, markets: x.markets.map(([n,y,no]) => [n, pulseJitter(y), pulseJitter(no)]) } : x));
            setSelections(s => { const c = { ...s }; Object.keys(c).forEach(k => { if (k.startsWith(e.id)) delete c[k]; }); return c; });
          } else next[e.id] = v;
        });
        return next;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [events]);
  const pick = (k, v) => setSelections(s => ({ ...s, [k]: s[k] === v ? undefined : v }));
  const groups = ['football','basketball','tennis'].map(s => ({ sport:s, items: events.filter(e => e.sport === s) })).filter(g => g.items.length);
  return (
    <div>
      {new URLSearchParams(location.search).get('var') !== '4' && <div style={{ padding:'14px 4px 4px', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:2 }}>
        <span style={{ fontSize:18, fontWeight:700, color:'#fff' }}>Bet on what happens next</span>
        <span style={{ fontSize:13, color:'#828282' }}>Markets in here generally settle within <span style={{ color:'#00dd70', fontWeight:700 }}>x</span> minutes.</span>
      </div>}
      {groups.map(g => (
        <React.Fragment key={g.sport}>
          <SectionHeader icon={<img src={asset(PULSE_ICONS[g.sport])} width="22" height="22" alt=""/>} title={PULSE_LABELS[g.sport]} count={g.items.length}/>
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:8 }}>
            {g.items.map(ev => { const v = new URLSearchParams(location.search).get('var'); const Card = (v === '2' && window.PulseCard2) || (v === '3' && window.PulseCard3) || (v === '4' && window.PulseCard4) || PulseCard; return <Card key={ev.id} ev={ev} left={left[ev.id]} selections={selections} onPick={pick}/>; })}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
Object.assign(window, { PulseTab, PulseIcon });
