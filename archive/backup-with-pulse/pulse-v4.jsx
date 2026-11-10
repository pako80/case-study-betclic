// pulse-v4.jsx — Var 3 narrative layout without countdown
const PULSE_SLOTS4 = {
  p1:["65'–70'","65'–70'","63'–75'"], p2:["40'–45'","40'–45'","38'–HT"],
  p3:['Q3 04:00–02:00','Q3 04:00–02:00','Q3 04:00–02:00'], p4:['Game 8','Game 8','Game 8'],
};
const PULSE_RANGES4 = { p1:[[65,70],[65,70],[63,75]], p2:[[40,45],[40,45],[38,45]] };
function PulseTimeline4({ minute, slot, onSlot }){
  const m = parseInt(minute, 10), second = m > 45, start = second ? 45 : 0;
  const first = Math.min(8, Math.ceil((m - start) / 5)), ref = React.useRef(null), [drag, setDrag] = React.useState(false);
  const pct = v => Math.min(100, Math.max(0, (v - start) / 45 * 100));
  const ticks = [start, start + 45];
  const idx = (slot - start) / 5;
  const pick = e => { const r = ref.current.getBoundingClientRect(); const i = Math.max(first, Math.min(8, Math.floor((e.clientX - r.left) / r.width * 9))); onSlot(start + i*5); };
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:4, paddingTop:2 }}>
      <span style={{ fontSize:11, color:'#fff', fontWeight:600 }}>{second ? '2nd half' : '1st half'}</span>
      <div ref={ref} onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); setDrag(true); pick(e); }} onPointerMove={e => drag && pick(e)} onPointerUp={() => setDrag(false)} onPointerCancel={() => setDrag(false)}
        style={{ position:'relative', height:20, display:'flex', alignItems:'center', cursor: drag ? 'grabbing' : 'grab', touchAction:'none', userSelect:'none' }}>
        <div style={{ position:'absolute', left:0, right:0, height:8, display:'grid', gridTemplateColumns:'repeat(9,1fr)', gap:2 }}>
          {Array.from({ length:9 }, (_, i) => <span key={i} style={{ borderRadius:2, background: start + i*5 + 5 <= m ? 'rgba(0,221,112,0.2)' : '#323232' }}></span>)}
        </div>
        <span style={{ position:'absolute', left:`calc(${idx/9*100}% + 1px)`, width:`calc(${100/9}% - 2px)`, height:16, borderRadius:4, background:'#00dd70', boxShadow: drag ? '0 0 0 3px rgba(0,221,112,0.3)' : 'none', transition: drag ? 'none' : 'left 150ms', display:'flex', alignItems:'center', justifyContent:'center', gap:2 }}>
          <i style={{ width:1, height:6, background:'#000', opacity:.5 }}></i><i style={{ width:1, height:6, background:'#000', opacity:.5 }}></i>
        </span>
        <span style={{ position:'absolute', top:0, bottom:0, left:`calc(${pct(m)}% - 1px)`, width:2, borderRadius:1, background:'#fff', pointerEvents:'none' }}></span>
      </div>
      <div style={{ position:'relative', height:12 }}>
        {ticks.map((t, i) => <span key={t} style={{ position:'absolute', left: i ? 'auto' : 0, right: i ? 0 : 'auto', fontSize:10, color:'#828282', fontVariantNumeric:'tabular-nums' }}>{t}'</span>)}
        <span style={{ position:'absolute', left:`${(idx + 0.5)/9*100}%`, transform:'translateX(-50%)', fontSize:10, fontWeight:700, color:'#00dd70', whiteSpace:'nowrap', fontVariantNumeric:'tabular-nums', transition: drag ? 'none' : 'left 150ms', background:'#1e1e1e', padding:'0 3px' }}>{slot}'–{slot + 5}'</span>
      </div>
    </div>
  );
}
function PulseCard4({ ev, selections, onPick }){
  const w = ev.window, ranges = PULSE_RANGES4[ev.id];
  const [slot, setSlot] = React.useState(ranges ? ranges[0][0] : null);
  const base = ranges ? ranges[0][0] : 0, shift = ranges ? (slot - base) / 5 : 0;
  const slots = ranges ? ev.markets.map(() => slot + "'–" + (slot + 5) + "'") : (PULSE_SLOTS4[ev.id] || []);
  const adj = p => shift ? Math.max(1.01, parseFloat(p) * (1 + shift * 0.06)).toFixed(2) : p;
  return (
    <div style={{ background:'#1e1e1e', borderRadius:12, padding:12, display:'flex', flexDirection:'column', gap:10 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6, flex:'0 0 auto' }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'#00dd70' }}></span>
          <span style={{ color:'#00dd70', fontWeight:600, fontSize:11, whiteSpace:'nowrap' }}>{ev.minute}</span>
        </div>
        <span style={{ color:'#828282', fontSize:11, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', minWidth:0 }}>{ev.league}</span>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr auto', rowGap:4, alignItems:'center', fontSize:14, color:'#fff', fontWeight:500 }}>
        <PulseTeam name={ev.home} logo={ev.homeLogo}/><span style={{ color:'#00dd70', fontWeight:700, textAlign:'right' }}>{ev.hs}</span>
        <PulseTeam name={ev.away} logo={ev.awayLogo}/><span style={{ color:'#00dd70', fontWeight:700, textAlign:'right' }}>{ev.as}</span>
      </div>
      {ranges && <PulseTimeline4 minute={ev.minute} slot={slot} onSlot={setSlot}/>}
      {w.status && <span style={{ fontSize:11, color:'#00dd70', fontWeight:600, paddingTop:2 }}>{w.status}</span>}
      <div style={{ display:'flex', flexDirection:'column' }}>
        {ev.markets.map(([name, yes, no], i) => (
          <div key={name} style={{ display:'flex', flexDirection:'column', gap:8, padding: i === ev.markets.length - 1 ? '10px 0 0' : '10px 0', borderTop: i ? '1px solid #2a2a2a' : 'none' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
              <span style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'#828282', fontWeight:400, minWidth:0 }}><PulseQIcon name={name} mono/>{PULSE_QUESTIONS[name] || name}</span>
              {slots[i] && <span style={{ fontSize:12, color:'#00dd70', fontWeight:600, whiteSpace:'nowrap', fontVariantNumeric:'tabular-nums' }}>{slots[i]}</span>}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
              <PulseOdd label="Yes" price={adj(yes)} selected={selections[ev.id+i]==='y'} onClick={() => onPick(ev.id+i,'y')}/>
              <PulseOdd label="No" price={no} selected={selections[ev.id+i]==='n'} onClick={() => onPick(ev.id+i,'n')}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
window.PulseCard4 = PulseCard4;
