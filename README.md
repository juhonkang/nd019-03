# Employee Polls

A React/Redux application for creating and answering polls within a company. Employees can create "Would You Rather" questions, vote on existing polls, and view leaderboards to see who's most active in the community.

## Features

- **User Authentication**: Simple user selection and password-based login
- **Poll Creation**: Create new "Would You Rather" questions with two options
- **Voting System**: Vote on unanswered polls and see results with percentages
- **Dashboard**: View answered and unanswered polls, sorted by recency
- **Leaderboard**: See rankings based on questions created and answered
- **Responsive Design**: Works on desktop and mobile devices
- **Protected Routes**: Authentication required for all main features
- **404 Handling**: Graceful handling of non-existent polls

## Technologies Used

- **React 19** - UI framework
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and development server
- **Jest** - Testing framework
- **React Testing Library** - Component testing utilities

## Installation

1. Clone the repository or download the project files
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```
The application will start on `http://localhost:3001`

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Quick Start (Install & Run)
```bash
npm start
```
This command will install dependencies and start the development server.

## Running Tests

Run all tests:
```bash
npm test
```

The test suite includes:
- **10+ Unit Tests** covering all major components and functions
- **Required _DATA.js Tests** for `_saveQuestion` and `_saveQuestionAnswer`
- **Snapshot Tests** for component UI consistency
- **DOM Tests** using fireEvent for user interactions
- **Login Flow Tests** verifying authentication behavior
- **Leaderboard Tests** ensuring correct data display

## Project Structure

```
src/
├── components/           # React components
│   ├── App.js           # Main application component
│   ├── Login.js         # User authentication
│   ├── Navigation.js    # Main navigation bar
│   ├── Home.js          # Dashboard with poll lists
│   ├── PollDetail.js    # Individual poll view/voting
│   ├── NewPoll.js       # Create new poll form
│   ├── Leaderboard.js   # User rankings
│   ├── NotFound.js      # 404 error page
│   └── ProtectedRoute.js # Route authentication wrapper
├── store/               # Redux store configuration
│   ├── index.js         # Store setup
│   ├── authSlice.js     # Authentication state
│   ├── usersSlice.js    # Users data management
│   └── questionsSlice.js # Questions/polls management
├── __tests__/           # Test files
├── index.js             # Application entry point
├── index.css           # Global styles
└── setupTests.js       # Jest configuration
_DATA.js                # Mock database with API functions
```

## Usage

### Login
1. Select a user from the dropdown menu
2. Enter the corresponding password:
   - Sarah Edo: `password123`
   - Tyler McGinnis: `abc321`
   - Mike Tsamis: `xyz123`
   - Zenobia Oshikanlu: `pass246`

### Creating Polls
1. Navigate to "New" in the navigation bar
2. Enter your first option in "First Option" field
3. Enter your second option in "Second Option" field
4. Click "Submit" to create the poll

### Voting on Polls
1. From the home page, click "Show" on any unanswered poll
2. Read the "Would You Rather" question
3. Click on your preferred option
4. View the results with vote counts and percentages

### Viewing Leaderboard
1. Navigate to "Leaderboard" in the navigation bar
2. See users ranked by total activity (questions created + answered)
3. View individual statistics for questions answered and created

## API Functions (_DATA.js)

The application uses a mock database with the following functions:

- `_getUsers()` - Fetch all users
- `_getQuestions()` - Fetch all questions/polls  
- `_saveQuestion(question)` - Create a new poll
- `_saveQuestionAnswer({ authedUser, qid, answer })` - Save a vote

## Testing

The application includes comprehensive testing:

### Required Tests (as per project rubric):
1. `_saveQuestion` - Valid data returns formatted question
2. `_saveQuestion` - Invalid data throws error
3. `_saveQuestionAnswer` - Valid data returns true
4. `_saveQuestionAnswer` - Invalid data throws error
5. Snapshot test for component UI consistency
6. DOM test with fireEvent interactions

### Additional Tests:
- Login component validation
- Navigation component rendering
- Leaderboard data accuracy
- Poll detail component functionality
- Authentication flow testing

## Key Features Implementation

### State Management
- Redux store serves as single source of truth
- No direct API calls in component lifecycle methods
- State updates via action creators and reducers
- Async operations handled with Redux Toolkit's createAsyncThunk

### Routing & Authentication
- React Router for client-side navigation
- Protected routes require authentication
- Automatic redirect to login for unauthenticated users
- URL-based navigation with proper 404 handling

### User Experience
- Responsive design for all screen sizes
- Loading states during data fetching
- Error handling with user-friendly messages
- Intuitive navigation with active link indicators

## Browser Compatibility

The application supports modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

- Component state used only for form inputs
- Redux state for shared application data
- Efficient re-rendering with proper React patterns
- Optimized bundle size with Vite build tool

## Contributing

To contribute to this project:
1. Follow the existing code structure and patterns
2. Write tests for new functionality
3. Ensure all tests pass before submitting
4. Follow React and Redux best practices

## License

This project is created for educational purposes as part of a React/Redux learning curriculum.
