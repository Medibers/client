### Text editor
Visual Studio Code<br />
Include this json in your VS Code `settings.json`

`{
    "editor.detectIndentation": false,
    "javascript.updateImportsOnFileMove.enabled": "always",
    "files.autoSave": "onFocusChange",
    "editor.tabSize": 2,
    "typescript.updateImportsOnFileMove.enabled": "always",
    "eslint.alwaysShowStatus": true,
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.codeAction.showDocumentation": {
        "enable": true
    }
}`

---

## Getting started
Clone this repo into a directory and change into it<br />
Run `npm i`<br />
Have required environment variables, *request a .env file from one of the devs*<br />
Run `npm start`<br />
Ensure backend service is running and you should access the application at [localhost:3000](http://localhost:3000)<br />

---

### Branch names
Branch should be created out of an issue<br />
Branch should be labelled one of `bug`, `feature`, `enhancement` or `documentation`<br />
Name branch following this structure `{label}/#{issue-number}/{some-hyphenated-description}`<br />
for example `feature/#5/icon-colors` or `bug/#12/orders-fail`<br />

### Commits
Make commits regular enough to identify every line change<br />
Prepend commit messages with issue number<br />
Use past tense capitalized action sentences for commit messages for example<br />
`#13 Changed home page title`<br />
`#17 Set all icon colors primary`<br />
`#23 Refactored order function`<br />

---

*Avoid typos in names, sentences, descriptions*<br />
*Be consistent with naming conventions and patterns within files*
<br /><br />

> *Code cleanliness is as key as performance*