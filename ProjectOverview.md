Employee Polls Project Introduction
Project Overview
You have been asked by the HR department of your company to build an application that employees can use internally. In order to improve collaboration and transparency within the company, every employee can access the application and create a poll with two proposed solutions. Employees can then vote on these solutions and see which solutions have the most votes. In addition, HR has requested you have a dashboard that lists every employee ordered by the number of polls they've created and answered. To give employees incentive to use your application, HR will give a prize each quarter for the top employees who have created and answered the most polls.

In the "Employee Polls" Project, you'll build a web app that lets an employee create polls for coworkers. The process goes like this: An employee is asked a question in the form: “Would you rather [option A] or [option B] ?”. Answering "neither" or "both" is not possible.

In your app, users will be able to answer polls, see which polls they haven’t answered, see how other people have voted, post polls, and see the ranking of users on the leaderboard.

Why this project?
This project will solidify your understanding of React and Redux while giving you a chance to express your creativity in how you approach the problem or choose to add any additional functionality. You’ll practice improving the predictability of your application’s state; establish strict rules for getting, listening, and updating the store; and identify what state should live inside of Redux and what state should live inside of React components. You'll also be able to practice writing unit tests to ensure your code is working as expected.

Get the Project
You have two options to start developing this project:

develop using your preconfigured Workspace
develop locally on your own computer
Your Workspace is a development environment integrated into the Udacity Classroom. You can both develop your entire app in your Workspace as well as submit your project to be reviewed. For more information about your Workspace, check out the Your Project Workspace page.

Starter Code
You can find the starter code

The starter code(opens in a new tab) will consist of a _DATA.js file, which represents a fake database and contains methods that let you access the data. The README file outlines how the data is stored and details the methods you can use to access the database.

The only thing you need to edit in the _DATA.js file is the value of avatarURL. Each user should have an avatar, so you’ll need to add a path to each user’s avatar.

Using the provided starter code, you will build a React/Redux front end for the application.

App Functionality
The person using your application should have a way of impersonating/logging in as an existing user. (This could be as simple as having a dropdown that appears at the root of the application that lets the user select a user from the list of existing users. Alternatively, you could create your own account creation process to allow a user to sign up for an account.) Your application should work correctly regardless of which user is selected. Once the user logs in, the home page should be shown.

We always want to make sure we know who the logged in user is, so information about the logged in user should appear on the page. If someone tries to navigate anywhere by entering the address in the address bar, the user is asked to sign in and then the requested page is shown. The application allows the user to log out and log back in.

Once the user logs in, the user should be able to toggle between his/her answered and unanswered polls on the home page, which is located at the root. The polls in both categories are arranged from the most recently created (top) to the least recently created (bottom). The unanswered polls should be shown by default, and the name of the logged in user should be visible on the page.

What would be the point of seeing answered and unanswered polling questions if we couldn’t actually vote or see the results? Each polling question should link to the details of that poll. The details of each poll should be available at questions/:question_id.

When a poll is clicked on the home page, the following is shown:

Text “Would You Rather”;
Avatar of the user who posted the polling question; and
Two options.
For answered polls, each of the two options contains the following:

Text of the option;
Number of people who voted for that option; and
Percentage of people who voted for that option.
The option selected by the logged-in user should be clearly marked.

Since we want to make sure our application creates a good user experience, the application should show a 404 page if the user is trying to access a poll that does not exist. (Please keep in mind that newly created polls will not be accessible at their url because of the way the backend is set up in this application.) It should also display a navigation bar so that the user can easily navigate anywhere in the application.

So what happens when someone votes in a poll? Upon voting in a poll, all of the information of an answered poll should be displayed. The user’s response should be recorded and clearly visible on the poll details page. Users can only vote once per poll; they shouldn’t be allowed to change their answer after they’ve voted -- no cheating allowed! When the user comes back to the home page, the polling question should appear in the “Answered” column.

It would be no fun to vote in polls if we couldn’t post our own questions! The form for posting new polling questions should be available at the /add route. The application should show the text “Would You Rather” and have a form for creating two options. Upon submitting the form, a new poll should be created, the user should be taken to the home page, and the new polling question should appear in the correct category on the home page.

But how can we know how many questions each user has asked and answered? Let’s get some healthy competition going here! The application should have a leaderboard that’s available at the /leaderboard route. Each entry on the leaderboard should contain the following:

User’s name;
User’s picture;
Number of questions the user asked; and
Number of questions the user answered
Users should be ordered in descending order based on the sum of the number of questions they’ve asked and the number of questions they’ve answered. The more questions you ask and answer, the higher up you move.

The user should be able to navigate to the leaderboard, to a specific question, and to the form that allows the user to create a new poll both from within the app and by typing in the address into the address bar. To make sure we’re showing the data that is relevant to the user, the application should require the user to be signed in order to access those pages.

App Architecture
By walking through the Planning Stage and the Coding Stage of the Chirper Project, we’ve given you a useful template for building Redux applications. We recommend using this template for building your “Employee Polls” Project. Remember that planning your project and its architecture before starting to code will save you a lot of debugging time later on!

For this application, most of the application’s state should be managed by Redux. You’ll find that there are situations where it makes sense to store state outside of the Redux store. Check out what Dan Abramov, the creator of Redux, thinks about choosing between Redux's store and React's state(opens in a new tab).

Your application’s store should be the source of truth, and components should read the necessary state from the store instead of having their own versions of the same state. There should be no direct API calls in components’ lifecycle methods, and updates should be triggered by dispatching action creators.

Your application’s code should be structured and organized in a logical way, and your components should be modular and reusable.

Unit Testing
You will also be expected to write at least ten unit tests for the project. The first six should be the following:

For the _DATA.js file, write an async unit test for _saveQuestion to verify that the saved question is returned and all expected fields are populated when correctly formatted data is passed to the function.
For the _DATA.js file, write an async unit test for _saveQuestion to verify that an error is returned if incorrect data is passed to the function.
For the _DATA.js file, write an async unit test for _saveQuestionAnswer to verify that the saved question answer is returned and all expected fields are populated when correctly formatted data is passed to the function.
For the _DATA.js file, write an async unit test for _saveQuestionAnswer to verify that an error is returned if incorrect data is passed to the function.
Write a snapshot test for at least one file.
Write a DOM test for at least one file which uses the fireEvent function. For example use fireEvent.click() for clicking a button and verifying that something changed in a component or fireEvent.change() to add text to an input field or select an option in a dropdown. After doing this, verify the UI changed in some way using the expect() method from jest.
The remaining four unit tests can be to verify any function or component you are writing for this project. Here are some ideas:

On the login page, verify that a user name field, password field, and submit button are present on the page.
Verify that a user entering an incorrect username or password and clicking submit will see an error on the page.
Verify that the leaderboard is displaying the correct user name, number of questions asked, and number of questions answered.
For answered polls, verify that the percentage of people who voted for an option is calculated and displayed correctly.
Verify the navigation bar displays all expecte