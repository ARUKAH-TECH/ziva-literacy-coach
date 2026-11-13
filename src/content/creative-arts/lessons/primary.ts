import type { ClassId } from "../curriculum";
import type { Lesson, LessonQuestion } from "../types";

// Primary (B1 to B6) Creative Arts lessons. The NaCCA primary curriculum uses
// the same seven content standards in every class (CS1 to CS7, for Visual Arts
// and for Performing Arts); what changes is the focus:
//   B1 the local community · B2 other communities in Ghana · B3 other African
//   communities · B4 Ghanaian artists · B5 Ghanaian and other African artists ·
//   B6 artists from around the world.
// So each lesson is built from a class "focus" (real examples for that class)
// and a teaching pattern for the content standard.

export type Pair = [string, string];

export interface Focus {
  cls: ClassId;
  young: boolean;
  /** "your local community", "other communities in Ghana"… */
  place: string;
  history: string;
  /** Visual artworks with where/who. */
  visual: Pair[];
  /** Visual artists (B4–B6). */
  visualArtists?: Pair[];
  /** Music, dance and drama examples. */
  performing: Pair[];
  performers?: Pair[];
  natural: string[];
  manmade: string[];
  issues: string[];
  /** Two class-specific quiz questions each. */
  vaQuiz: LessonQuestion[];
  paQuiz: LessonQuestion[];
}

export const FOCUS: Focus[] = [
  {
    cls: "b1",
    young: true,
    place: "your local community",
    history: "where the people came from, the leaders who brought them, how the town started, their language, food, dress, buildings, farming tools, songs and dances",
    visual: [
      ["Pictures on walls, signboards and buses", "drawing and painting"],
      ["Clay pots and bowls", "pottery"],
      ["Baskets and mats", "weaving"],
      ["Kente, batik and tie-dye cloth", "textiles"],
      ["Beads and bracelets", "jewellery"],
      ["Carved stools and drums", "wood carving"],
      ["Leather sandals and bags", "leatherwork"],
    ],
    performing: [
      ["Songs sung at school, church, mosque and home", "music"],
      ["Drumming at festivals and funerals", "music"],
      ["Dances at festivals and parties", "dance"],
      ["Ananse stories told by elders (anansesem)", "storytelling"],
      ["Plays at school and church", "drama"],
      ["Games like ampe with songs and clapping", "games"],
    ],
    natural: ["rivers", "hills", "trees", "animals", "birds", "the sky and the sun"],
    manmade: ["houses", "roads", "the market", "the school", "the chief's palace"],
    issues: ["keeping our surroundings clean (sanitation)", "washing our hands", "crossing the road safely", "not throwing rubbish in gutters"],
    vaQuiz: [
      { q: "A clay pot is made by a…", options: ["potter", "drummer", "dancer", "singer"], answer: 0 },
      { q: "Which of these is woven?", options: ["A basket", "A clay pot", "A song", "A drum beat"], answer: 0 },
    ],
    paQuiz: [
      { q: "Kwaku Ananse stories are called…", options: ["anansesem", "kente", "ampe", "adinkra"], answer: 0 },
      { q: "Which of these do we play with our hands?", options: ["A drum", "A basket", "A pot", "A stool"], answer: 0 },
    ],
  },
  {
    cls: "b2",
    young: true,
    place: "other communities in Ghana",
    history: "how people in other parts of Ghana live: their festivals, foods, clothes, crafts, songs and dances",
    visual: [
      ["Kente cloth from Bonwire (Ashanti) and Agotime (Volta)", "weaving"],
      ["Adinkra cloth from Ntonso (Ashanti)", "printing on cloth"],
      ["Bolga baskets from Bolgatanga (Upper East)", "basket weaving"],
      ["Krobo beads from Odumase-Krobo (Eastern)", "bead making"],
      ["Wood carvings from Ahwiaa (Ashanti)", "carving"],
      ["Smocks (fugu) from the North", "weaving and sewing"],
    ],
    performing: [
      ["Adowa dance of the Akan", "dance"],
      ["Kpanlogo of the Ga", "music and dance"],
      ["Agbadza of the Ewe", "music and dance"],
      ["Bamaya of the Dagomba", "dance"],
      ["Homowo festival of the Ga", "festival"],
      ["Aboakyir (deer hunt) festival of the Effutu, Winneba", "festival"],
    ],
    natural: ["the Volta Lake", "Mount Afadjato", "forests", "savannah grassland", "the sea and beaches"],
    manmade: ["castles and forts (Cape Coast, Elmina)", "the Akosombo Dam", "markets", "bridges"],
    issues: ["galamsey (illegal mining) spoiling rivers", "plastic waste", "flooding", "bushfires"],
    vaQuiz: [
      { q: "Bolga baskets come from…", options: ["Bolgatanga", "Cape Coast", "Ho", "Takoradi"], answer: 0 },
      { q: "Adinkra cloth is famous at…", options: ["Ntonso", "Tamale", "Keta", "Wa"], answer: 0 },
    ],
    paQuiz: [
      { q: "Homowo is a festival of the…", options: ["Ga", "Ewe", "Dagomba", "Fante"], answer: 0 },
      { q: "Kpanlogo is a dance of the…", options: ["Ga", "Dagaaba", "Akan", "Nzema"], answer: 0 },
    ],
  },
  {
    cls: "b3",
    young: true,
    place: "other African communities",
    history: "how people in other African countries live, and the art, music, dance and drama they make",
    visual: [
      ["Painted Ndebele houses in South Africa", "painting"],
      ["Maasai beadwork in Kenya and Tanzania", "bead making"],
      ["Benin bronze heads and plaques in Nigeria", "metal casting"],
      ["Bogolan (mud cloth) in Mali", "textiles"],
      ["Kuba cloth in DR Congo", "weaving and embroidery"],
      ["Pyramids and wall pictures in Egypt", "architecture and painting"],
    ],
    performing: [
      ["Djembe drumming in Mali and Guinea", "music"],
      ["The kora (harp-lute) in Mali, Senegal and The Gambia", "music"],
      ["The mbira (thumb piano) in Zimbabwe", "music"],
      ["The Maasai jumping dance (Adumu) in Kenya", "dance"],
      ["The gumboot dance in South Africa", "dance"],
      ["Talking drums in Nigeria and Ghana", "music"],
    ],
    natural: ["the Sahara Desert", "the River Nile", "Mount Kilimanjaro", "rainforests", "savannah with wild animals"],
    manmade: ["the pyramids of Egypt", "big cities like Lagos and Nairobi", "mud mosques of Mali"],
    issues: ["clean water for everyone", "cutting down trees (deforestation)", "malaria", "plastic pollution"],
    vaQuiz: [
      { q: "Painted Ndebele houses are found in…", options: ["South Africa", "Ghana", "Egypt", "Mali"], answer: 0 },
      { q: "The pyramids are in…", options: ["Egypt", "Kenya", "Nigeria", "Togo"], answer: 0 },
    ],
    paQuiz: [
      { q: "The djembe is a…", options: ["drum", "dance", "basket", "flute"], answer: 0 },
      { q: "The mbira (thumb piano) comes from…", options: ["Zimbabwe", "Ghana", "Egypt", "Morocco"], answer: 0 },
    ],
  },
  {
    cls: "b4",
    young: false,
    place: "Ghana",
    history: "the history and culture of the people of Ghana, shown in the works of Ghanaian artists",
    visual: [
      ["Ghana's state chair and regalia designs", "design"],
      ["The national flag and coat of arms", "design"],
      ["Market scenes painted with a palette knife", "painting"],
      ["Carved wooden sculptures", "sculpture"],
      ["Bottle-top metal 'cloths'", "sculpture/assemblage"],
    ],
    visualArtists: [
      ["Kofi Antubam", "painter and designer of the state chair and regalia"],
      ["Theodosia Okoh", "designed Ghana's national flag"],
      ["Amon Kotei", "designed Ghana's coat of arms"],
      ["Ablade Glover", "painter of colourful crowds and markets"],
      ["Vincent Kofi", "sculptor of large wooden figures"],
      ["El Anatsui", "sculptor who makes 'cloths' from bottle tops"],
    ],
    performing: [
      ["Choral songs such as 'Yɛn Ara Asase Ni'", "music"],
      ["Highlife music", "music"],
      ["Palm-wine guitar music", "music"],
      ["Gyil (xylophone) music", "music"],
      ["Plays such as 'The Marriage of Anansewa'", "drama"],
    ],
    performers: [
      ["Ephraim Amu", "composer of 'Yɛn Ara Asase Ni'"],
      ["E. T. Mensah", "the 'King of Highlife'"],
      ["Koo Nimo", "palm-wine guitarist"],
      ["Kakraba Lobi", "master gyil (xylophone) player"],
      ["Efua Sutherland", "playwright of 'The Marriage of Anansewa'"],
      ["Nana Ampadu", "highlife musician and bandleader"],
    ],
    natural: ["the Volta Lake", "Kakum forest", "Mole National Park", "the coast"],
    manmade: ["Independence Arch", "Kwame Nkrumah Mausoleum", "Akosombo Dam", "Cape Coast Castle"],
    issues: ["galamsey", "sanitation", "road safety", "teenage pregnancy", "plastic waste"],
    vaQuiz: [
      { q: "Who designed Ghana's national flag?", options: ["Theodosia Okoh", "Ablade Glover", "Vincent Kofi", "El Anatsui"], answer: 0 },
      { q: "El Anatsui makes famous sculptures from…", options: ["bottle tops", "glass", "ice", "feathers"], answer: 0 },
    ],
    paQuiz: [
      { q: "'Yɛn Ara Asase Ni' was composed by…", options: ["Ephraim Amu", "E. T. Mensah", "Koo Nimo", "Nana Ampadu"], answer: 0 },
      { q: "Who is called the 'King of Highlife'?", options: ["E. T. Mensah", "Kakraba Lobi", "Efua Sutherland", "Ephraim Amu"], answer: 0 },
    ],
  },
  {
    cls: "b5",
    young: false,
    place: "Ghana and other African countries",
    history: "the history and culture of people in Ghana and other African countries, shown in the works of their artists",
    visual: [
      ["Ndebele geometric wall paintings", "painting"],
      ["Prints and paintings of Nigerian life", "printmaking and painting"],
      ["Paintings of struggle and hope in Mozambique", "painting"],
      ["Bottle-top sculptures", "sculpture"],
    ],
    visualArtists: [
      ["El Anatsui (Ghana)", "bottle-top and metal sculptures"],
      ["Ablade Glover (Ghana)", "palette-knife paintings"],
      ["Ben Enwonwu (Nigeria)", "painter and sculptor"],
      ["Bruce Onobrakpeya (Nigeria)", "printmaker"],
      ["Esther Mahlangu (South Africa)", "Ndebele wall painting"],
      ["Malangatana Ngwenya (Mozambique)", "painter"],
    ],
    performing: [
      ["Highlife (Ghana)", "music"],
      ["Afrobeat (Nigeria)", "music"],
      ["Mbalax (Senegal)", "music"],
      ["South African freedom songs", "music"],
      ["African plays", "drama"],
    ],
    performers: [
      ["Ephraim Amu (Ghana)", "choral composer"],
      ["Miriam Makeba (South Africa)", "singer who spoke against apartheid"],
      ["Fela Kuti (Nigeria)", "creator of Afrobeat"],
      ["Youssou N'Dour (Senegal)", "mbalax singer"],
      ["Salif Keita (Mali)", "singer known as the 'Golden Voice of Africa'"],
      ["Wole Soyinka (Nigeria)", "playwright, Nobel Prize 1986"],
    ],
    natural: ["deserts", "rainforests", "savannah", "great rivers like the Nile and Niger", "mountains like Kilimanjaro"],
    manmade: ["the pyramids of Egypt", "the Great Mosque of Djenné (Mali)", "Great Zimbabwe ruins", "modern cities"],
    issues: ["clean water", "deforestation", "unemployment", "disease", "conflict and peace"],
    vaQuiz: [
      { q: "Esther Mahlangu is famous for…", options: ["Ndebele wall painting", "drumming", "weaving kente", "pottery"], answer: 0 },
      { q: "Ben Enwonwu was an artist from…", options: ["Nigeria", "Kenya", "Ghana", "Egypt"], answer: 0 },
    ],
    paQuiz: [
      { q: "Afrobeat was created by…", options: ["Fela Kuti", "Miriam Makeba", "Salif Keita", "Ephraim Amu"], answer: 0 },
      { q: "Miriam Makeba was a singer from…", options: ["South Africa", "Mali", "Nigeria", "Senegal"], answer: 0 },
    ],
  },
  {
    cls: "b6",
    young: false,
    place: "communities around the world",
    history: "the history and culture of people around the world, shown in the works of international artists",
    visual: [
      ["The Mona Lisa (Italy)", "painting"],
      ["The Starry Night (Netherlands artist)", "painting"],
      ["The Great Wave off Kanagawa (Japan)", "printmaking"],
      ["The statue of David (Italy)", "sculpture"],
      ["Cubist paintings (Spain/France)", "painting"],
    ],
    visualArtists: [
      ["Leonardo da Vinci (Italy)", "painted the Mona Lisa"],
      ["Michelangelo (Italy)", "carved David and painted the Sistine Chapel ceiling"],
      ["Vincent van Gogh (Netherlands)", "painted The Starry Night"],
      ["Pablo Picasso (Spain)", "helped start Cubism"],
      ["Frida Kahlo (Mexico)", "painted colourful self-portraits"],
      ["Katsushika Hokusai (Japan)", "made the woodblock print The Great Wave"],
    ],
    performing: [
      ["Classical music (Europe)", "music"],
      ["Reggae (Jamaica)", "music"],
      ["Jazz and pop (USA)", "music"],
      ["Ballet", "dance"],
      ["Plays of William Shakespeare (England)", "drama"],
    ],
    performers: [
      ["Wolfgang Amadeus Mozart (Austria)", "classical composer"],
      ["Ludwig van Beethoven (Germany)", "composer who kept writing music after losing his hearing"],
      ["Bob Marley (Jamaica)", "reggae singer"],
      ["Louis Armstrong (USA)", "jazz trumpeter and singer"],
      ["Michael Jackson (USA)", "pop singer and dancer"],
      ["William Shakespeare (England)", "playwright of 'Romeo and Juliet'"],
    ],
    natural: ["the Amazon rainforest", "the Arctic ice", "the Himalaya mountains", "oceans"],
    manmade: ["the Great Wall of China", "the Eiffel Tower (France)", "the Taj Mahal (India)", "skyscrapers"],
    issues: ["climate change", "pollution", "pandemics such as COVID-19", "poverty", "peace"],
    vaQuiz: [
      { q: "Who painted the Mona Lisa?", options: ["Leonardo da Vinci", "Pablo Picasso", "Frida Kahlo", "Hokusai"], answer: 0 },
      { q: "The Great Wave off Kanagawa is a print from…", options: ["Japan", "Italy", "Mexico", "Ghana"], answer: 0 },
    ],
    paQuiz: [
      { q: "Bob Marley is famous for…", options: ["reggae music", "ballet", "painting", "pottery"], answer: 0 },
      { q: "'Romeo and Juliet' was written by…", options: ["William Shakespeare", "Mozart", "Beethoven", "Louis Armstrong"], answer: 0 },
    ],
  },
];

const listText = (items: Pair[]) => items.map(([a, b]) => `${a} (${b})`);
const names = (items: Pair[]) => items.map(([a, b]) => `${a}: ${b}`);

function vaLessons(f: Focus): Lesson[] {
  const y = f.young;
  const artists = f.visualArtists ? names(f.visualArtists) : null;
  return [
    {
      cls: f.cls,
      code: "1.1.1",
      title: artists ? `Visual Arts: studying ${f.place === "Ghana" ? "Ghanaian" : ""} artists and their works`.replace("  ", " ") : `Visual Arts: artworks of ${f.place}`,
      emoji: "🖼️",
      intro: y
        ? `Look at the pictures and things people make in ${f.place}. Talk about what they tell us about the people, the land and what is happening today.`
        : `Study visual artworks and artists of ${f.place}, and find out how their works show history and culture, the natural and manmade environment, and topical issues.`,
      sections: [
        {
          heading: "What are visual arts?",
          text: y
            ? "Visual arts are things we make for people to see and use: drawings, paintings, pots, baskets, cloth, beads, carvings and more."
            : "Visual arts are artworks we see and touch: drawing, painting, sculpture, pottery, textiles, basketry, jewellery, leatherwork, graphic design and architecture.",
        },
        { heading: y ? "Artworks we can find" : "Artworks to study", points: listText(f.visual) },
        ...(artists ? [{ heading: "Artists to know", points: artists }] : []),
        {
          heading: "What artworks tell us",
          points: [
            `History and culture: ${f.history}.`,
            `Natural environment: ${f.natural.join(", ")}.`,
            `Manmade environment: ${f.manmade.join(", ")}.`,
            `Topical issues: ${f.issues.join(", ")}.`,
          ],
        },
        {
          heading: y ? "Getting ideas" : "Generating ideas",
          text: y
            ? "Look closely, ask elders questions, and look at pictures or videos. Then think: what would I like to draw or make?"
            : "Observe, ask questions, read and watch videos about the artworks. Brainstorm and sketch ideas for your own artworks inspired by them.",
        },
      ],
      words: [
        ["Visual arts", "Artworks we see and touch."],
        ["Artist", "A person who makes art."],
        ["Culture", "The way of life of a people."],
        ["Environment", "Our surroundings, natural and manmade."],
        ["Topical issue", "Something important people are talking about now."],
      ],
      materials: ["Sketchbook or exercise book", "Pencil and crayons", "Pictures from books, magazines or a phone"],
      practical: {
        title: y ? "Art walk" : "Artwork research",
        steps: y
          ? ["With your teacher or a parent, look around for artworks (pots, cloth, pictures, carvings).", "Draw two of them.", "Say what each one is made of.", "Tell a friend what it shows about the people.", "Share one idea for your own artwork."]
          : ["Choose two artworks or artists from this lesson.", "Find pictures of their works.", "Write what each work shows (history, culture, environment or an issue).", "Sketch an idea for your own artwork inspired by one of them.", "Share your findings with the class."],
      },
      quiz: [
        { q: "Which of these is a visual artwork?", options: ["A song", "A clay pot", "A dance", "A story"], answer: 1 },
        { q: "The way of life of a people is their…", options: ["culture", "weather", "homework", "address"], answer: 0 },
        { q: "Rivers, hills and trees are part of the…", options: ["manmade environment", "natural environment", "drama", "music"], answer: 1 },
        { q: "Roads, houses and markets are part of the…", options: ["manmade environment", "natural environment", "sky", "sea"], answer: 0 },
        ...f.vaQuiz,
      ],
      written: [
        { q: y ? "Name three artworks you can find and what they are made of." : `Name three visual artworks${artists ? " or artists" : ""} studied and what they show.`, answer: y ? `For example: ${f.visual.slice(0, 3).map(([a]) => a).join("; ")}.` : (artists ?? listText(f.visual)).slice(0, 3).join("; ") + "." },
        { q: "How can an artwork tell us about a topical issue? Give an example.", answer: `An artwork can show a problem so people think about it, e.g. a poster or painting about ${f.issues[0]}.` },
      ],
    },
    {
      cls: f.cls,
      code: "1.2.2",
      title: "Visual Arts: planning, tools, materials and methods",
      emoji: "🧰",
      intro: y ? "Find out which tools and materials we can use to make artworks, try them, and choose the best ones for your idea." : "Organise your ideas by experimenting with available tools, materials and methods, then decide which suit your artwork.",
      sections: [
        {
          heading: "Tools and materials",
          points: y
            ? ["Drawing: pencil, crayons, colour pencils, chalk, paper.", "Painting: poster colours, brushes, sponge, water.", "Modelling: clay, paper pulp, plasticine.", "Collage: old magazines, leaves, seeds, glue, scissors.", "Weaving: paper strips, palm fronds, raffia."]
            : ["Drawing and painting: pencils (H/B), charcoal, pastels, poster colours, brushes, palette.", "Printing: blocks (cassava, wood), stencils, ink, roller.", "Modelling and sculpture: clay, papier-mâché, wood, wire, plaster.", "Collage and mosaic: paper, fabric, seeds, shells, glue.", "Weaving and textiles: yarn, raffia, cane, dyes, cloth.", "Digital: drawing apps, cameras."],
        },
        {
          heading: "Methods (ways of making)",
          diagram: "colour-wheel",
          points: ["Drawing and colouring", "Painting and colour mixing", "Printing (pressing a shape to repeat it)", "Modelling (shaping clay or pulp)", "Collage (sticking pieces on a surface)", "Weaving (over and under)"],
        },
        {
          heading: "Planning your artwork",
          points: [
            `Decide what your artwork will show: the history and culture, the environment or a topical issue of ${f.place}.`,
            "Try two or three materials on a small piece first (experiment).",
            "Choose the tools, materials and method that work best, and say why.",
            "Make a small sketch of your plan.",
          ],
        },
      ],
      words: [
        ["Tool", "Something we use to make art, e.g. a brush."],
        ["Material", "What the artwork is made from, e.g. clay or paper."],
        ["Method", "The way of making the artwork."],
        ["Experiment", "Trying something to see how it works."],
        ["Sketch", "A quick drawing of an idea."],
      ],
      materials: ["Pencils, crayons, poster colours", "Clay or paper pulp", "Old magazines, leaves, glue", "Scissors"],
      practical: {
        title: "Material test card",
        steps: ["Divide a sheet of paper into six boxes.", "In each box try a different material or method (crayon, paint, collage, print, rubbing, clay press).", "Write under each box what you liked about it.", "Choose the best one for your artwork idea.", "Make a small plan sketch."],
        safety: "Use scissors carefully and wash your hands after using paint and clay.",
      },
      quiz: [
        { q: "A brush is a…", options: ["tool", "material", "song", "dance"], answer: 0 },
        { q: "Clay is a…", options: ["material", "tool", "method", "colour"], answer: 0 },
        { q: "Sticking pieces of paper or leaves on a surface is…", options: ["collage", "weaving", "singing", "drumming"], answer: 0 },
        { q: "Trying something to see how it works is to…", options: ["experiment", "sleep", "copy", "erase"], answer: 0 },
        { q: "Red + yellow makes…", options: ["orange", "green", "violet", "black"], answer: 0 },
      ],
      written: [{ q: "Name three tools and three materials used in visual arts.", answer: "Tools: brush, pencil, scissors (also roller, palette knife). Materials: clay, paper, poster colours (also yarn, raffia, glue)." }],
    },
    {
      cls: f.cls,
      code: "1.2.3",
      title: "Visual Arts: creating my own artworks",
      emoji: "🎨",
      intro: y ? "Make your own artworks about the people, places and important issues you have learnt about." : `Create expressive artworks using your chosen media and methods to show history and culture, the environment and topical issues of ${f.place}.`,
      sections: [
        {
          heading: "Ideas for artworks",
          points: [
            `History and culture: a picture of a festival or a craft from ${f.place}.`,
            `Environment: a painting or collage of ${f.natural[0]} or ${f.manmade[0]}.`,
            `Topical issue: a poster about ${f.issues[0]}.`,
            y ? "A clay model of something useful at home (a pot, a cup)." : "A functional artwork: a clay pot, a woven mat, a printed cloth or a bag.",
          ],
        },
        {
          heading: "Steps to make an artwork",
          diagram: "appraisal-guide",
          points: ["Choose your idea.", "Make a sketch.", "Gather your tools and materials.", "Make the artwork step by step.", "Look at it, improve it, add a title and your name."],
        },
        {
          heading: "Taking care",
          text: "Keep your working area clean, share tools, and put materials back after use. Keep your finished works safely in a folder (portfolio).",
        },
      ],
      words: [
        ["Create", "To make something new."],
        ["Functional artwork", "An artwork that is useful, like a pot or a mat."],
        ["Portfolio", "A folder where you keep your artworks."],
        ["Title", "The name of an artwork."],
      ],
      materials: ["Your chosen materials from the last lesson", "Folder for your portfolio"],
      practical: {
        title: y ? "My community picture" : "Message artwork",
        steps: y
          ? ["Think of one thing you love in your community.", "Draw it lightly with a pencil.", "Colour it with crayons or paint.", "Add a title and your name.", "Keep it in your portfolio."]
          : [`Choose a topical issue (e.g. ${f.issues[0]}).`, "Sketch two ideas and pick one.", "Make it as a poster, painting, collage or print.", "Add a short message or title.", "Ask a classmate what message they see, then improve it.", "Keep it in your portfolio."],
      },
      quiz: [
        { q: "A folder where you keep your artworks is a…", options: ["portfolio", "palette", "pot", "poster"], answer: 0 },
        { q: "Before making an artwork, it helps to…", options: ["make a sketch", "throw away the paper", "sleep", "close your eyes"], answer: 0 },
        { q: "Which artwork is useful (functional)?", options: ["A clay pot", "A drawing on a wall", "A song", "A dance"], answer: 0 },
        { q: "The name of an artwork is its…", options: ["title", "colour", "size", "price"], answer: 0 },
        { q: "After work, we should…", options: ["clean up and put tools back", "leave everything", "break the tools", "hide the paint"], answer: 0 },
      ],
      written: [{ q: "Write the steps you follow to make an artwork.", answer: "Choose an idea; make a sketch; gather tools and materials; make the artwork step by step; look at it and improve it; give it a title and your name; keep it safely." }],
    },
    {
      cls: f.cls,
      code: "1.3.4",
      title: "Visual Arts: planning a display of my artworks",
      emoji: "📌",
      intro: y ? "Plan how to show your artworks to other people." : "Plan an exhibition of your portfolio: choose a venue, select and group works, and invite an audience.",
      sections: [
        {
          heading: "Planning a display",
          diagram: "display-plan",
          points: [
            "Choose a theme or title (e.g. 'Our Community', 'Our Environment').",
            "Choose a place (venue): the classroom wall, the school hall or a community centre. Clean and prepare it.",
            "Select your best artworks and group them (paintings together, clay works together, or by theme).",
            "Write labels: title, your name, class, materials.",
            "Invite people: teachers, parents, other classes, community members.",
          ],
        },
      ],
      words: [
        ["Display", "Showing artworks for people to see."],
        ["Exhibition", "A big public display of artworks."],
        ["Venue", "The place where an event happens."],
        ["Label", "A small card with information about an artwork."],
        ["Audience", "The people who come to see."],
      ],
      materials: ["Your portfolio", "Card for labels", "Tape, pins or string", "Paper for invitations"],
      practical: {
        title: "Plan our class display",
        steps: ["As a class, choose a title.", "Each learner chooses two best works.", "Group the works.", "Write labels.", "Make an invitation card for parents."],
      },
      quiz: [
        { q: "The place where a display is held is the…", options: ["venue", "label", "brush", "title"], answer: 0 },
        { q: "A small card with the title and artist's name is a…", options: ["label", "drum", "pot", "ticket only"], answer: 0 },
        { q: "The people who come to see a display are the…", options: ["audience", "artists only", "drummers", "players"], answer: 0 },
        { q: "Before a display, the venue should be…", options: ["cleaned and prepared", "locked forever", "left dirty", "painted black"], answer: 0 },
      ],
      written: [{ q: "List four things to do when planning a display.", answer: "Choose a title/theme; choose and prepare a venue; select and group the artworks; write labels; invite an audience." }],
    },
    {
      cls: f.cls,
      code: "1.3.5",
      title: "Visual Arts: displaying and sharing my artworks",
      emoji: "🏫",
      intro: y ? "Put up your artworks, tell people about them, and keep a record of the day." : "Mount and display your artworks, share your ideas with the audience, and record the event for a report.",
      sections: [
        {
          heading: "On the display day",
          points: [
            "Mount works neatly at eye level so everyone can see.",
            "Stand by your work and explain what it shows and how you made it.",
            "Listen to visitors' questions and comments politely.",
            "Keep a visitors' book for comments.",
          ],
        },
        {
          heading: "Recording the event",
          text: y ? "Take photos (with permission), draw the display, or write three things people said." : "Use your senses, notes, drawings, photographs or video (with permission) to record the event, then write a short report: what was shown, who came, what they said, what to improve.",
        },
      ],
      words: [
        ["Mount", "To fix an artwork on a board or wall."],
        ["Visitors' book", "A book where visitors write comments."],
        ["Report", "A written account of what happened."],
      ],
      materials: ["Artworks and labels", "Tape or pins", "Visitors' book", "Phone camera (optional, with permission)"],
      practical: {
        title: "Our display day",
        steps: ["Mount the works at eye level.", "Each learner explains their work in two sentences.", "Visitors write in the visitors' book.", "Take photos or draw the display.", "Write a short report afterwards."],
      },
      quiz: [
        { q: "Artworks should be mounted at…", options: ["eye level", "the ceiling", "the floor", "behind a door"], answer: 0 },
        { q: "Visitors write their comments in the…", options: ["visitors' book", "dustbin", "paint pot", "drum"], answer: 0 },
        { q: "A written account of what happened is a…", options: ["report", "song", "sketch", "label"], answer: 0 },
        { q: "When visitors ask questions, we should…", options: ["answer politely", "run away", "shout", "hide our work"], answer: 0 },
      ],
      written: [{ q: "How can you record what happened at your display?", answer: "Take photos or video (with permission), make drawings, collect comments in a visitors' book, write notes, then write a short report." }],
    },
    {
      cls: f.cls,
      code: "1.4.6",
      title: "Visual Arts: guidelines for looking at artworks",
      emoji: "🔍",
      intro: y ? "Agree on good ways to look at artworks and share your feelings kindly." : "Develop and use guidelines for appreciating and appraising artworks: theme, subject matter, media, techniques, elements and principles of design, and their values.",
      sections: [
        {
          heading: y ? "Good ways to look at artworks" : "Guidelines for judging artworks",
          diagram: "appraisal-guide",
          points: y
            ? ["Look carefully before you speak.", "Say what you see (colours, shapes, things).", "Say how it makes you feel.", "Say one thing you like.", "Be kind: suggest, don't laugh."]
            : ["Theme and subject matter: what is it about?", "Media and techniques: what materials and methods were used?", "Elements and principles of design: lines, shapes, colours, texture; balance, rhythm, unity, contrast.", "Values: social (does it teach?), aesthetic (is it beautiful?), cultural (does it show our way of life?), functional (is it useful?)."],
        },
        { heading: "Steps", points: ["Describe: what do you see?", "Analyse: how was it made?", "Interpret: what does it mean?", "Judge: is it good? Why?"] },
      ],
      words: [
        ["Appreciate", "To look carefully and enjoy an artwork."],
        ["Appraise", "To judge how good an artwork is."],
        ["Theme", "The main idea of an artwork."],
        ["Aesthetic value", "How beautiful something is."],
        ["Functional value", "How useful something is."],
      ],
      materials: ["Artworks from the display", "Notebook"],
      practical: {
        title: "Gallery walk",
        steps: ["As a class, agree on 4 rules for looking at artworks.", "Walk round the displayed works.", "For two works, write: what I see, how it was made, what it means, what I like.", "Share kindly with the artist."],
      },
      quiz: [
        { q: "To judge how good an artwork is means to…", options: ["appraise", "erase", "paint", "fold"], answer: 0 },
        { q: "The main idea of an artwork is its…", options: ["theme", "frame", "price", "size"], answer: 0 },
        { q: "How beautiful an artwork is shows its…", options: ["aesthetic value", "weight", "age", "price tag"], answer: 0 },
        { q: "The first step in looking at an artwork is to…", options: ["describe what you see", "judge it", "throw it", "copy it"], answer: 0 },
      ],
      written: [{ q: y ? "Write three good rules for looking at artworks." : "List the things to consider when appraising an artwork.", answer: y ? "Look carefully first; say what you see; say how it makes you feel; be kind and polite." : "Theme and subject matter; media and techniques; elements and principles of design; social, aesthetic, cultural and functional values." }],
    },
    {
      cls: f.cls,
      code: "1.4.7",
      title: "Visual Arts: judging artworks and suggesting improvements",
      emoji: "✅",
      intro: y ? "Decide what is beautiful and useful about artworks and say how they can be made better." : "Use the agreed guidelines to make informed decisions about artworks, present a report and suggest improvements for the future.",
      sections: [
        {
          heading: "Making decisions about artworks",
          points: [
            "Beauty: colours, neatness, shapes, finishing.",
            "Usefulness: can it be used (a pot, a mat) or does it teach a lesson (a poster)?",
            "Message: is the idea clear?",
            "Effort and creativity: is it original?",
          ],
        },
        {
          heading: "Giving feedback",
          text: "Use the 'two stars and a wish' way: say two good things and one thing that could be better. Example: 'Your colours are bright and your lines are neat. I wish the title was bigger.'",
        },
        { heading: "Improving", text: "Listen to the feedback, decide what to change, and improve your artwork or your next one." },
      ],
      words: [
        ["Feedback", "Comments that help someone improve."],
        ["Improve", "To make better."],
        ["Original", "New and your own idea."],
      ],
      materials: ["Artworks", "Notebook"],
      practical: {
        title: "Two stars and a wish",
        steps: ["Pair up and swap artworks.", "Write two good things (stars).", "Write one way to improve it (wish).", "Read your partner's comments on your work.", "Improve your artwork."],
      },
      quiz: [
        { q: "Comments that help someone improve are called…", options: ["feedback", "noise", "homework", "paint"], answer: 0 },
        { q: "'Two stars and a wish' means…", options: ["two good things and one to improve", "two drawings", "two songs", "two mistakes"], answer: 0 },
        { q: "A mat or pot is valued for being…", options: ["useful", "noisy", "invisible", "wet"], answer: 0 },
        { q: "After getting feedback we should…", options: ["improve our work", "get angry", "tear our work", "stop making art"], answer: 0 },
      ],
      written: [{ q: "Give two stars and a wish for an artwork you have seen.", answer: "Example: Star 1: the colours are bright. Star 2: the lines are neat. Wish: the message could be clearer with a bigger title." }],
    },
  ];
}

function paLessons(f: Focus): Lesson[] {
  const y = f.young;
  const perf = f.performers ? names(f.performers) : null;
  return [
    {
      cls: f.cls,
      code: "2.1.1",
      title: perf ? "Performing Arts: studying performers and their works" : `Performing Arts: music, dance and drama of ${f.place}`,
      emoji: "🥁",
      intro: y ? `Talk about the songs, drumming, dances, stories and plays of ${f.place}, and what they tell us.` : `Study performing artworks and artists of ${f.place} and how they show history and culture, the environment and topical issues.`,
      sections: [
        {
          heading: "What are performing arts?",
          text: "Performing arts are arts we perform for people to watch and listen to: music (singing and playing instruments), dance and drama (acting and storytelling).",
        },
        { heading: y ? "Performances we know" : "Performing artworks to study", points: listText(f.performing) },
        ...(perf ? [{ heading: "Performers and writers to know", points: perf }] : []),
        {
          heading: "What performances tell us",
          points: [
            `History and culture: ${f.history}.`,
            `Environment: songs and dances about ${f.natural.slice(0, 2).join(" and ")}, farming, fishing and work.`,
            `Topical issues: songs and plays that teach about ${f.issues.slice(0, 2).join(" and ")}.`,
          ],
        },
      ],
      words: [
        ["Performing arts", "Music, dance and drama performed for an audience."],
        ["Music", "Organised sounds from voices and instruments."],
        ["Dance", "Moving the body to rhythm."],
        ["Drama", "Telling a story by acting."],
        ["Audience", "People who watch or listen."],
      ],
      materials: ["Voices and hands", "Drums, rattles or bells", "Recordings or videos (optional)"],
      practical: {
        title: y ? "Song and story time" : "Performer study",
        steps: y
          ? ["Sing a song your family or community sings.", "Clap the beat.", "Listen to an elder tell a story.", "Say what the song or story teaches.", "Share it with the class."]
          : ["Choose one performer or performance from the lesson.", "Listen to or watch it.", "Write what it shows about history, culture, environment or an issue.", "Share two ideas you could use in your own performance."],
      },
      quiz: [
        { q: "Which is a performing art?", options: ["Dance", "Pottery", "Basketry", "Painting"], answer: 0 },
        { q: "Telling a story by acting is…", options: ["drama", "weaving", "drawing", "printing"], answer: 0 },
        { q: "People who watch a performance are the…", options: ["audience", "potters", "carvers", "weavers"], answer: 0 },
        { q: "Moving the body to rhythm is…", options: ["dance", "drawing", "modelling", "writing"], answer: 0 },
        ...f.paQuiz,
      ],
      written: [
        { q: y ? "Name a song, a dance and a story you know." : `Name three performing artworks${perf ? " or performers" : ""} studied and what they show.`, answer: y ? "For example: a school song, a festival dance and an Ananse story." : (perf ?? listText(f.performing)).slice(0, 3).join("; ") + "." },
      ],
    },
    {
      cls: f.cls,
      code: "2.2.2",
      title: "Performing Arts: planning with instruments, voices and movement",
      emoji: "🪘",
      intro: y ? "Try different instruments, sounds and movements, and choose the best ones for your own performance." : "Organise your ideas by experimenting with instruments, resources and techniques for music, dance and drama, then decide what to use.",
      sections: [
        {
          heading: "Instruments and resources",
          points: [
            "Drums (membranophones): atumpan, kpanlogo drum, donno (talking drum), djembe.",
            "Bells and rattles (idiophones): dawuro/gankogui (bell), axatse/shekere (rattle), castanets (firikyiwa).",
            "Wind instruments (aerophones): atenteben (bamboo flute), whistles, horns.",
            "String instruments (chordophones): seperewa, guitar, kora.",
            "Our voices, hands (clapping) and feet (stamping).",
            "Drama resources: costumes, props, masks, a story idea.",
          ],
        },
        {
          heading: "Techniques to try",
          points: ["Music: loud and soft, fast and slow, high and low sounds, call and response.", "Dance: big and small moves, high and low levels, moving in a circle or in lines.", "Drama: using your voice, face and body to show feelings."],
        },
        {
          heading: "Planning your performance",
          text: `Choose your idea (history and culture, environment or a topical issue of ${f.place}), try different instruments and moves, then decide which ones fit best.`,
        },
      ],
      words: [
        ["Instrument", "Something used to make music."],
        ["Rhythm", "A pattern of long and short sounds."],
        ["Call and response", "A leader sings and the group answers."],
        ["Props", "Objects used in a play."],
        ["Costume", "Clothes worn for a performance."],
      ],
      materials: ["Drums, bells, rattles or homemade shakers (bottles with stones)", "Cloth for costumes", "Open space"],
      practical: {
        title: "Sound and move test",
        steps: ["Make a shaker from a bottle and small stones.", "Play it loud, then soft; fast, then slow.", "Clap a rhythm and let the class copy (call and response).", "Make three dance moves at high, middle and low levels.", "Choose the sounds and moves you like best for your performance."],
      },
      quiz: [
        { q: "A drum is played by…", options: ["hitting it", "blowing it", "plucking a string", "folding it"], answer: 0 },
        { q: "The atenteben is a…", options: ["bamboo flute", "drum", "bell", "rattle"], answer: 0 },
        { q: "A leader sings and the group answers. This is…", options: ["call and response", "silence", "painting", "weaving"], answer: 0 },
        { q: "Clothes worn for a performance are…", options: ["costumes", "props", "drums", "labels"], answer: 0 },
        { q: "A pattern of long and short sounds is…", options: ["rhythm", "colour", "texture", "shape"], answer: 0 },
      ],
      written: [{ q: "Name four musical instruments and how each is played.", answer: "Drum: hit with hands or sticks. Bell (dawuro/gankogui): struck with a stick. Rattle (axatse/shekere): shaken. Atenteben (flute): blown. Guitar/seperewa: plucked." }],
    },
    {
      cls: f.cls,
      code: "2.2.3",
      title: "Performing Arts: creating my own music, dance and drama",
      emoji: "🎤",
      intro: y ? "Make your own song, dance or short play about what you have learnt." : `Compose and create your own music, dance and drama that express your views on the history, culture, environment and topical issues of ${f.place}.`,
      sections: [
        {
          heading: "Ideas",
          points: [
            `A song about ${f.natural[0]} or a festival.`,
            "A dance that copies work movements (farming, fishing, pounding fufu).",
            `A short play about ${f.issues[0]}.`,
            y ? "A story told with actions and a song in the middle (like anansesem)." : "A dance drama mixing music, dance and acting.",
          ],
        },
        {
          heading: "Steps",
          points: [
            "Choose your idea and message.",
            "Music: write a few lines of words; give them a tune and a rhythm; add instruments.",
            "Dance: make 4 to 8 moves and repeat them in order.",
            "Drama: decide the characters, beginning, middle and end; practise the words and actions.",
            "Practise (rehearse) many times and improve.",
          ],
        },
      ],
      words: [
        ["Compose", "To make up new music."],
        ["Lyrics", "The words of a song."],
        ["Rehearse", "To practise before performing."],
        ["Character", "A person or animal in a story or play."],
      ],
      materials: ["Instruments", "Paper for lyrics or script", "Costumes and props"],
      practical: {
        title: "Our group performance",
        steps: ["In groups, choose one idea.", "Make a short song (4 lines) or a dance (8 moves) or a play (3 scenes).", "Add instruments or props.", "Rehearse three times.", "Perform for the class."],
      },
      quiz: [
        { q: "To make up new music is to…", options: ["compose", "erase", "paint", "carve"], answer: 0 },
        { q: "The words of a song are the…", options: ["lyrics", "props", "labels", "colours"], answer: 0 },
        { q: "To practise before performing is to…", options: ["rehearse", "relax", "repeat a class", "rest"], answer: 0 },
        { q: "A person or animal in a play is a…", options: ["character", "drum", "costume", "stage"], answer: 0 },
      ],
      written: [{ q: "Describe how you would create a short play about an issue in your community.", answer: `Choose the issue (e.g. ${f.issues[0]}); decide the message; create characters; plan the beginning, middle and end; write or agree the words; choose costumes and props; rehearse; perform.` }],
    },
    {
      cls: f.cls,
      code: "2.3.4",
      title: "Performing Arts: planning a performance",
      emoji: "📅",
      intro: y ? "Plan where and when to perform, and who to invite." : "Plan the presentation of your music, dance and drama: venue, programme, roles and audience.",
      sections: [
        {
          heading: "Planning steps",
          diagram: "display-plan",
          points: [
            "Choose the venue: classroom, school compound, assembly ground, church or community centre.",
            "Prepare the space: clean it, arrange seats, mark the performing area.",
            "Make a programme: the order of items (opening song, dance, play, closing).",
            "Share roles: performers, drummers, MC (master of ceremonies), costume and props team, ushers.",
            "Invite the audience: parents, teachers, other classes, elders.",
          ],
        },
      ],
      words: [
        ["Programme", "The order of items in a performance."],
        ["MC", "Master of ceremonies: the person who introduces each item."],
        ["Usher", "A person who shows the audience to their seats."],
        ["Venue", "The place where the performance happens."],
      ],
      materials: ["Paper for the programme and invitations", "Chairs", "Instruments and costumes"],
      practical: {
        title: "Make a programme",
        steps: ["As a class, list the items you will perform.", "Put them in a good order.", "Choose an MC and ushers.", "Write invitations to parents.", "Prepare the venue the day before."],
      },
      quiz: [
        { q: "The person who introduces each item is the…", options: ["MC", "usher", "drummer", "audience"], answer: 0 },
        { q: "The order of items in a performance is the…", options: ["programme", "costume", "rhythm", "label"], answer: 0 },
        { q: "Ushers help the audience to…", options: ["find seats", "sing", "dance", "paint"], answer: 0 },
        { q: "Before the show, the venue should be…", options: ["prepared", "locked", "dirty", "empty forever"], answer: 0 },
      ],
      written: [{ q: "List five things to plan for a class performance.", answer: "Venue; preparing the space; programme (order of items); roles (performers, MC, ushers, costume team); inviting the audience; rehearsals." }],
    },
    {
      cls: f.cls,
      code: "2.3.5",
      title: "Performing Arts: performing and sharing",
      emoji: "🌟",
      intro: y ? "Perform your song, dance or play for an audience and remember what happened." : "Perform your works for an audience and record the event for reporting.",
      sections: [
        {
          heading: "Performing well",
          points: ["Warm up your body and voice.", "Face the audience and speak or sing clearly and loudly.", "Smile and show the feelings of your song or character.", "Work together: start and end together.", "If you make a mistake, keep going."],
        },
        {
          heading: "Recording and reporting",
          text: y ? "Ask a teacher to take photos or a video, or draw a picture of the show. Say what you enjoyed." : "Record the performance (photos, video or notes, with permission) and write a report: what was performed, the audience's response, strengths and what to improve.",
        },
      ],
      words: [
        ["Perform", "To present music, dance or drama to an audience."],
        ["Warm up", "Exercises to prepare the body and voice."],
        ["Stage fright", "Feeling nervous before performing."],
      ],
      materials: ["Instruments and costumes", "Phone camera (optional, with permission)"],
      practical: {
        title: "Show time",
        steps: ["Warm up for 3 minutes.", "Perform your item in the programme.", "Bow when you finish.", "Watch others quietly and clap for them.", "Draw or write about the performance."],
      },
      quiz: [
        { q: "Before performing, we should…", options: ["warm up", "sleep", "eat a lot", "go home"], answer: 0 },
        { q: "When performing, we should face the…", options: ["audience", "wall", "floor", "window"], answer: 0 },
        { q: "If you make a mistake while performing, you should…", options: ["keep going", "stop and cry", "run away", "shout"], answer: 0 },
        { q: "Feeling nervous before performing is…", options: ["stage fright", "stage left", "a costume", "a rhythm"], answer: 0 },
      ],
      written: [{ q: "Give four tips for a good performance.", answer: "Warm up; face the audience; speak/sing clearly and loudly; show feelings; start and end together; keep going after a mistake." }],
    },
    {
      cls: f.cls,
      code: "2.4.6",
      title: "Performing Arts: guidelines for watching performances",
      emoji: "👀",
      intro: y ? "Agree on how to watch performances well and share your feelings kindly." : "Develop guidelines for appreciating and appraising music, dance and drama, and use them to find meaning in performances.",
      sections: [
        {
          heading: y ? "Being a good audience" : "Guidelines for judging performances",
          diagram: "appraisal-guide",
          points: y
            ? ["Watch and listen quietly.", "Clap at the end.", "Say what you saw and heard.", "Say how it made you feel.", "Be kind with your words."]
            : ["Theme and message: what is it about?", "Music: singing in tune, rhythm, instruments, loud and soft.", "Dance: movements, togetherness, use of space, costume.", "Drama: acting, voice, story, props.", "Values: social, aesthetic (beauty), cultural and functional (what it teaches)."],
        },
      ],
      words: [
        ["Appreciate", "To enjoy and understand a performance."],
        ["Appraise", "To judge how good a performance is."],
        ["Message", "What a performance teaches or says."],
        ["In tune", "Singing the right notes."],
      ],
      materials: ["A live or recorded performance", "Notebook"],
      practical: {
        title: "Watch and think",
        steps: ["Agree 4 class rules for watching performances.", "Watch a performance.", "Write: what I saw, what I heard, the message, how I felt.", "Share kindly."],
      },
      quiz: [
        { q: "A good audience watches…", options: ["quietly", "while shouting", "while sleeping", "with backs turned"], answer: 0 },
        { q: "What a performance teaches is its…", options: ["message", "price", "costume", "venue"], answer: 0 },
        { q: "Singing the right notes is singing…", options: ["in tune", "out of time", "too loud", "silently"], answer: 0 },
        { q: "To judge how good a performance is, is to…", options: ["appraise", "applaud only", "ignore", "copy"], answer: 0 },
      ],
      written: [{ q: y ? "How should a good audience behave?" : "List what to consider when appraising a dance or play.", answer: y ? "Watch and listen quietly, clap at the end, and speak kindly about the performance." : "Theme/message; music (tune, rhythm, instruments); movement and use of space; acting and voice; costumes and props; social, aesthetic, cultural and functional values." }],
    },
    {
      cls: f.cls,
      code: "2.4.7",
      title: "Performing Arts: judging performances and suggesting improvements",
      emoji: "📝",
      intro: y ? "Decide what was good about performances and how they can be better." : "Make informed decisions about the value of performances and give reports on how they can be improved.",
      sections: [
        {
          heading: "Deciding the value",
          points: ["Was it enjoyable and beautiful?", "Did it teach a clear message?", "Did it show our culture well?", "Did the group work well together?"],
        },
        {
          heading: "Feedback and improvement",
          text: "Give 'two stars and a wish': two good things and one thing to improve. Groups listen to the feedback and plan how to make the next performance better.",
        },
      ],
      words: [
        ["Feedback", "Comments that help performers improve."],
        ["Strength", "Something done well."],
        ["Weakness", "Something that needs to improve."],
      ],
      materials: ["Notebook", "Recording of your performance (optional)"],
      practical: {
        title: "Review our show",
        steps: ["Watch your recording or remember the show.", "Write two strengths.", "Write one weakness and how to fix it.", "Share with your group.", "Rehearse again with the improvement."],
      },
      quiz: [
        { q: "Something done well is a…", options: ["strength", "weakness", "costume", "prop"], answer: 0 },
        { q: "Something that needs to improve is a…", options: ["weakness", "strength", "song", "venue"], answer: 0 },
        { q: "Comments that help performers improve are…", options: ["feedback", "insults", "noise", "programmes"], answer: 0 },
        { q: "After feedback, a group should…", options: ["practise and improve", "give up", "quarrel", "stop performing"], answer: 0 },
      ],
      written: [{ q: "Write a short review of a performance with two strengths and one improvement.", answer: "Example: The singing was loud and clear, and the dancers moved together. Improvement: the actors should face the audience more." }],
    },
  ];
}

export const PRIMARY: Lesson[] = FOCUS.flatMap((f) => [...vaLessons(f), ...paLessons(f)]);
