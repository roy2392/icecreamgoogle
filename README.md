# Ice Cream Topping Selector

This project is a simple web application that helps users choose an ice cream topping through a conversational interface powered by Google's Gemini model. The application guides the user through a series of questions to determine their preferred topping.

## Application Flow
The application consists of three main screens:

1.  **Welcome Screen:** Greets the user and provides a brief introduction. The user can start the interaction by clicking the "Start" button.
2.  **Chat Screen:** The user interacts with the Gemini model in a chat-like interface. The model asks a series of questions to understand the user's preferences for an ice cream topping.
3.  **Result Screen:** After the conversation, the application displays the recommended ice cream topping based on the user's answers. It also indicates if any potential allergies were mentioned. The user can restart the process from this screen.

## Project Structure

The project is structured into a frontend application and a backend server.

### Frontend
-   **`src/`**: Contains the source code for the React-based frontend application.
-   **`src/components/`**: Includes the main React components for the application's UI:
    -   `Welcome.tsx`: The initial screen that greets the user.
    -   `ChatScreen.tsx`: The chat interface where the user interacts with the Gemini model.
    -   `ResultScreen.tsx`: Displays the final recommended topping.
-   **`index.html`**: The main HTML file for the frontend application.

### Backend
-   **`server.mjs`**: An Express.js server that handles the chat logic. It communicates with the Google Gemini API and manages chat sessions. This is used for local development.
-   **`api/chat.js`**: A serverless function (e.g., for Vercel) that provides the same functionality as `server.mjs`. It handles chat requests in a serverless environment.

Both backend files use an in-memory `Map` to store chat sessions, making them suitable for development and demonstration purposes. For a production environment, a more persistent session management solution would be required.

## Development

To set up the development environment, follow these steps:

1.  **Install Dependencies:**
    Run the following command to install the necessary packages:
    ```bash
    npm i
    ```

2.  **Set Up Environment Variables:**
    The backend requires a Google Gemini API key to function. You need to set the `GEMINI_API_KEY` environment variable. You can do this by creating a `.env` file in the root of the project and adding the following line:
    ```
    GEMINI_API_KEY=your_key_here
    ```
    Replace `your_key_here` with your actual Gemini API key.

3.  **Run the Development Servers:**
    -   **Frontend:** To start the frontend development server, run:
        ```bash
        npm run dev
        ```
        This will start the Vite development server, and you can access the application at `http://localhost:5173` (or another port if 5173 is in use).

    -   **Backend:** To start the backend server, run:
        ```bash
        npm run server
        ```
        This will start the Express.js server, which listens for requests on port 3000.


