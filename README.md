Travlr Getaways – Full Stack Web Application
Architecture

In this project, I developed both the customer-facing website and the administrative single-page application (SPA) using the MEAN stack: MongoDB, Express, Angular, and Node.js. The customer side was built using Express and traditional HTML templates rendered on the server side with Handlebars, allowing for static pages and basic dynamic content injection. In contrast, the administrative SPA built in Angular provided a far richer and more interactive user experience. The SPA allowed for dynamic content updates without full page reloads, leveraging Angular’s component-based structure and two-way data binding to create a seamless experience for managing trip data.

The backend used a NoSQL MongoDB database because it provides flexibility in storing unstructured data, such as trip details with varying fields. MongoDB’s document-oriented model allowed for quick iteration during development and smooth integration with the Express API using Mongoose. This made it easy to model and manage data without needing the rigid schemas required by relational databases. The use of MongoDB also aligned well with JavaScript and JSON-based data structures, simplifying communication between the frontend and backend.

Functionality

JSON (JavaScript Object Notation) is different from JavaScript in that JSON is purely a data format, while JavaScript is a full programming language. JSON serves as the bridge between the frontend and backend — it structures the data exchanged through HTTP requests and responses in a lightweight, human-readable format. For example, when the Angular SPA sends a request to the Express API to retrieve or update a trip, the data is serialized as JSON. The backend processes the request, interacts with MongoDB, and returns the data as JSON back to the frontend for rendering.

Throughout the full stack process, I refactored several parts of the code to improve maintainability and efficiency. Early versions of the project used repeated code for loading trip data, but I later consolidated that logic into shared service files in Angular to make API calls reusable across multiple components. Similarly, Express route handlers were refactored to use asynchronous functions for cleaner and more reliable database communication. Reusable UI components in Angular, such as the Trip Card and Trip Listing components, provided consistency and modularity — making it easier to maintain the code and add new features without rewriting existing logic.

Testing

Testing the full stack application required verifying both API endpoints and frontend integration. Each API endpoint—such as GET, POST, PUT, and DELETE—was tested to ensure proper request and response behavior between the client and server. For example, GET requests retrieved trip data from MongoDB, while PUT requests updated trip entries in the admin interface. Adding security features for admin authentication introduced additional testing requirements, as I had to verify that only authenticated users could access protected routes.

I gained a strong understanding of how methods and endpoints work together in a secure web application. HTTP methods (GET, POST, PUT, DELETE) define the type of CRUD operation, while endpoints define where these operations occur (for example, /api/trips or /api/login). Security measures, such as JSON Web Tokens (JWT) and password hashing, ensured that sensitive actions like trip modification were only accessible to verified admin users. This provided a realistic simulation of production-grade web security practices.

Reflection

This course has been a significant step toward my professional goals in full stack and security-focused software development. Through this project, I strengthened my skills in backend API design, frontend SPA development, and database integration — all essential competencies in modern web development. I also developed a deeper understanding of RESTful design principles, state management, and secure authentication workflows.

By completing this project, I learned how to connect every layer of the MEAN stack into a functional, secure web application. I also improved my debugging, refactoring, and testing abilities, which are key to professional software engineering. These skills make me more marketable in the field, especially for roles involving full stack development, DevSecOps, or software systems integration. The project gave me hands-on experience with scalable architecture and modern frameworks that mirror real-world industry standards.

Authored by: Zac Harrington
Date: October 26, 2025
