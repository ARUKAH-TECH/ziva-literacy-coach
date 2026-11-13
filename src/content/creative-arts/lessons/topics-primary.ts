import type { Topic } from "../types";
import { FOCUS, type Focus } from "./primary";

// Primary (B1–B6): detailed lessons for each content standard, built from the
// class focus (local community, Ghana, Africa, Ghanaian artists, African
// artists, the world). Lower primary (B1–B3) uses shorter, simpler sentences.

const join = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}` : xs[0] ?? "");

function va(f: Focus): Record<string, Topic[]> {
  const y = f.young;
  const artworks = f.visual.map(([a, b]): [string, string] => [a, `This is ${b}. ${y ? "Look at how it is made and what it is used for." : "Notice the materials, the method used to make it, and what it tells us about the people."}`]);
  const artists = f.visualArtists?.map(([a, b]): [string, string] => [a, b]) ?? [];
  return {
    "1.1.1": [
      {
        title: "What are visual arts?",
        emoji: "🖼️",
        explain: y
          ? [
              "Visual arts are things people make for us to see, touch and use.",
              "Drawing is making pictures with a pencil or crayon. Painting is making pictures with paint and a brush.",
              "Pottery is making pots and bowls from clay. Weaving is making baskets, mats and cloth by putting strips over and under each other.",
              "Carving is cutting wood or stone into shapes, like stools and drums. Bead making is making beads for necklaces and bracelets.",
              "Visual arts make our homes beautiful, help us do our work, and tell stories about our people.",
            ]
          : [
              "Visual arts are artworks that we see and touch. They are made with materials such as paper, paint, clay, wood, metal, fibre and beads.",
              "The main branches are: drawing and painting (pictures on flat surfaces); sculpture (carving, modelling and casting 3-D forms); ceramics/pottery (objects from clay that is fired); textiles (weaving, printing and dyeing cloth such as kente and adinkra); basketry; jewellery and bead making; leatherwork; graphic design (posters, logos, books and adverts); and architecture (buildings).",
              "Visual arts have many uses: they are functional (pots, baskets, clothes, chairs), decorative (wall paintings, beads), educational (posters, book pictures), religious and ceremonial (stools, regalia, masks) and historical (they record events and people).",
            ],
        examples: y ? [["Drawing", "A picture of your house drawn with crayons."], ["Pottery", "A clay water pot."], ["Weaving", "A basket for carrying foodstuff."]] : [["Functional", "A Bolga basket for carrying goods."], ["Ceremonial", "A carved stool for a chief."], ["Educational", "A poster about handwashing."]],
        remember: y ? ["Visual arts are things we see and touch.", "Drawing, painting, pottery, weaving, carving and beads are visual arts.", "They are beautiful and useful."] : ["Branches: drawing, painting, sculpture, pottery, textiles, basketry, jewellery, leatherwork, graphic design, architecture.", "Uses: functional, decorative, educational, ceremonial, historical.", "Materials: paper, paint, clay, wood, metal, fibre, beads."],
        check: [
          { q: "Making pots from clay is…", options: ["pottery", "weaving", "singing", "drama"], answer: 0 },
          { q: "Which is a visual art?", options: ["A woven basket", "A song", "A dance", "A story"], answer: 0 },
        ],
      },
      {
        title: f.visualArtists ? `Artists and artworks of ${f.place}` : `Artworks of ${f.place}`,
        emoji: "🧺",
        explain: [
          y ? `Let us look at some artworks we can find in ${f.place}.` : `Here are important artworks${f.visualArtists ? " and artists" : ""} of ${f.place}. Study each one: what it is, how it is made and what it means.`,
          y ? "Ask your parents, teachers and elders about them. Look at pictures in books or on a phone." : "Use books, the internet, museums, galleries and visits to artists' workshops to find out more. Write short notes and make sketches.",
        ],
        examples: [...artworks, ...artists],
        remember: [`${f.place[0].toUpperCase()}${f.place.slice(1)} has many artworks.`, "Each artwork has a material, a method and a meaning.", y ? "Ask elders and look at pictures to learn more." : "Research artists: their works, materials, style and message."],
        check: [...f.vaQuiz],
      },
      {
        title: "What artworks tell us",
        emoji: "📜",
        explain: y
          ? [
              "Artworks can tell us about the history and culture of people: how they live, what they wear and what they believe.",
              `Artworks can show the natural environment, like ${join(f.natural.slice(0, 3))}, and the manmade environment, like ${join(f.manmade.slice(0, 3))}.`,
              `Artworks can also teach us about problems today, like ${join(f.issues.slice(0, 2))}.`,
            ]
          : [
              `History and culture: artworks record ${f.history}. A carved stool, a kente pattern or a portrait can carry the story of a people.`,
              `Natural and manmade environment: artists paint and model ${join(f.natural)} and ${join(f.manmade)}. This helps us value and protect them.`,
              `Topical issues: artworks such as posters, paintings and installations can draw attention to ${join(f.issues)}, and encourage people to act.`,
            ],
        steps: { title: y ? "Art walk" : "Research task", items: y ? ["Walk around with a grown-up.", "Find two artworks.", "Draw them.", "Say what each one shows."] : ["Choose one artwork or artist.", "Find out when and where it was made.", "Write what it shows: history, culture, environment or an issue.", "Sketch it and share your findings."] },
        remember: ["Artworks show history and culture.", "Artworks show natural and manmade environments.", "Artworks can teach about problems today."],
        check: [
          { q: "Rivers and hills are part of the…", options: ["natural environment", "manmade environment", "music", "drama"], answer: 0 },
          { q: "A poster about keeping the town clean teaches about a…", options: ["topical issue", "colour", "song", "festival only"], answer: 0 },
        ],
      },
    ],
    "1.2.2": [
      {
        title: "Tools and materials",
        emoji: "🧰",
        explain: y
          ? [
              "A tool helps us make art. A brush, a pencil and scissors are tools.",
              "A material is what we make the art from. Paper, paint, clay, leaves and glue are materials.",
              "For drawing we use pencils, crayons and paper. For painting we use brushes, poster colours and water. For modelling we use clay or play dough. For collage we use old paper, leaves, seeds and glue.",
              "We must use tools safely and keep them clean.",
            ]
          : [
              "Tools are instruments used to make artworks; materials (media) are the substances artworks are made from.",
              "Drawing and painting: pencils (H and B grades), charcoal, pastels, crayons, poster colours, brushes (flat and round), palette, water pot, paper and board.",
              "Printing: printing blocks (cassava, potato, wood, calabash stamps), stencils, ink or paint, roller, sponge. Modelling and sculpture: clay, paper pulp, plaster, wood, wire; modelling tools, cutters, sandpaper.",
              "Collage and mosaic: paper, fabric, seeds, shells, bottle tops, glue. Weaving and textiles: yarn, raffia, cane, strips of cloth; a simple loom; dyes. Digital: drawing apps and cameras.",
              "Look after tools: clean brushes and blocks after use, cover glue, keep blades safe, and store tools properly.",
            ],
        remember: y ? ["Tools help us make art.", "Materials are what art is made from.", "Use tools safely and keep them clean."] : ["Tools = instruments; materials = substances (media).", "Each art form has its own tools and materials.", "Clean and store tools after use."],
        check: [
          { q: "A brush is a…", options: ["tool", "material", "song", "colour"], answer: 0 },
          { q: "Clay is a…", options: ["material", "tool", "method", "dance"], answer: 0 },
        ],
      },
      {
        title: "Colours and mixing",
        emoji: "🎨",
        explain: y
          ? ["Red, yellow and blue are primary colours.", "When we mix two of them we get new colours: red + yellow = orange; yellow + blue = green; blue + red = purple (violet).", "Mix colours on a plate or palette with a clean brush."]
          : [
              "Primary colours: red, yellow and blue. Secondary colours: orange (red + yellow), green (yellow + blue) and violet (blue + red).",
              "A tint is a colour mixed with white (lighter). A shade is a colour mixed with black (darker).",
              "Warm colours (red, orange, yellow) look hot and lively. Cool colours (blue, green, violet) look calm. Complementary colours sit opposite each other on the colour wheel (red–green) and look strong together.",
            ],
        diagram: "colour-wheel",
        remember: ["Primary: red, yellow, blue.", "Secondary: orange, green, violet.", y ? "Mix two primary colours to get a new colour." : "Tint = + white; shade = + black."],
        check: [
          { q: "Yellow + blue makes…", options: ["green", "orange", "violet", "black"], answer: 0 },
          { q: "Which is a primary colour?", options: ["Red", "Green", "Orange", "Purple"], answer: 0 },
        ],
      },
      {
        title: "Trying out and choosing (planning your artwork)",
        emoji: "🧪",
        explain: y
          ? ["Before we make an artwork, we try different materials to see what works best. This is called experimenting.", "Try crayon, paint and collage on small pieces of paper.", "Then choose the one you like best for your artwork and say why.", "Make a small drawing (sketch) of what you will make."]
          : [
              `Planning starts with an idea: an artwork about the history and culture, the environment or a topical issue of ${f.place}.`,
              "Experiment: try two or three tools, materials and methods on small test pieces (e.g. crayon vs paint; collage vs printing). Notice which gives the effect you want.",
              "Decide: choose the best tools, materials and method and give reasons (easy to find, cheap, suits the idea, looks good).",
              "Sketch your plan and list what you need before you start.",
            ],
        steps: { title: "Material test card", items: ["Fold a sheet into 6 boxes.", "Try a different material or method in each box.", "Write what you liked under each box.", "Choose the best one for your artwork.", "Make a small plan sketch."] },
        remember: ["Experiment before you start.", "Choose the best materials and say why.", "Make a sketch plan."],
        check: [
          { q: "Trying things to see how they work is to…", options: ["experiment", "sleep", "copy", "erase"], answer: 0 },
          { q: "A quick drawing of your plan is a…", options: ["sketch", "song", "label", "loom"], answer: 0 },
        ],
      },
    ],
    "1.2.3": [
      {
        title: "Making a picture: drawing and painting",
        emoji: "🖍️",
        explain: y
          ? ["Think of what you want to show.", "Draw it lightly with a pencil first. Use big shapes like circles and squares.", "Add small details like eyes, windows or leaves.", "Colour or paint it neatly, staying inside the lines.", "Give your picture a title and write your name."]
          : [
              "Choose a subject that expresses your idea (e.g. a festival scene, a landscape, a market).",
              "Composition: plan where things go: the main subject large and near the centre, background things smaller.",
              "Draw lightly, starting with big shapes; add details; then paint. Paint large areas first, then small details. Mix colours on a palette; use tints and shades for light and shadow.",
              "Finish neatly: clean edges, a title, your name and the date.",
            ],
        remember: ["Plan your idea first.", "Draw lightly, then colour or paint.", "Add a title and your name."],
        check: [
          { q: "Before painting, we should…", options: ["draw lightly", "throw the paper", "close our eyes", "wash the picture"], answer: 0 },
          { q: "The name of an artwork is its…", options: ["title", "price", "colour", "size"], answer: 0 },
        ],
      },
      {
        title: "Modelling with clay: a pinch pot",
        emoji: "🏺",
        explain: y
          ? ["Clay is soft earth we can shape with our hands.", "To make a pinch pot, roll a ball of clay.", "Push your thumb into the middle.", "Pinch and turn the clay to make the walls thin and even.", "Smooth it with a little water and let it dry."]
          : [
              "Modelling means shaping a soft material such as clay or paper pulp into a 3-D form.",
              "Methods: pinching (pressing with thumb and fingers), coiling (building with long rolls of clay), slab (joining flat sheets) and modelling solid forms.",
              "Joining clay: score (scratch) both surfaces, add slip (clay mixed with water), press together and smooth.",
              "Let clay dry slowly away from direct sun to avoid cracks.",
            ],
        steps: { title: "Make a pinch pot", items: ["Roll a ball of clay the size of an orange.", "Press your thumb into the centre.", "Pinch the walls gently while turning the ball.", "Keep the walls the same thickness.", "Flatten the bottom so it stands.", "Decorate with lines or dots and let it dry slowly."] },
        remember: ["Clay can be pinched, coiled or made into slabs.", "Score and slip to join clay.", "Dry clay slowly."],
        check: [
          { q: "Building a pot with long rolls of clay is…", options: ["coiling", "printing", "weaving", "drawing"], answer: 0 },
          { q: "To join two clay pieces we score and add…", options: ["slip", "paint", "sand", "oil"], answer: 0 },
        ],
      },
      {
        title: y ? "Collage and printing" : "Making an artwork about an issue",
        emoji: y ? "✂️" : "📢",
        explain: y
          ? ["A collage is a picture made by sticking pieces of paper, cloth, leaves or seeds on paper.", "Printing is pressing a painted object, like a leaf or a cut cassava, on paper to make a mark. Do it again and again to make a pattern.", "Use these to make pictures of things you love."]
          : [
              `Choose a topical issue such as ${join(f.issues.slice(0, 3))}.`,
              "Decide your message in one short sentence (a slogan).",
              "Choose an art form: poster, painting, collage, print or model. Use strong colours and clear pictures so people understand quickly.",
              "Show your work to a friend: what message do they see? Improve it if needed. Functional artworks such as bags, mats or pots can also carry messages and designs.",
            ],
        steps: y ? { title: "Leaf print pattern", items: ["Paint the back of a leaf.", "Press it on paper.", "Lift it carefully.", "Repeat to make a pattern.", "Let it dry."] } : { title: "Message poster", items: ["Write your slogan.", "Sketch a picture that shows the message.", "Draw it big on card.", "Colour with strong colours.", "Ask a friend what it means, then improve it."] },
        remember: y ? ["Collage = sticking pieces.", "Printing = pressing to make a mark.", "Repeat prints make a pattern."] : ["Choose an issue and a clear message.", "Use strong colours and pictures.", "Test your message on others."],
        check: y
          ? [
              { q: "A picture made by sticking pieces is a…", options: ["collage", "song", "dance", "pot"], answer: 0 },
              { q: "Pressing a painted leaf on paper is…", options: ["printing", "weaving", "singing", "carving"], answer: 0 },
            ]
          : [
              { q: "A short catchy message on a poster is a…", options: ["slogan", "loom", "palette", "stave"], answer: 0 },
              { q: "Posters should use colours that are…", options: ["strong and clear", "invisible", "all grey", "random"], answer: 0 },
            ],
      },
    ],
    "1.3.4": [
      {
        title: "What is a display or exhibition?",
        emoji: "🏛️",
        explain: y
          ? ["A display is when we put our artworks where other people can see them.", "We do it to share our work, to make our class beautiful, and so that people can tell us what they like."]
          : ["A display or exhibition is an organised showing of artworks to an audience.", "Exhibitions share ideas, celebrate learners' work, educate the community, and allow feedback. Artworks can be shown in a classroom, school hall, community centre, church, library or online."],
        remember: ["A display shares our artworks with people.", "It celebrates and teaches.", "People can give us feedback."],
        check: [
          { q: "Showing artworks to people is a…", options: ["display", "secret", "song", "game"], answer: 0 },
          { q: "One reason for an exhibition is to…", options: ["share ideas", "hide art", "break art", "sell only"], answer: 0 },
        ],
      },
      {
        title: "Planning the display step by step",
        emoji: "🗓️",
        explain: [
          y ? "Choose a name for your display, like 'Our Beautiful Town'." : "Theme and title: choose a theme that links the works (e.g. 'Our Environment').",
          y ? "Choose a place, like the classroom wall. Clean it." : "Venue: identify and prepare a venue: clean it, check space, light and safety; get permission.",
          y ? "Choose your best works and put them in groups." : "Selection and grouping: choose the best works from your portfolio and group them by type or by theme.",
          y ? "Write a small card for each work with its name and your name." : "Labels: title, artist, class, materials, date.",
          y ? "Invite your parents and teachers to come and see." : "Audience: invite parents, teachers, other classes and community members with invitation cards or announcements.",
        ],
        diagram: "display-plan",
        remember: ["Theme → venue → select and group → labels → invite.", "Prepare and clean the venue.", "Invite an audience."],
        check: [
          { q: "The place where a display is held is the…", options: ["venue", "label", "title", "brush"], answer: 0 },
          { q: "A card with the artwork's name and artist is a…", options: ["label", "drum", "ticket", "pot"], answer: 0 },
        ],
      },
    ],
    "1.3.5": [
      {
        title: "Putting up the display",
        emoji: "📌",
        explain: y
          ? ["Put the artworks at eye level so everyone can see them.", "Keep them straight and neat.", "Put the label next to each one."]
          : ["Mounting: fix works neatly on boards, walls or strings at eye level (about 1.5 m from the floor for adults; lower for children).", "Leave space between works; group them; keep frames and edges straight; place labels next to each work.", "3-D works (pots, baskets, sculptures) go on tables or stands."],
        remember: ["Eye level.", "Neat, straight and spaced.", "Labels next to works."],
        check: [
          { q: "Artworks should be put at…", options: ["eye level", "the ceiling", "the floor", "outside the window"], answer: 0 },
          { q: "Pots and baskets are best displayed on…", options: ["tables or stands", "the ceiling", "in a bag", "under chairs"], answer: 0 },
        ],
      },
      {
        title: "Sharing, recording and reporting",
        emoji: "🗣️",
        explain: y
          ? ["Stand by your work and tell visitors about it: what it shows and how you made it.", "Visitors can write or say what they like.", "Take photos (ask permission) or draw the display to remember it."]
          : [
              "Share: explain your work to visitors: subject, materials, method and message. Answer questions politely.",
              "Record: use a visitors' book; take photographs or videos with permission; make notes or drawings.",
              "Report: write a short report: date, venue, works shown, visitors, comments received, what went well and what to improve.",
            ],
        remember: ["Explain your work politely.", "Record with a visitors' book and photos.", "Write a short report."],
        check: [
          { q: "Visitors write their comments in a…", options: ["visitors' book", "paint pot", "drum", "basket"], answer: 0 },
          { q: "A written account of what happened is a…", options: ["report", "sketch", "label", "song"], answer: 0 },
        ],
      },
    ],
    "1.4.6": [
      {
        title: y ? "How to look at artworks" : "Guidelines for appreciating artworks",
        emoji: "🔍",
        explain: y
          ? ["Look carefully before you talk.", "Say what you see: colours, shapes and things.", "Say how it makes you feel.", "Say one thing you like.", "Always be kind. Do not laugh at anyone's work."]
          : [
              "Appreciation means looking at an artwork carefully to understand and enjoy it. Appraisal means judging its quality and value. To do this fairly, we agree on guidelines.",
              "Guidelines include: the theme and subject matter (what it is about); media and techniques (materials and methods used); elements of design (line, shape, colour, texture) and principles (balance, rhythm, unity, contrast); and values: social (does it teach?), aesthetic (is it beautiful?), cultural (does it show our way of life?) and functional (is it useful?).",
              "Rules for viewing: look quietly, don't touch unless allowed, respect the artist, give reasons for your opinions.",
            ],
        remember: y ? ["Look carefully.", "Say what you see and feel.", "Be kind."] : ["Appreciate = understand and enjoy; appraise = judge.", "Theme, media, techniques, elements, principles, values.", "Respect the artist and give reasons."],
        check: [
          { q: "To judge how good an artwork is, is to…", options: ["appraise", "erase", "paint", "fold"], answer: 0 },
          { q: "When looking at someone's artwork we should be…", options: ["kind", "rude", "noisy", "careless"], answer: 0 },
        ],
      },
      {
        title: "Four steps: describe, analyse, interpret, judge",
        emoji: "🪜",
        explain: [
          y ? "Describe: say what you see." : "Describe: name the subject, colours, shapes, materials and size.",
          y ? "Analyse: say how it was made." : "Analyse: explain how the elements and principles are used (e.g. bright colours repeated create unity).",
          y ? "Interpret: say what it means." : "Interpret: explain the meaning, feeling or message, and what it says about culture.",
          y ? "Judge: say if it is good and why." : "Judge: decide on its beauty and usefulness and give reasons.",
        ],
        diagram: "appraisal-guide",
        remember: ["Describe → Analyse → Interpret → Judge.", "Give reasons.", "Use art words."],
        check: [
          { q: "The first step is to…", options: ["describe", "judge", "frame", "sell"], answer: 0 },
          { q: "Saying what an artwork means is to…", options: ["interpret", "describe", "mount", "label"], answer: 0 },
        ],
      },
    ],
    "1.4.7": [
      {
        title: "Deciding the beauty and usefulness of artworks",
        emoji: "✅",
        explain: y
          ? ["Is it beautiful? Look at the colours, the neatness and the shapes.", "Is it useful? Can we use it, like a pot or a mat? Does it teach us something, like a poster?", "Is the idea clear?"]
          : ["Make informed decisions using the agreed guidelines: beauty (aesthetic value: colour, finishing, composition); usefulness (functional value); message (social value); culture (cultural value); originality and effort.", "Compare works fairly and explain your decisions with reasons and examples."],
        remember: ["Beauty, usefulness, message, culture, originality.", "Use the agreed guidelines.", "Give reasons."],
        check: [
          { q: "A mat or a pot is valued for being…", options: ["useful", "noisy", "invisible", "wet"], answer: 0 },
          { q: "How beautiful an artwork is is its…", options: ["aesthetic value", "price", "weight", "age"], answer: 0 },
        ],
      },
      {
        title: "Giving and using feedback",
        emoji: "💬",
        explain: [
          "Feedback is comments that help someone improve. Use 'two stars and a wish': two things that are good and one thing that could be better.",
          y ? "Example: 'Your colours are bright. Your lines are neat. I wish the house was bigger.'" : "Example: 'The colours are well chosen and the message is clear. I wish the lettering were bigger so it can be read from far away.'",
          y ? "When you get feedback, listen, say thank you, and try to make your work better." : "When you receive feedback, listen without arguing, decide which suggestions help, and use them to modify your work or plan future works. Write a short report of the decisions made.",
        ],
        remember: ["Two stars and a wish.", "Be specific and kind.", "Use feedback to improve."],
        check: [
          { q: "'Two stars and a wish' means…", options: ["two good things and one to improve", "two mistakes", "two drawings", "two songs"], answer: 0 },
          { q: "When you get feedback you should…", options: ["listen and improve", "get angry", "tear your work", "stop art"], answer: 0 },
        ],
      },
    ],
  };
}

function pa(f: Focus): Record<string, Topic[]> {
  const y = f.young;
  const perf = f.performing.map(([a, b]): [string, string] => [a, `This is ${b}. ${y ? "Listen or watch, and say what it is about." : "Note the occasion, the performers, the instruments and the message."}`]);
  const performers = f.performers?.map(([a, b]): [string, string] => [a, b]) ?? [];
  return {
    "2.1.1": [
      {
        title: "What are performing arts?",
        emoji: "🎭",
        explain: y
          ? ["Performing arts are arts we do for people to watch and listen to.", "Music is singing and playing instruments. Dance is moving our bodies to music. Drama is acting out a story. Storytelling is telling stories, like Ananse stories.", "We perform at school, church, festivals, parties and funerals."]
          : [
              "Performing arts are arts presented live by performers to an audience. The main forms are music (vocal and instrumental), dance, drama (acting) and storytelling/poetry recital.",
              "In Ghana, performing arts are part of daily life: work songs, lullabies, festival drumming and dancing, funeral dirges, church and school music, concert parties and anansesem.",
              "Performing arts entertain, educate, preserve history and language, express feelings, bring people together and can be a profession.",
            ],
        remember: ["Music, dance, drama and storytelling are performing arts.", "They are performed for an audience.", "They entertain, teach and bring people together."],
        check: [
          { q: "Acting out a story is…", options: ["drama", "pottery", "weaving", "painting"], answer: 0 },
          { q: "Which is a performing art?", options: ["Dance", "Basketry", "Beadwork", "Carving"], answer: 0 },
        ],
      },
      {
        title: f.performers ? "Performers and performances to know" : `Music, dance and drama of ${f.place}`,
        emoji: "🥁",
        explain: [
          y ? `Here are some performances of ${f.place}.` : `Study these performing artworks${f.performers ? " and artists" : ""} of ${f.place}.`,
          y ? "Ask elders to sing or tell you about them. Listen to the radio or watch videos with a grown-up." : "Listen to recordings, watch videos, attend festivals and interview performers to learn more.",
        ],
        examples: [...perf, ...performers],
        remember: ["Each performance has an occasion and a message.", "Listen and watch carefully.", "Ask performers and elders questions."],
        check: [...f.paQuiz],
      },
      {
        title: "What performances tell us",
        emoji: "🧭",
        explain: y
          ? ["Songs and dances can tell us about our history and culture.", `Some songs are about ${join(f.natural.slice(0, 2))}, farming and fishing.`, `Some songs and plays teach us about ${join(f.issues.slice(0, 2))}.`]
          : [
              `History and culture: songs, dances and plays carry ${f.history}.`,
              `Environment: work songs and dances copy farming, fishing and hunting; songs praise or warn about ${join(f.natural.slice(0, 3))}.`,
              `Topical issues: performers create songs and plays about ${join(f.issues)}, to educate and change behaviour.`,
            ],
        remember: ["Performances carry history and culture.", "They show work and the environment.", "They teach about problems today."],
        check: [
          { q: "A song that teaches people to keep their town clean is about a…", options: ["topical issue", "colour", "loom", "pot"], answer: 0 },
          { q: "Dances that copy farming show the…", options: ["environment and work", "weather only", "colours", "prices"], answer: 0 },
        ],
      },
    ],
    "2.2.2": [
      {
        title: "Musical instruments of Ghana",
        emoji: "🪘",
        explain: y
          ? ["Drums: we hit them. Examples: atumpan, kpanlogo drum, donno (talking drum).", "Bells and rattles: we hit or shake them. Examples: dawuro / gankogui (bell), axatse / shekere (rattle), firikyiwa (castanet).", "Flutes: we blow them. Example: atenteben (bamboo flute).", "String instruments: we pluck them. Examples: seperewa, guitar."]
          : [
              "Instruments are grouped by how they make sound. Membranophones have a stretched skin that is struck: atumpan, fontomfrom, kpanlogo drum, donno (hourglass talking drum), brekete.",
              "Idiophones sound by themselves when struck, shaken or scraped: dawuro and gankogui (bells), axatse and shekere (rattles), firikyiwa (castanet), gyil (xylophone).",
              "Aerophones sound when air is blown: atenteben (bamboo flute), odurugya, horns (ntahera), whistles. Chordophones have strings: seperewa (harp-lute), kora, guitar, goje (fiddle).",
              "Many Ghanaian ensembles are led by a bell pattern (timeline) that keeps everyone together, with supporting drums and a master drum.",
            ],
        remember: y ? ["Hit a drum.", "Shake a rattle.", "Blow a flute; pluck a string."] : ["Membranophones (skins), idiophones (self-sounding), aerophones (blown), chordophones (strings).", "Bell timeline keeps the ensemble together.", "Master drum leads."],
        check: [
          { q: "The atenteben is played by…", options: ["blowing", "hitting", "shaking", "plucking"], answer: 0 },
          { q: "A shekere is played by…", options: ["shaking", "blowing", "plucking", "bowing"], answer: 0 },
        ],
      },
      {
        title: "Voice, rhythm and expression",
        emoji: "🎶",
        explain: y
          ? ["Our voice is an instrument. We can sing high and low, loud and soft.", "Rhythm is a pattern of long and short sounds. Clap the rhythm of your name: 'A-ma', 'Kwa-ku'.", "We can play fast or slow. Call and response: a leader sings and the group answers."]
          : [
              "Pitch: high or low. Dynamics: loud (forte) or soft (piano). Tempo: fast or slow. Rhythm: the pattern of long and short sounds. Beat: the steady pulse.",
              "Call and response is common in African music: a cantor sings a line and the chorus answers.",
              "Experiment with these to create different moods: soft and slow for lullabies or sorrow; loud and fast for celebration.",
            ],
        remember: ["High/low, loud/soft, fast/slow.", "Rhythm = pattern of sounds; beat = steady pulse.", "Call and response."],
        check: [
          { q: "A leader sings and the group answers. This is…", options: ["call and response", "silence", "weaving", "drawing"], answer: 0 },
          { q: "A pattern of long and short sounds is…", options: ["rhythm", "colour", "texture", "shape"], answer: 0 },
        ],
      },
      {
        title: "Movement and drama tools",
        emoji: "🕺",
        explain: y
          ? ["In dance we can move high or low, big or small, fast or slow.", "In drama we use our face, voice and body to show feelings.", "Costumes are clothes for a show. Props are things we hold, like a hoe or a pot."]
          : [
              "Dance: levels (high, middle, low), size (big, small), direction (forward, backward, sideways), formation (circle, lines, pairs) and quality (smooth, sharp).",
              "Drama: voice (volume, pitch, pace), facial expression, gesture, posture, costume, props and set.",
              "Experiment, then decide which instruments, movements and resources best express your idea.",
            ],
        remember: ["Dance: levels, size, direction, formation.", "Drama: voice, face, gesture, posture.", "Costumes and props help tell the story."],
        check: [
          { q: "Objects used in a play are…", options: ["props", "costumes", "drums only", "labels"], answer: 0 },
          { q: "Clothes worn for a performance are…", options: ["costumes", "props", "sets", "notes"], answer: 0 },
        ],
      },
    ],
    "2.2.3": [
      {
        title: "Making a song",
        emoji: "🎤",
        explain: y
          ? ["Choose what your song is about.", "Make up 2 or 4 short lines.", "Sing the lines with a tune.", "Clap the beat and add a drum or shaker.", "Sing it again and again until you know it well."]
          : [
              `Choose a theme, e.g. a festival, ${f.natural[0]}, or ${f.issues[0]}.`,
              "Write lyrics: a short chorus with the main message and one or two verses.",
              "Create a melody: sing the words to a simple tune using doh, ray, me, soh, lah.",
              "Add rhythm and instruments: bell, drum, rattle, clapping. Use call and response.",
              "Rehearse and improve.",
            ],
        remember: ["Theme → lyrics → tune → rhythm → rehearse.", "A chorus repeats the main message.", "Add instruments and clapping."],
        check: [
          { q: "The words of a song are its…", options: ["lyrics", "props", "labels", "colours"], answer: 0 },
          { q: "To make up new music is to…", options: ["compose", "erase", "carve", "fold"], answer: 0 },
        ],
      },
      {
        title: "Making a dance",
        emoji: "💃",
        explain: y
          ? ["Listen to the music.", "Make 4 moves, like clap, turn, stamp and wave.", "Put them in order and repeat them.", "Dance with friends in a circle or a line."]
          : [
              "Choose music and decide the mood or story.",
              "Create 4–8 movements (motifs) that show the idea, e.g. sowing seeds, paddling a canoe, pounding fufu.",
              "Arrange them in a sequence and repeat to make a pattern. Plan the formation, entrance and exit.",
              "Practise in time with the music.",
            ],
        remember: ["Music and mood first.", "Create and repeat movements.", "Plan formation, entrance and exit."],
        check: [
          { q: "How dancers stand together, e.g. in a circle, is the…", options: ["formation", "title", "label", "lyric"], answer: 0 },
          { q: "Repeating movements makes a dance…", options: ["easy to follow", "silent", "invisible", "shorter only"], answer: 0 },
        ],
      },
      {
        title: "Making a short play",
        emoji: "🎬",
        explain: y
          ? ["Choose a story, like an Ananse story.", "Choose who will be each character.", "Plan the beginning, the middle and the end.", "Practise what each person will say and do.", "Act it for your class."]
          : [
              `Choose a story or issue (e.g. ${f.issues[0]}).`,
              "Characters: decide who is in the play and what each wants.",
              "Plot: beginning (introduce characters), middle (the problem), end (solution).",
              "Dialogue: write or agree on what characters say. Add costumes, props and a song if you like.",
              "Rehearse and improve.",
            ],
        remember: ["Characters, beginning–middle–end.", "Dialogue = what characters say.", "Rehearse many times."],
        check: [
          { q: "A person or animal in a play is a…", options: ["character", "costume", "prop", "stage"], answer: 0 },
          { q: "The problem in a story usually comes in the…", options: ["middle", "title", "label", "costume"], answer: 0 },
        ],
      },
    ],
    "2.3.4": [
      {
        title: "Planning a performance",
        emoji: "📅",
        explain: [
          y ? "Choose a place to perform, like the classroom or the school compound." : "Venue: choose and prepare a place: classroom, assembly ground, hall, church or community centre. Clean it, arrange seats and mark the performing area.",
          y ? "Choose the order of songs, dances and plays (programme)." : "Programme: list items in a good order (opening song, dance, drama, closing) and estimate time for each.",
          y ? "Choose who will introduce each item (MC) and who will help visitors sit (ushers)." : "Roles: performers, MC (master of ceremonies), ushers, costume and props team, sound team, recorder.",
          y ? "Invite parents and teachers." : "Audience and publicity: invitation cards, posters and announcements.",
          y ? "Practise many times." : "Rehearsals: plan dates for practice and a final full rehearsal.",
        ],
        diagram: "display-plan",
        remember: ["Venue, programme, roles, audience, rehearsals.", "The MC introduces items.", "Ushers help the audience."],
        check: [
          { q: "The order of items in a show is the…", options: ["programme", "costume", "rhythm", "venue"], answer: 0 },
          { q: "The person who introduces each item is the…", options: ["MC", "usher", "drummer", "audience"], answer: 0 },
        ],
      },
    ],
    "2.3.5": [
      {
        title: "Performing well",
        emoji: "🌟",
        explain: y
          ? ["Warm up your body and voice.", "Face the people watching.", "Sing and speak clearly and loudly.", "Smile and show the feelings of your song or character.", "If you make a mistake, keep going!"]
          : ["Warm up body and voice before performing.", "Stage presence: face the audience, stand tall, project your voice, show the feelings of the piece.", "Teamwork: start and end together, follow the leader or bell, support each other.", "Handle mistakes calmly and continue. Bow at the end to thank the audience."],
        remember: ["Warm up.", "Face the audience and be clear.", "Keep going after mistakes."],
        check: [
          { q: "Before performing we should…", options: ["warm up", "go home", "sleep", "eat a lot"], answer: 0 },
          { q: "If you make a mistake while performing, you should…", options: ["keep going", "run away", "cry and stop", "shout"], answer: 0 },
        ],
      },
      {
        title: "Recording and reporting the performance",
        emoji: "📹",
        explain: y
          ? ["Ask a teacher to take photos or a video.", "Draw a picture of the show.", "Say what you enjoyed most."]
          : ["Record the performance with photos, audio or video (with permission), notes and the audience's comments.", "Write a short report: date and venue, items performed, audience response, strengths, weaknesses and recommendations."],
        remember: ["Record with permission.", "Collect audience comments.", "Write a short report."],
        check: [
          { q: "Before taking someone's photo we should…", options: ["ask permission", "hide", "shout", "run"], answer: 0 },
          { q: "A written account of the show is a…", options: ["report", "costume", "beat", "prop"], answer: 0 },
        ],
      },
    ],
    "2.4.6": [
      {
        title: "Being a good audience",
        emoji: "👀",
        explain: y
          ? ["Sit quietly and watch.", "Do not talk or play with your phone during the show.", "Clap at the end.", "Say kind things about the performance."]
          : ["A good audience listens and watches attentively, stays quiet during the performance, switches off or silences phones, claps at the right time, and responds respectfully.", "We agree on guidelines for viewing and for expressing feelings about our own and others' performances."],
        remember: ["Watch and listen quietly.", "Clap at the end.", "Respond kindly."],
        check: [
          { q: "A good audience watches…", options: ["quietly", "while shouting", "with backs turned", "while sleeping"], answer: 0 },
          { q: "At the end of a performance we usually…", options: ["clap", "leave quickly", "boo", "sleep"], answer: 0 },
        ],
      },
      {
        title: "What to look for in music, dance and drama",
        emoji: "🔎",
        explain: y
          ? ["Music: Was the singing clear? Did they keep the beat?", "Dance: Did they move together? Were the moves nice?", "Drama: Could we hear the actors? Was the story clear?"]
          : [
              "Theme and message: what is the performance about and what does it teach?",
              "Music: singing in tune, clear words, steady beat, good use of loud/soft and instruments.",
              "Dance: movements, togetherness, use of space, formations, costume.",
              "Drama: acting, voice projection, story, props and set.",
              "Values: social (teaching), aesthetic (beauty), cultural (our way of life) and functional (purpose).",
            ],
        diagram: "appraisal-guide",
        remember: ["Look at theme, music, dance, drama.", "Use the four values.", "Give reasons for your views."],
        check: [
          { q: "Singing the right notes is singing…", options: ["in tune", "out of time", "silently", "too fast"], answer: 0 },
          { q: "What a performance teaches is its…", options: ["message", "price", "venue", "costume"], answer: 0 },
        ],
      },
    ],
    "2.4.7": [
      {
        title: "Judging performances and giving feedback",
        emoji: "📝",
        explain: [
          y ? "Say what was good about the performance." : "Use the agreed guidelines to decide the value and functions of performances: was it enjoyable, meaningful, well performed and true to culture?",
          y ? "Say one thing that could be better." : "Write or say feedback: strengths, weaknesses and suggestions for improvement ('two stars and a wish').",
          y ? "Use what others say to make your next performance better." : "Groups listen to the feedback, agree on changes and rehearse again. Keep a short report for future performances.",
        ],
        remember: ["Strengths and weaknesses.", "Two stars and a wish.", "Use feedback to improve."],
        check: [
          { q: "Something done well is a…", options: ["strength", "weakness", "prop", "costume"], answer: 0 },
          { q: "After feedback, a group should…", options: ["practise and improve", "give up", "quarrel", "stop"], answer: 0 },
        ],
      },
    ],
  };
}

export const TOPICS_PRIMARY: Record<string, Record<string, Topic[]>> = Object.fromEntries(FOCUS.map((f) => [f.cls, { ...va(f), ...pa(f) }]));
