// Creative Arts: the official NaCCA curricula, kept with their official
// numbering and wording (Ministry of Education):
//  - Creative Arts B1 to B3 and B4 to B6 (2019): strands Visual Arts and Performing Arts.
//  - Creative Arts and Design, JHS 1 to 3 / B7 to B9 (2021): strands Design and Creative Arts.
// Our lessons (lessons/*.ts) teach these content standards; they never add
// new curriculum requirements.

export type ClassId = "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8" | "b9";
export type Area = "Design" | "Visual Arts" | "Performing Arts" | "Music" | "Dance and Drama";

export const CLASSES: { id: ClassId; label: string; short: string; level: "p1-3" | "p4-6" | "jhs" }[] = [
  { id: "b1", label: "Primary 1 (B1)", short: "P1", level: "p1-3" },
  { id: "b2", label: "Primary 2 (B2)", short: "P2", level: "p1-3" },
  { id: "b3", label: "Primary 3 (B3)", short: "P3", level: "p1-3" },
  { id: "b4", label: "Primary 4 (B4)", short: "P4", level: "p4-6" },
  { id: "b5", label: "Primary 5 (B5)", short: "P5", level: "p4-6" },
  { id: "b6", label: "Primary 6 (B6)", short: "P6", level: "p4-6" },
  { id: "b7", label: "JHS 1 (B7)", short: "JHS 1", level: "jhs" },
  { id: "b8", label: "JHS 2 (B8)", short: "JHS 2", level: "jhs" },
  { id: "b9", label: "JHS 3 (B9)", short: "JHS 3", level: "jhs" },
];

/** Strands and sub-strands: primary (B1 to B6) and JHS (B7 to B9) differ. */
export const PRIMARY_STRANDS = [
  { code: "1", title: "Visual Arts" },
  { code: "2", title: "Performing Arts" },
];
export const PRIMARY_SUBSTRANDS: Record<string, string> = {
  "1": "Thinking and Exploring Ideas",
  "2": "Planning, Making and Composing",
  "3": "Displaying and Sharing",
  "4": "Appreciating and Appraising",
};
export const JHS_STRANDS: { code: string; title: string; subStrands: Record<string, string> }[] = [
  { code: "1", title: "Design", subStrands: { "1.1": "Design in Nature and the Manmade Environment", "1.2": "Drawing, Shading, Colouring and Modelling for Design", "1.3": "Creativity, Innovation and the Design Process" } },
  { code: "2", title: "Creative Arts", subStrands: { "2.1": "Media and Techniques", "2.2": "Creative and Aesthetic Expression", "2.3": "Connections in Local and Global Cultures" } },
];

export const isJhs = (cls: ClassId) => cls === "b7" || cls === "b8" || cls === "b9";

/** Strand and sub-strand names for a content standard. */
export function placeOf(cls: ClassId, code: string) {
  const [st, ss] = code.split(".");
  if (isJhs(cls)) {
    const strand = JHS_STRANDS.find((s) => s.code === st);
    return { strand: `Strand ${st}: ${strand?.title ?? ""}`, subStrand: `Sub-strand ${st}.${ss}: ${strand?.subStrands[`${st}.${ss}`] ?? ""}` };
  }
  return { strand: `Strand ${st}: ${PRIMARY_STRANDS.find((s) => s.code === st)?.title ?? ""}`, subStrand: `Sub-strand ${ss}: ${PRIMARY_SUBSTRANDS[ss] ?? ""}` };
}

export interface Standard {
  cls: ClassId;
  /** Content standard number, e.g. "1.1.1" (shown as "B7 1.1.1"). */
  code: string;
  area: Area;
  standard: string;
  indicators: { code: string; text: string }[];
}

export const STANDARDS: Standard[] = [
  {
    "cls": "b1",
    "code": "1.1.1",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to generate own ideas for artistic expressions on the people, based on their history and culture, the environment and the topical local/national/global issues.",
    "indicators": [
      {
        "code": "1.1.1.1",
        "text": "Think about the people who live in the local community and describe what you know about their history and their culture or way of life."
      },
      {
        "code": "1.1.1.2",
        "text": "Think about and describe the different visual artworks that are produced or found in the local community."
      },
      {
        "code": "1.1.1.3",
        "text": "Reflect on own experiences and talk about how the visual artworks produced or found in the local community reflect the natural environment."
      },
      {
        "code": "1.1.1.4",
        "text": "Explore own experiences and talk about how the visual artworks produced or found in the local community reflect local topical issues."
      }
    ]
  },
  {
    "cls": "b1",
    "code": "1.2.2",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to organise own ideas through experimenting with available media and techniques for creating/composing artworks, based on the history and culture, the environment and the topical local/national/global issues of other communities.",
    "indicators": [
      {
        "code": "1.2.2.1",
        "text": "Reflect on own experiences of visual artworks produced or found in the local community to plan for making own artworks from imagination to reflect the history and culture or way of life of the people."
      },
      {
        "code": "1.2.2.2",
        "text": "Develop ideas for making own visual artworks that express own understanding of visual artworks produced or found in the local community."
      },
      {
        "code": "1.2.2.3",
        "text": "Explore available means of using relevant visual arts making tools, materials and methods to make own artworks that reflect the natural and man-made environments of the local community."
      },
      {
        "code": "1.2.2.4",
        "text": "Make firm decisions on the relevant visual arts making tools, materials and methods for creating own visual artworks that reflect local topical issues in the local community."
      }
    ]
  },
  {
    "cls": "b1",
    "code": "1.2.3",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to create expressive artworks based on own ideas by applying knowledge of media and methods of production to reflect other cultures in Africa, the visual artists, their culture, the environment and emerging topical issues.",
    "indicators": [
      {
        "code": "1.2.3.1",
        "text": "Create own artworks from imagination using available tools, materials and methods to represent visual artworks produced or found in the local community that reflect the history and culture or way of life of the people."
      },
      {
        "code": "1.2.3.2",
        "text": "Create own artworks from imagination to express own ideas of the visual artworks produced or found in the local community that reflect the natural and manmade environments."
      },
      {
        "code": "1.2.3.3",
        "text": "Create own visual artworks to express own views, knowledge and understanding of topical issues in the local community."
      }
    ]
  },
  {
    "cls": "b1",
    "code": "1.3.4",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to plan a display/presentation of a portfolio of own artworks by identifying, and preparing a venue, selecting and grouping of artworks and inviting target audience for the planned display/performance.",
    "indicators": [
      {
        "code": "1.3.4.1",
        "text": "Plan a display of own artworks to share creative experiences based on visual artworks produced or found in the local community that reflect the history and culture of the people."
      },
      {
        "code": "1.3.4.2",
        "text": "Plan for a display of own visual artworks to share creative experiences based on ideas that reflect the natural and manmade environments in the local community."
      },
      {
        "code": "1.3.4.3",
        "text": "Plan a display of own visual artworks to share own creative experiences based on ideas that reflect topical issues in the local community."
      }
    ]
  },
  {
    "cls": "b1",
    "code": "1.3.5",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to display/present a portfolio of art works that share own knowledge, concepts, ideas and experiences with audience through display/presentation; and using senses/manual/digital applications where necessary, to record for reporting on the events.",
    "indicators": [
      {
        "code": "1.3.5.1",
        "text": "Exhibit own artworks to share own creative experiences of visual artworks that reflect the history and culture or way of life of people in the local community."
      },
      {
        "code": "1.3.5.2",
        "text": "Exhibit own artworks to share own creative experiences of visual artworks that reflect the natural and manmade environments of the local community."
      },
      {
        "code": "1.3.5.3",
        "text": "Exhibit own artworks to share own creative experiences of visual artworks that reflect topical issues in the local community."
      }
    ]
  },
  {
    "cls": "b1",
    "code": "1.4.6",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to analyse, appreciate, appraise/critique and present report on own works and that of others based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values), the recordings and reports.",
    "indicators": [
      {
        "code": "1.4.6.1",
        "text": "Agree on guidelines for viewing and expressing feelings and thoughts about own and others’ displayed visual artworks."
      },
      {
        "code": "1.4.6.2",
        "text": "Use the agreed guidelines to examine and derive meaning from own and others’ displayed visual artworks."
      }
    ]
  },
  {
    "cls": "b1",
    "code": "1.4.7",
    "area": "Visual Arts",
    "standard": "Demonstrate the ability to make informed decisions on displays, presentations, performances, recordings and/or reports based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values) for correlation, correction and future modifications.",
    "indicators": [
      {
        "code": "1.4.7.1",
        "text": "Examine the displayed performing artworks and make decisions on the beauty and usefulness of each artwork based on the agreed guidelines."
      },
      {
        "code": "1.4.7.2",
        "text": "Report own views and feelings about the displayed visual artworks and suggest how the artworks can be modified or improved."
      }
    ]
  },
  {
    "cls": "b1",
    "code": "2.1.1",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to generate own ideas for artistic expressions on the people, based on their history and culture, the environment and the topical local/national/global issues.",
    "indicators": [
      {
        "code": "2.1.1.1",
        "text": "Think about the people who live in the local community and describe what you know about their history and their culture or way of life."
      },
      {
        "code": "2.1.1.2",
        "text": "Think about and describe the different performing artworks that are produced or performed in the local community."
      },
      {
        "code": "2.1.1.3",
        "text": "Reflect on own experiences and talk about how the performing artworks produced or performed in the local community reflect the natural environment."
      },
      {
        "code": "2.1.1.4",
        "text": "Explore own experiences and talk about how performing artworks produced or performed in the local community reflect local topical issues."
      }
    ]
  },
  {
    "cls": "b1",
    "code": "2.2.2",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to organise own ideas through experimenting with available media and techniques for creating/composing artworks, based on the history and culture, the environment and the topical local/national/global issues of other communities.",
    "indicators": [
      {
        "code": "2.2.2.1",
        "text": "Reflect on own experiences of performing artworks that are produced or performed in the local community to plan for creating own artworks that will reflect the history and culture or way of life of people in the local community."
      },
      {
        "code": "2.2.2.2",
        "text": "Develop ideas for making own artworks that express own understanding of performing artworks produced or performed in the local community."
      },
      {
        "code": "2.2.2.3",
        "text": "Explore available means of using relevant performing arts instruments, resources and methods to create own artworks that reflect the natural and manmade environments of the local community."
      },
      {
        "code": "2.2.2.4",
        "text": "Make firm decisions on the relevant performing arts instruments, resources and methods for making own artworks that will reflect topical issues in the local community."
      }
    ]
  },
  {
    "cls": "b1",
    "code": "2.2.3",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to create expressive artworks based on own ideas by applying knowledge of media and methods of production to reflect other cultures in Africa, the visual artists, their culture, the environment and emerging topical issues.",
    "indicators": [
      {
        "code": "2.2.3.1",
        "text": "Create own artworks based on performing artworks produced or performed in the local community that reflect the history and culture or way of life of the people."
      },
      {
        "code": "2.2.3.2",
        "text": "Create own artworks to express own ideas of performing artworks produced or found in the local community that reflect the natural and manmade environments."
      },
      {
        "code": "2.2.3.3",
        "text": "Create own performing artworks to express own views, knowledge and understanding of artworks that reflect topical issues in the local community."
      }
    ]
  },
  {
    "cls": "b1",
    "code": "2.3.4",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to plan a display/presentation of a portfolio of own artworks by identifying, and preparing a venue, selecting and grouping of artworks and inviting target audience for the planned display/performance.",
    "indicators": [
      {
        "code": "2.3.4.1",
        "text": "Plan a display of own artworks to share own creative experiences based on performing artworks that reflect the history and culture or way of life of the people."
      },
      {
        "code": "2.3.4.2",
        "text": "Plan for a display of own performing artworks to share own creative experiences based on ideas that reflect the natural and manmade environments in the local community."
      },
      {
        "code": "2.3.4.3",
        "text": "Plan a display of own performing artworks to share own creative experiences based on ideas that reflect topical issues in the local community."
      }
    ]
  },
  {
    "cls": "b1",
    "code": "2.3.5",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to display/present a portfolio of art works that share own knowledge, concepts, ideas and experiences with audience through display/presentation; and using senses/manual/digital applications where necessary, to record for reporting on the events.",
    "indicators": [
      {
        "code": "2.3.5.1",
        "text": "Perform or present own artworks to share own creative experiences of performing artworks that reflect the history and culture or way of life of people in the local community."
      },
      {
        "code": "2.3.5.2",
        "text": "Perform own artworks to share own creative experiences of performing artworks that reflect the natural and manmade environments in the local community."
      },
      {
        "code": "2.3.5.3",
        "text": "Perform own artworks to share own creative experiences of performing artworks that reflect topical issues in the local community."
      }
    ]
  },
  {
    "cls": "b1",
    "code": "2.4.6",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to analyse, appreciate, appraise/critique and present report on own works and that of others based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values), the recordings and reports.",
    "indicators": [
      {
        "code": "2.4.6.1",
        "text": "Agree on guidelines for viewing and expressing feelings and thoughts about own and others’ displayed performing artworks."
      },
      {
        "code": "2.4.6.2",
        "text": "Use the agreed guidelines to examine and derive meaning from own and others’ displayed performing artworks."
      }
    ]
  },
  {
    "cls": "b1",
    "code": "2.4.7",
    "area": "Performing Arts",
    "standard": "Demonstrate the ability to make informed decisions on displays, presentations, performances, recordings and/or reports based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values) for correlation, correction and future modifications.",
    "indicators": [
      {
        "code": "2.4.7.1",
        "text": "Examine the displayed performing artworks and make decisions on the beauty and usefulness of each artwork based on the agreed guidelines."
      },
      {
        "code": "2.4.7.2",
        "text": "Report own views and feelings about the displayed performing artworks and suggest how the artworks can be modified or improved."
      }
    ]
  },
  {
    "cls": "b2",
    "code": "1.1.1",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to generate own ideas for artistic expressions on the people, based on their history and culture, the environment and the topical local/national/global issues.",
    "indicators": [
      {
        "code": "1.1.1.1",
        "text": "Explore own experiences to talk about visual artworks that reflect the history and culture of people in other Ghanaian communities."
      },
      {
        "code": "1.1.1.2",
        "text": "Explore own experiences to talk about visual artworks that are produced or found in other communities in Ghana."
      },
      {
        "code": "1.1.1.3",
        "text": "Reflect on own experiences to talk about visual artworks that reflect the natural and manmade environments in other communities in Ghana."
      },
      {
        "code": "1.1.1.4",
        "text": "Reflect on own experiences to talk about visual artworks produced or found in other parts of Ghana that reflect topical issues in those communities."
      }
    ]
  },
  {
    "cls": "b2",
    "code": "1.2.2",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to organise own ideas through experimenting with available media and techniques for creating/composing artworks, based on the history and culture, the environment and the topical local/national/global issues of other communities.",
    "indicators": [
      {
        "code": "1.2.2.1",
        "text": "Generate ideas to make own artworks based on visual artworks that reflect the history and culture of people in other communities in Ghana."
      },
      {
        "code": "1.2.2.2",
        "text": "Make decisions to create own artworks from imagination, based on visual artworks produced or found in other communities in Ghana."
      },
      {
        "code": "1.2.2.3",
        "text": "Experiment with available visual arts tools, materials and methods to create own visual artworks that reflect the natural and manmade environments of other Ghanaian communities."
      },
      {
        "code": "1.2.2.4",
        "text": "Plan to create from own imagination, visual artworks that reflect topical issues in other communities in Ghana."
      }
    ]
  },
  {
    "cls": "b2",
    "code": "1.2.3",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to create expressive artworks based on own ideas by applying knowledge of media and methods of production to reflect other cultures in Africa, the visual artists, their culture, the environment and emerging topical issues.",
    "indicators": [
      {
        "code": "1.2.3.1",
        "text": "Create own visual artworks using available visual arts media and methods to represent artworks that reflect the history and culture or way of life of people in other communities in Ghana."
      },
      {
        "code": "1.2.3.2",
        "text": "Create own artworks using available visual arts media and methods to represent artworks that reflect the natural and manmade environments in other communities in Ghana."
      },
      {
        "code": "1.2.3.3",
        "text": "Create own visual artworks to express own views, knowledge and understanding of topical issues in other Ghanaian communities."
      }
    ]
  },
  {
    "cls": "b2",
    "code": "1.3.4",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to plan a display/presentation of a portfolio of own artworks by identifying, and preparing a venue, selecting and grouping of artworks and inviting target audience for the planned display/performance.",
    "indicators": [
      {
        "code": "1.3.4.1",
        "text": "Plan for a display of own artworks to share creative experiences based on ideas from visual artworks that reflect the history and culture of people in other Ghanaian communities."
      },
      {
        "code": "1.3.4.2",
        "text": "Plan for a display of own visual artworks to share creative experiences based on ideas that reflect the natural and manmade environments in other Ghanaian communities."
      },
      {
        "code": "1.3.4.3",
        "text": "Plan a display of own visual artworks to share creative experiences based on ideas that reflect topical issues in other Ghanaian communities."
      }
    ]
  },
  {
    "cls": "b2",
    "code": "1.3.5",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to display/present a portfolio of art works that share own knowledge, concepts, ideas and experiences with audience through display/presentation; and using senses/manual/digital applications where necessary, to record for reporting on the events.",
    "indicators": [
      {
        "code": "1.3.5.1",
        "text": "Display own visual artworks to share creative experiences that reflect the history and culture or way of life of people in other Ghanaian communities."
      },
      {
        "code": "1.3.5.2",
        "text": "Display own visual artworks to share creative experiences that reflect the natural and manmade environments in other Ghanaian communities."
      },
      {
        "code": "1.3.5.3",
        "text": "Display own visual artworks to share creative experiences that reflect topical issues in other Ghanaian communities."
      }
    ]
  },
  {
    "cls": "b2",
    "code": "1.4.6",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to analyse, appreciate, appraise/critique and present report on own works and that of others based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values), the recordings and reports.",
    "indicators": [
      {
        "code": "1.4.6.1",
        "text": "Agree on guidelines for viewing visual artworks and for expressing own feelings and thoughts about own and others’ displayed artworks."
      },
      {
        "code": "1.4.6.2",
        "text": "Agree on guidelines for assessing and deriving meaning from own and others’ displayed visual artworks."
      }
    ]
  },
  {
    "cls": "b2",
    "code": "1.4.7",
    "area": "Visual Arts",
    "standard": "Demonstrate the ability to make informed decisions on displays, presentations, performances, recordings and/or reports based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values) for correlation, correction and future modifications.",
    "indicators": [
      {
        "code": "1.4.7.1",
        "text": "Use the agreed guidelines to make decisions on the beauty and usefulness of the displayed visual artworks as representations of artworks produced or found in other Ghanaian communities."
      },
      {
        "code": "1.4.7.2",
        "text": "Report own views about the beauty and usefulness of the displayed visual artworks and make suggestions for modifying or improving upon them."
      }
    ]
  },
  {
    "cls": "b2",
    "code": "2.1.1",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to generate own ideas for artistic expressions on the people, based on their history and culture, the environment and the topical local/national/global issues.",
    "indicators": [
      {
        "code": "2.1.1.1",
        "text": "Explore own experiences to talk about performing artworks that reflect the history and culture of people in other communities in Ghana."
      },
      {
        "code": "2.1.1.2",
        "text": "Explore own experiences to talk about performing artworks that reflect people in other communities in Ghana."
      },
      {
        "code": "2.1.1.3",
        "text": "Explore own experiences to talk about performing artworks that reflect the natural and manmade environments in other communities in Ghana."
      },
      {
        "code": "2.1.1.4",
        "text": "Explore own experiences to talk about performing artworks that reflect topical issues in other communities in Ghana."
      }
    ]
  },
  {
    "cls": "b2",
    "code": "2.2.2",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to organise own ideas through experimenting with available media and techniques for creating/composing artworks, based on the history and culture, the environment and the topical local/national/global issues of other communities.",
    "indicators": [
      {
        "code": "2.2.2.1",
        "text": "Generate ideas to create own artworks based on performing artworks that reflect the history and culture of people in other Ghanaian communities."
      },
      {
        "code": "2.2.2.2",
        "text": "Make decisions to create own artworks from imagination based on performing artworks produced or performed in other communities in Ghana."
      },
      {
        "code": "2.2.2.3",
        "text": "Experiment with available performing arts instruments, resources and techniques to create own artworks that reflect the natural and manmade environments in other communities in Ghana."
      },
      {
        "code": "2.2.2.4",
        "text": "Experiment with available performing arts instruments, resources and techniques to create artworks that reflect topical issues in other communities in Ghana."
      }
    ]
  },
  {
    "cls": "b2",
    "code": "2.2.3",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to create expressive artworks based on own ideas by applying knowledge of media and methods of production to reflect other cultures in Africa, the visual artists, their culture, the environment and emerging topical issues.",
    "indicators": [
      {
        "code": "2.2.3.1",
        "text": "Compose own artworks using available performing arts instruments, resources and methods to represent performing artworks that reflect the history and way of life of people in other communities in Ghana."
      },
      {
        "code": "2.2.3.2",
        "text": "Compose own artworks using available performing arts instruments, resources and methods to represent performing artworks that reflect the natural and manmade environments in other Ghanaian communities."
      },
      {
        "code": "2.2.3.3",
        "text": "Create performing artworks to express own views, knowledge and understanding of topical issues in other Ghanaian communities."
      }
    ]
  },
  {
    "cls": "b2",
    "code": "2.3.4",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to plan a display/presentation of a portfolio of own artworks by identifying, and preparing a venue, selecting and grouping of artworks and inviting target audience for the planned display/performance.",
    "indicators": [
      {
        "code": "2.3.4.1",
        "text": "Plan a display of own artworks to share creative experiences based on ideas of performing artworks that reflect the history and culture or way of life of people in other Ghanaian communities."
      },
      {
        "code": "2.3.4.2",
        "text": "Plan for a display of own performing artworks to share creative experiences based on ideas that reflect the natural and manmade environments in other Ghanaian communities."
      },
      {
        "code": "2.3.4.3",
        "text": "Plan a display of own performing artworks to share creative experiences based on ideas that reflect topical issues in other Ghanaian communities."
      }
    ]
  },
  {
    "cls": "b2",
    "code": "2.3.5",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to display/present a portfolio of art works that share own knowledge, concepts, ideas and experiences with audience through display/presentation; and using senses/manual/digital applications where necessary, to record for reporting on the events.",
    "indicators": [
      {
        "code": "2.3.5.1",
        "text": "Perform own artworks to share creative experiences that reflect the history and culture or way of life of people in other communities in Ghana."
      },
      {
        "code": "2.3.5.2",
        "text": "Perform own artworks to share creative experiences that reflect the natural and manmade environments in other Ghanaian communities."
      },
      {
        "code": "2.3.5.3",
        "text": "Perform own artworks to share creative experiences that reflect topical issues in other Ghanaian communities."
      }
    ]
  },
  {
    "cls": "b2",
    "code": "2.4.6",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to analyse, appreciate, appraise/critique and present report on own works and that of others based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values), the recordings and reports.",
    "indicators": [
      {
        "code": "2.4.6.1",
        "text": "Agree on guidelines for viewing performing artworks and expressing own feelings and thoughts about own and others’ performances as representations of artworks produced or found in other Ghanaian communities."
      },
      {
        "code": "2.4.6.2",
        "text": "Agree on guidelines for assessing and deriving meaning from own and others’ performing artworks as representations of artworks produced or found in other Ghanaian communities."
      }
    ]
  },
  {
    "cls": "b2",
    "code": "2.4.7",
    "area": "Performing Arts",
    "standard": "Demonstrate the ability to make informed decisions on displays, presentations, performances, recordings and/or reports based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values) for correlation, correction and future modifications.",
    "indicators": [
      {
        "code": "2.4.7.1",
        "text": "Use the agreed guidelines to make decisions on the beauty and usefulness of the displayed performing artworks as representations of artworks produced or found in other Ghanaian communities."
      },
      {
        "code": "2.4.7.2",
        "text": "Report own views and feelings about the displayed performing artworks and suggest how the artworks can be modified or improved."
      }
    ]
  },
  {
    "cls": "b3",
    "code": "1.1.1",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to generate own ideas for artistic expressions on the people, based on their history and culture, the environment and the topical local/national/global issues.",
    "indicators": [
      {
        "code": "1.1.1.1",
        "text": "Study and talk about visual artworks produced or found in other African communities that reflect the history and culture of people in those areas in Africa."
      },
      {
        "code": "1.1.1.2",
        "text": "Generate ideas from visual artworks produced or found in other African communities for making own visual artworks that reflect people in those areas in Africa."
      },
      {
        "code": "1.1.1.3",
        "text": "Study and talk about visual artworks produced or found in other African communities that reflect the natural and manmade environments in those areas in Africa."
      },
      {
        "code": "1.1.1.4",
        "text": "Study and talk about visual artworks produced or found in other African communities that reflect topical issues in those areas in Africa."
      }
    ]
  },
  {
    "cls": "b3",
    "code": "1.2.2",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to organise own ideas through experimenting with available media and techniques for creating/composing artworks, based on the history and culture, the environment and the topical local/national/global issues of other communities.",
    "indicators": [
      {
        "code": "1.2.2.1",
        "text": "Plan own artworks that represent visual artworks produced or found in other communities in Africa, by making decisions on the tools, materials and methods the visual artists used to create artworks that reflect the people, their history and their way of life in those areas in Africa."
      },
      {
        "code": "1.2.2.2",
        "text": "Plan to create own artworks that represent visual artworks produced or found in other communities in Africa, by experimenting with available tools, materials and methods for creating artworks that reflect the natural and manmade environments in those areas in Africa."
      },
      {
        "code": "1.2.2.3",
        "text": "Plan for making own artworks that represent visual artworks produced or found in other communities in Africa, by experimenting with available tools, materials and methods for creating visual artworks that reflect topical issues in those areas of Africa  explore malleable materials such as clay, papier mâché and plasticine to create artworks by pinching, slabbing, modelling, casting, carving, embossing, engraving, incising, scooping, luting, etc.;  explore knitting, knotting, embroidering, sewing, stitching and weaving skills using available pliable materials from the environment such as cane, sisal, coir, jute, flax, etc.;  discuss the visual artworks that reflect topical issues in other cultures in Africa."
      }
    ]
  },
  {
    "cls": "b3",
    "code": "1.2.3",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to create expressive artworks based on own ideas by applying knowledge of media and methods of production to reflect other cultures in Africa, the visual artists, their culture, the environment and emerging topical issues.",
    "indicators": [
      {
        "code": "1.2.3.1",
        "text": "Create own functional visual artworks by skilfully using available visual arts tools, material and methods to express own views of visual artworks that reflect the history and culture of people in other African communities."
      },
      {
        "code": "1.2.3.2",
        "text": "Create own functional visual artworks by skilfully using available visual arts tools, material and methods to express own view about visual artworks that reflect the natural and manmade environments in other African communities."
      },
      {
        "code": "1.2.3.3",
        "text": "Create own functional visual artworks using available materials, tools and methods to express own views that reflect topical issues in Africa."
      }
    ]
  },
  {
    "cls": "b3",
    "code": "1.3.4",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to plan a display/presentation of a portfolio of own artworks by identifying, and preparing a venue, selecting and grouping of artworks and inviting target audience for the planned display/performance.",
    "indicators": [
      {
        "code": "1.3.4.1",
        "text": "Plan a display of own visual artworks to share creative experiences based on ideas that reflect the history and way of life of people in other African communities."
      },
      {
        "code": "1.3.4.2",
        "text": "Plan for a display of own artworks to share creative experiences based on ideas that reflect the natural and manmade environments in other African communities."
      },
      {
        "code": "1.3.4.3",
        "text": "Plan for a display of own artworks to share creative experiences based on ideas that reflect topical issues in other African communities."
      }
    ]
  },
  {
    "cls": "b3",
    "code": "1.3.5",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to display/present a portfolio of art works that share own knowledge, concepts, ideas and experiences with audience through display/presentation; and using senses/manual/digital applications where necessary, to record for reporting on the events.",
    "indicators": [
      {
        "code": "1.3.5.1",
        "text": "Display own visual artworks to share creative experiences based on ideas that reflect the history and culture of people in other African communities."
      },
      {
        "code": "1.3.5.2",
        "text": "Display own visual artworks to share creative experiences based on ideas that reflect the natural and manmade environments of other African communities."
      },
      {
        "code": "1.3.5.3",
        "text": "Display own visual artworks to share creative experiences based on ideas that reflect topical issues in other African communities."
      }
    ]
  },
  {
    "cls": "b3",
    "code": "1.4.6",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to analyse, appreciate, appraise/critique and present report on own works and that of others based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values), the recordings and reports.",
    "indicators": [
      {
        "code": "1.4.6.1",
        "text": "Agree on guidelines for viewing artworks and expressing own feelings and thoughts about own and others’ displayed visual artworks as representations of artworks produced or found in other African communities."
      },
      {
        "code": "1.4.6.2",
        "text": "Agree on guidelines for assessing and deriving meaning from own and others’ visual artworks as representations of artworks produced or found in other African communities."
      }
    ]
  },
  {
    "cls": "b3",
    "code": "1.4.7",
    "area": "Visual Arts",
    "standard": "Demonstrate the ability to make informed decisions on displays, presentations, performances, recordings and/or reports based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values) for correlation, correction and future modifications.",
    "indicators": [
      {
        "code": "1.4.7.1",
        "text": "Use the agreed guidelines to make decisions on the beauty and usefulness of the displayed visual artworks as representations of artworks produced or found in other African communities."
      },
      {
        "code": "1.4.7.2",
        "text": "Report own views about the beauty and usefulness of the displayed visual artworks and make suggestions for modifying or improving upon them for future presentations."
      }
    ]
  },
  {
    "cls": "b3",
    "code": "2.1.1",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to generate own ideas for artistic expressions on the people, based on their history and culture, the environment and the topical local/national/global issues.",
    "indicators": [
      {
        "code": "2.1.1.1",
        "text": "Study and talk about performing artworks produced or performed in other African communities that reflect the history and culture or way of life of people in those areas in Africa."
      },
      {
        "code": "2.1.1.2",
        "text": "Generate ideas from performing artworks produced or performed in other African communities for creating own artworks that reflect people in those areas in Africa."
      },
      {
        "code": "2.1.1.3",
        "text": "Study and talk about performing artworks produced or performed in other African communities that reflect the natural and manmade environments in those areas in Africa."
      },
      {
        "code": "2.1.1.4",
        "text": "Study and talk about performing artworks produced or performed in other African communities that reflect topical issues in those areas of Africa."
      }
    ]
  },
  {
    "cls": "b3",
    "code": "2.2.2",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to organise own ideas through experimenting with available media and techniques for creating/composing artworks, based on the history and culture, the environment and the topical local/national/global issues of other communities.",
    "indicators": [
      {
        "code": "2.2.2.1",
        "text": "Plan own artworks that represent performing artworks produced or performed in other communities in Africa, by making decisions on the instruments, resources and techniques used by the performing artists for creating artworks that reflect the people, their history and their culture in those areas of Africa."
      },
      {
        "code": "2.2.2.2",
        "text": "Plan to create own artworks that represent performing arts in other communities in Africa, by experimenting with available instruments, resources and techniques for producing performing artworks that reflect the natural and manmade environments in those areas in Africa."
      },
      {
        "code": "2.2.2.3",
        "text": "Plan for making own artworks that represent performing artworks produced or found in other communities in Africa, by experimenting with available instruments, resources and techniques for producing artworks that reflect topical issues in those areas in Africa  explore available instruments, equipment, sounds, rhythms and movement patterns that are good for composing and performing music, dance, drama, etc.;  experiment with the available instruments, equipment, sounds, movement etc. to perform some of the compositions from other parts of Africa that reflect topical issues such as unemployment, safe road practices, energy efficiency and conservation, plastic waste."
      }
    ]
  },
  {
    "cls": "b3",
    "code": "2.2.3",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to create expressive artworks based on own ideas by applying knowledge of media and methods of production to reflect other cultures in Africa, the visual artists, their culture, the environment and emerging topical issues.",
    "indicators": [
      {
        "code": "2.2.3.1",
        "text": "Create own artworks by skilfully using available instruments, resources and techniques to express own views of performing artworks of other Africa communities that reflect the people, their history and their culture in those areas."
      },
      {
        "code": "2.2.3.2",
        "text": "Create own artworks using available instruments, resources and techniques to express own views about performing artworks that reflect the natural and manmade environments in other African communities."
      },
      {
        "code": "2.2.3.3",
        "text": "Create own music, dance and drama performances using available instruments, resources and methods to express own views that reflect topical issues in other Africa communities."
      }
    ]
  },
  {
    "cls": "b3",
    "code": "2.3.4",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to plan a display/presentation of a portfolio of own artworks by identifying, and preparing a venue, selecting and grouping of artworks and inviting target audience for the planned display/performance.",
    "indicators": [
      {
        "code": "2.3.4.1",
        "text": "Plan a display of own performing artworks to share creative experiences based on ideas that reflect the history and culture of people in other African communities."
      },
      {
        "code": "2.3.4.2",
        "text": "Plan a display of own music, dance and drama to share creative experiences based on ideas that reflect the natural and manmade environments in other African communities."
      },
      {
        "code": "2.3.4.3",
        "text": "Plan a display of own music, dance and drama to share creative experiences based on ideas that reflect topical issues in other African communities."
      }
    ]
  },
  {
    "cls": "b3",
    "code": "2.3.5",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to display/present a portfolio of art works that share own knowledge, concepts, ideas and experiences with audience through display/presentation; and using senses/manual/digital applications where necessary, to record for reporting on the events.",
    "indicators": [
      {
        "code": "2.3.5.1",
        "text": "Perform own artworks to share creative experiences based on ideas that reflect the history and culture of people in other African communities."
      },
      {
        "code": "2.3.5.2",
        "text": "Perform own artworks to share creative experiences based on ideas that reflect the natural and manmade environments in other African communities."
      },
      {
        "code": "2.3.5.3",
        "text": "Perform own music, dance and drama to share creative experiences based on ideas that reflect topical issues in other African communities."
      }
    ]
  },
  {
    "cls": "b3",
    "code": "2.4.6",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to analyse, appreciate, appraise/critique and present report on own works and that of others based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values), the recordings and reports.",
    "indicators": [
      {
        "code": "2.4.6.1",
        "text": "Agree on guidelines for viewing performing artworks and expressing own feelings and thoughts about own and others’ performances as representations of artworks produced or found in other African communities."
      },
      {
        "code": "2.4.6.2",
        "text": "Use the agreed guidelines to examine and derive meaning from own and others’ performances as representations of artworks produced or found in other African communities."
      }
    ]
  },
  {
    "cls": "b3",
    "code": "2.4.7",
    "area": "Performing Arts",
    "standard": "Demonstrate the ability to make informed decisions on displays, presentations, performances, recordings and/or reports based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values) for correlation, correction and future modifications.",
    "indicators": [
      {
        "code": "2.4.7.1",
        "text": "Use agreed guidelines to make informed decisions about the value and functions of own and others’ music, dance and drama performances that express own views of people in other African communities."
      },
      {
        "code": "2.4.7.2",
        "text": "Based on the agreed guidelines, generate feedback or reports on how own and others’ displayed performing artworks could be modified or enhanced for future presentations."
      }
    ]
  },
  {
    "cls": "b4",
    "code": "1.1.1",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to generate own ideas for artistic expressions on the people, based on their history and culture, the environment and the topical local/national/global issues.",
    "indicators": [
      {
        "code": "1.1.1.1",
        "text": "Study and talk about visual artworks created by selected Ghanaian visual artists that reflect the history and culture of the people of Ghana."
      },
      {
        "code": "1.1.1.2",
        "text": "Study and talk about visual artworks created by selected Ghanaian visual artists to generate ideas for designing and making own visual artworks."
      },
      {
        "code": "1.1.1.3",
        "text": "Generate ideas by studying visual artworks created by selected Ghanaian visual artists that reflect the natural and manmade environments of some communities in Ghana."
      },
      {
        "code": "1.1.1.4",
        "text": "Make decisions for designing and creating own visual artworks that will reflect natural and manmade environments of some communities in Ghana."
      },
      {
        "code": "1.1.1.5",
        "text": "Develop ideas by studying the artworks of some Ghanaian visual artists that reflect topical issues in Ghana."
      },
      {
        "code": "1.1.1.6",
        "text": "Explore through brainstorming to generate ideas for creating own visual artworks that reflect topical issues in Ghana."
      }
    ]
  },
  {
    "cls": "b4",
    "code": "1.2.2",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to organise own ideas through experimenting with available media and techniques for creating/composing artworks, based on the history and culture, the environment and the topical local/national/global issues of other communities.",
    "indicators": [
      {
        "code": "1.2.2.1",
        "text": "Experiment with available visual arts media and methods to create artworks that express own views, knowledge and understanding of visual artworks that reflect the history and culture of the people in Ghana."
      },
      {
        "code": "1.2.2.2",
        "text": "Experiment with available visual arts media and methods to create artworks that express own views, knowledge and understanding of the natural and manmade environments in some Ghanaian communities."
      },
      {
        "code": "1.2.2.3",
        "text": "Experiment with available visual arts media and methods to create artworks based on own views, knowledge and understanding of topical issues in Ghana."
      }
    ]
  },
  {
    "cls": "b4",
    "code": "1.2.3",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to create expressive artworks based on own ideas by applying knowledge of media and methods of production to reflect other cultures in Africa, the visual artists, their culture, the environment and emerging topical issues.",
    "indicators": [
      {
        "code": "1.2.3.1",
        "text": "Create own artworks using available visual arts media and methods to express own views, knowledge and understanding of the history and culture of the people of Ghana."
      },
      {
        "code": "1.2.3.2",
        "text": "Create own artworks using available visual arts media and methods to express own views, knowledge and understanding of the natural and manmade environments of some Ghanaian communities."
      },
      {
        "code": "1.2.3.3",
        "text": "Create own artworks using available visual arts media and methods to express own views, knowledge and understanding of performing artworks that reflect topical issues in Ghana."
      }
    ]
  },
  {
    "cls": "b4",
    "code": "1.3.4",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to plan a display/presentation of a portfolio of own artworks by identifying, and preparing a venue, selecting and grouping of artworks and inviting target audience for the planned display/performance.",
    "indicators": [
      {
        "code": "1.3.4.1",
        "text": "Plan an exhibition of own artworks to share creative experiences based on own ideas, knowledge and understanding of the history and culture of the people of Ghana."
      },
      {
        "code": "1.3.4.2",
        "text": "Plan an exhibition of own artworks to share creative experiences based on own ideas, knowledge and understanding of visual artworks that reflect the natural and manmade environments of some Ghanaian communities."
      },
      {
        "code": "1.3.4.3",
        "text": "Plan an exhibition of own artworks to share creative experiences based on own ideas, knowledge and understanding of topical issues in Ghana."
      }
    ]
  },
  {
    "cls": "b4",
    "code": "1.3.5",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to display/present a portfolio of art works that share own knowledge, concepts, ideas and experiences with audience through display/presentation; and using senses/manual/digital applications where necessary, to record for reporting on the events.",
    "indicators": [
      {
        "code": "1.3.5.1",
        "text": "Display own artworks to share creative experiences based on own ideas, knowledge and understanding of the history and culture of the people of Ghana."
      },
      {
        "code": "1.3.5.2",
        "text": "Display own artworks to share creative experiences based on own ideas, knowledge and understanding of the natural and manmade environments of some communities in Ghana."
      },
      {
        "code": "1.3.5.3",
        "text": "Display own artworks to share creative experiences based on own ideas, knowledge and understanding of topical issues in Ghana."
      }
    ]
  },
  {
    "cls": "b4",
    "code": "1.4.6",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to analyse, appreciate, appraise/critique and present report on own works and that of others based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values), the recordings and reports.",
    "indicators": [
      {
        "code": "1.4.6.1",
        "text": "Develop guidelines for appreciating and appraising own and others’ visual artworks that reflect the history and culture of the people of Ghana."
      },
      {
        "code": "1.4.6.2",
        "text": "Develop guidelines for appraising and appreciating own and others’ visual artworks that reflect the natural and manmade environments of some communities in Ghana."
      },
      {
        "code": "1.4.6.3",
        "text": "Develop guidelines for appraising and appreciating own and others’ visual artworks that reflect topical issues in Ghana."
      }
    ]
  },
  {
    "cls": "b4",
    "code": "1.4.7",
    "area": "Visual Arts",
    "standard": "Demonstrate the ability to make informed decisions on displays, presentations, performances, recordings and/or reports based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values) for correlation, correction and future modifications.",
    "indicators": [
      {
        "code": "1.4.7.1",
        "text": "Analyse and appreciate own and others’ visual artworks based on the developed guidelines and present own reports as feedback on the artworks that reflect the history and culture of the people of Ghana."
      },
      {
        "code": "1.4.7.2",
        "text": "Analyse and appreciate own or others’ visual artworks based on the developed guidelines and present own reports as feedback on artworks that reflect the natural and manmade environments of some communities in Ghana."
      },
      {
        "code": "1.4.7.3",
        "text": "Analyse and appreciate own or others’ visual artworks using the developed guidelines and present own report as feedback on artworks that reflect topical issues in Ghana."
      }
    ]
  },
  {
    "cls": "b4",
    "code": "2.1.1",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to generate own ideas for artistic expressions on the people, based on their history and culture, the environment and the topical local/national/global issues.",
    "indicators": [
      {
        "code": "2.1.1.1",
        "text": "Study the performing artworks created by some Ghanaian performing artists that reflect the history and the culture of the people in Ghana."
      },
      {
        "code": "2.1.1.2",
        "text": "Generate ideas from the performing artworks of some Ghanaian performing artists studied for planning own compositions and performances that will reflect the history and culture of the people of Ghana."
      },
      {
        "code": "2.1.1.3",
        "text": "Study the performing artworks created by some Ghanaian performing artists that reflect the natural and manmade environments of some communities in Ghana."
      },
      {
        "code": "2.1.1.4",
        "text": "Generate own ideas for composing and performing own artworks that will reflect the natural and manmade environments of some communities in Ghana."
      },
      {
        "code": "2.1.1.5",
        "text": "Study the performing artworks of some Ghanaian performing artists that reflect topical issues in Ghana."
      },
      {
        "code": "2.1.1.6",
        "text": "Explore through brainstorming to develop ideas for creating own performing artworks that will reflect topical issues in Ghana."
      }
    ]
  },
  {
    "cls": "b4",
    "code": "2.2.2",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to organise own ideas through experimenting with available media and techniques for creating/composing artworks, based on the history and culture, the environment and the topical local/national/global issues of other communities.",
    "indicators": [
      {
        "code": "2.2.2.1",
        "text": "Experiment with available performing arts media and techniques to create artworks based on own views, knowledge and understanding of performing artworks that reflect the history and culture of the people of Ghana."
      },
      {
        "code": "2.2.2.2",
        "text": "Experiment with available performing arts media and techniques to create performing artworks based on own views, knowledge and understanding of the natural and manmade environments in some Ghanaian communities."
      },
      {
        "code": "2.2.2.3",
        "text": "Experiment with available performing arts media and techniques to create performing artworks based on own views, knowledge and understanding of topical issues in Ghana."
      }
    ]
  },
  {
    "cls": "b4",
    "code": "2.2.3",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to create expressive artworks based on own ideas by applying knowledge of media and methods of production to reflect other cultures in Africa, the visual artists, their culture, the environment and emerging topical issues.",
    "indicators": [
      {
        "code": "2.2.3.1",
        "text": "Create own artworks using available performing arts media and techniques to express own views, knowledge and understanding of the history and culture of the people of Ghana."
      },
      {
        "code": "2.2.3.2",
        "text": "Create own artworks using available performing arts media and techniques to express own views, knowledge and understanding of the natural and manmade environments of some Ghanaian communities."
      },
      {
        "code": "2.2.3.3",
        "text": "Create own artworks using available performing arts media and techniques to express own views, knowledge and understanding of performing artworks that reflect topical issues in Ghana."
      }
    ]
  },
  {
    "cls": "b4",
    "code": "2.3.4",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to plan a display/presentation of a portfolio of own artworks by identifying, and preparing a venue, selecting and grouping of artworks and inviting target audience for the planned display/performance.",
    "indicators": [
      {
        "code": "2.3.4.1",
        "text": "Plan a performance of compositions to share creative experiences based on own ideas, knowledge and understanding of the history and culture of the people of Ghana."
      },
      {
        "code": "2.3.4.2",
        "text": "Plan a performance of compositions to share creative experiences based on own ideas, knowledge and understanding of performing artworks that reflect the natural and manmade environments of some communities in Ghana."
      },
      {
        "code": "2.3.4.3",
        "text": "Plan a performance of own compositions to share creative experiences based on own ideas, knowledge and understanding of topical issues in Ghana Learners:  watch a short video or live performances (preferably during the circuit, district or regional cultural festival of the cultural education unit of the Ghana Education Service) that reflect current topical issues of national concern in Ghana.  discuss the need for performing compositions of own music, dance, drama, poetry, etc.  develop a roadmap for the performances by: - fixing a date, - selecting a venue, - inviting an audience;  brainstorm to agree on a theme for the performance;  send manual and/or electronic invitations (e.g. letters, postcards, WhatsApp, E-mail, Twitter, Instagram, Facebook, announcements, posters, jingles) to target audience, for example parents, PTA/SMC members, stakeholders, colleague learners;  select compositions by considering creativity and originality, lyrics, movement patterns, dynamics and relevance of the message to the theme, social and cultural importance;  decide on mode and arrangement of performances (e.g. monologue/solo/group, costumes, props).;  getting ready: plan the sequence of events, stage/site plan, identifying the positions of all facilities (e.g. PA system, lightings, performance zone, entry, exit, changing and makeup rooms/corner), characters, directors, stage managers, audience, health and security ;personnel,  clean and prepare the venue and its environment and make it ready for the performance;  plan for post-performance activities such as cleaning, appreciation, evaluation, reporting, etc. 9."
      }
    ]
  },
  {
    "cls": "b4",
    "code": "2.3.5",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to display/present a portfolio of art works that share own knowledge, concepts, ideas and experiences with audience through display/presentation; and using senses/manual/digital applications where necessary, to record for reporting on the events.",
    "indicators": [
      {
        "code": "2.3.5.1",
        "text": "Perform own compositions to share creative experiences based on own ideas, knowledge and understanding of the history and culture of the people of Ghana."
      },
      {
        "code": "2.3.5.2",
        "text": "Perform own compositions to share creative experiences based on own ideas, knowledge and understanding of the natural and manmade environments of some communities in Ghana."
      },
      {
        "code": "2.3.5.3",
        "text": "Perform own compositions to share creative experiences based on own ideas, knowledge and understanding of topical issues in Ghana."
      }
    ]
  },
  {
    "cls": "b4",
    "code": "2.4.6",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to analyse, appreciate, appraise/critique and present report on own works and that of others based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values), the recordings and reports.",
    "indicators": [
      {
        "code": "2.4.6.1",
        "text": "Develop guidelines for appraising and appreciating own and others’ performing artworks that reflect the history and culture of the people of Ghana."
      },
      {
        "code": "2.4.6.2",
        "text": "Develop guidelines for appraising and appreciating own and others’ performing artworks that reflect the natural and manmade environments of some communities in Ghana."
      },
      {
        "code": "2.4.6.3",
        "text": "Develop guidelines for appraising and appreciating own and others’ performing artworks that reflect topical issues in Ghana."
      }
    ]
  },
  {
    "cls": "b4",
    "code": "2.4.7",
    "area": "Performing Arts",
    "standard": "Demonstrate the ability to make informed decisions on displays, presentations, performances, recordings and/or reports based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values) for correlation, correction and future modifications.",
    "indicators": [
      {
        "code": "2.4.7.1",
        "text": "Analyse and appraise own or others’ compositions and performances and present reports/feedback on works that reflect the history and culture of the people of Ghana."
      },
      {
        "code": "2.4.7.2",
        "text": "Analyse and appreciate/appraise own or others’ compositions and performances and present reports/feedback on works that reflect the natural and manmade environments of some communities in Ghana."
      }
    ]
  },
  {
    "cls": "b5",
    "code": "1.1.1",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to generate own ideas for artistic expressions on the people, based on their history and culture, the environment and the topical local/national/global issues.",
    "indicators": [
      {
        "code": "1.1.1.1",
        "text": "Study some visual artworks created by Ghanaian and other African visual artists living in Africa and examine how the artworks reflect the history and culture of the people in Africa."
      },
      {
        "code": "1.1.1.2",
        "text": "Explore to generate ideas by studying visual artworks created by selected Ghanaian and other African visual artists living in Africa that reflect the history and culture of the people of Africa."
      },
      {
        "code": "1.1.1.3",
        "text": "Study some artworks created by Ghanaian and other African visual artists studied that reflect the physical and social environments of some African communities."
      },
      {
        "code": "1.1.1.4",
        "text": "Generate own ideas for designing and creating own visual artworks that reflect the physical and social environments of some African communities."
      },
      {
        "code": "1.1.1.5",
        "text": "Study the artworks of Ghanaian and other African visual artists that reflect topical  issues in Africa ."
      },
      {
        "code": "1.1.1.6",
        "text": "Brainstorm and come out with ideas for creating own visual works that will reflect topical issues in Africa."
      }
    ]
  },
  {
    "cls": "b5",
    "code": "1.2.2",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to organise own ideas through experimenting with available media and techniques for creating/composing artworks, based on the history and culture, the environment and the topical local/national/global issues of other communities.",
    "indicators": [
      {
        "code": "1.2.2.1",
        "text": "Experiment with available relevant visual arts media and methods to create own visual artworks that reflect the history and culture of the people of Africa."
      },
      {
        "code": "1.2.2.2",
        "text": "Experiment with available relevant visual arts media and methods to create own visual artworks that reflect the physical and social environments of some African communities."
      },
      {
        "code": "1.2.2.3",
        "text": "Experiment with available relevant visual arts media and methods to create own visual artworks that reflect topical issues in Africa."
      }
    ]
  },
  {
    "cls": "b5",
    "code": "1.2.3",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to create expressive artworks based on own ideas by applying knowledge of media and methods of production to reflect other cultures in Africa, the visual artists, their culture, the environment and emerging topical issues.",
    "indicators": [
      {
        "code": "1.2.3.1",
        "text": "Create own visual artworks based on own ideas, knowledge and understanding of artworks that reflect the history and culture of the people of Africa."
      },
      {
        "code": "1.2.3.2",
        "text": "Create own visual artworks based on own ideas, knowledge and understanding of artworks that reflect the physical and social environments of some communities in Africa."
      },
      {
        "code": "1.2.3.3",
        "text": "Create own visual artworks based on own ideas, knowledge and understanding of of artworks that reflect topical issues in Africa."
      }
    ]
  },
  {
    "cls": "b5",
    "code": "1.3.4",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to plan a display/presentation of a portfolio of own artworks by identifying, and preparing a venue, selecting and grouping of artworks and inviting target audience for the planned display/performance.",
    "indicators": [
      {
        "code": "1.3.4.1",
        "text": "Plan an exhibition of own portfolio of visual artworks to educate and share creative experiences of artworks that reflect the history and culture of the people of Africa."
      },
      {
        "code": "1.3.4.2",
        "text": "Plan an exhibition of own portfolio of visual artworks to educate and share creative experiences of artworks that reflect the physical and social environments in some communities in Africa."
      },
      {
        "code": "1.3.4.3",
        "text": "Plan an exhibition of own portfolio of visual artworks to educate and share creative experiences of artworks that reflect the topical issues in Africa."
      }
    ]
  },
  {
    "cls": "b5",
    "code": "1.3.5",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to display/present a portfolio of art works that share own knowledge, concepts, ideas and experiences with audience through display/presentation; and using senses/manual/digital applications where necessary, to record for reporting on the events.",
    "indicators": [
      {
        "code": "1.3.5.1",
        "text": "Exhibit portfolio of own and others’ visual art artworks to share creative experiences of artworks that reflect the history and culture of the people of Africa."
      },
      {
        "code": "1.3.5.2",
        "text": "Exhibit portfolio of own and others’ art artworks to share creative experiences of artworks that reflect the physical and social environments of some communities in Africa."
      },
      {
        "code": "1.3.5.3",
        "text": "Exhibit portfolio of own and others’ art artworks to share creative experiences of artworks that reflect topical issues in Africa."
      }
    ]
  },
  {
    "cls": "b5",
    "code": "1.4.6",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to analyse, appreciate, appraise/critique and present report on own works and that of others based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values), the recordings and reports.",
    "indicators": [
      {
        "code": "1.4.6.1",
        "text": "Develop guidelines for appreciating and appraising own and others’ visual artworks that reflect the history and culture of the African people."
      },
      {
        "code": "1.4.6.2",
        "text": "Develop guidelines for appreciating and appraising own and others’ visual artworks that reflect the physical and social environments of some communities in Africa."
      },
      {
        "code": "1.4.6.3",
        "text": "Develop guidelines for appreciating and appraising own and others’ visual artworks that reflect the topical issues in Africa."
      }
    ]
  },
  {
    "cls": "b5",
    "code": "1.4.7",
    "area": "Visual Arts",
    "standard": "Demonstrate the ability to make informed decisions on displays, presentations, performances, recordings and/or reports based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values) for correlation, correction and future modifications.",
    "indicators": [
      {
        "code": "1.4.7.1",
        "text": "Analyse and appreciate own or others’ visual artworks and present reports as feedback on artworks that reflect the history and culture of the people of Africa."
      },
      {
        "code": "1.4.7.2",
        "text": "Analyse and appreciate own or others’ visual artworks and present reports as feedback on artworks that reflect the physical and social environments of some communities in Africa."
      },
      {
        "code": "1.4.7.3",
        "text": "Analyse and appreciate own or others’ visual artworks and present reports as feedback on artworks that reflect topical issues of much concern in Africa."
      }
    ]
  },
  {
    "cls": "b5",
    "code": "2.1.1",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to generate own ideas for artistic expressions on the people, based on their history and culture, the environment and the topical local/national/global issues.",
    "indicators": [
      {
        "code": "2.1.1.1",
        "text": "Explore and study some compositions and performances of Ghanaian and other African performing artists living in Africa and discuss how their works reflect the history and culture of the people of Africa."
      },
      {
        "code": "2.1.1.2",
        "text": "Study how the compositions and performances of the Ghanaian and other African performing artists studied reflect the history and culture of the people of Africa and generate ideas for creating own artworks."
      },
      {
        "code": "2.1.1.3",
        "text": "Study some compositions and performances of Ghanaian and other African performing artists that reflect the physical and social environments of some African communities."
      },
      {
        "code": "2.1.1.4",
        "text": "Generate own ideas for composing and performing own artworks that will reflect the physical and social environments of some African communities."
      },
      {
        "code": "2.1.1.5",
        "text": " Digital Te Study the compositions and performances of Ghanaian and other African performing artists that reflect topical issues in Africa."
      },
      {
        "code": "2.1.1.6",
        "text": "Brainstorm to generate ideas for creating own compositions and performances that reflect topical issues in Africa."
      }
    ]
  },
  {
    "cls": "b5",
    "code": "2.2.2",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to organise own ideas through experimenting with available media and techniques for creating/composing artworks, based on the history and culture, the environment and the topical local/national/global issues of other communities.",
    "indicators": [
      {
        "code": "2.2.2.1",
        "text": "Experiment with available relevant performing arts media and techniques to create own performing artworks that reflect the history and culture of the people of Africa."
      },
      {
        "code": "2.2.2.2",
        "text": "Experiment with available relevant performing arts media and techniques to create own performing artworks that reflect the physical and social environments of some communities in Africa."
      },
      {
        "code": "2.2.2.3",
        "text": "Experiment with available relevant performing arts media and techniques to create own performing artworks that reflect topical issues in Africa."
      }
    ]
  },
  {
    "cls": "b5",
    "code": "2.2.3",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to create expressive artworks based on own ideas by applying knowledge of media and methods of production to reflect other cultures in Africa, the visual artists, their culture, the environment and emerging topical issues.",
    "indicators": [
      {
        "code": "2.2.3.1",
        "text": "Create own performing artworks based on own ideas, knowledge and understanding of artworks that reflect the history and culture of the people of Africa."
      },
      {
        "code": "2.2.3.2",
        "text": "Create own performing artworks based on own ideas, knowledge and understanding of artworks that reflect the physical and social environments of some communities in Africa."
      },
      {
        "code": "2.2.3.3",
        "text": "Create own performing artworks based on own ideas, knowledge and understanding of artworks that reflect topical issues in Africa."
      }
    ]
  },
  {
    "cls": "b5",
    "code": "2.3.4",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to plan a display/presentation of a portfolio of own artworks by identifying, and preparing a venue, selecting and grouping of artworks and inviting target audience for the planned display/performance.",
    "indicators": [
      {
        "code": "2.3.4.1",
        "text": "Plan a display of own portfolio of performing artworks to educate and share creative experiences of artworks that reflect the history and culture of the people of Africa."
      },
      {
        "code": "2.3.4.2",
        "text": "Plan a display of own portfolio of performing artworks to educate and share creative experiences of artworks that reflect the physical and social environments of some communities of Africa."
      },
      {
        "code": "2.3.4.3",
        "text": "Plan a display of own portfolio of performing artworks to educate and share creative experiences of artworks that reflect the topical issues in Africa."
      }
    ]
  },
  {
    "cls": "b5",
    "code": "2.3.5",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to display/present a portfolio of art works that share own knowledge, concepts, ideas and experiences with audience through display/presentation; and using senses/manual/digital applications where necessary, to record for reporting on the events.",
    "indicators": [
      {
        "code": "2.3.5.1",
        "text": "Stage a display of own portfolio of performing artworks to share creative experiences of compositions that reflect the history and culture of the people of Africa."
      },
      {
        "code": "2.3.5.2",
        "text": "Stage a display of own portfolio of performing artworks to share creative experiences of compositions that reflect the physical and social environments of some communities in Africa."
      },
      {
        "code": "2.3.5.3",
        "text": "Stage a display of own portfolio of performing artworks to share own creative experiences of compositions that reflect the topical issues in Africa."
      }
    ]
  },
  {
    "cls": "b5",
    "code": "2.4.6",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to analyse, appreciate, appraise/critique and present report on own works and that of others based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values), the recordings and reports.",
    "indicators": [
      {
        "code": "2.4.6.1",
        "text": "Develop guidelines for appreciating and appraising own and others’ performing artworks that reflect the history and culture of the people of Africa."
      },
      {
        "code": "2.4.6.2",
        "text": "Develop guidelines for appreciating and appraising own and others’ performing artworks that reflect the physical and social environment of some communities in Africa."
      },
      {
        "code": "2.4.6.3",
        "text": "Develop guidelines for appreciating and appraising own and others’ performing artworks that reflect topical issues in Africa."
      }
    ]
  },
  {
    "cls": "b5",
    "code": "2.4.7",
    "area": "Performing Arts",
    "standard": "Demonstrate the ability to make informed decisions on displays, presentations, performances, recordings and/or reports based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values) for correlation, correction and future modifications.",
    "indicators": [
      {
        "code": "2.4.7.1",
        "text": "Analyse and appreciate own or others’ performing artworks and present reports as feedback on compositions that reflect the history and culture of the people of Africa."
      },
      {
        "code": "2.4.7.2",
        "text": "Analyse and appreciate own or others’ performing artworks and present reports as feedback on compositions that reflect the physical and social environments of some communities in Africa."
      },
      {
        "code": "2.4.7.3",
        "text": "Analyse and appreciate/appraise own or others’ performing artworks and present reports as feedback on compositions that reflect topical issues in Africa."
      }
    ]
  },
  {
    "cls": "b6",
    "code": "1.1.1",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to generate own ideas for artistic expressions on the people, based on their history and culture, the environment and the topical local/national/global issues.",
    "indicators": [
      {
        "code": "1.1.1.1",
        "text": "Explore and study the artworks of some international visual artists and analyse how their artworks reflect the history and culture of some communities in the world."
      },
      {
        "code": "1.1.1.2",
        "text": "Study how the artworks of the international visual artists studied reflect the history and culture of some communities in the world and generate own ideas for creating own artworks."
      },
      {
        "code": "1.1.1.3",
        "text": "Study some artworks created by international visual artists that reflect the physical and social environments of some communities in the world."
      },
      {
        "code": "1.1.1.4",
        "text": "Generate own ideas for designing and creating own visual artworks based on the physical and social environments of some communities in the world."
      },
      {
        "code": "1.1.1.5",
        "text": "Study the artworks of some international visual artists that reflect topical issues in some communities in the world."
      },
      {
        "code": "1.1.1.6",
        "text": "Brainstorm and generate ideas for creating own visual artworks that will reflect topical issues in some communities in the world."
      }
    ]
  },
  {
    "cls": "b6",
    "code": "1.2.2",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to organise own ideas through experimenting with available media and techniques for creating/composing artworks, based on the history and culture, the environment and the topical local/national/global issues of other communities.",
    "indicators": [
      {
        "code": "1.2.2.1",
        "text": "Experiment with available visual arts media and methods to create visual artworks based on own views, knowledge and understanding of the artworks of some international visual artists."
      },
      {
        "code": "1.2.2.2",
        "text": "Brainstorm and generate designs for creating own visual artworks that reflect the physical and social environments of some communities in the world."
      },
      {
        "code": "1.2.2.3",
        "text": "Brainstorm and generate designs for making own visual artworks that reflect topical issues in the world."
      }
    ]
  },
  {
    "cls": "b6",
    "code": "1.2.3",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to create expressive artworks based on own ideas by applying knowledge of media and methods of production to reflect other cultures in Africa, the visual artists, their culture, the environment and emerging topical issues.",
    "indicators": [
      {
        "code": "1.2.3.1",
        "text": "Create functional and decorative visual artworks based on own views, knowledge and understanding of the medium and style of some international visual artists studied."
      },
      {
        "code": "1.2.3.2",
        "text": "Create own visual artworks that reflect the physical and social environments of some communities in the world."
      },
      {
        "code": "1.2.3.3",
        "text": "Create own symbolic visual artworks that communicate, educate or sensitise the public on some topical issues in the world."
      }
    ]
  },
  {
    "cls": "b6",
    "code": "1.3.4",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to plan a display/presentation of a portfolio of own artworks by identifying, and preparing a venue, selecting and grouping of artworks and inviting target audience for the planned display/performance.",
    "indicators": [
      {
        "code": "1.3.4.1",
        "text": "Plan an exhibition of own functional and decorative visual artworks that reflect the medium and style of some international visual artists studied."
      },
      {
        "code": "1.3.4.2",
        "text": "Plan an exhibition of own functional and decorative visual artworks that reflect the physical and social environments of some communities in the world."
      },
      {
        "code": "1.3.4.3",
        "text": "Plan an exhibition of own functional and decorative visual artworks that communicate, educate or sensitise the public on topical issues in the world."
      }
    ]
  },
  {
    "cls": "b6",
    "code": "1.3.5",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to display/present a portfolio of art works that share own knowledge, concepts, ideas and experiences with audience through display/presentation; and using senses/manual/digital applications where necessary, to record for reporting on the events.",
    "indicators": [
      {
        "code": "1.3.5.1",
        "text": "Exhibit own visual artworks to share creative experiences based on ideas, knowledge and understanding of the medium and style of some international artists studied."
      },
      {
        "code": "1.3.5.2",
        "text": "Exhibit own visual artworks to share creative experiences based on ideas, knowledge and understanding of the physical and social environments of some communities in the world."
      },
      {
        "code": "1.3.5.3",
        "text": "Exhibit own visual artworks to share creative experiences that communicate, educate or sensitise the public on topical issues in the world."
      }
    ]
  },
  {
    "cls": "b6",
    "code": "1.4.6",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of how to analyse, appreciate, appraise/critique and present report on own works and that of others based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values), the recordings and reports.",
    "indicators": [
      {
        "code": "1.4.6.1",
        "text": "Develop guidelines for appreciating and appraising own and others’ visual artworks that reflect the medium and style of the international visual artists studied."
      },
      {
        "code": "1.4.6.2",
        "text": "Develop guidelines for appreciating and appraising own and others’ visual artworks that reflect the physical and social environments of some communities in the world."
      },
      {
        "code": "1.4.6.3",
        "text": "Develop guidelines for appreciating and appraising own and others’ visual artworks that communicate, educate and sensitise the public on topical issues in the world."
      }
    ]
  },
  {
    "cls": "b6",
    "code": "1.4.7",
    "area": "Visual Arts",
    "standard": "Demonstrate the ability to make informed decisions on displays, presentations, performances, recordings and/or reports based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values) for correlation, correction and future modifications.",
    "indicators": [
      {
        "code": "1.4.7.1",
        "text": "Analyse and appreciate own or others’ artworks and present reports as feedback on artworks that reflect the medium and style of international performing artists studied."
      },
      {
        "code": "1.4.7.2",
        "text": "Analyse and appreciate own or others’ performing artworks and present reports as feedback on artworks that reflect the physical and social environments of some communities in the world."
      },
      {
        "code": "1.4.7.3",
        "text": "Analyse and appreciate own or others’ performing artworks and present reports as feedback on artworks that communicate, educate or sensitise public on topical issues in the world."
      }
    ]
  },
  {
    "cls": "b6",
    "code": "2.1.1",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to generate own ideas for artistic expressions on the people, based on their history and culture, the environment and the topical local/national/global issues.",
    "indicators": [
      {
        "code": "2.1.1.1",
        "text": "Explore and study performing artworks of some international performing artists and analyse how their compositions reflect the history and culture of some communities in the world."
      },
      {
        "code": "2.1.1.2",
        "text": "Study how the artworks of the international performing artists studied reflect the history and culture of some communities in the world and generate own ideas for creating own performing artworks Learners are) to:  select the work of any of the international artists studied in B6. 2.1.1.1;  reflect on the themes or purposes of the works;  make an analytical study of compositions and performances to identify the musicality, vocabulary, movement patterns, costuming, time, rhythm, speed, energy, space, etc.;  use the information gained to generate ideas for own artworks that will reflect the history and culture of some communities in the world."
      },
      {
        "code": "2.1.1.3",
        "text": "Study how the artworks of the international performing artists studied reflect the physical and social environments of some communities in the world."
      },
      {
        "code": "2.1.1.4",
        "text": "Generate own ideas for creating own performing artworks based on the physical and social environments of some communities in the world."
      },
      {
        "code": "2.1.1.5",
        "text": "Study how the artworks of the international performing artists studied reflect topical issues in some communities in the world."
      },
      {
        "code": "2.1.1.6",
        "text": "Brainstorm and generate ideas for creating own performing artworks that reflect topical issues in some communities in the world."
      }
    ]
  },
  {
    "cls": "b6",
    "code": "2.2.2",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to organise own ideas through experimenting with available media and techniques for creating/composing artworks, based on the history and culture, the environment and the topical local/national/global issues of other communities.",
    "indicators": [
      {
        "code": "2.2.2.1",
        "text": "Experiment with available performing arts media and techniques to create performing artworks based on own views, knowledge and understanding of artworks produced by some international performing artists."
      },
      {
        "code": "2.2.2.2",
        "text": "Brainstorm and generate ideas for creating own performing artworks that reflect the physical and social environments of some communities in the world."
      },
      {
        "code": "2.2.2.3",
        "text": "Generate ideas for creating own performing artworks that reflect topical issues in the world."
      }
    ]
  },
  {
    "cls": "b6",
    "code": "2.2.3",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to create expressive artworks based on own ideas by applying knowledge of media and methods of production to reflect other cultures in Africa, the visual artists, their culture, the environment and emerging topical issues.",
    "indicators": [
      {
        "code": "2.2.3.1",
        "text": "Create own performing artworks based on own views, knowledge and understanding of the techniques and styles of some international performing artists studied."
      },
      {
        "code": "2.2.3.2",
        "text": "Create own performing artworks that reflect the physical and social environments of some communities in the world."
      },
      {
        "code": "2.2.3.3",
        "text": "Create own performing artworks that communicate, educate or sensitise the public on topical issues in the world."
      }
    ]
  },
  {
    "cls": "b6",
    "code": "2.3.4",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to plan a display/presentation of a portfolio of own artworks by identifying, and preparing a venue, selecting and grouping of artworks and inviting target audience for the planned display/performance.",
    "indicators": [
      {
        "code": "2.3.4.1",
        "text": "Plan a display of own performing artworks to share creative experiences of the techniques and styles of some international performing artists studied."
      },
      {
        "code": "2.3.4.2",
        "text": "Plan a display of own performing artworks to share experiences that reflect own knowledge and understanding of the physical and social environments of some communities in the world."
      },
      {
        "code": "2.3.4.3",
        "text": "Plan a display of own performing artworks to communicate, educate or sensitise the public on topical issues in the world."
      }
    ]
  },
  {
    "cls": "b6",
    "code": "2.3.5",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to display/present a portfolio of art works that share own knowledge, concepts, ideas and experiences with audience through display/presentation; and using senses/manual/digital applications where necessary, to record for reporting on the events.",
    "indicators": [
      {
        "code": "2.3.5.1",
        "text": "Stage a display of own performing artworks to share creative experiences of the techniques and style of international performing artists studied."
      },
      {
        "code": "2.3.5.2",
        "text": "Stage a display of own performing artworks to share creative experiences of the physical and social environments of some communities in the world."
      },
      {
        "code": "2.3.5.3",
        "text": "Stage a display of own performing artworks to share creative experiences that communicate, educate and sensitise the public on topical issues in the world."
      }
    ]
  },
  {
    "cls": "b6",
    "code": "2.4.6",
    "area": "Performing Arts",
    "standard": "Demonstrate understanding of how to analyse, appreciate, appraise/critique and present report on own works and that of others based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values), the recordings and reports.",
    "indicators": [
      {
        "code": "2.4.6.1",
        "text": "Develop guidelines for analysing and appreciating own and others’ performing artworks that reflect the technique and style of international performing artists studied."
      },
      {
        "code": "2.4.6.2",
        "text": "Develop guidelines for appreciating and appraising own and others’ compositions and performances that reflect the physical and social environments of some communities in the world."
      },
      {
        "code": "2.4.6.3",
        "text": "Develop guidelines for appreciating and appraising own and others’ performing artworks that communicate, educate or sensitise the public on topical issues in the world."
      }
    ]
  },
  {
    "cls": "b6",
    "code": "2.4.7",
    "area": "Performing Arts",
    "standard": "Demonstrate the ability to make informed decisions on displays, presentations, performances, recordings and/or reports based on established guide for judging artworks (the theme, subject matter, media, techniques, elements and principles of design, social, aesthetic, cultural and functional values) for correlation, correction and future modifications.",
    "indicators": [
      {
        "code": "2.4.7.1",
        "text": "Analyse and appreciate own or others’ performing artworks and present reports as feedback on artworks that reflect the techniques and styles of the international performing artists studied."
      },
      {
        "code": "2.4.7.2",
        "text": "Analyse and appreciate/appraise own or others’ music, dance and drama compositions and performances and present reports/feedback on works that reflect the physical and social environments of some communities in the world."
      },
      {
        "code": "2.4.7.3",
        "text": "Analyse and appreciate own or others’ performing artworks and present reports as feedback on artworks that communicate, educate or sensitise the pubic on topical issues in the world."
      }
    ]
  },
  {
    "cls": "b7",
    "code": "1.1.1",
    "area": "Design",
    "standard": "Demonstrate understanding of design as a concept in relation to the elements (dots, lines, and shapes) and principles (balance, rhythm, repetition) of design and as a medium for creative expression of design in nature and the manmade environment.",
    "indicators": [
      {
        "code": "1.1.1.1",
        "text": "Demonstrate understanding of design as a concept and its importance and role as a medium for creative expression of design in nature and the manmade environment. 1. Research to determine and record the meaning, relevance and role of design in nature and the manmade environment for reflection and discussion. 2. Identify and reflect on selected natural and manmade designs to appreciate and determine how nature has influenced manmade designs to benefit society for appreciation and discussion. Beak of kingfisher bird inspired Design inspired by the palm Shinkansen Bullet Train – Japan 1 C."
      },
      {
        "code": "1.1.1.2",
        "text": "Research to identify and record what constitutes the ‘elements of design’ in nature and as building blocks for creative expression of design ideas."
      },
      {
        "code": "1.1.1.3",
        "text": "Research to identify and record in writing what constitutes the principles of design and describe how they are used to organise the elements of design into building blocks for creative expression of design in nature and the manmade environment."
      }
    ]
  },
  {
    "cls": "b7",
    "code": "1.2.1",
    "area": "Design",
    "standard": "Demonstrate understanding and use of (outline drawing, shading, colouring) and modelling media and techniques for creative expression of design ideas.",
    "indicators": [
      {
        "code": "1.2.1.1",
        "text": "Explore available manual and digital tools, materials and techniques for outline drawing, shading and colouring to create designs from lines and simple shapes."
      },
      {
        "code": "1.2.1.2",
        "text": "Demonstrate skills in using available digital tools, materials and techniques for freehand and outline drawing, shading and colouring to create designs from lines, simple shapes and forms."
      },
      {
        "code": "1.2.1.3",
        "text": "Demonstrate ability to generate design ideas and develop models of simple shapes and forms for appreciation and display."
      }
    ]
  },
  {
    "cls": "b7",
    "code": "1.3.1",
    "area": "Design",
    "standard": "Demonstrate understanding of creativity and innovation in terms of the design process, and its application in developing design solutions to identified problems in society.",
    "indicators": [
      {
        "code": "1.3.1.1",
        "text": "Distinguish between creativity and innovation and their application for developing design solutions to problems in society."
      },
      {
        "code": "1.3.1.2",
        "text": "Demonstrate understanding of the design process in relation to creativity and innovations in design."
      },
      {
        "code": "1.3.1.3",
        "text": "Demonstrate ability to apply the design process to create artefacts that solve specific problems in the local community."
      }
    ]
  },
  {
    "cls": "b7",
    "code": "2.1.1",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of relevant Visual Arts media and techniques and their application to still-life drawing, shading, pattern making and modelling",
    "indicators": [
      {
        "code": "2.1.1.1",
        "text": "Identify and determine the nature and uses of tools, materials and techniques needed for still-life drawing and shading, pattern making and modelling."
      },
      {
        "code": "2.1.1.2",
        "text": "Apply techniques of still-life drawing and shading to make own visual artworks."
      },
      {
        "code": "2.1.1.3",
        "text": "Experiment by using the techniques to test and prepare clay, pulp paper (papier-mâché) for modelling."
      },
      {
        "code": "2.1.1.4",
        "text": "Apply the techniques in pattern making using available media to create visual artworks."
      }
    ]
  },
  {
    "cls": "b7",
    "code": "2.1.2",
    "area": "Music",
    "standard": "Demonstrate understanding and apply scale, note durational values and simple time beat patterns in music.",
    "indicators": [
      {
        "code": "2.1.2.5",
        "text": "Sing in pitch the diatonic major scale when playing the John Curwen’s Hand Sign Game by Lahing or using solfege."
      },
      {
        "code": "2.1.2.6",
        "text": "Identify durational symbols and move/perform their value in relation to the semibreve."
      },
      {
        "code": "2.1.2.7",
        "text": "Conduct songs in simple duple, triple and quadruple time."
      }
    ]
  },
  {
    "cls": "b7",
    "code": "2.1.3",
    "area": "Dance and Drama",
    "standard": "Demonstrate understanding and apply media, voice and movement techniques in dance and drama",
    "indicators": [
      {
        "code": "2.1.3.8",
        "text": "Identify and demonstrate the various Ghanaian dance/body movements, positions and voice projection patterns."
      },
      {
        "code": "2.1.3.9",
        "text": "Explore and experiment with techniques of dance, body movements and voice projections in the Ghanaian performance space."
      }
    ]
  },
  {
    "cls": "b7",
    "code": "2.2.1",
    "area": "Visual Arts",
    "standard": "Demonstrate the ability to use concept of the design process (idea development) to produce, display and appraise own creative artworks that reflect in the range of different times and cultures",
    "indicators": [
      {
        "code": "2.2.1.1",
        "text": "Design and produce own visual artworks that reflect the history and culture of the people of the local community."
      },
      {
        "code": "2.2.1.2",
        "text": "Plan a display of own and others’ artworks that reflect the history and culture of the people in the community."
      },
      {
        "code": "2.2.1.3",
        "text": "Organise an appreciation and appraisal of own and others artworks that reflect the history and culture of the people in the community."
      }
    ]
  },
  {
    "cls": "b7",
    "code": "2.2.2",
    "area": "Music",
    "standard": "Demonstrate the ability to use concept of the design process (idea development) to create and display own creative musical art works that reflect the range of different times and cultures",
    "indicators": [
      {
        "code": "2.2.2.4",
        "text": "Create and produce own musical art works that reflect the history and culture of the people of the community."
      },
      {
        "code": "2.2.2.5",
        "text": "Plan a display of own and others’ musical works that reflect the history and culture of the people in the community."
      },
      {
        "code": "2.2.2.6",
        "text": "Organise an appreciation and appraisal of own and others’ musical works that reflect the history and culture of the people in the community."
      }
    ]
  },
  {
    "cls": "b7",
    "code": "2.2.3",
    "area": "Dance and Drama",
    "standard": "Demonstrate the ability to use concepts of design process (idea development) to produce and display own creative and expressive art-forms that reflect in the range of different times and cultures in dance and drama.",
    "indicators": [
      {
        "code": "2.2.3.7",
        "text": "Design and produce own artworks in dance and drama that reflect the history and culture of the people in the community."
      },
      {
        "code": "2.2.3.8",
        "text": "Plan a display of own and others’ artwork in dance and drama that reflect the history and culture of the community."
      },
      {
        "code": "2.2.3.9",
        "text": "Organise an appreciation and appraisal of own and others’ artworks in dance and drama that reflect the history and culture of the people of the community."
      }
    ]
  },
  {
    "cls": "b7",
    "code": "2.3.1",
    "area": "Visual Arts",
    "standard": "Demonstrate the ability to correlate and generate ideas from visual artworks in the community that reflect a range of different times, cultures and topical issues",
    "indicators": [
      {
        "code": "2.3.1.1",
        "text": "Narrate own views of the history, culture, environment and topical issues in the community."
      },
      {
        "code": "2.3.1.2",
        "text": "Identify visual artworks that reflect the history, culture, environment and topical issues in the community."
      }
    ]
  },
  {
    "cls": "b7",
    "code": "2.3.2",
    "area": "Music",
    "standard": "Demonstrate the ability to correlate and generate ideas from indigenous creative musical forms and art musicians in the immediate community that reflect a range of different times, cultures and topical issues",
    "indicators": [
      {
        "code": "2.3.2.3",
        "text": "Identify indigenous and art musicians in the community whose works reflect the history, culture, environment and topical issues."
      },
      {
        "code": "2.3.2.4",
        "text": "Appreciate and appraise an indigenous and a neotraditional group within the community based on their style, instruments, song themes, dance movements, etc."
      }
    ]
  },
  {
    "cls": "b7",
    "code": "2.3.3",
    "area": "Dance and Drama",
    "standard": "Demonstrate the ability to correlate and generate ideas from creative artworks of dancers and actors in the community that reflect a range of different times, cultures and topical issues.",
    "indicators": [
      {
        "code": "2.3.3.5",
        "text": "Select artworks of dance and drama artistes in the community or other places, and identify the history, culture, environment and topical issues that are reflected in them."
      },
      {
        "code": "2.3.3.6",
        "text": "Analyse works of other dance and drama artistes based on the history, culture, environment and topical issues in and around their communities."
      }
    ]
  },
  {
    "cls": "b8",
    "code": "1.1.1",
    "area": "Design",
    "standard": "Demonstrate understanding of design as a concept in relation to the elements (texture and colour) and principles (contrast, emphasis and unity) of design and as a medium for creative expression of design in nature and the manmade environment.",
    "indicators": [
      {
        "code": "1.1.1.1",
        "text": "Demonstrate understanding of design as a concept by using the elements and principles of design as a medium for creative expression of design in nature and the manmade environment."
      },
      {
        "code": "1.1.1.2",
        "text": "Research to identify and record what constitutes the ‘elements of design’ in nature and the ‘principles of design’ for creative expression of design ideas."
      },
      {
        "code": "1.1.1.3",
        "text": "Research to identify and record in writing what constitutes the ‘principles of design’ and describe how they are used to organise the elements of design into building blocks for creative expression of design in nature and the manmade environment."
      }
    ]
  },
  {
    "cls": "b8",
    "code": "1.2.1",
    "area": "Design",
    "standard": "Demonstrate understanding and use of 2-D drawing, shading, colouring and modelling media and techniques for creative expression of design ideas.",
    "indicators": [
      {
        "code": "1.2.1.1",
        "text": "Explore available manual and digital tools, materials and techniques for 2-D drawing, shading and colouring to create designs from lines, simple shapes and forms."
      },
      {
        "code": "1.2.1.2",
        "text": "Demonstrate skills in using available digital tools, materials and techniques for 2-D drawing, shading and colouring to create designs from lines, simple shapes and forms."
      },
      {
        "code": "1.2.1.3",
        "text": "Demonstrate ability to generate design ideas and develop models of simple shapes and forms for appreciation and display."
      }
    ]
  },
  {
    "cls": "b8",
    "code": "1.3.1",
    "area": "Design",
    "standard": "Demonstrate understanding of creativity and innovation in terms of the design process, and its application in developing design solutions to problems in society.",
    "indicators": [
      {
        "code": "1.3.1.1",
        "text": "Distinguish between creativity and innovation and their application for developing design solutions to problems in society."
      },
      {
        "code": "1.3.1.2",
        "text": "Demonstrate understanding of the design process in relation to creativity and innovations in design."
      },
      {
        "code": "1.3.1.3",
        "text": "Demonstrate ability to apply the design process to create artefacts that solve specific problems in the local community."
      }
    ]
  },
  {
    "cls": "b8",
    "code": "2.1.1",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding of Visual Arts media and techniques and their application in drawing from direct observation/memory and imagination, print making and weaving",
    "indicators": [
      {
        "code": "2.1.1.1",
        "text": "Explore media and techniques in drawing from direct observation/ memory and imagination, print making and weaving to express own views in visual artworks to encourage recording and research skills."
      },
      {
        "code": "2.1.1.2",
        "text": "Experiment by using techniques in print making to generate own ideas and make visual artworks."
      },
      {
        "code": "2.1.1.3",
        "text": "Apply techniques of drawing direct observation/memory and imagination to make own visual artworks."
      },
      {
        "code": "2.1.1.4",
        "text": "Experiment with available media and techniques for weaving to create visual artworks."
      }
    ]
  },
  {
    "cls": "b8",
    "code": "2.1.2",
    "area": "Music",
    "standard": "Demonstrate understanding and apply tempo, dynamics and simple forms in music",
    "indicators": [
      {
        "code": "2.1.2.5",
        "text": "Tell how fast or slow music is heard and compare and contrast activities and events that are associated with fast or slow music."
      },
      {
        "code": "2.1.2.6",
        "text": "Compare and contrast the benefits associated with soft or loud music."
      },
      {
        "code": "2.1.2.7",
        "text": "Internalise and identify aurally basic architectural designs in art, pop and indigenous musical works (e.g., AB, ABA, AA, AABA, ABAB and ABC)."
      }
    ]
  },
  {
    "cls": "b8",
    "code": "2.1.3",
    "area": "Dance and Drama",
    "standard": "Demonstrate understanding of Ghanaian dance forms",
    "indicators": [
      {
        "code": "2.1.3.8",
        "text": "Identify various Ghanaian Dance types and their context of performance."
      },
      {
        "code": "2.1.3.9",
        "text": "Experiment and practise by using the techniques of rhythm (i.e., beat, tempo, intensity), dynamics (i.e. fast, slow, smooth, flow) in dance and drama."
      }
    ]
  },
  {
    "cls": "b8",
    "code": "2.2.1",
    "area": "Visual Arts",
    "standard": "Demonstrate the ability to apply the concept of the design process (idea development) to produce and display own creative and expressive art-forms that reflect a range of different times and cultures",
    "indicators": [
      {
        "code": "2.2.1.1",
        "text": "Design and produce your own artworks that reflect a range of different times and cultures."
      },
      {
        "code": "2.2.1.2",
        "text": "Plan and display own and others’ artworks that reflect the history, cultures, physical and social environment."
      },
      {
        "code": "2.2.1.3",
        "text": "Organise an appreciation and appraisal of own and others’ artworks that reflect the history, cultures, physical and social environment."
      }
    ]
  },
  {
    "cls": "b8",
    "code": "2.2.2",
    "area": "Music",
    "standard": "Demonstrate the ability to use concept of the design process (idea development) to create and display own creative musical art works that reflect a range of different times and cultures",
    "indicators": [
      {
        "code": "2.2.2.4",
        "text": "Design and produce own musical genre that reflect the history and cultures, physical and social environment."
      },
      {
        "code": "2.2.2.5",
        "text": "Plan and display own and others’ musical works that reflect a range of different times and cultures."
      },
      {
        "code": "2.2.2.6",
        "text": "Organise an appreciation and appraisal of own and others’ musical works that reflect a range of different times and cultures."
      }
    ]
  },
  {
    "cls": "b8",
    "code": "2.2.3",
    "area": "Dance and Drama",
    "standard": "Demonstrate how to apply the concept of design process (Idea development) to produce and display own creative and expressive art-forms that reflect a range of different times and cultures.",
    "indicators": [
      {
        "code": "2.2.3.7",
        "text": "Design and produce own dance and drama that reflect a range of different times and cultures."
      },
      {
        "code": "2.2.3.8",
        "text": "Plan and display own and others’ dance and drama pieces that reflect a range of different times and cultures."
      },
      {
        "code": "2.2.3.9",
        "text": "Organise an appreciation and appraisal of own and others’ dance and drama artworks that reflect a range of different times, cultures and topical issues."
      }
    ]
  },
  {
    "cls": "b8",
    "code": "2.3.1",
    "area": "Visual Arts",
    "standard": "Demonstrate the ability to correlate and generate ideas from creative artworks of visual artists that reflect a range of different times, cultures and topical issues",
    "indicators": [
      {
        "code": "2.3.1.1",
        "text": "Identify and discuss visual artists whose work reflected the history, culture, environment and topical issues in the community."
      },
      {
        "code": "2.3.1.2",
        "text": "Compare and contrast artworks of visual artists that reflect the history, culture, environment and topical issues."
      },
      {
        "code": "2.3.1.3",
        "text": "Determine the creative design approaches and processes used by visual artists in creating artworks that reflect the history, culture, environment and topical issues."
      }
    ]
  },
  {
    "cls": "b8",
    "code": "2.3.2",
    "area": "Music",
    "standard": "Demonstrate the capacity to correlate and generate ideas from indigenous creative musical forms and Ghanaian art musicians that reflect a range of different times, cultures and topical issues",
    "indicators": [
      {
        "code": "2.3.2.4",
        "text": "Distinguish different ways musical works of Ghanaian art composers reflect the history, culture, environment and topical issues."
      },
      {
        "code": "2.3.2.5",
        "text": "Appreciate and appraise at least three (3) indigenous and neo-traditional groups within the nation based on their style, instruments, song themes, dance movements, etc."
      }
    ]
  },
  {
    "cls": "b8",
    "code": "2.3.3",
    "area": "Dance and Drama",
    "standard": "Demonstrate the capacity to correlate ideas from creative artworks of dance and drama artistes that reflect a range of different times, cultures and topical issues",
    "indicators": [
      {
        "code": "2.3.3.6",
        "text": "Select and analyse creative artworks of dance and drama artistes, and identify the history, culture, environment and topical issues that are reflected in them for documentation."
      },
      {
        "code": "2.3.3.7",
        "text": "Organise a group discussion to appreciate dance and/or plays of own and other cultures, environment and topical issues."
      }
    ]
  },
  {
    "cls": "b9",
    "code": "1.1.1",
    "area": "Design",
    "standard": "Demonstrate understanding of design as a concept in relation to the elements (form, value) and principles (variety, proportion) of design and as a medium for creative expression of design in nature and the manmade environment.",
    "indicators": [
      {
        "code": "1.1.1.1",
        "text": "Demonstrate understanding of design as a concept by using the elements and principles of design as a medium for creative expression of design in nature and the manmade environment."
      },
      {
        "code": "1.1.1.2",
        "text": "Research to identify and record what constitutes the ‘elements of design’ in nature and as building blocks for creative expression of design ideas."
      },
      {
        "code": "1.1.1.3",
        "text": "Research to identify and record in writing what constitutes the principles of design and describe how they are used to organise the elements of design into building blocks for creative expression of design in nature and the manmade environment."
      }
    ]
  },
  {
    "cls": "b9",
    "code": "1.2.1",
    "area": "Design",
    "standard": "Demonstrate understanding and use of (3- D drawing, shading, colouring and modelling) media and techniques for creative expression of design ideas.",
    "indicators": [
      {
        "code": "1.2.1.1",
        "text": "Explore available manual and digital tools, materials and techniques for 3-D drawing, shading and colouring to create designs from lines, simple shapes and forms."
      },
      {
        "code": "1.2.1.2",
        "text": "Demonstrate skills in using available digital tools, materials and techniques for 3-D drawing, shading and colouring to create designs from lines, simple shapes and forms."
      },
      {
        "code": "1.2.1.3",
        "text": "Demonstrate ability to generate design ideas and develop models of simple shapes and forms for appreciation and display."
      }
    ]
  },
  {
    "cls": "b9",
    "code": "1.3.1",
    "area": "Design",
    "standard": "Demonstrate understanding of creativity and innovation in terms of the design process, and its application in developing design solutions to problems in society.",
    "indicators": [
      {
        "code": "1.3.1.1",
        "text": "Distinguish between creativity and innovation and their application for developing design solutions to problems in society."
      },
      {
        "code": "1.3.1.2",
        "text": "Demonstrate understanding of the design process in relation to creativity and innovations in design."
      },
      {
        "code": "1.3.1.3",
        "text": "Demonstrate ability to apply the design process to create artefacts that solve specific problems in the local community."
      }
    ]
  },
  {
    "cls": "b9",
    "code": "2.1.1",
    "area": "Visual Arts",
    "standard": "Demonstrate understanding and apply media and techniques in casting, assemblage and folding",
    "indicators": [
      {
        "code": "2.1.1.1",
        "text": "Explore and identify media and techniques used to create visual artworks by casting, assemblage and folding."
      },
      {
        "code": "2.1.1.2",
        "text": "Experiment by using techniques in casting to create visual artworks."
      },
      {
        "code": "2.1.1.3",
        "text": "Apply artistic techniques in folding by using available media to make creative artworks."
      },
      {
        "code": "2.1.1.4",
        "text": "Experiment by using techniques in construction using available media to create own ideas and make visual artworks."
      }
    ]
  },
  {
    "cls": "b9",
    "code": "2.1.2",
    "area": "Music",
    "standard": "Demonstrate knowledge, understanding and application of triads, chord progression and improvisation in music",
    "indicators": [
      {
        "code": "2.1.2.5",
        "text": "Sing in pitch triads on all the seven degrees of the scale horizontally (arpeggios) and vertically (harmony)."
      },
      {
        "code": "2.1.2.6",
        "text": "Create/improvise a melody using (I, VI, IV, V) as the ostinato bass line."
      }
    ]
  },
  {
    "cls": "b9",
    "code": "2.1.3",
    "area": "Dance and Drama",
    "standard": "Demonstrate understanding and application of Dance Drama",
    "indicators": [
      {
        "code": "2.1.3.7",
        "text": "Create a simple Dance Drama and/or one act based on a topical issue."
      },
      {
        "code": "2.1.3.8",
        "text": "Explore and identify the various approaches to improvisation, creating harmony/balance and blocking for dance and drama."
      },
      {
        "code": "2.1.3.9",
        "text": "Experiment and practise by using the techniques of improvisation, creation of harmony/balance and blocking in dance and drama."
      }
    ]
  },
  {
    "cls": "b9",
    "code": "2.2.1",
    "area": "Visual Arts",
    "standard": "Exhibit art works produced from competencies and skills acquired from the application of the philosophies, designs and processes learnt from different times and cultures",
    "indicators": [
      {
        "code": "2.2.1.1",
        "text": "Design and produce own visual artworks that reflect a range of different times, cultures and topical issues."
      },
      {
        "code": "2.2.1.2",
        "text": "Plan and display artworks that reflect the influence of a range of different times, cultures and topical issues."
      },
      {
        "code": "2.2.1.3",
        "text": "Organise an appreciation and appraisal of artworks produced using inspiration and ideas from different times, cultures and other relevant topical issues."
      }
    ]
  },
  {
    "cls": "b9",
    "code": "2.2.2",
    "area": "Music",
    "standard": "Exhibit competences in the application of the design process to produce and display own creative musical work that reflect a range of different times, cultures and topical issues",
    "indicators": [
      {
        "code": "2.2.2.4",
        "text": "Design and produce own musical work that reflects a range of different times and cultures that promote and sensitise the public on emerging topical issues."
      },
      {
        "code": "2.2.2.5",
        "text": "Plan and display own and others’ musical works within the African continent that promote and sensitise the public on emerging topical issues."
      },
      {
        "code": "2.2.2.6",
        "text": "Organise an appreciation and appraisal of own original musical works and those of others on the African continent that promote and sensitise the public on emerging topical issues."
      }
    ]
  },
  {
    "cls": "b9",
    "code": "2.2.3",
    "area": "Dance and Drama",
    "standard": "Producing a Dance Drama by exhibiting competencies in the application of design process and skills to produce and display own creative artworks that reflect a range of different times, cultures and topical issues.",
    "indicators": [
      {
        "code": "2.2.3.7",
        "text": "Perform an original dance drama and/or one act play on socio-cultural issues."
      },
      {
        "code": "2.2.3.8",
        "text": "Post-performance analysis of the original dance drama and/ or one act play."
      },
      {
        "code": "2.2.3.9",
        "text": "Organise an appreciation and appraisal of own and others’ dance and drama artworks that reflect a range of different times, cultures and topical issues."
      }
    ]
  },
  {
    "cls": "b9",
    "code": "2.3.1",
    "area": "Visual Arts",
    "standard": "Demonstrate the skill to correlate and generate ideas from creative artworks of African artists that reflect a range of different times, cultures and topical issues",
    "indicators": [
      {
        "code": "2.3.1.1",
        "text": "Identify, discuss, and analyse creative artworks of African visual artists that reflect their background, influence and way of solving continental issues."
      },
      {
        "code": "2.3.1.2",
        "text": "Examine and reflect on how African visual artists use their influence and personal responses to connect with other creative arts and subjects in Africa."
      }
    ]
  },
  {
    "cls": "b9",
    "code": "2.3.2",
    "area": "Music",
    "standard": "Demonstrate the skill to correlate African music that reflect the history, culture and topical issues",
    "indicators": [
      {
        "code": "2.3.2.3",
        "text": "Distinguish different ways musical works of African art composers reflect the history, culture, environment and topical issues."
      },
      {
        "code": "2.3.2.4",
        "text": "Appreciate and appraise at least three (3) African indigenous dance genres and three (3) popular musical genres from an African nation based on their style, instruments, song themes, forms, dance movements, etc."
      }
    ]
  },
  {
    "cls": "b9",
    "code": "2.3.3",
    "area": "Dance and Drama",
    "standard": "Demonstrate the skill to correlate African dance and drama that reflect the history, culture and topical issues",
    "indicators": [
      {
        "code": "2.3.3.5",
        "text": "Reflect on a selected African creative work (dance and/or drama) and appreciate the ideas embedded."
      },
      {
        "code": "2.3.3.6",
        "text": "Create and perform a one act play or dance based on your selected African creative work (dance/drama)."
      },
      {
        "code": "2.3.3.7",
        "text": "Conduct a performance review."
      }
    ]
  }
];

export function standardsFor(cls: ClassId) {
  return STANDARDS.filter((s) => s.cls === cls);
}

export function findStandard(cls: string, code: string) {
  return STANDARDS.find((s) => s.cls === cls && s.code === code) ?? null;
}

/** "B7 1.1.1" */
export const label = (cls: ClassId, code: string) => `${cls.toUpperCase()} ${code}`;
