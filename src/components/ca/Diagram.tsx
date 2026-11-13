import type { DiagramId } from "@/content/creative-arts/types";

// Labelled pictures for Creative Arts lessons, drawn in code (SVG): sharp on
// every phone, tiny to download and available offline.

const ink = "#1f2937";
const soft = "#6b7280";
const T = ({ x, y, children, size = 13, anchor = "middle", weight = 600, fill = ink }: { x: number; y: number; children: React.ReactNode; size?: number; anchor?: "start" | "middle" | "end"; weight?: number; fill?: string }) => (
  <text x={x} y={y} fontSize={size} textAnchor={anchor} fontWeight={weight} fill={fill} fontFamily="system-ui, sans-serif">
    {children}
  </text>
);

function Frame({ title, h = 220, children }: { title: string; h?: number; children: React.ReactNode }) {
  return (
    <figure className="my-4 overflow-hidden rounded-2xl border border-black/10 bg-white">
      <svg viewBox={`0 0 360 ${h}`} role="img" aria-label={title} className="h-auto w-full">
        {children}
      </svg>
      <figcaption className="border-t border-black/5 bg-ziva/5 px-3 py-1.5 text-center text-sm font-semibold text-black/70">{title}</figcaption>
    </figure>
  );
}

const arrow = (
  <defs>
    <marker id="ca-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill={ink} />
    </marker>
  </defs>
);

function Elements() {
  return (
    <Frame title="Elements of design: dot, line, shape">
      <T x={60} y={24}>Dots</T>
      {[0, 1, 2, 3, 4].map((r) => [0, 1, 2, 3].map((c) => <circle key={`${r}${c}`} cx={30 + c * 20} cy={45 + r * 20} r={2 + c} fill={ink} />))}
      <T x={180} y={24}>Lines</T>
      <line x1={130} y1={45} x2={230} y2={45} stroke={ink} strokeWidth={2} />
      <path d="M130 70 q12 -15 25 0 t25 0 t25 0 t25 0" fill="none" stroke={ink} strokeWidth={2} />
      <path d="M130 100 l12 -12 l12 12 l12 -12 l12 12 l12 -12 l12 12 l12 -12 l4 4" fill="none" stroke={ink} strokeWidth={2} />
      <line x1={130} y1={125} x2={230} y2={125} stroke={ink} strokeWidth={6} />
      <line x1={130} y1={145} x2={230} y2={145} stroke={ink} strokeWidth={1} strokeDasharray="4 4" />
      <T x={180} y={170} size={11} fill={soft}>straight · wavy · zigzag · thick · broken</T>
      <T x={300} y={24}>Shapes</T>
      <circle cx={275} cy={55} r={18} fill="#fde68a" stroke={ink} strokeWidth={2} />
      <rect x={305} y={38} width={34} height={34} fill="#bfdbfe" stroke={ink} strokeWidth={2} />
      <polygon points="275,90 295,125 255,125" fill="#bbf7d0" stroke={ink} strokeWidth={2} />
      <path d="M310 95 c20 -10 35 10 20 25 c-10 12 -35 5 -30 -10 c2 -8 5 -12 10 -15z" fill="#fecaca" stroke={ink} strokeWidth={2} />
      <T x={300} y={148} size={11} fill={soft}>geometric · organic</T>
      <T x={180} y={205} size={12} fill={soft}>A line is a moving dot; a closed line makes a shape.</T>
    </Frame>
  );
}

function Principles() {
  return (
    <Frame title="Principles: balance, rhythm, repetition">
      <T x={60} y={24}>Balance</T>
      <line x1={60} y1={35} x2={60} y2={150} stroke={soft} strokeDasharray="4 4" />
      <path d="M60 90 c-30 -50 -55 -20 -45 0 c-10 25 20 40 45 0 c30 -50 55 -20 45 0 c10 25 -20 40 -45 0z" fill="#fbcfe8" stroke={ink} strokeWidth={2} />
      <T x={60} y={172} size={11} fill={soft}>symmetrical</T>
      <T x={180} y={24}>Rhythm</T>
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M130 ${55 + i * 25} q12 -14 25 0 t25 0 t25 0 t25 0`} fill="none" stroke="#2563eb" strokeWidth={3} />
      ))}
      <T x={180} y={172} size={11} fill={soft}>regular, flowing movement</T>
      <T x={300} y={24}>Repetition</T>
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <polygon key={`${r}${c}`} points={`${265 + c * 30},${70 + r * 32} ${278 + c * 30},${46 + r * 32} ${291 + c * 30},${70 + r * 32}`} fill="#f59e0b" stroke={ink} />))}
      <T x={300} y={172} size={11} fill={soft}>the same shape again</T>
      <T x={180} y={205} size={12} fill={soft}>Principles arrange the elements so the design works.</T>
    </Frame>
  );
}

function ColourWheel() {
  const cols = [
    ["#e11d48", "Red", 1],
    ["#f97316", "Orange", 2],
    ["#facc15", "Yellow", 1],
    ["#16a34a", "Green", 2],
    ["#2563eb", "Blue", 1],
    ["#7c3aed", "Violet", 2],
  ] as const;
  return (
    <Frame title="Colour wheel: primary (1) and secondary (2) colours" h={240}>
      {cols.map(([c, name, kind], i) => {
        const a0 = ((i * 60 - 120) * Math.PI) / 180;
        const a1 = (((i + 1) * 60 - 120) * Math.PI) / 180;
        const am = (a0 + a1) / 2;
        const p = (a: number, r: number) => `${180 + r * Math.cos(a)},${115 + r * Math.sin(a)}`;
        return (
          <g key={name}>
            <path d={`M180,115 L${p(a0, 85)} A85,85 0 0,1 ${p(a1, 85)} Z`} fill={c} stroke="#fff" strokeWidth={2} />
            <T x={180 + 105 * Math.cos(am)} y={119 + 105 * Math.sin(am)} size={12}>
              {name} ({kind})
            </T>
          </g>
        );
      })}
      <circle cx={180} cy={115} r={28} fill="#fff" />
      <T x={180} y={119} size={11}>mix next-door</T>
      <T x={180} y={232} size={11} fill={soft}>red + yellow = orange · yellow + blue = green · blue + red = violet</T>
    </Frame>
  );
}

function Shading() {
  const box = (x: number, label: string, body: React.ReactNode) => (
    <g>
      <rect x={x} y={40} width={70} height={90} fill="#fff" stroke={ink} />
      {body}
      <T x={x + 35} y={150} size={12}>
        {label}
      </T>
    </g>
  );
  const lines = (x: number, cross = false) => (
    <g stroke={ink} strokeWidth={1}>
      {Array.from({ length: 14 }, (_, i) => (
        <line key={i} x1={x + i * 5} y1={40} x2={x + i * 5} y2={130} />
      ))}
      {cross && Array.from({ length: 18 }, (_, i) => <line key={`c${i}`} x1={x} y1={40 + i * 5} x2={x + 70} y2={40 + i * 5} />)}
    </g>
  );
  const dots = Array.from({ length: 160 }, (_, i) => {
    const x = (i * 37) % 70;
    const y = (i * 53) % 90;
    return x < 70 * (1 - y / 140) + 15 ? <circle key={i} cx={190 + x} cy={40 + y} r={1.3} fill={ink} /> : null;
  });
  return (
    <Frame title="Shading techniques" h={200}>
      <defs>
        <linearGradient id="ca-blend" x1="0" x2="1">
          <stop offset="0" stopColor="#111" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
      </defs>
      {box(10, "Hatching", lines(12))}
      {box(100, "Cross-hatching", lines(102, true))}
      {box(190, "Stippling", <g>{dots}</g>)}
      {box(280, "Blending", <rect x={280} y={40} width={70} height={90} fill="url(#ca-blend)" />)}
      <T x={180} y={185} size={12} fill={soft}>Darker = closer marks or more layers</T>
    </Frame>
  );
}

function Steps({ title, steps, cols = 4 }: { title: string; steps: string[]; cols?: number }) {
  const rows = Math.ceil(steps.length / cols);
  const w = 360 / cols;
  return (
    <Frame title={title} h={rows * 80 + 20}>
      {arrow}
      {steps.map((s, i) => {
        const r = Math.floor(i / cols);
        const c = r % 2 === 0 ? i % cols : cols - 1 - (i % cols); // snake so arrows follow
        const x = c * w + 6;
        const y = r * 80 + 14;
        const words = s.split(" ");
        const half = Math.ceil(words.length / 2);
        const two = s.length > 11 ? [words.slice(0, half).join(" "), words.slice(half).join(" ")] : [s];
        const next = i + 1 < steps.length;
        const nr = Math.floor((i + 1) / cols);
        return (
          <g key={s}>
            <rect x={x} y={y} width={w - 12} height={52} rx={10} fill={["#fef3c7", "#dbeafe", "#dcfce7", "#fce7f3"][i % 4]} stroke={ink} />
            <T x={x + (w - 12) / 2} y={y + 14} size={10} fill={soft}>
              {i + 1}
            </T>
            {two.map((t, k) => (
              <T key={k} x={x + (w - 12) / 2} y={y + 29 + k * 13} size={11.5}>
                {t}
              </T>
            ))}
            {next && nr === r && <line x1={r % 2 === 0 ? x + w - 12 : x} y1={y + 26} x2={r % 2 === 0 ? x + w - 2 : x - 10} y2={y + 26} stroke={ink} markerEnd="url(#ca-arrow)" />}
            {next && nr !== r && <line x1={x + (w - 12) / 2} y1={y + 52} x2={x + (w - 12) / 2} y2={y + 76} stroke={ink} markerEnd="url(#ca-arrow)" />}
          </g>
        );
      })}
    </Frame>
  );
}

function NatureToDesign() {
  return (
    <Frame title="Nature inspires design" h={200}>
      {arrow}
      <T x={90} y={22}>Nature</T>
      <T x={270} y={22}>Manmade design</T>
      {/* kingfisher head → train */}
      <circle cx={60} cy={65} r={20} fill="#0ea5e9" />
      <polygon points="78,58 140,66 78,74" fill="#f59e0b" />
      <circle cx={56} cy={60} r={3} fill="#fff" />
      <T x={95} y={100} size={11} fill={soft}>kingfisher beak</T>
      <line x1={160} y1={66} x2={200} y2={66} stroke={ink} markerEnd="url(#ca-arrow)" />
      <path d="M210 80 L210 55 Q260 50 340 66 Q300 80 210 80 Z" fill="#e5e7eb" stroke={ink} />
      <rect x={225} y={60} width={50} height={8} fill="#1d4ed8" />
      <T x={275} y={100} size={11} fill={soft}>bullet train nose</T>
      {/* anthill → building */}
      <path d="M45 175 Q70 110 95 175 Z" fill="#b45309" />
      <path d="M70 172 L70 135" stroke="#fde68a" strokeDasharray="3 3" />
      <T x={70} y={192} size={11} fill={soft}>cool anthill</T>
      <line x1={160} y1={155} x2={200} y2={155} stroke={ink} markerEnd="url(#ca-arrow)" />
      <rect x={225} y={125} width={90} height={50} fill="#d1d5db" stroke={ink} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={232 + i * 21} y={115} width={8} height={12} fill="#9ca3af" stroke={ink} />
      ))}
      <T x={270} y={192} size={11} fill={soft}>Eastgate Building vents</T>
    </Frame>
  );
}

function DrawingTools() {
  return (
    <Frame title="Drawing instruments" h={200}>
      <rect x={20} y={30} width={150} height={110} fill="#fef3c7" stroke={ink} />
      <T x={95} y={155} size={11}>drawing board</T>
      <rect x={10} y={40} width={12} height={90} fill="#78350f" />
      <rect x={10} y={80} width={170} height={10} fill="#a16207" />
      <T x={110} y={76} size={11}>T-square</T>
      <polygon points="60,90 60,135 105,135" fill="#bfdbfe" stroke={ink} />
      <T x={70} y={130} size={10}>set square</T>
      <path d="M200 120 A50 50 0 0 1 300 120 Z" fill="#dcfce7" stroke={ink} />
      <T x={250} y={112} size={11}>protractor</T>
      <line x1={300} y1={30} x2={280} y2={95} stroke={ink} strokeWidth={3} />
      <line x1={300} y1={30} x2={325} y2={95} stroke={ink} strokeWidth={3} />
      <circle cx={300} cy={28} r={5} fill={ink} />
      <T x={300} y={18} size={11}>compasses</T>
      <rect x={200} y={150} width={140} height={10} fill="#fde047" stroke={ink} />
      <polygon points="340,150 352,155 340,160" fill="#f5d0a9" stroke={ink} />
      <T x={270} y={180} size={11}>pencil: H (hard, light) … B (soft, dark)</T>
    </Frame>
  );
}

function StillLife() {
  return (
    <Frame title="Still life: light, shade and cast shadow" h={200}>
      <defs>
        <radialGradient id="ca-ball" cx="0.35" cy="0.35">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#6b7280" />
        </radialGradient>
        <linearGradient id="ca-bottle" x1="0" x2="1">
          <stop offset="0" stopColor="#e5e7eb" />
          <stop offset="1" stopColor="#4b5563" />
        </linearGradient>
      </defs>
      <line x1={10} y1={160} x2={350} y2={160} stroke={ink} />
      <ellipse cx={210} cy={162} rx={60} ry={7} fill="#9ca3af" opacity={0.6} />
      <path d="M160 160 L160 80 Q160 60 175 55 L175 30 L190 30 L190 55 Q205 60 205 80 L205 160 Z" fill="url(#ca-bottle)" stroke={ink} />
      <ellipse cx={240} cy={163} rx={45} ry={6} fill="#9ca3af" opacity={0.6} />
      <circle cx={225} cy={130} r={30} fill="url(#ca-ball)" stroke={ink} />
      <text x={40} y={40} fontSize={26}>☀️</text>
      <T x={95} y={60} size={11} fill={soft}>light comes from here</T>
      <T x={290} y={185} size={11} fill={soft}>cast shadow</T>
      <T x={120} y={185} size={11} fill={soft}>dark side away from light</T>
    </Frame>
  );
}

function Solfa() {
  const notes = ["doh", "ray", "me", "fah", "soh", "lah", "te", "doh'"];
  const letters = ["C", "D", "E", "F", "G", "A", "B", "C'"];
  return (
    <Frame title="The major scale: solfa and letter names (C major)" h={210}>
      {notes.map((n, i) => (
        <g key={n}>
          <rect x={14 + i * 42} y={160 - i * 18} width={38} height={18 + i * 18} rx={4} fill={i % 2 ? "#dbeafe" : "#fef3c7"} stroke={ink} />
          <T x={33 + i * 42} y={152 - i * 18} size={12}>
            {n}
          </T>
          <T x={33 + i * 42} y={196} size={13} weight={800} fill="#1d4ed8">
            {letters[i]}
          </T>
        </g>
      ))}
      <T x={90} y={22} size={11} fill={soft}>going up = ascending</T>
    </Frame>
  );
}

function Note({ x, y, kind }: { x: number; y: number; kind: "semibreve" | "minim" | "crotchet" | "quaver" | "semiquaver" }) {
  const filled = kind !== "semibreve" && kind !== "minim";
  return (
    <g>
      <ellipse cx={x} cy={y} rx={8} ry={5.5} transform={`rotate(-20 ${x} ${y})`} fill={filled ? ink : "#fff"} stroke={ink} strokeWidth={2} />
      {kind !== "semibreve" && <line x1={x + 7} y1={y - 2} x2={x + 7} y2={y - 34} stroke={ink} strokeWidth={2} />}
      {(kind === "quaver" || kind === "semiquaver") && <path d={`M${x + 7} ${y - 34} q12 8 6 22`} fill="none" stroke={ink} strokeWidth={2} />}
      {kind === "semiquaver" && <path d={`M${x + 7} ${y - 26} q12 8 6 22`} fill="none" stroke={ink} strokeWidth={2} />}
    </g>
  );
}

function NoteValues() {
  const rows: [string, "semibreve" | "minim" | "crotchet" | "quaver" | "semiquaver", string][] = [
    ["Semibreve", "semibreve", "4 beats"],
    ["Minim", "minim", "2 beats"],
    ["Crotchet", "crotchet", "1 beat"],
    ["Quaver", "quaver", "½ beat"],
    ["Semiquaver", "semiquaver", "¼ beat"],
  ];
  return (
    <Frame title="Note values (counted in crotchet beats)" h={250}>
      {rows.map(([name, kind, beats], i) => (
        <g key={name}>
          <Note x={40} y={45 + i * 45} kind={kind} />
          <T x={70} y={45 + i * 45} anchor="start" size={14}>
            {name}
          </T>
          <T x={330} y={45 + i * 45} anchor="end" size={14} fill="#1d4ed8">
            {beats}
          </T>
        </g>
      ))}
    </Frame>
  );
}

function Conducting() {
  const pat = (cx: number, label: string, d: string, nums: [number, number, string][]) => (
    <g>
      <path d={d} fill="none" stroke="#2563eb" strokeWidth={2.5} markerEnd="url(#ca-arrow)" />
      {nums.map(([x, y, n]) => (
        <T key={n} x={x} y={y} size={13} fill="#dc2626" weight={800}>
          {n}
        </T>
      ))}
      <T x={cx} y={185} size={13}>
        {label}
      </T>
    </g>
  );
  return (
    <Frame title="Conducting patterns (beat 1 always goes down)" h={200}>
      {arrow}
      {pat(60, "2/4 duple", "M55 40 L55 140 Q65 120 70 45", [[45, 145, "1"], [80, 50, "2"]])}
      {pat(180, "3/4 triple", "M165 40 L165 140 L215 120 Q200 70 170 45", [[155, 145, "1"], [225, 125, "2"], [205, 60, "3"]])}
      {pat(300, "4/4 quadruple", "M300 40 L300 140 L255 110 L345 110 Q330 70 305 45", [[290, 150, "1"], [245, 105, "2"], [352, 105, "3"], [330, 55, "4"]])}
    </Frame>
  );
}

function Adinkra() {
  return (
    <Frame title="Adinkra symbols and their meanings" h={190}>
      <circle cx={60} cy={75} r={40} fill="none" stroke={ink} strokeWidth={6} />
      <circle cx={60} cy={75} r={25} fill="none" stroke={ink} strokeWidth={6} />
      <circle cx={60} cy={75} r={10} fill={ink} />
      <T x={60} y={140}>Adinkrahene</T>
      <T x={60} y={157} size={11} fill={soft}>greatness, leadership</T>
      <path d="M180 112 C120 70 150 35 180 60 C210 35 240 70 180 112 Z" fill={ink} />
      <T x={180} y={140}>Akoma (heart)</T>
      <T x={180} y={157} size={11} fill={soft}>patience, tolerance</T>
      <polygon points="300,35 311,62 340,64 318,82 326,110 300,94 274,110 282,82 260,64 289,62" fill={ink} />
      <T x={300} y={140}>Nsoromma (star)</T>
      <T x={300} y={157} size={11} fill={soft}>child of the heavens</T>
    </Frame>
  );
}

function DisplayPlan() {
  return <Steps title="Planning a display" steps={["Theme & title", "Select & group works", "Prepare venue", "Mount & label", "Invite audience", "Visitors' book", "Review comments"]} />;
}

function ValueScale() {
  const greys = ["#ffffff", "#e5e5e5", "#c4c4c4", "#9a9a9a", "#707070", "#454545", "#111111"];
  return (
    <Frame title="Value scale: from white to black" h={170}>
      {greys.map((g, i) => (
        <rect key={g} x={12 + i * 48} y={30} width={46} height={60} fill={g} stroke={ink} />
      ))}
      <T x={36} y={110} size={11}>white</T>
      <T x={324} y={110} size={11}>black</T>
      <T x={180} y={110} size={11} fill={soft}>greys (mid-tones)</T>
      <T x={180} y={150} size={12} fill={soft}>Light values = high key · dark values = low key</T>
    </Frame>
  );
}

function ThreeD() {
  return (
    <Frame title="Oblique, isometric and one-point perspective" h={220}>
      {/* oblique */}
      <rect x={15} y={70} width={60} height={50} fill="#dbeafe" stroke={ink} />
      <polygon points="15,70 40,45 100,45 75,70" fill="#eff6ff" stroke={ink} />
      <polygon points="75,70 100,45 100,95 75,120" fill="#93c5fd" stroke={ink} />
      <T x={58} y={150} size={12}>Oblique (45°)</T>
      {/* isometric */}
      <polygon points="180,40 225,62 180,84 135,62" fill="#eff6ff" stroke={ink} />
      <polygon points="135,62 180,84 180,134 135,112" fill="#dbeafe" stroke={ink} />
      <polygon points="180,84 225,62 225,112 180,134" fill="#93c5fd" stroke={ink} />
      <T x={180} y={150} size={12}>Isometric (30°)</T>
      {/* perspective */}
      <line x1={250} y1={60} x2={355} y2={60} stroke={soft} strokeDasharray="4 3" />
      <circle cx={302} cy={60} r={3} fill="#dc2626" />
      <polygon points="262,95 290,95 290,125 262,125" fill="#dbeafe" stroke={ink} />
      <line x1={262} y1={95} x2={302} y2={60} stroke={soft} />
      <line x1={290} y1={95} x2={302} y2={60} stroke={soft} />
      <line x1={290} y1={125} x2={302} y2={60} stroke={soft} />
      <T x={302} y={50} size={10} fill="#dc2626">vanishing point</T>
      <T x={340} y={75} size={10} fill={soft}>horizon</T>
      <T x={302} y={150} size={12}>Perspective</T>
      <T x={180} y={195} size={12} fill={soft}>Light top · mid side · dark side</T>
    </Frame>
  );
}

function Weaving() {
  const cells = (x0: number, label: string, on: (r: number, c: number) => boolean) => (
    <g>
      {Array.from({ length: 8 }, (_, r) =>
        Array.from({ length: 8 }, (_, c) => (
          <rect key={`${r}-${c}`} x={x0 + c * 12} y={40 + r * 12} width={12} height={12} fill={on(r, c) ? "#b45309" : "#fde68a"} stroke="#78350f" strokeWidth={0.5} />
        )),
      )}
      <T x={x0 + 48} y={155} size={12}>
        {label}
      </T>
    </g>
  );
  return (
    <Frame title="Weaves: dark = warp on top, light = weft on top" h={185}>
      {cells(14, "Plain (1 over, 1 under)", (r, c) => (r + c) % 2 === 0)}
      {cells(132, "Twill (diagonal)", (r, c) => (c - r + 16) % 4 < 2)}
      {cells(250, "Satin (long floats)", (r, c) => (c * 2 + r) % 5 === 0)}
      <T x={180} y={25} size={11} fill={soft}>warp runs up and down · weft runs across</T>
    </Frame>
  );
}

function Triads() {
  const ch: [string, string, string][] = [
    ["I", "C E G", "d m s"],
    ["IV", "F A C", "f l d'"],
    ["V", "G B D", "s t r'"],
    ["vi", "A C E", "l d' m'"],
  ];
  return (
    <Frame title="Triads in C major (root, third, fifth)" h={180}>
      {ch.map(([n, l, s], i) => (
        <g key={n}>
          <rect x={12 + i * 87} y={30} width={78} height={110} rx={12} fill={i === 3 ? "#ede9fe" : "#dbeafe"} stroke={ink} />
          <T x={51 + i * 87} y={62} size={22} weight={800} fill="#1d4ed8">
            {n}
          </T>
          <T x={51 + i * 87} y={92} size={14}>
            {l}
          </T>
          <T x={51 + i * 87} y={118} size={13} fill={soft}>
            {s}
          </T>
        </g>
      ))}
      <T x={180} y={165} size={11} fill={soft}>I, IV, V are major · vi is minor</T>
    </Frame>
  );
}

function StageAreas() {
  const areas = [
    ["Up right", "Up centre", "Up left"],
    ["Centre right", "Centre", "Centre left"],
    ["Down right", "Down centre", "Down left"],
  ];
  return (
    <Frame title="Stage areas (named from the actor's view)" h={230}>
      {areas.map((row, r) =>
        row.map((a, c) => (
          <g key={a}>
            <rect x={30 + c * 100} y={20 + r * 50} width={100} height={50} fill={r === 1 && c === 1 ? "#fef3c7" : "#f3f4f6"} stroke={ink} />
            <T x={80 + c * 100} y={50 + r * 50} size={12}>
              {a}
            </T>
          </g>
        )),
      )}
      <rect x={30} y={175} width={300} height={22} fill="#1f2937" />
      <T x={180} y={190} size={12} fill="#fff">AUDIENCE</T>
      <T x={180} y={218} size={11} fill={soft}>Stage right is on the audience's left</T>
    </Frame>
  );
}

function TempoDynamics() {
  const tempo = ["Largo", "Adagio", "Andante", "Moderato", "Allegro", "Presto"];
  const dyn = ["pp", "p", "mp", "mf", "f", "ff"];
  return (
    <Frame title="Tempo (slow → fast) and dynamics (soft → loud)" h={190}>
      {arrow}
      {tempo.map((t, i) => (
        <g key={t}>
          <rect x={8 + i * 58} y={30} width={54} height={36} rx={8} fill={`hsl(${200 - i * 30} 80% 85%)`} stroke={ink} />
          <T x={35 + i * 58} y={53} size={11}>
            {t}
          </T>
        </g>
      ))}
      <line x1={20} y1={80} x2={340} y2={80} stroke={ink} markerEnd="url(#ca-arrow)" />
      <T x={180} y={96} size={11} fill={soft}>faster</T>
      {dyn.map((d, i) => (
        <T key={d} x={35 + i * 58} y={135} size={12 + i * 3} weight={800} fill="#7c3aed">
          {d}
        </T>
      ))}
      <path d="M30 160 L330 150 L330 170 Z" fill="none" stroke={ink} />
      <T x={180} y={185} size={11} fill={soft}>crescendo: getting louder</T>
    </Frame>
  );
}

function Forms() {
  const rows: [string, string[]][] = [
    ["Binary", ["A", "B"]],
    ["Ternary", ["A", "B", "A"]],
    ["Rondo", ["A", "B", "A", "C", "A"]],
    ["Verse–chorus", ["V", "C", "V", "C", "Br", "C"]],
  ];
  const col: Record<string, string> = { A: "#fde68a", B: "#bfdbfe", C: "#bbf7d0", V: "#fbcfe8", Br: "#ddd6fe" };
  return (
    <Frame title="Musical forms" h={200}>
      {rows.map(([n, parts], r) => (
        <g key={n}>
          <T x={10} y={42 + r * 42} anchor="start" size={12}>
            {n}
          </T>
          {parts.map((p, i) => (
            <g key={i}>
              <rect x={105 + i * 41} y={22 + r * 42} width={37} height={30} rx={6} fill={col[p] ?? "#eee"} stroke={ink} />
              <T x={123 + i * 41} y={42 + r * 42} size={13} weight={800}>
                {p}
              </T>
            </g>
          ))}
        </g>
      ))}
    </Frame>
  );
}

function ColourKinds() {
  const sw = (x: number, y: number, c: string) => <rect x={x} y={y} width={30} height={30} rx={5} fill={c} stroke={ink} />;
  return (
    <Frame title="Colour groups" h={210}>
      <T x={90} y={22} size={12}>Warm</T>
      {sw(30, 30, "#e11d48")}
      {sw(75, 30, "#f97316")}
      {sw(120, 30, "#facc15")}
      <T x={270} y={22} size={12}>Cool</T>
      {sw(210, 30, "#2563eb")}
      {sw(255, 30, "#16a34a")}
      {sw(300, 30, "#7c3aed")}
      <T x={90} y={92} size={12}>Complementary</T>
      {sw(45, 100, "#e11d48")}
      {sw(105, 100, "#16a34a")}
      <T x={270} y={92} size={12}>Harmonious</T>
      {sw(210, 100, "#facc15")}
      {sw(255, 100, "#a3e635")}
      {sw(300, 100, "#16a34a")}
      <T x={90} y={160} size={12}>Tint → hue → shade</T>
      {sw(30, 168, "#93c5fd")}
      {sw(75, 168, "#2563eb")}
      {sw(120, 168, "#1e3a8a")}
      <T x={270} y={160} size={12}>Tertiary</T>
      {sw(210, 168, "#a3e635")}
      {sw(255, 168, "#fb7185")}
      {sw(300, 168, "#f59e0b")}
    </Frame>
  );
}

export function Diagram({ id }: { id: DiagramId }) {
  switch (id) {
    case "elements":
      return <Elements />;
    case "principles":
      return <Principles />;
    case "colour-wheel":
      return <ColourWheel />;
    case "shading":
      return <Shading />;
    case "design-process":
      return <Steps title="The design process" steps={["Define", "Brief", "Research", "Ideation", "Invent", "Prototype", "Testing", "Refine"]} />;
    case "nature-to-design":
      return <NatureToDesign />;
    case "drawing-tools":
      return <DrawingTools />;
    case "still-life":
      return <StillLife />;
    case "clay-steps":
      return <Steps title="Preparing clay" steps={["Dig (win)", "Soak", "Sieve", "Dry a little", "Wedge / knead", "Test (coil)", "Store in polythene"]} />;
    case "pattern-techniques":
      return <Steps title="Some pattern-making techniques" steps={["Dabbing", "Printing", "Blowing", "Spattering", "Stippling", "Marbling", "String pulling", "Wax resist"]} />;
    case "solfa-scale":
      return <Solfa />;
    case "note-values":
      return <NoteValues />;
    case "conducting":
      return <Conducting />;
    case "display-plan":
      return <DisplayPlan />;
    case "appraisal-guide":
      return <Steps title="Appreciating an artwork" steps={["Describe", "Analyse", "Interpret", "Judge"]} />;
    case "adinkra":
      return <Adinkra />;
    case "value-scale":
      return <ValueScale />;
    case "three-d":
      return <ThreeD />;
    case "weaving":
      return <Weaving />;
    case "triads":
      return <Triads />;
    case "stage-areas":
      return <StageAreas />;
    case "tempo-dynamics":
      return <TempoDynamics />;
    case "musical-forms":
      return <Forms />;
    case "texture-colour":
      return <ColourKinds />;
    case "print-making":
      return <Steps title="Relief (block) printing" steps={["Draw design", "Cut away background", "Roll or dab ink", "Press on paper/cloth", "Lift and repeat", "Clean tools"]} cols={3} />;
    case "casting":
      return <Steps title="Casting with plaster of Paris" steps={["Model", "Mould", "Separator", "Mix & pour", "Let it set", "Remove & finish"]} cols={3} />;
    case "folding":
      return <Steps title="Folding a paper box (masu)" steps={["Square paper", "Fold both diagonals", "Corners to centre", "Fold edges in", "Lift the sides", "Lock the corners"]} cols={3} />;
    default:
      return null;
  }
}
