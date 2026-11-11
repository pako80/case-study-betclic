// event-page.jsx — event detail screen opened from a lobby card
const { useState: useStateEP, useEffect: useEffectEP } = React;
const EPF = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', system-ui, sans-serif";
const epClamp = (v, a, b) => Math.min(b, Math.max(a, v));
const epPx = p => Math.max(1.02, 0.94 / p).toFixed(2);

function EPPill({ price, fav, w }) {
  const [sel, setSel] = useStateEP(false);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap: 6, width: w || 'auto', flex: w ? '0 0 ' + w + 'px' : '1 1 0', minWidth: 0 }}>
      <div style={{ height: 3, borderRadius: 2, background: fav ? '#00a854' : '#e6e6e6', margin:'0 2px' }}></div>
      <button onClick={() => setSel(v => !v)} style={{ height: 44, borderRadius: 8, border:'none', cursor:'pointer', fontFamily: EPF, fontSize: 14, fontWeight: 700, background: (window.V2 ? !sel : sel) ? '#FFCC00' : '#323232', color: (window.V2 ? !sel : sel) ? '#323232' : '#FFCC00', transition:'background 150ms' }}>{price}</button>
    </div>
  );
}

function EPCard({ title, children }) {
  return (
    <div style={{ background:'#ffffff', borderRadius: 18, padding: 10, display:'flex', flexDirection:'column', gap: 10 }}>
      <span style={{ fontSize: 14, fontWeight: 700, color:'#111', padding:'2px 2px 0' }}>{title}</span>
      {children}
    </div>
  );
}

function EPGrid({ m }) {
  const lo = Math.min(...m.odds.map(o => parseFloat(o.price)));
  return (
    <div style={{ display:'grid', gridTemplateColumns: m.twoWay ? '1fr 1fr' : '1fr 1fr 1fr', gap: 6 }}>
      {m.odds.map((o, i) => <window.UI.OddsButton key={i} odds={o} twoWay={m.twoWay} name={m.names[i]} fav={parseFloat(o.price) === lo}/>)}
    </div>
  );
}

function EPRows({ m }) {
  const lo = Math.min(...m.odds.map(o => parseFloat(o.price)));
  return (
    <div style={{ display:'flex', flexDirection:'column', gap: 4 }}>
      {m.odds.map((o, i) => (
        <div key={i} style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap: 12 }}>
          <span style={{ fontSize: 14, color:'#111', paddingBottom: 13, minWidth: 0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{m.names[i]}</span>
          <EPPill price={o.price} fav={parseFloat(o.price) === lo} w={96}/>
        </div>
      ))}
    </div>
  );
}

function EPLines({ event, base }) {
  const g = (event.home.score || 0) + (event.away.score || 0), po = epClamp(0.94 / parseFloat(base.odds[0].price), 0.1, 0.9);
  const rows = [0.5, 1.5, 2.5, 3.5].map((k, i) => {
    const p = epClamp([0.88, 0.64, 0.40, 0.22][i] + (po - 0.5) * 0.4, 0.06, 0.94), line = g + k;
    return { line, over: epPx(p), under: epPx(1 - p) };
  });
  return (
    <div style={{ display:'flex', flexDirection:'column', gap: 4 }}>
      {rows.map((r, i) => (
        <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 14 }}>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap: 8 }}><span style={{ fontSize: 14, color:'#111', paddingBottom: 13, whiteSpace:'nowrap' }}>Over {r.line}</span><EPPill price={r.over} fav={parseFloat(r.over) < parseFloat(r.under)} w={64}/></div>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap: 8 }}><span style={{ fontSize: 14, color:'#111', paddingBottom: 13, whiteSpace:'nowrap' }}>Under {r.line}</span><EPPill price={r.under} fav={parseFloat(r.under) < parseFloat(r.over)} w={64}/></div>
        </div>
      ))}
    </div>
  );
}

function epProbs(event) {
  const raw = event.odds.map(o => 1 / parseFloat(o.price)), t = raw.reduce((a, b) => a + b, 0);
  return raw.map(v => v / t);
}
function epNext(event, kind) {
  const [ph, , pa] = epProbs(event), d = (ph - pa) * 0.2, ps = kind === 'nextcorner' ? [0.44 + d, 0.12, 0.44 - d] : [0.37 + d * 0.5, 0.26, 0.37 - d * 0.5];
  return { twoWay: false, odds: [{ label:'1', price: epPx(ps[0]) }, { label:'None', price: epPx(ps[1]) }, { label:'2', price: epPx(ps[2]) }], names: [event.home.name, 'None', event.away.name] };
}
function EPCorrect({ event }) {
  const [ph, pd, pa] = epProbs(event), h = event.home.score || 0, a = event.away.score || 0, w = [0.42, 0.26, 0.16, 0.09];
  const gen = (side) => {
    const out = [];
    for (let d = 0; d <= 5 && out.length < 4; d++) for (let i = 0; i <= d && out.length < 4; i++) {
      const x = h + i, y = a + (d - i);
      if (side === 'h' ? x > y : side === 'a' ? y > x : x === y) out.push([x, y, d]);
    }
    return out;
  };
  const cols = [['h', event.home.name, ph], ['d', 'Draw', pd], ['a', event.away.name, pa]].map(([k, label, p]) => ({ label, rows: gen(k).map(([x, y], i) => ({ name: x + ' - ' + y, price: Math.max(1.5, 0.94 / Math.max(0.02, p * w[i])).toFixed(2) })) }));
  const lo = Math.min(...cols.flatMap(c => c.rows.map(r => parseFloat(r.price))));
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 6 }}>
      {cols.map((c, ci) => (
        <div key={ci} style={{ display:'flex', flexDirection:'column', gap: 8, minWidth: 0 }}>
          <span style={{ fontSize: 11, color:'#6b6b6b', textAlign:'center', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.label}</span>
          {c.rows.map((r, i) => <window.UI.OddsButton key={i} odds={{ label: r.name, price: r.price }} name={r.name} fav={parseFloat(r.price) === lo}/>)}
        </div>
      ))}
    </div>
  );
}

const EP_PLAYERS = { 'PSG':['Dembélé','Barcola','Hakimi'], 'Marseille':['Greenwood','Aubameyang','Harit'], 'Lyon':['Lacazette','Cherki'], 'Monaco':['Embolo','Golovin'], 'Lille':['David','Zhegrova'], 'Nice':['Moffi','Boga'], 'Man City':['Haaland','Foden','Doku'], 'Arsenal':['Saka','Havertz','Martinelli'], 'Liverpool':['Salah','Núñez'], 'Chelsea':['Palmer','Jackson'], 'Tottenham':['Son','Johnson'], 'Newcastle':['Isak','Gordon'], 'Real Madrid':['Mbappé','Vinícius'], 'Barcelona':['Lewandowski','Yamal','Raphinha'], 'Atlético Madrid':['Griezmann','Álvarez'], 'Sevilla':['En-Nesyri','Ocampos'], 'Inter':['Lautaro','Thuram'], 'Juventus':['Vlahović','Yildiz'], 'Milan':['Leão','Pulisic'], 'Napoli':['Lukaku','Politano'], 'Bayern Munich':['Kane','Musiala'], 'Dortmund':['Guirassy','Adeyemi'], 'Leverkusen':['Wirtz','Boniface'], 'RB Leipzig':['Openda','Šeško'], 'Fenerbahçe':['Dzeko','Tadić'], 'Galatasaray':['Icardi','Osimhen'] };
function epGoals(event, side) {
  if (event.sport !== 'football') return [];
  const team = side === 'h' ? event.home : event.away, goals = team.score || 0, pl = EP_PLAYERS[team.name];
  if (!goals || !pl) return [];
  const m = String(event.live.minute), n = /^HT$/i.test(m) ? 45 : Math.max(2, parseInt(m, 10) || 45);
  let h = 0; for (const ch of event.id + team.name) h = (h * 31 + ch.charCodeAt(0)) % 997;
  const out = []; let last = 0;
  for (let i = 0; i < goals; i++) {
    let min = Math.max(last + 1, Math.round(n * (i + 1) / (goals + 1)) - (h + i) % 4);
    min = Math.min(min, n); last = min;
    out.push([min, min + "' " + pl[(h + i) % pl.length]]);
  }
  return out;
}
function epScorersAll(event) {
  return [...epGoals(event, 'h'), ...epGoals(event, 'a')].sort((a, b) => a[0] - b[0]).map(g => g[1]).join(', ');
}

function EPTeam({ name, league, scorers }) {
  const shirt = window.UI.getShirt(name, league);
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ display:'flex', alignItems:'center', gap: 10, height: 32 }}>
        {shirt && <img src={asset(shirt)} width={28} height={28} alt="" style={{ display:'block', flex:'0 0 auto', filter:'drop-shadow(0 1px 3px rgba(0,0,0,0.45))' }}/>}
        <span style={{ fontSize: 18, fontWeight: 600, color:'#fff', lineHeight: '22px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{name}</span>
      </div>
      {scorers ? <div style={{ fontSize: 11, lineHeight: '14px', color:'#9aa0b4', margin: shirt ? '1px 0 0 38px' : '1px 0 0', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{scorers}</div> : null}
    </div>
  );
}

function EventPage({ event, from, onClose, onBeginClose, leagueEvents = [], onSelect }) {
  const { MARKETS, marketOdds, Flag } = window.UI;
  const [menu, setMenu] = useStateEP(false);
  const [open, setOpen] = useStateEP(false);
  const [tab, setTab] = useStateEP('top');
  const [blur, setBlur] = useStateEP(0);
  useEffectEP(() => { setMenu(false); }, [event.id]);
  useEffectEP(() => { const id = requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true))); return () => cancelAnimationFrame(id); }, []);
  const safe = (() => { const h = document.getElementById('frame-host'); return h ? parseFloat(getComputedStyle(h).paddingTop) || 0 : 0; })();
  const closedClip = from ? `inset(${from.t + safe}px ${from.r}px ${from.b}px ${from.l}px round 18px)` : 'inset(55% 12px 25% 12px round 18px)';
  const onBack = () => { onBeginClose && onBeginClose(); setOpen(false); setTimeout(onClose, 480); };
  const sport = event.sport, football = sport === 'football';
  const tabs = football ? [['top', 'Top'], ['fast', 'Fast'], ['result', 'Result'], ['goals', 'Goals'], ['correct', 'Correct Score']] : null;
  const ids = (MARKETS[sport] || [['winner', 'Match Winner']]).map(m => m[0]);
  const TT = { nextcorner: 'Next Corner', nextcard: 'Next Card', correctscore: 'Correct Score' };
  const title = id => TT[id] || ((MARKETS[sport] || []).find(m => m[0] === id) || [])[1] || event.market;
  const TABSET = { top: ['winner', 'doublechance', 'nextgoal', 'totalgoals'], fast: ['nextgoal', 'nextcorner', 'nextcard'], result: ['winner', 'doublechance'], goals: ['nextgoal', 'totalgoals'], correct: ['correctscore'] };
  const inTab = id => !tabs || (TABSET[tab] || []).includes(id);
  const order = football ? ['winner', 'doublechance', 'nextgoal', 'nextcorner', 'nextcard', 'totalgoals', 'correctscore'] : ids;
  const winner = { twoWay: !!event.twoWay, odds: event.odds, names: event.odds.map((o, i) => i === 0 ? event.home.name : (!event.twoWay && i === 1) ? 'Draw' : event.away.name) };
  const flagOk = ['br','uk','fr','de','jp','nl','pt','es','tr','us','ar','it'].includes(event.flag);
  const hasSets = !!event.home.sets;
  const multi = leagueEvents.length > 1;
  const period = window.UI.periodLabel(event);
  return (
    <div style={{ position:'absolute', inset: 0, zIndex: 30, background: open ? '#f2f2f2' : '#ffffff', fontFamily: EPF, clipPath: open ? 'inset(0px 0px 0px 0px round 0px)' : closedClip, WebkitClipPath: open ? 'inset(0px 0px 0px 0px round 0px)' : closedClip, transition: 'clip-path 480ms cubic-bezier(.32,.72,0,1), -webkit-clip-path 480ms cubic-bezier(.32,.72,0,1), background-color 320ms ease' }}>
      <div style={{ position:'absolute', inset: 0, opacity: open ? 1 : 0, transition: open ? 'opacity 300ms ease 140ms' : 'opacity 160ms ease' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, zIndex: 10, height: 56 + safe }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, bottom:-32, pointerEvents:'none', opacity: blur, background:'linear-gradient(to bottom, rgba(20,25,47,0.85) 0%, rgba(20,25,47,0.62) 65%, rgba(20,25,47,0) 100%)', WebkitBackdropFilter:'blur(20px) saturate(160%)', backdropFilter:'blur(20px) saturate(160%)', WebkitMaskImage:'linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)', maskImage:'linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%)' }}></div>
          <div style={{ position:'relative', height: 56, marginTop: safe, padding:'0 12px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <button onClick={onBack} aria-label="Close" style={{ width: 36, height: 36, borderRadius:'50%', border:'none', background:'#2b2b2e', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', padding: 0 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            <span style={{ display:'flex', alignItems:'center', gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color:'#fff' }}>3,300.00 €</span>
              <span style={{ width: 24, height: 24, borderRadius:'50%', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}><svg width="14" height="14" viewBox="0 0 14 14" style={{ display:'block' }}><path d="M7 1.5v11M1.5 7h11" stroke="#14192F" strokeWidth="2" strokeLinecap="round"/></svg></span>
            </span>
          </div>
        </div>
        {menu && <div onClick={() => setMenu(false)} style={{ position:'absolute', inset: 0, zIndex: 40 }}></div>}
        <div onScroll={e => setBlur(Math.min(1, e.currentTarget.scrollTop / 24))} style={{ position:'absolute', inset: 0, overflowY:'auto', padding:'0 8px 40px', scrollbarWidth:'none' }}>
          <div style={{ position:'relative', margin:'0 -8px', padding:(64 + safe) + 'px 0 0', marginBottom: 8, minHeight: 300 + safe, display:'flex', flexDirection:'column' }}>
            <div style={{ position:'absolute', inset: 0, background:'#14192F', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset: 0, backgroundImage:"url('assets/event-bg-test.jpg')", backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center 22%', filter:'blur(1px) brightness(0.55) saturate(1.1)' }}></div>
              <div style={{ position:'absolute', inset: 0, background:'linear-gradient(to bottom, rgba(20,25,47,0.78) 0%, rgba(20,25,47,0.55) 45%, rgba(20,25,47,0.88) 100%)' }}></div>
            </div>
            <div style={{ position:'relative', display:'flex', flexDirection:'column', gap: 18, padding:'0 22px 18px' }}>
              <div style={{ display:'flex', justifyContent:'center', position:'relative', zIndex: 42 }}>
                <button onClick={() => multi && setMenu(m => !m)} aria-expanded={menu} style={{ display:'flex', alignItems:'center', gap: 8, height: 32, padding:'0 12px 0 8px', border:'none', borderRadius: 999, background:'rgba(255,255,255,0.12)', color:'#fff', fontFamily:'inherit', fontSize: 13, fontWeight: 600, cursor: multi ? 'pointer' : 'default' }}>
                  {flagOk && <Flag code={event.flag} size={18}/>}
                  <span style={{ whiteSpace:'nowrap' }}>{event.league}</span>
                  {multi && <svg width="10" height="7" viewBox="0 0 12 8" fill="none" style={{ transform: menu ? 'rotate(180deg)' : 'none', transition:'transform 200ms' }}><path d="M1.5 1.5L6 6l4.5-4.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </button>
                {menu && (
                  <div style={{ position:'absolute', top:'calc(100% + 8px)', left:'50%', marginLeft: -140, width: 280, zIndex: 41, background:'#ffffff', borderRadius: 14, boxShadow:'0 12px 32px rgba(0,0,0,0.22)', padding: 6, maxHeight: 300, overflowY:'auto', animation:'kto-drop-in 260ms cubic-bezier(.2,.9,.3,1)', transformOrigin:'top center' }}>
                    <div style={{ padding:'8px 10px 6px', fontSize: 11, fontWeight: 600, color:'#6b6b6b' }}>More from {event.league}</div>
                    {leagueEvents.map(e => {
                      const cur = e.id === event.id, score = e.home.sets ? null : e.home.score + ' – ' + e.away.score;
                      return (
                        <button key={e.id} onClick={() => { setMenu(false); !cur && onSelect && onSelect(e.id); }} style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', gap: 10, padding:'10px', border:'none', borderRadius: 10, background: cur ? '#f2f2f2' : 'transparent', cursor:'pointer', fontFamily:'inherit', textAlign:'left' }}>
                          <span style={{ fontSize: 14, fontWeight: cur ? 700 : 500, color:'#111', minWidth: 0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{e.home.name} v {e.away.name}</span>
                          <span style={{ display:'flex', alignItems:'center', gap: 8, flex:'0 0 auto', fontSize: 12, color:'#6b6b6b', fontVariantNumeric:'tabular-nums' }}>{score && <b style={{ color:'#111', fontWeight: 700 }}>{score}</b>}<span style={{ color:'#00a854', fontWeight: 600 }}>{e.live.minute}</span></span>
                        </button>
                      );
                    })}
                    <button onClick={() => { setMenu(false); onClose && onClose(); }} style={{ width:'100%', height: 36, marginTop: 6, border:'none', borderRadius: 10, background:'#323232', color:'#fff', fontSize: 13, fontWeight: 700, cursor:'pointer', fontFamily:'inherit' }}>All leagues</button>
                  </div>
                )}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap: 6, fontSize: 12, color:'rgba(255,255,255,0.8)' }}>
                <span style={{ width: 6, height: 6, borderRadius:'50%', background:'#00dd70' }}></span>
                <span style={{ color:'#00dd70', fontWeight: 600 }}>{event.live.minute}</span>
                {period && <span style={{ color:'#00dd70', fontWeight: 600 }}>{period}</span>}
              </div>
              {hasSets ? (
                <div style={{ display:'grid', gridTemplateColumns:'1fr auto', alignItems:'center', gap: 12 }}>
                  <div style={{ display:'flex', flexDirection:'column', gap: 4, minWidth: 0 }}>
                    <EPTeam name={event.home.name} league={event.league}/>
                    <EPTeam name={event.away.name} league={event.league}/>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:`repeat(${event.home.sets.length}, 26px)`, gridAutoRows: 32, gap: '4px 4px', alignItems:'center', fontSize: 18, fontWeight: 400, color:'#fff', textAlign:'center', fontVariantNumeric:'tabular-nums' }}>
                    {event.home.sets.map((v, i) => <span key={'h' + i}>{v}</span>)}
                    {event.away.sets.map((v, i) => <span key={'a' + i}>{v}</span>)}
                  </div>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap: 6 }}>
                  {['h', 'a'].map(sd => {
                    const tm = sd === 'h' ? event.home : event.away;
                    return (
                      <div key={sd} style={{ display:'grid', gridTemplateColumns:'1fr auto', alignItems:'start', gap: 12 }}>
                        <EPTeam name={tm.name} league={event.league}/>
                        <span style={{ height: 32, lineHeight: '32px', fontSize: 18, fontWeight: 400, color:'#fff', fontVariantNumeric:'tabular-nums' }}>{tm.score}</span>
                      </div>
                    );
                  })}
                </div>
              )}
              {epScorersAll(event) && <div style={{ fontSize: 11, lineHeight: '14px', color:'#9aa0b4', textAlign:'left' }}>{epScorersAll(event)}</div>}
            </div>
            {tabs && (
              <div style={{ display:'flex', gap: 16, padding:'0 22px', margin:'auto 0 0', position:'relative', background:'#f2f2f2', overflowX:'auto', scrollbarWidth:'none' }}>
                {tabs.map(([id, label]) => <button key={id} onClick={() => setTab(id)} style={{ background:'none', border:'none', padding:'14px 0 12px', flex:'0 0 auto', whiteSpace:'nowrap', cursor:'pointer', fontFamily:'inherit', fontSize: 13, fontWeight: tab === id ? 700 : 500, color: tab === id ? (window.V2 ? '#E10014' : '#111') : '#6b6b6b', borderBottom: tab === id ? '2px solid ' + (window.V2 ? '#E10014' : '#FFCC00') : '2px solid transparent' }}>{label}</button>)}
              </div>
            )}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap: 8 }}>
            {event.penalties ? (
              <div style={{ background:'#ffffff', borderRadius: 18, padding: 18, textAlign:'center', fontSize: 13, color:'#6b6b6b' }}>Markets suspended — penalties</div>
            ) : order.filter(inTab).map(id => {
              const m = id === 'winner' ? winner : id === 'nextcorner' || id === 'nextcard' ? epNext(event, id) : id === 'correctscore' ? { correct: true } : marketOdds(event, id);
              if (!m) return null;
              return (
                <EPCard key={id} title={title(id)}>
                  {id === 'correctscore' ? <EPCorrect event={event}/> : football && id === 'doublechance' ? <EPRows m={m}/> : football && id === 'totalgoals' ? <EPLines event={event} base={m}/> : <EPGrid m={m}/>}
                </EPCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
window.EventPage = EventPage;
