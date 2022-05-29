<h1 align="center">
    Stari Kolomoni (Frontend)
</h1>

<p align="center">
    <sup>For visual design, see <a href="https://github.com/Stari-kolomoni/kolomon-designs">kolomon-designs</a> repository.</sup>
</p>

---


## 1. Project architecture

Built on top of the following main technologies:
- [TypeScript](https://www.typescriptlang.org/) for "if it passes static type check it's likely pretty close" 
- [Webpack](https://webpack.js.org/) (with [Babel](https://babeljs.io/))
- [React](https://reactjs.org/) with [Redux](https://redux.js.org/)
- [SCSS](https://sass-lang.com/) for cleaner styles

## 1.1. Structure
The `config` directory contains the webpack configuration, which in turn uses various other configuration files 
around the project, mostly in the base directory.

The `src` directory contains four folders:
- `app` is where the body of the work is done, with `core` having various utilities and 
  API interaction stuff and `kolomon` having React components,
- `assets` is where any static files reside, from icons to any other data we'll need,
- `html` contains the base `index.html` file into which the React app is added,
- `scss` is where all the stylesheets are built from. `vendor` and `modules` contain some utilities, 
  `design-system` has the basics that are reused throughout the app and `kolomon` is split into "page-specific"
  stylesheets, all of which are in turn compiled by webpack into a single CSS file when building.

---


## 2. Development
There are a few prerequisites:
- [Node.js](https://nodejs.org/en/), reasonably recent (tested on 18.2.0, but anything above 16 should work)
- [Yarn](https://yarnpkg.com/) as the package manager of choice

When ready, run `yarn install` in the base directory to install dependencies.

When you want to run the development server, execute `yarn dev`. Webpack will build the project, open it in 
your browser and reload changes as you write them.
