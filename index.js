const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");


const questions = [
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "githubUsername"
    },
    {
        type: "input",
        message: "What is your email?",
        name: "userEmail"
    },
    {
        type: "input",
        message: "What is your Project Title?",
        name: "projectTitle"
    },
    {
        type: "input",
        message: "Description of Project",
        name: "description",
    },
    {
        type: "input",
        message: "Installation Instructions",
        name: "install",
    },
    {
        type: "input",
        message: "License",
        name: "license",
    },
];

function getGitInfo() {
    inquirer.prompt({
        type: "input",
        message: "Enter your GitHub username:",
        name: "username",
    }).then(function ({ username }) {
        const queryUrl = `https://api.github.com/users/${username}?access_token=`;

        axios.get(queryUrl).then(function (res) {
            const profilePic = res.data.avatar_url;
            const userEmail = res.data.email;


            fs.writeFile("repos.txt", profilePic, userEmail, function (err) {
                if (err) {
                    throw err;
                }

            });
        });
    });
};
