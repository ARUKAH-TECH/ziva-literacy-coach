import type { Topic } from "../types";

// JHS 3 (B9): detailed lessons for each content standard.

export const TOPICS_B9: Record<string, Topic[]> = {
  "1.1.1": [
    {
      title: "Form: shapes with depth",
      emoji: "🧊",
      explain: [
        "Form is a three-dimensional (3-D) shape. It has length, width and depth (thickness), takes up space and can be viewed from many sides.",
        "Geometric forms are regular: cube (a box), cuboid (a brick), sphere (a ball), cylinder (a tin), cone (a funnel), pyramid. Organic forms are natural and irregular: a mango, an egg, a human figure, a seashell, a tree trunk.",
        "Sculptures, pottery and buildings are real forms. On flat paper, artists suggest form by shading and perspective so that a circle looks like a ball.",
      ],
      remember: ["Form = 3-D: length, width, depth.", "Geometric vs organic forms.", "Shading suggests form on paper."],
      check: [
        { q: "A tin of milk is a…", options: ["cylinder", "cone", "pyramid", "cube"], answer: 0 },
        { q: "An egg is an example of an… form.", options: ["organic", "geometric", "flat", "linear"], answer: 0 },
      ],
    },
    {
      title: "Value: light and dark",
      emoji: "🌗",
      explain: [
        "Value (tone) is the lightness or darkness of a colour or grey. A value scale goes in steps from white, through light, middle and dark greys, to black.",
        "With colour, value changes by adding white (tints) or black (shades). Light colours have high value; dark colours have low value.",
        "Value shows form and light. On a shaded sphere you can see: the highlight (brightest spot), light tone, mid-tone, core shadow (darkest part on the object), reflected light (a little light bounced back near the edge), and the cast shadow on the ground.",
        "High-key (mostly light) pictures feel bright and happy; low-key (mostly dark) pictures feel serious or mysterious. Strong value contrast attracts attention.",
      ],
      diagram: "value-scale",
      steps: { title: "Make a 7-step value scale", items: ["Draw 7 boxes in a row.", "Leave the first box white.", "Shade the last box as dark as possible.", "Shade the middle box mid-grey.", "Fill in the others so each step is a little darker than the one before.", "Use the scale to shade a sphere."] },
      remember: ["Value = lightness/darkness.", "Tints are light; shades are dark.", "Highlight, mid-tone, core shadow, reflected light, cast shadow."],
      check: [
        { q: "The darkest part on a shaded object is the…", options: ["core shadow", "highlight", "reflected light", "outline"], answer: 0 },
        { q: "Adding white to a colour gives a…", options: ["tint", "shade", "hue", "texture"], answer: 0 },
      ],
    },
    {
      title: "Variety and proportion",
      emoji: "📏",
      explain: [
        "Variety is using different elements (shapes, sizes, colours, textures) to make a design interesting. Too little variety is boring; too much looks confused. Balance variety with unity.",
        "Proportion is the size relationship between parts of an object, and between the parts and the whole. Good proportion makes things look natural and work well.",
        "In figure drawing, an adult is about 7 to 8 heads tall; the eyes are about halfway down the head; outstretched arms are about as wide as the body is tall. In design, a chair seat and table must be proportioned to the people who will use them.",
        "In nature, proportion is everywhere: branches get thinner as they spread; spirals in shells and sunflower seeds grow in steady proportions.",
      ],
      remember: ["Variety adds interest; balance it with unity.", "Proportion = size relationships.", "Adult figure ≈ 7–8 heads tall."],
      check: [
        { q: "The eyes are about… down the head.", options: ["halfway", "at the top", "at the chin", "a quarter"], answer: 0 },
        { q: "Using different shapes and colours to add interest is…", options: ["variety", "unity", "repetition only", "symmetry"], answer: 0 },
      ],
    },
  ],
  "1.2.1": [
    {
      title: "Oblique and isometric drawing",
      emoji: "📐",
      explain: [
        "Pictorial drawings show objects in 3-D so they look solid.",
        "Oblique drawing: draw the front face as its true shape (square, rectangle). Then draw parallel depth lines going back at 45° and join them. Depth lines are often drawn half length (cabinet oblique) so the object does not look too long.",
        "Isometric drawing: start with a vertical line for the nearest corner. Width and depth lines are drawn at 30° to the horizontal on both sides, using a 30°/60° set square on a T-square. All vertical edges stay vertical. True measurements are used along the three axes.",
      ],
      diagram: "three-d",
      steps: { title: "Isometric box", items: ["Draw a vertical line 3 cm (front corner).", "From its bottom, draw lines at 30° left (4 cm) and right (2 cm).", "Draw vertical lines up from these ends (3 cm).", "Join the tops with lines at 30° to complete the top face.", "Rub out construction lines; shade top light, one side mid, the other dark."] },
      remember: ["Oblique: true front, depth at 45°.", "Isometric: lines at 30°; verticals stay vertical.", "Use a T-square and set squares."],
      check: [
        { q: "In isometric drawing, lines go at…", options: ["30°", "45°", "60°", "90°"], answer: 0 },
        { q: "In oblique drawing, the front face is drawn…", options: ["true shape", "at 30°", "as a circle", "upside down"], answer: 0 },
      ],
    },
    {
      title: "Perspective drawing",
      emoji: "🛣️",
      explain: [
        "Perspective drawing shows objects as our eyes see them: things that are far away look smaller, and parallel lines going away from us seem to meet.",
        "The horizon line (eye level) is a horizontal line at the height of your eyes. A vanishing point is a point on the horizon line where receding lines meet.",
        "One-point perspective has one vanishing point; it suits roads, railway lines, corridors and rooms seen from the front. Two-point perspective has two vanishing points far apart on the horizon; it suits buildings and boxes seen from a corner.",
      ],
      steps: { title: "One-point perspective road", items: ["Draw a horizon line across the middle of the page.", "Mark one vanishing point (VP) in the centre.", "Draw two lines from the bottom corners to the VP: the road edges.", "Draw electric poles getting shorter as they get closer to the VP.", "Add houses whose top and bottom lines point to the VP.", "Colour, keeping far objects lighter."] },
      remember: ["Horizon line = eye level.", "Receding lines meet at vanishing points.", "One-point for roads; two-point for buildings at a corner."],
      check: [
        { q: "Railway lines appear to meet at the…", options: ["vanishing point", "highlight", "ground line only", "border"], answer: 0 },
        { q: "A building seen from its corner is best drawn in…", options: ["two-point perspective", "one-point perspective", "flat colour", "plan"], answer: 0 },
      ],
    },
    {
      title: "Shading, colouring and modelling 3-D forms",
      emoji: "🧱",
      explain: [
        "To make 3-D drawings convincing, decide where the light comes from. Keep the top face lightest, one side face mid-tone and the other darkest. Add cast shadows away from the light.",
        "Colour can also show depth: warm, bright colours seem to come forward; cool, dull colours seem to go back (aerial perspective).",
        "Turn your drawings into models using card nets, clay, Styrofoam or paper pulp. Compare the model with the drawing to check proportions.",
      ],
      remember: ["Light top, mid side, dark side, cast shadow.", "Warm colours advance; cool colours recede.", "Check models against drawings."],
      check: [
        { q: "Cool, dull colours appear to…", options: ["go back (recede)", "come forward", "move", "shine"], answer: 0 },
        { q: "The cast shadow falls…", options: ["away from the light", "towards the light", "on top of the object", "nowhere"], answer: 0 },
      ],
    },
  ],
  "1.3.1": [
    {
      title: "User-centred design and the design folder",
      emoji: "📁",
      explain: [
        "User-centred design means designing around the real needs of the people who will use the product. Talk to them, watch how they work, and test with them.",
        "A design folder (portfolio) records every stage: the problem and design brief; research notes and photos; the specification; initial ideas (at least three sketches); development drawings with measurements (3-D views and working drawings); prototype photos; test results; and evaluation.",
        "A good folder shows your thinking clearly so others can understand and judge your design.",
      ],
      diagram: "design-process",
      remember: ["Design for real users.", "Folder: brief, research, specification, ideas, development, prototype, tests, evaluation.", "Show your thinking clearly."],
      check: [
        { q: "Designing around the needs of users is…", options: ["user-centred design", "random design", "copying", "decorating"], answer: 0 },
        { q: "A drawing with measurements for making a product is a…", options: ["working drawing", "thumbnail", "collage", "mural"], answer: 0 },
      ],
    },
    {
      title: "Innovation in Ghana and a community project",
      emoji: "🇬🇭",
      explain: [
        "Many Ghanaian innovations solve local problems: the Veronica bucket (handwashing without pipes), improved cook stoves (such as 'gyapa') that use less charcoal and produce less smoke, solar crop dryers that preserve farm produce, and paving blocks made from recycled plastic.",
        "Choose a real problem in your community (flooded gutters, plastic waste, carrying heavy loads, dark paths at night). Apply the full design process, build a prototype from local or recycled materials, test it with users, refine it and present it with your design folder.",
        "Evaluation: does the final product meet the specification? What would you improve with more time or money?",
      ],
      remember: ["Ghanaian innovations solve local problems.", "Use the full design process.", "Evaluate against the specification."],
      check: [
        { q: "Improved cook stoves are designed to…", options: ["use less fuel and smoke", "use more charcoal", "be heavier", "cook slower"], answer: 0 },
        { q: "Checking the final product against the specification is…", options: ["evaluation", "ideation", "definition", "publicity"], answer: 0 },
      ],
    },
  ],
  "2.1.1": [
    {
      title: "Casting with moulds",
      emoji: "🏺",
      explain: [
        "Casting is pouring a liquid material into a mould and letting it harden into the mould's shape. The hardened object is called a cast.",
        "Materials: plaster of Paris (POP), cement, concrete, wax, resin, molten metal (brass, bronze, aluminium). Moulds can be made of clay, plaster, sand, rubber or plastic containers.",
        "Types of moulds: one-piece (open) mould for simple shapes and reliefs; waste mould, which is broken to remove the cast, so it is used once; piece mould, made in parts so it can be reused for many casts.",
        "Steps: make the model; make the mould around it; remove the model; apply a separator (soap, oil or Vaseline) so the cast does not stick; mix and pour the material; tap to release air bubbles; leave to set; remove the cast; finish (trim, smooth, paint or polish).",
        "In Ghana, Asante artisans use lost-wax casting (cire perdue): a wax model is covered in clay with a channel, heated so the wax melts and runs out ('lost'), then molten brass is poured in. When cool, the clay is broken to reveal the brass object. Krofofrom near Kumasi is famous for it, and the old Asante gold-weights were made this way.",
      ],
      diagram: "casting",
      remember: ["Casting = pour liquid into a mould; let it harden.", "One-piece, waste and piece moulds.", "Lost-wax: wax melts out, metal poured in."],
      check: [
        { q: "A separator is used to…", options: ["stop the cast sticking", "colour the cast", "make plaster wet", "heat metal"], answer: 0 },
        { q: "A mould used many times is a…", options: ["piece mould", "waste mould", "loom", "stencil"], answer: 0 },
      ],
    },
    {
      title: "Assemblage: art from found objects",
      emoji: "🔩",
      explain: [
        "Assemblage is making a three-dimensional artwork by joining found or discarded objects such as bottle tops, cans, wire, wood offcuts, cloth, plastic and old parts.",
        "Methods of joining: gluing, nailing, screwing, wiring, tying, stitching and weaving.",
        "Assemblage turns waste into value and can carry messages about consumption and the environment. El Anatsui's shimmering 'cloths' made from thousands of bottle tops joined with copper wire are world famous.",
      ],
      steps: { title: "Make an assemblage sculpture", items: ["Collect clean waste objects (bottle tops, cans, cardboard tubes, wire).", "Sketch an idea (an animal, a person, a symbol).", "Arrange the objects on a base before joining.", "Join them firmly with glue, wire or string.", "Paint or leave natural; give it a title and a message."] },
      remember: ["Assemblage = joining found objects.", "Join by glue, nails, wire, tying, stitching.", "El Anatsui: bottle-top cloths."],
      check: [
        { q: "Assemblage is made from…", options: ["found or waste objects", "only new paint", "clay only", "sound"], answer: 0 },
        { q: "El Anatsui joins bottle tops using…", options: ["copper wire", "cement", "sand", "ink"], answer: 0 },
      ],
    },
    {
      title: "Folding and construction",
      emoji: "📄",
      explain: [
        "Folding means shaping flat materials (paper, card, palm leaves, cloth) by bending them along lines. Origami is the Japanese art of paper folding without cutting or glue. Kirigami adds cutting.",
        "Basic folds: valley fold (folds towards you, like a 'V'), mountain fold (folds away, like an 'A'), squash fold and reverse fold. Use square paper and make sharp creases.",
        "Folding is used for greeting cards, fans, boxes, envelopes, decorations, packaging and models.",
        "Construction means building artworks from separate parts joined together: sticks, straws, cardboard strips, wire, bamboo. Strong joints and triangles make constructions stable.",
      ],
      diagram: "folding",
      remember: ["Origami = folding without cutting.", "Valley and mountain folds.", "Construction = joining parts; triangles add strength."],
      check: [
        { q: "Origami comes from…", options: ["Japan", "Ghana", "Egypt", "Brazil"], answer: 0 },
        { q: "A fold that makes a 'V' towards you is a…", options: ["valley fold", "mountain fold", "squash fold", "reverse fold"], answer: 0 },
      ],
    },
  ],
  "2.1.2": [
    {
      title: "Triads on the degrees of the scale",
      emoji: "🎹",
      explain: [
        "A chord is two or more notes sounded together. A triad is a three-note chord built from a root, the note a third above (3rd), and the note a fifth above (5th).",
        "Triads can be built on every degree of the major scale. In C major: I = C E G (d m s); ii = D F A (r f l); iii = E G B (m s t); IV = F A C (f l d'); V = G B D (s t r'); vi = A C E (l d' m'); vii° = B D F (t r' f').",
        "I, IV and V are major triads and are called the primary triads. ii, iii and vi are minor triads. vii° is diminished.",
        "An arpeggio is a chord sung or played one note after another (horizontally). Harmony is the notes sung or played together (vertically). Practise both.",
      ],
      diagram: "triads",
      remember: ["Triad = root + 3rd + 5th.", "Primary triads: I, IV, V (major).", "Arpeggio = one after another; harmony = together."],
      check: [
        { q: "In C major, chord IV is…", options: ["F A C", "G B D", "C E G", "A C E"], answer: 0 },
        { q: "Which triad is minor?", options: ["vi", "I", "IV", "V"], answer: 0 },
      ],
    },
    {
      title: "Chord progressions and cadences",
      emoji: "🔗",
      explain: [
        "A chord progression is a series of chords that moves music forward. I – IV – V – I is the most common progression in hymns, highlife and gospel music. I – vi – IV – V is used in many popular songs.",
        "A cadence is the chord ending of a phrase. Perfect cadence: V – I, sounds complete like a full stop. Imperfect cadence: ends on V, sounds unfinished like a comma. Plagal cadence: IV – I, the 'Amen' at the end of hymns.",
        "Listening tip: sing along to a song and notice where the music feels finished (perfect cadence) or wants to continue (imperfect cadence).",
      ],
      remember: ["I – IV – V – I is the most common progression.", "Perfect cadence V–I; plagal IV–I ('Amen').", "Imperfect cadence ends on V."],
      check: [
        { q: "The 'Amen' cadence is…", options: ["plagal (IV–I)", "perfect (V–I)", "imperfect (I–V)", "interrupted"], answer: 0 },
        { q: "A cadence ending on V sounds…", options: ["unfinished", "complete", "silent", "faster"], answer: 0 },
      ],
    },
    {
      title: "Improvising over an ostinato",
      emoji: "🎷",
      explain: [
        "An ostinato is a short musical pattern repeated again and again. Ghanaian music is full of ostinatos: the bell timeline in Agbadza or Kpanlogo, repeated drum patterns, repeated bass lines in highlife.",
        "Improvisation is creating music on the spot, without writing it down first. Good improvisers listen carefully and use notes that fit the chords.",
        "Activity: one group sings or plays the bass ostinato d – l – f – s (chords I – vi – IV – V) over and over. Others take turns improvising two-bar melodies, mainly using notes of each chord (for I: d m s; for vi: l d' m'; for IV: f l d'; for V: s t r').",
      ],
      remember: ["Ostinato = repeated pattern.", "Improvisation = creating on the spot.", "Use chord notes to improvise."],
      check: [
        { q: "A repeated bell pattern in Agbadza is an…", options: ["ostinato", "arpeggio", "cadence", "anthem"], answer: 0 },
        { q: "Making up music on the spot is…", options: ["improvisation", "transcription", "notation", "conducting"], answer: 0 },
      ],
    },
  ],
  "2.1.3": [
    {
      title: "Dance drama and the one-act play",
      emoji: "🎭",
      explain: [
        "A dance drama tells a story mainly through dance, music and mime, with little or no speaking. Movement and facial expression carry the meaning.",
        "A one-act play is a short play with only one act (it may have a few scenes). It focuses on one main conflict with few characters.",
        "Good topics are topical issues: teenage pregnancy, drug abuse, galamsey, sanitation, cyber fraud, road safety, peace during elections.",
        "Structure: exposition (introduce characters and setting), rising action (problem grows), climax (turning point), falling action, and resolution (ending).",
      ],
      remember: ["Dance drama = story through dance and mime.", "One-act play = short, one main conflict.", "Exposition → rising action → climax → resolution."],
      check: [
        { q: "The turning point of a play is the…", options: ["climax", "exposition", "costume", "prop"], answer: 0 },
        { q: "A story told mainly through dance and mime is a…", options: ["dance drama", "radio play", "novel", "documentary"], answer: 0 },
      ],
    },
    {
      title: "Improvisation, balance and blocking",
      emoji: "🧭",
      explain: [
        "Improvisation in drama means creating dialogue and movement on the spot from a situation, e.g. 'a quarrel at the water tap'. The best ideas are kept and written into the script.",
        "Stage areas are named from the actor's view facing the audience: upstage (back), downstage (front), centre stage, stage right and stage left, and combinations like downstage left.",
        "Balance (harmony) on stage means spreading actors so that one side is not empty while the other is crowded, which keeps the stage picture pleasing.",
        "Blocking is planning exactly where actors stand and move, when they enter and exit. Rules: don't turn your back to the audience; don't stand in front of another actor; move with purpose; keep important action downstage centre.",
      ],
      diagram: "stage-areas",
      remember: ["Stage directions are from the actor's view.", "Balance the stage picture.", "Blocking = planned positions and moves."],
      check: [
        { q: "Downstage is the part nearest the…", options: ["audience", "back wall", "dressing room", "roof"], answer: 0 },
        { q: "Planning where actors move is…", options: ["blocking", "lighting", "casting", "make-up"], answer: 0 },
      ],
    },
  ],
  "2.2.1": [
    {
      title: "Art inspired by philosophies and cultures",
      emoji: "🦅",
      explain: [
        "Many artworks express philosophies: beliefs and wisdom about life. Adinkra symbols carry Akan philosophy: Sankofa (go back and take it: learn from the past), Gye Nyame (except God: the supremacy of God), Dwennimmen (ram's horns: humility with strength), Nkyinkyim (twisting: life's journey and initiative).",
        "Kente colours have meanings: gold for wealth and royalty, green for growth, red for sacrifice and struggle, blue for peace, black for maturity and spiritual energy.",
        "Other cultures also inspire: Egyptian art, the Benin bronzes of Nigeria, Ndebele wall painting of South Africa, Japanese origami, and modern recycled art.",
      ],
      diagram: "adinkra",
      remember: ["Adinkra symbols carry Akan philosophy.", "Kente colours have meanings.", "Learn from many cultures."],
      check: [
        { q: "Sankofa teaches us to…", options: ["learn from the past", "forget history", "fear change", "stay silent"], answer: 0 },
        { q: "In kente, gold often stands for…", options: ["wealth and royalty", "sadness", "war only", "rain"], answer: 0 },
      ],
    },
    {
      title: "Producing and exhibiting your works",
      emoji: "🖼️",
      explain: [
        "Use the skills from JHS 1–3 (drawing, painting, printing, weaving, modelling, casting, assemblage, folding) to produce works inspired by a philosophy, design or process from a culture.",
        "Write an artist's statement for each work: title, medium, what inspired it, what it means and how you made it (3–5 sentences).",
        "Plan and mount an exhibition (theme, venue, roles, publicity, labels, visitors' book), then appraise the works (describe, analyse, interpret, judge) and use feedback to improve.",
      ],
      diagram: "display-plan",
      remember: ["Use all the techniques you know.", "Write an artist's statement.", "Exhibit and appraise."],
      check: [
        { q: "A short text explaining an artwork is an…", options: ["artist's statement", "invoice", "anthem", "itinerary"], answer: 0 },
        { q: "The last step of appraisal is to…", options: ["judge", "describe", "analyse", "frame"], answer: 0 },
      ],
    },
  ],
  "2.2.2": [
    {
      title: "Composing a song that sensitises the public",
      emoji: "✍️",
      explain: [
        "To sensitise means to make people aware of an issue so they change their behaviour. Musicians compose songs on topical issues: drug abuse, galamsey, sanitation, peaceful elections, cyber safety.",
        "Steps: choose the issue and one clear message; write simple lyrics with a catchy chorus that repeats the message; choose a style (highlife, gospel, hiplife, Afrobeats, an indigenous style); set the words to a melody in solfa or staff notation; add harmony (e.g. I – IV – V – I) and a rhythm pattern; plan the form (intro – verse – chorus – verse – chorus – bridge – chorus).",
        "Record a demo, listen critically and improve.",
      ],
      remember: ["Sensitise = make aware.", "Clear message, catchy chorus.", "Melody + harmony + rhythm + form."],
      check: [
        { q: "The words of a song are the…", options: ["lyrics", "chords", "beats", "dynamics"], answer: 0 },
        { q: "To make people aware of an issue is to…", options: ["sensitise", "improvise", "transpose", "compose only"], answer: 0 },
      ],
    },
    {
      title: "Presenting and appraising African music",
      emoji: "🌍",
      explain: [
        "Plan a concert or radio-style programme featuring your compositions and selected African songs that promote and sensitise the public on emerging issues. Introduce each piece: composer, country, style and message.",
        "Appraise original works using: message, lyrics, melody, harmony, rhythm, performance quality, originality and audience impact.",
        "Write an appraisal report, refine your compositions and share your findings.",
      ],
      remember: ["Introduce composer, country, style, message.", "Appraise message, music, performance, originality.", "Refine and share."],
      check: [
        { q: "Which is a criterion for appraising a song?", options: ["Originality", "Weight", "Price", "Height of singer"], answer: 0 },
        { q: "Introducing a song's composer and country helps the audience…", options: ["understand its context", "sleep", "leave", "dance only"], answer: 0 },
      ],
    },
  ],
  "2.2.3": [
    {
      title: "The production team and stages of production",
      emoji: "🎪",
      explain: [
        "A production needs a team. Director: leads the whole production and guides the actors. Choreographer: creates the dances. Playwright: writes the script. Stage manager: runs rehearsals and the show backstage. Designers and crews: costume, make-up, props, set, lighting and sound. Front of house: publicity, tickets and ushers.",
        "Stages: Pre-production (choose theme, write script, audition and cast, design costumes and set, schedule rehearsals). Rehearsals (read-through, blocking, dance rehearsals, technical rehearsal, dress rehearsal). Performance. Post-production (return items, clean up, evaluate).",
      ],
      remember: ["Director, choreographer, playwright, stage manager, crews, front of house.", "Pre-production → rehearsals → performance → post-production.", "Dress rehearsal = full run in costume."],
      check: [
        { q: "A full rehearsal in costume before the show is the…", options: ["dress rehearsal", "read-through", "audition", "curtain call"], answer: 0 },
        { q: "Who runs the show backstage?", options: ["Stage manager", "Usher", "Audience", "Critic"], answer: 0 },
      ],
    },
    {
      title: "Performing and post-performance analysis",
      emoji: "📊",
      explain: [
        "On the day: arrive early, warm up, check costumes, props and set, and keep to cues.",
        "Post-performance analysis is a discussion after the show: Was the message clear? How strong were the acting, dance, music, costumes, set and lighting? How did the audience react? What should change next time?",
        "Write a production report summarising the analysis and recommendations.",
      ],
      remember: ["Arrive early and warm up.", "Analyse message, performance, design, audience.", "Write a production report."],
      check: [
        { q: "Discussing a show after it ends is…", options: ["post-performance analysis", "pre-production", "casting", "blocking"], answer: 0 },
        { q: "A signal for an actor or crew to act is a…", options: ["cue", "prop", "set", "plot"], answer: 0 },
      ],
    },
  ],
  "2.3.1": [
    {
      title: "African visual artists",
      emoji: "🌍",
      explain: [
        "El Anatsui (born in Ghana, works in Nigeria): metal 'cloths' from bottle tops that speak about trade, history and consumption.",
        "Ben Enwonwu (Nigeria): painter and sculptor famous for 'Anyanwu' and the 'Tutu' portraits; he mixed African traditions with modern art.",
        "Bruce Onobrakpeya (Nigeria): printmaker who invented new printing techniques. Malangatana Ngwenya (Mozambique): painted the struggles and hopes of his people. Esther Mahlangu (South Africa): bold Ndebele geometric painting. Ibrahim El-Salahi (Sudan): combined Arabic calligraphy with African forms.",
      ],
      remember: ["El Anatsui, Ben Enwonwu, Bruce Onobrakpeya.", "Malangatana, Esther Mahlangu, Ibrahim El-Salahi.", "Each reflects history, culture or issues."],
      check: [
        { q: "Esther Mahlangu is from…", options: ["South Africa", "Ghana", "Nigeria", "Sudan"], answer: 0 },
        { q: "Bruce Onobrakpeya is best known as a…", options: ["printmaker", "drummer", "potter", "dancer"], answer: 0 },
      ],
    },
    {
      title: "How African artists connect art with life and other subjects",
      emoji: "🔗",
      explain: [
        "African artists respond to history (colonialism, independence, wars), culture (symbols, festivals, dress) and issues (waste, poverty, environment, peace).",
        "Art connects with other subjects: history and social studies (events and cultures), science (materials, chemistry of dyes and metals), mathematics (geometry and symmetry in patterns), literature (illustrating stories), and technology (digital art).",
        "Examine how an artist uses influence and personal response, and connect one artwork to another subject in a short presentation.",
      ],
      remember: ["Art responds to history, culture and issues.", "Art links to many subjects.", "Present connections clearly."],
      check: [
        { q: "Geometric Ndebele patterns connect art with…", options: ["mathematics", "music only", "sport", "cooking"], answer: 0 },
        { q: "Artworks about independence connect with…", options: ["history", "chemistry only", "biology", "physics"], answer: 0 },
      ],
    },
  ],
  "2.3.2": [
    {
      title: "African art composers and popular music",
      emoji: "🎶",
      explain: [
        "Art composers: Fela Sowande (Nigeria) composed 'African Suite' using Nigerian melodies; Akin Euba (Nigeria) blended African and Western art music; Ephraim Amu and J. H. Kwabena Nketia (Ghana) built choral and art music on African traditions.",
        "Popular music: Highlife (Ghana) – E. T. Mensah, Nana Ampadu. Afrobeat (Nigeria) – Fela Anikulapo Kuti, whose songs criticised corruption and injustice. Mbalax (Senegal) – Youssou N'Dour. Soukous (DR Congo) – Franco, Papa Wemba. Isicathamiya (South Africa) – Ladysmith Black Mambazo, unaccompanied choral singing. Miriam Makeba (South Africa) sang against apartheid ('Pata Pata').",
        "These works reflect history, culture, environment and topical issues of their nations.",
      ],
      remember: ["Art composers: Sowande, Euba, Amu, Nketia.", "Genres: highlife, Afrobeat, mbalax, soukous, isicathamiya.", "Music reflects history and issues."],
      check: [
        { q: "Afrobeat was created by…", options: ["Fela Kuti", "Youssou N'Dour", "Papa Wemba", "Miriam Makeba"], answer: 0 },
        { q: "Soukous comes from…", options: ["DR Congo", "Ghana", "Senegal", "Kenya"], answer: 0 },
      ],
    },
    {
      title: "African indigenous dance genres",
      emoji: "💃",
      explain: [
        "Adumu (Maasai of Kenya and Tanzania): the jumping dance performed by young warriors. Gumboot dance (South Africa): began among mine workers who stamped and slapped their rubber boots. Sabar (Senegal): fast, energetic dance to sabar drums. Agbekor (Ewe of Ghana and Togo): a war dance re-enacting battle movements.",
        "Appraise dance genres by: style, instruments, song themes, movements and costumes, and the history or culture they reflect.",
      ],
      remember: ["Adumu: Maasai jumping dance.", "Gumboot: South African miners.", "Sabar: Senegal; Agbekor: Ewe war dance."],
      check: [
        { q: "The gumboot dance began among…", options: ["miners", "fishermen", "farmers", "teachers"], answer: 0 },
        { q: "Sabar dance comes from…", options: ["Senegal", "Ghana", "Egypt", "Kenya"], answer: 0 },
      ],
    },
  ],
  "2.3.3": [
    {
      title: "African playwrights and their plays",
      emoji: "📜",
      explain: [
        "Wole Soyinka (Nigeria) wrote 'The Lion and the Jewel', which shows the clash between tradition and modern life. In 1986 he became the first African to win the Nobel Prize in Literature.",
        "Ola Rotimi (Nigeria) wrote 'The Gods Are Not to Blame', an African retelling of the Greek tragedy of Oedipus. Ngũgĩ wa Thiong'o (Kenya), with Ngũgĩ wa Mĩriĩ, wrote 'I Will Marry When I Want' in Gikuyu for village audiences. Efua Sutherland and Ama Ata Aidoo (Ghana) wrote 'The Marriage of Anansewa' and 'Anowa'.",
        "Types of plays: tragedy (serious, sad ending), comedy (light, happy ending), tragicomedy (mixes both).",
      ],
      remember: ["Soyinka: 'The Lion and the Jewel', Nobel 1986.", "Rotimi: 'The Gods Are Not to Blame'.", "Tragedy, comedy, tragicomedy."],
      check: [
        { q: "The first African to win the Nobel Prize in Literature was…", options: ["Wole Soyinka", "Chinua Achebe", "Ama Ata Aidoo", "Ngũgĩ wa Thiong'o"], answer: 0 },
        { q: "A play with a sad ending is a…", options: ["tragedy", "comedy", "musical", "farce"], answer: 0 },
      ],
    },
    {
      title: "Creating a piece from an African work and reviewing performances",
      emoji: "📝",
      explain: [
        "Reflect on a selected African dance or play: what is its theme and what ideas are embedded? Then create your own one-act play or dance that responds to the same idea in your community today (an adaptation).",
        "Performance review: title, performers, date and venue; summary; strengths and weaknesses (acting, movement, music, costume, set, use of space); message and audience response; recommendations.",
      ],
      remember: ["Adaptation = new version of an existing work.", "Review: summary, strengths, weaknesses, message, recommendations.", "Respond to the work's theme in your context."],
      check: [
        { q: "A new version of an existing story is an…", options: ["adaptation", "audition", "applause", "agenda"], answer: 0 },
        { q: "A written judgement of a performance is a…", options: ["performance review", "script", "set", "cue"], answer: 0 },
      ],
    },
  ],
};
