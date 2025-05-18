# Aunt's Memory-Based AI Chat

This is a web application that simulates a conversational AI persona of a late aunt using Google's Gemini Pro API. The application stores memories in MongoDB and uses them to generate personalized responses in Hindi with a dehati (rural) tone.

## Features

- Chat interface to interact with the AI aunt
- Admin panel to manage memories
- Hindi responses with dehati tone
- Memory-based conversation
- MongoDB storage for persistent memories

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Google Gemini API key

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/aunt-memories
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start MongoDB (if using local instance)

5. Start the application:
   ```bash
   node app.js
   ```

6. Visit `http://localhost:3000` in your browser

## Usage

### Chat Interface
- Visit the home page to start chatting with the AI aunt
- Type your questions in the chat input
- The AI will respond in Hindi with a dehati tone

### Admin Panel
- Click the "Admin Panel" button to access the memory management interface
- Add new memories using the form
- View and delete existing memories
- Each memory consists of a key and value pair

## API Routes

- `POST /ask` - Send a question to the AI aunt
- `POST /remember` - Add a new memory
- `GET /admin` - Access the admin panel
- `POST /admin/add` - Add a new memory through the admin panel
- `DELETE /admin/:id` - Delete a memory

## Technologies Used

- Express.js
- MongoDB (Mongoose)
- Google Gemini Pro API
- EJS templating
- Bootstrap 5 