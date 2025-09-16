# Ice Cream Topping Selector

This project is a simple web application that helps users choose an ice cream topping through a conversational interface powered by Google's Gemini model. The application guides the user through a series of questions to determine their preferred topping.

## Application Flow

The application consists of three main screens:

1.  **Welcome Screen:** This is the initial screen that greets the user and provides a brief introduction to the application. The user can start the interaction by clicking the "Start" button.

2.  **Gemini Chat Screen:** On this screen, the user interacts with the Gemini model in a chat-like interface. The model asks a series of questions to understand the user's preferences for an ice cream topping.

3.  **Result Screen:** After the conversation is complete, the application displays the recommended ice cream topping based on the user's answers. It also indicates if any potential allergies were mentioned during the conversation. The user has the option to restart the process from this screen.

## Running the code

Run `npm i` to install the dependencies.

Start the frontend development server:

```
npm run dev
```

Start the Gemini backend (requires `GEMINI_API_KEY` environment variable):

```
GEMINI_API_KEY=your_key_here npm run server
```

