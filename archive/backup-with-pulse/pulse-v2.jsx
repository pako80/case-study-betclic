// pulse-v2.jsx — Var 2 Pulse card: ring countdown + 3-up market tiles
function PulseRing({ left, total, size=38 }){
  const r = (size-4)/2, c = 2*Math.PI*r, pct = Math.max(0, left/total);
  return (
    <div style={{ position:'relative', width:size, height:size, flex:'0 0 auto' }}>
      <svg width={size} height={size} style={{ transform:'rotate(-90deg)', display:'block' }}>
        <circle cx={size/2} cy={size/2} r={r} stroke="#2a2a2a" strokeWidth="3" fill="none"></circle>
        <circle cx={size/2} cy={size/2} r={r} stroke="#00dd70" strokeWidth="3" fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c*(1-pct)} style={{ transition:'stroke-dashoffset 1s linear' }}></circle>
      </svg>
      <span style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:700, color:'#00dd70', fontVariantNumeric:'tabular-nums' }}>{left > 0 ? pulseFmt(left) : '—'}</span>
    </div>
  );
}

function PulseTileBtn({ label, price, selected, disabled, onClick }){
  return (
    <button onClick={onClick} disabled={disabled} style={{
      height:34, borderRadius:6, border:'none', background: selected ? '#fad749' : '#323232',
      display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 10px',
      cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.4 : 1, transition:'background 150ms',
    }}>
      <span style={{ fontSize:10, fontWeight:500, color: selected ? '#000' : '#828282' }}>{label}</span>
      <span style={{ fontSize:13, fontWeight:700, color: selected ? '#000' : '#fad749' }}>{price}</span>
    </button>
  );
}

function PulseCard2({ ev, left, selections, onPick }){
  const w = ev.window, timed = w.secs != null, closing = timed && left <= 0;
  return (
    <div style={{ background:'#1e1e1e', borderRadius:12, padding:12, display:'flex', flexDirection:'column', gap:10 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6, flex:'0 0 auto' }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'#00dd70' }}></span>
          <span style={{ color:'#00dd70', fontWeight:600, fontSize:11, whiteSpace:'nowrap' }}>{ev.minute}</span>
        </div>
        <span style={{ color:'#828282', fontSize:11, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', minWidth:0 }}>{ev.league}</span>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <div style={{ flex:1, minWidth:0, display:'grid', gridTemplateColumns:'minmax(0,1fr) auto', rowGap:4, alignItems:'center', fontSize:14, color:'#fff', fontWeight:500 }}>
          <PulseTeam name={ev.home} logo={ev.homeLogo}/><span style={{ color:'#00dd70', fontWeight:700, textAlign:'right' }}>{ev.hs}</span>
          <PulseTeam name={ev.away} logo={ev.awayLogo}/><span style={{ color:'#00dd70', fontWeight:700, textAlign:'right' }}>{ev.as}</span>
        </div>
        <div style={{ width:1, alignSelf:'stretch', background:'#2a2a2a' }}></div>
        {timed
          ? <PulseRing left={left} total={w.secs}/>
          : <span style={{ fontSize:10, fontWeight:600, color:'#00dd70', maxWidth:70, textAlign:'center', lineHeight:'13px' }}>{w.status}</span>}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:14 }}>
        {ev.markets.map(([name, yes, no], i) => (
          <div key={name} style={{ display:'flex', flexDirection:'column', gap:6 }}>
            <span style={{ fontSize:11, fontWeight:600, color:'#fff', textAlign:'center', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{name}</span>
            <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
              <PulseTileBtn label="Yes" price={yes} disabled={closing} selected={selections[ev.id+i]==='y'} onClick={() => onPick(ev.id+i,'y')}/>
              <PulseTileBtn label="No" price={no} disabled={closing} selected={selections[ev.id+i]==='n'} onClick={() => onPick(ev.id+i,'n')}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
Object.assign(window, { PulseCard2 });
