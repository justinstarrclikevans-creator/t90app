// ============================================================
// Turn90 — SkillsCommons Trades Training Curriculum
// Free Department of Labor & Open Workforce Development Modules
// ============================================================

export interface TradeQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TradeLesson {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  videoUrl: string; // YouTube embed URL
  keyTakeaways: string[];
  safetyTip?: string;
  skillsCommonsRef?: string;
  quiz: TradeQuizQuestion[];
}

export interface TradeTrack {
  id: string;
  title: string;
  icon: string;
  category: string;
  description: string;
  estimatedHours: number;
  badgeName: string;
  lessons: TradeLesson[];
}

export const TRADE_TRACKS: TradeTrack[] = [
  {
    id: "jobsite-safety",
    title: "OSHA 10 & Jobsite Safety",
    icon: "🦺",
    category: "Safety & Foundations",
    description: "Learn essential worker safety, Personal Protective Equipment (PPE), ladder safety, and hazard recognition required on every jobsite.",
    estimatedHours: 2,
    badgeName: "Jobsite Safety Certified",
    lessons: [
      {
        id: "ppe-basics",
        title: "Personal Protective Equipment (PPE)",
        description: "Understand the five essential pieces of PPE: hard hats, eye protection, high-vis vests, steel-toe boots, and hearing protection.",
        durationMinutes: 12,
        videoUrl: "https://www.youtube.com/embed/S_7b7pS6Zk8",
        skillsCommonsRef: "DOL TAACCCT Safety Series #101",
        safetyTip: "Always inspect your hard hat and safety glasses for cracks or damage before stepping onto the jobsite.",
        keyTakeaways: [
          "PPE is your last line of defense against physical hazards on site.",
          "Hard hats protect against overhead falling objects and head bumps.",
          "Safety glasses must have ANSI Z87.1 certification stamped on the frame.",
          "Steel-toe or composite-toe boots protect against heavy crushing hazards and punctures."
        ],
        quiz: [
          {
            question: "When should you put on your PPE?",
            options: [
              "Only when the supervisor is watching",
              "Before entering the active work area",
              "After someone gets hurt",
              "Only when doing heavy lifting"
            ],
            correctIndex: 1,
            explanation: "PPE must always be worn before entering any active work zone."
          },
          {
            question: "Which certification marking should you look for on safety glasses?",
            options: ["ISO 9000", "ANSI Z87.1", "DOT 4", "FDA Approved"],
            correctIndex: 1,
            explanation: "ANSI Z87.1 is the official American standard for impact-resistant safety glasses."
          }
        ]
      },
      {
        id: "ladder-safety",
        title: "Ladder & Fall Safety (The 4-to-1 Rule)",
        description: "Learn how to inspect, set up, and safely climb extension and step ladders without tipping.",
        durationMinutes: 15,
        videoUrl: "https://www.youtube.com/embed/jZzS2qgZ0Uo",
        skillsCommonsRef: "DOL Construction Fall Prevention 102",
        safetyTip: "Always maintain 3 points of contact (two hands and a foot, or two feet and a hand) while climbing any ladder.",
        keyTakeaways: [
          "The 4-to-1 Rule: For every 4 feet of height up, place the base 1 foot away from the wall.",
          "An extension ladder must extend at least 3 feet above the roofline or landing.",
          "Never stand on the top step or bucket shelf of a step ladder.",
          "Keep your belt buckle centered between the ladder rails to avoid tipping."
        ],
        quiz: [
          {
            question: "If a ladder is reaching a 16-foot roof, how far out should the base be from the wall?",
            options: ["2 feet", "4 feet", "8 feet", "16 feet"],
            correctIndex: 1,
            explanation: "Using the 4-to-1 rule: 16 feet height / 4 = 4 feet away from the wall."
          },
          {
            question: "How many feet must an extension ladder extend above the roof landing?",
            options: ["1 foot", "2 feet", "3 feet", "5 feet"],
            correctIndex: 2,
            explanation: "OSHA requires ladders to extend at least 3 feet above the upper landing surface for safe step-off."
          }
        ]
      },
      {
        id: "hazard-communication",
        title: "Hazard Communication & Safety Data Sheets (SDS)",
        description: "How to read chemical warning pictograms and look up chemical safety sheets on the job.",
        durationMinutes: 10,
        videoUrl: "https://www.youtube.com/embed/2_XzXg2S9eQ",
        skillsCommonsRef: "OSHA GHS HazCom Module",
        safetyTip: "Never mix cleaning chemicals or solvents unless explicitly trained and authorized.",
        keyTakeaways: [
          "Safety Data Sheets (SDS) are available on every commercial jobsite in the yellow binder or digital portal.",
          "Red diamond pictograms signal immediate dangers like flammability, toxicity, or corrosive acids.",
          "Always check the SDS for proper ventilation requirements before applying paints, stains, or adhesives."
        ],
        quiz: [
          {
            question: "Where can you find first-aid and safety instructions for a chemical used on site?",
            options: [
              "On a billboard",
              "In the Safety Data Sheet (SDS)",
              "In your employee handbook",
              "By guessing"
            ],
            correctIndex: 1,
            explanation: "Every chemical product on a jobsite must have a Safety Data Sheet (SDS) with emergency first-aid information."
          }
        ]
      }
    ]
  },
  {
    id: "carpentry-construction",
    title: "Core Construction & Carpentry",
    icon: "🪚",
    category: "Building Trades",
    description: "Master hand & power tools, reading tape measures down to 1/16th inch, wood framing, and drywall basics.",
    estimatedHours: 3,
    badgeName: "Carpentry & Framing Fundamentals",
    lessons: [
      {
        id: "tape-measure-mastery",
        title: "Reading a Tape Measure & Jobsite Math",
        description: "Learn how to read 1/2, 1/4, 1/8, and 1/16 inch marks on a tape measure and avoid costly miscuts.",
        durationMinutes: 14,
        videoUrl: "https://www.youtube.com/embed/zR2XoQ0RjY8",
        skillsCommonsRef: "Carpentry Apprenticeship Track - SkillsCommons",
        safetyTip: "Control the tape when retracting — never let the metal hook slam back into the casing.",
        keyTakeaways: [
          "The longest lines between whole inches are 1/2 inch.",
          "Medium lines are 1/4 and 1/8 inch, and the shortest ticks are 1/16 inch.",
          "Black diamonds and red numbers mark standard 16-inch stud spacing for wall framing.",
          "'Measure twice, cut once' prevents material waste and costly project delays."
        ],
        quiz: [
          {
            question: "What is the standard spacing distance between wall studs marked on most tape measures?",
            options: ["12 inches", "16 inches", "20 inches", "24 inches"],
            correctIndex: 1,
            explanation: "16 inches on-center (OC) is the standard residential framing spacing in the United States."
          },
          {
            question: "How many 1/8-inch marks are in 1 whole inch?",
            options: ["4", "6", "8", "16"],
            correctIndex: 2,
            explanation: "There are 8 eighths (1/8) in 1 full inch."
          }
        ]
      },
      {
        id: "circular-saw-safety",
        title: "Hand & Power Tool Essentials (Circular Saw)",
        description: "Safe operation of circular saws, drills, impact drivers, and miter saws.",
        durationMinutes: 18,
        videoUrl: "https://www.youtube.com/embed/9g3yN-eW8Qk",
        skillsCommonsRef: "SkillsCommons Power Tool Safety Module #204",
        safetyTip: "Never stand directly in line behind a circular saw blade to avoid injury from kickback.",
        keyTakeaways: [
          "Set the blade depth so only one tooth depth extends below the bottom of the wood board.",
          "Support the main piece of wood, but let the cut-off scrap fall freely so it doesn't pinch the blade.",
          "Always wait for the blade to come to a complete stop before lifting the saw off the cut."
        ],
        quiz: [
          {
            question: "How should a blade depth be set on a circular saw before cutting?",
            options: [
              "As deep as the saw allows",
              "About 1/8 to 1/4 inch below the thickness of the wood",
              "Flush with the top surface",
              "Depth doesn't matter"
            ],
            correctIndex: 1,
            explanation: "Setting the blade just 1/8 to 1/4 inch deeper than the board reduces friction, improves cut quality, and minimizes kickback danger."
          }
        ]
      },
      {
        id: "wall-framing-basics",
        title: "Wall Framing & 2x4 Layout",
        description: "Learn bottom plates, top plates, studs, headers, and assembling a 2x4 wall frame.",
        durationMinutes: 20,
        videoUrl: "https://www.youtube.com/embed/p1m2e3v4k5l",
        skillsCommonsRef: "Residential Construction Carpentry #301",
        safetyTip: "Always wear safety glasses and ear protection when using pneumatic framing nail guns.",
        keyTakeaways: [
          "A wall frame consists of a bottom (sole) plate, top plate, and vertical studs.",
          "Studs are fastened with 16-penny (16d) nails.",
          "Windows and doors require headers to carry structural weight above the opening."
        ],
        quiz: [
          {
            question: "What is the actual dimension of a standard '2x4' piece of lumber?",
            options: [
              "2 inches by 4 inches",
              "1.5 inches by 3.5 inches",
              "1.75 inches by 3.75 inches",
              "2 inches by 3.5 inches"
            ],
            correctIndex: 1,
            explanation: "Due to drying and planing at the mill, a finished 2x4 actually measures 1-1/2 inches by 3-1/2 inches."
          }
        ]
      }
    ]
  },
  {
    id: "electrical-basics",
    title: "Basic Electrical & Wiring",
    icon: "⚡",
    category: "Electrical Trades",
    description: "Learn electrical safety, Lockout/Tagout, wire gauges (Romex), stripping wire, and connecting outlets and single-pole switches.",
    estimatedHours: 3,
    badgeName: "Basic Electrical & Wiring Badge",
    lessons: [
      {
        id: "lockout-tagout",
        title: "Electrical Safety & Lockout/Tagout (LOTO)",
        description: "How to de-energize circuits, use non-contact voltage testers, and ensure 100% zero voltage before touching wires.",
        durationMinutes: 15,
        videoUrl: "https://www.youtube.com/embed/7Kk3j2p1q0w",
        skillsCommonsRef: "Electrical Trades Foundation - LOTO Series",
        safetyTip: "Always test your voltage tester on a known live circuit first, then test your dead circuit, then re-test on live to confirm tester works (Live-Dead-Live method).",
        keyTakeaways: [
          "Never assume a circuit or wire is dead until verified with a functioning voltage tester.",
          "Lockout/Tagout places a physical padlock and warning tag on the breaker panel so no one turns it back on while you work.",
          "Residential standard voltage in the US is 120V for standard outlets and 240V for heavy appliances."
        ],
        quiz: [
          {
            question: "What is the very first step before touching any electrical wire?",
            options: [
              "Cut the wire with pliers",
              "Turn off the breaker and verify with a voltage tester",
              "Tape the ends with black tape",
              "Put on gloves"
            ],
            correctIndex: 1,
            explanation: "Always cut power at the breaker panel and verify with a tested voltage tester before touching any wire."
          }
        ]
      },
      {
        id: "wire-gauges-romex",
        title: "Understanding NM-B (Romex) Cable & Colors",
        description: "Learn wire color coding (Black, White, Bare/Green) and matching wire gauge (14 AWG vs 12 AWG) to circuit breaker sizes.",
        durationMinutes: 16,
        videoUrl: "https://www.youtube.com/embed/2_XzXg2S9eQ",
        skillsCommonsRef: "Residential Wiring 101 - SkillsCommons",
        safetyTip: "Never put 14-gauge wire on a 20-amp circuit breaker. 14 AWG is rated for 15 amps maximum.",
        keyTakeaways: [
          "White outer jacket = 14 Gauge (15 Amp circuits - standard lights & bedrooms).",
          "Yellow outer jacket = 12 Gauge (20 Amp circuits - kitchens, bathrooms, garages).",
          "Black wire = Hot (carries current from panel).",
          "White wire = Neutral (returns current to panel).",
          "Bare copper or Green wire = Equipment Ground (safety drain)."
        ],
        quiz: [
          {
            question: "In standard residential wiring, what is the role of the BLACK wire?",
            options: [
              "Neutral return",
              "Hot wire carrying voltage",
              "Ground wire",
              "Spare wire"
            ],
            correctIndex: 1,
            explanation: "The black wire is the 'hot' wire carrying 120V electrical current from the breaker panel."
          },
          {
            question: "What color outer jacket indicates a 12-gauge (20 Amp) Romex cable?",
            options: ["White", "Yellow", "Orange", "Blue"],
            correctIndex: 1,
            explanation: "Yellow Romex indicates 12 AWG wire, which is required for 20-amp circuits."
          }
        ]
      }
    ]
  },
  {
    id: "plumbing-foundations",
    title: "Plumbing & Piping Foundations",
    icon: "🔧",
    category: "Mechanical Trades",
    description: "Learn plumbing tools, PVC cement and primer, soldering copper vs. modern PEX crimping, and clearing common blockages.",
    estimatedHours: 2.5,
    badgeName: "Plumbing & Pipe Foundations Badge",
    lessons: [
      {
        id: "pipe-types-pex-pvc",
        title: "Modern Pipe Materials: PVC, Copper & PEX",
        description: "Compare water supply piping (PEX & Copper) vs drainage piping (PVC & ABS) and how to make watertight joints.",
        durationMinutes: 14,
        videoUrl: "https://www.youtube.com/embed/3L1x2y4Z5w6",
        skillsCommonsRef: "Plumbing Apprenticeship Series - DOL TAACCCT",
        safetyTip: "Always work in a well-ventilated area when using purple PVC primer and solvent cement.",
        keyTakeaways: [
          "PEX tubing is flexible, resists freezing, and uses crimp rings or push-to-connect fittings.",
          "PVC (white) is used for drain-waste-vent (DWV) piping and requires purple primer + cement.",
          "Slope is critical: drain pipes must slope downhill at least 1/4 inch per foot to drain properly."
        ],
        quiz: [
          {
            question: "What is the minimum required slope per foot for horizontal residential drain pipes?",
            options: ["1/16 inch per foot", "1/4 inch per foot", "1 inch per foot", "No slope needed"],
            correctIndex: 1,
            explanation: "Standard plumbing code requires a slope of 1/4 inch drop per linear foot for proper drainage."
          }
        ]
      },
      {
        id: "fixing-leaks-valves",
        title: "Replacing Faucets & Shutoff Valves",
        description: "How to safely shut off main water supply, replace quarter-turn angle stops, and install flexible braided supply lines.",
        durationMinutes: 12,
        videoUrl: "https://www.youtube.com/embed/4M2x3y4Z5w7",
        skillsCommonsRef: "Basic Residential Maintenance #201",
        safetyTip: "Always verify the water is completely shut off and relieve pressure at the lowest faucet before disconnecting supply valves.",
        keyTakeaways: [
          "Quarter-turn ball valves are more reliable than older multi-turn gate valves.",
          "Thread seal tape (Teflon/PTFE tape) must be wrapped clockwise around male pipe threads 3–4 times.",
          "Hand-tighten braided stainless steel water connectors, then snug with an extra 1/4 turn using a wrench."
        ],
        quiz: [
          {
            question: "In which direction should you wrap Teflon thread tape on pipe threads?",
            options: [
              "Counter-clockwise",
              "Clockwise (in the direction of the threads)",
              "Both directions",
              "Direction does not matter"
            ],
            correctIndex: 1,
            explanation: "Wrapping clockwise ensures the tape stays tight as you screw the fitting into place rather than peeling off."
          }
        ]
      }
    ]
  },
  {
    id: "hvac-foundations",
    title: "HVAC & Climate Control Basics",
    icon: "❄️",
    category: "Mechanical Trades",
    description: "Understand the refrigeration cycle, air filters, thermostat wiring basics, and basic preventative maintenance.",
    estimatedHours: 2.5,
    badgeName: "HVAC Fundamentals Badge",
    lessons: [
      {
        id: "air-conditioning-cycle",
        title: "How Heating & Cooling Works (The Heat Transfer Cycle)",
        description: "Learn the four core components of an AC system: Compressor, Condenser, Metering Device, and Evaporator.",
        durationMinutes: 16,
        videoUrl: "https://www.youtube.com/embed/5N3x4y5Z6w8",
        skillsCommonsRef: "HVAC Technician Core Skills - SkillsCommons",
        safetyTip: "Never attempt to vent or handle refrigerants without EPA Section 608 certification — refrigerants can cause severe freeze burns.",
        keyTakeaways: [
          "Air conditioners do not create cold air — they remove heat from indoor air and release it outside.",
          "The indoor coil (evaporator) absorbs heat; the outdoor unit (condenser) releases heat.",
          "Dirty air filters cause 80% of residential HVAC breakdowns by starving the system of airflow."
        ],
        quiz: [
          {
            question: "What is the primary cause of most residential AC freezing and breakdowns?",
            options: [
              "Using the wrong brand of thermostat",
              "Clogged/dirty air filters restricting airflow",
              "Setting temperature too low on hot days",
              "Leaving the door open"
            ],
            correctIndex: 1,
            explanation: "Restricted airflow from a dirty filter prevents heat exchange, causing the indoor evaporator coil to freeze into a block of ice."
          }
        ]
      }
    ]
  },
  {
    id: "home-depot-certs",
    title: "Home Depot Pro & Free Certifications",
    icon: "🟧",
    category: "Industry Certifications",
    description: "Access official, free industry-recognized credentials through Home Depot Academy, Pro Xtra trade tracks, and OSHA prep.",
    estimatedHours: 4,
    badgeName: "Home Depot Pro Ready",
    lessons: [
      {
        id: "hd-academy-walkthrough",
        title: "Accessing Free Home Depot Trade Certifications",
        description: "Step-by-step walkthrough on how to sign up for Home Depot Pro Academy and earn free certificates you can put on your resume.",
        durationMinutes: 10,
        videoUrl: "https://www.youtube.com/embed/6O4x5y6Z7w9",
        skillsCommonsRef: "Turn90 Partner Credential Walkthrough",
        safetyTip: "Home Depot Pro certifications are recognized by thousands of construction and trade employers nationwide.",
        keyTakeaways: [
          "Home Depot provides free online courses in Carpentry, Electrical, Plumbing, and General Construction.",
          "Courses can be taken on any Chromebook, phone, or computer for free.",
          "Completing tracks unlocks verified digital badges that you can download and add to your Turn90 resume.",
          "Talk to your Turn90 case manager if you need help with study prep or in-person workshop practice."
        ],
        quiz: [
          {
            question: "How much does it cost to take Home Depot Pro online trade certifications?",
            options: ["$250", "$50", "$100/month", "Free ($0)"],
            correctIndex: 3,
            explanation: "Home Depot Pro certifications and learning tracks are 100% free for participants and trade apprentices."
          }
        ]
      }
    ]
  }
];

export function getTradeTrack(trackId: string): TradeTrack | undefined {
  return TRADE_TRACKS.find((t) => t.id === trackId);
}

export function getTradeLesson(trackId: string, lessonId: string): TradeLesson | undefined {
  const track = getTradeTrack(trackId);
  return track?.lessons.find((l) => l.id === lessonId);
}
