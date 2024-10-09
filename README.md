# ToolShare-Tool-Rental-Service

ToolShare is a web application for managing tool rentals. Whether you’re a DIY enthusiast or a professional contractor, ToolShare allows users to browse, rent, and return tools from a wide selection of equipment categories. Built with Node.js, Express, and MongoDB, ToolShare provides a scalable and efficient backend solution for managing rental services.

Features
Tool Catalog: Browse and search through a wide variety of tools (e.g., drills, saws, gardening equipment) categorized for easy access.
User Management: Users can sign up, log in, and manage their tool rental history.
Rental Management: CRUD operations for renting and returning tools.
Category Management: Tools are organized into categories such as power tools, hand tools, gardening tools, etc.
Availability Tracking: Tools' availability is tracked in real-time, showing users whether a tool is currently rented or available.
RESTful API: The backend exposes a REST API for interacting with tools, users, and rental data.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/ToolShare.git
cd ToolShare
Install dependencies:

bash
Copy code
npm install
Set up environment variables: Create a .env file in the project root and add the following variables:

makefile
Copy code
PORT=your_port
MONGODB_URI=your_mongodb_uri
JWT_PRIVATE_KEY=your_jwt_key
Run the application:

bash
Copy code
npm start
The app will be running at http://localhost:3000.

API Endpoints
Tools
GET /api/tools: Retrieve all tools.
POST /api/tools: Add a new tool (admin only).
PUT /api/tools/:id: Update an existing tool (admin only).
DELETE /api/tools/:id: Remove a tool from the catalog (admin only).
Rentals
POST /api/rentals: Rent a tool (requires user authentication).
PUT /api/rentals/:id: Return a rented tool.
GET /api/rentals: View current rentals for a logged-in user.
Authentication
POST /api/users: Register a new user.
POST /api/auth: Log in to retrieve a JWT token.
Technologies Used
Node.js: Backend runtime.
Express.js: Web framework.
MongoDB: NoSQL database for storing tool and rental data.
Mongoose: ODM for MongoDB.
JWT: JSON Web Tokens for user authentication.
Joi: Schema validation for user inputs.
Bootstrap: Frontend styling.
Future Enhancements
Payment Integration: Add support for online payments during tool rentals.
Reviews: Allow users to leave reviews for tools they rented.
Tool Availability Alerts: Notify users when a tool they want becomes available.
Contributing
Contributions are welcome! Feel free to fork this repository and submit pull requests.

License
This project is licensed under the MIT License.
