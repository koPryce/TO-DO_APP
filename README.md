# TO-DO_APP

## Description
This project is a Todo App built using HTML, CSS, and JavaScript, with an Express.js backend. It allows users to manage their tasks by adding, deleting, viewing, editing, and marking tasks as complete. The tasks are sorted based on their completion status.

## Installation
To run this project locally, please follow the instructions below:

1. Clone the repository: `git clone https://github.com/koPryce/TO-DO_APP.git`
2. Navigate to the project directory: `cd project`
3. Install the required dependencies:
   - Make sure you have Node.js and npm (Node Package Manager) installed on your machine.
   - Run `npm install` to install all the dependencies specified in the `package.json` file.

## Configuration
Before running the project, you need to configure some settings.

1. MongoDB:
   - Ensure you have MongoDB installed and running.
   - Open the `server.js` file located in the project's root directory.
   - Replace the `<connectionString>` placeholder with the URL of your MongoDB database.

## Usage
Once you have completed the installation and configuration steps, you can start the project by following these instructions:

1. Run the application:
   - Open a terminal or command prompt.
   - Navigate to the project directory.
   - Run `npm run dev` to start the Express.js server.
   - The server will start running on `http://localhost:3000`.

2. Access the application:
   - Open a web browser.
   - Enter `http://localhost:3000` in the address bar.
   - You should now see the Todo App running in the browser.

3. Managing tasks:
   - To add a new task, use the provided input field and click the "Add" button.
   - To delete a task, click the corresponding delete button next to the task.
   - To view or edit a task, click on the task itself.
   - To mark a task as complete, use the checkbox or any other method provided.

## Dependencies
This project relies on the following dependencies:

- Express.js: Fast, unopinionated, minimalist web framework for Node.js.
- EJS: Embedded JavaScript templates for generating dynamic HTML pages.
- MongoDB: NoSQL database for storing application data.
- Mongoose: MongoDB object modeling for Node.js, providing a straightforward, schema-based solution.
- Nodemon: Utility that automatically restarts the server when file changes are detected during development.
- Font Awesome: Icon set and toolkit providing a wide range of icons.
- body-parser: Middleware for parsing incoming request bodies.

## Contributing
If you want to contribute to this project, follow the steps below:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b my-feature`.
3. Make your modifications and commit changes: `git commit -am 'Add new feature'`.
4. Push to the branch: `git push origin my-feature`.
5. Create a pull request in the original repository.

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgements
- [Express.js](https://expressjs.com/)
- [EJS](https://ejs.co/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Nodemon](https://nodemon.io/)
- [Font Awesome](https://fontawesome.com/)
- [body-parser](https://www.npmjs.com/package/body-parser)

## Alternative: Link to Hosted Site
https://todoit-3794783d937a.herokuapp.com/
