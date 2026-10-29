// Word bank for Upper Primary (P4–6) and JHS: word meanings, synonyms,
// antonyms and idiomatic expressions. Each list is written so that no two
// entries in the same list share a meaning — quiz wrong answers are taken
// from the other entries, so they must never be a second correct answer.

export type WordBankLevel = "p4-6" | "jhs";

export interface Meaning {
  word: string;
  meaning: string;
  sentence: string;
}
export interface Synonym {
  word: string;
  same: string[];
  sentence: string;
}
export interface Antonym {
  word: string;
  opposite: string;
  sentence: string;
}
export interface Idiom {
  idiom: string;
  meaning: string;
  sentence: string;
}

const m = (word: string, meaning: string, sentence: string): Meaning => ({ word, meaning, sentence });
const s = (word: string, same: string, sentence: string): Synonym => ({ word, same: same.split(", "), sentence });
const a = (word: string, opposite: string, sentence: string): Antonym => ({ word, opposite, sentence });
const i = (idiom: string, meaning: string, sentence: string): Idiom => ({ idiom, meaning, sentence });

export const MEANINGS: Record<WordBankLevel, Meaning[]> = {
  "p4-6": [
    m("abandon", "to leave behind and not come back", "The fishermen had to abandon the broken canoe."),
    m("accurate", "exactly right, with no mistakes", "Her answers in the maths test were accurate."),
    m("admire", "to look at someone or something with respect and liking", "I admire my teacher’s neat handwriting."),
    m("announce", "to tell everyone officially", "The headteacher will announce the results at assembly."),
    m("anxious", "worried and nervous", "Kofi felt anxious before his exam."),
    m("approach", "to come near", "We watched the bus approach the station."),
    m("arrange", "to put things in order", "Arrange the books neatly on the shelf."),
    m("attempt", "to try to do something", "Ama will attempt the long jump again."),
    m("avoid", "to keep away from", "Avoid playing near the busy road."),
    m("boast", "to talk too proudly about yourself", "He likes to boast about his new shoes."),
    m("cautious", "careful to avoid danger", "Be cautious when you cross the road."),
    m("celebrate", "to do something special for a happy event", "We celebrate Independence Day on 6th March."),
    m("collapse", "to fall down suddenly", "The old mud wall may collapse in the rain."),
    m("compete", "to try to win against others", "Ten schools will compete in the quiz."),
    m("curious", "wanting to know or learn about something", "The curious boy asked many questions."),
    m("damp", "a little wet", "Do not wear a damp shirt to school."),
    m("decrease", "to become less", "The price of tomatoes decreases in the harvest season."),
    m("destroy", "to damage something completely", "The fire destroyed the old market stalls."),
    m("disappear", "to go out of sight", "The sun disappeared behind the clouds."),
    m("eager", "very keen to do something", "The children were eager to start the game."),
    m("errand", "a short trip to do a job for someone", "Mother sent me on an errand to the shop."),
    m("examine", "to look at something very carefully", "The nurse examined the baby’s ears."),
    m("exhausted", "very, very tired", "After the long walk home, we were exhausted."),
    m("famous", "known by very many people", "Kente cloth is famous all over the world."),
    m("feast", "a big meal for a special occasion", "The village prepared a feast for the festival."),
    m("fierce", "wild and ready to attack", "The fierce dog barked at the gate."),
    m("flee", "to run away from danger", "The animals had to flee from the bush fire."),
    m("gather", "to come together or bring things together", "Gather the dry leaves into one pile."),
    m("gigantic", "extremely large", "A gigantic baobab tree stands in the village."),
    m("glance", "a quick look", "She took a glance at the clock."),
    m("grateful", "thankful", "I am grateful for your help."),
    m("harvest", "to collect crops when they are ready", "Farmers harvest maize in August."),
    m("hesitate", "to stop for a moment because you are not sure", "Do not hesitate to ask a question."),
    m("humble", "not proud; not thinking you are better than others", "The champion stayed humble after winning."),
    m("injure", "to hurt a person or an animal", "He injured his knee playing football."),
    m("journey", "a trip from one place to another", "The journey from Accra to Tamale is long."),
    m("leisure", "free time for rest or fun", "I read stories in my leisure time."),
    m("loyal", "always supporting a friend or group", "A loyal friend stands by you."),
    m("mischief", "naughty behaviour that causes small trouble", "The goat got into mischief in the garden."),
    m("narrow", "not wide", "The path to the farm is narrow."),
    m("obey", "to do what you are told", "We obey the school rules."),
    m("occupation", "the work a person does to earn money", "My uncle’s occupation is carpentry."),
    m("opponent", "the person or team you play against", "Our opponents scored the first goal."),
    m("patient", "able to wait calmly without complaining", "Be patient while the food cooks."),
    m("permit", "to allow", "The teacher permitted us to go out to play."),
    m("precious", "very valuable", "Gold is a precious metal."),
    m("predict", "to say what will happen in the future", "Can you predict how the story will end?"),
    m("punctual", "on time", "Be punctual for school every day."),
    m("recover", "to get well again after being sick", "Grandfather recovered from malaria."),
    m("rescue", "to save someone from danger", "The fire service rescued the cat from the roof."),
    m("scarce", "hard to find; not enough", "Water is scarce in the dry season."),
    m("scatter", "to throw or spread in many directions", "The chickens scattered when the car came."),
    m("shelter", "a place that protects you from rain or danger", "We took shelter under the big tree."),
    m("shiver", "to shake because of cold or fear", "The wet puppy began to shiver."),
    m("stubborn", "refusing to change your mind", "The stubborn goat would not move."),
    m("swift", "moving very fast", "The swift runner won the race."),
    m("timid", "shy and easily frightened", "The timid girl hid behind her mother."),
    m("vacant", "empty; not being used", "There is a vacant seat in the front row."),
    m("vendor", "a person who sells things, often by the road", "The vendor sells oranges near the lorry station."),
    m("wander", "to walk around without a fixed plan", "The sheep wandered across the field."),
    m("wealthy", "having a lot of money", "A wealthy farmer built a library for the town."),
    m("complain", "to say you are not happy about something", "Customers complained about the long queue."),
  ],
  jhs: [
    m("abolish", "to officially end a law, rule or system", "The school abolished the use of the cane."),
    m("adequate", "enough for what is needed", "Carry adequate water for the trip."),
    m("ambiguous", "having more than one possible meaning", "The question was ambiguous, so we asked the teacher."),
    m("amiable", "friendly and pleasant", "Our amiable neighbour greets everyone."),
    m("anonymous", "with a name that is not known or not given", "An anonymous donor gave the school ten computers."),
    m("apprehensive", "worried that something bad may happen", "She was apprehensive about the interview."),
    m("arrogant", "proud in a rude way; thinking you are better than others", "The arrogant player ignored his coach."),
    m("authentic", "real; not a copy", "This is authentic Bonwire kente."),
    m("benevolent", "kind and wanting to help others", "A benevolent woman paid the fees of poor pupils."),
    m("candid", "honest and direct in what you say", "Please give me your candid opinion."),
    m("coherent", "clear and logical, with ideas that fit together", "Write a coherent essay with good paragraphs."),
    m("commence", "to begin", "The examination will commence at 9 o’clock."),
    m("compulsory", "required by a rule; it must be done", "English is a compulsory subject."),
    m("conceal", "to hide", "He tried to conceal the broken plate."),
    m("contemplate", "to think deeply about something", "She is contemplating a career in medicine."),
    m("contradict", "to say the opposite of what someone has said", "The witness contradicted his earlier story."),
    m("deteriorate", "to become worse", "The road deteriorated during the rainy season."),
    m("dilemma", "a difficult choice between two options", "Choosing between the two schools was a real dilemma."),
    m("discreet", "careful not to reveal secrets or attract attention", "Be discreet about what your friend told you."),
    m("eloquent", "speaking well and in a way that persuades people", "The eloquent speaker won the debate."),
    m("emulate", "to copy someone you admire", "Emulate the good habits of your seniors."),
    m("jubilant", "full of joy because of a success", "The jubilant fans danced after the match."),
    m("eradicate", "to remove or destroy completely", "Vaccination helped to eradicate smallpox."),
    m("exaggerate", "to make something seem bigger or more important than it is", "Don’t exaggerate the size of the fish you caught."),
    m("feasible", "possible and practical to do", "Is the plan feasible with the money we have?"),
    m("frugal", "careful not to waste money or food", "A frugal family saves for school fees."),
    m("gratitude", "the feeling of being thankful", "She wrote a letter of gratitude to the nurses."),
    m("hostile", "unfriendly and ready to fight", "The crowd was hostile to the referee."),
    m("hypocrite", "a person who says one thing but does the opposite", "Only a hypocrite preaches honesty and then cheats."),
    m("imminent", "about to happen very soon", "The dark clouds showed that rain was imminent."),
    m("impartial", "fair; not supporting one side", "A judge must be impartial."),
    m("inevitable", "certain to happen; cannot be avoided", "Some change is inevitable as we grow."),
    m("inquisitive", "always asking questions and wanting to find out", "The inquisitive child opened every drawer."),
    m("jeopardy", "danger of harm or loss", "His lateness put his job in jeopardy."),
    m("lethargic", "without energy; slow and sleepy", "The afternoon heat made us lethargic."),
    m("lucrative", "making a lot of money", "Cocoa farming can be lucrative."),
    m("mediate", "to help two sides in a quarrel reach agreement", "The chief mediated between the two families."),
    m("negligent", "careless; not taking proper care", "The negligent driver caused an accident."),
    m("novice", "a beginner", "I am still a novice at chess."),
    m("obstinate", "refusing to change your opinion, even when wrong", "The obstinate man refused all advice."),
    m("optimistic", "expecting good things to happen", "She is optimistic about her BECE results."),
    m("persevere", "to keep trying even when it is difficult", "Persevere and you will succeed."),
    m("prudent", "wise and careful when making decisions", "It is prudent to save some money."),
    m("quench", "to satisfy thirst, or to put out a fire", "Cold water quenched our thirst."),
    m("rebuke", "to speak sharply to someone for doing wrong", "The teacher rebuked him for fighting."),
    m("reconcile", "to become friends again after a quarrel", "The two brothers reconciled after many years."),
    m("redundant", "no longer needed or useful", "Typewriters became redundant when computers came."),
    m("resilient", "able to recover quickly from difficulties", "Resilient farmers replanted after the flood."),
    m("scrutinise", "to examine very closely and in detail", "The auditor scrutinised the accounts."),
    m("spontaneous", "done suddenly, without planning", "The crowd broke into spontaneous applause."),
    m("superficial", "only on the surface; not deep or serious", "Luckily, the cut was superficial."),
    m("tedious", "long, slow and boring", "Copying all the notes was tedious."),
    m("trivial", "small and not important", "Don’t quarrel over trivial matters."),
    m("unanimous", "agreed by everyone", "The class vote was unanimous."),
    m("vulnerable", "easily hurt or harmed", "Young children are vulnerable to malaria."),
    m("wholesome", "good for your health or your character", "Kenkey with fish and vegetables is a wholesome meal."),
    m("zeal", "great energy and enthusiasm", "She studied for the exam with zeal."),
    m("vindictive", "wanting to hurt someone who hurt you", "Don’t be vindictive; forgive and move on."),
    m("ominous", "giving a sign that something bad will happen", "There was an ominous silence before the storm."),
    m("affluent", "rich, with a comfortable way of life", "They live in an affluent part of the city."),
  ],
};

export const SYNONYMS: Record<WordBankLevel, Synonym[]> = {
  "p4-6": [
    s("big", "large, huge", "We live in a big house."),
    s("small", "little, tiny", "The baby has small fingers."),
    s("happy", "glad, cheerful", "Ama is happy today."),
    s("sad", "unhappy, sorrowful", "Kofi was sad when he lost his pen."),
    s("begin", "start", "Let us begin the lesson."),
    s("end", "finish", "The film will end at six."),
    s("fast", "quick, speedy", "The fast car passed us."),
    s("shout", "yell", "Don’t shout in the classroom."),
    s("look", "see, watch", "Look at the rainbow!"),
    s("talk", "speak, chat", "We talk to our grandmother every Sunday."),
    s("help", "assist, aid", "Please help me carry the basket."),
    s("build", "construct", "They will build a new classroom."),
    s("clever", "smart, bright", "The clever girl solved the puzzle."),
    s("angry", "cross, furious", "The farmer was angry with the goats."),
    s("afraid", "scared, frightened", "The boy was afraid of the dark."),
    s("rich", "wealthy", "The rich man gave money to the church."),
    s("quiet", "silent", "The library is quiet."),
    s("shut", "close", "Shut the door, please."),
    s("gift", "present", "I got a gift on my birthday."),
    s("road", "street", "Our road is very busy."),
    s("choose", "pick, select", "Choose a book to read."),
    s("fix", "repair, mend", "Father will fix my bicycle."),
    s("difficult", "hard, tough", "The last question was difficult."),
    s("easy", "simple", "The first question was easy."),
    s("correct", "right", "Your answer is correct."),
    s("mistake", "error", "I made a mistake in my spelling."),
    s("buy", "purchase", "We buy bread every morning."),
    s("reply", "answer, respond", "Please reply to my letter."),
    s("stone", "rock, pebble", "He threw a stone into the river."),
    s("pretty", "beautiful, lovely", "She wore a pretty dress."),
    s("neat", "tidy", "Keep your desk neat."),
    s("ill", "sick, unwell", "My sister is ill today."),
    s("kind", "caring, thoughtful", "Our kind teacher helped me."),
    s("brave", "bold, courageous", "The brave hunter faced the lion."),
    s("shy", "bashful", "The shy boy did not speak."),
    s("under", "below, beneath", "The cat is under the table."),
    s("hurry", "rush", "Don’t hurry; we have time."),
    s("throw", "toss", "Throw the ball to me."),
    s("loud", "noisy", "The music at the party was loud."),
    s("smell", "scent", "I love the smell of fresh bread."),
  ],
  jhs: [
    s("abundant", "plentiful, ample", "Mangoes are abundant in the season."),
    s("famous", "renowned, celebrated", "The famous singer visited our school."),
    s("brave", "courageous, valiant", "The valiant soldiers defended the town."),
    s("honest", "truthful, sincere", "An honest pupil returns lost items."),
    s("lazy", "idle, indolent", "The lazy farmer had nothing to harvest."),
    s("generous", "charitable, giving", "Our generous neighbour shared her food."),
    s("hate", "detest, loathe", "I detest cruelty to animals."),
    s("praise", "commend, applaud", "The headmaster commended our hard work."),
    s("anger", "rage, fury", "He shouted in anger."),
    s("increase", "rise, grow", "The number of pupils will increase."),
    s("reduce", "decrease, lessen", "Reduce the noise, please."),
    s("destroy", "demolish, ruin", "They will demolish the old building."),
    s("obvious", "evident, apparent", "It was obvious that he was tired."),
    s("strange", "odd, peculiar", "We heard a strange noise."),
    s("danger", "peril, hazard", "Bush fires are a danger to farms."),
    s("enemy", "foe, adversary", "The two kingdoms were once enemies."),
    s("friend", "companion, comrade", "My friend walks with me to school."),
    s("hide", "conceal", "Don’t hide the truth."),
    s("show", "display, exhibit", "Show your work to the class."),
    s("weak", "feeble, frail", "The old man felt weak."),
    s("strong", "sturdy, robust", "We need a strong table."),
    s("argue", "quarrel, dispute", "The twins always argue."),
    s("allow", "permit, let", "Allow your sister to play."),
    s("forbid", "prohibit, ban", "The rules forbid phones in class."),
    s("mistake", "error, blunder", "Check your work for mistakes."),
    s("calm", "tranquil, peaceful", "The lake was calm this morning."),
    s("noisy", "loud, rowdy", "The market is noisy."),
    s("rude", "impolite, discourteous", "It is rude to interrupt."),
    s("polite", "courteous, well-mannered", "A polite pupil greets elders."),
    s("gloomy", "dismal, dreary", "The rainy day was gloomy."),
    s("joyful", "elated, jubilant", "The fans were joyful after the win."),
    s("humble", "modest, meek", "She is humble about her success."),
    s("clever", "intelligent, brilliant", "The clever student won the quiz."),
    s("tired", "weary, fatigued", "We were weary after the march."),
    s("begin", "commence, initiate", "The meeting will begin at noon."),
    s("finish", "conclude, complete", "We will conclude the lesson with a song."),
    s("important", "vital, essential", "Clean water is vital for life."),
    s("rare", "uncommon, scarce", "Snow is rare in Ghana."),
    s("rich", "affluent, prosperous", "The prosperous trader built a school."),
    s("poor", "needy, impoverished", "The church helps needy families."),
  ],
};

export const ANTONYMS: Record<WordBankLevel, Antonym[]> = {
  "p4-6": [
    a("tall", "short", "The tall boy helped the short boy reach the shelf."),
    a("hot", "cold", "Hot tea, cold water."),
    a("early", "late", "Come early, not late."),
    a("open", "closed", "The shop is open in the day and closed at night."),
    a("push", "pull", "Push the door to go out; pull it to come in."),
    a("buy", "sell", "We buy yams from the woman who sells them."),
    a("enter", "exit", "Enter through the front gate and exit through the back."),
    a("arrive", "depart", "The bus will arrive at 8 and depart at 9."),
    a("win", "lose", "Some days we win, some days we lose."),
    a("borrow", "lend", "May I borrow your pen? Yes, I will lend it to you."),
    a("strong", "weak", "The medicine made the weak child strong again."),
    a("heavy", "light", "The bag of rice is heavy; the bag of feathers is light."),
    a("rough", "smooth", "The road is rough, but the new tiles are smooth."),
    a("wide", "narrow", "The river is wide here and narrow up the hill."),
    a("deep", "shallow", "The well is deep, but the stream is shallow."),
    a("empty", "full", "The bucket was empty; now it is full."),
    a("cheap", "expensive", "Oranges are cheap, but apples are expensive."),
    a("clean", "dirty", "Wash the dirty plates until they are clean."),
    a("laugh", "cry", "Babies laugh and cry a lot."),
    a("question", "answer", "Ask a question and wait for the answer."),
    a("remember", "forget", "Remember your books; don’t forget them at home."),
    a("accept", "refuse", "Accept good advice and refuse bad company."),
    a("always", "never", "I always brush my teeth; I never skip it."),
    a("inside", "outside", "Play outside, then come inside to eat."),
    a("before", "after", "Wash your hands before and after eating."),
    a("above", "below", "The birds flew above; the fish swam below."),
    a("sweet", "bitter", "Sugar is sweet; bitter leaf is bitter."),
    a("noisy", "quiet", "The class was noisy, then quiet when the teacher came in."),
    a("polite", "rude", "Be polite, not rude, to everyone."),
    a("safe", "dangerous", "The zebra crossing is safe; the middle of the road is dangerous."),
    a("success", "failure", "Hard work brings success, not failure."),
    a("healthy", "sick", "Eat well to stay healthy and not get sick."),
    a("increase", "decrease", "Prices increase and decrease during the year."),
    a("ancient", "modern", "Ancient people used clay pots; modern people use plastic too."),
    a("fresh", "stale", "Fresh bread is soft; stale bread is hard."),
    a("wise", "foolish", "The wise tortoise beat the foolish hare."),
    a("generous", "selfish", "A generous child shares; a selfish child does not."),
    a("present", "absent", "Kofi was present today but absent yesterday."),
    a("tight", "loose", "My old shoes are tight; my new ones are loose."),
    a("sharp", "blunt", "Use a sharp knife, not a blunt one."),
    a("sunrise", "sunset", "We wake at sunrise and come home at sunset."),
    a("careful", "careless", "A careful writer checks; a careless one makes mistakes."),
  ],
  jhs: [
    a("optimistic", "pessimistic", "An optimistic person expects success; a pessimistic one expects failure."),
    a("generous", "stingy", "The generous aunt gave freely, unlike her stingy brother."),
    a("humble", "arrogant", "Stay humble; arrogant people lose friends."),
    a("permanent", "temporary", "This is a temporary classroom until the permanent one is built."),
    a("include", "exclude", "Include everyone in the game; don’t exclude anyone."),
    a("majority", "minority", "The majority voted yes; a minority voted no."),
    a("artificial", "natural", "Natural fruit juice is better than artificial flavours."),
    a("export", "import", "Ghana exports cocoa and imports machines."),
    a("maximum", "minimum", "The minimum mark is 0 and the maximum is 100."),
    a("superior", "inferior", "Good materials give superior work; poor ones give inferior work."),
    a("voluntary", "compulsory", "Attendance is compulsory, but the club is voluntary."),
    a("praise", "criticise", "Praise good work and criticise politely."),
    a("ascend", "descend", "We ascended Mount Afadja and descended slowly."),
    a("attack", "defend", "One team attacks while the other defends."),
    a("expand", "contract", "Metals expand when heated and contract when cooled."),
    a("guilty", "innocent", "The court found him innocent, not guilty."),
    a("scarce", "plentiful", "Water is scarce in the dry season and plentiful in the rains."),
    a("transparent", "opaque", "Glass is transparent; wood is opaque."),
    a("courage", "cowardice", "Running away showed cowardice, not courage."),
    a("prosperity", "poverty", "Education can lead from poverty to prosperity."),
    a("wisdom", "folly", "Listening to elders is wisdom; ignoring them is folly."),
    a("hero", "villain", "In the story, the hero defeats the villain."),
    a("interior", "exterior", "The exterior of the house is painted white; the interior is blue."),
    a("conceal", "reveal", "Don’t conceal the truth; reveal it."),
    a("sincere", "deceitful", "A sincere friend tells the truth; a deceitful one tells lies."),
    a("dense", "sparse", "The forest is dense, but the grass in the north is sparse."),
    a("simple", "complex", "Start with simple sums before complex ones."),
    a("fragile", "durable", "Glass cups are fragile; metal cups are durable."),
    a("profit", "loss", "The trader made a profit this month and a loss last month."),
    a("combine", "separate", "Separate the eggs, then combine the yolks with sugar."),
    a("punctual", "tardy", "Be punctual; tardy pupils miss the first lesson."),
    a("vertical", "horizontal", "Draw a vertical line and then a horizontal line."),
    a("ancestor", "descendant", "We are the descendants of our ancestors."),
    a("fertile", "barren", "Crops grow well on fertile land but not on barren land."),
    a("obedient", "rebellious", "The obedient child listened; the rebellious one refused."),
    a("vague", "precise", "Give a precise answer, not a vague one."),
    a("lenient", "strict", "One teacher is strict; the other is lenient."),
    a("diligent", "lazy", "Diligent students pass; lazy ones struggle."),
    a("victory", "defeat", "The team celebrated victory after last year’s defeat."),
    a("advance", "retreat", "The army advanced, then had to retreat."),
  ],
};

export const IDIOMS: Record<WordBankLevel, Idiom[]> = {
  "p4-6": [
    i("a piece of cake", "something very easy", "The spelling test was a piece of cake."),
    i("break the ice", "to start talking in a friendly way when people are shy", "Ama told a funny story to break the ice."),
    i("under the weather", "feeling a little sick", "Kofi is under the weather today, so he stayed home."),
    i("let the cat out of the bag", "to tell a secret by mistake", "Yaw let the cat out of the bag about the surprise party."),
    i("hit the books", "to study hard", "I must hit the books before the exam."),
    i("once in a blue moon", "very rarely", "We go to the zoo once in a blue moon."),
    i("raining cats and dogs", "raining very heavily", "It was raining cats and dogs, so the match stopped."),
    i("cost an arm and a leg", "to be very expensive", "That phone costs an arm and a leg."),
    i("all ears", "listening carefully and eagerly", "Tell me the story: I’m all ears!"),
    i("over the moon", "extremely happy", "She was over the moon with her results."),
    i("in hot water", "in trouble", "He was in hot water for breaking the window."),
    i("keep an eye on", "to watch and look after someone or something", "Keep an eye on your little brother."),
    i("see eye to eye", "to agree with someone", "The two friends don’t always see eye to eye."),
    i("lend a hand", "to help", "Please lend a hand with the dishes."),
    i("hold your tongue", "to stop yourself from speaking", "Hold your tongue when elders are talking."),
    i("pull someone’s leg", "to tease or joke with someone", "Don’t worry, I’m only pulling your leg."),
    i("feel blue", "to feel sad", "She felt blue when her friend moved away."),
    i("the apple of my eye", "a person you love very much", "My baby sister is the apple of my eye."),
    i("time flies", "time passes very quickly", "Time flies when you are having fun."),
    i("cry over spilt milk", "to be upset about something that cannot be changed", "The mark is final, so don’t cry over spilt milk."),
    i("turn over a new leaf", "to change and start behaving better", "After the warning, he turned over a new leaf."),
    i("a drop in the ocean", "a very small amount compared with what is needed", "One cedi is a drop in the ocean for the new building."),
    i("in the same boat", "in the same difficult situation as others", "We all forgot our homework, so we’re in the same boat."),
    i("sit on the fence", "to refuse to choose a side", "Stop sitting on the fence and choose a team."),
    i("call it a day", "to stop working for now", "We’ve weeded enough; let’s call it a day."),
    i("through thick and thin", "in good times and in bad times", "Good friends stay together through thick and thin."),
    i("get cold feet", "to become too nervous to do something you planned", "He got cold feet before his speech."),
    i("like two peas in a pod", "looking or behaving almost the same", "The twins are like two peas in a pod."),
    i("a blessing in disguise", "something that seems bad but turns out to be good", "Missing the bus was a blessing in disguise. It broke down later."),
    i("beat around the bush", "to avoid saying something directly", "Stop beating around the bush and tell me what happened."),
    i("learn by heart", "to memorise exactly", "We learnt the national anthem by heart."),
    i("green with envy", "very jealous", "He was green with envy when he saw my new bicycle."),
  ],
  jhs: [
    i("burn the midnight oil", "to study or work late into the night", "She burnt the midnight oil before the BECE."),
    i("bite the bullet", "to bravely accept something unpleasant", "I bit the bullet and apologised."),
    i("add fuel to the fire", "to make a bad situation worse", "Shouting back only added fuel to the fire."),
    i("at the eleventh hour", "at the last possible moment", "He submitted the project at the eleventh hour."),
    i("bury the hatchet", "to make peace after a quarrel", "The two families finally buried the hatchet."),
    i("cut corners", "to do something cheaply or carelessly to save time or money", "The builder cut corners, and the wall cracked."),
    i("face the music", "to accept punishment for what you did", "After cheating, he had to face the music."),
    i("get the ball rolling", "to start an activity", "Let’s get the ball rolling with the first speaker."),
    i("hit the nail on the head", "to say exactly the right thing", "You hit the nail on the head with that answer."),
    i("jump on the bandwagon", "to join something because it has become popular", "Everyone jumped on the bandwagon and bought the same sneakers."),
    i("keep your chin up", "to stay cheerful in difficult times", "Keep your chin up: next term will be better."),
    i("miss the boat", "to lose a chance by being too slow", "Apply today or you will miss the boat."),
    i("on thin ice", "in a risky situation where you could get into trouble", "After two warnings, you are on thin ice."),
    i("play it by ear", "to decide what to do as things happen, without planning", "We don’t know the weather, so we’ll play it by ear."),
    i("spill the beans", "to reveal secret information", "Who spilt the beans about the exam questions?"),
    i("take it with a pinch of salt", "to not completely believe what you hear", "Take social media rumours with a pinch of salt."),
    i("the ball is in your court", "it is your turn to decide or act", "I’ve made my offer; the ball is in your court."),
    i("throw in the towel", "to give up", "Don’t throw in the towel after one failure."),
    i("under the table", "secretly, and often against the law", "He was paid under the table."),
    i("a wolf in sheep’s clothing", "a dangerous person who pretends to be harmless", "That friendly stranger was a wolf in sheep’s clothing."),
    i("break a leg", "good luck (said before a performance)", "Break a leg at the drama festival!"),
    i("hit the sack", "to go to bed", "I’m tired; I’m going to hit the sack."),
    i("a red-letter day", "a very special and important day", "Our graduation was a red-letter day."),
    i("a white elephant", "something costly that turns out to be useless", "The unused stadium became a white elephant."),
    i("kill two birds with one stone", "to achieve two things with one action", "I visited Grandma and bought the books: two birds with one stone."),
    i("let sleeping dogs lie", "to avoid bringing up an old problem again", "The quarrel is over; let sleeping dogs lie."),
    i("burn your bridges", "to destroy a relationship so you cannot go back", "Don’t burn your bridges with your old school."),
    i("a storm in a teacup", "a lot of fuss about something small", "The argument over the seat was a storm in a teacup."),
    i("go the extra mile", "to do more than what is expected", "Our teacher always goes the extra mile for us."),
    i("leave no stone unturned", "to try every possible way", "The police left no stone unturned in the search."),
    i("the last straw", "the final problem that makes you lose patience", "Coming late again was the last straw."),
    i("a dark horse", "someone who surprises others by doing well", "The quiet girl was the dark horse of the quiz."),
    i("steal the show", "to get the most attention and praise", "The little drummer stole the show."),
    i("blow your own trumpet", "to boast about your own achievements", "He keeps blowing his own trumpet about his grades."),
    i("foot the bill", "to pay for something", "The PTA will foot the bill for the trip."),
    i("get out of hand", "to become impossible to control", "The party got out of hand."),
    i("put your foot down", "to be firm and refuse to allow something", "Mother put her foot down about late nights."),
    i("back to square one", "back to the beginning after a failed attempt", "The plan failed, so we are back to square one."),
    i("keep body and soul together", "to earn just enough money to live", "He sells water to keep body and soul together."),
    i("a chip off the old block", "a child who is very like his or her parent", "She sings like her mother: a chip off the old block."),
    i("read between the lines", "to understand the hidden meaning", "Read between the lines of the poem."),
  ],
};

export const SECTIONS = [
  { id: "meanings", title: "Word meanings", emoji: "📘", text: "New words, what they mean, and how to use them." },
  { id: "synonyms", title: "Synonyms", emoji: "🟰", text: "Words that mean the same or nearly the same." },
  { id: "antonyms", title: "Antonyms", emoji: "↔️", text: "Words with opposite meanings." },
  { id: "idioms", title: "Idioms", emoji: "💬", text: "Expressions whose meaning is different from the words." },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export interface BankQuestion {
  id: string;
  section: SectionId;
  prompt: string;
  /** Example sentence shown with the question ("" when it would give the answer away). */
  sentence: string;
  say: string;
  options: string[];
  answer: number;
  explain: string;
  /** What to show on the study card for this question. */
  study: { head: string; line: string; sentence: string; say: string };
}

// ── Stages ────────────────────────────────────────────────────────────────
// Each class (P4–6, JHS) has its own Word bank path. A stage is a test of 30
// questions mixing meanings, synonyms, antonyms and idioms. Early stages ask
// "what does X mean?"; later stages turn it round ("which word means …?").
// ⭐⭐⭐⭐ (24 of 30) opens the next stage. Stage 1 and the first half of
// Stage 2 are free; after that a subscription is needed (any plan).

export const QUESTIONS_PER_STAGE = 30;
export const FREE_QUESTIONS_IN_STAGE_2 = 15;

export interface WordStage {
  n: number; // 1-based
  questions: BankQuestion[];
}

function seeded(seed: number) {
  let x = seed >>> 0;
  return () => {
    x = (x + 0x6d2b79f5) >>> 0;
    let r = Math.imul(x ^ (x >>> 15), 1 | x);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(list: T[], n: number, rand: () => number): T[] {
  const a = [...list];
  for (let k = a.length - 1; k > 0; k--) {
    const j = Math.floor(rand() * (k + 1));
    [a[k], a[j]] = [a[j], a[k]];
  }
  return a.slice(0, n);
}

const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

type Make = (rand: () => number) => BankQuestion;

function question(
  id: string,
  section: SectionId,
  right: string,
  others: string[],
  prompt: string,
  sentence: string,
  explain: string,
  study: BankQuestion["study"],
  hint: boolean,
  rand: () => number,
): BankQuestion {
  const wrong = pick([...new Set(others.filter((o) => o.toLowerCase() !== right.toLowerCase()))], 3, rand);
  const options = pick([right, ...wrong], 4, rand);
  const ask = prompt.replace(/[“”]/g, "");
  return {
    id,
    section,
    prompt,
    sentence: hint ? sentence : "",
    say: hint ? `${ask} ${sentence}` : ask,
    options,
    answer: options.indexOf(right),
    explain: hint ? explain : `${explain} Example: “${sentence}”`,
    study,
  };
}

/** Every question for a class: [forward questions per section, turned-round questions per section]. */
function allQuestions(level: WordBankLevel): [Make[][], Make[][]] {
  const M = MEANINGS[level];
  const S = SYNONYMS[level];
  const A = ANTONYMS[level];
  const I = IDIOMS[level];

  const mStudy = (e: Meaning) => ({ head: e.word, line: e.meaning, sentence: e.sentence, say: `${e.word}. ${e.meaning}. ${e.sentence}` });
  const sStudy = (e: Synonym) => ({ head: e.word, line: `= ${e.same.join(", ")}`, sentence: e.sentence, say: `${e.word} means the same as ${e.same.join(", or ")}. ${e.sentence}` });
  const aStudy = (e: Antonym) => ({ head: `${e.word} ↔ ${e.opposite}`, line: `The opposite of ${e.word} is ${e.opposite}.`, sentence: e.sentence, say: `The opposite of ${e.word} is ${e.opposite}. ${e.sentence}` });
  const iStudy = (e: Idiom) => ({ head: e.idiom, line: e.meaning, sentence: e.sentence, say: `${e.idiom}. This means ${e.meaning}. ${e.sentence}` });
  const synOthers = (e: Synonym) => S.filter((o) => o !== e).flatMap((o) => [o.word, ...o.same]).filter((w) => w !== e.word && !e.same.includes(w));
  const antOthers = (e: Antonym) => A.filter((o) => o !== e).flatMap((o) => [o.word, o.opposite]);

  const forward: Make[][] = [
    M.map((e) => (r) => question(`m:${e.word}`, "meanings", e.meaning, M.filter((o) => o !== e).map((o) => o.meaning), `What does “${e.word}” mean?`, e.sentence, `${cap(e.word)} means ${e.meaning}.`, mStudy(e), true, r)),
    S.map((e) => (r) => question(`s:${e.word}`, "synonyms", e.same[0], synOthers(e), `Which word means the same as “${e.word}”?`, e.sentence, `${cap(e.word)} = ${e.same.join(", ")}.`, sStudy(e), false, r)),
    A.map((e) => (r) => question(`a:${e.word}`, "antonyms", e.opposite, antOthers(e), `What is the opposite of “${e.word}”?`, e.sentence, `${cap(e.word)} ↔ ${e.opposite}.`, aStudy(e), false, r)),
    I.map((e) => (r) => question(`i:${e.idiom}`, "idioms", e.meaning, I.filter((o) => o !== e).map((o) => o.meaning), `What does “${e.idiom}” mean?`, e.sentence, `“${cap(e.idiom)}” means ${e.meaning}.`, iStudy(e), true, r)),
  ];
  const turned: Make[][] = [
    M.map((e) => (r) => question(`m2:${e.word}`, "meanings", e.word, M.filter((o) => o !== e).map((o) => o.word), `Which word means “${e.meaning}”?`, e.sentence, `${cap(e.word)} means ${e.meaning}.`, mStudy(e), false, r)),
    S.map((e) => (r) => question(`s2:${e.word}`, "synonyms", e.word, synOthers(e), `Which word means the same as “${e.same[e.same.length - 1]}”?`, e.sentence, `${cap(e.word)} = ${e.same.join(", ")}.`, sStudy(e), false, r)),
    A.map((e) => (r) => question(`a2:${e.word}`, "antonyms", e.word, antOthers(e), `What is the opposite of “${e.opposite}”?`, e.sentence, `${cap(e.opposite)} ↔ ${e.word}.`, aStudy(e), false, r)),
    I.map((e) => (r) => question(`i2:${e.idiom}`, "idioms", e.idiom, I.filter((o) => o !== e).map((o) => o.idiom), `Which expression means “${e.meaning}”?`, e.sentence, `“${cap(e.idiom)}” means ${e.meaning}.`, iStudy(e), false, r)),
  ];
  return [forward, turned];
}

/** Takes one from each list in turn, so every stage mixes all four sections. */
function interleave<T>(lists: T[][]): T[] {
  const out: T[] = [];
  for (let k = 0; out.length < lists.reduce((a, l) => a + l.length, 0); k++) for (const l of lists) if (k < l.length) out.push(l[k]);
  return out;
}

const cache = new Map<WordBankLevel, WordStage[]>();

/** The Word bank stages for a class. The same questions every time (fixed seed). */
export function wordBankStages(level: WordBankLevel): WordStage[] {
  const hit = cache.get(level);
  if (hit) return hit;
  const rand = seeded(level === "jhs" ? 7301 : 4601);
  const [forward, turned] = allQuestions(level);
  const order = [...interleave(forward.map((l) => pick(l, l.length, rand))), ...interleave(turned.map((l) => pick(l, l.length, rand)))];
  const count = Math.ceil(order.length / QUESTIONS_PER_STAGE);
  // The last stage is topped up with review questions from the start.
  const padded = [...order, ...order.slice(0, count * QUESTIONS_PER_STAGE - order.length)];
  const stages = Array.from({ length: count }, (_, s) => ({
    n: s + 1,
    questions: padded.slice(s * QUESTIONS_PER_STAGE, (s + 1) * QUESTIONS_PER_STAGE).map((make) => make(rand)),
  }));
  cache.set(level, stages);
  return stages;
}

/** Progress key for a stage, e.g. "wordbank:jhs:3". */
export const wordStageKey = (level: WordBankLevel, n: number) => `wordbank:${level}:${n}`;

/** Free without a subscription: all of Stage 1 and the first 15 questions of Stage 2. */
export const freeQuestionsIn = (n: number) => (n === 1 ? QUESTIONS_PER_STAGE : n === 2 ? FREE_QUESTIONS_IN_STAGE_2 : 0);
