import type { Lesson } from "../types";

// JHS 3 (B9) Creative Arts and Design lessons: one per official content standard.

export const B9: Lesson[] = [
  {
    cls: "b9",
    code: "1.1.1",
    title: "Form and value; variety and proportion",
    emoji: "🗿",
    intro: "Understand form and value as elements of design, and variety and proportion as principles, in nature and in manmade designs.",
    sections: [
      {
        heading: "Form",
        points: [
          "Form is a three-dimensional (3-D) shape with length, width and depth. It has volume and can be seen from many sides.",
          "Geometric forms: cube, cuboid, sphere, cylinder, cone, pyramid. Organic forms: a mango, an egg, a human body, a seashell.",
          "On paper, form is shown by shading (light and shadow).",
        ],
      },
      {
        heading: "Value",
        diagram: "value-scale",
        points: [
          "Value is the lightness or darkness of a colour or tone.",
          "A value scale goes step by step from white through greys to black.",
          "High-key (light) values feel bright and calm; low-key (dark) values feel serious or mysterious.",
          "Value creates form: highlight (brightest), light tone, mid-tone, core shadow, reflected light and cast shadow.",
        ],
      },
      {
        heading: "Variety and proportion",
        points: [
          "Variety: using different shapes, sizes, colours or textures to make a design interesting. Too much variety looks confused; balance it with unity.",
          "Proportion: the size of one part compared with another and with the whole. Example: an adult figure is about seven to eight heads tall.",
          "Good proportion makes things look natural and work well (a chair seat must suit the user's height).",
          "In nature, a tree's branches get smaller in proportion as they spread; many shells and flowers grow in pleasing proportions.",
        ],
      },
    ],
    words: [
      ["Form", "A 3-D shape with length, width and depth."],
      ["Value", "Lightness or darkness of a tone or colour."],
      ["Highlight", "The brightest spot where light hits a form."],
      ["Variety", "Using differences to add interest."],
      ["Proportion", "The size relationship between parts and the whole."],
    ],
    materials: ["Pencils HB to 6B", "Drawing paper", "Objects: ball, tin, box, fruit"],
    practical: {
      title: "Value scale and shaded forms",
      steps: [
        "Draw a strip of 7 boxes and shade them from white to black evenly.",
        "Draw a sphere, cube and cylinder lightly.",
        "Decide where the light comes from.",
        "Shade each form using your value scale: highlight, mid-tones, core shadow, cast shadow.",
        "Draw a standing figure 7 heads tall to practise proportion.",
      ],
    },
    quiz: [
      { q: "A shape with length, width and depth is a…", options: ["form", "line", "dot", "texture"], answer: 0 },
      { q: "Value means…", options: ["lightness or darkness", "price", "texture", "speed"], answer: 0 },
      { q: "The brightest spot on a shaded sphere is the…", options: ["highlight", "cast shadow", "core shadow", "outline"], answer: 0 },
      { q: "The size of one part compared with the whole is…", options: ["proportion", "rhythm", "texture", "contrast"], answer: 0 },
      { q: "An adult figure is usually about how many heads tall?", options: ["3", "5", "7 to 8", "12"], answer: 2 },
      { q: "Using different shapes and colours to add interest is…", options: ["variety", "unity", "symmetry", "balance"], answer: 0 },
    ],
    written: [
      { q: "Explain form and value and how value is used to show form on paper.", answer: "Form is a 3-D shape with length, width and depth. Value is the lightness or darkness of a tone. On paper, changing values (highlight, mid-tones, core shadow, cast shadow) make a flat shape look solid." },
      { q: "Explain variety and proportion with examples.", answer: "Variety: using differences in shape, size, colour or texture to make a design interesting, e.g. different flowers in a garden. Proportion: the size relationship of parts to the whole, e.g. a human figure about 7–8 heads tall, a chair sized for its user." },
    ],
  },
  {
    cls: "b9",
    code: "1.2.1",
    title: "3-D drawing: oblique, isometric and perspective; modelling forms",
    emoji: "🧊",
    intro: "Draw objects so they look solid using oblique, isometric and perspective drawing, then shade, colour and model 3-D forms.",
    sections: [
      {
        heading: "Pictorial (3-D) drawing methods",
        diagram: "three-d",
        points: [
          "Oblique drawing: draw the front face true shape, then draw depth lines at 45°.",
          "Isometric drawing: vertical edges stay vertical; width and depth lines go at 30° to the horizontal (use a 30°/60° set square).",
          "One-point perspective: draw a horizon line (eye level) and one vanishing point; depth lines meet at that point (good for roads and rooms).",
          "Two-point perspective: two vanishing points on the horizon line; good for buildings seen from a corner.",
          "Things look smaller as they move away from you (diminishing size).",
        ],
      },
      {
        heading: "Shading and colouring 3-D drawings",
        text: "Decide the direction of light. Keep the top face lightest, one side mid-tone and the other side darkest. Add a cast shadow. Digital 3-D and drawing apps can also be used to model and shade forms.",
      },
      {
        heading: "Modelling 3-D forms",
        text: "Turn drawings into models with cardboard nets, clay, papier-mâché or Styrofoam: a house, a packaging box, a stool or a vehicle. Check proportions against your drawing.",
      },
    ],
    words: [
      ["Oblique", "Drawing with the front face true and depth at 45°."],
      ["Isometric", "Drawing with depth and width lines at 30°."],
      ["Horizon line", "The eye-level line in a perspective drawing."],
      ["Vanishing point", "The point where receding lines meet."],
      ["Pictorial drawing", "A drawing that shows an object in 3-D."],
    ],
    materials: ["T-square and 30°/60° and 45° set squares", "Ruler, H and 2B pencils", "Cardboard, glue, scissors, clay"],
    practical: {
      title: "Draw a box three ways",
      steps: [
        "Draw a 4 cm × 3 cm × 2 cm box in oblique (depth at 45°).",
        "Draw the same box in isometric (lines at 30°).",
        "Draw a road with houses in one-point perspective.",
        "Shade each with light, mid and dark faces.",
        "Make a cardboard model of your box and compare it with the drawings.",
      ],
    },
    quiz: [
      { q: "In isometric drawing, width and depth lines are drawn at…", options: ["30°", "45°", "60°", "90°"], answer: 0 },
      { q: "In oblique drawing, the depth lines are usually at…", options: ["45°", "30°", "10°", "90°"], answer: 0 },
      { q: "The point where lines meet in perspective is the…", options: ["vanishing point", "highlight", "focal point only", "centre of gravity"], answer: 0 },
      { q: "The horizon line represents…", options: ["eye level", "the ground", "the top of the paper", "the light"], answer: 0 },
      { q: "A building seen from its corner is best drawn in…", options: ["two-point perspective", "one-point perspective", "plan view", "outline only"], answer: 0 },
    ],
    written: [
      { q: "Distinguish between oblique and isometric drawing.", answer: "Oblique: front face drawn true shape, depth lines at 45° (often half length). Isometric: no face is drawn flat to the viewer; vertical lines stay vertical and width and depth lines are drawn at 30° to the horizontal, using true lengths." },
      { q: "Explain horizon line and vanishing point in perspective drawing.", answer: "The horizon line is a horizontal line at the viewer's eye level. A vanishing point is a point on the horizon line where parallel lines going away from the viewer appear to meet." },
    ],
  },
  {
    cls: "b9",
    code: "1.3.1",
    title: "Design thinking for community problems: from idea to prototype",
    emoji: "🛠️",
    intro: "Apply the full design process to a real community problem, document your work in a design folder and present your prototype.",
    sections: [
      {
        heading: "Choosing a real problem",
        points: [
          "Look around: flooding gutters, plastic waste, poor lighting at night, carrying heavy loads, storing farm produce, handwashing.",
          "Talk to the people affected; their needs guide the design (user-centred design).",
        ],
      },
      {
        heading: "The design folder (portfolio)",
        diagram: "design-process",
        points: [
          "Problem and design brief.",
          "Research notes and photos of existing solutions.",
          "Specification: what the solution must do, size, cost, materials, safety.",
          "Ideas: at least three sketches with notes.",
          "Development: chosen idea with measurements (3-D and working drawings).",
          "Prototype photos, test results and improvements.",
          "Evaluation: does it meet the specification?",
        ],
      },
      {
        heading: "Examples of innovation in Ghana",
        text: "The Veronica bucket (handwashing), solar crop dryers, improved cooking stoves (gyapa) that use less charcoal, and recycled plastic paving blocks show how design solves local problems.",
      },
    ],
    words: [
      ["User-centred design", "Designing around the needs of the people who will use the product."],
      ["Design folder", "A record of all the stages of a design project."],
      ["Working drawing", "A drawing with measurements used to make a product."],
      ["Evaluation", "Checking how well the final product meets the brief."],
    ],
    materials: ["Design folder or notebook", "Recycled and local materials", "Measuring tools", "Phone camera (optional)"],
    practical: {
      title: "Community design project",
      steps: [
        "Interview three people about a problem in your community.",
        "Write a design brief and specification.",
        "Sketch three ideas and choose one with reasons.",
        "Draw it in 3-D with measurements.",
        "Build and test a prototype.",
        "Improve it, complete your design folder and present it.",
      ],
    },
    quiz: [
      { q: "Designing around the needs of the users is…", options: ["user-centred design", "random design", "copying", "decoration only"], answer: 0 },
      { q: "A drawing with measurements used to make a product is a…", options: ["working drawing", "thumbnail", "collage", "mural"], answer: 0 },
      { q: "Checking whether a product meets the brief is…", options: ["evaluation", "ideation", "definition", "printing"], answer: 0 },
      { q: "Improved cooking stoves are designed to…", options: ["use less fuel", "use more charcoal", "make smoke", "be heavier"], answer: 0 },
    ],
    written: [
      { q: "List six items that should be in a design folder.", answer: "Design brief/problem; research; specification; initial ideas (sketches); developed design with measurements/working drawings; prototype and test results; evaluation and improvements." },
    ],
  },
  {
    cls: "b9",
    code: "2.1.1",
    title: "Visual Arts: casting, assemblage, folding and construction",
    emoji: "🏺",
    intro: "Learn the media and techniques for casting, assemblage, folding and construction, and use them to make your own artworks.",
    sections: [
      {
        heading: "Casting",
        diagram: "casting",
        points: [
          "Casting means pouring a liquid material into a mould and letting it harden into the shape of the mould.",
          "Materials: plaster of Paris (POP), cement, wax, resin, molten metal.",
          "Moulds: one-piece (open) mould, waste mould (broken off after casting), piece mould (several parts reused).",
          "Steps: make or choose a model; make the mould; apply a separator (soap, oil or Vaseline) so the cast comes out; mix and pour; leave to set; remove; finish (smooth and paint).",
          "In Ghana, the Asante use the lost-wax method to cast brass gold-weights and ornaments: a wax model is covered in clay, heated so the wax melts out, and molten metal is poured in. Krofofrom near Kumasi is known for this.",
        ],
      },
      {
        heading: "Assemblage",
        points: [
          "Assemblage is building a 3-D artwork by joining found or waste objects: bottle tops, cans, wood, wire, cloth, plastic.",
          "Join with glue, nails, wire, string or by weaving.",
          "El Anatsui's bottle-top sculptures are a famous example of assemblage.",
        ],
      },
      {
        heading: "Folding and construction",
        diagram: "folding",
        points: [
          "Folding: shaping flat material such as paper, card or palm fronds by folding. Origami is the art of paper folding without cutting; kirigami adds cutting.",
          "Uses: greeting cards, boxes, fans, models, decorations.",
          "Construction: building artworks from parts such as sticks, cardboard, straws or wire using joints.",
        ],
      },
    ],
    words: [
      ["Mould", "A hollow shape into which liquid material is poured."],
      ["Cast", "The object produced from a mould."],
      ["Plaster of Paris", "A white powder that sets hard when mixed with water."],
      ["Lost-wax casting", "Casting where a wax model is melted out of a clay mould."],
      ["Assemblage", "Art made by joining found objects."],
      ["Origami", "The art of folding paper into shapes."],
    ],
    materials: ["Plaster of Paris, water, bowl", "Clay or plastic containers for moulds", "Vaseline or soap (separator)", "Found objects, glue, wire", "Paper or card for folding"],
    practical: {
      title: "Plaster relief cast",
      steps: [
        "Flatten clay into a slab 3 cm thick and press a shell, leaf or carved design into it.",
        "Build a clay wall round it to hold the plaster.",
        "Rub a little Vaseline or soapy water on the surface.",
        "Mix plaster of Paris with water to a creamy paste and pour it in.",
        "Leave it to set (about 30 minutes), then remove the clay.",
        "Smooth the edges and paint your cast.",
      ],
      safety: "Do not breathe plaster dust; never pour plaster down a sink; it gets warm as it sets.",
    },
    quiz: [
      { q: "Pouring liquid material into a mould to harden is…", options: ["casting", "weaving", "folding", "printing"], answer: 0 },
      { q: "A separator such as Vaseline is used to…", options: ["stop the cast sticking to the mould", "colour the cast", "speed up drying", "make it heavier"], answer: 0 },
      { q: "Asante brass gold-weights were made by…", options: ["lost-wax casting", "weaving", "stencilling", "origami"], answer: 0 },
      { q: "Joining found objects into an artwork is…", options: ["assemblage", "stippling", "marbling", "casting"], answer: 0 },
      { q: "Origami is the art of…", options: ["folding paper", "casting metal", "carving wood", "dyeing cloth"], answer: 0 },
      { q: "A mould broken off after one cast is a…", options: ["waste mould", "piece mould", "loom", "stencil"], answer: 0 },
    ],
    written: [
      { q: "Describe the steps in casting with plaster of Paris.", answer: "Make/choose a model and make a mould (e.g. clay); apply a separator; mix plaster with water to a creamy paste; pour into the mould; tap to remove air bubbles; leave to set; remove the cast; finish by smoothing and painting." },
      { q: "Explain lost-wax casting as practised in Ghana.", answer: "A model is made in wax, covered with clay (with a channel), and heated so the wax melts out, leaving a hollow mould. Molten brass is poured in; when cool the clay is broken to reveal the brass object. Asante artisans (e.g. at Krofofrom) use it for gold-weights and ornaments." },
    ],
  },
  {
    cls: "b9",
    code: "2.1.2",
    title: "Music: triads, chord progressions and improvisation",
    emoji: "🎹",
    intro: "Sing triads on the degrees of the major scale as arpeggios and harmony, learn common chord progressions, and improvise a melody over an ostinato bass.",
    sections: [
      {
        heading: "Triads",
        diagram: "triads",
        points: [
          "A triad is a chord of three notes: a root, the third above it and the fifth above it.",
          "In C major: I = C E G (d m s), ii = D F A (r f l), iii = E G B (m s t), IV = F A C (f l d'), V = G B D (s t r'), vi = A C E (l d' m'), vii° = B D F (t r' f').",
          "Major triads: I, IV, V. Minor triads: ii, iii, vi. vii° is diminished.",
          "Arpeggio (horizontal): sing or play the notes one after the other. Harmony (vertical): three groups sing the notes together.",
        ],
      },
      {
        heading: "Chord progressions",
        points: [
          "A chord progression is a series of chords that moves the music forward.",
          "I – IV – V – I is the most common progression in hymns, highlife and gospel.",
          "I – vi – IV – V is used in many popular songs.",
          "A cadence is a chord ending: V – I (perfect cadence) sounds finished.",
        ],
      },
      {
        heading: "Improvisation over an ostinato",
        points: [
          "An ostinato is a short pattern repeated again and again (very common in African music, e.g. the bell pattern).",
          "Improvisation is making up music on the spot.",
          "Steps: one group plays or sings the bass ostinato I – vi – IV – V; others take turns making up short melodies using notes from each chord.",
        ],
      },
    ],
    words: [
      ["Triad", "A three-note chord: root, third and fifth."],
      ["Arpeggio", "The notes of a chord played one after another."],
      ["Harmony", "Notes sounded together."],
      ["Chord progression", "A series of chords in order."],
      ["Ostinato", "A short repeated musical pattern."],
      ["Improvisation", "Creating music on the spot."],
    ],
    materials: ["Keyboard, guitar or keyboard app", "Voices in three groups", "Manuscript book"],
    practical: {
      title: "Triads and a jam",
      steps: [
        "Sing d–m–s (I) as an arpeggio, then in three groups together as harmony.",
        "Do the same for f–l–d' (IV) and s–t–r' (V).",
        "Sing the progression I – IV – V – I in harmony.",
        "One group repeats l–f–s… or the bass notes d–l–f–s (I–vi–IV–V) as an ostinato.",
        "Others improvise short melodies over it, two bars each.",
        "Record and listen; choose the best melody and write it down.",
      ],
    },
    quiz: [
      { q: "A triad has how many notes?", options: ["2", "3", "4", "5"], answer: 1 },
      { q: "In C major, chord I is…", options: ["C E G", "D F A", "G B D", "F A C"], answer: 0 },
      { q: "In C major, chord V is…", options: ["G B D", "C E G", "A C E", "E G B"], answer: 0 },
      { q: "Notes of a chord played one after another form an…", options: ["arpeggio", "ostinato", "octave", "interval only"], answer: 0 },
      { q: "A short repeated pattern is an…", options: ["ostinato", "arpeggio", "cadence", "anthem"], answer: 0 },
      { q: "Which triad is minor in a major key?", options: ["vi", "I", "IV", "V"], answer: 0 },
      { q: "The progression V – I at the end is a…", options: ["perfect cadence", "crescendo", "triad", "rest"], answer: 0 },
    ],
    written: [
      { q: "Write the primary triads (I, IV, V) of C major in letter names and solfa.", answer: "I: C E G (d m s); IV: F A C (f l d'); V: G B D (s t r')." },
      { q: "Explain ostinato and improvisation and how they work together.", answer: "An ostinato is a short musical pattern repeated continuously; improvisation is spontaneously creating music. A group keeps the ostinato (e.g. a I–vi–IV–V bass) while others make up melodies over it using notes that fit each chord." },
    ],
  },
  {
    cls: "b9",
    code: "2.1.3",
    title: "Dance and Drama: dance drama, improvisation and blocking",
    emoji: "🎬",
    intro: "Create a simple dance drama or one-act play on a topical issue using improvisation, balance on stage and blocking.",
    sections: [
      {
        heading: "Dance drama and one-act plays",
        points: [
          "A dance drama tells a story mainly through dance, music and mime, with little or no speech.",
          "A one-act play is a short play with one act (it may have a few scenes).",
          "Topical issues: teenage pregnancy, drug abuse, galamsey, sanitation, cyber fraud, road safety.",
        ],
      },
      {
        heading: "Improvisation",
        text: "Improvisation means creating movements or dialogue on the spot without a script. Actors start from a situation (e.g. 'a quarrel at the water tap') and build the scene. Good improvisations are kept and written into the script.",
      },
      {
        heading: "Stage areas, harmony/balance and blocking",
        diagram: "stage-areas",
        points: [
          "Stage directions are given from the actor's view facing the audience: stage right, stage left, upstage (back), downstage (front), centre stage.",
          "Balance (stage picture): spread actors so the stage does not look empty on one side and crowded on the other.",
          "Blocking: planning exactly where and when actors move, stand, sit, enter and exit.",
          "Avoid turning your back to the audience; do not block another actor.",
        ],
      },
    ],
    words: [
      ["Dance drama", "A story told mainly through dance and mime."],
      ["One-act play", "A short play with a single act."],
      ["Improvisation", "Creating a scene or movement without a script."],
      ["Blocking", "Planning actors' positions and moves on stage."],
      ["Downstage", "The part of the stage nearest the audience."],
      ["Upstage", "The part of the stage furthest from the audience."],
    ],
    materials: ["Open space or stage", "Chalk or tape to mark stage areas", "Drums or music", "Simple costumes"],
    practical: {
      title: "Improvise and block a scene",
      steps: [
        "Mark the nine stage areas with chalk.",
        "Choose a topical issue and a situation.",
        "Improvise the scene for 3 minutes; keep the best lines and moves.",
        "Write the scene and add a short dance.",
        "Block every entrance, move and exit.",
        "Rehearse and perform; check balance on stage.",
      ],
    },
    quiz: [
      { q: "The part of the stage nearest the audience is…", options: ["downstage", "upstage", "backstage", "offstage"], answer: 0 },
      { q: "Stage right is the actor's right when…", options: ["facing the audience", "facing backstage", "lying down", "offstage"], answer: 0 },
      { q: "Planning where actors move and stand is…", options: ["blocking", "lighting", "make-up", "casting"], answer: 0 },
      { q: "Creating a scene without a script is…", options: ["improvisation", "rehearsal", "costume", "curtain"], answer: 0 },
      { q: "A story told mainly through dance and mime is a…", options: ["dance drama", "radio play", "lecture", "novel"], answer: 0 },
    ],
    written: [
      { q: "Explain blocking and state three rules of good blocking.", answer: "Blocking is planning the movements and positions of actors on stage. Rules: keep the stage balanced; do not turn your back to the audience; do not stand in front of (block) another actor; make entrances and exits clear; move with purpose." },
      { q: "Name the five main stage areas.", answer: "Upstage, downstage, centre stage, stage right, stage left (combined: upstage right, downstage left, etc.)." },
    ],
  },
  {
    cls: "b9",
    code: "2.2.1",
    title: "Visual Arts: exhibiting works inspired by philosophies and cultures",
    emoji: "🏛️",
    intro: "Make artworks inspired by philosophies, designs and processes from different times and cultures, exhibit them, and appraise them.",
    sections: [
      {
        heading: "Philosophies in art",
        points: [
          "Adinkra symbols carry Akan philosophy: Sankofa (go back and take it: learn from the past), Gye Nyame (except God), Dwennimmen (humility and strength), Nkyinkyim (life's journey).",
          "Kente colours and patterns have meanings: gold for wealth, green for growth, red for sacrifice.",
          "Other cultures: Egyptian art, Benin bronzes (Nigeria), Ndebele wall painting (South Africa), Japanese origami, modern recycled art.",
        ],
      },
      {
        heading: "Producing your works",
        points: [
          "Research a philosophy or culture.",
          "Develop ideas through sketches.",
          "Choose media and techniques learnt in JHS 1–3: drawing, painting, printing, weaving, modelling, casting, assemblage.",
          "Make the artwork and write an artist's statement (what it means and how you made it).",
        ],
      },
      {
        heading: "Exhibition and appraisal",
        diagram: "display-plan",
        text: "Plan the exhibition (theme, venue, roles, publicity, labels, visitors' book), exhibit, then appraise: describe, analyse, interpret and judge. Use feedback to improve future work.",
      },
    ],
    words: [
      ["Philosophy", "Beliefs and wisdom about life."],
      ["Sankofa", "Adinkra symbol: learn from the past."],
      ["Artist's statement", "A short text explaining an artwork."],
      ["Benin bronzes", "Cast metal plaques and heads from the Benin Kingdom (Nigeria)."],
    ],
    materials: ["Any media learnt in JHS", "Card for labels and statements", "Visitors' book"],
    practical: {
      title: "Philosophy art show",
      steps: [
        "Choose one Adinkra symbol or another cultural philosophy.",
        "Sketch three ideas showing its meaning in modern life.",
        "Make the artwork with a technique of your choice.",
        "Write a 3-sentence artist's statement.",
        "Exhibit with your class and collect comments.",
      ],
    },
    quiz: [
      { q: "The Adinkra symbol Sankofa teaches us to…", options: ["learn from the past", "fear the future", "stop learning", "be proud"], answer: 0 },
      { q: "Gye Nyame means…", options: ["except God", "go back and take it", "humility", "unity"], answer: 0 },
      { q: "A short text explaining an artwork is an…", options: ["artist's statement", "invoice", "advert only", "curriculum"], answer: 0 },
      { q: "The Benin bronzes come from present-day…", options: ["Nigeria", "Ghana", "Kenya", "Egypt"], answer: 0 },
    ],
    written: [
      { q: "Explain the meaning of three Adinkra symbols and suggest how one could inspire an artwork today.", answer: "Sankofa: learn from the past. Gye Nyame: supremacy of God (except God). Dwennimmen: humility with strength. Nkyinkyim: life's twists and turns/initiative. Example: a Sankofa poster encouraging young people to value their culture and history." },
    ],
  },
  {
    cls: "b9",
    code: "2.2.2",
    title: "Music: compose and present music on topical issues",
    emoji: "🎙️",
    intro: "Compose music that reflects times, cultures and topical issues, present music from across Africa, and appraise original works.",
    sections: [
      {
        heading: "Composing a message song",
        points: [
          "Choose an issue: drug abuse, galamsey, sanitation, voting peacefully, cyber safety.",
          "Write simple, catchy lyrics with a chorus that carries the main message.",
          "Choose a style: highlife, gospel, hiplife, Afrobeat or an indigenous style.",
          "Use a chord progression (I–IV–V–I) and a clear rhythm; plan the form (verse–chorus).",
          "Write the melody in solfa or staff notation and record a demo.",
        ],
      },
      {
        heading: "Planning and displaying",
        text: "Organise a concert or radio-style programme with your works and selected African songs that sensitise the public. Introduce each piece: composer, country, style, message.",
      },
      {
        heading: "Appreciation and appraisal",
        points: [
          "Listen to recordings and judge: message, lyrics, melody, harmony, rhythm, performance quality, originality.",
          "Write an appraisal report and refine the composition.",
        ],
      },
    ],
    words: [
      ["Lyrics", "The words of a song."],
      ["Composition", "A piece of music created by someone."],
      ["Demo", "A first recording of a new song."],
      ["Sensitise", "To make people aware of an issue."],
    ],
    materials: ["Notebook", "Phone to record", "Instruments or clapping"],
    practical: {
      title: "Write a message song",
      steps: [
        "Choose an issue and write a 4-line chorus.",
        "Write two short verses.",
        "Set the chorus to a simple tune using d r m s l.",
        "Add chords I–IV–V–I or a drum pattern.",
        "Perform and record it.",
        "Ask classmates to appraise it and improve it.",
      ],
    },
    quiz: [
      { q: "The words of a song are its…", options: ["lyrics", "chords", "tempo", "dynamics"], answer: 0 },
      { q: "To make people aware of an issue is to…", options: ["sensitise", "improvise", "transpose", "conduct"], answer: 0 },
      { q: "The part of a song that repeats the main message is usually the…", options: ["chorus", "intro only", "bridge only", "rest"], answer: 0 },
      { q: "A first recording of a new song is a…", options: ["demo", "concert", "chorus", "score"], answer: 0 },
    ],
    written: [
      { q: "Outline the steps in composing a song that sensitises the public on a topical issue.", answer: "Choose the issue and message; write lyrics with a strong chorus; choose a style; compose the melody (solfa/staff); add harmony or rhythm (e.g. I–IV–V–I); arrange the form (verse–chorus); rehearse and record; appraise and refine." },
    ],
  },
  {
    cls: "b9",
    code: "2.2.3",
    title: "Dance and Drama: producing a dance drama",
    emoji: "🎪",
    intro: "Produce, perform and analyse an original dance drama or one-act play on a socio-cultural issue.",
    sections: [
      {
        heading: "The production team",
        points: [
          "Director: guides the whole production and the actors.",
          "Choreographer: creates the dances.",
          "Playwright/scriptwriter: writes the script.",
          "Stage manager: runs rehearsals and the show backstage.",
          "Costume, make-up, props, set, lighting and sound crews.",
          "Publicity/front-of-house: posters, tickets, ushers.",
        ],
      },
      {
        heading: "Stages of production",
        points: [
          "Pre-production: theme, script, casting, design of costumes and set, rehearsal schedule.",
          "Rehearsals: reading, blocking, dance rehearsals, technical and dress rehearsals.",
          "Performance: on the day.",
          "Post-production: return items, clean up, evaluate.",
        ],
      },
      {
        heading: "Post-performance analysis",
        text: "Discuss: Was the message clear? How strong were the acting, dance, music, costumes and set? How did the audience react? What should change next time? Write a production report.",
      },
    ],
    words: [
      ["Director", "The person who guides a production."],
      ["Stage manager", "The person who runs the show backstage."],
      ["Dress rehearsal", "A full rehearsal in costume before the show."],
      ["Casting", "Choosing actors for roles."],
      ["Front of house", "Areas and work dealing with the audience."],
    ],
    materials: ["Script", "Costumes, props, set materials", "Instruments or sound system", "Posters"],
    practical: {
      title: "Class production",
      steps: [
        "Choose a socio-cultural issue and write a short dance-drama script.",
        "Assign production roles.",
        "Hold rehearsals: reading, blocking, dance, dress rehearsal.",
        "Publicise and perform for the school.",
        "Hold a post-performance analysis and write a report.",
      ],
    },
    quiz: [
      { q: "The person who guides the whole production is the…", options: ["director", "usher", "audience", "critic"], answer: 0 },
      { q: "A full rehearsal in costume is the…", options: ["dress rehearsal", "read-through", "audition", "curtain call"], answer: 0 },
      { q: "Choosing actors for roles is…", options: ["casting", "blocking", "lighting", "staging"], answer: 0 },
      { q: "Who runs the show backstage?", options: ["Stage manager", "Audience", "Usher", "Critic"], answer: 0 },
    ],
    written: [
      { q: "Describe the four stages of producing a dance drama.", answer: "Pre-production: choose theme, write script, cast, design costumes/set, plan rehearsals. Rehearsals: read-through, blocking, dance, technical and dress rehearsals. Performance: present the show. Post-production: clear up and evaluate (post-performance analysis)." },
    ],
  },
  {
    cls: "b9",
    code: "2.3.1",
    title: "Visual Arts: African artists and their influence",
    emoji: "🌍",
    intro: "Identify, discuss and analyse works of African visual artists, how they reflect history, culture and issues, and how they connect with other subjects.",
    sections: [
      {
        heading: "Some African visual artists",
        points: [
          "El Anatsui (Ghana, works in Nigeria): bottle-top and metal 'cloths' about trade, history and waste.",
          "Ben Enwonwu (Nigeria): painter and sculptor; famous for 'Anyanwu' and the 'Tutu' portraits.",
          "Bruce Onobrakpeya (Nigeria): printmaker who invented new printing techniques.",
          "Malangatana Ngwenya (Mozambique): painted the struggle and suffering of his people.",
          "Esther Mahlangu (South Africa): bold Ndebele geometric wall painting.",
          "Ibrahim El-Salahi (Sudan): mixed Arabic calligraphy and African forms.",
        ],
      },
      {
        heading: "How artists respond to their world",
        points: [
          "History: colonialism, independence, wars.",
          "Culture: traditional symbols, festivals, dress.",
          "Issues: waste, poverty, environment, peace.",
          "Connections: art links with history, social studies, science (materials), mathematics (geometry in patterns) and literature.",
        ],
      },
    ],
    words: [
      ["Contemporary art", "Art of our time."],
      ["Calligraphy", "Beautiful, artistic handwriting."],
      ["Ndebele painting", "Geometric house painting of the Ndebele people."],
      ["Influence", "The effect an artist has on others."],
    ],
    materials: ["Pictures of African artworks", "Notebook", "Drawing materials"],
    practical: {
      title: "African artist study",
      steps: [
        "Choose one African artist from the list.",
        "Find two of their works and describe them.",
        "Explain what history, culture or issue they show.",
        "Link the work to one other school subject.",
        "Make a small work in the same spirit and present both.",
      ],
    },
    quiz: [
      { q: "Esther Mahlangu is known for…", options: ["Ndebele geometric painting", "bronze casting", "weaving kente", "pottery only"], answer: 0 },
      { q: "Ben Enwonwu was from…", options: ["Nigeria", "Ghana", "Kenya", "Egypt"], answer: 0 },
      { q: "Malangatana Ngwenya was from…", options: ["Mozambique", "Senegal", "Ghana", "Sudan"], answer: 0 },
      { q: "Bruce Onobrakpeya is famous as a…", options: ["printmaker", "drummer", "dancer", "architect"], answer: 0 },
      { q: "Beautiful artistic handwriting is…", options: ["calligraphy", "lithography", "choreography", "geography"], answer: 0 },
    ],
    written: [
      { q: "Discuss two African visual artists and how their works reflect history, culture or topical issues.", answer: "El Anatsui (Ghana/Nigeria): uses bottle tops and metal waste woven like kente to speak about trade, consumption and history. Esther Mahlangu (South Africa): Ndebele geometric painting that preserves her people's culture and identity. (Also Malangatana: struggle in Mozambique; Ben Enwonwu: Nigerian identity.)" },
    ],
  },
  {
    cls: "b9",
    code: "2.3.2",
    title: "Music: African composers and popular genres",
    emoji: "🌍",
    intro: "Distinguish how African composers reflect history, culture and issues, and appreciate African indigenous dance genres and popular music.",
    sections: [
      {
        heading: "African art composers",
        points: [
          "Fela Sowande (Nigeria): organist and composer of 'African Suite' using Nigerian melodies.",
          "Akin Euba (Nigeria): composer and scholar who mixed African and Western art music.",
          "Ephraim Amu and J. H. Kwabena Nketia (Ghana): choral and art music rooted in African traditions.",
        ],
      },
      {
        heading: "Popular music across Africa",
        points: [
          "Highlife (Ghana): E. T. Mensah, Nana Ampadu.",
          "Afrobeat (Nigeria): Fela Anikulapo Kuti; songs criticised corruption and injustice.",
          "Mbalax (Senegal): Youssou N'Dour.",
          "Soukous (DR Congo): Franco, Papa Wemba.",
          "Isicathamiya (South Africa): Ladysmith Black Mambazo, unaccompanied choral singing.",
          "Miriam Makeba (South Africa): sang against apartheid ('Pata Pata').",
        ],
      },
      {
        heading: "African indigenous dance genres",
        points: [
          "Adumu (Maasai, Kenya/Tanzania): the jumping dance of young warriors.",
          "Gumboot dance (South Africa): began among miners who stamped and slapped their boots.",
          "Sabar (Senegal): energetic dance to sabar drums.",
          "Agbekor (Ewe, Ghana/Togo): a war dance.",
          "Appraise by style, instruments, song themes, movements and costumes.",
        ],
      },
    ],
    words: [
      ["Afrobeat", "Nigerian style created by Fela Kuti, mixing highlife, jazz and funk."],
      ["Apartheid", "The former system of racial separation in South Africa."],
      ["Isicathamiya", "South African unaccompanied choral singing."],
      ["Genre", "A style or type of music or dance."],
    ],
    materials: ["Recordings (radio, phone)", "Notebook"],
    practical: {
      title: "African music map",
      steps: [
        "Choose three African indigenous dance genres and three popular music genres.",
        "For each, note country, artists, instruments, themes and movements.",
        "Listen to one song and explain its message.",
        "Present your findings as a table or map.",
      ],
    },
    quiz: [
      { q: "Afrobeat was created by…", options: ["Fela Kuti", "Youssou N'Dour", "Miriam Makeba", "E. T. Mensah"], answer: 0 },
      { q: "Mbalax comes from…", options: ["Senegal", "Ghana", "Kenya", "Egypt"], answer: 0 },
      { q: "Ladysmith Black Mambazo sing…", options: ["isicathamiya", "highlife", "soukous", "reggae"], answer: 0 },
      { q: "The Maasai jumping dance is called…", options: ["Adumu", "Adowa", "Bawa", "Sabar"], answer: 0 },
      { q: "The gumboot dance began among…", options: ["South African miners", "Ghanaian fishermen", "Egyptian farmers", "Kenyan traders"], answer: 0 },
      { q: "'African Suite' was composed by…", options: ["Fela Sowande", "Fela Kuti", "Papa Wemba", "Koo Nimo"], answer: 0 },
    ],
    written: [
      { q: "Name three African popular music genres, their countries and one artist each.", answer: "Highlife (Ghana): E. T. Mensah. Afrobeat (Nigeria): Fela Kuti. Mbalax (Senegal): Youssou N'Dour. Soukous (DR Congo): Papa Wemba. Isicathamiya (South Africa): Ladysmith Black Mambazo." },
    ],
  },
  {
    cls: "b9",
    code: "2.3.3",
    title: "Dance and Drama: African dance and drama works",
    emoji: "📜",
    intro: "Reflect on African dance and drama works, generate ideas from them, create and perform a piece based on one, and conduct a performance review.",
    sections: [
      {
        heading: "African playwrights and plays",
        points: [
          "Wole Soyinka (Nigeria): 'The Lion and the Jewel'; first African winner of the Nobel Prize in Literature (1986).",
          "Ola Rotimi (Nigeria): 'The Gods Are Not to Blame', an African retelling of a Greek tragedy.",
          "Ngũgĩ wa Thiong'o (Kenya): 'I Will Marry When I Want' (with Ngũgĩ wa Mĩriĩ), written in Gikuyu for village audiences.",
          "Efua Sutherland and Ama Ata Aidoo (Ghana): 'The Marriage of Anansewa', 'Anowa'.",
        ],
      },
      {
        heading: "Generating ideas from a work",
        text: "Pick a dance or play. Identify its theme, the culture it shows and the ideas embedded (e.g. tradition versus modern life in 'The Lion and the Jewel'). Then create your own short play or dance that responds to the same idea in your community.",
      },
      {
        heading: "Performance review",
        points: [
          "Title, performers, date, venue.",
          "Summary of the story or dance.",
          "Strengths and weaknesses: acting, movement, music, costume, set, use of space.",
          "Message and audience response.",
          "Recommendation: what to keep and what to improve.",
        ],
      },
    ],
    words: [
      ["Tragedy", "A serious play with a sad ending."],
      ["Comedy", "A light, funny play with a happy ending."],
      ["Adaptation", "A new version of an existing story or play."],
      ["Performance review", "A written judgement of a performance."],
    ],
    materials: ["Copies or videos of African plays and dances", "Notebook", "Costumes and props"],
    practical: {
      title: "Respond to an African classic",
      steps: [
        "Read or watch a scene from an African play.",
        "Write its theme in one sentence.",
        "Create a 5-minute scene or dance that brings the theme to your community today.",
        "Rehearse and perform.",
        "Write a performance review of another group's piece.",
      ],
    },
    quiz: [
      { q: "'The Lion and the Jewel' was written by…", options: ["Wole Soyinka", "Ola Rotimi", "Efua Sutherland", "Ngũgĩ wa Thiong'o"], answer: 0 },
      { q: "The first African to win the Nobel Prize in Literature was…", options: ["Wole Soyinka", "Chinua Achebe", "Ama Ata Aidoo", "Kofi Awoonor"], answer: 0 },
      { q: "'The Gods Are Not to Blame' was written by…", options: ["Ola Rotimi", "Wole Soyinka", "Joe de Graft", "Martin Owusu"], answer: 0 },
      { q: "A serious play with a sad ending is a…", options: ["tragedy", "comedy", "farce", "musical"], answer: 0 },
      { q: "A new version of an existing story is an…", options: ["adaptation", "audition", "applause", "agenda"], answer: 0 },
    ],
    written: [
      { q: "Name two African playwrights and one play by each. State the theme of one of the plays.", answer: "Wole Soyinka: 'The Lion and the Jewel' (theme: tradition versus modernity). Ola Rotimi: 'The Gods Are Not to Blame' (fate and pride). Ngũgĩ wa Thiong'o: 'I Will Marry When I Want'. Ama Ata Aidoo: 'Anowa'." },
    ],
  },
];
