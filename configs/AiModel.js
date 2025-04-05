// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
console.log("🚀 AiModel.js is loaded!");

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};
const generationConfig2 = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const courseOutline = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "generate a study material for python for exam and  level of difficulty will be easy with summary of course list of chapter along with summary for each chapter topic list in each chapter , all result in  JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: 'html{ "course_title": "Python for Beginners: Exam Prep (Easy Level)",\n  "course_description": "This course provides a fundamental introduction to Python programming, focusing on concepts suitable for beginners. It covers basic syntax, data types, control flow, functions, and basic data structures. This study material is designed to help you prepare for an introductory-level Python exam.",\n  "level": "Easy",\n  "chapters": [\n    {\n      "chapter_number": 1,\n      "chapter_title": "Introduction to Python",\n      "chapter_summary": "This chapter introduces the core concepts of Python, including what Python is, its uses, how to install it, and basic syntax rules.  It emphasizes getting the environment set up and understanding the basic structure of a Python program.",\n      "topics": [\n        {\n          "topic_title": "What is Python?",\n          "topic_description": "Definition, history, and uses of Python.  Why learn Python?",\n          "keywords": ["definition", "history", "applications", "interpreted", "high-level"]\n        },\n        {\n          "topic_title": "Installing Python and IDE Setup",\n          "topic_description": "Step-by-step guide to installing Python and setting up a basic Integrated Development Environment (IDE) like IDLE or VS Code.",\n          "keywords": ["installation", "download", "IDLE", "VS Code", "environment setup"]\n        },\n        {\n          "topic_title": "Basic Syntax",\n          "topic_description": "Understanding Python\'s basic syntax rules, including indentation, comments, and statements.",\n          "keywords": ["indentation", "comments", "statements", "syntax rules"]\n        },\n        {\n          "topic_title": "First Program: Hello, World!",\n          "topic_description": "Writing and running a simple \\"Hello, World!\\" program.",\n          "keywords": ["print()", "strings", "execution", "hello world"]\n        }\n      ]\n    },\n    {\n      "chapter_number": 2,\n      "chapter_title": "Data Types and Variables",\n      "chapter_summary": "This chapter covers Python\'s fundamental data types, like integers, floats, strings, and booleans. It also explains how to declare and use variables to store and manipulate data.",\n      "topics": [\n        {\n          "topic_title": "Data Types (Integers, Floats, Strings, Booleans)",\n          "topic_description": "Introduction to different data types in Python.",\n          "keywords": ["int", "float", "str", "bool", "data types"]\n        },\n        {\n          "topic_title": "Variables",\n          "topic_description": "Declaring and assigning values to variables.",\n          "keywords": ["variable declaration", "assignment", "variable names", "naming conventions"]\n        },\n        {\n          "topic_title": "Type Conversion",\n          "topic_description": "Converting between different data types using functions like `int()`, `float()`, and `str()`.",\n          "keywords": ["type casting", "int()", "float()", "str()", "conversion"]\n        },\n        {\n          "topic_title": "Basic Operators (Arithmetic, Assignment)",\n          "topic_description": "Understanding arithmetic operators (+, -, *, /, %), assignment operators (=, +=, -=, etc.)",\n          "keywords": ["arithmetic operators", "+", "-", "*", "/", "%", "assignment operators", "=", "+=", "-="]\n        }\n      ]\n    },\n    {\n      "chapter_number": 3,\n      "chapter_title": "Control Flow Statements",\n      "chapter_summary": "This chapter introduces control flow statements like `if`, `else`, `elif` (conditional statements) and `for` and `while` loops for controlling the execution flow of a program.",\n      "topics": [\n        {\n          "topic_title": "Conditional Statements (if, else, elif)",\n          "topic_description": "Using `if`, `else`, and `elif` to make decisions in your code based on conditions.",\n          "keywords": ["if", "else", "elif", "conditional statements", "boolean expressions"]\n        },\n        {\n          "topic_title": "For Loops",\n          "topic_description": "Iterating over sequences (like strings, lists, and ranges) using `for` loops.",\n          "keywords": ["for loop", "iteration", "sequences", "range()", "iterating"]\n        },\n        {\n          "topic_title": "While Loops",\n          "topic_description": "Executing a block of code repeatedly as long as a condition is true using `while` loops.",\n          "keywords": ["while loop", "condition", "iteration", "loop control", "break", "continue"]\n        },\n        {\n          "topic_title": "Break and Continue Statements",\n          "topic_description": "Using \'break\' to exit a loop prematurely and \'continue\' to skip to the next iteration.",\n          "keywords": ["break", "continue", "loop control"]\n        }\n      ]\n    },\n    {\n      "chapter_number": 4,\n      "chapter_title": "Functions",\n      "chapter_summary": "This chapter explains how to define and use functions to organize code into reusable blocks. It covers function arguments, return values, and scope.",\n      "topics": [\n        {\n          "topic_title": "Defining Functions",\n          "topic_description": "Creating functions using the `def` keyword.",\n          "keywords": ["def", "function definition", "function name", "parameters"]\n        },\n        {\n          "topic_title": "Calling Functions",\n          "topic_description": "Executing functions that you have defined.",\n          "keywords": ["function call", "arguments", "execution"]\n        },\n        {\n          "topic_title": "Function Arguments",\n          "topic_description": "Passing data to functions using arguments (positional, keyword).",\n          "keywords": ["arguments", "parameters", "positional arguments", "keyword arguments"]\n        },\n        {\n          "topic_title": "Return Values",\n          "topic_description": "Returning values from functions using the `return` statement.",\n          "keywords": ["return", "return value", "function output"]\n        },\n        {\n          "topic_title": "Scope of Variables (Local vs. Global)",\n          "topic_description": "Understanding the scope of variables defined inside and outside functions.",\n          "keywords": ["scope", "local variables", "global variables"]\n        }\n      ]\n    },\n    {\n      "chapter_number": 5,\n      "chapter_title": "Basic Data Structures: Lists and Strings",\n      "chapter_summary": "This chapter introduces lists and strings as fundamental data structures. It covers operations such as creating, accessing, modifying, and iterating over them.",\n      "topics": [\n        {\n          "topic_title": "Lists",\n          "topic_description": "Creating lists, accessing elements, modifying lists, and basic list methods.",\n          "keywords": ["lists", "creating lists", "indexing", "slicing", "append()", "insert()", "remove()", "len()"]\n        },\n        {\n          "topic_title": "Strings",\n          "topic_description": "Creating strings, accessing characters, string methods (e.g., `upper()`, `lower()`, `find()`, `replace()`).",\n          "keywords": ["strings", "creating strings", "indexing", "slicing", "string methods", "upper()", "lower()", "find()", "replace()", "string concatenation"]\n        },\n        {\n          "topic_title": "List Comprehensions (Introduction)",\n          "topic_description": "A brief overview of list comprehensions for creating lists concisely (optional, depending on the beginner level).",\n          "keywords":["list comprehensions", "concise lists", "creating list", "one-line operations"]\n        }\n      ]\n    }\n  ],\n  "exam_tips": [\n    "Practice writing small programs to reinforce concepts.",\n    "Pay attention to syntax, especially indentation.",\n    "Understand the difference between data types and how to convert between them.",\n    "Be able to trace the execution of code with conditional statements and loops.",\n    "Review the common string and list methods.",\n    "Work through example problems and past exam questions (if available)."\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

 export const generateNotesAiModel = model.startChat({
  generationConfig2,
  history: [
    {
      role: "user",
      parts: [
        {text: "generate exam material for each chapter, make sure to includes all topics point in the content make sure to give content in HTML format( do not add HTMLK, head, body, title tag), The chapters :  {chapter_number: 1,chapter_title: Introduction to C Programming,chapter_summary: This chapter introduces the basics of C programming, including its history, features, and structure of a C program. It also covers the compilation and execution process.,topics: [{topic_title: History and Features of C,topic_description: Brief overview of the history of C and its key features. ,keywords : [Dennis Ritchie ,Bell Labs,portability,efficiency,structured programming] },"},
      ],
    },
    {
      role: "model",
      parts: [
        {text:"<h1>Chapter 1: Introduction to C Programming - Exam</h1><h2>Multiple Choice Questions</h2><ol><li> Who is credited with the creation of the C programming language? <ol type=<li><input type=\"radio\" name=\"q1\" value=\"a\"> Guido van Rossum</li> <li><input type=\"radio\" name=\"q1\" value=\"b\"> James Gosling</li> <li><input type=\"radio\" name=\"q1\" value=\"c\"> Dennis Ritchie</li> <li><input type=\"radio\" name=\"q1\" value=\"d\"> Bjarne Stroustrup</li></ol></li> <li> Where was the C programming language developed? <ol type=\"a\"><li><input type=\"radio\" name=\"q2\" value=\"a\"> Microsoft</li><li><input type=\"radio\" name=\"q2\" value=\"b\"> Bell Labs</li><li><input type=\"radio\" name=\"q2\" value=\"c\"> Apple</li> <li><input type=\"radio\" name=\"q2\" value=\"d\"> Google</li></ol></li><li> Which of the following is a key feature of the C programming language? <ol type=\"a\"><li><input type=\"radio\" name=\"q3\" value=\"a\"> Platform dependence</li><li><input type=\"radio\" name=\"q3\" value=\"b\"> Low efficiency</li> <li><input type=\"radio\" name=\"q3\" value=\"c\"> Portability</li><li><input type=\"radio\" name=\"q3\" value=\"d\"> Limited memory management</li></ol></li><li>C is known for being a _ programming language.<ol type=\"a\"><li><input type=\"radio\" name=\"q4\" value=\"a\"> Object-oriented</li> <li><input type=\"radio\" name=\"q4\" value=\"b\"> Functional</li><li><input type=\"radio\" name=\"q4\" value=\"c\"> Structured</li><li><input type=\"radio\" name=\"q4\" value=\"d\"> Logical</li> </ol></li><li>  Which of the following is NOT a key characteristic of C programs?<ol type=\"a\"><li><input type=\"radio\" name=\"q5\" value=''> Modularity</li><li><input type=\"radio\" name=\"q5\" > Simplicity</li> <li><input type=\"radio\" name=\"q5\" value=\"c\"> Automatic garbage collection</li><li><input type=\"radio\" name=\"q5\" value=\"d\"> System Programming capabilities</li></ol></li>\n</ol>\n\n<h2>True/False Questions</h2>\n\n<ol><li>True or False: C is a high-level programming language.<input type=\"radio\" name=\"tf1\" value=\"true\"> True<input type=\"radio\" name=\"tf1\" value=\"false\"> False</li><li>True or False:  The compilation process converts source code into machine code directly executable by the computer. <input type=\"radio\" name=\"tf2\" value=\"true\"> True <input type=\"radio\" name=\"tf2\" value=\"false\"> False </li> <li>  True or False: Portability means that a C program can be easily adapted to run on different operating systems.<input type=\"radio\" name=\"tf3\" value=\"true\"> True <input type=\"radio\" name=\"tf3\" value=\"false\"> False </li> <li>  True or False:  The linker combines object code with library functions to create an executable file.<input type=\"radio\" name=\"tf4\" value=\"true\"> True <input type=\"radio\" name=\"tf4\" value=\"false\"> False</li><li>True or False:  C programs are always compiled and executed in a single step. <input type=\"radio\" name=\"tf5\" value=\"true\"> True <input type=\"radio\" name=\"tf5\" value=\"false\"> False </li>\n</ol>\n\n<h2>Fill in the Blanks</h2>\n\n<ol> <li>C was originally developed at_.</li> <li> is a key feature of C, allowing programs to run on different platforms with minimal changes.</li><li>The process of converting source code to machine code is called .</li> <li>The stage combines the object code with necessary library functions.</li> <li>A typical C program consists of sections like , function definitions, and the main function.</li></ol><h2>Short Answer Questions</h2><ol> <li> Explain the importance of portability in C programming.</li><li> Describe the general structure of a basic C program.</li><li>What are the main steps involved in compiling and executing a C program?</li><li> What are some advantages of using C over other programming languages?\n    </li>\n    <li> Explain the difference between source code, object code, and executable code.</li>\n</ol>"},
      ],
    },
  ],
});

 export const GenerateStudyTypeContentAimodel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Generate the flashcard on topic : Flutter Fundamentals, User interface (UI) Development, Basic App Navigation in JSON format with front back content , Maximum 15"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "Here's my thinking process for generating the Flutter Fundamentals flashcards in JSON format:\n\n1.  **Understand the Request:**\n    *   **Topic:** Flutter Fundamentals, UI Development, Basic App Navigation.\n    *   **Format:** JSON.\n    *   **Content Structure:** Each item should have a `front` (question/term) and a `back` (answer/definition).\n    *   **Constraint:** Maximum 15 flashcards.\n\n2.  **Break Down the Topics:**\n    *   **Flutter Fundamentals:** This is broad. Key concepts include:\n        *   What is Flutter?\n        *   What is Dart?\n        *   What is a Widget?\n        *   Stateless vs. Stateful Widgets.\n        *   `main()` function and `runApp()`.\n        *   Hot Reload/Hot Restart.\n        *   Build context.\n    *   **User Interface (UI) Development:** This involves building the visual part. Key concepts include:\n        *   Common layout widgets (Row, Column, Stack, Container).\n        *   Common UI widgets (Text, Image, Icon, Button).\n        *   Styling (TextStyle, ThemeData).\n        *   Scaffold widget.\n        *   AppBar.\n        *   Handling user input (e.g., `onPressed`).\n    *   **Basic App Navigation:** Moving between screens. Key concepts include:\n        *   `Navigator`.\n        *   `MaterialPageRoute`.\n        *   `Navigator.push()`.\n        *   `Navigator.pop()`.\n        *   Routes (named vs. anonymous).\n\n3.  **Brainstorm Flashcard Ideas (Mixing Topics):**\n    *   What is Flutter? -> Google's UI toolkit...\n    *   What language does Flutter use? -> Dart.\n    *   What is the basic building block in Flutter UI? -> Widget.\n    *   Difference between Stateless and Stateful Widgets? -> State management.\n    *   What's the function to start a Flutter app? -> `runApp()`.\n    *   What does Hot Reload do? -> Injects code without losing state.\n    *   What's a common widget for basic app structure (app bar, body)? -> `Scaffold`.\n    *   How do you arrange widgets horizontally? -> `Row`.\n    *   How do you arrange widgets vertically? -> `Column`.\n    *   How do you display text? -> `Text` widget.\n    *   How do you create a clickable button? -> `ElevatedButton`, `TextButton`, etc. (Need `onPressed`).\n    *   How do you navigate to a new screen? -> `Navigator.push()`.\n    *   How do you go back to the previous screen? -> `Navigator.pop()`.\n    *   What class is often used with `Navigator.push` to define the new screen? -> `MaterialPageRoute`.\n    *   What is `BuildContext`? -> Location in the widget tree.\n    *   How do you add padding or margin? -> `Padding` widget or `Container`'s `padding`/`margin`. (Let's stick to `Container` for simplicity or `Padding` widget).\n    *   What widget overlays children? -> `Stack`.\n    *   How to display an image? -> `Image.asset()` or `Image.network()`.\n    *   What's the top bar in a `Scaffold` called? -> `AppBar`.\n\n4.  **Select and Refine (Targeting ~15):** Review the brainstormed list, combine similar ideas, prioritize fundamental concepts, and ensure coverage across the three specified areas. Aim for clear, concise questions and answers.\n\n    *   Q: What is Flutter? A: Google's UI toolkit... (Keep)\n    *   Q: Language for Flutter? A: Dart. (Keep)\n    *   Q: Basic building block? A: Widget. (Keep)\n    *   Q: Stateless vs. Stateful? A: Immutable vs. Mutable state. (Keep)\n    *   Q: Starting function? A: `runApp()`. (Keep)\n    *   Q: Hot Reload vs Hot Restart? A: State preserved vs. State lost. (Good distinction) (Keep)\n    *   Q: Basic app structure widget? A: `Scaffold`. (Keep)\n    *   Q: Horizontal layout? A: `Row`. (Keep)\n    *   Q: Vertical layout? A: `Column`. (Keep)\n    *   Q: Display text? A: `Text` widget. (Keep)\n    *   Q: Clickable button? A: E.g., `ElevatedButton` with `onPressed`. (Keep)\n    *   Q: Go to new screen? A: `Navigator.push()`. (Keep)\n    *   Q: Go back? A: `Navigator.pop()`. (Keep)\n    *   Q: Route definition for push? A: `MaterialPageRoute`. (Keep)\n    *   Q: What is `BuildContext`? A: Handle to widget's location. (Keep)\n    *   *Adding one more:*\n    *   Q: Widget for padding/margin/color? A: `Container`. (Useful UI widget)\n\n5.  **Format as JSON:** Structure the selected Q&A pairs into the required JSON format: an array `[]` containing objects `{}`, each with `\"front\"` and `\"back\"` keys.\n\n    ```json\n    [\n      {\n        \"front\": \"What is Flutter?\",\n        \"back\": \"An open-source UI toolkit by Google for building natively compiled applications for mobile, web, and desktop from a single codebase.\"\n      },\n      {\n        \"front\": \"What programming language does Flutter use?\",\n        \"back\": \"Dart, an object-oriented language also developed by Google.\"\n      },\n      // ... continue for all selected cards\n    ]\n    ```\n\n6.  **Review and Verify:**\n    *   **Count:** Check if the number of cards is <= 15. (Currently 16, need to remove or combine one. Let's remove the `BuildContext` one as it's slightly more advanced than the others for *basic* fundamentals). Now 15. Perfect.\n    *   **Format:** Ensure valid JSON structure (commas between objects, quotes around keys and string values).\n    *   **Content:** Confirm accuracy and clarity of front/back text. Ensure topics (Fundamentals, UI, Navigation) are covered.\n    *   **Clarity:** Are the questions clear? Are the answers concise and correct? Yes.\n\n7.  **Final JSON Output:** Generate the final JSON string based on the refined list and structure."},
        {text: "```json\n[\n  {\n    \"front\": \"What is Flutter?\",\n    \"back\": \"An open-source UI software development kit created by Google for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.\"\n  },\n  {\n    \"front\": \"What programming language does Flutter use?\",\n    \"back\": \"Dart, an object-oriented, class-based, garbage-collected language with C-style syntax.\"\n  },\n  {\n    \"front\": \"What is the fundamental building block of a Flutter UI?\",\n    \"back\": \"Widget. Everything in Flutter is a widget, from structural elements (like Button, Text) to layout elements (like Row, Column) and even padding.\"\n  },\n  {\n    \"front\": \"Difference between StatelessWidget and StatefulWidget?\",\n    \"back\": \"StatelessWidget describes a part of the UI which depends only on its configuration (immutable). StatefulWidget can change its appearance in response to events or data changes (mutable state).\"\n  },\n  {\n    \"front\": \"What is the purpose of the `build` method in a widget?\",\n    \"back\": \"It describes the part of the user interface represented by the widget, returning a widget tree that Flutter renders.\"\n  },\n  {\n    \"front\": \"What is the main entry point function for a Flutter app?\",\n    \"back\": \"`void main() { runApp(MyApp()); }`, where `runApp()` inflates the given widget and attaches it to the screen.\"\n  },\n  {\n    \"front\": \"What does 'Hot Reload' do in Flutter?\",\n    \"back\": \"Injects updated source code files into the running Dart Virtual Machine (VM), allowing quick UI updates without losing application state.\"\n  },\n  {\n    \"front\": \"Name a common widget used for basic Material Design visual layout structure.\",\n    \"back\": \"`Scaffold`. It provides APIs for showing drawers, snack bars, bottom sheets, and typically includes an `AppBar` and a `body`.\"\n  },\n  {\n    \"front\": \"How do you arrange widgets vertically?\",\n    \"back\": \"Using the `Column` widget. It takes a list of `children` widgets.\"\n  },\n  {\n    \"front\": \"How do you arrange widgets horizontally?\",\n    \"back\": \"Using the `Row` widget. It also takes a list of `children` widgets.\"\n  },\n  {\n    \"front\": \"Which widget is commonly used to display text?\",\n    \"back\": \"The `Text` widget. Example: `Text('Hello, Flutter!')`\"\n  },\n  {\n    \"front\": \"How do you add padding around a widget?\",\n    \"back\": \"Wrap the widget with the `Padding` widget and specify the `padding` property (e.g., `EdgeInsets.all(8.0)`).\"\n  },\n  {\n    \"front\": \"How do you navigate to a new screen (route) in Flutter?\",\n    \"back\": \"Using `Navigator.push(context, MaterialPageRoute(builder: (context) => NewScreen()));`\"\n  },\n  {\n    \"front\": \"How do you return to the previous screen (route)?\",\n    \"back\": \"Using `Navigator.pop(context);`\"\n  },\n  {\n    \"front\": \"What widget provides a standard application top bar?\",\n    \"back\": \"`AppBar`, typically used within the `appBar` property of a `Scaffold` widget.\"\n  }\n]\n```"},
      ],
    },
  ],
});
