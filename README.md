# Geeky.vn

## System requirement

- Node.js
- Make
- A text editor that supports Markdown

## Project Structure

```
├── css
│   └── theme.css
├── generator.js
├── img
├── js
├── Makefile
├── README.md
├── src
│   ├── get-involved.md
│   ├── how-we-do.md
│   ├── index.md
│   ├── legacy.md
│   └── what-we-do.md
└── template.html
```

All of the pages source code are stored in markdown format within `src` folder.

## Manage Pages

To manage which page to be shown on the main menu. Edit the `pages` array in `generator.js`.

```
let pages = [
  { name: 'About Us', slug: 'index'},
  { name: 'What we do?', slug: 'what-we-do'},
  { name: 'How we do it?', slug: 'how-we-do'},
  { name: 'Get involved', slug: 'get-involved'},
  { name: 'Wanna hack?', slug: 'legacy'}
];

```

## How to edit

To edit pages content, please `fork` this repo and make changes in the markdown files.

Finally, generate the HTML pages for publishing:

```
$ make
```
or
```
$ node generator.js
```

