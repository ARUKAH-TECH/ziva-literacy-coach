import type { Topic } from "../types";

// JHS 1 (B7): detailed lessons for each content standard. Each topic is a full,
// self-explanatory lesson a learner can read alone.

export const TOPICS_B7: Record<string, Topic[]> = {
  "1.1.1": [
    {
      title: "What is design?",
      emoji: "💡",
      explain: [
        "Design is the planning and arranging of parts to make something that is useful and beautiful. Before a carpenter makes a chair, he thinks: Who will sit on it? How tall should it be? What wood should I use? How should it look? That thinking and planning is design.",
        "Everything around us has a design. Some designs are made by God and nature, like a leaf, a flower, a snail shell or a pineapple. We call these natural designs. Other designs are made by people, like a house, a cup, a school bag or a car. We call these manmade designs.",
        "Design is important because it helps us to solve problems (a bucket carries water), to make things easy and safe to use (a handle on a pot), and to make our homes, clothes and towns beautiful.",
        "A person who plans designs is called a designer. Architects design buildings, fashion designers design clothes, graphic designers design posters and logos, and industrial designers design products like phones and furniture.",
      ],
      examples: [
        ["Natural design", "A pineapple's skin has diamond shapes arranged in a spiral. The arrangement protects the fruit and also looks beautiful."],
        ["Manmade design", "A plastic chair is designed to stack on top of other chairs, so many chairs can be kept in a small space."],
        ["Design solves a problem", "The Veronica bucket has a tap at the bottom, so people can wash their hands under running water even where there is no pipe."],
      ],
      fact: "The word 'design' comes from the Latin word 'designare', which means to mark out or plan.",
      remember: ["Design = planning and arranging parts to make something useful and beautiful.", "Natural designs are made by nature; manmade designs are made by people.", "Design solves problems, makes things easy to use and makes things beautiful."],
      check: [
        { q: "Which of these is a manmade design?", options: ["A snail shell", "A school bag", "A leaf", "A spider's web"], answer: 1 },
        { q: "A person who plans designs is a…", options: ["designer", "farmer", "driver", "patient"], answer: 0 },
      ],
    },
    {
      title: "How nature inspires designers",
      emoji: "🌿",
      explain: [
        "Designers often study nature to get ideas. When people copy ideas from nature to solve problems, it is called biomimicry (bio = life, mimicry = copying).",
        "In Japan, the Shinkansen bullet train made a loud bang when it came out of tunnels. An engineer who watched birds noticed that the kingfisher dives into water with very little splash because of the long, pointed shape of its beak. The front of the train was redesigned to look like the kingfisher's beak. The train became quieter, faster and used less electricity.",
        "Termites build tall anthills that stay cool inside even when it is very hot outside, because air flows through tunnels in the anthill. Architect Mick Pearce used this idea in the Eastgate Building in Harare, Zimbabwe. The building has vents and chimneys that move air the same way, so it uses far less electricity for cooling.",
        "We can compare natural and manmade designs by asking: What is the same (similarities)? What is different (differences)? For example, a river and a road both carry things from place to place and both have branches; but a river is made by nature and carries water, while a road is made by people and carries vehicles.",
      ],
      diagram: "nature-to-design",
      examples: [
        ["River → road", "Both have branches and carry things. Differences: water vs vehicles; nature vs people."],
        ["Anthill → house", "Both give shelter and have rooms or tunnels. Differences: termites vs people; soil and saliva vs blocks and cement."],
        ["Palm leaves → roof and fan", "Palm fronds shed rain and give shade, so people use them for roofs and to make hand fans."],
      ],
      steps: { title: "Compare a natural and a manmade design", items: ["Choose a pair, e.g. a bird's nest and a basket.", "Draw both side by side.", "Write 2 similarities (e.g. both are woven, both hold things).", "Write 2 differences (e.g. who made it, what it is made of).", "Write one new design idea you got from the natural one."] },
      remember: ["Copying ideas from nature is called biomimicry.", "Kingfisher beak → bullet train nose; anthill → Eastgate Building.", "Compare designs by listing similarities and differences."],
      check: [
        { q: "The front of Japan's bullet train copies the beak of the…", options: ["kingfisher", "eagle", "parrot", "hen"], answer: 0 },
        { q: "Copying ideas from nature to solve problems is called…", options: ["biomimicry", "biology", "geography", "pottery"], answer: 0 },
        { q: "The Eastgate Building copies how anthills…", options: ["stay cool", "change colour", "grow taller", "make noise"], answer: 0 },
      ],
    },
    {
      title: "Elements of design: dots, lines and shapes",
      emoji: "✏️",
      explain: [
        "Elements of design are the basic building blocks of every picture or design, just as letters are the building blocks of words. In JHS 1 we study three elements: the dot, the line and the shape.",
        "A dot (or point) is the smallest mark you can make. It has a position but almost no size. Many dots together can form a pattern, show light and dark (stippling), or even make a whole picture. You can see dots in nature: seeds inside a pawpaw, spots on a leopard, stars at night.",
        "A line is the path of a moving dot. Lines can be straight, curved, zigzag, wavy, spiral, thick, thin, broken (dotted), vertical (standing up), horizontal (lying down) or diagonal (slanting). Lines show edges, direction and movement. Horizontal lines feel calm, vertical lines feel strong, and diagonal or zigzag lines feel active or exciting.",
        "A shape is a flat (two-dimensional) area enclosed by a line. Geometric shapes have regular, measurable sides, like circles, squares, triangles and rectangles. Organic (natural) shapes are free and irregular, like leaves, clouds and puddles.",
      ],
      diagram: "elements",
      examples: [
        ["Dots in nature", "Seeds in a pawpaw, spots on a ladybird, sand on the beach."],
        ["Lines in nature", "Veins of a leaf, branches of a tree, stripes of a zebra, cracks in dry mud."],
        ["Shapes around us", "Circle: a coin; triangle: a roof; rectangle: a door; organic: a leaf."],
      ],
      steps: { title: "Make an 'elements' sampler", items: ["Divide a page into three columns: Dots, Lines, Shapes.", "Fill the Dots column with dots of different sizes and spacing.", "Fill the Lines column with at least 6 kinds of lines and label them.", "Fill the Shapes column with 4 geometric and 2 organic shapes.", "Colour your sampler neatly."] },
      remember: ["Elements of design are the building blocks: dot, line, shape (and more later).", "A line is a moving dot; a shape is an area closed by a line.", "Geometric shapes are regular; organic shapes are free and natural."],
      check: [
        { q: "The path of a moving dot is a…", options: ["line", "shape", "colour", "texture"], answer: 0 },
        { q: "A leaf is an example of an… shape.", options: ["organic", "geometric", "square", "triangular"], answer: 0 },
        { q: "Which line usually feels calm and restful?", options: ["Horizontal", "Zigzag", "Diagonal", "Broken"], answer: 0 },
      ],
    },
    {
      title: "Principles of design: balance, rhythm and repetition",
      emoji: "⚖️",
      explain: [
        "Principles of design are the rules or guides for arranging the elements (dots, lines, shapes) so that a design looks good and communicates well. Elements are the ingredients; principles are the recipe.",
        "Balance is the even spread of visual weight in a design, so it does not look like it will fall to one side. Symmetrical (formal) balance means both halves are mirror images, like a butterfly or the front of a church. Asymmetrical (informal) balance uses different parts that still feel even, like a big shape on one side balanced by two small shapes on the other. Radial balance spreads out from a centre, like the petals of a flower, a wheel or an orange cut across.",
        "Rhythm is a feeling of movement created when elements are repeated in an organised way. Your eye 'travels' across the design, just as music has a beat. Waves on the sea, the stripes on kente cloth and a row of palm trees all have rhythm.",
        "Repetition means using the same element again and again. It ties a design together and creates patterns. For example, an Adinkra cloth repeats the same symbol in rows. Repetition creates rhythm, and together they make a design feel unified.",
      ],
      diagram: "principles",
      examples: [
        ["Symmetrical balance", "A butterfly, a human face, the national coat of arms."],
        ["Radial balance", "A sunflower, a bicycle wheel, a round basket woven from the centre."],
        ["Rhythm and repetition", "Kente strips, a fence of posts, footprints in sand, a row of desks."],
      ],
      steps: { title: "Design a symmetrical pattern", items: ["Fold a paper in half and open it.", "Draw a design using lines and shapes on one half only.", "Fold again and rub hard with a coin so the pencil prints on the other half (or copy it carefully).", "Repeat the design in a row to add rhythm.", "Colour both halves with the same colours to keep the balance."] },
      remember: ["Principles guide how elements are arranged.", "Balance: symmetrical, asymmetrical and radial.", "Rhythm = organised movement; repetition = using the same element again."],
      check: [
        { q: "Both halves of a butterfly are the same. This is…", options: ["symmetrical balance", "asymmetrical balance", "rhythm", "texture"], answer: 0 },
        { q: "Petals spreading out from the centre of a flower show…", options: ["radial balance", "repetition only", "contrast", "proportion"], answer: 0 },
        { q: "Using the same shape again and again is called…", options: ["repetition", "emphasis", "perspective", "value"], answer: 0 },
      ],
    },
  ],
  "1.2.1": [
    {
      title: "Drawing tools and how to use them",
      emoji: "📐",
      explain: [
        "Good drawings need the right tools. Manual tools are used by hand; digital tools are used on phones, tablets and computers.",
        "Pencils are graded by hardness. 'H' means hard: H pencils make light, thin lines and are good for technical drawing and outlines. 'B' means black (soft): B pencils make dark lines and are good for shading. HB is in the middle and is good for writing and sketching. The higher the number, the harder (H) or softer (B) the pencil, so 4B is darker than 2B.",
        "The T-square slides along the left edge of a drawing board to draw horizontal lines. Set squares (45° and 30°/60°) rest on the T-square to draw vertical and slanting lines. A protractor measures and draws angles. A pair of compasses draws circles and arcs. A ruler measures length and draws straight lines. An eraser removes mistakes, and a sharpener keeps pencils pointed.",
        "Digital tools include drawing apps on phones and tablets and free computer programs. They have tools for lines, shapes, colour fill, shading (gradients), undo and layers. Digital drawings can be saved, shared and corrected easily.",
      ],
      diagram: "drawing-tools",
      examples: [
        ["Choosing a pencil", "Use H or HB for a neat outline of a box; use 2B–4B to shade its dark side."],
        ["Using compasses", "Set the compasses to 3 cm, put the point on the paper, and turn the top to draw a circle of radius 3 cm."],
      ],
      steps: { title: "Taking care of your tools", items: ["Keep pencils sharp but don't break the lead.", "Keep set squares and rulers clean so they don't smudge.", "Close compasses and keep the point covered.", "Store tools in a pencil case or box.", "Charge and protect phones/tablets used for digital drawing."] },
      remember: ["H = hard and light; B = soft and dark; HB = in between.", "T-square for horizontal lines; set squares for vertical and angled lines.", "Compasses for circles; protractor for angles."],
      check: [
        { q: "Which pencil is darkest?", options: ["4B", "2H", "HB", "H"], answer: 0 },
        { q: "Which tool draws circles?", options: ["Pair of compasses", "T-square", "Eraser", "Sharpener"], answer: 0 },
      ],
    },
    {
      title: "Outline and freehand drawing of shapes and forms",
      emoji: "✍️",
      explain: [
        "An outline drawing shows only the outer edge of an object, like a silhouette drawn with a line. It has no shading. Outlines help us show the shape clearly.",
        "Freehand drawing is drawing without rulers or instruments, using only your hand and eye. Artists use freehand drawing to sketch ideas quickly.",
        "A shape is flat (2-D) with only length and width: circle, square, triangle. A form is solid (3-D) with length, width and depth: sphere (ball), cube (box), cylinder (tin), cone (ice-cream cone), pyramid. Every form is built on a shape: a sphere is built on a circle, a cube on a square, a cylinder on rectangles and circles.",
        "Tip for good drawing: always start with light lines. Draw the big basic shapes first, check the sizes, then add details, and only then press harder for the final lines.",
      ],
      steps: { title: "Draw a cup freehand", items: ["Look at the cup carefully.", "Lightly draw an oval for the top opening.", "Draw two lines down for the sides.", "Draw a curved bottom that matches the oval.", "Add the handle as a 'C' shape on the side.", "Rub out extra lines and darken the outline."] },
      examples: [
        ["Shape vs form", "A drawn circle is a shape; a football is a form (sphere)."],
        ["Forms around us", "Cube: a box of chalk; cylinder: a Milo tin; cone: a funnel."],
      ],
      remember: ["Outline = edge only, no shading.", "Freehand = without instruments.", "Shape is 2-D (flat); form is 3-D (solid)."],
      check: [
        { q: "A tin of milk is shaped like a…", options: ["cylinder", "cube", "cone", "pyramid"], answer: 0 },
        { q: "Drawing without instruments is…", options: ["freehand drawing", "technical drawing", "printing", "tracing"], answer: 0 },
      ],
    },
    {
      title: "Shading: making drawings look solid",
      emoji: "🌓",
      explain: [
        "Shading means using light and dark tones to show where light falls on an object. It makes a flat drawing look solid and real.",
        "First decide where the light is coming from. The side facing the light is the lightest (the highlight). The side turned away from the light is darker (the shadow). The object also throws a cast shadow on the surface it stands on, on the side away from the light.",
        "There are four common shading techniques. Hatching: draw lines close together in one direction; closer lines look darker. Cross-hatching: draw a second layer of lines across the first; more layers look darker. Stippling: use dots; many dots close together look dark, few dots look light. Blending (smudging): shade softly and rub gently with paper or a finger to make smooth tones.",
        "A tonal scale is a strip of boxes going from white through greys to black. Practising a tonal scale helps you control how hard you press your pencil.",
      ],
      diagram: "shading",
      steps: { title: "Shade a ball", items: ["Draw a circle lightly.", "Draw a small arrow showing where light comes from (e.g. top left).", "Leave a small white spot near the light (highlight).", "Shade gradually darker as you move away from the light.", "Draw an oval cast shadow on the ground on the opposite side.", "Blend gently to make it smooth."] },
      remember: ["Find the light source first.", "Highlight (light side), shadow (dark side), cast shadow (on the ground).", "Techniques: hatching, cross-hatching, stippling, blending."],
      check: [
        { q: "The brightest spot on a shaded ball is the…", options: ["highlight", "cast shadow", "outline", "background"], answer: 0 },
        { q: "Shading with dots is called…", options: ["stippling", "hatching", "blending", "cross-hatching"], answer: 0 },
      ],
    },
    {
      title: "Colouring and colour mixing",
      emoji: "🎨",
      explain: [
        "Colour makes designs lively and helps to send messages: red for danger or love, green for growth, gold for wealth.",
        "The primary colours are red, yellow and blue. They are called primary because they cannot be made by mixing other colours, but they can be mixed to make many others.",
        "Secondary colours are made by mixing two primary colours in equal amounts: red + yellow = orange; yellow + blue = green; blue + red = violet (purple).",
        "When colouring with pencils or crayons, colour in one direction, press lightly first and build up, and stay inside the outline. When painting, mix colours on a palette, use a clean brush for each colour, and wash brushes after use.",
      ],
      diagram: "colour-wheel",
      steps: { title: "Make a simple colour wheel", items: ["Draw a circle and divide it into 6 equal parts.", "Paint red, yellow and blue in alternate parts.", "Mix red + yellow and paint orange between them.", "Mix yellow + blue for green; blue + red for violet.", "Label each colour as primary or secondary."] },
      remember: ["Primary: red, yellow, blue.", "Secondary: orange, green, violet.", "Colour neatly in one direction and stay inside the lines."],
      check: [
        { q: "Blue + red makes…", options: ["violet", "green", "orange", "brown"], answer: 0 },
        { q: "Which is a primary colour?", options: ["Yellow", "Green", "Orange", "Violet"], answer: 0 },
      ],
    },
    {
      title: "Making models from templates",
      emoji: "📦",
      explain: [
        "A model is a three-dimensional (3-D) copy of an object, often smaller than the real thing, used to show an idea. Designers make models before making the real product.",
        "A template (net) is a flat pattern that can be cut out and folded to make a 3-D form. For example, the net of a cube is six equal squares joined in a cross shape. Glue flaps are added to some edges so the faces can be stuck together.",
        "Models can also be made from clay (by rolling, pinching and pressing), from paper pulp (papier-mâché) pressed over a mould, or from Styrofoam cut with care.",
        "Display your drawings, templates and models together so people can see how your idea grew from a flat drawing to a solid model.",
      ],
      steps: { title: "Make a cube from cardboard", items: ["Draw six 5 cm squares in a cross shape on cardboard.", "Add 1 cm glue flaps on the edges that will join.", "Cut round the outside.", "Score (lightly press) and fold all inside lines.", "Glue the flaps and hold until dry.", "Decorate with a pattern."] },
      remember: ["A model is a 3-D copy used to show an idea.", "A template/net is a flat pattern that folds into a form.", "Models can be made from card, clay, paper pulp or Styrofoam."],
      check: [
        { q: "How many squares are in the net of a cube?", options: ["6", "4", "8", "5"], answer: 0 },
        { q: "A flat pattern that folds into a 3-D form is a…", options: ["template (net)", "texture", "tonal scale", "palette"], answer: 0 },
      ],
    },
  ],
  "1.3.1": [
    {
      title: "Creativity and innovation",
      emoji: "💡",
      explain: [
        "Creativity is the ability to think of new and original ideas or new ways of doing things. Everyone can be creative: a child who turns a tin into a toy car is being creative.",
        "Innovation is turning a creative idea into something real and useful that people can use, or improving something that already exists so it works better.",
        "So creativity is the idea; innovation is putting the idea to work. For example, imagining a chair with wheels for a person who cannot walk is creativity; building a strong, safe wheelchair that people actually use is innovation.",
        "Many innovations solve problems in health and daily life: prosthetic (artificial) limbs help people who have lost arms or legs; wheelchairs help people move; hearing aids help people hear; mobile money helps people send money without banks.",
      ],
      examples: [
        ["Health", "Prosthetic leg: helps a person who lost a leg to walk again."],
        ["Mobility", "Wheelchair: helps people who cannot walk to move around."],
        ["Daily life in Ghana", "Veronica bucket for handwashing; mobile money for payments."],
      ],
      remember: ["Creativity = new ideas.", "Innovation = turning ideas into useful products or improving old ones.", "Innovations solve real problems in society."],
      check: [
        { q: "Building a working product from an idea is…", options: ["innovation", "creativity only", "copying", "drawing"], answer: 0 },
        { q: "A hearing aid helps people who…", options: ["cannot hear well", "cannot see", "cannot walk", "cannot read"], answer: 0 },
      ],
    },
    {
      title: "The design process step by step",
      emoji: "🔁",
      explain: [
        "The design process is a series of steps designers follow to solve problems. It helps you think clearly and not forget anything important.",
        "1. Define: say exactly what the problem is and who has it. 2. Brief: write a short statement of what you will design, who it is for and any limits (cost, size, materials). 3. Research: collect information: ask users, look at existing solutions, measure things. 4. Ideation: think of many different ideas and sketch them. 5. Invent: choose the best idea and develop it in detail with measurements. 6. Prototype: make a first model to try out. 7. Testing: try the prototype and record what works and what does not. 8. Refine: improve the design using what you learned, then present it.",
        "Designers often go back to earlier steps. If testing shows a problem, you go back, change the idea and test again. This is normal and is how good products are made.",
      ],
      diagram: "design-process",
      examples: [["Problem: pencils keep rolling off desks", "Brief: 'Design a pencil holder for JHS 1 desks that costs nothing and uses waste materials.' Ideas: a cut plastic bottle, a cardboard box, a bamboo tube. Prototype: bottle holder. Test: it falls over → refine: add a heavy base of stones."]],
      remember: ["Define → Brief → Research → Ideation → Invent → Prototype → Testing → Refine.", "A design brief says what, for whom and the limits.", "Testing and refining make the design better."],
      check: [
        { q: "Which step comes first?", options: ["Define", "Prototype", "Testing", "Refine"], answer: 0 },
        { q: "Producing many different ideas is…", options: ["ideation", "testing", "refining", "defining"], answer: 0 },
      ],
    },
    {
      title: "Designing a solution for your community",
      emoji: "🏘️",
      explain: [
        "Look around your community for problems that design can solve: rubbish everywhere, no place to wash hands, heavy loads to carry, flooding gutters, dark paths at night.",
        "Examine artefacts (things people use) in the community and ask: What problem does it solve? What is difficult about it? How could it be improved? This is called evaluating a design.",
        "Then use the design process to create your own model that solves a problem. Use available manual and digital tools, local and waste materials. Display your idea and model, explain it, and listen to feedback.",
      ],
      steps: { title: "Community design project", items: ["Walk around and list 3 problems.", "Choose one and write a design brief.", "Ask 3 people affected for their ideas.", "Sketch 3 solutions and choose one.", "Build a prototype from waste materials.", "Test it, improve it and display it with a short explanation."] },
      remember: ["Good design starts with a real problem.", "Evaluate existing artefacts before designing.", "Display your prototype and use feedback to improve it."],
      check: [
        { q: "Judging how well an existing product works is…", options: ["evaluating", "ignoring", "decorating", "printing"], answer: 0 },
        { q: "A first model made to test an idea is a…", options: ["prototype", "portfolio", "pattern", "palette"], answer: 0 },
      ],
    },
  ],
  "2.1.1": [
    {
      title: "Tools and materials for still life, modelling and patterns",
      emoji: "🧰",
      explain: [
        "Before making artworks, you must know the nature (what it is like) and use of each tool and material.",
        "For still-life drawing and shading you need drawing paper, pencils (HB, 2B, 4B, 6B), charcoal, an eraser, a drawing board and objects to draw. For modelling you need clay or paper pulp, water, a modelling board, modelling tools (wire cutter, wooden spatula, loop tool), a sponge and polythene to keep work moist. For pattern making you need paper or cloth, poster colours or dyes, brushes, sponges, straws, string, crayons, candles and printing blocks.",
        "Techniques are the methods used: shading techniques for drawing; pinching, coiling, slab and modelling for clay; dabbing, printing, spattering, marbling and wax resist for patterns.",
      ],
      remember: ["Know what each tool is and what it is used for.", "Drawing: pencils, charcoal, eraser, board.", "Modelling: clay/pulp, modelling tools, water, polythene."],
      check: [
        { q: "Which tool is used to cut clay?", options: ["Wire cutter", "Crayon", "Straw", "Sponge"], answer: 0 },
        { q: "Polythene is used in modelling to…", options: ["keep clay moist", "colour clay", "cut clay", "fire clay"], answer: 0 },
      ],
    },
    {
      title: "Still-life drawing and shading",
      emoji: "🍍",
      explain: [
        "A still life is a drawing or painting of objects that do not move, such as fruits, pots, bottles, calabashes, books and cloth, arranged on a table.",
        "Arranging (composing) the objects well is important: use objects of different sizes and shapes, let some overlap (one in front of another), and place them so they are not in one straight line. Put a cloth under them to add folds and interest.",
        "When drawing, look at the whole group first. Compare sizes (proportion): is the bottle twice as tall as the orange? Draw the big shapes lightly, then add details. Finally shade: find the light source, shade the dark sides, add cast shadows, and leave highlights.",
      ],
      diagram: "still-life",
      steps: { title: "Draw a still life", items: ["Arrange 3 objects (e.g. a bottle, an orange, a cup) on a cloth.", "Sit where you can see all of them.", "Lightly sketch the basic shapes, checking their sizes against each other.", "Correct the shapes and add details like labels or handles.", "Shade using hatching or blending: light side, dark side, cast shadow.", "Sign and date your drawing."] },
      remember: ["Still life = objects that don't move.", "Arrange objects of different sizes, overlapping, not in a line.", "Sketch lightly, compare sizes, then shade."],
      check: [
        { q: "A drawing of a bottle and fruits on a table is a…", options: ["still life", "landscape", "portrait", "mural"], answer: 0 },
        { q: "Placing one object partly in front of another is…", options: ["overlapping", "blending", "printing", "weaving"], answer: 0 },
      ],
    },
    {
      title: "Preparing clay and paper pulp for modelling",
      emoji: "🏺",
      explain: [
        "Clay is a fine, sticky earth found near rivers and swamps. When wet it can be shaped; when dried and fired it becomes hard. Clay must be prepared well, or the work will crack.",
        "Preparing clay: 1. Win (dig) the clay. 2. Soak it in water until soft. 3. Sieve it to remove stones, roots and sand. 4. Dry it until it is firm but still soft (leather-hard is too dry). 5. Wedge or knead it: cut, slam and fold the clay many times to remove air bubbles and make it smooth, because trapped air can make work burst when fired. 6. Test it: roll a coil and bend it into a ring. If it does not crack, the clay is plastic and ready. 7. Store it wrapped in polythene.",
        "Preparing paper pulp (papier-mâché): tear old newspapers into small pieces, soak them in water for a day, pound or blend them into a soft pulp, squeeze out extra water, then mix with glue or cooked starch (cassava or flour paste). Use it to model masks, bowls, fruits or animals, and let it dry well before painting.",
      ],
      diagram: "clay-steps",
      remember: ["Clay: win, soak, sieve, dry, wedge, test, store.", "Wedging removes air bubbles.", "Paper pulp = soaked mashed paper + glue or starch."],
      check: [
        { q: "Why do we wedge clay?", options: ["To remove air bubbles", "To colour it", "To make it wet", "To dry it"], answer: 0 },
        { q: "Papier-mâché is made from…", options: ["paper and glue/starch", "clay and sand", "wood and nails", "wax and string"], answer: 0 },
      ],
    },
    {
      title: "Pattern-making techniques",
      emoji: "🌀",
      explain: [
        "A pattern is a design made by repeating lines, shapes, colours or marks. Patterns decorate cloth, walls, pots, baskets and books.",
        "Techniques: Dabbing/sponging: press a sponge or crumpled cloth with paint onto paper. Direct printing: dip an object (leaf, cut okra, bottle top) in paint and press it. Relief printing: print from a raised surface carved on a block. Blowing: blow a drop of paint with a straw to spread it. Spattering/spraying: flick paint from a toothbrush across paper. Stippling: make many dots. Marbling: float oil paint on water, swirl it and lay paper on top. String pulling: put a painted string inside folded paper and pull it out. Wax resist/crayon batik: draw with wax or crayon, then paint watery colour over it; the wax resists the paint. Rubbing: place paper on a textured surface and rub with a crayon.",
        "When you display your patterns, talk about them with art words, for example: 'The use of dabbing was effective in creating a pattern' or 'The colours are bright and the repetition creates rhythm.'",
      ],
      diagram: "pattern-techniques",
      steps: { title: "Make a string-pull pattern", items: ["Fold a sheet of paper in half and open it.", "Dip a string in thick paint, leaving one end clean.", "Lay the painted string in a curvy line on one half, with the clean end hanging out.", "Close the paper and press gently with one hand.", "Pull the string out slowly while pressing.", "Open to see your mirror pattern."] },
      remember: ["A pattern repeats marks, shapes or colours.", "Techniques include dabbing, printing, blowing, spattering, marbling, string pulling, wax resist.", "Describe your work using art words."],
      check: [
        { q: "Floating paint on water and laying paper on it is…", options: ["marbling", "stippling", "dabbing", "rubbing"], answer: 0 },
        { q: "Wax resist works because wax…", options: ["blocks the water paint", "absorbs paint", "is colourful", "is sticky"], answer: 0 },
      ],
    },
  ],
  "2.1.2": [
    {
      title: "The major scale, solfa and Curwen hand signs",
      emoji: "🎶",
      explain: [
        "A scale is a set of musical notes arranged in order of pitch, going up (ascending) or down (descending) step by step. The diatonic major scale has eight notes from one doh to the next doh, called an octave.",
        "In solfa we name the notes: doh, ray, me, fah, soh, lah, te, doh'. The little mark on doh' shows it is the higher doh.",
        "John Curwen, an English teacher, created hand signs so that singers can see each note. doh: a closed fist. ray: flat hand slanting upwards. me: flat hand held level, palm down. fah: fist with the thumb pointing down. soh: flat hand facing you, palm towards your chest. lah: relaxed hand drooping down. te: index finger pointing up. doh': fist held higher.",
        "Practise singing the scale slowly, up and down, with the hand signs. Sing in tune: listen to the note before you sing it.",
      ],
      diagram: "solfa-scale",
      remember: ["The major scale has 8 notes: d r m f s l t d'.", "Ascending = going up; descending = going down.", "Curwen hand signs show each note with the hand."],
      check: [
        { q: "Which note comes after 'me'?", options: ["fah", "soh", "ray", "lah"], answer: 0 },
        { q: "In Curwen hand signs, a closed fist is…", options: ["doh", "te", "lah", "me"], answer: 0 },
      ],
    },
    {
      title: "Letter names on the treble stave (C major)",
      emoji: "🎼",
      explain: [
        "Music is written on a stave (staff): five lines and four spaces. Notes higher on the stave sound higher.",
        "The treble clef (G clef) sign at the start of the stave curls around the second line from the bottom, which is the note G. It is used for higher voices and instruments.",
        "Music uses seven letter names: A B C D E F G, then they repeat. In the key of C major, doh is C. So: doh = C, ray = D, me = E, fah = F, soh = G, lah = A, te = B, doh' = C.",
        "On the treble stave: middle C sits on a short extra line below the stave (a ledger line); D hangs just below the bottom line; E is on the bottom line; F is in the first space; G is on the second line; A is in the second space; B is on the middle line; C' is in the third space.",
        "To remember the lines (bottom to top) say 'Every Good Boy Deserves Fruit' (E G B D F). The spaces spell FACE.",
      ],
      remember: ["Stave = 5 lines and 4 spaces.", "C major: d r m f s l t d' = C D E F G A B C'.", "Lines: E G B D F; spaces: F A C E."],
      check: [
        { q: "In C major, 'soh' is…", options: ["G", "E", "A", "F"], answer: 0 },
        { q: "The spaces of the treble stave spell…", options: ["FACE", "EGBDF", "CAGE", "BEAD"], answer: 0 },
      ],
    },
    {
      title: "Note values and rhythm",
      emoji: "⏱️",
      explain: [
        "Notes have different lengths (durations). We count them in beats. In most school songs the crotchet is one beat.",
        "Semibreve (whole note): an open oval with no stem = 4 beats. Minim (half note): an open oval with a stem = 2 beats. Crotchet (quarter note): a filled oval with a stem = 1 beat. Quaver (eighth note): a filled oval with a stem and one tail (flag) = ½ beat. Semiquaver (sixteenth note): two tails = ¼ beat.",
        "Relationships: 1 semibreve = 2 minims = 4 crotchets = 8 quavers = 16 semiquavers. Two quavers are often joined by a beam and are counted 'ta-te' together as one beat.",
        "Practise by clapping. Say 'ta' for a crotchet, 'ta-a' for a minim, 'ta-a-a-a' for a semibreve and 'ta-te' for two quavers.",
      ],
      diagram: "note-values",
      remember: ["Semibreve 4, minim 2, crotchet 1, quaver ½, semiquaver ¼.", "1 semibreve = 4 crotchets.", "Clap and count to learn rhythms."],
      check: [
        { q: "How many minims make a semibreve?", options: ["2", "4", "1", "8"], answer: 0 },
        { q: "A quaver is worth…", options: ["½ beat", "1 beat", "2 beats", "4 beats"], answer: 0 },
      ],
    },
    {
      title: "Time signatures and conducting",
      emoji: "🎼",
      explain: [
        "Music is divided into bars (measures) by bar lines. The time signature, two numbers at the start of the music, tells us how the beats are grouped. The top number says how many beats are in each bar; the bottom number says what kind of note gets one beat (4 = crotchet).",
        "Simple duple time (2/4): two crotchet beats per bar, strong–weak, like a march. Simple triple time (3/4): three crotchet beats, strong–weak–weak, like a waltz. Simple quadruple time (4/4): four crotchet beats, strong–weak–medium–weak; it is the most common.",
        "A conductor leads a choir or band with hand patterns so everyone keeps the same beat. Beat 1 is always a downward movement. 2/4: down–up. 3/4: down–out (to the right)–up. 4/4: down–in (to the left)–out (to the right)–up.",
      ],
      diagram: "conducting",
      steps: { title: "Conduct a song", items: ["Choose a song you know well.", "Clap and find the strong beat.", "Count the beats between strong beats to find 2, 3 or 4.", "Use the right conducting pattern with your right hand.", "Lead your group and keep a steady tempo."] },
      remember: ["Top number = beats per bar; bottom 4 = crotchet beats.", "2/4 down–up; 3/4 down–out–up; 4/4 down–in–out–up.", "Beat 1 always goes down."],
      check: [
        { q: "In 3/4 time there are how many beats per bar?", options: ["3", "2", "4", "6"], answer: 0 },
        { q: "The pattern down–in–out–up is for…", options: ["4/4", "2/4", "3/4", "6/8"], answer: 0 },
      ],
    },
  ],
  "2.1.3": [
    {
      title: "Warm-ups, games and Ghanaian body movements",
      emoji: "🤸",
      explain: [
        "Before dancing or acting, performers warm up to prepare the body and prevent injuries: march on the spot, stretch arms and legs, roll shoulders, bend gently and breathe deeply.",
        "Ghanaian rhythmic games such as ampe, pilolo and stone-passing songs build a sense of rhythm, timing and teamwork, which performers need.",
        "Body movements are of two kinds. Locomotor movements carry you from place to place: walking, running, hopping, skipping, leaping, sliding. Non-locomotor movements are done in one place: bending, stretching, twisting, swinging, shaking, rising and sinking.",
        "Dancers also use levels: high (on tiptoe, arms up), middle (normal standing) and low (kneeling or crouching). Many Ghanaian dances use bent knees, a slightly forward body, and expressive hands and feet.",
      ],
      remember: ["Always warm up first.", "Locomotor = travelling; non-locomotor = on the spot.", "Levels: high, middle, low."],
      check: [
        { q: "Which is a non-locomotor movement?", options: ["Twisting", "Running", "Skipping", "Hopping"], answer: 0 },
        { q: "Warming up helps to…", options: ["prevent injuries", "make you tired", "end the show", "change costume"], answer: 0 },
      ],
    },
    {
      title: "Using the voice: speech and song",
      emoji: "🗣️",
      explain: [
        "The voice is an instrument for actors and singers. In singing, voices are grouped by how high or low they are: soprano (highest female), alto (lower female), tenor (higher male) and bass (lowest male). Children's unchanged voices are called treble.",
        "Voice projection means making your voice reach the back of the audience clearly without shouting. Breathe deeply from your stomach (diaphragm), open your mouth well, stand tall, and face the audience.",
        "Diction is clear pronunciation of words. Actors also change pitch (high/low), pace (fast/slow), pause (short silences) and volume (loud/soft) to show feelings: a whisper for secrets, a fast high voice for excitement, a slow low voice for sadness.",
      ],
      remember: ["Voice types: soprano, alto, tenor, bass (children: treble).", "Projection = voice reaches everyone without shouting.", "Use pitch, pace, pause and volume to show feeling."],
      check: [
        { q: "The lowest male voice is…", options: ["bass", "tenor", "alto", "soprano"], answer: 0 },
        { q: "Clear pronunciation of words is…", options: ["diction", "tempo", "posture", "rhythm"], answer: 0 },
      ],
    },
    {
      title: "Facial expressions, gestures and the performance space",
      emoji: "🎭",
      explain: [
        "Performers communicate with their faces and bodies, not only with words. Facial expressions show feelings: smiling (joy), frowning (anger), wide eyes and open mouth (surprise or fear), lowered eyes (sadness or shame).",
        "Gestures are movements of the hands, arms or head that send messages: waving (greeting), pointing (direction), hands on the head (sorrow, common at funerals in Ghana), clapping (approval). In Adowa, hand gestures tell stories and proverbs.",
        "Posture is how you hold your body: standing tall shows confidence; bent shoulders show weakness or old age.",
        "The traditional Ghanaian performance space is usually an open circle or semi-circle (arena), with drummers on one side and the audience around, so everyone can see and join in. Modern theatres often use a proscenium stage, where the audience sits in front of the stage only.",
      ],
      steps: { title: "Freeze-frame feelings", items: ["In groups, choose a feeling: joy, fear, anger or sorrow.", "Make a frozen picture (tableau) showing it with faces and bodies.", "Add one gesture each.", "Unfreeze and say one line with the right voice.", "Others guess the feeling."] },
      remember: ["Faces show feelings; gestures send messages.", "Posture shows character.", "Traditional space: circle/arena; modern: proscenium stage."],
      check: [
        { q: "Placing both hands on the head in many Ghanaian cultures shows…", options: ["sorrow", "joy", "hunger", "victory"], answer: 0 },
        { q: "A frozen picture made by actors is a…", options: ["tableau", "costume", "script", "venue"], answer: 0 },
      ],
    },
  ],
  "2.2.1": [
    {
      title: "Getting ideas from your community's history and culture",
      emoji: "🔍",
      explain: [
        "Artists get ideas by observing and recording. Draw or photograph local buildings, people at work, schools, landscapes, sculptures, signboards, textiles, baskets, jewellery and leatherwork.",
        "Ask elders and resource persons about the history of your town: who founded it, the chiefs, festivals, wars, crafts and taboos. Write short notes beside your sketches.",
        "Keep all your sketches and notes in a sketchbook. This collection of ideas will help you plan artworks that tell the story of your people.",
      ],
      remember: ["Observe, sketch, photograph and ask questions.", "Record history: founders, chiefs, festivals, crafts.", "Keep ideas in a sketchbook."],
      check: [
        { q: "A book where artists keep sketches and ideas is a…", options: ["sketchbook", "cashbook", "hymn book", "logbook"], answer: 0 },
        { q: "A person in the community who knows its history is a…", options: ["resource person", "visitor", "tourist only", "customer"], answer: 0 },
      ],
    },
    {
      title: "Making 2-D and 3-D artworks with the design process",
      emoji: "🖌️",
      explain: [
        "2-D (two-dimensional) artworks are flat: drawings, paintings, posters, landscapes, repeat patterns, prints. 3-D artworks have depth and can be seen from all sides: sculptures, pottery, baskets, models.",
        "Use the design process: define what your artwork will say (e.g. 'the founding of our town' or 'keep our market clean'), research, sketch several ideas, choose one, make it, check it and improve it.",
        "Artworks can help solve social, cultural and historical problems: a poster can teach sanitation, a painting can preserve the story of a festival, a sculpture can honour a hero.",
      ],
      remember: ["2-D = flat; 3-D = has depth.", "Use the design process to plan artworks.", "Art can teach, preserve history and honour people."],
      check: [
        { q: "Which is a 3-D artwork?", options: ["A clay pot", "A poster", "A painting", "A drawing"], answer: 0 },
        { q: "A poster on keeping the market clean addresses a…", options: ["social problem", "music problem", "maths problem", "weather problem"], answer: 0 },
      ],
    },
    {
      title: "Portfolios and planning an exhibition",
      emoji: "🗂️",
      explain: [
        "A portfolio is a folder or file where an artist keeps finished works and sketches, each labelled with title and date. It shows your progress and is used when applying to schools or jobs.",
        "An exhibition is a public display of artworks. Plan it in steps: choose a theme and title; select the best works and group them; choose and prepare a venue (classroom, hall, community centre); mount the works neatly at eye level with labels (title, artist, class, medium); publicise and invite the audience; provide a visitors' book.",
        "After the exhibition, read the comments, discuss what went well and what to improve, and refine your works.",
      ],
      diagram: "display-plan",
      remember: ["Portfolio = organised collection of your works.", "Plan: theme, select, venue, mount, label, invite.", "Use visitors' comments to improve."],
      check: [
        { q: "Artworks should be hung at…", options: ["eye level", "floor level", "ceiling level", "any level"], answer: 0 },
        { q: "A label normally includes the title and the…", options: ["artist's name", "weather", "price only", "teacher's age"], answer: 0 },
      ],
    },
    {
      title: "Appreciation and appraisal of artworks",
      emoji: "🧐",
      explain: [
        "Appreciation means looking carefully at an artwork to understand and enjoy it. Appraisal means judging its quality and value. Use four steps.",
        "1. Describe: What do you see? Name the subject, colours, materials and size. 2. Analyse: How are the elements (lines, shapes, colours) and principles (balance, rhythm) used? 3. Interpret: What does it mean? What feeling or message does it give? What does it say about history and culture? 4. Judge: Is it beautiful and useful? What are its strengths? What can be improved?",
        "Always give supportive feedback: start with strengths, then suggest improvements politely.",
      ],
      diagram: "appraisal-guide",
      remember: ["Describe → Analyse → Interpret → Judge.", "Appreciate = understand and enjoy; appraise = judge.", "Be kind and specific in feedback."],
      check: [
        { q: "In which step do you explain the meaning of an artwork?", options: ["Interpret", "Describe", "Analyse", "Judge"], answer: 0 },
        { q: "Judging the quality of an artwork is…", options: ["appraisal", "mounting", "framing", "printing"], answer: 0 },
      ],
    },
  ],
  "2.2.2": [
    {
      title: "Indigenous music of our communities",
      emoji: "🥁",
      explain: [
        "Indigenous music is the traditional music of a people, passed down from generation to generation. It is performed at festivals, funerals, naming ceremonies, work, worship and play.",
        "Examples in Ghana: Adowa and Kete (Akan), Kpanlogo and Adaawe (Ga), Agbadza and Borborbor (Ewe), Takai and Bamaya (Dagomba), Bawa (Dagaaba), Apatampa (Fante), Klama (Krobo).",
        "Indigenous music expresses moods (joy, sorrow, praise), tells stories, teaches values and keeps history alive. Find out from elders: when is it performed, who performs it, what instruments are used, and what the songs are about.",
      ],
      remember: ["Indigenous music = traditional music of a people.", "It is used at festivals, funerals, work, worship and play.", "It teaches values and preserves history."],
      check: [
        { q: "Kpanlogo comes from the…", options: ["Ga", "Ewe", "Akan", "Dagomba"], answer: 0 },
        { q: "Bawa is performed by the…", options: ["Dagaaba", "Fante", "Ga", "Ewe"], answer: 0 },
      ],
    },
    {
      title: "Planning, rehearsing and recording a performance",
      emoji: "📋",
      explain: [
        "A rehearsal plan helps a group prepare well. It lists the piece to perform, roles (lead singer/cantor, chorus, drummers, bell player, dancers, costume team), the time for each activity, the venue and the date.",
        "Rehearse in parts: learn the song first, then the drum and bell patterns, then the dance, then put everything together. Record a rehearsal on a phone if possible and watch it to see what to improve.",
        "On the performance day, warm up, check instruments and costumes, and perform with confidence.",
      ],
      remember: ["A rehearsal plan lists roles, time, venue and date.", "Rehearse parts, then put them together.", "Record and watch rehearsals to improve."],
      check: [
        { q: "The lead singer in a traditional group is the…", options: ["cantor", "curator", "usher", "critic"], answer: 0 },
        { q: "Practice before a performance is a…", options: ["rehearsal", "festival", "funeral", "exhibition"], answer: 0 },
      ],
    },
    {
      title: "Appraising musical works",
      emoji: "📝",
      explain: [
        "After the performance, watch the recording and write an aesthetic appreciation report. 'Aesthetic' is about beauty and how something makes us feel.",
        "Comment on: the song (words and message), singing (in tune, together, clear words), instruments (correct patterns, steady beat), dance and costume, audience reaction, strengths and areas to improve.",
        "Use the feedback to refine your work, then present your findings to the class.",
      ],
      remember: ["Aesthetic = beauty and feeling.", "Report on song, singing, instruments, dance, costume, audience.", "Refine using feedback."],
      check: [
        { q: "An aesthetic report talks about…", options: ["beauty and feeling", "prices", "weather", "sports scores"], answer: 0 },
        { q: "After appraisal, the group should…", options: ["refine the work", "stop singing", "hide the recording", "argue"], answer: 0 },
      ],
    },
  ],
  "2.2.3": [
    {
      title: "Creating a drama skit",
      emoji: "📜",
      explain: [
        "A skit is a short, simple play. Choose a story from your community: how your town was founded, a festival, a folk tale or a current issue.",
        "Every good story has a plot (the order of events): a beginning that introduces the characters and setting; a middle with a problem or conflict; and an end where the problem is solved (resolution).",
        "Decide the characters and write short, natural dialogue (what the characters say). Choose costumes and props that fit the culture, such as kente, smock, beads, calabash, stool or pot.",
      ],
      remember: ["Skit = short simple play.", "Plot: beginning, conflict, resolution.", "Characters, dialogue, costumes and props bring it to life."],
      check: [
        { q: "The problem in a story is the…", options: ["conflict", "costume", "venue", "audience"], answer: 0 },
        { q: "Words spoken by characters are the…", options: ["dialogue", "props", "set", "plot"], answer: 0 },
      ],
    },
    {
      title: "Creating a dance piece",
      emoji: "💃",
      explain: [
        "Choose music or drumming from your community. Listen to the rhythm and decide the mood of the dance.",
        "Create movements that tell the story or show the mood, e.g. farming, fishing, celebrating. Repeat key movements so the dance is easy to follow and has rhythm.",
        "Plan the formation (how dancers stand): circle, lines, pairs or a V-shape. Plan the entrance (how you come in) and exit (how you leave).",
      ],
      remember: ["Choose music and mood first.", "Movements tell the story; repeat key moves.", "Plan formation, entrance and exit."],
      check: [
        { q: "How dancers are arranged in space is the…", options: ["formation", "dialogue", "script", "prop"], answer: 0 },
        { q: "Repeating key movements makes a dance…", options: ["easy to follow", "boring always", "silent", "shorter"], answer: 0 },
      ],
    },
    {
      title: "Planning, performing and appraising the show",
      emoji: "🎟️",
      explain: [
        "Choose a venue (classroom, assembly ground, community park) and a date. Spread the information with posters, announcements at assembly or church, and word of mouth.",
        "Rehearse many times, then perform. If possible, record the performance.",
        "Invite an audience to appreciate and appraise it. Afterwards, list the strengths and weaknesses of the story, acting, voice, movement, music, costumes and audience response, and use them to improve future performances.",
      ],
      remember: ["Choose venue and date; publicise.", "Rehearse, perform and record.", "Appraise strengths and weaknesses."],
      check: [
        { q: "Which helps to spread information about a show?", options: ["Posters", "Silence", "Hiding", "No rehearsal"], answer: 0 },
        { q: "Listing what went well and what didn't is part of…", options: ["appraisal", "costume", "dialogue", "formation"], answer: 0 },
      ],
    },
  ],
  "2.3.1": [
    {
      title: "Recording your community's story",
      emoji: "📸",
      explain: [
        "Use observational drawings, sketches, your own photographs, adverts and pictures from newspapers or the internet to record your views about your community's history, culture, environment and topical issues.",
        "Things to record: chieftaincy and palaces, landmarks (famous buildings, monuments), artists and their works, events and festivals, tourist sites (natural like waterfalls; manmade like castles).",
        "Present your findings individually or in groups using a flip chart, journal, drawings, photographs, a verbal report or slides. Discuss and agree on what your community's story is.",
      ],
      remember: ["Record with drawings, photos and cuttings.", "Topics: chieftaincy, landmarks, artists, festivals, tourist sites, issues.", "Present and discuss your findings."],
      check: [
        { q: "A well-known building that identifies a town is a…", options: ["landmark", "landslide", "label", "loom"], answer: 0 },
        { q: "Drawing what you see in front of you is…", options: ["observational drawing", "imaginative drawing", "tracing", "printing"], answer: 0 },
      ],
    },
    {
      title: "Types of visual artworks in the community",
      emoji: "🧺",
      explain: [
        "Visual artworks can be grouped by their nature: Painting (wall paintings, signboards, scenes of festivals like Homowo). Sculpture (carved stools, Akuaba dolls, busts of chiefs, statues). Pottery/ceramics (earthenware pots, bowls, coalpots). Graphic arts (posters, billboards, packages, inscriptions on buildings and vehicles). Textiles (kente, adinkra, batik, tie-dye, smock). Basketry (cane and raffia chairs, Bolga baskets). Jewellery (beads, necklaces, bracelets, such as Krobo beads). Leatherwork (sandals, bags, shoes). Architecture (buildings, palaces, castles and forts).",
        "When appraising them, use art words: content (what it shows), colour scheme, symbolism (what the signs mean, e.g. Adinkra symbols), and cultural significance (why it matters to the people).",
      ],
      diagram: "adinkra",
      remember: ["Group artworks: painting, sculpture, pottery, graphics, textiles, basketry, jewellery, leatherwork, architecture.", "Use art words: content, colour scheme, symbolism, cultural significance.", "Adinkra symbols carry meanings."],
      check: [
        { q: "Krobo beads belong to…", options: ["jewellery", "pottery", "basketry", "painting"], answer: 0 },
        { q: "What a symbol stands for is its…", options: ["symbolism", "texture", "rhythm", "tempo"], answer: 0 },
      ],
    },
  ],
  "2.3.2": [
    {
      title: "Musicians who shaped Ghana",
      emoji: "🎤",
      explain: [
        "Indigenous musicians perform traditional music; popular musicians perform music like highlife and hiplife; art musicians compose written music for choirs and orchestras.",
        "Agya Koo Nimo is a master of palm-wine guitar music who uses Akan proverbs in his songs. Kakraba Lobi was a master of the gyil (wooden xylophone) from the Upper West and taught it around the world. E. T. Mensah, the 'King of Highlife', led the Tempos band and made highlife popular. Kojo Antwi, Amakye Dede and Gyedu-Blay Ambolley are popular highlife stars. Afia Abaasa and Kojo Nuatro are known for traditional music.",
        "Musicians contribute to society by entertaining, teaching values, preserving language and history, bringing people together and creating jobs.",
      ],
      remember: ["Types: indigenous, popular and art musicians.", "E. T. Mensah = King of Highlife; Kakraba Lobi = gyil master; Koo Nimo = palm-wine guitar.", "Musicians teach, entertain and preserve culture."],
      check: [
        { q: "The gyil is a…", options: ["xylophone", "drum", "guitar", "flute"], answer: 0 },
        { q: "Who led the Tempos band?", options: ["E. T. Mensah", "Kojo Antwi", "Koo Nimo", "Amakye Dede"], answer: 0 },
      ],
    },
    {
      title: "Songs on topical issues; indigenous and neo-traditional groups",
      emoji: "📻",
      explain: [
        "Many songs educate the public on topical issues. Examples given in the curriculum: sanitation songs (Ubongo Kids; Osei Boateng), 'Illegal Fishing' by Kofi Kinaata, and 'Driver Banza' by George Jarrah on road safety. To transcribe a song means to write down its words (and music) as you hear it.",
        "Indigenous groups play traditional music as passed down from the ancestors, e.g. Adowa and Agbadza groups. Neo-traditional groups mix traditional music with newer ideas, e.g. Sikyi, Kpanlogo, Borborbor and Nnwonkoro groups.",
        "Appraise a group by its style, instruments, song themes, dance movements and costumes.",
      ],
      remember: ["Songs can teach about topical issues.", "Transcribe = write down what you hear.", "Neo-traditional = traditional + new ideas."],
      check: [
        { q: "'Illegal Fishing' was sung by…", options: ["Kofi Kinaata", "E. T. Mensah", "Koo Nimo", "Kakraba Lobi"], answer: 0 },
        { q: "Borborbor is an example of…", options: ["neo-traditional music", "a clay pot", "a painting", "a weave"], answer: 0 },
      ],
    },
  ],
  "2.3.3": [
    {
      title: "Dances and plays that tell our story",
      emoji: "📖",
      explain: [
        "Research and write about your community's history, culture and important sites (rivers, forests, hills, palaces, markets, forts). These give ideas for dance and drama.",
        "Dances carry history: Adowa (Akan) uses graceful hand gestures that express proverbs and feelings; Bamaya (Dagomba) is linked to the story of rain returning after a drought; Agbadza (Ewe) developed from the Atrikpui war dance.",
        "Drama in Ghana includes anansesem (Ananse storytelling), concert party, festival re-enactments and plays on topical issues. Ghanaian dramatists include Efua Sutherland ('The Marriage of Anansewa'), Ama Ata Aidoo and Joe de Graft.",
      ],
      remember: ["Dances and plays carry history and culture.", "Bamaya, Adowa and Agbadza each tell a story.", "Efua Sutherland wrote 'The Marriage of Anansewa'."],
      check: [
        { q: "Agbadza developed from the war dance…", options: ["Atrikpui", "Adowa", "Kete", "Takai"], answer: 0 },
        { q: "Ananse storytelling is called…", options: ["anansesem", "adinkra", "ampe", "akuaba"], answer: 0 },
      ],
    },
    {
      title: "Analysing performances by other artistes",
      emoji: "🎬",
      explain: [
        "Watch video clips or live performances of other dancers and actors. While watching, take notes.",
        "Ask: What is the theme or message? Which history, culture or topical issue does it show? How do movement, costume, music and speech show it? How did the audience react?",
        "Then reflect: what ideas can you borrow for your own performance? Discuss in groups and write a short analysis.",
      ],
      remember: ["Watch and take notes.", "Theme, culture/issue, techniques, audience reaction.", "Borrow good ideas for your own work."],
      check: [
        { q: "The main message of a performance is its…", options: ["theme", "costume", "prop", "venue"], answer: 0 },
        { q: "Studying the parts of a performance carefully is to…", options: ["analyse", "rehearse", "applaud", "advertise"], answer: 0 },
      ],
    },
  ],
};
