(() => {
  const N = 1, E = 2, S = 4, W = 8;
  const SAVE_KEY = "volt-v1";

  const LEVELS = [
    {
      name: "Primeiro choque",
      w: 3, h: 1, cells: "SIE",
      solved: [1, 1, 3], scramble: [0, 1, 0], par: 1,
      tip: "Gira o cano do meio. Ele precisa deitar pra ligar a bateria na lâmpada.",
    },
    {
      name: "Curva",
      w: 2, h: 2, cells: "S.LE",
      solved: [2, 0, 0, 3], scramble: [0, 0, 1, 0], par: 1,
      tip: "A peça em L vira a corrente. Gira ela até encostar na bateria e na lâmpada.",
    },
    {
      name: "Descida",
      w: 3, h: 3, cells: "SIL..I..E",
      solved: [1, 1, 2, 0, 0, 0, 0, 0, 0],
      scramble: [0, 1, 1, 0, 0, 1, 0, 0, 0], par: 3,
      tip: "A corrente só passa se os dois canos se tocarem. Fecha o caminho até a lâmpada.",
    },
    {
      name: "Divisão",
      w: 3, h: 3, cells: ".E.STE...",
      solved: [0, 2, 0, 1, 3, 3, 0, 0, 0],
      scramble: [0, 0, 0, 0, 1, 1, 0, 0, 0], par: 2,
      tip: "O T manda energia pra dois lados. As duas lâmpadas precisam acender.",
    },
    {
      name: "Serpente",
      w: 3, h: 3, cells: "SIL..IEIL",
      solved: [1, 1, 2, 0, 0, 0, 1, 1, 3],
      scramble: [0, 1, 1, 0, 0, 1, 0, 1, 0], par: 4,
    },
    {
      name: "Quina",
      w: 3, h: 3, cells: "SL..I..LE",
      solved: [1, 2, 0, 0, 0, 0, 0, 0, 3],
      scramble: [0, 1, 0, 0, 1, 0, 0, 1, 0], par: 3,
    },
    {
      name: "Corredor",
      w: 4, h: 4, cells: "SIIL...I...I...E",
      solved: [1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      scramble: [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0], par: 5,
    },
    {
      name: "Dois pólos",
      w: 4, h: 4, cells: ".E..STIE........",
      solved: [0, 2, 0, 0, 1, 3, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      scramble: [0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], par: 4,
    },
    {
      name: "Tridente",
      w: 3, h: 3, cells: "STE.I..E.",
      solved: [1, 1, 3, 0, 0, 0, 0, 0, 0],
      scramble: [0, 1, 1, 0, 1, 0, 0, 0, 0], par: 3,
    },
    {
      name: "Gancho",
      w: 3, h: 3, cells: "..ESIL...",
      solved: [0, 0, 2, 1, 1, 3, 0, 0, 0],
      scramble: [0, 0, 1, 0, 1, 1, 0, 0, 0], par: 3,
    },
    {
      name: "U invertido",
      w: 4, h: 4, cells: "SIL...I.EIL.....",
      solved: [1, 1, 2, 0, 0, 0, 0, 0, 1, 1, 3, 0, 0, 0, 0, 0],
      scramble: [0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0], par: 6,
    },
    {
      name: "Ramal",
      w: 4, h: 4, cells: "SITE..I...I...E.",
      solved: [1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      scramble: [0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0], par: 5,
    },
    {
      name: "Espiral",
      w: 3, h: 3, cells: "SIT..IEIL",
      solved: [1, 1, 1, 0, 0, 0, 1, 1, 3],
      scramble: [0, 1, 1, 0, 0, 1, 0, 1, 1], par: 5,
    },
    {
      name: "Ferradura",
      w: 4, h: 3, cells: "SIIL...IEIIL",
      solved: [1, 1, 1, 2, 0, 0, 0, 0, 1, 1, 1, 3],
      scramble: [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1], par: 6,
    },
    {
      name: "Rede",
      w: 4, h: 4, cells: "STIE.I...LIE....",
      solved: [1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0, 0],
      scramble: [0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0], par: 7,
    },
    {
      name: "Central",
      w: 4, h: 4, cells: "SIL...I...TE..E.",
      solved: [1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
      scramble: [0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0], par: 6,
    },
    {
      name: "Relé",
      w: 4, h: 4, cells: "....S...TIILLIEE",
      solved: [0,0,0,0,2,0,0,0,0,1,1,2,0,1,3,0],
      scramble: [0,0,0,0,1,0,0,0,0,1,0,1,1,1,0,0], par: 5,
    },
    {
      name: "Bobina",
      w: 4, h: 4, cells: "ETTE.IE.SL......",
      solved: [1,1,1,3,0,0,0,0,1,3,0,0,0,0,0,0],
      scramble: [0,0,1,1,0,1,1,0,0,1,0,0,0,0,0,0], par: 5,
    },
    {
      name: "Fusível",
      w: 4, h: 4, cells: "SIL...TE.EI..LL.",
      solved: [1,1,2,0,0,0,0,3,0,2,0,0,0,0,3,0],
      scramble: [1,1,0,0,0,0,0,1,0,1,1,0,0,0,1,0], par: 6,
    },
    {
      name: "Barramento",
      w: 4, h: 4, cells: "....E...ILIELTS.",
      solved: [0,0,0,0,2,0,0,0,0,1,1,3,0,3,3,0],
      scramble: [0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,0], par: 5,
    },
    {
      name: "Curto-circuito",
      w: 4, h: 4, cells: "LIE.TIE.I...S...",
      solved: [1,1,3,0,0,1,3,0,0,0,0,0,0,0,0,0],
      scramble: [0,1,1,0,1,1,0,0,1,0,0,0,0,0,0,0], par: 5,
    },
    {
      name: "Neutro",
      w: 4, h: 4, cells: "E...IEL.LTLESTIL",
      solved: [2,0,0,0,0,1,2,0,0,1,3,2,1,3,1,3],
      scramble: [0,0,0,0,0,1,1,0,0,1,1,1,1,1,1,0], par: 8,
    },
    {
      name: "Fase dois",
      w: 4, h: 4, cells: "E...TIE.LTISEL..",
      solved: [2,0,0,0,0,1,3,0,0,1,1,3,1,3,0,0],
      scramble: [1,0,0,0,1,1,0,0,1,0,1,1,1,0,0,0], par: 7,
    },
    {
      name: "Terra",
      w: 4, h: 4, cells: ".E...I..ETISLTIE",
      solved: [0,2,0,0,0,0,0,0,2,0,1,3,0,3,1,3],
      scramble: [0,0,0,0,0,1,0,0,1,1,0,1,1,0,1,1], par: 7,
    },
    {
      name: "Ampère",
      w: 4, h: 4, cells: "LIIETTL.ISI.LEE.",
      solved: [1,1,1,3,0,1,2,0,0,0,0,0,0,3,0,0],
      scramble: [1,1,0,0,1,1,1,0,1,1,1,0,0,0,1,0], par: 9,
    },
    {
      name: "Ohm",
      w: 5, h: 5, cells: "..........S....TIITELEEL.",
      solved: [0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,1,1,1,3,0,3,1,3,0],
      scramble: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,0,1,1,0], par: 7,
      tip: "O tabuleiro cresceu. Mesma regra: fecha o caminho até as lâmpadas.",
    },
    {
      name: "Watt",
      w: 5, h: 5, cells: ".E....I...ETLLS..LTE...LL",
      solved: [0,2,0,0,0,0,0,0,0,0,1,3,2,1,3,0,0,0,2,2,0,0,0,0,3],
      scramble: [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,0,0,0,0,1,1], par: 8,
    },
    {
      name: "Hertz",
      w: 5, h: 5, cells: ".......EL...LT..ELTL..SLE",
      solved: [0,0,0,0,0,0,0,1,2,0,0,0,1,2,0,0,1,3,0,2,0,0,1,3,0],
      scramble: [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,0,0,1,0,1], par: 8,
    },
    {
      name: "Indução",
      w: 5, h: 5, cells: "..........EITIE.STEL..LIL",
      solved: [0,0,0,0,0,0,0,0,0,0,1,1,1,1,3,0,1,2,1,2,0,0,0,1,3],
      scramble: [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,1,0,0,0,1,1], par: 9,
    },
    {
      name: "Capacitor",
      w: 5, h: 5, cells: ".......E..LIL..TS.EELIITL",
      solved: [0,0,0,0,0,0,0,2,0,0,1,1,3,0,0,0,3,0,2,2,0,1,1,3,3],
      scramble: [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,1,1,1,1,1,1,1], par: 10,
    },
    {
      name: "Diodo",
      w: 5, h: 5, cells: "....E...LL...IE..LXT..EES",
      solved: [0,0,0,0,2,0,0,0,1,3,0,0,0,0,2,0,0,1,0,2,0,0,0,0,0],
      scramble: [0,0,0,0,1,0,0,0,1,1,0,0,0,1,1,0,0,1,0,0,0,0,0,1,0], par: 7,
      tip: "A cruz é um cruzamento. Ela não gira — trabalha em volta.",
    },
    {
      name: "Anodo",
      w: 5, h: 5, cells: "........LS...LL..LTT.ELEE",
      solved: [0,0,0,0,0,0,0,0,1,3,0,0,0,0,2,0,0,1,1,2,0,1,3,0,0],
      scramble: [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,1,1,1,1], par: 8,
    },
    {
      name: "Catodo",
      w: 5, h: 5, cells: "..........LE..EILELLLTITS",
      solved: [0,0,0,0,0,0,0,0,0,0,1,3,0,0,2,0,1,3,1,3,0,3,1,3,3],
      scramble: [0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,0,1,1,0,1,1,0,1], par: 10,
    },
    {
      name: "Malha",
      w: 5, h: 5, cells: ".EL....I..SEXILILL.ELL...",
      solved: [0,1,2,0,0,0,0,0,0,0,2,1,0,1,2,0,1,3,0,0,0,3,0,0,0],
      scramble: [0,1,1,0,0,0,0,1,0,0,0,1,0,0,1,1,0,1,0,1,1,1,0,0,0], par: 10,
    },
    {
      name: "Subestação",
      w: 5, h: 5, cells: "LLLE.ILXILSLLEL.I....E...",
      solved: [1,2,1,3,0,0,0,0,1,2,0,1,3,1,3,0,0,0,0,0,0,0,0,0,0],
      scramble: [1,0,1,0,0,1,1,0,1,1,1,1,1,1,0,0,1,0,0,0,0,1,0,0,0], par: 12,
    },
    {
      name: "Alta tensão",
      w: 5, h: 5, cells: ".E....I...ETIL.ISLL.LITE.",
      solved: [0,2,0,0,0,0,0,0,0,0,2,0,1,2,0,0,0,1,3,0,0,1,3,3,0],
      scramble: [0,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,0,1,1,1,1,0], par: 11,
    },
    {
      name: "Baixa",
      w: 5, h: 5, cells: "..E...LLE..ILL.STI..ETL..",
      solved: [0,0,2,0,0,0,1,3,2,0,0,0,1,3,0,1,2,0,0,0,1,3,3,0,0],
      scramble: [0,0,1,0,0,0,1,1,1,0,0,1,1,1,0,1,1,1,0,0,0,0,1,0,0], par: 11,
    },
    {
      name: "Gerador",
      w: 5, h: 5, cells: "..SL..ELI...TTLEILLL..ETE",
      solved: [0,0,1,2,0,0,1,2,0,0,0,0,0,3,2,1,1,3,1,3,0,0,1,3,3],
      scramble: [0,0,1,1,0,0,1,1,1,0,0,0,1,1,1,1,1,1,0,1,0,0,0,1,0], par: 13,
    },
    {
      name: "Turbina",
      w: 5, h: 5, cells: "LEE..TIL..TIE..LTLS.ELLL.",
      solved: [1,3,2,0,0,0,1,3,0,0,0,1,3,0,0,0,1,2,2,0,1,3,0,3,0],
      scramble: [1,1,0,0,0,0,1,1,0,0,1,1,1,0,0,1,1,1,1,0,0,1,1,1,0], par: 14,
    },
    {
      name: "Rotor",
      w: 5, h: 5, cells: "..EES..LTI..EII..ITT..LLE",
      solved: [0,0,2,2,2,0,0,0,2,0,0,0,2,0,0,0,0,0,0,2,0,0,0,3,0],
      scramble: [0,0,1,1,1,0,0,1,1,1,0,0,1,1,0,0,0,1,1,0,0,0,1,1,1], par: 13,
    },
    {
      name: "Estator",
      w: 5, h: 5, cells: "...LE.ELXL.LTIS..IE...E..",
      solved: [0,0,0,1,3,0,2,1,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0],
      scramble: [0,0,0,0,1,0,1,1,0,1,0,1,1,1,1,0,0,0,1,0,0,0,1,0,0], par: 10,
    },
    {
      name: "Chave seccionadora",
      w: 5, h: 5, cells: ".EL....ILE..ITL.ETTI.SILE",
      solved: [0,1,2,0,0,0,0,0,1,3,0,0,0,0,2,0,1,3,2,0,0,1,1,3,0],
      scramble: [0,1,1,0,0,0,0,0,1,1,0,0,1,1,1,0,1,1,1,1,0,1,0,1,1], par: 14,
    },
    {
      name: "Disjuntor",
      w: 5, h: 5, cells: ".EILS.EIXL...IE..LTI.ELLL",
      solved: [0,1,1,2,2,0,1,1,0,3,0,0,0,0,2,0,0,1,2,0,0,1,3,0,3],
      scramble: [0,1,0,1,1,0,1,1,0,1,0,0,0,1,0,0,0,1,1,1,0,1,1,1,1], par: 14,
    },
    {
      name: "Painel",
      w: 5, h: 5, cells: "..E....ISL.ETLL.ETTE.LLLL",
      solved: [0,0,2,0,0,0,0,0,1,2,0,1,2,1,3,0,2,0,2,2,0,0,3,0,3],
      scramble: [0,0,1,0,0,0,0,1,1,1,0,1,1,1,1,0,1,1,1,1,0,0,1,1,0], par: 14,
    },
    {
      name: "Cabine",
      w: 5, h: 5, cells: "ELITEIILTLTTE.SEI...EL...",
      solved: [2,1,1,1,3,0,0,1,3,2,0,2,0,0,0,0,0,0,0,0,1,3,0,0,0],
      scramble: [1,1,1,1,1,1,1,0,0,1,1,1,1,0,1,1,1,0,0,0,1,1,0,0,0], par: 16,
    },
    {
      name: "Poço",
      w: 5, h: 5, cells: "..LLE.LLTTLTSEIE..EL.....",
      solved: [0,0,1,2,2,0,1,3,0,2,1,3,3,0,0,0,0,0,1,3,0,0,0,0,0],
      scramble: [0,0,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,0,0,0], par: 14,
    },
    {
      name: "Torre",
      w: 5, h: 5, cells: "...EL.ELTLLXLLLIISLIEE.LL",
      solved: [0,0,0,1,2,0,2,1,1,3,1,0,3,0,2,0,0,1,2,0,0,0,0,0,3],
      scramble: [0,0,0,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,1,1], par: 17,
    },
    {
      name: "Linha viva",
      w: 5, h: 5, cells: "LLLE.ITXL.IIELEILE..LS...",
      solved: [1,2,1,3,0,0,0,0,2,0,0,0,0,0,3,0,0,3,0,0,0,3,0,0,0],
      scramble: [1,1,0,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1,0,0,1,1,0,0,0], par: 16,
    },
    {
      name: "Arco",
      w: 5, h: 5, cells: "...LL.ETLIELELL.LIXL.EILS",
      solved: [0,0,0,1,2,0,1,1,3,0,1,2,0,1,3,0,0,1,0,2,0,1,1,3,0],
      scramble: [0,0,0,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,0,1,0,1,1,1,1], par: 17,
    },
    {
      name: "Plasma",
      w: 5, h: 5, cells: "LE...IE...TTIEEISILILIITL",
      solved: [1,3,0,0,0,0,2,0,0,0,0,3,1,3,2,0,1,1,2,0,0,1,1,3,3],
      scramble: [1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1], par: 18,
      tip: "Última fase. Fecha a rede inteira.",
    }
  ];

  const AudioFx = {
    ctx: null,
    master: null,
    muted: false,

    unlock() {
      if (!this.ctx) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.master = this.ctx.createGain();
        this.master.gain.value = 0;
        this.master.connect(this.ctx.destination);
        this.applyVolume();
      }
      if (this.ctx.state === "suspended") this.ctx.resume();
    },

    applyVolume() {
      const raw = Number(state.save.volume);
      const pct = Number.isFinite(raw) ? Math.min(100, Math.max(0, raw)) : 80;
      const gain = this.muted || pct <= 0 ? 0 : (pct / 100) * 0.95;
      if (this.master && this.ctx) {
        this.master.gain.setTargetAtTime(gain, this.ctx.currentTime, 0.04);
      }
    },

    tone({ freq = 440, dur = 0.12, type = "square", vol = 0.45, attack = 0.008, slide = 0, delay = 0 }) {
      if (this.muted || Number(state.save.volume) <= 0 || !this.ctx) return;
      const t = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(50, freq + slide), t + dur);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(vol, t + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain);
      gain.connect(this.master);
      osc.start(t);
      osc.stop(t + dur + 0.03);
    },

    noise(dur, vol) {
      if (this.muted || Number(state.save.volume) <= 0 || !this.ctx) return;
      const t = this.ctx.currentTime;
      const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * dur, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      const src = this.ctx.createBufferSource();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      src.buffer = buffer;
      filter.type = "lowpass";
      filter.frequency.value = 1400;
      gain.gain.setValueAtTime(vol, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.master);
      src.start(t);
    },

    ui() {
      this.tone({ freq: 660, dur: 0.08, type: "triangle", vol: 0.38 });
    },

    rotate() {
      this.noise(0.06, 0.28);
      this.tone({ freq: 190, dur: 0.08, type: "square", vol: 0.52 });
      this.tone({ freq: 380, dur: 0.07, type: "triangle", vol: 0.32, delay: 0.015 });
      this.tone({ freq: 760, dur: 0.04, type: "sine", vol: 0.18, delay: 0.03 });
    },

    lamp() {
      this.tone({ freq: 740, dur: 0.14, type: "triangle", vol: 0.5, slide: 220 });
      this.tone({ freq: 980, dur: 0.1, type: "sine", vol: 0.28, delay: 0.03 });
    },

    win() {
      const notes = [523, 659, 784, 1046];
      notes.forEach((freq, i) => {
        this.tone({ freq, dur: 0.22, type: "triangle", vol: 0.52, delay: i * 0.09 });
        this.tone({ freq: freq / 2, dur: 0.2, type: "square", vol: 0.18, delay: i * 0.09 });
      });
    },

    undo() {
      this.tone({ freq: 280, dur: 0.08, type: "sine", vol: 0.35, slide: -80 });
    },

    perfect() {
      [784, 988, 1175, 1568].forEach((freq, i) => {
        this.tone({ freq, dur: 0.2, type: "triangle", vol: 0.5, delay: i * 0.07 });
      });
    },

    connect() {
      this.tone({ freq: 520, dur: 0.09, type: "sine", vol: 0.36, slide: 180 });
    },

    humNodes: null,
    setHum(amount) {
      if (!this.ctx) return;
      if (this.muted || amount <= 0) {
        if (this.humNodes) this.humNodes.gain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.06);
        return;
      }
      if (!this.humNodes) {
        const osc = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc2.type = "triangle";
        osc.frequency.value = 62;
        osc2.frequency.value = 93;
        gain.gain.value = 0;
        osc.connect(gain);
        osc2.connect(gain);
        gain.connect(this.master);
        osc.start();
        osc2.start();
        this.humNodes = { osc, osc2, gain };
      }
      this.humNodes.gain.gain.setTargetAtTime(0.07 + amount * 0.16, this.ctx.currentTime, 0.08);
    },
  };

  const state = {
    screen: "menu",
    level: 0,
    rots: [],
    startRots: [],
    moves: 0,
    history: [],
    won: false,
    par: 1,
    selected: 0,
    save: loadSave(),
  };

  const els = {
    screens: {
      menu: document.getElementById("screen-menu"),
      how: document.getElementById("screen-how"),
      levels: document.getElementById("screen-levels"),
      play: document.getElementById("screen-play"),
    },
    board: document.getElementById("board"),
    coach: document.getElementById("coach"),
    lvlLabel: document.getElementById("lvl-label"),
    lvlName: document.getElementById("lvl-name"),
    moves: document.getElementById("stat-moves"),
    par: document.getElementById("stat-par"),
    liveStars: document.getElementById("live-stars"),
    settings: document.getElementById("settings"),
    setSound: document.getElementById("set-sound"),
    volSlider: document.getElementById("vol-slider"),
    volNum: document.getElementById("vol-num"),
    win: document.getElementById("win"),
    winTitle: document.getElementById("win-title"),
    winKicker: document.getElementById("win-kicker"),
    winStars: document.getElementById("win-stars"),
    winSub: document.getElementById("win-sub"),
    menuProgress: document.getElementById("menu-progress"),
    btnNext: document.getElementById("btn-next"),
    levelGrid: document.getElementById("level-grid"),
    fx: document.getElementById("fx"),
  };

  function clampVolume(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 80;
    return Math.min(100, Math.max(0, Math.round(n)));
  }

  function loadSave() {
    const fresh = { unlocked: 0, stars: [], muted: false, seenHow: false, volume: 80 };
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return fresh;
      const parsed = JSON.parse(raw);
      return {
        ...fresh,
        ...parsed,
        stars: Array.isArray(parsed.stars) ? parsed.stars : [],
        volume: clampVolume(parsed.volume ?? 80),
        muted: !!parsed.muted,
      };
    } catch (_) {
      return fresh;
    }
  }

  function persist() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state.save));
    } catch (_) {}
  }

  function show(name) {
    state.screen = name;
    Object.entries(els.screens).forEach(([key, el]) => {
      el.classList.toggle("active", key === name);
    });
    if (name === "menu") refreshMenu();
  }

  function totalStars() {
    return (state.save.stars || []).reduce((sum, n) => sum + (n || 0), 0);
  }

  function refreshMenu() {
    const got = totalStars();
    const max = LEVELS.length * 3;
    const perfects = (state.save.stars || []).filter((n) => n === 3).length;
    const cleared = LEVELS.every((_, i) => (state.save.stars[i] || 0) > 0);
    els.menuProgress.textContent = cleared
      ? `${got} / ${max} estrelas · você zerou`
      : `${got} / ${max} estrelas · ${perfects} perfeitos`;
    const next = nextPlayable();
    const play = document.getElementById("btn-play");
    if (cleared) play.textContent = "Jogar de novo";
    else play.textContent = got > 0 ? `Continuar · ${LEVELS[next].name}` : "Jogar tutorial";
  }

  function syncUnlock() {
    let unlocked = 0;
    for (let i = 0; i < LEVELS.length; i++) {
      if ((state.save.stars[i] || 0) > 0) unlocked = Math.min(i + 1, LEVELS.length - 1);
    }
    state.save.unlocked = unlocked;
  }

  function baseMask(type) {
    if (type === "I") return N | S;
    if (type === "L") return N | E;
    if (type === "T") return N | S | E;
    if (type === "X") return N | E | S | W;
    if (type === "S" || type === "E") return N;
    return 0;
  }

  function rotMask(mask, times) {
    let m = mask;
    const n = ((times % 4) + 4) % 4;
    for (let i = 0; i < n; i++) {
      let next = 0;
      if (m & N) next |= E;
      if (m & E) next |= S;
      if (m & S) next |= W;
      if (m & W) next |= N;
      m = next;
    }
    return m;
  }

  function cellAt(level, i) {
    return (level.cells[i] || ".").toUpperCase();
  }

  function maskAt(level, rots, i) {
    const type = cellAt(level, i);
    if (type === ".") return 0;
    return rotMask(baseMask(type), rots[i] || 0);
  }

  function analyze(level, rots) {
    const { w, h } = level;
    const powered = Array(w * h).fill(false);
    const dist = Array(w * h).fill(0);
    const queue = [];

    for (let i = 0; i < w * h; i++) {
      if (cellAt(level, i) === "S") {
        powered[i] = true;
        queue.push(i);
      }
    }

    const dirs = [
      { bit: N, opp: S, dx: 0, dy: -1 },
      { bit: E, opp: W, dx: 1, dy: 0 },
      { bit: S, opp: N, dx: 0, dy: 1 },
      { bit: W, opp: E, dx: -1, dy: 0 },
    ];

    while (queue.length) {
      const i = queue.shift();
      const x = i % w;
      const y = (i - x) / w;
      const mask = maskAt(level, rots, i);
      for (const d of dirs) {
        if (!(mask & d.bit)) continue;
        const nx = x + d.dx;
        const ny = y + d.dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const j = ny * w + nx;
        if (cellAt(level, j) === ".") continue;
        const other = maskAt(level, rots, j);
        if (!(other & d.opp)) continue;
        if (!powered[j]) {
          powered[j] = true;
          dist[j] = dist[i] + 1;
          queue.push(j);
        }
      }
    }

    let lamps = 0;
    let lit = 0;
    for (let i = 0; i < w * h; i++) {
      if (cellAt(level, i) === "E") {
        lamps += 1;
        if (powered[i]) lit += 1;
      }
    }
    return { powered, dist, lamps, lit, solved: lamps > 0 && lit === lamps };
  }

  function startRotsOf(level) {
    return level.solved.map((r, i) => {
      const off = Math.min(level.scramble[i] || 0, 1);
      return ((r + off) % 4);
    });
  }

  function rotKey(level, rots) {
    let key = "";
    for (let i = 0; i < level.w * level.h; i++) {
      const type = cellAt(level, i);
      if (type === ".") continue;
      const r = (rots[i] || 0) & 3;
      key += type === "I" ? String(r & 1) : String(r);
    }
    return key;
  }

  function minClicks(level) {
    const start = startRotsOf(level);
    if (analyze(level, start).solved) return 0;
    const slots = [];
    for (let i = 0; i < level.w * level.h; i++) {
      if (cellAt(level, i) !== ".") slots.push(i);
    }
    const seen = new Set([rotKey(level, start)]);
    const queue = [start];
    const dist = [0];
    let head = 0;
    while (head < queue.length) {
      const rots = queue[head];
      const d = dist[head];
      head += 1;
      for (const i of slots) {
        for (const dir of [1, -1]) {
          const next = rots.slice();
          next[i] = (next[i] + dir + 4) & 3;
          const key = rotKey(level, next);
          if (seen.has(key)) continue;
          if (analyze(level, next).solved) return d + 1;
          seen.add(key);
          queue.push(next);
          dist.push(d + 1);
        }
      }
    }
    return slots.length;
  }

  function starsFor(moves, par) {
    if (moves <= par) return 3;
    if (moves <= par + 2) return 2;
    return 1;
  }

  function starText(n) {
    return "★★★".slice(0, n) + "☆☆☆".slice(0, 3 - n);
  }

  function svgTile(type, mask, powered) {
    const isSource = type === "S";
    const isSink = type === "E";
    const col = powered
      ? (isSource ? "#f5c518" : isSink ? "#ff6aa2" : "#3dffdc")
      : "#44536b";
    const lines = [];
    if (mask & N) lines.push('<line x1="50" y1="50" x2="50" y2="0"/>');
    if (mask & E) lines.push('<line x1="50" y1="50" x2="100" y2="50"/>');
    if (mask & S) lines.push('<line x1="50" y1="50" x2="50" y2="100"/>');
    if (mask & W) lines.push('<line x1="50" y1="50" x2="0" y2="50"/>');
    let icon = `<circle cx="50" cy="50" r="10" fill="${col}"/>`;
    if (isSource) {
      const body = powered ? "#f5c518" : "#5b6b82";
      const plate = powered ? "#fff4b8" : "#2c3648";
      const tick = powered ? "#c48900" : "#1c2433";
      icon = `
        <circle cx="50" cy="50" r="22" fill="#0c1320"/>
        <rect x="41" y="24" width="18" height="8" rx="2.5" fill="${body}"/>
        <rect x="29" y="31" width="42" height="46" rx="7" fill="${body}"/>
        <rect x="35" y="38" width="30" height="32" rx="4" fill="${plate}"/>
        <rect x="39" y="58" width="22" height="5" rx="1.5" fill="${tick}"/>
        <rect x="39" y="50" width="22" height="5" rx="1.5" fill="${tick}"/>
        <rect x="39" y="42" width="22" height="5" rx="1.5" fill="${tick}"/>
      `;
    }
    if (isSink) {
      const glass = powered ? "#ff6aa2" : "#5b6b82";
      const core = powered ? "#fff" : "#141b28";
      icon = `
        <circle cx="50" cy="50" r="22" fill="#0c1320"/>
        <circle cx="50" cy="44" r="16" fill="${glass}"/>
        <circle cx="50" cy="44" r="7" fill="${core}"/>
        <rect x="43" y="58" width="14" height="10" rx="2" fill="${glass}"/>
        <rect x="41" y="68" width="18" height="5" rx="1.5" fill="${powered ? "#ff9ec0" : "#3d4b63"}"/>
      `;
    }
    return `<svg viewBox="0 0 100 100" aria-hidden="true">
      <g stroke="${col}" stroke-width="14" stroke-linecap="round">${lines.join("")}</g>
      ${icon}
    </svg>`;
  }

  function renderBoard(animateIndex = -1, dir = 1) {
    const level = LEVELS[state.level];
    const info = analyze(level, state.rots);
    els.board.style.gridTemplateColumns = `repeat(${level.w}, 1fr)`;
    els.board.innerHTML = "";
    const hintAt = tutorialHintIndex();

    for (let i = 0; i < level.w * level.h; i++) {
      const type = cellAt(level, i);
      const btn = document.createElement("button");
      btn.className = "tile";
      btn.type = "button";
      if (type === ".") {
        btn.classList.add("empty");
        btn.tabIndex = -1;
        btn.disabled = true;
      } else {
        if (type === "S") btn.classList.add("source");
        if (type === "E") btn.classList.add("sink");
        if (info.powered[i]) btn.classList.add("powered");
        btn.style.transitionDelay = `${(info.dist[i] || 0) * 40}ms`;
        btn.setAttribute("aria-label", type === "S" ? "Bateria" : type === "E" ? "Lâmpada" : type === "X" ? "Cruzamento" : "Cano");
        btn.innerHTML = svgTile(type, maskAt(level, state.rots, i), info.powered[i]);
        if (type !== "X") bindTile(btn, i);
        else btn.style.cursor = "default";
        if (i === state.selected) btn.classList.add("selected");
        if (i === hintAt) btn.classList.add("hint");
        if (i === animateIndex) btn.classList.add(dir < 0 ? "spin-ccw" : "spin");
      }
      els.board.appendChild(btn);
    }
    sizeBoard();
    return info;
  }

  function sizeBoard() {
    const wrap = els.board.parentElement;
    const level = LEVELS[state.level];
    if (!wrap || !level) return;
    const gap = 6;
    const pad = 4;
    const maxW = Math.max(80, wrap.clientWidth - pad);
    const maxH = Math.max(80, wrap.clientHeight - pad);
    const cell = Math.max(28, Math.floor(Math.min(
      (maxW - gap * (level.w - 1)) / level.w,
      (maxH - gap * (level.h - 1)) / level.h,
      88
    )));
    els.board.style.width = `${cell * level.w + gap * (level.w - 1)}px`;
    els.board.style.height = `${cell * level.h + gap * (level.h - 1)}px`;
  }

  function isTutorialLevel(index = state.level) {
    return index >= 0 && index <= 2;
  }

  function rotFits(type, a, b) {
    const ra = ((a % 4) + 4) % 4;
    const rb = ((b % 4) + 4) % 4;
    if (type === "." || type === "X") return true;
    if (type === "I") return (ra & 1) === (rb & 1);
    return ra === rb;
  }

  function tutorialHintIndex() {
    if (!isTutorialLevel() || state.won) return -1;
    const level = LEVELS[state.level];
    for (let i = 0; i < level.w * level.h; i++) {
      const type = cellAt(level, i);
      if (!rotFits(type, state.rots[i] || 0, level.solved[i] || 0)) return i;
    }
    return -1;
  }

  function coachCopy() {
    const level = LEVELS[state.level];
    if (state.won) return "";
    if (isTutorialLevel()) {
      const info = analyze(level, state.rots);
      if (state.level === 0) {
        return state.moves === 0
          ? "Gira o cano do meio. Ele precisa deitar pra ligar a bateria na lâmpada."
          : "Ainda em pé. Gira o cano do meio até ele deitar.";
      }
      if (state.level === 1) {
        const hint = tutorialHintIndex();
        const type = hint >= 0 ? cellAt(level, hint) : "";
        if (state.moves === 0) return "A peça em L vira a corrente. Gira ela até encostar na bateria e na lâmpada.";
        if (type === "L") return "A L precisa olhar pra cima (bateria) e pra direita (lâmpada).";
        if (type === "S") return "A bateria também gira. Aponta ela pra baixo, na L.";
        if (type === "E") return "A lâmpada precisa olhar pra esquerda, pra L.";
        return "Quase. Gira até os três se tocarem.";
      }
      const litPath = info.powered.filter(Boolean).length;
      if (litPath <= 1) {
        return state.moves === 0
          ? "A corrente só passa se os dois canos se tocarem. Fecha o caminho até a lâmpada."
          : "Soltou o fio. Cada cano precisa encostar no vizinho.";
      }
      return "A energia andou. Continua o caminho até a lâmpada embaixo.";
    }
    if (level.tip && state.moves === 0) return level.tip;
    return "";
  }

  function refreshCoach() {
    const text = coachCopy();
    if (!text) {
      els.coach.classList.add("hidden");
      els.coach.textContent = "";
      return;
    }
    if (isTutorialLevel()) {
      els.coach.innerHTML = `<span class="coach-kicker">tutorial ${state.level + 1} / 3</span>${text}`;
    } else {
      els.coach.textContent = text;
    }
    els.coach.classList.remove("hidden");
  }

  function updateHud() {
    const level = LEVELS[state.level];
    els.lvlLabel.textContent = isTutorialLevel()
      ? `Tutorial ${state.level + 1} / 3`
      : `Nível ${state.level + 1}`;
    els.lvlName.textContent = level.name;
    els.moves.textContent = String(state.moves);
    els.par.textContent = String(state.par);
    const nextStars = starsFor(state.moves, state.par);
    const prevStars = els.liveStars.dataset.stars ? Number(els.liveStars.dataset.stars) : 3;
    els.liveStars.textContent = starText(nextStars);
    if (nextStars < prevStars) {
      els.liveStars.classList.remove("drop");
      void els.liveStars.offsetWidth;
      els.liveStars.classList.add("drop");
    }
    els.liveStars.dataset.stars = String(nextStars);
    refreshCoach();
    if (state.screen === "play") sizeBoard();
  }

  function settingsOpen() {
    return !els.settings.classList.contains("hidden");
  }

  function syncSettingsUi() {
    const vol = clampVolume(state.save.volume);
    const muted = !!state.save.muted;
    els.setSound.textContent = muted ? "Desligado" : "Ligado";
    els.setSound.classList.toggle("off", muted);
    els.setSound.setAttribute("aria-pressed", muted ? "false" : "true");
    els.volSlider.value = String(vol);
    els.volNum.textContent = String(vol);
  }

  function openSettings() {
    AudioFx.unlock();
    syncSettingsUi();
    els.settings.classList.remove("hidden");
  }

  function closeSettings() {
    els.settings.classList.add("hidden");
  }

  function restoreHum() {
    if (state.screen !== "play") return;
    const level = LEVELS[state.level];
    if (!level) return;
    if (state.won) {
      AudioFx.setHum(0.45);
      return;
    }
    const info = analyze(level, state.rots);
    AudioFx.setHum(info.powered.filter(Boolean).length / Math.max(1, level.w * level.h));
  }

  function applySoundPref({ preview = false } = {}) {
    AudioFx.muted = !!state.save.muted;
    AudioFx.applyVolume();
    persist();
    syncSettingsUi();
    if (AudioFx.muted || clampVolume(state.save.volume) <= 0) AudioFx.setHum(0);
    else {
      restoreHum();
      if (preview) AudioFx.ui();
    }
  }

  function setMuted(muted) {
    state.save.muted = !!muted;
    applySoundPref({ preview: !muted });
  }

  function rotatableSlots() {
    const level = LEVELS[state.level];
    const slots = [];
    for (let i = 0; i < level.w * level.h; i++) {
      const type = cellAt(level, i);
      if (type !== "." && type !== "X") slots.push(i);
    }
    return slots;
  }

  function firstRotatable() {
    return rotatableSlots()[0] ?? 0;
  }

  function selectTile(index) {
    const type = cellAt(LEVELS[state.level], index);
    if (type === "." || type === "X") return;
    state.selected = index;
    [...els.board.children].forEach((el, i) => {
      el.classList.toggle("selected", i === index && !el.classList.contains("empty"));
    });
  }

  function moveSelect(dx, dy) {
    const level = LEVELS[state.level];
    let x = state.selected % level.w;
    let y = (state.selected - x) / level.w;
    for (let step = 1; step <= Math.max(level.w, level.h); step++) {
      const nx = x + dx * step;
      const ny = y + dy * step;
      if (nx < 0 || ny < 0 || nx >= level.w || ny >= level.h) break;
      const i = ny * level.w + nx;
      const type = cellAt(level, i);
      if (type !== "." && type !== "X") {
        selectTile(i);
        return;
      }
    }
  }

  function cycleSelect(dir) {
    const slots = rotatableSlots();
    if (!slots.length) return;
    let at = slots.indexOf(state.selected);
    if (at < 0) at = 0;
    else at = (at + dir + slots.length) % slots.length;
    selectTile(slots[at]);
  }

  function rotateSelected(dir) {
    if (cellAt(LEVELS[state.level], state.selected) === ".") {
      state.selected = firstRotatable();
    }
    rotate(state.selected, dir);
  }

  function bindTile(btn, index) {
    let sx = 0;
    let sy = 0;
    btn.addEventListener("contextmenu", (ev) => ev.preventDefault());
    btn.addEventListener("click", (ev) => ev.preventDefault());
    btn.addEventListener("pointerdown", (ev) => {
      selectTile(index);
      sx = ev.clientX;
      sy = ev.clientY;
      try { btn.setPointerCapture(ev.pointerId); } catch (_) {}
      if (ev.pointerType === "mouse" && ev.button === 2) rotate(index, 1);
    });
    btn.addEventListener("pointerup", (ev) => {
      const dx = ev.clientX - sx;
      const dy = ev.clientY - sy;
      if (ev.pointerType === "mouse") {
        if (ev.button === 0 && Math.abs(dx) < 12 && Math.abs(dy) < 12) rotate(index, -1);
        return;
      }
      if (Math.abs(dx) > 28 && Math.abs(dx) > Math.abs(dy)) rotate(index, dx > 0 ? 1 : -1);
      else if (Math.abs(dx) < 16 && Math.abs(dy) < 16) rotate(index, -1);
    });
  }

  function rotate(index, dir = 1) {
    if (state.won || settingsOpen()) return;
    const level = LEVELS[state.level];
    const type = cellAt(level, index);
    if (type === "." || type === "X") return;

    const before = analyze(level, state.rots);
    state.selected = index;
    state.history.push({ rots: state.rots.slice(), moves: state.moves });
    state.rots[index] = (state.rots[index] + dir + 4) % 4;
    state.moves += 1;
    AudioFx.rotate();
    if (navigator.vibrate) navigator.vibrate(12);

    const after = renderBoard(index, dir);
    updateHud();

    const beforeOn = before.powered.filter(Boolean).length;
    const afterOn = after.powered.filter(Boolean).length;
    if (afterOn > beforeOn) {
      AudioFx.connect();
      after.powered.forEach((on, i) => {
        if (on && !before.powered[i]) sparkAt(i, 16);
      });
    }
    if (after.lit > before.lit) {
      AudioFx.lamp();
      const gained = after.lit - before.lit;
      for (let i = 0; i < level.w * level.h; i++) {
        if (cellAt(level, i) === "E" && after.powered[i] && !before.powered[i]) {
          floatPop(gained > 1 ? "DUPLO!" : "LÂMPADA!", i);
        }
      }
    }
    AudioFx.setHum(afterOn / Math.max(1, level.w * level.h));
    if (after.solved) finishLevel();
  }

  function finishLevel() {
    state.won = true;
    const level = LEVELS[state.level];
    const stars = starsFor(state.moves, state.par);
    state.save.stars[state.level] = Math.max(state.save.stars[state.level] || 0, stars);
    state.save.unlocked = Math.max(state.save.unlocked, Math.min(state.level + 1, LEVELS.length - 1));
    persist();
    AudioFx.setHum(0.45);
    const card = els.win.querySelector(".win-card");
    const last = state.level >= LEVELS.length - 1;
    card.classList.toggle("finale", last);
    if (last) {
      els.winKicker.textContent = "rede completa";
      els.winTitle.textContent = "ZERADO!";
      card.classList.toggle("perfect", stars >= 3);
      AudioFx.perfect();
    } else if (stars >= 3) {
      els.winKicker.textContent = state.level === 2 ? "tutorial fechado" : state.level <= 1 ? `lição ${state.level + 1}` : "sem desperdício";
      els.winTitle.textContent = "PERFEITO!";
      card.classList.add("perfect");
      AudioFx.perfect();
    } else {
      els.winKicker.textContent = state.level === 2 ? "tutorial fechado" : state.level <= 1 ? `lição ${state.level + 1}` : "circuito fechado";
      els.winTitle.textContent = "LIGADO!";
      card.classList.remove("perfect");
      AudioFx.win();
    }
    burst(innerWidth / 2, innerHeight * 0.42, last ? 120 : stars >= 3 ? 90 : 55);
    document.getElementById("app").classList.remove("shake");
    void document.getElementById("app").offsetWidth;
    document.getElementById("app").classList.add("shake");
    els.winStars.textContent = starText(stars);
    const lesson = ["Gira a peça. A corrente segue o cano.", "A L vira a energia na quina.", "Os canos só passam corrente se se tocarem."];
    if (last) {
      els.winSub.textContent = "50 fases. A cidade tem luz.";
    } else if (isTutorialLevel()) {
      els.winSub.textContent = lesson[state.level];
    } else {
      els.winSub.textContent = `${state.moves} giro${state.moves === 1 ? "" : "s"} · meta ${state.par}`;
    }
    els.btnNext.textContent = last ? "Ver níveis" : "Próximo";
    setTimeout(() => els.win.classList.remove("hidden"), 280);
  }

  function openLevel(index) {
    const level = LEVELS[index];
    state.level = index;
    state.startRots = startRotsOf(level);
    state.rots = state.startRots.slice();
    state.par = level.par;
    AudioFx.setHum(0);
    state.moves = 0;
    state.history = [];
    state.won = false;
    const hint = tutorialHintIndex();
    state.selected = hint >= 0 ? hint : firstRotatable();
    els.win.classList.add("hidden");
    show("play");
    els.liveStars.dataset.stars = "3";
    renderBoard();
    requestAnimationFrame(() => requestAnimationFrame(sizeBoard));
    updateHud();
  }

  function nextPlayable() {
    for (let i = 0; i < LEVELS.length; i++) {
      if (!(state.save.stars[i] > 0)) return i;
    }
    return 0;
  }

  function renderLevels() {
    els.levelGrid.innerHTML = "";
    LEVELS.forEach((level, i) => {
      const locked = i > state.save.unlocked;
      const btn = document.createElement("button");
      btn.className = "lvl-btn";
      if (locked) btn.classList.add("locked");
      if (i <= 2) btn.classList.add("tutorial");
      if (i === nextPlayable()) btn.classList.add("current");
      const stars = state.save.stars[i] || 0;
      btn.innerHTML = `${i + 1}<small>${locked ? "🔒" : starText(stars)}</small>`;
      btn.addEventListener("click", () => {
        if (locked) return;
        AudioFx.ui();
        openLevel(i);
      });
      els.levelGrid.appendChild(btn);
    });
  }

  function sparkAt(index, n = 16) {
    const tile = els.board.children[index];
    if (!tile) return;
    const box = tile.getBoundingClientRect();
    burst(box.left + box.width / 2, box.top + box.height / 2, n);
  }

  function floatPop(text, index) {
    const tile = els.board.children[index];
    if (!tile) return;
    const box = tile.getBoundingClientRect();
    const pop = document.createElement("div");
    pop.className = "float-pop";
    pop.textContent = text;
    pop.style.left = `${box.left + box.width / 2}px`;
    pop.style.top = `${box.top}px`;
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), 750);
  }

  function burst(x = innerWidth / 2, y = innerHeight * 0.42, count = 70) {
    const canvas = els.fx;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const colors = ["#f5c518", "#3dffdc", "#ff4d8d", "#ffffff"];
    const parts = Array.from({ length: count }, () => ({
      x,
      y,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.9) * 12,
      life: 1,
      color: colors[(Math.random() * colors.length) | 0],
      size: 3 + Math.random() * 4,
    }));
    let frame = 0;
    const tick = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      parts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22;
        p.life -= 0.016;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      frame += 1;
      if (frame < 70) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, innerWidth, innerHeight);
    };
    tick();
  }

  function bootValidate() {
    LEVELS.forEach((level, i) => {
      const info = analyze(level, level.solved);
      if (!info.solved) console.error("Nível quebrado (solved):", i + 1, level.name, info);
      const need = (level.scramble || []).reduce((sum, n) => sum + (n ? 1 : 0), 0);
      if (need !== level.par) console.warn("Par diferente do scramble:", i + 1, level.name, need, level.par);
    });
  }

  document.body.addEventListener("pointerdown", () => {
    AudioFx.unlock();
    const hint = document.querySelector(".hint-audio");
    if (hint) hint.classList.add("hidden");
  }, { once: false });

  document.getElementById("btn-play").addEventListener("click", () => {
    AudioFx.unlock();
    AudioFx.ui();
    state.save.seenHow = true;
    persist();
    openLevel(nextPlayable());
  });

  document.getElementById("btn-how").addEventListener("click", () => {
    AudioFx.unlock();
    AudioFx.ui();
    show("how");
  });

  document.getElementById("how-back").addEventListener("click", () => {
    AudioFx.ui();
    show("menu");
  });

  document.getElementById("how-play").addEventListener("click", () => {
    AudioFx.ui();
    state.save.seenHow = true;
    persist();
    for (let i = 0; i < 3; i++) {
      if (!(state.save.stars[i] > 0)) {
        openLevel(i);
        return;
      }
    }
    openLevel(nextPlayable());
  });

  document.getElementById("btn-levels").addEventListener("click", () => {
    AudioFx.unlock();
    AudioFx.ui();
    renderLevels();
    show("levels");
  });

  document.getElementById("levels-back").addEventListener("click", () => {
    AudioFx.ui();
    show("menu");
  });

  document.getElementById("play-menu").addEventListener("click", () => {
    AudioFx.ui();
    els.win.classList.add("hidden");
    show("menu");
  });

  document.getElementById("btn-settings").addEventListener("click", () => {
    AudioFx.unlock();
    if (settingsOpen()) closeSettings();
    else openSettings();
  });

  els.setSound.addEventListener("click", () => {
    AudioFx.unlock();
    setMuted(!state.save.muted);
  });

  let volPreviewAt = 0;
  els.volSlider.addEventListener("input", () => {
    AudioFx.unlock();
    const vol = clampVolume(els.volSlider.value);
    state.save.volume = vol;
    if (vol <= 0) state.save.muted = true;
    else state.save.muted = false;
    const now = performance.now();
    const preview = vol > 0 && now - volPreviewAt > 160;
    if (preview) volPreviewAt = now;
    applySoundPref({ preview });
  });

  document.getElementById("set-close").addEventListener("click", () => {
    AudioFx.ui();
    closeSettings();
  });

  els.settings.addEventListener("click", (ev) => {
    if (ev.target === els.settings) closeSettings();
  });

  document.getElementById("btn-undo").addEventListener("click", () => {
    if (state.won || !state.history.length) return;
    const prev = state.history.pop();
    state.rots = prev.rots;
    state.moves = prev.moves;
    AudioFx.undo();
    const info = renderBoard();
    AudioFx.setHum(info.powered.filter(Boolean).length / Math.max(1, LEVELS[state.level].w * LEVELS[state.level].h));
    updateHud();
  });

  document.getElementById("btn-reset").addEventListener("click", () => {
    if (state.won) {
      openLevel(state.level);
      AudioFx.ui();
      return;
    }
    state.rots = state.startRots.slice();
    state.moves = 0;
    state.history = [];
    AudioFx.ui();
    const info = renderBoard();
    AudioFx.setHum(info.powered.filter(Boolean).length / Math.max(1, LEVELS[state.level].w * LEVELS[state.level].h));
    updateHud();
  });

  document.getElementById("btn-next").addEventListener("click", () => {
    AudioFx.ui();
    if (state.level >= LEVELS.length - 1) {
      els.win.classList.add("hidden");
      renderLevels();
      show("levels");
      return;
    }
    openLevel(state.level + 1);
  });

  document.getElementById("btn-win-menu").addEventListener("click", () => {
    AudioFx.ui();
    els.win.classList.add("hidden");
    show("menu");
  });

  document.getElementById("btn-rot-left").addEventListener("click", () => {
    if (state.won) return;
    rotateSelected(-1);
  });

  document.getElementById("btn-rot-right").addEventListener("click", () => {
    if (state.won) return;
    rotateSelected(1);
  });

  document.addEventListener("keydown", (ev) => {
    const key = ev.key;
    if (key === "Escape" && settingsOpen()) {
      ev.preventDefault();
      closeSettings();
      return;
    }
    if (key === "m" || key === "M") {
      ev.preventDefault();
      AudioFx.unlock();
      setMuted(!state.save.muted);
      return;
    }
    if (settingsOpen() || state.screen !== "play" || state.won) return;
    if (key === "ArrowLeft" || key === "a" || key === "A") {
      ev.preventDefault();
      rotateSelected(-1);
      return;
    }
    if (key === "ArrowRight" || key === "d" || key === "D") {
      ev.preventDefault();
      rotateSelected(1);
      return;
    }
    if (key === "ArrowUp" || key === "w" || key === "W") {
      ev.preventDefault();
      moveSelect(0, -1);
      return;
    }
    if (key === "ArrowDown" || key === "s" || key === "S") {
      ev.preventDefault();
      moveSelect(0, 1);
      return;
    }
    if (key === "Tab") {
      ev.preventDefault();
      cycleSelect(ev.shiftKey ? -1 : 1);
      return;
    }
    if (key === "z" || key === "Z") document.getElementById("btn-undo").click();
    if (key === "r" || key === "R") document.getElementById("btn-reset").click();
  });

  AudioFx.muted = !!state.save.muted;
  syncSettingsUi();
  syncUnlock();
  persist();
  bootValidate();
  refreshMenu();
  window.addEventListener("resize", () => {
    if (state.screen === "play") sizeBoard();
  });
})();
