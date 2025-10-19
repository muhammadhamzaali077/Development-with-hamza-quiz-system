export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "Which CSS property is used to change the text color?",
    options: ["text-color", "font-color", "color", "text-style"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "What is the correct syntax for referring to an external JavaScript file?",
    options: ["<script href='app.js'>", "<script name='app.js'>", "<script src='app.js'>", "<script file='app.js'>"],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<style>", "<css>", "<script>", "<link>"],
    correctAnswer: 0
  },
  {
    id: 5,
    question: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "Which JavaScript keyword is used to declare a variable?",
    options: ["var", "variable", "v", "declare"],
    correctAnswer: 0
  },
  {
    id: 7,
    question: "What is the correct HTML element for the largest heading?",
    options: ["<heading>", "<h6>", "<h1>", "<head>"],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "Which property is used to change the background color in CSS?",
    options: ["bgcolor", "background-color", "color", "bg-color"],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "What is React?",
    options: ["A database", "A JavaScript library", "A programming language", "An operating system"],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "Which operator is used to assign a value to a variable in JavaScript?",
    options: ["*", "=", "-", "x"],
    correctAnswer: 1
  },
  {
    id: 11,
    question: "What does API stand for?",
    options: ["Application Programming Interface", "Advanced Programming Interface", "Application Process Integration", "Advanced Process Interface"],
    correctAnswer: 0
  },
  {
    id: 12,
    question: "Which HTML attribute specifies an alternate text for an image?",
    options: ["title", "alt", "src", "longdesc"],
    correctAnswer: 1
  },
  {
    id: 13,
    question: "What is the purpose of the 'const' keyword in JavaScript?",
    options: ["To declare a constant variable", "To declare a function", "To create a class", "To import modules"],
    correctAnswer: 0
  },
  {
    id: 14,
    question: "Which CSS property controls the text size?",
    options: ["text-size", "font-style", "text-style", "font-size"],
    correctAnswer: 3
  },
  {
    id: 15,
    question: "What is Git?",
    options: ["A programming language", "A version control system", "A database", "A web framework"],
    correctAnswer: 1
  },
  {
    id: 16,
    question: "Which method is used to add an element at the end of an array in JavaScript?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: 0
  },
  {
    id: 17,
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Simple Question Language", "Structured Question Language", "Simple Query Language"],
    correctAnswer: 0
  },
  {
    id: 18,
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<hyperlink>"],
    correctAnswer: 1
  },
  {
    id: 19,
    question: "What is TypeScript?",
    options: ["A JavaScript runtime", "A superset of JavaScript", "A CSS framework", "A database"],
    correctAnswer: 1
  },
  {
    id: 20,
    question: "Which CSS property is used to make text bold?",
    options: ["font-weight", "text-bold", "bold", "font-style"],
    correctAnswer: 0
  },
  {
    id: 21,
    question: "What is Node.js?",
    options: ["A JavaScript framework", "A JavaScript runtime", "A database", "A CSS preprocessor"],
    correctAnswer: 1
  },
  {
    id: 22,
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["//", "/*", "#", "<!--"],
    correctAnswer: 0
  },
  {
    id: 23,
    question: "What does JSON stand for?",
    options: ["JavaScript Object Notation", "Java Source Object Notation", "JavaScript Oriented Notation", "Java Standard Object Notation"],
    correctAnswer: 0
  },
  {
    id: 24,
    question: "Which HTML tag is used to define an unordered list?",
    options: ["<ol>", "<ul>", "<list>", "<li>"],
    correctAnswer: 1
  },
  {
    id: 25,
    question: "What is Bootstrap?",
    options: ["A JavaScript library", "A CSS framework", "A database", "A programming language"],
    correctAnswer: 1
  },
  {
    id: 26,
    question: "Which JavaScript method is used to select an element by its ID?",
    options: ["getElement()", "getElementById()", "selectElement()", "findById()"],
    correctAnswer: 1
  },
  {
    id: 27,
    question: "What is the purpose of the <head> tag in HTML?",
    options: ["To display the main content", "To contain metadata", "To create headings", "To define the footer"],
    correctAnswer: 1
  },
  {
    id: 28,
    question: "Which CSS display property removes an element from the document flow?",
    options: ["display: none", "visibility: hidden", "opacity: 0", "display: hidden"],
    correctAnswer: 0
  },
  {
    id: 29,
    question: "What is npm?",
    options: ["A programming language", "A package manager", "A database", "A web framework"],
    correctAnswer: 1
  },
  {
    id: 30,
    question: "Which JavaScript method converts a string to an integer?",
    options: ["parseInt()", "toInteger()", "int()", "parseNumber()"],
    correctAnswer: 0
  },
  {
    id: 31,
    question: "What is the purpose of media queries in CSS?",
    options: ["To style videos", "To create responsive designs", "To optimize images", "To manage databases"],
    correctAnswer: 1
  },
  {
    id: 32,
    question: "Which HTTP method is used to send data to a server?",
    options: ["GET", "POST", "DELETE", "PUT"],
    correctAnswer: 1
  },
  {
    id: 33,
    question: "What is Flexbox in CSS?",
    options: ["A layout model", "A JavaScript library", "A color scheme", "A font family"],
    correctAnswer: 0
  },
  {
    id: 34,
    question: "Which JavaScript function is used to parse JSON data?",
    options: ["JSON.parse()", "JSON.stringify()", "parseJSON()", "convertJSON()"],
    correctAnswer: 0
  },
  {
    id: 35,
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Model", "Digital Object Model", "Document Orientation Model"],
    correctAnswer: 0
  },
  {
    id: 36,
    question: "Which CSS property is used for spacing between elements?",
    options: ["spacing", "margin", "padding", "Both margin and padding"],
    correctAnswer: 3
  },
  {
    id: 37,
    question: "What is the purpose of async/await in JavaScript?",
    options: ["To handle asynchronous operations", "To create loops", "To define variables", "To style elements"],
    correctAnswer: 0
  },
  {
    id: 38,
    question: "Which HTML5 element is used for navigation links?",
    options: ["<navigation>", "<nav>", "<menu>", "<links>"],
    correctAnswer: 1
  },
  {
    id: 39,
    question: "What is Sass?",
    options: ["A JavaScript framework", "A CSS preprocessor", "A database", "A testing tool"],
    correctAnswer: 1
  },
  {
    id: 40,
    question: "Which method is used to remove the last element from an array?",
    options: ["pop()", "push()", "shift()", "slice()"],
    correctAnswer: 0
  },
  {
    id: 41,
    question: "What is the purpose of the z-index property in CSS?",
    options: ["To control stacking order", "To set font size", "To change colors", "To add animations"],
    correctAnswer: 0
  },
  {
    id: 42,
    question: "Which JavaScript keyword is used to create a function?",
    options: ["function", "func", "def", "method"],
    correctAnswer: 0
  },
  {
    id: 43,
    question: "What is MongoDB?",
    options: ["A SQL database", "A NoSQL database", "A programming language", "A web framework"],
    correctAnswer: 1
  },
  {
    id: 44,
    question: "Which CSS property is used to create rounded corners?",
    options: ["corner-radius", "border-radius", "round-corner", "border-round"],
    correctAnswer: 1
  },
  {
    id: 45,
    question: "What is the purpose of the 'use strict' directive in JavaScript?",
    options: ["To enable strict mode", "To import modules", "To declare variables", "To create classes"],
    correctAnswer: 0
  },
  {
    id: 46,
    question: "Which HTML attribute makes an input field required?",
    options: ["mandatory", "required", "validate", "must-fill"],
    correctAnswer: 1
  },
  {
    id: 47,
    question: "What is Redux?",
    options: ["A database", "A state management library", "A CSS framework", "A testing tool"],
    correctAnswer: 1
  },
  {
    id: 48,
    question: "Which CSS property controls the space inside an element?",
    options: ["margin", "padding", "spacing", "inner-space"],
    correctAnswer: 1
  },
  {
    id: 49,
    question: "What is the purpose of the 'this' keyword in JavaScript?",
    options: ["To refer to the current object", "To create variables", "To import modules", "To define functions"],
    correctAnswer: 0
  },
  {
    id: 50,
    question: "Which HTTP status code indicates a successful request?",
    options: ["404", "500", "200", "301"],
    correctAnswer: 2
  },
  {
    id: 51,
    question: "What is Webpack?",
    options: ["A module bundler", "A database", "A CSS framework", "A testing tool"],
    correctAnswer: 0
  },
  {
    id: 52,
    question: "Which CSS property is used to change the font?",
    options: ["font-style", "font-family", "font-type", "text-font"],
    correctAnswer: 1
  },
  {
    id: 53,
    question: "What is the purpose of localStorage in JavaScript?",
    options: ["To store data in the browser", "To create animations", "To style elements", "To make HTTP requests"],
    correctAnswer: 0
  },
  {
    id: 54,
    question: "Which HTML tag is used to embed a video?",
    options: ["<video>", "<media>", "<movie>", "<embed>"],
    correctAnswer: 0
  },
  {
    id: 55,
    question: "What is Tailwind CSS?",
    options: ["A JavaScript library", "A utility-first CSS framework", "A database", "A testing tool"],
    correctAnswer: 1
  },
  {
    id: 56,
    question: "Which JavaScript operator is used for strict equality?",
    options: ["==", "===", "=", "!="],
    correctAnswer: 1
  },
  {
    id: 57,
    question: "What is the purpose of the viewport meta tag?",
    options: ["To control page scaling on mobile devices", "To set page title", "To import CSS", "To create animations"],
    correctAnswer: 0
  },
  {
    id: 58,
    question: "Which CSS property is used to create animations?",
    options: ["animation", "transition", "transform", "All of the above"],
    correctAnswer: 3
  },
  {
    id: 59,
    question: "What is Express.js?",
    options: ["A CSS framework", "A Node.js web framework", "A database", "A testing tool"],
    correctAnswer: 1
  },
  {
    id: 60,
    question: "Which method is used to convert a JavaScript object to a JSON string?",
    options: ["JSON.parse()", "JSON.stringify()", "toString()", "toJSON()"],
    correctAnswer: 1
  },
  {
    id: 61,
    question: "What is the purpose of CSS Grid?",
    options: ["To create table layouts", "To create two-dimensional layouts", "To add animations", "To manage colors"],
    correctAnswer: 1
  },
  {
    id: 62,
    question: "Which JavaScript method is used to find an element in an array?",
    options: ["find()", "search()", "locate()", "get()"],
    correctAnswer: 0
  },
  {
    id: 63,
    question: "What is REST API?",
    options: ["A programming language", "An architectural style for web services", "A database", "A CSS framework"],
    correctAnswer: 1
  },
  {
    id: 64,
    question: "Which HTML tag is used to create a table row?",
    options: ["<row>", "<tr>", "<td>", "<table-row>"],
    correctAnswer: 1
  },
  {
    id: 65,
    question: "What is the purpose of Babel?",
    options: ["To compile modern JavaScript", "To style web pages", "To manage databases", "To test code"],
    correctAnswer: 0
  }
];
