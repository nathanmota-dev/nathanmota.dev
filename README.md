# Portfolio with Next 16

This is my portfolio built with Next 16.

If you liked it, just fork this project and fill in `data/resume-data.tsx` with your identity, links, icons and technical data. Edit the localized text in `public/i18n/en.json` and `public/i18n/pt.json`.

## Languages

The app uses next-intl with English (`en`) and Brazilian Portuguese (`pt-BR`), preserving the existing URLs. The first visit follows the browser language, falling back to English. The PT/EN selector saves the preference in the `NEXT_LOCALE` cookie for one year.

Both dictionaries have matching keys. Resume entries (`item0`, `item1`, etc.) follow the order of arrays in `resume-data.tsx`; add translations in both files when adding an entry. Articles keep dates, tags and slugs in `articles/*.md`, with localized titles and Markdown content in `articles.posts` in the dictionaries. The downloadable PDF remains `public/cv/curriculum.pdf`.

## How to Customize

- PDF Resume: place your file inside the `public/cv` folder.
- Projects: add your project images to the `public/projects` folder.
- Setup: add an image of your setup to the `public/setup` folder.

That’s it — you’re all set.

## License

This project is open-source and available under the MIT License.

Feel free to use it as inspiration for your own portfolio, customize it, and build something amazing. Just make sure to keep the original license notice.

## Preview

![Portfolio Screenshot](public/print/portfolio.png)