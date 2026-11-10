// data-sunday.jsx — busy-Sunday live-event model. Overrides INITIAL_EVENTS.
// ?snap=pm → 15:30 CET / 11:30 BRT (Europe peak, 12 football live)   ?snap=eve → 21:30 CET / 17:30 BRT (Brazil + evening Europe)
(function(){
  Object.assign(window.LEAGUES, { 'Nitto ATP Finals':{country:'it'}, 'Copa do Brasil':{country:'br'}, 'PlusLiga':{country:'intl'}, 'MLS':{country:'us'}, 'Liga Profesional':{country:'ar'}, 'Primera División':{country:'cl'}, 'Liga BetPlay':{country:'co'} });
  const AZ = new Set(['Brasileirão Série A','Brasileirão Série B','Copa do Brasil','Eredivisie','Primeira Liga','Süper Lig','ATP Challenger','WTA 125','Liga ACB','BBL','Liga Profesional','Primera División','Liga BetPlay']);
  const o3 = a => [{label:'1',price:a[0]},{label:'X',price:a[1]},{label:'2',price:a[2]}];
  const F = (id,league,flag,min,h,hs,a,as,odds,x={}) => ({ id, sport:'football', league, flag, az:AZ.has(league)||undefined, live:{minute:min}, home:{name:h,score:hs}, away:{name:a,score:as}, market:'Match Winner', odds:o3(odds), ...x });
  const T = (id,league,flag,min,h,hs,a,as,oh,oa,x={}) => ({ id, sport:'tennis', league, flag, az:AZ.has(league)||undefined, live:{minute:min}, twoWay:true, home:{name:h,sets:hs}, away:{name:a,sets:as}, market:'Match Winner', odds:[{label:h,price:oh},{label:a,price:oa}], ...x });
  const B = (id,league,flag,min,h,hs,a,as,oh,oa,ln,x={}) => ({ id, sport:'basketball', league, flag, az:AZ.has(league)||undefined, live:{minute:min}, twoWay:true, home:{name:h,score:hs}, away:{name:a,score:as}, market:'Match Winner', odds:[{label:ln[0],price:oh},{label:ln[1],price:oa}], ...x });
  const V = (id,league,flag,min,h,hs,a,as,oh,oa,ln) => ({ id, sport:'volleyball', league, flag, live:{minute:min}, twoWay:true, home:{name:h,sets:hs}, away:{name:a,sets:as}, market:'Match Winner', odds:[{label:ln[0],price:oh},{label:ln[1],price:oa}] });

  const PM = [
    F('fl1','Ligue 1','fr',"31'",'PSG',1,'Marseille',0,['1.45','4.60','6.50'],{hot:true,fomo:'Hot'}),
    F('fl2','Ligue 1','fr',"30'",'Lyon',0,'Monaco',1,['3.20','3.40','2.15']),
    F('f2','Premier League','uk',"31'",'Man City',0,'Arsenal',0,['1.95','3.50','3.80'],{hot:true,fomo:'Hot'}),
    F('f2b','Premier League','uk',"30'",'Liverpool',1,'Chelsea',0,['1.55','4.20','5.60']),
    F('f3','La Liga','es',"75'",'Real Madrid',2,'Barcelona',1,['1.32','6.50','9.00'],{hot:true,fomo:'Trending'}),
    F('f4','Serie A','it',"31'",'Inter',1,'Juventus',0,['1.70','3.60','5.20']),
    F('f4b','Serie A','it',"30'",'Milan',0,'Napoli',0,['2.45','3.10','2.85']),
    F('f7','Bundesliga','de',"2'",'Bayern Munich',0,'Dortmund',0,['1.55','4.20','5.40']),
    F('f7b','Bundesliga','de',"1'",'Leverkusen',0,'RB Leipzig',0,['2.10','3.50','3.30']),
    F('fz1','Eredivisie','nl','HT','Ajax',1,'Feyenoord',1,['2.20','3.10','2.95']),
    F('fz1b','Eredivisie','nl','HT','PSV',2,'AZ Alkmaar',0,['1.18','7.50','14.0']),
    F('fz4','Süper Lig','tr',"75'",'Fenerbahçe',1,'Galatasaray',1,['2.60','2.90','2.80'],{hot:true}),
    T('t1','Nitto ATP Finals','it','SET 2 GAME 4','Sinner',[6,2],'Zverev',[4,2],'1.38','3.10',{hot:true,fomo:'Trending'}),
    T('tz1','ATP Challenger','intl','SET 2 GAME 3','Arnaldi',[4,1],'Zhang',[6,2],'3.10','1.36'),
    T('tz1b','ATP Challenger','intl','SET 1 GAME 8','Moutet',[5],'Etcheverry',[3],'1.62','2.25'),
    T('tz1c','ATP Challenger','intl','SET 3 GAME 2','Bellucci',[6,3,1],'Navone',[4,6,1],'1.90','1.90'),
    T('tz2','WTA 125','intl','SET 1 GAME 7','Bouzkova',[4],'Cocciaretto',[3],'1.72','2.10'),
    T('tz2b','WTA 125','intl','SET 2 GAME 5','Kostyuk',[6,2],'Bucsa',[3,3],'1.28','3.60'),
    B('bz2','Liga ACB','es','Q3 6:40','Baskonia',58,'Valencia',61,'1.95','1.85',['Baskonia','Valencia']),
    B('bz3','BBL','uk','Q2 3:05','London Lions',41,'Manchester Giants',36,'1.45','2.70',['London Lions','Manchester Giants']),
    V('v2','PlusLiga','intl','SET 2','Jastrzębski',[25,14],'ZAKSA',[20,16],'1.50','2.45',['Jastrzębski','ZAKSA']),
  ];
  const EVE = [
    F('f3b','La Liga','es',"31'",'Atlético Madrid',1,'Sevilla',0,['1.55','3.80','5.50'],{hot:true,fomo:'Hot'}),
    F('f4c','Serie A','it',"45'",'Roma',0,'Lazio',1,['2.70','3.10','2.70']),
    F('fl3','Ligue 1','fr',"45'",'Lille',1,'Nice',1,['2.60','2.95','2.90']),
    F('f1','Brasileirão Série A','br',"76'",'Flamengo',1,'Palmeiras',1,['1.85','3.40','4.20'],{hot:true,decisive:true,fomoMessage:'FLAMENGO FIGHTING HARD FOR THE WIN!',fomo:'Trending',odds:[{label:'1',price:'1.85',trend:'up'},{label:'X',price:'3.40'},{label:'2',price:'4.20',trend:'down'}]}),
    F('f1c','Brasileirão Série A','br',"75'",'Atlético Mineiro',0,'Corinthians',0,['2.10','3.05','3.60']),
    F('f1d','Brasileirão Série A','br',"76'",'Cruzeiro',1,'Vasco',1,['1.95','3.20','3.80']),
    F('f1e','Brasileirão Série B','br',"75'",'Santos',2,'Sport Recife',1,['1.50','4.10','6.20']),
    F('f1f','Brasileirão Série B','br',"76'",'Goiás',0,'Coritiba',0,['2.30','2.95','3.40']),
    F('f1b','Copa do Brasil','br',"90+'",'Fluminense',1,'Bahia',1,['1.89','3.22','2.32'],{hot:true,fomo:'Hot',penalties:{home:3,away:2},odds:[{label:'1',price:'1.89'},{label:'X',price:'3.22'},{label:'2',price:'2.32',trend:'up'}]}),
    F('fz2','Primeira Liga','pt',"15'",'Benfica',0,'Porto',0,['1.95','3.20','3.80']),
    F('fz4b','Süper Lig','tr',"76'",'Beşiktaş',2,'Trabzonspor',1,['1.40','4.60','7.00']),
    T('t1e','Nitto ATP Finals','it','SET 1 GAME 5','Alcaraz',[3],'Djokovic',[2],'1.55','2.45',{hot:true,fomo:'Hot'}),
    T('tz1d','ATP Challenger','intl','SET 2 GAME 6','Seyboth Wild',[6,3],'Cerúndolo',[2,3],'1.34','3.20'),
    T('tz1e','ATP Challenger','intl','SET 1 GAME 4','Collignon',[2],'Mpetshi Perricard',[2],'2.20','1.65'),
    B('b1','NBA','us','Q4 1:14','LA Lakers',78,'Boston Celtics',82,'2.40','1.55',['Lakers','Celtics'],{hot:true,decisive:true,fomoMessage:'CELTICS ONE BUCKET AWAY FROM STEALING IT!',fomo:'Hot'}),
    B('b1b','NBA','us','Q1 9:20','Golden State',6,'Phoenix Suns',4,'1.85','1.95',['Warriors','Suns']),
    B('b2','NBB','br','Q2 6:18','Flamengo Basquete',41,'Minas',38,'1.62','2.20',['Flamengo','Minas']),
    V('v1','Superliga','br','SET 2','Sada Cruzeiro',[25,18],'Minas Tênis',[22,21],'1.40','2.95',['Cruzeiro','Minas']),
  ];
  const FRI = [
    F('f7','Bundesliga','de','HT','Frankfurt',1,'Stuttgart',1,['2.50','3.40','2.80'],{hot:true,fomo:'Trending'}),
    F('f3','La Liga','es',"30'",'Valencia',0,'Getafe',0,['2.15','3.00','3.60']),
    F('fl2','Ligue 1','fr',"45'",'Rennes',1,'Lens',0,['2.30','3.20','3.10']),
    F('fz4','Süper Lig','tr',"75'",'Konyaspor',1,'Kayserispor',0,['1.75','3.50','4.80']),
    F('fz2','Primeira Liga','pt',"15'",'Braga',0,'Sporting',0,['3.10','3.30','2.20']),
    T('tz1','ATP Challenger','intl','SET 2 GAME 3','Arnaldi',[4,1],'Zhang',[6,2],'3.10','1.36',{hot:true}),
    T('tz1b','ATP Challenger','intl','SET 1 GAME 8','Moutet',[5],'Etcheverry',[3],'1.62','2.25'),
    T('tz2','WTA 125','intl','SET 1 GAME 7','Bouzkova',[4],'Cocciaretto',[3],'1.72','2.10'),
    B('bz1','EuroLeague','intl','Q3 5:12','Real Madrid',68,'Olympiacos',64,'1.70','2.10',['Real Madrid','Olympiacos'],{hot:true,fomo:'Hot'}),
    B('bz1b','EuroLeague','intl','Q2 2:30','Barcelona',44,'Fenerbahçe',46,'1.85','1.95',['Barcelona','Fenerbahçe']),
    B('bz2','Liga ACB','es','Q4 4:10','Baskonia',70,'Valencia',66,'1.60','2.30',['Baskonia','Valencia']),
    V('v2','PlusLiga','intl','SET 2','Jastrzębski',[25,14],'ZAKSA',[20,16],'1.50','2.45',['Jastrzębski','ZAKSA']),
  ];
  const NBA = [
    B('b1','NBA','us','Q3 4:12','Boston Celtics',74,'LA Lakers',71,'1.55','2.40',['Celtics','Lakers'],{hot:true,decisive:true,fomo:'Sizzling',fomoMessage:'CELTICS AND LAKERS TRADING BASKETS IN THE THIRD!'}),
    B('b1b','NBA','us','Q3 8:40','Golden State',62,'Denver Nuggets',65,'2.05','1.80',['Warriors','Nuggets'],{hot:true,fomo:'Hot'}),
    B('b1c','NBA','us','Q2 2:15','New York Knicks',51,'Milwaukee Bucks',53,'1.90','1.90',['Knicks','Bucks'],{hot:true,fomo:'Hot'}),
    B('b1d','NBA','us','Q2 7:30','Oklahoma City',44,'Dallas Mavericks',40,'1.45','2.70',['Thunder','Mavericks'],{hot:true,fomo:'Trending'}),
    B('b1e','NBA','us','Q1 5:05','Miami Heat',18,'Philadelphia 76ers',20,'2.10','1.75',['Heat','76ers']),
    B('b1f','NBA','us','Q1 9:50','Minnesota',3,'San Antonio',2,'1.60','2.30',['Timberwolves','Spurs']),
    F('f1','Brasileirão Série A','br','HT','Flamengo',1,'Palmeiras',1,['1.85','3.40','4.20'],{hot:true,az:false}),
    F('f1d','Brasileirão Série A','br','HT','Cruzeiro',0,'Vasco',0,['1.95','3.20','3.80'],{az:false}),
    F('f8','MLS','us','HT','Inter Miami',1,'Columbus Crew',1,['1.90','3.60','3.80']),
    F('f8b','MLS','us',"31'",'LAFC',0,'Seattle Sounders',1,['2.05','3.50','3.30']),
    F('fz6','Liga Profesional','ar',"75'",'River Plate',2,'Talleres',0,['1.30','4.60','9.50']),
    F('fz6b','Liga Profesional','ar',"76'",'Boca Juniors',1,'Racing Club',1,['2.40','2.90','3.20']),
    F('fz7','Primera División','cl','HT','Colo-Colo',1,'Universidad de Chile',0,['2.20','3.10','3.00']),
    F('fz8','Liga BetPlay','co',"30'",'Atlético Nacional',0,'Millonarios',0,['2.00','3.10','3.70']),
    T('tz1','ATP Challenger','intl','SET 2 GAME 5','Ficovich',[6,3],'Gaio',[3,2],'1.40','2.90'),
    T('tz2','WTA 125','intl','SET 1 GAME 6','Kessler',[3],'Birrell',[3],'1.80','2.00'),
    V('v1','Superliga','br','SET 3','Sada Cruzeiro',[25,18,12],'Minas Tênis',[22,25,14],'1.70','2.15',['Cruzeiro','Minas']),
  ];
  window.SCENARIOS = { pm: PM, eve: EVE, fri: FRI, nba: NBA };
  const q = new URLSearchParams(location.search).get('snap');
  const snap = ['eve','fri','nba'].includes(q) ? q : 'pm';
  const snapOld = new URLSearchParams(location.search).get('snap') === 'eve' ? 'eve' : 'pm';
  window.SNAPSHOT = snap;
  window.INITIAL_EVENTS = window.SCENARIOS[snap];
})();
