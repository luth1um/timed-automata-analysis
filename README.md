# ⏰ Timed-Automata Analysis

This project is a tool for modeling and analyzing Timed Automata.
The tool is based on React and TypeScript and can be extended easily to also incorporate analysis techniques based on the created models.
If you want to see the tool in actions, just visit [this website](https://luth1um.github.io/timed-automata-analysis/).

## 🚀 Quick Start

This project utilizes [Node](https://nodejs.org/) and [pnpm](https://pnpm.io/) for development.
The usual commands for React projects also apply here.

- `pnpm install` to install all dependencies and setup the project locally
- `pnpm start` to run the app locally for development
- `pnpm format` to format all files
- `pnpm lint` for linting
- `pnpm test` for running unit tests
- `pnpm e2e` for running end-to-end tests
- `pnpm e2e-ui` for running end-to-end tests in the UI mode of Playwright
- `pnpm e2e-update-snapshots` for updating the end-to-end test snapshots
- `pnpm playwright install` for installing/updating the browsers for Playwright
- `pnpm build` to build the app for production
- `pnpm deploy` for deployment on GitHub Pages

See `package.json` for further commands.

## 🎯 Reachability Analysis

This project supports reachability analysis for modeled TA.
To start an analysis, just press the respective button in the UI.
The app will then calculate reachability for all locations.

The implementation of the analysis is done [in a separate project](https://github.com/luth1um/timed-automata-analyzer) and is also available as an [NPM package](https://www.npmjs.com/package/timed-automata-analyzer) called `timed-automata-analyzer`.
For maximum performance, the analyzer is written in Rust and compiled to WebAssembly.

## 🔗 Links

- [Timed-Automata Analysis on GitHub Pages](https://luth1um.github.io/timed-automata-analysis/)
- [Introduction to Timed Automata on Wikipedia](https://en.wikipedia.org/wiki/Timed_automaton)
- [Original paper on Timed Automata by Alur and Dill](https://doi.org/10.1007/BFb0032042)
