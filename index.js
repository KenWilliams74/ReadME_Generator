const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");


inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

    axios.get(queryUrl).then(function(res) {
      const repoNames = res.data.map(function(repo) {
        return repo.name;
      });

      const repoNamesStr = repoNames.join("\n");

      fs.writeFile("repos.txt", repoNamesStr, function(err) {
        if (err) {
          throw err;
        }

        console.log(`Saved ${repoNames.length} repos`);
      });
    });
  });


---------------------------------------

inquirer.prompt([{
    type: "input",
    message: "What is your name?",
    name: "name",
},
{
    type: "input",
    message: "Where are you located?",
    name: "location",
},
{
    type: "input",
    message: "Tell me about yourself.",
    name: "bio",
},
{
    type: "input",
    message: "What is your github URL?",
    name: "github",
},
]).then(answers => {
    const bioAnswers =
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div class="rychea">
            <p>${answers.name}</p>
            <p>${answers.location}</p>
            <p>${answers.bio}</p>
            <p>${answers.github}</p>
        </div>
        
    </body>
    </html>`;
    fs.writeFile("testdex.html", bioAnswers, () => console.log("File Written"))
})
