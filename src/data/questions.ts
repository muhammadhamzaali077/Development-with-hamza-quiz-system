export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface ShuffledQuestion extends Question {
  shuffledOptions: string[];
  correctAnswerIndex: number;
}

export const shuffleQuestionOptions = (question: Question): ShuffledQuestion => {
  const optionsWithIndex = question.options.map((option, index) => ({
    option,
    isCorrect: index === question.correctAnswer
  }));
  
  // Fisher-Yates shuffle
  for (let i = optionsWithIndex.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsWithIndex[i], optionsWithIndex[j]] = [optionsWithIndex[j], optionsWithIndex[i]];
  }
  
  const shuffledOptions = optionsWithIndex.map(item => item.option);
  const correctAnswerIndex = optionsWithIndex.findIndex(item => item.isCorrect);
  
  return {
    ...question,
    shuffledOptions,
    correctAnswerIndex
  };
}

export const questions: Question[] = [
  {
    id: 1,
    question: "How do handoffs in Swarm help with multi-agent team work?",
    options: ["By letting agents copy jobs to many parts for extra safety.", "By forcing step-by-step work where each agent finishes before the next.", "By passing control and info from one agent to another based on job fit.", "By keeping agents apart to stop any talk or smart path choices for user asks."],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "In Swarm, what do Agents mainly do?",
    options: ["Self-run parts with broad rules that watch over the whole multi-agent plan.", "Standalone pieces with clear rules and tools for set jobs.", "Standalone pieces with clear rules and tools for set jobs.", "Standalone pieces with clear rules and tools for set jobs."],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "In uv, what is a packaged application best for?",
    options: ["Quick prototypes with no structure, using direct script runs without install.", "Long-term projects for distribution, with versioning and easy install anywhere.", "One-off scripts that skip metadata and focus on internal use only.", "Simple folders for tests, without entry points or reproducibility needs."],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "In packaged apps, why use src layout?",
    options: ["To run files directly without package awareness or imports.", "To mix source code with config files for quick access.", "To focus on simple scripts only, skipping module paths.", "To keep source separate from metadata to avoid wrong imports in dev."],
    correctAnswer: 3
  },
  {
    id: 5,
    question: "For a simple application in uv, what command creates the project?",
    options: ["'uv init --package my-app' to add src layout and metadata right away.", "'uv init my-app' to make a basic folder with scripts and no packaging.", "'uv sync' first to pin Python before any folder setup.", "'uv venv' to start with deps and then build structure later."],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "What is the main job of the OpenAI Agents SDK?",
    options: ["To build hard AI models that only do math without any user help.", "To make smart AI agents easily in Python for tasks like questions and tools.", "To create simple chatbots that never use other agents or handoffs.", "To set up school-like systems for non-AI teachers with no code."],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "What is the main purpose of model configuration in AI agents?",
    options: ["To set up basic tools like calculators without any model choice.", "To choose and set the AI model like GPT for the agent's brain", "To add memory for sessions without changing the model type.", "To create call another Agent."],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "Why pick different models in setup?",
    options: ["To slow down agents for exact work on easy jobs.", "To mix speed, cost, and smarts for each agent's task.", "To add checks that switch models during work.", "To copy agents with the same model all the time."],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "What happens if no model is set in agent setup?",
    options: ["The agent picks a default like gpt-4.1 on its own.", "The agent stops and won't start at all.", "It uses local info without any AI model.", "It passes to another agent to choose a model."],
    correctAnswer: 0
  },
  {
    id: 10,
    question: "How do you add a basic tool to an agent in code?",
    options: ["Use 'Agent.tools = [tool]' after making the agent.", "Use 'Agent(instructions='Use tool')' with no tool list.", "Use 'Runner.add_tool(add)' on the runner.", "Use 'Model.set_tools([search])' in model setup."],
    correctAnswer: 0
  },
  {
    id: 11,
    question: "What does setting temperature=0.5 do in a GPT-4.1 agent for simple factual prompts?",
    options: ["Makes responses highly random", "Balances creativity and focus, ideal for clear answers", "Forces identical outputs every time", "Increases response length"],
    correctAnswer: 1
  },
  {
    id: 12,
    question: "What is a key difference between BaseModel and @dataclasses.dataclass in Pydantic for agent outputs?",
    options: ["BaseModel skips validation", "Both are identical", "Dataclasses are always slower", "BaseModel supports JSON schema generation, dataclasses are simpler"],
    correctAnswer: 3
  },
  {
    id: 13,
    question: "In the OpenAI Agents SDK, what is a handoff?",
    options: ["Transferring control from one agent to another with context", "Restarting the agent", "Error logging", "Model training"],
    correctAnswer: 0
  },
  {
    id: 14,
    question: "What is the role of type hints in Pydantic for an SDK agent’s output_type?",
    options: ["Change output format", "Improve speed", "Only for documentation", "Validate data and define schemas at runtime"],
    correctAnswer: 3
  },
  {
    id: 15,
    question: "How should you handle a ToolError in an SDK agent’s tool call?",
    options: ["Ignore it", "Use try-except to catch and return an error response", "Agent will handle error automatically", "No error produced by tools"],
    correctAnswer: 1
  },
  {
    id: 16,
    question: "What is the default max_turns in an SDK runner: runner = Runner(agent)?",
    options: ["10", "05", "Infinite", "11"],
    correctAnswer: 0
  },
  {
    id: 17,
    question: "What are guardrails in this SDK code: 'agent = Agent(guardrails=[lambda x: 'safe' in x])?'",
    options: ["Safety checks for inputs/outputs", "Speed optimizers", "Memory reducers", "Error Handling"],
    correctAnswer: 0
  },
  {
    id: 18,
    question: "What does run_streamed() do in: runner.run_streamed(input='query')?",
    options: ["Run multiple agents", "Delivers responses in real-time", "Only logs errors", "Run agent in syncronously"],
    correctAnswer: 1
  },
  {
    id: 19,
    question: "What does MaxTurnsExceeded mean in: 'try: runner.run() except MaxTurnsExceeded: pass?'",
    options: ["Internet Disconnection", "Agent exceeded max turns", "Agent produces an error", "None of above"],
    correctAnswer: 1
  },
  {
    id: 20,
    question: "What are RunHooks in: hooks = RunHooks(on_start=lambda: print('Start'))?",
    options: ["Custom code for run events", "Database connectors", "Custom code for llm run", "It call tool in optimized way"],
    correctAnswer: 0
  },
  {
    id: 21,
    question: "What does output_type do in: agent.output_type = User?",
    options: ["Skips output", "Pass agent output to another agent for better response", "it give the name of user", "Enforces structured output schema"],
    correctAnswer: 3
  },
  {
    id: 22,
    question: "In Pydantic code: class User(BaseModel): age: int = Field(ge=18), what does ge=18 do?",
    options: ["Ensures age >= 18", "Sets default to 18*", "Ignores age", "Converts to string"],
    correctAnswer: 0
  },
  {
    id: 23,
    question: "What is a span in SDK tracing: trace.add_span('tool_call')?",
    options: ["Full execution record", "Model parameter", "Single action within a trace", "Useless parameter"],
    correctAnswer: 2
  },
  {
    id: 24,
    question: "Which parameter is required in Agent class in OpenAI agent SDK?",
    options: ["name", "instructions", "model", "tools"],
    correctAnswer: 0
  },
  {
    id: 25,
    question: "If an agent is running and makes multiple tool calls in a single turn, how does the SDK handle them?",
    options: ["Executes them concurrently if possible.", "Executes them sequentially, one after another.", "Rejects multiple tool calls in a single turn.", "Bundles them into one API request."],
    correctAnswer: 1
  },
  {
    id: 26,
    question: "What happens if two tools in an agent’s tool list have the same name?",
    options: ["The last registered tool overwrites the earlier one.", "The SDK merges them into a single tool.", "The agent refuses to start with a ToolConflictError.", "Both remain active, and the agent randomly selects between them.)"],
    correctAnswer: 0
  },
  {
    id: 27,
    question: "Why should you build a custom runner in the OpenAI Agents SDK?",
    options: ["To add your own logic, like saving results or changing run steps.", "To add more agents without any changes.", "To add tools only.", "To change model settings."],
    correctAnswer: 0
  },
  {
    id: 28,
    question: "How do you send changing instructions to an agent in the OpenAI Agents SDK?",
    options: ["By Creating a function with multiple instructions", "Directly pass multiple instructions in Agent.instructions", "skip instructions llm will automatically adept the behaviour", "By passing you are a helpfull assistant only"],
    correctAnswer: 0
  },
  {
    id: 29,
    question: "What happens when you run this code in SDK: @function_tool def weather_tool(city: str, is_enabled=False): ... agent = Agent(tools=['weather_tool'])? (Assume the function returns weather data.)",
    options: ["Error: Tools need function objects, not strings like 'weather_tool'", "Agent adds the tool and can call it with city input.", "Agent ignores the is_enabled param.", "Agent will ignore tool because it's disabled"],
    correctAnswer: 0
  },
  {
    id: 30,
    question: "What is max_tokens used for?",
    options: ["To cap how long the agent's answer can be", "To set how many passes are allowed", "To count tools used in a run.", "To size local info storage."],
    correctAnswer: 0
  },
  {
    id: 31,
    question: "Code: model_settings = {'temperature': 0.1, 'max_tokens': 100} What is the effect?",
    options: ["Makes agent very creative with long answers.", "Makes agent sharp with short, clear answers.", "Adds word-by-word streaming.", "Turns on checks for word limits."],
    correctAnswer: 1
  },
  {
    id: 32,
    question: "How do you add local context?",
    options: ["Use agent.context = 'User is from NY' when making it.", "Use instructions += context by joining text.", "Use runner.context('Details') before run.", "Use tool.context = 'Local info' on tools."],
    correctAnswer: 2
  },
  {
    id: 33,
    question: "What is Flexbox in CSS?",
    options: ["A layout model", "A JavaScript library", "A color scheme", "A font family"],
    correctAnswer: 0
  },
  {
    id: 34,
    question: "Why use dynamic instructions?",
    options: ["To keep agent stiff for same answers.", "To change agent ways for different users.", "To store old instructions in records.", "To cut passes with set rules."],
    correctAnswer: 1
  },
  {
    id: 35,
    question: "What happens when tool_choice is required and no tool in list of tools",
    options: ["Error will be raised", "Agent will skip tool_choice = 'required' because there is no tool and work fine.", "Agent will create tool automatically and call it.", "None of above"],
    correctAnswer: 0
  },
  {
    id: 36,
    question: "Code: creative_agent = base_agent.clone(name='Creative', instructions='Be fun') What changes?",
    options: ["Only name, instructions stay from base.", "Name and instructions update, other parts from base.", "All parts copy new, no base agent.", "Tools add fun ones auto."],
    correctAnswer: 1
  },
  {
    id: 37,
    question: "Best practice for tools in clone?",
    options: ["Always share tools list to save space.", "Pass a new tools list to keep clone independent.", "Add tools after clone, no pass needed.", "Tools auto-copy without new list."],
    correctAnswer: 1
  },
  {
    id: 38,
    question: "Why do we need guardrails for cost reasons?",
    options: ["To make AI models cheaper by skipping some features.", "To share costs with users who use the agent less.", "To add free tools that lower the price of agent runs.", "To stop bad users from wasting money on wrong or too many uses."],
    correctAnswer: 3
  },
  {
    id: 39,
    question: "When do input guardrails run?",
    options: ["After the agent makes its full answer, to check the end.", "Parallel with the main agent starts.", "During the agent's middle steps, like tool calls only.", "At the end of a long chain, after all handoffs."],
    correctAnswer: 1
  },
  {
    id: 40,
    question: "In the sensitive info example, what happens if tripwire triggers?",
    options: ["The output goes to user with a warning note added.", "An exception blocks the response from reaching the user.", "The guardrail fixes the info and sends a clean version.", "It restarts the agent with new instructions to hide it."],
    correctAnswer: 1
  },
  {
    id: 41,
    question: "Why use input_filter in handoffs?",
    options: ["To add more history details for the next agent.", "To clean up noisy parts like old tool calls from history.", "To change the agent's instructions during filter.", "To run a callback on all past messages."],
    correctAnswer: 1
  },
  {
    id: 42,
    question: "When to use handoffs over agents-as-tools?",
    options: ["For quick one-step help where main agent stays in charge.", "For long talks where a specialist takes full control of the chat.", "For filtering history without any switch.", "For logging events without passing data."],
    correctAnswer: 1
  },
  {
    id: 43,
    question: "With structured output, what does the agent do first?",
    options: ["It guesses the fields from the input text.", "It adds extra fields that weren't asked for.", "It validates after the user checks the output.", "It knows the exact fields to fill from the schema."],
    correctAnswer: 3
  },
  {
    id: 44,
    question: "what is openAI Agents SDK?",
    options: ["A module", "A library", "A Framework", "A programming language for agents"],
    correctAnswer: 2
  },
  {
    id: 45,
    question: "Scenario: A customer service agent takes over a chat from a sales agent. What happens in the house analogy when the customer service agent starts handling the query?",
    options: ["A sensor in the kitchen activates once, signaling the agent is now cooking the response.", "A camera at the front door turns on once, showing the agent is entering to manage the task.", "A monitor in the study lights up multiple times, as the agent calls for AI advice repeatedly.", "A tool in the workshop buzzes multiple times, indicating tool uses during the handoff."],
    correctAnswer: 1
  },
  {
    id: 46,
    question: "In the factory worker analogy, what does on_start mean?",
    options: ["The worker clocks in and starts handling the assigned job.", "The worker calls a boss for advice on the next step.", "The worker puts away tools at the end of the day.", "The worker takes a break after finishing the shift."],
    correctAnswer: 0
  },
  {
    id: 47,
    question: "Code: async def on_llm_start(context, agent, system_prompt, input_items): print('AI call') What does this track?",
    options: ["The agent's full end of task with output shown.", "The tool use begin with the tool name listed.", "The handoff from one agent to the next one.", "The start of the agent asking the AI brain for thinking."],
    correctAnswer: 3
  },
  {
    id: 48,
    question: "In the lifecycle flow, what comes right after on_tool_start?",
    options: ["on_end to wrap up the full agent work.", "on_start to restart the agent turn.", "on_tool_end once the tool finishes its job.", "on_llm_end to get AI advice next."],
    correctAnswer: 2
  },
  {
    id: 49,
    question: "What is wrong with def on_start(self, context, agent): print('Start')?",
    options: ["It misses the tool and result params needed.", "It tries to return a value from the hook.", "t lacks 'async' so it won't run in the flow.", "It uses sync print instead of async log."],
    correctAnswer: 2
  },
  {
    id: 50,
    question: "What makes on_llm_start in run hooks different from agent hooks?",
    options: ["Run hooks see only one agent's LLM calls, agent hooks see all.", "Run hooks fire once per run, agent hooks many times per agent.", "Run hooks track LLM calls from every agent, agent hooks from one.", "Run hooks prompt AI, agent hooks just log calls."],
    correctAnswer: 2
  },
  {
    id: 51,
    question: "What does a trace represent in AI apps?",
    options: ["Just the final answer without any step details.", "A single tool call like a database search alone.", "The prompt text sent to the AI model only.", "The full path from user question to complete output with all runs."],
    correctAnswer: 3
  },
  {
    id: 52,
    question: "In setup, what is needed for tracing?",
    options: ["OpenAI API key and Agents SDK for dashboard views.", "Only Python without any async support.", "No API key, just the Agents SDK for local runs.", "Advanced tools but no platform access."],
    correctAnswer: 0
  },
  {
    id: 53,
    question: "Which Markdown syntax creates a bulleted list for SDK documentation?",
    options: ["- Item or * Item", "1. Item", "# Item", "> Item"],
    correctAnswer: 0
  },
  {
    id: 54,
    question: "How do you create a clickable image with a tooltip in Markdown for SDK docs?",
    options: ["[Img](url)", "<img src='img.png'>", "![Alt](img.png)", "[![Alt](img.png 'Tooltip')](url)>"],
    correctAnswer: 3
  },
  {
    id: 55,
    question: "What is the correct Markdown syntax for a numbered list in SDK tutorials?",
    options: ["1. Item", "- Item", "* Item", "# Item"],
    correctAnswer: 0
  },
  {
    id: 56,
    question: "How do you create a clickable link in Markdown?",
    options: ["[Run Agent](https://sdk.com/run)", "<link>Run Agent</link>", "{Run Agent}(url)", "url[Run Agent]"],
    correctAnswer: 0
  },
  {
    id: 57,
    question: "In Agent[UserContext], what does specifying a context type do?",
    options: ["It defines the shape or class of additional data passed into tools, handoffs, etc.", "It defines the shape or class of additional data passed into tools, handoffs, etc.", "It mandates that the agent must always serialize context to JSON before using it", "It changes the model’s internal token budget to include context type size"],
    correctAnswer: 0
  },
  {
    id: 58,
    question: "What is the effect of specifying output_type=SomeBaseModel on an agent?",
    options: ["The agent will always output instances of that BaseModel in every turn", "The model will convert all responses to JSON strings of that BaseModel", "The runner loop continues until the model responds with structured output matching the schema", "The agent ignores tool calls until it produces plain text matching the model schema"],
    correctAnswer: 2
  },
  {
    id: 59,
    question: "When are guardrails checked in the run loop?",
    options: ["Only after the run completes", "Before tool schema validation", "Simultaneously with tool execution", "After raw model output but before returning to user"],
    correctAnswer: 3
  },
  {
    id: 60,
    question: "What is passed along during a handoff?",
    options: ["Guardrail results only", "Conversation state ", "All tools output", "User input"],
    correctAnswer: 1
  },
  {
    id: 61,
    question: "If an agent fails to parse the output of a tool, what usually happens?",
    options: ["The SDK raises an immediate ToolOutputError", "The agent retries reasoning with the same tool call.", "The SDK drops the tool and forces the user to intervene.", "The agent continues reasoning, possibly re-calling the tool."],
    correctAnswer: 3
  },
  {
    id: 62,
    question: "How do you define an optional field in a Pydantic model for an agent’s output_type?",
    options: ["field: str = 'default'", "field: Optional[str] = None", "field: int", "field: str"],
    correctAnswer: 1
  },
  {
    id: 63,
    question: "In Pydantic, what happens with invalid data in: class Resp(BaseModel): age: int if age="20"?",
    options: ["Converts to int", "Ignores the field", "Raises ValidationError", "Logs warning"],
    correctAnswer: 1
  },
  {
    id: 64,
    question: "What is the role output guardrails?",
    options: ["Validate user input", "Validate final output", "Validate tool output", "Validate llm response"],
    correctAnswer: 1
  },
  {
    id: 65,
    question: "What does this code do in the 2025 OpenAI Agents SDK: agent = Agent(model='gpt-4.1', instructions='Handle query')?",
    options: ["Creates an agent with LLM and instructions", "Trains a new model", "Logs errors only", "Connects to database"],
    correctAnswer: 0
  }
];
