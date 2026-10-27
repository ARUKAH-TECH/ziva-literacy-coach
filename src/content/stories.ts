import type { LevelId } from "@/lib/levels";

// Original short texts written for this app, set in everyday Ghanaian life.
export interface Question {
  q: string;
  options: string[];
  answer: number; // index into options
  why: string;
}

export interface Story {
  id: string;
  level: LevelId;
  title: string;
  emoji: string;
  /** Paragraphs. */
  text: string[];
  questions: Question[];
}

export const STORIES: Story[] = [
  // Kindergarten — listen and look
  {
    id: "ama-goat",
    level: "kg",
    title: "Ama and the Goat",
    emoji: "🐐",
    text: ["Ama has a goat.", "The goat is white.", "The goat eats green grass.", "Ama gives the goat water.", "The goat says, “Meh, meh!”"],
    questions: [
      { q: "What animal does Ama have?", options: ["A cat", "A goat", "A hen"], answer: 1, why: "The story says: Ama has a goat." },
      { q: "What colour is the goat?", options: ["White", "Black", "Brown"], answer: 0, why: "The goat is white." },
      { q: "What does the goat eat?", options: ["Rice", "Bread", "Grass"], answer: 2, why: "The goat eats green grass." },
    ],
  },
  {
    id: "kofi-ball",
    level: "kg",
    title: "Kofi’s Red Ball",
    emoji: "⚽",
    text: ["Kofi has a red ball.", "He kicks the ball.", "The ball goes up, up, up!", "The ball falls in the mud.", "Kofi laughs and washes the ball."],
    questions: [
      { q: "What colour is Kofi’s ball?", options: ["Blue", "Red", "Yellow"], answer: 1, why: "Kofi has a red ball." },
      { q: "Where does the ball fall?", options: ["In the mud", "In the river", "On the roof"], answer: 0, why: "The ball falls in the mud." },
      { q: "What does Kofi do at the end?", options: ["He cries", "He sleeps", "He washes the ball"], answer: 2, why: "Kofi laughs and washes the ball." },
    ],
  },

  // Primary 1–3 — short stories
  {
    id: "market-day",
    level: "p1-3",
    title: "Market Day",
    emoji: "🧺",
    text: [
      "On Saturday, Esi went to the market with her mother.",
      "They bought tomatoes, onions and fresh fish. Esi carried the small basket.",
      "A woman was selling sweet oranges. Mother bought six oranges for Esi and her brothers.",
      "On the way home, Esi gave one orange to an old man who looked tired. He smiled and said, “God bless you, my child.”",
    ],
    questions: [
      { q: "When did Esi go to the market?", options: ["On Monday", "On Saturday", "On Sunday"], answer: 1, why: "The story begins: On Saturday, Esi went to the market." },
      { q: "What did Esi carry?", options: ["The small basket", "The fish", "A bucket"], answer: 0, why: "Esi carried the small basket." },
      { q: "How many oranges did Mother buy?", options: ["Two", "Four", "Six"], answer: 2, why: "Mother bought six oranges." },
      { q: "Why did Esi give an orange to the old man?", options: ["He asked for money", "He looked tired", "He was her teacher"], answer: 1, why: "The old man looked tired, so Esi was kind to him." },
    ],
  },
  {
    id: "rainy-morning",
    level: "p1-3",
    title: "The Rainy Morning",
    emoji: "🌧️",
    text: [
      "Yaw woke up and heard the rain on the roof. Tap, tap, tap!",
      "He did not want to be late for school, so he took his yellow umbrella.",
      "On the road, he saw his friend Abena without an umbrella. Her school bag was getting wet.",
      "Yaw shared his umbrella. They walked to school together, laughing and jumping over puddles.",
    ],
    questions: [
      { q: "What did Yaw hear when he woke up?", options: ["A drum", "The rain", "A bird"], answer: 1, why: "He heard the rain on the roof." },
      { q: "What colour was Yaw’s umbrella?", options: ["Yellow", "Green", "Black"], answer: 0, why: "He took his yellow umbrella." },
      { q: "What did Yaw do for Abena?", options: ["He gave her his bag", "He called her mother", "He shared his umbrella"], answer: 2, why: "Yaw shared his umbrella." },
    ],
  },

  // Primary 4–6 — paragraphs
  {
    id: "clean-up",
    level: "p4-6",
    title: "The Clean-Up Club",
    emoji: "🧹",
    text: [
      "Every Friday after classes, the pupils of Asante Primary School noticed plastic bottles and sachets scattered around the football field. Some pupils complained, but nobody did anything about it.",
      "One day, Kwame, a Primary 5 pupil, asked the headteacher if he could start a Clean-Up Club. The headteacher agreed and gave the club two rakes, a wheelbarrow and some gloves.",
      "At first, only four pupils joined. However, after two weeks, the field looked so neat that other pupils became interested. Soon, the club had twenty members.",
      "The club also placed labelled bins around the school: one for plastics and one for paper. The headteacher praised them at assembly and said, “Small actions, done together, can change a whole community.”",
    ],
    questions: [
      { q: "What problem did the pupils notice?", options: ["Broken desks", "Rubbish on the football field", "A leaking roof", "Missing books"], answer: 1, why: "They noticed plastic bottles and sachets scattered around the field." },
      { q: "What did the headteacher give the club?", options: ["Money and books", "Rakes, a wheelbarrow and gloves", "Footballs", "New uniforms"], answer: 1, why: "He gave the club two rakes, a wheelbarrow and some gloves." },
      { q: "Why did more pupils join the club?", options: ["They were punished", "The field became neat", "They were paid", "It was compulsory"], answer: 1, why: "After two weeks the field looked so neat that others became interested." },
      { q: "What is the main lesson of the story?", options: ["Football is fun", "Only teachers can solve problems", "Small actions done together can make a big difference", "Plastic is useful"], answer: 2, why: "The headteacher’s words sum it up: small actions, done together, can change a community." },
    ],
  },
  {
    id: "cocoa-farm",
    level: "p4-6",
    title: "Grandfather’s Cocoa Farm",
    emoji: "🌱",
    text: [
      "During the long vacation, Akosua visited her grandfather in a village near Kumasi. He owned a large cocoa farm and woke up very early each morning to work.",
      "Grandfather showed Akosua how cocoa pods grow on the trunk and branches of the tree. When the pods turn yellow or orange, they are ripe and ready to be harvested.",
      "They cut the pods open and removed the white, sticky beans. The beans were covered with banana leaves for about six days so that they could ferment. Afterwards, they were spread on raised mats to dry in the sun.",
      "Akosua was surprised to learn that chocolate begins as these bitter beans. “Farming is hard work,” she said, “but now I will never waste chocolate again!”",
    ],
    questions: [
      { q: "Where did Akosua spend her vacation?", options: ["In Accra", "In a village near Kumasi", "In Tamale", "At school"], answer: 1, why: "She visited her grandfather in a village near Kumasi." },
      { q: "How do you know a cocoa pod is ripe?", options: ["It falls off", "It turns yellow or orange", "It becomes small", "It smells sweet"], answer: 1, why: "Ripe pods turn yellow or orange." },
      { q: "Why were the beans covered with banana leaves?", options: ["To hide them", "To keep insects away", "So that they could ferment", "To make them green"], answer: 2, why: "They were covered for about six days so that they could ferment." },
      { q: "In the passage, the word “bitter” means…", options: ["Very sweet", "Having a sharp, unpleasant taste", "Very soft", "Brightly coloured"], answer: 1, why: "Raw cocoa beans taste sharp and unpleasant — bitter — not sweet like chocolate." },
    ],
  },

  // JHS — longer passages
  {
    id: "mobile-money",
    level: "jhs",
    title: "The Mobile Money Lesson",
    emoji: "📱",
    text: [
      "When Nana Yaw’s aunt opened a provisions shop in Takoradi, she asked him to help her during the holidays. Most customers paid with mobile money, so Nana Yaw quickly learned to confirm payments on his aunt’s phone before handing over goods.",
      "One afternoon, a well-dressed man bought items worth two hundred cedis. He showed Nana Yaw a message on his own phone that appeared to confirm the payment. Something seemed odd: the message came from an ordinary phone number, not from the network provider.",
      "Instead of releasing the goods, Nana Yaw politely checked his aunt’s phone. No payment had arrived. When he explained this calmly, the man claimed the network was slow and left without the goods.",
      "That evening, his aunt praised his patience and attention to detail. “Many traders lose money because they trust what they are shown,” she said. “You trusted what you could verify.” Nana Yaw realised that reading carefully is not only a school skill; it protects people in everyday life.",
    ],
    questions: [
      { q: "Why did Nana Yaw check his aunt’s phone?", options: ["The man asked him to", "The confirmation came from an ordinary number", "The network was slow", "His aunt called him"], answer: 1, why: "He noticed the message came from an ordinary phone number, not the network provider." },
      { q: "Which word best describes Nana Yaw in this passage?", options: ["Careless", "Rude", "Observant", "Fearful"], answer: 2, why: "He noticed a small detail and checked before acting — he was observant." },
      { q: "What does “verify” mean in the last paragraph?", options: ["Forget", "Check that something is true", "Pay for something", "Argue about"], answer: 1, why: "To verify is to confirm that something is true." },
      { q: "What is the main idea of the passage?", options: ["Shops in Takoradi are busy", "Mobile money is dangerous", "Careful reading and checking can protect us", "Holidays are for working"], answer: 2, why: "The passage ends by showing that reading carefully protects people in everyday life." },
    ],
  },
  {
    id: "lake-volta",
    level: "jhs",
    title: "Lake Volta",
    emoji: "🌊",
    text: [
      "Lake Volta is one of the largest artificial lakes in the world by surface area. It was formed after the construction of the Akosombo Dam on the Volta River, which was completed in 1965.",
      "The dam was built mainly to generate hydroelectric power for homes and industries. Today, the lake also supports fishing, transport and farming along its shores, providing livelihoods for many communities.",
      "However, the creation of the lake also had costs. Thousands of people had to leave their homes and farmland, and many communities were resettled in new towns. Some diseases linked to still water also increased in nearby areas.",
      "Lake Volta therefore shows that large development projects can bring great benefits, but they must be planned carefully to protect the people and environment affected by them.",
    ],
    questions: [
      { q: "What led to the formation of Lake Volta?", options: ["Heavy rainfall", "The construction of the Akosombo Dam", "An earthquake", "The sea rising"], answer: 1, why: "It was formed after the Akosombo Dam was built on the Volta River." },
      { q: "What was the main purpose of the dam?", options: ["Fishing", "Tourism", "Generating hydroelectric power", "Drinking water"], answer: 2, why: "It was built mainly to generate hydroelectric power." },
      { q: "Which was a cost of creating the lake?", options: ["Fewer fish", "People had to leave their homes", "Less electricity", "More deserts"], answer: 1, why: "Thousands of people had to leave their homes and farmland." },
      { q: "What is the writer’s overall view?", options: ["The dam was a mistake", "Big projects need careful planning to balance benefits and costs", "Lakes are dangerous", "Fishing is the most important industry"], answer: 1, why: "The final paragraph says such projects bring benefits but must be planned carefully." },
    ],
  },
];

export function storiesFor(level: LevelId | null) {
  return STORIES.filter((s) => !level || s.level === level);
}

export function wordCount(story: Story) {
  return story.text.join(" ").split(/\s+/).filter(Boolean).length;
}
