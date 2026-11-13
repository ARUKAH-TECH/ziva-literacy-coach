import type { Topic } from "../types";

// JHS 2 (B8): detailed lessons for each content standard.

export const TOPICS_B8: Record<string, Topic[]> = {
  "1.1.1": [
    {
      title: "Texture: how surfaces feel and look",
      emoji: "🪵",
      explain: [
        "Texture is the surface quality of an object: how it feels when we touch it, or how it looks as if it would feel. It is one of the elements of design.",
        "Actual (tactile or real) texture is what you can really feel: the rough bark of a tree, the smooth inside of a calabash, the bumpy skin of a pineapple, the woven surface of a basket, a plastered wall.",
        "Visual (implied) texture is drawn, painted or printed so that it looks rough or smooth, but the paper is flat when you touch it. Artists create visual texture with lines, dots and shading, for example drawing fur on a dog or grain on wood.",
        "Texture makes designs more interesting, helps us recognise materials, and can give feelings: smooth textures feel calm and clean, rough textures feel strong or natural.",
      ],
      examples: [
        ["Actual texture", "Kente cloth, a doormat, sandpaper, a pineapple, a woven Bolga basket."],
        ["Visual texture", "A printed wood pattern on a plastic table, a drawing of hair, a photograph of rocks."],
      ],
      steps: { title: "Make a texture rubbing collection (frottage)", items: ["Take thin paper and a crayon without its paper wrapper.", "Place the paper over a textured surface (a leaf, a coin, a sack, a wall).", "Rub the side of the crayon firmly across the paper.", "Watch the texture appear.", "Collect 6 rubbings and label each with its source."] },
      remember: ["Texture = surface quality.", "Actual texture can be felt; visual texture is only seen.", "Rubbing (frottage) collects textures."],
      check: [
        { q: "A drawing of fur that is flat to touch shows…", options: ["visual texture", "actual texture", "colour", "form"], answer: 0 },
        { q: "Rubbing a crayon over paper on a rough surface is…", options: ["frottage", "stippling", "weaving", "printing"], answer: 0 },
      ],
    },
    {
      title: "Colour: hue, value, intensity and colour schemes",
      emoji: "🎨",
      explain: [
        "Colour has three properties. Hue is the name of the colour (red, blue, green). Value is how light or dark it is: adding white makes a tint (lighter); adding black makes a shade (darker); adding grey makes a tone. Intensity (saturation) is how bright or dull it is.",
        "Primary colours: red, yellow, blue. Secondary colours: orange, green, violet. Tertiary (intermediate) colours are made by mixing a primary with the secondary next to it: red-orange, yellow-orange, yellow-green, blue-green, blue-violet, red-violet.",
        "Colour schemes are planned combinations. Complementary colours are opposite each other on the colour wheel (red–green, blue–orange, yellow–violet); together they are strong and eye-catching. Harmonious (analogous) colours sit side by side (yellow, yellow-green, green); together they feel calm. Monochromatic uses tints and shades of one hue. Warm colours (red, orange, yellow) feel hot and exciting; cool colours (blue, green, violet) feel calm and cool.",
        "In nature colour has jobs: bright flowers attract bees, green leaves make food, some animals use colour to hide (camouflage) or to warn (bright frogs).",
      ],
      diagram: "texture-colour",
      remember: ["Hue = name; value = light/dark; intensity = bright/dull.", "Tint = + white; shade = + black.", "Complementary = opposite; harmonious = side by side."],
      check: [
        { q: "Blue and orange are…", options: ["complementary colours", "harmonious colours", "tints", "shades"], answer: 0 },
        { q: "Red + black gives a…", options: ["shade of red", "tint of red", "complementary colour", "primary colour"], answer: 0 },
        { q: "Yellow-green is a…", options: ["tertiary colour", "primary colour", "secondary colour", "neutral colour"], answer: 0 },
      ],
    },
    {
      title: "Contrast, emphasis and unity (with variety)",
      emoji: "🎯",
      explain: [
        "Contrast means placing very different things next to each other so that they stand out: light against dark, rough against smooth, big against small, warm against cool colours. Contrast makes designs exciting and easy to read, which is why road signs use black on yellow.",
        "Emphasis is making one part of a design the centre of attention, called the focal point. You can create emphasis with contrast (a red flower in a green field), size (one big shape among small ones), position (in the centre) or isolation (one shape alone).",
        "Unity is the feeling that all parts of a design belong together. You create unity by repeating colours, shapes, lines or textures throughout the work, and by keeping one theme. A kente cloth has unity because its strips share the same colours and motifs.",
        "Variety means including some differences so the design is not boring. A good design balances unity and variety: enough sameness to belong together, enough difference to stay interesting.",
      ],
      steps: { title: "Design a poster with a focal point", items: ["Choose a short message (e.g. 'Keep Ghana Clean').", "Pick two complementary colours for strong contrast.", "Make the main word big and place it centrally (emphasis).", "Repeat one colour and one shape across the poster (unity).", "Add a few small different shapes (variety).", "Ask a friend what they see first: that should be your focal point."] },
      remember: ["Contrast = strong differences.", "Emphasis = the focal point.", "Unity = belonging together; variety = interesting differences."],
      check: [
        { q: "The part of a design that catches the eye first is the…", options: ["focal point", "background", "border", "frame"], answer: 0 },
        { q: "Repeating colours throughout a design creates…", options: ["unity", "contrast", "variety only", "texture"], answer: 0 },
      ],
    },
  ],
  "1.2.1": [
    {
      title: "Geometric constructions with instruments",
      emoji: "📐",
      explain: [
        "2-D drawing deals with flat figures that have only length and width. Accurate 2-D drawings are made with instruments: ruler, T-square, set squares, protractor and a pair of compasses.",
        "To bisect a line (divide it into two equal parts at 90°): open the compasses to more than half the line; from end A draw arcs above and below; with the same radius, from end B draw arcs crossing the first ones; join the two crossing points.",
        "To construct an angle of 60°: draw a line AB; with A as centre draw an arc cutting AB at C; with C as centre and the same radius, cut the arc at D; join AD. Angle DAB = 60°. Bisect it to get 30°.",
        "To draw a regular hexagon: draw a circle; keeping the same radius, step around the circle six times; join the six points. To draw a square: draw two lines at right angles through a circle's centre and join the four points where they cut the circle.",
      ],
      steps: { title: "Draw a hexagon pattern", items: ["Draw a circle of radius 3 cm.", "Without changing the compasses, mark six points around it.", "Join the points to make a hexagon.", "Draw more hexagons sharing edges to form a honeycomb.", "Colour using a planned colour scheme."] },
      remember: ["Bisect = cut into two equal parts.", "Compasses step the radius six times for a hexagon.", "Use light construction lines, then darken final lines."],
      check: [
        { q: "To bisect a line means to…", options: ["divide it into two equal parts", "make it longer", "colour it", "rub it out"], answer: 0 },
        { q: "Stepping the radius round a circle six times gives a…", options: ["hexagon", "pentagon", "square", "triangle"], answer: 0 },
      ],
    },
    {
      title: "Shading and colouring flat designs",
      emoji: "🖍️",
      explain: [
        "Flat colouring fills a shape evenly with one colour; it is used in posters, logos and patterns.",
        "Gradation (graded tone) changes smoothly from light to dark or from one colour to another. It suggests light, distance or movement.",
        "Choose colour schemes on purpose: complementary for strong contrast and attention; harmonious for calm, pleasant designs; monochromatic for unity.",
        "Digital tools (phone drawing apps and free programs like Krita or Inkscape) have fill, gradient, shape and layer tools that make 2-D designs neat and easy to change.",
      ],
      remember: ["Flat colour = even fill.", "Gradation = smooth change of tone.", "Choose colour schemes for the feeling you want."],
      check: [
        { q: "A smooth change from light to dark is…", options: ["gradation", "texture", "rhythm", "weaving"], answer: 0 },
        { q: "Which colour scheme gives strong contrast?", options: ["Complementary", "Harmonious", "Monochromatic", "Neutral only"], answer: 0 },
      ],
    },
    {
      title: "Templates (nets) and models",
      emoji: "📦",
      explain: [
        "A net is a 2-D template that folds into a 3-D form. Designers use nets to make boxes, packages and models.",
        "Nets: a cube has 6 equal squares; a cuboid has 3 pairs of rectangles; a triangular prism has 2 triangles and 3 rectangles; a square pyramid has 1 square and 4 triangles; a cylinder has 2 circles and 1 rectangle whose length equals the circle's circumference.",
        "Always add glue flaps, score (lightly press) fold lines with a ruler and a blunt point, cut carefully and glue firmly.",
        "Models can also be made in clay, Styrofoam or paper pulp. Display your drawings, templates and models together for appreciation and feedback.",
      ],
      steps: { title: "Make a packaging box", items: ["Measure a small item (e.g. soap).", "Draw a cuboid net 0.5 cm larger than the item, with glue flaps and a closing lid.", "Design a label on the front face (name, logo, colours).", "Cut, score, fold and glue.", "Place the item inside and display."] },
      remember: ["Net = flat template of a 3-D form.", "Add glue flaps; score folds.", "Display drawings, nets and models together."],
      check: [
        { q: "The net of a cylinder has 2 circles and 1…", options: ["rectangle", "triangle", "hexagon", "square only"], answer: 0 },
        { q: "How many triangles are in the net of a square pyramid?", options: ["4", "3", "2", "6"], answer: 0 },
      ],
    },
  ],
  "1.3.1": [
    {
      title: "Evaluating products around us",
      emoji: "🔎",
      explain: [
        "To improve products, designers first evaluate (judge) existing ones. Ask: Function: does it do its job well? User: is it safe and easy for everyone, including children, the elderly and people with disabilities? Materials: are they strong, durable and available locally? Cost: is it affordable? Appearance: is it attractive? Environment: can it be repaired, reused or recycled?",
        "Example: a plastic chair is cheap, light and stackable, but it can crack in the sun and is hard to recycle. A wooden chair lasts longer but is heavier and more expensive.",
        "Write the strengths and weaknesses of a product, then suggest how it could be modified to solve other problems.",
      ],
      remember: ["Evaluate: function, user, materials, cost, appearance, environment.", "List strengths and weaknesses.", "Suggest modifications."],
      check: [
        { q: "'Is it easy for the elderly to use?' checks the product's…", options: ["user needs", "colour", "price", "texture"], answer: 0 },
        { q: "Judging a product is called…", options: ["evaluation", "decoration", "weaving", "casting"], answer: 0 },
      ],
    },
    {
      title: "Writing a design brief and specification",
      emoji: "📝",
      explain: [
        "A design brief is a short statement of the problem and what will be designed. Example: 'Design a lightweight bag for carrying farm produce to the market that a child can carry safely.'",
        "A specification is a list of requirements the design must meet: size, weight, cost, materials, safety, appearance and how it will be used. Example: must hold 5 kg; cost less than GH₵20; made from local materials; padded strap.",
        "The specification is used later to test and evaluate the final design: if the product meets the specification, it is successful.",
      ],
      remember: ["Brief = what to design and for whom.", "Specification = list of requirements.", "Test the final product against the specification."],
      check: [
        { q: "A list of requirements a design must meet is a…", options: ["specification", "portfolio", "stencil", "texture"], answer: 0 },
        { q: "The final product is tested against the…", options: ["specification", "weather", "audience", "price list only"], answer: 0 },
      ],
    },
    {
      title: "Prototyping, testing and refining",
      emoji: "🛠️",
      explain: [
        "After choosing the best idea, make a prototype (a first working model) using available materials. It does not have to be perfect; it is for testing.",
        "Testing means trying the prototype with real users, recording what works and what does not, and checking it against the specification.",
        "Refining means improving the design based on test results. Designers may test and refine several times. Finally, display your prototype with drawings and notes explaining the problem, your solution and the improvements you made.",
      ],
      diagram: "design-process",
      remember: ["Prototype = first model for testing.", "Test with real users and the specification.", "Refine and present."],
      check: [
        { q: "Improving a design after testing is…", options: ["refining", "defining", "briefing", "copying"], answer: 0 },
        { q: "A first working model is a…", options: ["prototype", "portfolio", "pattern", "palette"], answer: 0 },
      ],
    },
  ],
  "2.1.1": [
    {
      title: "Drawing from observation, memory and imagination",
      emoji: "👁️",
      explain: [
        "Drawing from direct observation means drawing an object or scene while looking at it: a classmate, a tree, a market scene. It trains your eye to see shapes, proportions and light.",
        "Drawing from memory means drawing something you saw before, such as your house, last year's festival or a market. Observe carefully in daily life so you can remember details.",
        "Drawing from imagination means creating something from your mind: a future Accra, a scene from a story, an invented animal. Use what you know from observation to make it believable.",
        "Use art vocabulary to talk about drawings: line (outline, contour), shape and form, tone (light and dark), pattern and texture, proportion and composition (arrangement).",
      ],
      steps: { title: "Three drawings challenge", items: ["Observation: draw your shoe while looking at it.", "Memory: close your eyes, remember your school gate, then draw it.", "Imagination: draw your shoe as a vehicle of the future.", "Shade all three.", "Compare: which was easiest and why?"] },
      remember: ["Observation = looking while drawing.", "Memory = from what you saw before.", "Imagination = from your mind."],
      check: [
        { q: "Drawing a festival you attended last year is drawing from…", options: ["memory", "observation", "a stencil", "a photocopy"], answer: 0 },
        { q: "The lightness or darkness in a drawing is its…", options: ["tone", "texture", "pattern", "line"], answer: 0 },
      ],
    },
    {
      title: "Printmaking: stencil, direct and relief printing",
      emoji: "🖨️",
      explain: [
        "Printmaking means making copies (prints) of an image by transferring ink or paint from a prepared surface onto paper or cloth.",
        "Direct printing: dip an object (leaf, bottle top, cut okra, finger) in paint and press it. Stencil printing: cut a design out of card or plastic; dab paint through the hole. Relief (block) printing: cut away the background of a block so that the design stands up; ink the raised parts and press. Blocks can be made from cassava, cocoyam, potato, wood or lino. Adinkra stamps are carved from calabash. Low relief: glue string or card onto a board to make a raised design.",
        "Tools and materials: cutting tools and gouges, a roller (brayer), printing ink or poster colour, a glass or tile for rolling ink, a baren or spoon for pressing, paper or cloth.",
        "Words to use: stencil, block, motif (the repeated design), repeat pattern, registration (lining up prints), contrasting and harmonious colours.",
        "Care: clean blocks, rollers and brushes immediately after use; dry and store them; keep cutting tools covered.",
      ],
      diagram: "print-making",
      steps: { title: "Stencil print", items: ["Draw a simple motif on card (e.g. a star or an Adinkra symbol).", "Cut out the motif carefully to make a hole (stencil).", "Place the stencil on paper or cloth.", "Dab paint through it with a sponge.", "Lift carefully; move the stencil and repeat to make a pattern."] },
      remember: ["Printing = making copies by transferring ink.", "Types: direct, stencil, relief/block, low relief.", "Clean tools after printing."],
      check: [
        { q: "Adinkra stamps are traditionally carved from…", options: ["calabash", "glass", "iron", "plastic"], answer: 0 },
        { q: "In relief printing, the printing part is…", options: ["raised", "cut away", "the back", "invisible"], answer: 0 },
      ],
    },
    {
      title: "Weaving: warp, weft and weaves",
      emoji: "🧶",
      explain: [
        "Weaving is interlacing two sets of threads or strips at right angles to make a fabric or object. The warp threads run lengthwise and are stretched on the loom. The weft threads go across, over and under the warp.",
        "Plain (tabby) weave: weft goes over one warp, under one, and alternates each row. It is simple and strong. Twill weave: weft goes over two, under two, shifting one step each row, which forms diagonal lines, like in jeans. Satin weave: weft floats over several warps, giving a smooth shiny surface.",
        "Materials: cane, raffia, reed, straw, palm fronds, yarn, cotton, strips of paper, cloth or plastic. Tools: loom (from cardboard or wood), shuttle or needle, beater (comb) to push weft tight, scissors.",
        "In Ghana, kente is woven in narrow strips at Bonwire (Asante) and Agotime (Ewe) and then sewn together; Bolga baskets are woven from straw; Northern smocks (fugu) use woven strips.",
      ],
      diagram: "weaving",
      steps: { title: "Cardboard loom weaving", items: ["Cut small notches 1 cm apart on two opposite ends of a cardboard.", "Wind yarn round the card through the notches to make the warp.", "Thread a needle or stick with weft yarn.", "Weave over one, under one across; next row, under one, over one.", "Push each row down with a comb.", "Change colours for stripes; tie off and remove from the card."] },
      remember: ["Warp = lengthwise; weft = across.", "Plain, twill and satin weaves.", "Kente: Bonwire and Agotime."],
      check: [
        { q: "Threads stretched lengthwise on a loom are the…", options: ["warp", "weft", "twill", "shuttle"], answer: 0 },
        { q: "Diagonal lines in a fabric show a… weave.", options: ["twill", "plain", "satin", "knotted"], answer: 0 },
      ],
    },
  ],
  "2.1.2": [
    {
      title: "Tempo: how fast or slow",
      emoji: "⏩",
      explain: [
        "Tempo is the speed of music. Composers write Italian words at the start of music to show the tempo.",
        "Largo: very slow and broad. Adagio: slow. Andante: at a walking pace. Moderato: moderate speed. Allegro: fast and lively. Presto: very fast. Changes in tempo: accelerando (gradually getting faster), ritardando or rallentando (gradually getting slower), a tempo (return to the original speed), poco a poco (little by little).",
        "Different occasions need different tempos. Slow music suits funerals, prayers, lullabies and moments of reflection. Fast music suits festivals, celebrations, sports, marching and dancing.",
      ],
      diagram: "tempo-dynamics",
      remember: ["Tempo = speed.", "Largo → Adagio → Andante → Moderato → Allegro → Presto.", "Accelerando = faster; ritardando = slower."],
      check: [
        { q: "Andante means…", options: ["walking pace", "very fast", "very slow", "stop"], answer: 0 },
        { q: "Gradually getting faster is…", options: ["accelerando", "ritardando", "crescendo", "diminuendo"], answer: 0 },
      ],
    },
    {
      title: "Dynamics: loud and soft",
      emoji: "🔊",
      explain: [
        "Dynamics is how loud or soft music is. Signs: pp (pianissimo) very soft; p (piano) soft; mp (mezzo piano) moderately soft; mf (mezzo forte) moderately loud; f (forte) loud; ff (fortissimo) very loud.",
        "Crescendo (cresc. or <) means gradually getting louder. Diminuendo or decrescendo (dim. or >) means gradually getting softer.",
        "Benefits of soft music: calms the mind, helps sleep, study, prayer and relaxation. Benefits of loud music: excites people, gathers crowds, announces events, energises dancing. But very loud music for a long time can damage hearing and disturb neighbours.",
      ],
      remember: ["p = soft; f = loud; m = moderately.", "Crescendo = louder; diminuendo = softer.", "Protect your hearing from very loud music."],
      check: [
        { q: "mf means…", options: ["moderately loud", "very soft", "very loud", "fast"], answer: 0 },
        { q: "Gradually getting softer is…", options: ["diminuendo", "crescendo", "allegro", "forte"], answer: 0 },
      ],
    },
    {
      title: "Musical forms in art, pop and indigenous music",
      emoji: "🧩",
      explain: [
        "Form is the plan or structure of a piece of music. We label sections with letters: same music = same letter; new music = new letter.",
        "Strophic (AA…): the same music repeats for each verse, as in many hymns. Binary (AB): two contrasting sections. Ternary (ABA): a section, a contrasting section, then the first again. Rondo (ABACA): the main tune returns between different sections. AABA: common in songs. Through-composed: new music throughout, little repetition. Free fantasia: free form, like an improvisation.",
        "Pop songs often use verse–chorus form (verse tells the story; chorus repeats the main message), verse–chorus–bridge (the bridge is a new contrasting part), or ballad (a slow song telling a story). Indigenous Ghanaian songs often use call and response, with a cantor and chorus.",
      ],
      diagram: "musical-forms",
      remember: ["Same music = same letter.", "AB binary, ABA ternary, ABACA rondo, AA strophic.", "Pop: verse, chorus, bridge."],
      check: [
        { q: "ABACA is…", options: ["rondo form", "binary form", "ternary form", "strophic form"], answer: 0 },
        { q: "The part of a pop song that repeats the main message is the…", options: ["chorus", "verse", "bridge", "intro"], answer: 0 },
      ],
    },
  ],
  "2.1.3": [
    {
      title: "Types of Ghanaian dances",
      emoji: "🪘",
      explain: [
        "Ghanaian dances can be grouped by their purpose. Religious dances are performed in worship of the Supreme Being, deities or ancestors, often by priests and priestesses in a state of devotion, e.g. Akom (Akan).",
        "War (warrior) dances show bravery and were performed before and after battles; today they appear at festivals and funerals of chiefs, e.g. Fontomfrom (Akan royal and warrior dance), Atrikpui (Ewe), Asafo dances (Fante).",
        "Socio-cultural (recreational) dances are performed for entertainment and at social occasions like festivals, funerals, weddings and parties, e.g. Adowa (Akan), Kpanlogo (Ga), Agbadza and Borborbor (Ewe), Bawa (Dagaaba), Takai and Bamaya (Dagomba), Sikyi (Akan).",
        "Comparing them: religious dances are sacred and serious; war dances are vigorous and show strength; recreational dances are open to more people and focus on enjoyment.",
      ],
      remember: ["Religious, war and socio-cultural (recreational) dances.", "Fontomfrom & Atrikpui = war; Akom = religious.", "Kpanlogo, Borborbor, Bawa = recreational."],
      check: [
        { q: "Akom is a… dance.", options: ["religious", "war", "recreational", "school"], answer: 0 },
        { q: "Atrikpui is an Ewe… dance.", options: ["war", "religious", "lullaby", "harvest only"], answer: 0 },
      ],
    },
    {
      title: "Context of performance",
      emoji: "📍",
      explain: [
        "The context of a dance is everything around it: the occasion (festival, funeral, installation of a chief, worship, harvest), the place (palace, shrine, community square), the performers (royals, priests, youth, women, an Asafo company), the audience, the costume, the instruments and the time.",
        "Knowing the context helps us understand and respect the dance. For example, some royal dances can only be performed in the presence of the chief; some shrine dances are not performed for entertainment.",
        "To explore a dance's context, interview elders, watch performances, and record your findings.",
      ],
      remember: ["Context = occasion, place, performers, audience, costume, instruments.", "Context gives meaning and rules to a dance.", "Respect sacred and royal dances."],
      check: [
        { q: "The 'when, where, who and why' of a dance is its…", options: ["context", "tempo", "costume only", "rhythm"], answer: 0 },
        { q: "Which is an occasion for dance?", options: ["A festival", "A maths test", "Sleeping", "Cooking alone"], answer: 0 },
      ],
    },
    {
      title: "Rhythm and dynamics in dance and drama",
      emoji: "💫",
      explain: [
        "Rhythm in movement includes beat (the steady pulse you step to), tempo (speed) and intensity (how much energy).",
        "Dynamics in movement describe the quality of movement: fast or slow, smooth and flowing or sharp and sudden, heavy or light, strong or gentle.",
        "Actors and dancers change rhythm and dynamics to show emotions and characters: slow heavy steps for sorrow or old age; quick light steps for joy or a child; sharp sudden moves for anger or fear.",
      ],
      steps: { title: "Movement dynamics game", items: ["Walk around to a steady drum beat.", "When the drum speeds up, move faster; when it slows, move slower.", "When the teacher says 'heavy', move like an elephant; 'light', like a butterfly.", "When the teacher says 'sharp', make sudden robot moves; 'smooth', flow like water.", "Use these to show a character in a short scene."] },
      remember: ["Rhythm: beat, tempo, intensity.", "Dynamics: fast/slow, smooth/sharp, heavy/light.", "Change them to show feelings."],
      check: [
        { q: "The amount of energy in a movement is its…", options: ["intensity", "costume", "venue", "theme"], answer: 0 },
        { q: "Slow, heavy steps can show…", options: ["sorrow or old age", "excitement", "a young child playing", "anger only"], answer: 0 },
      ],
    },
  ],
  "2.2.1": [
    {
      title: "Researching and planning an artwork with a message",
      emoji: "🗒️",
      explain: [
        "Good artworks start with research. Choose a theme: history (Ghana's independence on 6 March 1957), culture (festivals, chieftaincy), environment (galamsey, deforestation, plastic waste), or social services (the SSNIT Pension Scheme, health insurance).",
        "Record information: facts, pictures, interviews, symbols and colours linked to the theme. Then make thumbnail sketches (small quick drawings) of different ideas.",
        "Choose the best idea and decide the art form (poster, painting, collage, print, sculpture, textile) and the materials and techniques.",
      ],
      remember: ["Research the theme first.", "Make thumbnail sketches.", "Choose art form, materials and techniques."],
      check: [
        { q: "Small quick drawings of ideas are…", options: ["thumbnail sketches", "murals", "billboards", "prints"], answer: 0 },
        { q: "Ghana became independent in…", options: ["1957", "1960", "1966", "1992"], answer: 0 },
      ],
    },
    {
      title: "Making the artwork and checking its message",
      emoji: "🖼️",
      explain: [
        "Apply the design process: develop the chosen idea, make the artwork, then reflect: does it communicate the intended idea and meaning?",
        "Use symbols and colours wisely: e.g. red, gold, green and the black star for Ghana; dark muddy colours for polluted rivers; bright colours for celebration.",
        "Ask classmates what message they see. If they misunderstand, adjust the image, text or colours.",
      ],
      remember: ["Use the design process.", "Symbols and colours carry meaning.", "Check that viewers understand the message."],
      check: [
        { q: "The black star on Ghana's flag is a…", options: ["symbol", "texture", "tempo", "weave"], answer: 0 },
        { q: "If viewers misunderstand your artwork you should…", options: ["adjust it", "give up", "hide it", "add more colours only"], answer: 0 },
      ],
    },
    {
      title: "Exhibition roles, monitoring and appraisal",
      emoji: "🏛️",
      explain: [
        "An exhibition needs a team. Curator: selects and arranges works. Publicity team: makes posters, invitations and announcements. Display team: mounts and labels works. Guides: welcome visitors and explain works. Care/security team: keeps works safe and returns them. Recorder/reporter: keeps the visitors' book, counts visitors and writes a report for a journal, notice board or the media.",
        "Preserving artworks: store them flat or in folders, keep them dry and away from direct sunlight and termites.",
        "Appraisal: analyse and interpret how elements, principles and techniques express beauty, meaning and the culture of a people. Suggest how works can better show cultural identity.",
      ],
      diagram: "appraisal-guide",
      remember: ["Roles: curator, publicity, display, guides, security, reporter.", "Preserve works: dry, flat, out of the sun.", "Appraise beauty, meaning and culture."],
      check: [
        { q: "The person who selects and arranges works is the…", options: ["curator", "guide", "printer", "weaver"], answer: 0 },
        { q: "Artworks should be stored…", options: ["dry and away from direct sun", "in water", "in the sun", "on the floor"], answer: 0 },
      ],
    },
  ],
  "2.2.2": [
    {
      title: "Choosing and researching a musical genre",
      emoji: "🎵",
      explain: [
        "Choose an indigenous or popular genre from outside your own community, e.g. Bawa (Upper West), Takai (Northern), Agbadza (Volta), Adowa (Ashanti), Kpanlogo (Greater Accra), Apatampa (Central), Klama (Krobo).",
        "Research its people, history, occasions, instruments, song themes, costumes and dance.",
        "You may also compose new words on a topical issue (pensions, sanitation, road safety) in the style of the genre, to express personal experiences, moods or a storyline.",
      ],
      remember: ["Choose a genre from another community.", "Research history, occasions, instruments, themes.", "You can write new words on topical issues."],
      check: [
        { q: "Takai is a dance of the…", options: ["Dagomba", "Ga", "Fante", "Ewe"], answer: 0 },
        { q: "Klama is associated with the…", options: ["Krobo", "Dagaaba", "Nzema", "Gonja"], answer: 0 },
      ],
    },
    {
      title: "Rehearsal plan and class concert",
      emoji: "🎤",
      explain: [
        "Collaborate to make a rehearsal plan: roles (cantor, chorus, drummers, bell, rattles, dancers, costume, MC), timetable for each part, venue and recording.",
        "Give a class concert that begins with a short presentation on the style, history and cultural context of the selected works. Video-record it.",
        "Perform with energy and accuracy: keep the timeline (bell pattern), sing in tune, start and end together.",
      ],
      remember: ["Plan roles, time and venue.", "Begin the concert with a short presentation.", "Record the concert."],
      check: [
        { q: "The person who introduces items in a concert is the…", options: ["MC", "usher", "curator", "critic"], answer: 0 },
        { q: "In many Ghanaian ensembles the steady guide pattern is played on the…", options: ["bell", "flute", "guitar", "piano"], answer: 0 },
      ],
    },
    {
      title: "Appreciation report and refinement",
      emoji: "🧾",
      explain: [
        "Play back the recorded concert and collect views from classmates (e.g. a short questionnaire).",
        "Write an aesthetic appreciation report: description of the performance, strengths (accuracy, togetherness, tone, dynamics, costume, presentation), weaknesses and recommendations.",
        "Refine your work using the feedback and present your findings to the class.",
      ],
      remember: ["Use the recording to collect data.", "Report strengths, weaknesses, recommendations.", "Refine and present."],
      check: [
        { q: "A form with questions to collect people's views is a…", options: ["questionnaire", "stencil", "loom", "score"], answer: 0 },
        { q: "After the report, you should…", options: ["refine your work", "delete the video", "stop performing", "change the genre always"], answer: 0 },
      ],
    },
  ],
  "2.2.3": [
    {
      title: "Learning from Ghanaian dance and drama artists",
      emoji: "🌟",
      explain: [
        "Martin Owusu is a Ghanaian playwright and drama teacher whose plays include 'The Story Ananse Told' and 'The Mightier Sword'. He uses folk tales and Ghanaian settings to teach values.",
        "Francis Nii-Yartey was a choreographer who led the Ghana Dance Ensemble and the National Dance Company and founded the Noyam African Dance Institute. He blended traditional Ghanaian dance with contemporary styles.",
        "From such artists we learn to use our culture, stories and issues as material for new works.",
      ],
      remember: ["Martin Owusu: playwright.", "Nii-Yartey: choreographer, National Dance Company, Noyam.", "Use culture and issues as material."],
      check: [
        { q: "A person who creates dances is a…", options: ["choreographer", "playwright", "potter", "curator"], answer: 0 },
        { q: "Martin Owusu is known as a…", options: ["playwright", "drummer", "sculptor", "weaver"], answer: 0 },
      ],
    },
    {
      title: "Designing and staging your own production",
      emoji: "🎬",
      explain: [
        "Plan a dance or play that reflects history, culture, environment or heritage, e.g. SSNIT pensions, sanitation, a festival.",
        "Steps: choose the theme; write the plot or movement sequence; cast roles; plan costumes, props, set and music; choose and prepare the venue (space, seating, lighting, safety); publicise; rehearse; perform; record.",
        "Organise an appraisal afterwards, discussing theme, acting, dance, music, costume, space and audience response.",
      ],
      remember: ["Theme → plot → cast → design → venue → rehearse → perform.", "Prepare the venue safely.", "Appraise after the show."],
      check: [
        { q: "Choosing actors for roles is…", options: ["casting", "blocking", "printing", "weaving"], answer: 0 },
        { q: "The scenery on stage is the…", options: ["set", "cast", "plot", "chorus"], answer: 0 },
      ],
    },
  ],
  "2.3.1": [
    {
      title: "Ghanaian visual artists and their disciplines",
      emoji: "👩🏾‍🎨",
      explain: [
        "Visual artists can be grouped by discipline: painting, sculpture, textiles, ceramics, graphic design, photography, jewellery, leatherwork and installation art.",
        "Kofi Antubam (painter/designer) designed Ghana's state chair and other regalia and promoted Ghanaian culture. Vincent Kofi carved large, powerful wooden sculptures. Grace Salome Kwami was one of Ghana's first female sculptors. Amon Kotei designed Ghana's coat of arms. Theodosia Okoh designed the national flag. Ablade Glover paints colourful market and crowd scenes with a palette knife. El Anatsui makes huge 'cloths' from bottle tops. Serge Attukwei Clottey uses yellow gallons to speak about water and waste.",
        "When presenting an artist, include: background, education, philosophy, works, exhibitions, awards and influence (how they are a role model).",
      ],
      remember: ["Group artists by discipline.", "Okoh = flag; Kotei = coat of arms; Antubam = state chair.", "Present background, works and influence."],
      check: [
        { q: "Who designed Ghana's coat of arms?", options: ["Amon Kotei", "Theodosia Okoh", "Ablade Glover", "Vincent Kofi"], answer: 0 },
        { q: "Ablade Glover paints mostly with a…", options: ["palette knife", "spray can only", "sponge", "camera"], answer: 0 },
      ],
    },
    {
      title: "Comparing artists and their design approaches",
      emoji: "⚖️",
      explain: [
        "To compare two artists, look at: subject matter, materials, techniques, style and message.",
        "Design approaches include: recycling waste into art (El Anatsui, Serge Attukwei Clottey); using cultural symbols (Kofi Antubam); recording everyday life (Ablade Glover).",
        "Analyse how their processes solve or comment on societal issues, then reflect on what you can use in your own work.",
      ],
      remember: ["Compare subject, materials, technique, style, message.", "Approaches: recycling, symbolism, documenting life.", "Learn and apply ideas."],
      check: [
        { q: "Turning waste into art is an example of…", options: ["recycling", "printing", "weaving", "shading"], answer: 0 },
        { q: "An artist's own way of working is their…", options: ["style", "tempo", "venue", "loom"], answer: 0 },
      ],
    },
  ],
  "2.3.2": [
    {
      title: "Ephraim Amu and J. H. Kwabena Nketia",
      emoji: "🎼",
      explain: [
        "Ephraim Amu (1899–1995) was born at Peki in the Volta Region. He was a teacher and composer who wrote choral music in Ghanaian languages using African rhythms. His patriotic song 'Yɛn Ara Asase Ni' (This Is Our Own Land) is loved across Ghana. He promoted African dress, the atenteben (bamboo flute) and pride in African culture.",
        "J. H. Kwabena Nketia (1921–2019) was born at Mampong, Ashanti. He was a composer and ethnomusicologist (a scholar who studies music in its culture). He researched and wrote about African music, including the book 'The Music of Africa', and directed the Institute of African Studies at the University of Ghana.",
        "Comparison: both used African musical materials and built African pride. Amu is best known as a choral composer and teacher; Nketia as a researcher and scholar who documented African music worldwide.",
      ],
      remember: ["Amu: Peki, choral music, 'Yɛn Ara Asase Ni', atenteben.", "Nketia: Mampong, ethnomusicologist, 'The Music of Africa'.", "Both promoted African music."],
      check: [
        { q: "'Yɛn Ara Asase Ni' was composed by…", options: ["Ephraim Amu", "J. H. K. Nketia", "E. T. Mensah", "Koo Nimo"], answer: 0 },
        { q: "An ethnomusicologist studies…", options: ["music in its culture", "rocks", "plants", "stars"], answer: 0 },
      ],
    },
    {
      title: "Indigenous and neo-traditional groups across Ghana",
      emoji: "🥁",
      explain: [
        "Indigenous groups play traditional music handed down from the ancestors: Adowa, Kete, Fontomfrom (Akan); Agbadza (Ewe); Klama (Krobo); Bamaya (Dagomba); Bawa (Dagaaba).",
        "Neo-traditional groups use traditional instruments with newer styles and themes: Sikyi, Kpanlogo, Borborbor, Gome, Nnwonkoro.",
        "Compare groups by style, instruments, song themes, dance movements, costumes and occasions. Also transcribe a popular song that educates the public on an issue such as pensions or sanitation.",
      ],
      remember: ["Indigenous = from the ancestors.", "Neo-traditional = traditional + new.", "Compare style, instruments, themes, movements."],
      check: [
        { q: "Kete is an… genre.", options: ["Akan indigenous", "American pop", "European classical", "neo-traditional Ewe"], answer: 0 },
        { q: "Sikyi is an example of…", options: ["neo-traditional music", "a weave", "a print", "a colour"], answer: 0 },
      ],
    },
  ],
  "2.3.3": [
    {
      title: "Ghanaian plays and dance pieces to study",
      emoji: "📚",
      explain: [
        "Efua Sutherland wrote 'The Marriage of Anansewa' and 'Edufa' and founded the Ghana Drama Studio. Ama Ata Aidoo wrote 'The Dilemma of a Ghost' and 'Anowa'. Joe de Graft wrote 'Sons and Daughters'.",
        "The National Dance Company (Ghana Dance Ensemble) performs dances from all regions at national events.",
        "These works show family life, tradition and change, gender roles, and cultural identity.",
      ],
      remember: ["Sutherland: Anansewa, Edufa.", "Aidoo: Anowa, Dilemma of a Ghost.", "De Graft: Sons and Daughters."],
      check: [
        { q: "'Anowa' was written by…", options: ["Ama Ata Aidoo", "Efua Sutherland", "Joe de Graft", "Martin Owusu"], answer: 0 },
        { q: "'Sons and Daughters' was written by…", options: ["Joe de Graft", "Ama Ata Aidoo", "Ola Rotimi", "Wole Soyinka"], answer: 0 },
      ],
    },
    {
      title: "Analysing and discussing performances",
      emoji: "🗣️",
      explain: [
        "Compare a dance piece and a play: theme and message; history and culture shown; environmental or topical issues; techniques (dialogue, characterisation, movement, music, costume, props, space); audience effect.",
        "Group discussion guide: sit in a circle; one person summarises; each member shares one strength, one weakness and one idea to borrow; a recorder writes key points.",
        "Generate ideas for your own work from performances of other cultures.",
      ],
      remember: ["Compare theme, culture, issues, techniques, audience effect.", "Discuss with roles: summariser, members, recorder.", "Borrow good ideas."],
      check: [
        { q: "How an actor creates a character is…", options: ["characterisation", "choreography", "lighting", "casting"], answer: 0 },
        { q: "The person who writes notes in a discussion is the…", options: ["recorder", "drummer", "dancer", "curator"], answer: 0 },
      ],
    },
  ],
};
