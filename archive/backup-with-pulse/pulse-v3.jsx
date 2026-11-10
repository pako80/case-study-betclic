// pulse-v3.jsx — Var 3 Pulse card: narrative, question-led
const PULSE_QUESTIONS = {
  'Goal':'Will there be a goal?', 'Corner':'Will there be a corner?', 'Card':'Will there be a card?',
  '6+ points (either)':'Will 6 or more points be scored?', '3-pointer made':'Will a 3-pointer be made?', 'Foul called':'Will a foul be called?',
  'Break of serve':'Will the server be broken?', 'Goes to deuce':'Will this game go to deuce?', 'Love game':'Will it be a love game?',
};

function PulseQIcon({ name, mono }){
  const s = { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'#828282', strokeWidth:2, strokeLinecap:'round', strokeLinejoin:'round', style:{ display:'block', flex:'0 0 auto' } };
  if (name === 'Goal' && mono) return <img src={asset('assets/icon-football-grey.svg')} width="16" height="16" alt="" style={{ display:'block', flex:'0 0 auto' }}/>;
  if (name === 'Goal') return <svg {...s}><circle cx="12" cy="12" r="9"></circle><path d="M12 7l4 3-1.5 4.5h-5L8 10z"></path></svg>;
  if (name === 'Corner') return <svg {...s}><path d="M6 21V3"></path><path d="M6 4h11l-3 4 3 4H6"></path></svg>;
  if (name === 'Card') return <svg {...s} stroke="none"><rect x="6" y="3" width="12" height="18" rx="2" fill={mono ? 'none' : '#fad749'} stroke={mono ? '#828282' : 'none'} strokeWidth="2" transform="rotate(12 12 12)"></rect></svg>;
  if (name === 'Foul called') return <svg {...s}><circle cx="9" cy="14" r="5"></circle><path d="M12 10l9-3v4l-6 2"></path></svg>;
  if (name === '6+ points (either)' || name === '3-pointer made') return <svg {...s}><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3v18M5.6 5.6c3 3 3 9.8 0 12.8M18.4 5.6c-3 3-3 9.8 0 12.8"></path></svg>;
  return <svg {...s}><circle cx="12" cy="12" r="9"></circle><path d="M5.5 5.5c3.5 3.5 3.5 9.5 0 13M18.5 5.5c-3.5 3.5-3.5 9.5 0 13"></path></svg>;
}

function PulseCard3({ ev, left, selections, onPick }){
  const w = ev.window, timed = w.secs != null, closing = timed && left <= 0;
  const pct = timed ? Math.max(0, left / w.secs) * 100 : 100;
  const lead = timed ? 'In the ' + w.label.toLowerCase() + '…' : 'In this game…';
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
      <div style={{ display:'flex', flexDirection:'column', gap:6, paddingTop:2 }}>
        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:8 }}>
          <span style={{ fontSize:11, color:'#00dd70' }}>{lead}</span>
          {timed
            ? <span style={{ fontSize:11, color:'#828282', whiteSpace:'nowrap' }}>{closing ? 'Settling…' : <>Closes in <span style={{ color:'#00dd70', fontWeight:700, fontVariantNumeric:'tabular-nums' }}>{pulseFmt(left)}</span></>}</span>
            : <span style={{ fontSize:11, color:'#00dd70', fontWeight:600 }}>{w.status}</span>}
        </div>
        {timed && <div style={{ height:2, borderRadius:1, background:'#2a2a2a', overflow:'hidden', display:'flex', justifyContent:'flex-end' }}><div style={{ width:pct+'%', background:'#00dd70', transition:'width 1s linear' }}></div></div>}
      </div>
      <div style={{ display:'flex', flexDirection:'column' }}>
        {ev.markets.map(([name, yes, no], i) => (
          <div key={name} style={{ display:'flex', flexDirection:'column', gap:8, padding: i === ev.markets.length - 1 ? '10px 0 0' : '10px 0', borderTop: i ? '1px solid #2a2a2a' : 'none' }}>
            <span style={{ display:'flex', alignItems:'center', gap:8, fontSize:14, color:'#fff', fontWeight:400 }}><PulseQIcon name={name}/>{PULSE_QUESTIONS[name] || name}</span>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
              <PulseOdd label="Yes" price={yes} disabled={closing} selected={selections[ev.id+i]==='y'} onClick={() => onPick(ev.id+i,'y')}/>
              <PulseOdd label="No" price={no} disabled={closing} selected={selections[ev.id+i]==='n'} onClick={() => onPick(ev.id+i,'n')}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
Object.assign(window, { PulseCard3 });
