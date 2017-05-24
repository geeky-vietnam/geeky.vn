const fs = require('fs');
const path = require('path');
const marked = require('./js/marked.js');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false, // IMPORTANT, because we do MathJax before markdown,
  //            however we do escaping in 'CreatePreview'.
  smartLists: true,
  smartypants: false
});

let template = '';

console.log('Loading template...');
template = fs.readFileSync('template.html', { encoding: 'utf8' });

console.log('Generating static files...');

let pages = [
  { name: 'About Us', slug: 'index'},
  { name: 'What we do?', slug: 'what-we-do'},
  { name: 'How we do it?', slug: 'how-we-do'},
  { name: 'Get involved', slug: 'get-involved'},
  { name: 'Wanna hack?', slug: 'legacy'}
];

let menuHTML = pages.reduce((html, item) => {
  html += `<li><a href="${item.slug}.html">${item.name}</a></li>`;
  return html;
}, "");

for (let i = 0; i < pages.length; i++) {
  let page = pages[i];
  let htmlOutput = __dirname + '/' + page.slug + '.html';
  fs.readFile(__dirname + '/src/' + page.slug + '.md', function (err, data) {
    if (err)
      throw err;
    if (data) {
      let postContent = '';
      let htmlContent = '';
      let markdownPost = data.toString('utf8');
      let lines = markdownPost.split('\n');
      let title = '';
      if (lines.length > 0) {
        title = lines[0].replace(/#/g, '').replace("\r\n", '').replace("\n", '');
      }

      // Custom components
      postContent = marked(markdownPost);
      htmlContent = template.replace('{%content%}', postContent);
      htmlContent = htmlContent.replace('{%title%}', title);
      htmlContent = htmlContent.replace('{%menu%}', menuHTML);

      fs.writeFile(htmlOutput, htmlContent, function (err) {
        if (err)
          throw err;
        else
          console.log('>>', htmlOutput);
      });
    }
  });
}
