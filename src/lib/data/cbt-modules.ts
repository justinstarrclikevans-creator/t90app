// ============================================================
// Turn90 — CBT Module Data
// Structured content from the Facilitator Guides
// ============================================================

export interface CbtLesson {
  key: string;
  title: string;
  description: string;
  videoNote?: string;
  sections: LessonSection[];
  homework?: HomeworkAssignment;
}

export interface LessonSection {
  title: string;
  type: "text" | "discussion" | "worksheet" | "activity" | "video";
  content: string;
  fields?: WorksheetField[];
}

export interface WorksheetField {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "grid" | "scale" | "checklist";
  placeholder?: string;
  options?: string[];
  gridConfig?: {
    rows: string[];
    columns: string[];
  };
}

export interface HomeworkAssignment {
  title: string;
  instructions: string;
  fields: WorksheetField[];
}

export interface CbtModule {
  number: number;
  title: string;
  description: string;
  icon: string;
  lessons: CbtLesson[];
}

// ============================================================
// Module Definitions
// ============================================================

export const CBT_MODULES: CbtModule[] = [
  {
    number: 1,
    title: "Thinking",
    description:
      "Learn how your thinking affects your decisions and actions. Master the Decision Making Tool (DMT) and other tools to make better choices.",
    icon: "🧠",
    lessons: [
      {
        key: "1a",
        title: "Decision Making",
        description:
          "Learn the Decision Making Tool (DMT) to weigh positive and negative consequences before making choices.",
        videoNote: "Watch the lesson video before starting",
        sections: [
          {
            title: "What is the DMT?",
            type: "text",
            content:
              "The Decision Making Tool (DMT) helps you weigh out the short and long term positive and negative consequences of different choices. Instead of making decisions based on how you feel right now, you learn to think about how your choices will affect your life in the long run.",
          },
          {
            title: "Think About It",
            type: "discussion",
            content:
              "How have you normally made decisions in the past? Think about a time when you made a decision based on getting something you wanted right now, but it caused problems for you later.",
          },
          {
            title: "Decision Making Tool Worksheet",
            type: "worksheet",
            content:
              "Use the DMT to weigh out a decision you are facing right now.",
            fields: [
              {
                id: "decision",
                label: "What decision are you facing?",
                type: "textarea",
                placeholder: "Describe the decision you need to make...",
              },
              {
                id: "option1",
                label: "Option 1",
                type: "text",
                placeholder: "First option...",
              },
              {
                id: "option2",
                label: "Option 2",
                type: "text",
                placeholder: "Second option...",
              },
              {
                id: "dmt_grid",
                label: "DMT Analysis",
                type: "grid",
                gridConfig: {
                  rows: ["Short-Term (6 months or less)", "Long-Term (6 months or more)"],
                  columns: ["Positive (+)", "Negative (-)"],
                },
              },
              {
                id: "best_option",
                label: "Based on your DMT, which option is best for your long-term goals?",
                type: "textarea",
                placeholder: "Which option will you choose and why?",
              },
            ],
          },
        ],
        homework: {
          title: "Practice Using the DMT",
          instructions:
            "Use the DMT on a real decision you face this week. Fill in all four boxes and decide which option is best for your long-term goals.",
          fields: [
            {
              id: "hw_decision",
              label: "What decision did you face?",
              type: "textarea",
              placeholder: "Describe the decision...",
            },
            {
              id: "hw_dmt_grid",
              label: "Your DMT",
              type: "grid",
              gridConfig: {
                rows: ["Short-Term", "Long-Term"],
                columns: ["Positive", "Negative"],
              },
            },
            {
              id: "hw_choice",
              label: "What did you decide?",
              type: "textarea",
              placeholder: "What option did you choose and why?",
            },
          ],
        },
      },
      {
        key: "1b",
        title: "Beliefs",
        description:
          "Understand how your beliefs shape your thinking and behavior.",
        sections: [
          {
            title: "Understanding Beliefs",
            type: "text",
            content:
              "Our beliefs are the thoughts we accept as true about ourselves, other people, and the world. They shape how we see everything and influence the decisions we make every day. Some beliefs help us — they push us toward our goals. Others hold us back.",
          },
          {
            title: "Identifying Your Beliefs",
            type: "worksheet",
            content: "Think about beliefs that have influenced your choices.",
            fields: [
              {
                id: "helpful_beliefs",
                label: "List 3 beliefs that have helped you",
                type: "textarea",
                placeholder: "1.\n2.\n3.",
              },
              {
                id: "harmful_beliefs",
                label: "List 3 beliefs that have hurt you or held you back",
                type: "textarea",
                placeholder: "1.\n2.\n3.",
              },
            ],
          },
        ],
      },
      {
        key: "1c",
        title: "Modifying Beliefs",
        description: "Learn to upgrade harmful beliefs into helpful ones.",
        sections: [
          {
            title: "Upgrading Your Beliefs",
            type: "text",
            content:
              "You can change beliefs that hold you back. The key is to recognize a harmful belief, challenge it, and replace it with a new belief that supports your goals. This takes practice, but it gets easier over time.",
          },
          {
            title: "Belief Upgrade Worksheet",
            type: "worksheet",
            content: "Practice upgrading your beliefs.",
            fields: [
              {
                id: "old_belief",
                label: "Old Belief (harmful)",
                type: "textarea",
                placeholder: "Write a belief that has held you back...",
              },
              {
                id: "why_harmful",
                label: "Why is this belief harmful?",
                type: "textarea",
                placeholder: "How has this belief caused problems?",
              },
              {
                id: "new_belief",
                label: "New Belief (upgraded)",
                type: "textarea",
                placeholder: "Write a new, upgraded belief...",
              },
              {
                id: "how_helps",
                label: "How does the new belief help your goals?",
                type: "textarea",
                placeholder: "How will this new belief improve your life?",
              },
            ],
          },
        ],
      },
      {
        key: "1d",
        title: "Thinking Leads to Action",
        description:
          "See how your thoughts directly lead to your actions and consequences.",
        sections: [
          {
            title: "The Thinking Chain",
            type: "text",
            content:
              "Every action starts with a thought. Your thinking leads to your actions, and your actions lead to consequences. If you can change your thinking, you can change your actions — and your life.",
          },
          {
            title: "STAC Worksheet",
            type: "worksheet",
            content:
              "Use the Situation-Thinking-Action-Consequences (STAC) tool to trace how your thinking led to your actions.",
            fields: [
              {
                id: "situation",
                label: "Situation — What happened?",
                type: "textarea",
                placeholder: "Describe the situation...",
              },
              {
                id: "thinking",
                label: "Thinking — What were you thinking?",
                type: "textarea",
                placeholder: "What thoughts went through your mind?",
              },
              {
                id: "action",
                label: "Action — What did you do?",
                type: "textarea",
                placeholder: "What action did you take?",
              },
              {
                id: "consequences",
                label: "Consequences — What happened as a result?",
                type: "textarea",
                placeholder: "What were the consequences?",
              },
            ],
          },
        ],
      },
      {
        key: "1e",
        title: "Destructive Thinking",
        description: "Identify thinking patterns that lead to problems.",
        sections: [
          {
            title: "What is Destructive Thinking?",
            type: "text",
            content:
              "Destructive thinking includes thoughts that lead us toward harmful decisions. Common types include: blaming others, thinking you're entitled to things, making excuses, and thinking only about what you want right now instead of what's best long-term.",
          },
          {
            title: "Thought Tracker",
            type: "worksheet",
            content:
              "Track a situation where destructive thinking showed up.",
            fields: [
              {
                id: "trigger",
                label: "What triggered the destructive thinking?",
                type: "textarea",
                placeholder: "What situation set it off?",
              },
              {
                id: "destructive_thoughts",
                label: "List the destructive thoughts",
                type: "textarea",
                placeholder: "1.\n2.\n3.",
              },
              {
                id: "feelings",
                label: "How did those thoughts make you feel?",
                type: "textarea",
                placeholder: "What emotions came up?",
              },
              {
                id: "better_thoughts",
                label: "What are better thoughts you could have instead?",
                type: "textarea",
                placeholder: "1.\n2.\n3.",
              },
            ],
          },
        ],
      },
      {
        key: "1f",
        title: "Personal Roadmap",
        description:
          "Create a personal roadmap for where you want your life to go.",
        sections: [
          {
            title: "Your Roadmap",
            type: "text",
            content:
              "A personal roadmap is your plan for where you want to go in life. It helps you stay focused on your goals when things get tough. Think of it like a GPS for your life — it shows you the direction, even when the road gets bumpy.",
          },
          {
            title: "Build Your Roadmap",
            type: "worksheet",
            content: "Map out your goals and the steps to get there.",
            fields: [
              {
                id: "where_now",
                label: "Where are you right now in life?",
                type: "textarea",
                placeholder: "Describe your current situation honestly...",
              },
              {
                id: "where_going",
                label: "Where do you want to be in 1 year?",
                type: "textarea",
                placeholder: "Describe your ideal life in 1 year...",
              },
              {
                id: "steps",
                label: "What are 3 steps to get there?",
                type: "textarea",
                placeholder: "1.\n2.\n3.",
              },
              {
                id: "obstacles",
                label: "What obstacles might get in the way?",
                type: "textarea",
                placeholder: "What could slow you down?",
              },
              {
                id: "support",
                label: "Who can help you stay on track?",
                type: "textarea",
                placeholder: "Name people who support your goals...",
              },
            ],
          },
        ],
      },
      {
        key: "1g",
        title: "Upgrade Your Thinking",
        description:
          "Put it all together — practice upgrading destructive thoughts into constructive ones.",
        sections: [
          {
            title: "Putting It Together",
            type: "text",
            content:
              "You've learned how thinking leads to action, how to spot destructive thinking, and how to upgrade your beliefs. Now it's time to put it all together. When you catch yourself thinking destructively, you can stop, recognize it, and upgrade to a thought that supports your goals.",
          },
          {
            title: "Thought Tracker — Upgrade Your Thinking",
            type: "worksheet",
            content:
              "Track a situation with destructive thinking and practice upgrading.",
            fields: [
              {
                id: "situation",
                label: "What was the triggering situation?",
                type: "textarea",
                placeholder: "Describe what happened...",
              },
              {
                id: "destructive",
                label: "Destructive / Risky Thoughts",
                type: "textarea",
                placeholder: "List the risky thoughts that came up...",
              },
              {
                id: "feelings",
                label: "How did those thoughts make you feel?",
                type: "textarea",
                placeholder: "What feelings came up?",
              },
              {
                id: "upgraded",
                label: "Upgraded Thoughts (new thoughts that support your goals)",
                type: "textarea",
                placeholder: "Write new, upgraded thoughts...",
              },
            ],
          },
        ],
        homework: {
          title: "Thought Tracker — Upgrade Your Thinking",
          instructions:
            "Watch for a time when you experience a problem, conflict, or risky emotion. Complete the thought tracker below to practice upgrading your thinking.",
          fields: [
            {
              id: "hw_situation",
              label: "What was the triggering situation?",
              type: "textarea",
              placeholder: "Describe what happened...",
            },
            {
              id: "hw_destructive",
              label: "Destructive / Risky Thoughts",
              type: "textarea",
              placeholder: "1.\n2.\n3.",
            },
            {
              id: "hw_feelings",
              label: "Feelings",
              type: "textarea",
              placeholder: "How did those thoughts make you feel?",
            },
            {
              id: "hw_upgraded",
              label: "Upgraded Thoughts",
              type: "textarea",
              placeholder: "1.\n2.\n3.",
            },
          ],
        },
      },
    ],
  },
  {
    number: 2,
    title: "Feelings",
    description:
      "Learn to understand, manage, and express your feelings in healthy ways. Build emotional self-control strategies.",
    icon: "❤️",
    lessons: [
      { key: "2a", title: "Managing Feelings", description: "Learn skills to manage your emotions effectively.", sections: [{ title: "Understanding Emotions", type: "text", content: "Feelings are a natural part of life. The goal isn't to get rid of them — it's to learn how to manage them so they don't lead you to harmful actions. When you can recognize and manage your feelings, you make better decisions." }] },
      { key: "2b", title: "Emotional Goals", description: "Set goals for how you want to handle emotions.", sections: [{ title: "Setting Emotional Goals", type: "text", content: "Just like career goals, you can set goals for how you handle emotions. An emotional goal might be: 'When I feel angry, I will take 3 deep breaths before responding.' Setting these goals helps you prepare for tough moments." }] },
      { key: "2c", title: "Knowing Your Warning Signs", description: "Recognize the physical and mental signs before you lose control.", sections: [{ title: "Warning Signs", type: "text", content: "Your body gives you warning signs before emotions take over — racing heart, tight fists, hot face, racing thoughts. Learning to spot these signs early gives you time to use a strategy before things escalate." }] },
      { key: "2d", title: "Knowing Your Feelings", description: "Build your vocabulary for naming what you feel.", sections: [{ title: "Naming Feelings", type: "text", content: "Many people struggle to name their feelings beyond 'mad' or 'fine.' But being specific helps you deal with emotions better. There's a difference between being frustrated, disappointed, anxious, or hurt — and each needs a different response." }] },
      { key: "2e", title: "Expressing Your Feelings", description: "Learn healthy ways to express what you feel.", sections: [{ title: "Healthy Expression", type: "text", content: "Expressing feelings doesn't mean blowing up or shutting down. It means communicating what you feel in a way that's honest but doesn't harm you or others. Using 'I feel...' statements is a powerful way to start." }] },
      { key: "2f", title: "Understanding Others' Feelings", description: "Build empathy by understanding how others feel.", sections: [{ title: "Empathy", type: "text", content: "Understanding how other people feel helps you build stronger relationships and avoid conflict. It doesn't mean you have to agree with them — it means you try to see things from their perspective." }] },
      { key: "2g", title: "Thought-Feeling Cycle", description: "See how thoughts and feelings feed into each other.", sections: [{ title: "The Cycle", type: "text", content: "Thoughts and feelings are connected in a cycle. A negative thought creates a negative feeling, which creates more negative thoughts. Breaking this cycle by changing your thinking is one of the most powerful skills you can learn." }] },
      { key: "2h", title: "Stop and Think", description: "Practice pausing before reacting.", sections: [{ title: "The Power of Pausing", type: "text", content: "The space between what happens to you and how you respond is where your power lives. Learning to stop and think — even for 5 seconds — before reacting can change the outcome of any situation." }] },
      { key: "2i", title: "Self-Control: Thinking Strategies", description: "Use thinking-based strategies to control your emotions.", sections: [{ title: "Thinking Strategies", type: "text", content: "Thinking strategies include: Thought Stopping (telling yourself 'STOP'), Visualization (picturing a calm place), New Thinking (replacing the risky thought), Counting Backwards (from 10), and Grounding (focusing on your 5 senses)." }] },
      { key: "2j", title: "Self-Control: Action Strategies", description: "Use action-based strategies to manage emotions.", sections: [{ title: "Action Strategies", type: "text", content: "Action strategies include: Deep Breathing, Walking Away, Talking to Someone, Physical Exercise, and Writing It Down. Combining a thinking strategy with an action strategy is more effective than using just one." }] },
    ],
  },
  {
    number: 3,
    title: "Thinking Errors",
    description:
      "Identify and correct common thinking errors that lead to poor decisions. Learn about expectations, risk factors, and blaming.",
    icon: "⚡",
    lessons: [
      { key: "3a", title: "Ignoring Your Past", description: "Learn why ignoring your past puts you at risk.", sections: [{ title: "Facing Your Past", type: "text", content: "Ignoring your past doesn't make it go away — it actually makes you more likely to repeat the same mistakes. Understanding your history helps you recognize patterns and make different choices going forward." }] },
      { key: "3b", title: "Expectations", description: "Understand how unrealistic expectations create problems.", sections: [{ title: "Expectations vs Reality", type: "text", content: "Unrealistic expectations set you up for frustration and anger. When you expect things to go perfectly or expect others to behave exactly as you want, you're creating a recipe for disappointment." }] },
      { key: "3c", title: "Managing Expectations", description: "Learn to set realistic expectations.", sections: [{ title: "Setting Realistic Expectations", type: "text", content: "Managing expectations means being honest about what's likely to happen, what you can control, and what you can't. It doesn't mean giving up — it means being smart about what you expect." }] },
      { key: "3d", title: "Tunnel Vision", description: "Recognize when you're seeing only part of the picture.", sections: [{ title: "Seeing the Full Picture", type: "text", content: "Tunnel vision means focusing on only one part of a situation — usually the negative part. This leads to overreacting and poor decisions. Learning to step back and see the full picture helps you respond better." }] },
      { key: "3e", title: "Personal Risk Factors", description: "Identify your personal risk factors for making poor choices.", sections: [{ title: "Know Your Risks", type: "text", content: "Everyone has specific situations, people, places, or feelings that increase their risk of making poor choices. Knowing your personal risk factors lets you plan ahead to avoid or manage them." }] },
      { key: "3f", title: "Managing Risk Factors", description: "Create plans to handle your risk factors.", sections: [{ title: "Managing Your Risks", type: "text", content: "Once you know your risk factors, you can create plans to handle them. This might mean avoiding certain places, having a support person to call, or using a self-control strategy when triggered." }] },
      { key: "3g", title: "Should Thinking", description: "Recognize when 'should' thinking creates problems.", sections: [{ title: "The Problem with Should", type: "text", content: "'Should thinking' means believing others SHOULD act a certain way. When they don't, it leads to anger and resentment. Replacing 'should' with 'I wish' or 'I'd prefer' takes away the demand and reduces frustration." }] },
      { key: "3h", title: "Replacing Should Thinking", description: "Practice replacing should thinking with flexible thinking.", sections: [{ title: "Flexible Thinking", type: "text", content: "Flexible thinking means accepting that people and situations won't always be how you want them. Instead of demanding, you can prefer. Instead of 'should,' you can use 'it would be nice if.' This reduces anger and helps you respond calmly." }] },
      { key: "3i", title: "Blaming Thinking", description: "Stop blaming others and take responsibility for your choices.", sections: [{ title: "Taking Responsibility", type: "text", content: "Blaming others for your problems feels natural, but it keeps you stuck. When you take responsibility for your own choices — even if the situation wasn't fair — you take back your power to change things." }] },
    ],
  },
  {
    number: 4,
    title: "Personality",
    description:
      "Explore personality traits that affect your behavior. Learn to manage impulsivity, entitlement, aggression, and build healthy self-interest.",
    icon: "🪞",
    lessons: [
      { key: "4a", title: "Intro to Personality", description: "Understand the personality traits that shape your behavior.", sections: [{ title: "Understanding Personality", type: "text", content: "Your personality is made up of patterns in how you think, feel, and act. Some traits help you succeed, while others create problems. The good news: you can work on changing the traits that hold you back." }] },
      { key: "4b", title: "Personality & Beliefs", description: "See how personality and beliefs are connected.", sections: [{ title: "Beliefs Shape Personality", type: "text", content: "Your beliefs and personality work together. If you believe 'I deserve things without working for them,' that belief shows up as entitlement. Changing the belief can change the behavior." }] },
      { key: "4c", title: "Personality & New Beliefs", description: "Practice building new beliefs to reshape personality.", sections: [{ title: "New Beliefs, New You", type: "text", content: "By choosing new beliefs that align with your goals, you can reshape your personality over time. This isn't about becoming someone else — it's about becoming the version of yourself you want to be." }] },
      { key: "4d", title: "Impulsivity", description: "Understand and manage impulsive behavior.", sections: [{ title: "Managing Impulsivity", type: "text", content: "Impulsivity means acting without thinking about consequences. It's one of the biggest risk factors for getting into trouble. Learning to pause, think, and then act is the key to beating impulsivity." }] },
      { key: "4e", title: "Entitlement", description: "Recognize and address feelings of entitlement.", sections: [{ title: "Entitlement vs Earning", type: "text", content: "Entitlement means believing you deserve things without earning them. It leads to anger when you don't get what you want and shortcuts that create bigger problems. Replacing entitlement with a willingness to earn builds real confidence." }] },
      { key: "4f", title: "Extreme Self-Focus", description: "Learn to think beyond yourself.", sections: [{ title: "Beyond Self-Focus", type: "text", content: "Extreme self-focus means only thinking about what you want and need, without considering others. It damages relationships and leads to conflict. Building awareness of others' needs strengthens your connections." }] },
      { key: "4g", title: "Healthy Self-Interest", description: "Balance taking care of yourself with caring for others.", sections: [{ title: "Healthy Balance", type: "text", content: "Healthy self-interest means taking care of your own needs while also respecting others. It's the sweet spot between being selfish and being a pushover. You can stand up for yourself without stepping on others." }] },
      { key: "4h", title: "Aggression", description: "Understand and manage aggressive behavior.", sections: [{ title: "Managing Aggression", type: "text", content: "Aggression often comes from feeling threatened, disrespected, or powerless. But aggressive responses usually make things worse. Learning other ways to respond to these triggers gives you real power." }] },
      { key: "4i", title: "Responding to Criticism", description: "Learn to handle criticism without reacting destructively.", sections: [{ title: "Handling Criticism", type: "text", content: "Criticism can feel like an attack, but how you respond determines the outcome. You can listen, decide if there's truth in it, and respond calmly — even if the person was disrespectful in how they said it." }] },
      { key: "4j", title: "Responding to Authority", description: "Build skills for dealing with authority figures.", sections: [{ title: "Working with Authority", type: "text", content: "Dealing with authority figures — bosses, probation officers, police — is a skill. Even if you disagree, responding respectfully keeps you out of trouble and in control. It doesn't mean you're weak — it means you're smart." }] },
    ],
  },
  {
    number: 5,
    title: "Low Frustration",
    description:
      "Build tolerance for frustration and learn strategies for managing simple and complex frustrations without giving up.",
    icon: "💪",
    lessons: [
      { key: "5a", title: "Intro to Low Frustration", description: "Understand how low frustration tolerance causes problems.", sections: [{ title: "Frustration Tolerance", type: "text", content: "Low frustration tolerance means giving up quickly or reacting badly when things get hard. It leads to quitting jobs, blowing up in arguments, and avoiding challenges. Building tolerance helps you push through difficulty to reach your goals." }] },
      { key: "5b", title: "Managing Simple Frustrations", description: "Handle everyday annoyances without overreacting.", sections: [{ title: "Simple Frustrations", type: "text", content: "Simple frustrations are everyday annoyances — traffic, waiting in line, someone being rude. They're not life-changing, but they can build up. Learning to let small things go saves your energy for what really matters." }] },
      { key: "5c", title: "Managing Complex Frustrations", description: "Deal with big frustrations that threaten your goals.", sections: [{ title: "Complex Frustrations", type: "text", content: "Complex frustrations are bigger situations that threaten your goals — losing a job, housing problems, relationship issues. These require more than just 'letting it go.' They need a plan, support, and persistence." }] },
      { key: "5d", title: "Practice Complex Frustrations", description: "Practice working through complex frustrating situations.", sections: [{ title: "Practice Session", type: "text", content: "Practice is key. By working through frustrating scenarios in a safe setting, you build the skills and confidence to handle them when they happen in real life." }] },
      { key: "5e", title: "Cycle of Avoidance", description: "Break the pattern of avoiding problems.", sections: [{ title: "Breaking the Cycle", type: "text", content: "The Cycle of Avoidance: Problem → Feel Overwhelmed → Avoid the Problem → Problem Gets Worse → Feel More Overwhelmed. Breaking this cycle means facing problems early, when they're still manageable." }] },
      { key: "5f", title: "Increasing Frustration Tolerance", description: "Build your capacity to handle frustration over time.", sections: [{ title: "Building Tolerance", type: "text", content: "Frustration tolerance is like a muscle — it gets stronger with practice. Each time you push through a frustrating situation instead of giving up, you're building your tolerance. It gets easier over time." }] },
    ],
  },
  {
    number: 6,
    title: "Control",
    description:
      "Learn what you can and can't control. Focus your energy on what you can change and let go of what you can't.",
    icon: "🎯",
    lessons: [
      { key: "6a", title: "What We Can Control", description: "Learn the difference between what you can and can't control.", sections: [{ title: "Control vs No Control", type: "text", content: "There are things you can control (your thoughts, actions, attitude, effort) and things you can't (other people, the past, traffic, weather). Spending energy on things you can't control is wasted energy. Focus on what you CAN change." }] },
      { key: "6b", title: "Control and Worries", description: "Stop worrying about things outside your control.", sections: [{ title: "Letting Go of Worry", type: "text", content: "Worrying about things you can't control doesn't change them — it just makes you stressed and anxious. Learning to recognize when you're worrying about something outside your control helps you redirect your energy." }] },
      { key: "6c", title: "Understanding Our Control", description: "Get clear on your personal areas of control.", sections: [{ title: "Your Control Zone", type: "text", content: "Your 'control zone' includes your thoughts, words, actions, effort, and attitude. Everything else is outside your zone. When you feel stressed, ask yourself: 'Is this in my control zone?' If not, let it go." }] },
      { key: "6d", title: "Maximizing Control", description: "Make the most of what you can control.", sections: [{ title: "Maximizing Your Power", type: "text", content: "Once you know what you can control, maximize it. Give your best effort, choose your words carefully, manage your attitude, and take positive action. This is where your real power lives." }] },
      { key: "6e", title: "Making a Complaint", description: "Learn to make complaints effectively and respectfully.", sections: [{ title: "Effective Complaints", type: "text", content: "Sometimes things aren't fair and you need to speak up. Making a complaint effectively means being clear, calm, and respectful. It's about the issue, not attacking the person. This gets you better results." }] },
    ],
  },
  {
    number: 8,
    title: "Support Network",
    description:
      "Build a strong support network. Learn to strengthen good relationships, set boundaries, and make tough decisions about who to keep in your life.",
    icon: "🤝",
    lessons: [
      { key: "8a", title: "Support Network Intro", description: "Understand why a support network matters.", sections: [{ title: "Your Network", type: "text", content: "A support network is the group of people who help you stay on track. These are people who support your goals, hold you accountable, and are there when things get tough. Everyone needs one." }] },
      { key: "8b", title: "Cutting People Off", description: "Learn when and how to distance yourself from negative influences.", sections: [{ title: "Making Hard Choices", type: "text", content: "Sometimes the people closest to you are the ones pulling you backward. Cutting people off doesn't make you a bad person — it means you're choosing your future over your past." }] },
      { key: "8c", title: "Strengthening Relationships", description: "Build stronger connections with positive people.", sections: [{ title: "Building Stronger Bonds", type: "text", content: "Strengthening relationships means investing time and energy in the people who support your goals. It means being reliable, honest, and showing up for them too." }] },
      { key: "8d", title: "Practice Strengthening Relationships", description: "Practice skills for building better relationships.", sections: [{ title: "Practice", type: "text", content: "Like any skill, building relationships takes practice. Try reaching out to a positive person this week, having an honest conversation, or showing appreciation for someone who supports you." }] },
      { key: "8e", title: "Setting Boundaries", description: "Learn to set healthy boundaries with others.", sections: [{ title: "Healthy Boundaries", type: "text", content: "Boundaries are limits you set on what you will and won't accept from others. They protect your goals, your time, and your well-being. Setting boundaries isn't mean — it's necessary." }] },
      { key: "8f", title: "Practicing Boundaries", description: "Practice setting and maintaining boundaries.", sections: [{ title: "Practice Setting Boundaries", type: "text", content: "Practice saying: 'I can't do that because it goes against my goals.' 'I need you to respect my decision.' 'I care about you, but I have to put my future first.' The more you practice, the easier it gets." }] },
      { key: "8g", title: "Deciding to Say No", description: "Build the skill of saying no to negative influences.", sections: [{ title: "The Power of No", type: "text", content: "Saying no is one of the most powerful skills you can have. It protects your goals, your freedom, and your future. It gets easier with practice, and the right people will respect you for it." }] },
    ],
  },
  {
    number: 9,
    title: "Ideal Self",
    description:
      "Define who you want to become. Explore your values, practice assertive communication, and build the life you want.",
    icon: "⭐",
    lessons: [
      { key: "9a", title: "Defining Ourselves", description: "Explore who you are and who you want to become.", sections: [{ title: "Who Are You?", type: "text", content: "You are more than your past. Defining yourself means deciding who you want to be going forward — your values, your goals, your character. You have the power to choose." }] },
      { key: "9b", title: "Expanding the Man Box", description: "Challenge limited definitions of manhood.", sections: [{ title: "Beyond the Box", type: "text", content: "Society often puts men in a 'box' — be tough, don't show feelings, use aggression to solve problems. But the strongest men are the ones who can be vulnerable, ask for help, and show emotions. Real strength isn't about violence." }] },
      { key: "9c", title: "Assertive Communication", description: "Learn to communicate clearly and respectfully.", sections: [{ title: "Being Assertive", type: "text", content: "Assertive communication means standing up for yourself while respecting others. It's the middle ground between being passive (not speaking up) and being aggressive (attacking). It's the most effective way to get your needs met." }] },
      { key: "9d", title: "Practicing Assertive Communication", description: "Practice assertive communication skills.", sections: [{ title: "Practice", type: "text", content: "Use this formula: 'I feel [emotion] when [situation] because [reason]. I would like [request].' Example: 'I feel frustrated when meetings start late because I have a tight schedule. I would like us to start on time.'" }] },
      { key: "9e", title: "I Don't Want v. I Do Want", description: "Shift your focus from what you don't want to what you do want.", sections: [{ title: "Focus on What You Want", type: "text", content: "It's easy to list what you DON'T want — no more jail, no more struggle. But your brain works better when you focus on what you DO want — stability, a good job, strong relationships. Positive goals pull you forward." }] },
      { key: "9f", title: "Values & Actions", description: "Align your daily actions with your values.", sections: [{ title: "Living Your Values", type: "text", content: "Your values are what matters most to you — family, honesty, hard work, freedom. When your daily actions match your values, you feel good about yourself. When they don't, you feel conflicted." }] },
      { key: "9g", title: "Aspirational Values", description: "Identify the values you aspire to live by.", sections: [{ title: "Your Aspirational Values", type: "text", content: "Aspirational values are the values you want to grow into. Maybe you value honesty but sometimes struggle with it. That's okay — naming it as an aspiration gives you something to work toward." }] },
      { key: "9h", title: "Living Your Values", description: "Put your values into daily practice.", sections: [{ title: "Daily Practice", type: "text", content: "Living your values every day takes effort. It means making choices that align with who you want to be, even when it's hard. Each small choice adds up to a life you can be proud of." }] },
      { key: "9i", title: "Dealing with Urges", description: "Manage urges to return to old behaviors.", sections: [{ title: "Managing Urges", type: "text", content: "Urges are normal — they don't mean you're failing. They're your brain's old habits trying to pull you back. The key is recognizing the urge, not acting on it, and using a strategy to get through it. Urges pass if you wait them out." }] },
      { key: "9j", title: "Deciding to Be Honest", description: "Build a practice of honesty in your life.", sections: [{ title: "Choosing Honesty", type: "text", content: "Honesty builds trust, and trust opens doors. Being honest — even when it's uncomfortable — shows integrity. People respect it, and it frees you from the stress of keeping up lies." }] },
      { key: "9k", title: "Asking for Help", description: "Learn that asking for help is a sign of strength, not weakness.", sections: [{ title: "Help is Strength", type: "text", content: "Asking for help isn't weakness — it's wisdom. Nobody succeeds alone. The strongest people know when they need support and aren't afraid to ask for it. Turn90 is here for you, and so is your support network." }] },
    ],
  },
];

export function getModule(moduleNumber: number): CbtModule | undefined {
  return CBT_MODULES.find((m) => m.number === moduleNumber);
}

export function getLesson(moduleNumber: number, lessonKey: string): CbtLesson | undefined {
  const mod = getModule(moduleNumber);
  return mod?.lessons.find((l) => l.key === lessonKey);
}
