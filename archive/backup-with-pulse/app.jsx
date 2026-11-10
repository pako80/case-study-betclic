// app.jsx — Live Lobby Pinning prototype
const { useState, useEffect, useRef, useLayoutEffect, useMemo, useCallback } = React;
const { Icon, Flag, StatusBar, TopHeader, TabChips, EventCard, SectionHeader, EmptyState, LeagueAccordion, MultiplasRow } = window.UI;

// Variation tweaks for stakeholder demo
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hotMode": "default"
}/*EDITMODE-END*/;

// ========== global keyframes / styles ==========
const styleEl = document.createElement('style');
styleEl.textContent = `
@keyframes kto-pulse {
  0% { box-shadow: 0 0 0 0 rgba(0,221,112,0.55); }
  70% { box-shadow: 0 0 0 6px rgba(0,221,112,0); }
  100% { box-shadow: 0 0 0 0 rgba(0,221,112,0); }
}
@keyframes kto-pin-pop {
  0% { transform: scale(1); }
  35% { transform: scale(1.35) rotate(-12deg); }
  70% { transform: scale(0.92) rotate(6deg); }
  100% { transform: scale(1) rotate(0); }
}
.kto-pin-pop { animation: kto-pin-pop 360ms cubic-bezier(.2,1.2,.4,1); }
@keyframes kto-fomo-pulse {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.12); }
}
@keyframes kto-flyup {
  0% { transform: translateY(var(--from)) scale(1); opacity: 0.95; }
  60% { transform: translateY(calc(var(--to) * 1.04)) scale(1.01); }
  100% { transform: translateY(var(--to)) scale(1); opacity: 1; }
}
@keyframes kto-badge-bump {
  0% { transform: scale(1); }
  40% { transform: scale(1.45); }
  100% { transform: scale(1); }
}
.kto-badge-bump { animation: kto-badge-bump 320ms cubic-bezier(.2,1.4,.4,1); }
@keyframes kto-toast-in {
  from { opacity: 0; transform: translate(-50%, 12px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
.scroll-area::-webkit-scrollbar { width: 0; }
`;
document.head.appendChild(styleEl);

const TABS = [
  { id: 'pin',        label: 'Pin',        icon: ({size, pinnedCount}) => (
    <img src={asset(pinnedCount > 0 ? 'assets/chip-pin-on.svg' : 'assets/chip-pin-off.svg')}
      width={size} height={size} alt="" style={{ display:'block' }}/>
  ) },
  { id: 'pulse',      label: 'Pulse',      icon: null },
  { id: 'hot',        label: 'Hot',        icon: null },
  { id: 'football',   label: 'Football',   icon: Icon.Football, count: 5 },
  { id: 'tennis',     label: 'Tennis',     icon: Icon.Tennis, count: 3 },
  { id: 'basketball', label: 'Basketball', icon: Icon.Basketball, count: 2 },
  { id: 'volleyball', label: 'Volleyball', icon: Icon.Volleyball, count: 1 },
];

// ─── helper: render an event with the "Crunch Time" emphasis styling ───
function HottestNowCard({ event, isPinned, onTogglePin, cardRefs, multiplas }) {
  return (
    <div style={{
      borderRadius: 12, overflow: 'hidden',
      background: '#1e1e1e', marginBottom: 12,
      boxShadow: '0 0 0 1.5px rgba(250,150,0,0.55), 0 0 22px -6px rgba(255,83,83,0.45)',
    }}>
      <div style={{ padding: '12px 12px 0' }}>
        <div style={{
          background: 'linear-gradient(90deg,#FA9600 0%,#FF5353 100%)',
          color: '#000', fontSize: 12, fontWeight: 800,
          letterSpacing: 0, textAlign: 'center',
          borderRadius: 6, padding: '7px 10px', lineHeight: '14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          animation: 'kto-fomo-pulse 2.6s ease-in-out infinite',
        }}>
          <span aria-hidden="true">🔥</span>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{event.fomoMessage}</span>
          <span aria-hidden="true">🔥</span>
        </div>
      </div>
      <div ref={node => { if (node) cardRefs.current[event.id] = node; }}>
        <EventCard
          event={event}
          isPinned={isPinned}
          onTogglePin={onTogglePin}
          isLast={true}
          multiplas={multiplas}
          hidePin={true}
        />
      </div>
    </div>
  );
}

// ========== helper: group events by league + render accordions ==========
function renderLeagueGroups(items, scopeKey, ctx) {
  const { pinnedIds, handleTogglePin, cardRefs, collapsedLeagues, toggleLeague, multiplas } = ctx;
  if (items.length === 0) {
    return { node: (
      <div style={{ padding: 40, textAlign:'center', color:'#828282', fontSize: 13 }}>
        No events available
      </div>
    ), leagueKeys: [] };
  }
  // group preserving first-seen order
  const seen = new Map();
  for (const e of items) {
    if (!seen.has(e.league)) seen.set(e.league, []);
    seen.get(e.league).push(e);
  }
  const groups = [...seen.entries()].map(([league, evs]) => ({
    league,
    country: window.LEAGUES[league]?.country || evs[0]?.flag || 'intl',
    events: evs,
  }));
  const leagueKeys = groups.map(g => `${scopeKey}::${g.league}`);

  const node = groups.map(g => {
    const key = `${scopeKey}::${g.league}`;
    const isCollapsed = collapsedLeagues.has(key);
    return (
      <window.UI.LeagueAccordion
        key={key}
        league={g.league}
        country={g.country}
        count={g.events.length}
        expanded={!isCollapsed}
        onToggle={() => toggleLeague(key)}
      >
        <div>
          {g.events.map((e, i) => (
            <div key={e.id} ref={node => { if (node) cardRefs.current[e.id] = node; }}>
              <window.UI.EventCard
                event={e}
                isPinned={pinnedIds.includes(e.id)}
                onTogglePin={handleTogglePin}
                isLast={i === g.events.length - 1}
                multiplas={multiplas}
              />
            </div>
          ))}
        </div>
      </window.UI.LeagueAccordion>
    );
  });
  return { node, leagueKeys };
}

function App() {
  const [events, setEvents] = useState(() => window.INITIAL_EVENTS);
  const [pinnedIds, setPinnedIds] = useState([]); // ordered: most recent first
  const [activeTab, setActiveTab] = useState(() => new URLSearchParams(location.search).get('tab') || 'hot');
  const [animatingId, setAnimatingId] = useState(null); // event currently flying
  const [badgeBump, setBadgeBump] = useState(0);
  const [toast, setToast] = useState(null);
  const [collapsedLeagues, setCollapsedLeagues] = useState(() => new Set()); // leagues that user collapsed
  const [multiplas, setMultiplas] = useState(false); // Múltiplas View toggle
  const [tweaks, setTweaks] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];
  // Hottest Now — picks one random event from HOTTEST_POOL on mount;
  // re-rolls only on page refresh or when the user navigates away and back.
  const [hottestIdx] = useState(() => Math.floor(Math.random() * (window.HOTTEST_POOL?.length || 1)));

  const toggleLeague = useCallback((key) => {
    setCollapsedLeagues(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }, []);

  const toggleAllInScope = useCallback((leagueKeys) => {
    setCollapsedLeagues(prev => {
      const allOpen = leagueKeys.every(k => !prev.has(k));
      const next = new Set(prev);
      if (allOpen) {
        // close all in scope
        leagueKeys.forEach(k => next.add(k));
      } else {
        // open all in scope
        leagueKeys.forEach(k => next.delete(k));
      }
      return next;
    });
  }, []);

  // refs to event card DOM nodes by id, used to measure for FLIP anim
  const cardRefs = useRef({});
  const scrollRef = useRef(null);

  // Combined event lookup: includes both the regular events and the Hottest Now pool
  // so that pinning a Hottest Now event still resolves on other tabs.
  const allEventsById = useMemo(() => {
    const map = {};
    events.forEach(e => { map[e.id] = e; });
    (window.HOTTEST_POOL || []).forEach(e => { map[e.id] = e; });
    return map;
  }, [events]);
  const findEvent = useCallback((id) => allEventsById[id], [allEventsById]);

  // filtered events shown in main list (for active tab, excluding "pin" view)
  const visibleEvents = useMemo(() => {
    if (activeTab === 'hot') return events.filter(e => e.hot);
    if (activeTab === 'pin') return pinnedIds.map(id => findEvent(id)).filter(Boolean);
    return events.filter(e => e.sport === activeTab);
  }, [events, activeTab, pinnedIds, findEvent]);

  // partition into pinned (in display order) + rest (in their natural order)
  const pinnedVisible = useMemo(
    () => pinnedIds.map(id => findEvent(id)).filter(e => e && (activeTab === 'pin' || e.sport === activeTab)),
    [pinnedIds, findEvent, activeTab]
  );
  const restVisible = useMemo(
    () => visibleEvents.filter(e => !pinnedIds.includes(e.id) && !e.az),
    [visibleEvents, pinnedIds]
  );

  // ========= PIN HANDLER WITH FLIP ANIMATION =========
  const handleTogglePin = useCallback((id) => {
    const isCurrentlyPinned = pinnedIds.includes(id);

    if (isCurrentlyPinned) {
      // unpin — simple no-anim removal
      setPinnedIds(ids => ids.filter(x => x !== id));
      setToast({ kind: 'unpin', text: 'Removed from Pinned' });
      return;
    }

    // 1. measure current rect of the tapped card
    const node = cardRefs.current[id];
    if (!node) {
      setPinnedIds(ids => [id, ...ids]);
      return;
    }
    const fromRect = node.getBoundingClientRect();

    // 2. apply state change (this re-renders with the card now at top)
    setPinnedIds(ids => [id, ...ids]);
    setBadgeBump(b => b + 1);
    setToast({ kind: 'pin', text: activeTab === 'hot' ? 'Added to Pin Tab' : 'Pinned to top' });

    // 3. on next frame, measure new rect, apply FLIP transform, then animate to identity
    requestAnimationFrame(() => {
      const newNode = cardRefs.current[id];
      if (!newNode) return;
      const toRect = newNode.getBoundingClientRect();
      const dy = fromRect.top - toRect.top;
      if (Math.abs(dy) < 2) return;
      setAnimatingId(id);
      // Set start transform
      newNode.style.transform = `translateY(${dy}px)`;
      newNode.style.transition = 'none';
      newNode.style.zIndex = '5';
      newNode.style.boxShadow = '0 12px 32px rgba(0,0,0,0.6)';
      // Force reflow then animate to 0
      void newNode.offsetWidth;
      newNode.style.transition = 'transform 520ms cubic-bezier(.2,.9,.2,1), box-shadow 600ms ease';
      newNode.style.transform = 'translateY(0)';
      const cleanup = () => {
        newNode.style.transition = '';
        newNode.style.transform = '';
        newNode.style.zIndex = '';
        newNode.style.boxShadow = '';
        newNode.removeEventListener('transitionend', cleanup);
        setAnimatingId(null);
      };
      newNode.addEventListener('transitionend', cleanup);
      // safety fallback
      setTimeout(cleanup, 700);
    });
  }, [pinnedIds]);

  // toast auto-dismiss
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(t);
  }, [toast]);

  const pinnedCount = pinnedIds.length;
  const showingPinTab = activeTab === 'pin';

  return (
    <IOSFrame>
      <div style={{
        height:'100%', display:'flex', flexDirection:'column',
        background:'#000', color:'#fff', overflow:'hidden',
        position:'relative',
      }}>
        <TopHeader pinnedCount={pinnedCount}/>
        <TabChips
          tabs={TABS}
          active={activeTab}
          onChange={setActiveTab}
          pinnedCount={pinnedCount}
        />

        {/* SCROLL AREA */}
        <div
          ref={scrollRef}
          className="scroll-area"
          style={{
            flex: 1, overflowY:'auto', padding:'4px 8px 80px',
            scrollbarWidth:'none',
          }}
        >
          {showingPinTab && pinnedCount === 0 && (
            <EmptyState
              message="No Pinned events"
              hint="Tap the pin icon on any live event to pin it to the top of your lobby."
            />
          )}

          {/* HOT TAB — grouped by sport, but events within a sport are standalone (no league grouping) */}
          {activeTab === 'hot' && (() => {
            const isRG = tweaks.hotMode === 'roland-garros';
            // In Roland-Garros mode, the hot pool is replaced by tournament events
            // and the Crunch Time slot is suppressed.
            const baseHot = isRG
              ? (window.ROLAND_GARROS_EVENTS || [])
              : events.filter(e => e.hot);
            const hotItems = baseHot.slice(0, isRG ? 2 : 5);
            if (hotItems.length === 0) {
              return <div style={{ padding: 40, textAlign:'center', color:'#828282', fontSize: 13 }}>No hot events right now</div>;
            }
            const order = ['football','tennis','basketball','volleyball'];
            const sportIcons = {
              football: 'assets/icon-football-color.svg',
              tennis: 'assets/icon-tennis-color.svg',
              basketball: 'assets/icon-basketball-color.svg',
              volleyball: 'assets/icon-baseball.svg',
            };
            // ── CRUNCH TIME — randomized decisive event from a pool of football / tennis / basketball.
            // Suppressed entirely when the Roland-Garros variation is active.
            // ── CRUNCH TIME — hidden for now (will be restored later)
            const pool = [];
            const decisive = pool.length > 0 ? pool[hottestIdx % pool.length] : null;
            const hottestNow = decisive ? (
              <React.Fragment key="hottest-now">
                <SectionHeader
                  icon={<img src={asset(sportIcons[decisive.sport])} width="22" height="22" alt=""/>}
                  title="Crunch Time"
                />
                <MultiplasRow on={multiplas} onToggle={setMultiplas}
                  defaultMarket={decisive.sport === 'tennis' ? 'Winner' : 'Match Winner'}/>
                <HottestNowCard
                  event={decisive}
                  isPinned={pinnedIds.includes(decisive.id)}
                  onTogglePin={handleTogglePin}
                  cardRefs={cardRefs}
                  multiplas={multiplas}
                />
              </React.Fragment>
            ) : null;
            // Exclude the crunch time event from the rest of the list
            const remaining = decisive
              ? hotItems.filter(e => e.id !== decisive.id)
              : hotItems;
            const groups = order
              .map(sport => ({ sport, items: remaining.filter(e => e.sport === sport) }))
              .filter(g => g.items.length > 0);
            return <>
              {hottestNow}
              {groups.map(g => (
              <React.Fragment key={g.sport}>
                <SectionHeader
                  icon={<img src={asset(sportIcons[g.sport])} width="22" height="22" alt=""/>}
                  title={window.SPORTS[g.sport]?.label || g.sport}
                  count={g.items.length}
                />
                <MultiplasRow on={multiplas} onToggle={setMultiplas}
                  defaultMarket={g.sport === 'tennis' ? 'Winner' : 'Match Winner'}/>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8 }}>
                  {g.items.map(e => (
                    <div key={e.id}
                         ref={node => { if (node) cardRefs.current[e.id] = node; }}
                         style={{ borderRadius: 12, overflow: 'hidden', background: '#1e1e1e' }}>
                      <EventCard
                        event={e}
                        isPinned={pinnedIds.includes(e.id)}
                        onTogglePin={handleTogglePin}
                        isLast={true}
                        multiplas={multiplas}
                      />
                    </div>
                  ))}
                </div>
              </React.Fragment>
            ))}</>;
          })()}

          {/* GROUP-BY-SPORT RENDER for Pin tab */}
          {showingPinTab && (() => {
            const list = pinnedIds.map(id => findEvent(id)).filter(Boolean);
            const order = ['football','tennis','basketball','volleyball'];

            // Hottest Now pinned events always render at the top of Pin tab,
            // in pinned-order (most recent first), regardless of sport.
            const hotPinnedTop = list.filter(e => e.id.startsWith('hn-'));
            const sportItems = list.filter(e => !e.id.startsWith('hn-'));

            const groups = order
              .map(sport => ({ sport, items: sportItems.filter(e => e.sport === sport) }))
              .filter(g => g.items.length > 0);

            const sportIconMap = {
              football: 'assets/icon-football-color.svg',
              tennis: 'assets/icon-tennis-color.svg',
              basketball: 'assets/icon-basketball-color.svg',
              volleyball: 'assets/icon-baseball.svg',
            };

            return (
              <>
                {hotPinnedTop.length > 0 && (
                  <>
                    <SectionHeader
                      icon={<img src={asset(sportIconMap[hotPinnedTop[0].sport])} width="22" height="22" alt=""/>}
                      title="Crunch Time"
                    />
                    <MultiplasRow on={multiplas} onToggle={setMultiplas}
                      defaultMarket={hotPinnedTop[0].sport === 'tennis' ? 'Winner' : 'Match Winner'}/>
                    {hotPinnedTop.map(e => (
                      <HottestNowCard
                        key={e.id}
                        event={e}
                        isPinned={true}
                        onTogglePin={handleTogglePin}
                        cardRefs={cardRefs}
                        multiplas={multiplas}
                      />
                    ))}
                  </>
                )}
                {groups.map(g => (
                  <React.Fragment key={g.sport}>
                    <SectionHeader
                      icon={
                        g.sport === 'football' ? <img src={asset("assets/icon-football-color.svg")} width="22" height="22" alt=""/> :
                        g.sport === 'tennis' ? <img src={asset("assets/icon-tennis-color.svg")} width="22" height="22" alt=""/> :
                        g.sport === 'basketball' ? <img src={asset("assets/icon-basketball-color.svg")} width="22" height="22" alt=""/> :
                        g.sport === 'volleyball' ? <img src={asset("assets/icon-baseball.svg")} width="22" height="22" alt=""/> :
                        null
                      }
                      title={window.SPORTS[g.sport]?.label || g.sport}
                      count={g.items.length}
                    />
                    <MultiplasRow on={multiplas} onToggle={setMultiplas}
                      defaultMarket={g.sport === 'tennis' ? 'Winner' : 'Match Winner'}/>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8 }}>
                      {g.items.map(e => (
                        <div key={e.id}
                             ref={node => { if (node) cardRefs.current[e.id] = node; }}
                             style={{ borderRadius: 12, overflow: 'hidden', background: '#1e1e1e' }}>
                          <EventCard
                            event={e}
                            isPinned={true}
                            onTogglePin={handleTogglePin}
                            isLast={true}
                            multiplas={multiplas}
                          />
                        </div>
                      ))}
                    </div>
                  </React.Fragment>
                ))}
              </>
            );
          })()}

          {/* SINGLE-SPORT TAB RENDER (Football / Tennis / Basketball / Volleyball) */}
          {activeTab === 'pulse' && <window.PulseTab/>}

          {!showingPinTab && activeTab !== 'hot' && activeTab !== 'pulse' && (
            <>
              {pinnedVisible.length > 0 && (() => {
                const hotPinned = pinnedVisible.filter(e => e.id.startsWith('hn-'));
                const normal = pinnedVisible.filter(e => !e.id.startsWith('hn-'));
                return (
                <>
                  <SectionHeader
                    icon={<img src={asset("assets/pinned-section.svg")} width={20} height={20} alt=""/>}
                    title="Pinned"
                    count={pinnedVisible.length}
                  />
                  {hotPinned.map(e => (
                    <HottestNowCard
                      key={e.id}
                      event={e}
                      isPinned={true}
                      onTogglePin={handleTogglePin}
                      cardRefs={cardRefs}
                    />
                  ))}
                  {normal.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8 }}>
                      {normal.map(e => (
                        <div key={e.id}
                             ref={node => { if (node) cardRefs.current[e.id] = node; }}
                             style={{ borderRadius: 12, overflow: 'hidden', background: '#1e1e1e' }}>
                          <EventCard event={e} isPinned={true} onTogglePin={handleTogglePin} isLast={true} multiplas={multiplas}/>
                        </div>
                      ))}
                    </div>
                  )}
                </>
                );
              })()}
              {(() => {
                const grp = renderLeagueGroups(restVisible, activeTab, { pinnedIds, handleTogglePin, cardRefs, collapsedLeagues, toggleLeague, multiplas });
                const allOpen = grp.leagueKeys.every(k => !collapsedLeagues.has(k));
                return (
                  <>
                    <SectionHeader
                      icon={<img src={asset("assets/icon-popular.svg")} width="20" height="20" alt=""/>}
                      title="Popular"
                      count={restVisible.length}
                      allOpen={allOpen}
                      onToggleAll={() => toggleAllInScope(grp.leagueKeys)}
                    />
                    <MultiplasRow on={multiplas} onToggle={setMultiplas}
                      defaultMarket={activeTab === 'tennis' ? 'Winner' : 'Match Winner'}/>
                    {grp.node}

                    {/* A-Z — less popular leagues, grouped by league in alphabetical order */}
                    {['football','tennis','basketball'].includes(activeTab) && (() => {
                      const az = events
                        .filter(e => e.sport === activeTab && e.az && !pinnedIds.includes(e.id))
                        .sort((a, b) => (a.league || '').localeCompare(b.league || ''));
                      if (az.length === 0) return null;
                      const azGrp = renderLeagueGroups(az, `az-${activeTab}`, { pinnedIds, handleTogglePin, cardRefs, collapsedLeagues, toggleLeague, multiplas });
                      const azAllOpen = azGrp.leagueKeys.every(k => !collapsedLeagues.has(k));
                      return (
                        <>
                          <SectionHeader
                            icon={<img src={asset("assets/icon-a-z.svg")} width="20" height="20" alt=""/>}
                            title="A-Z"
                            count={az.length}
                            allOpen={azAllOpen}
                            onToggleAll={() => toggleAllInScope(azGrp.leagueKeys)}
                          />
                          {azGrp.node}
                        </>
                      );
                    })()}
                  </>
                );
              })()}
            </>
          )}
        </div>

        {/* TOAST */}
        {toast && (
          <div style={{
            position:'absolute', left:'50%', bottom: 24,
            transform:'translateX(-50%)',
            background:'#1e1e1e', border:'1px solid #323232',
            padding:'10px 14px', borderRadius: 99,
            display:'flex', alignItems:'center', gap: 8,
            color:'#fff', fontSize: 13, fontWeight: 500,
            boxShadow:'0 8px 24px rgba(0,0,0,0.6)',
            animation:'kto-toast-in 220ms cubic-bezier(.2,1.2,.4,1)',
            zIndex: 20,
          }}>
            <img src={asset("assets/toast-pin.svg")} width="14" height="14" alt=""
              style={{ opacity: toast.kind === 'pin' ? 1 : 0.5 }}/>
            <span>{toast.text}</span>
          </div>
        )}
      </div>
      {window.TweaksPanel && (
        <window.TweaksPanel title="Hot tab variations">
          <window.TweakSection label="Hot tab content">
            <window.TweakRadio
              label="Mode"
              value={tweaks.hotMode}
              options={[
                { value: 'default',       label: 'Default' },
                { value: 'roland-garros', label: 'Roland Garros' },
              ]}
              onChange={(v) => { setTweaks('hotMode', v); setActiveTab('hot'); }}
            />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </IOSFrame>
  );
}

// ========== iOS frame wrapper (uses copied starter component) ==========
function IOSFrame({ children }) {
  const Frame = window.IOSDevice;
  if (!Frame) {
    return <div style={{ width: 390, height: 844, background:'#000', borderRadius: 36, overflow:'hidden' }}>{children}</div>;
  }
  return (
    <Frame width={390} height={844} dark>
      <div style={{ paddingTop: 50, height: '100%' }}>{children}</div>
    </Frame>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
