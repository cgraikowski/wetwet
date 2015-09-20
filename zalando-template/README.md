# Zalando Shop API Demo

This is a simple single page application that showcases basic capabilities of Zalando Shop API, such as fetching categories,
using them to filter articles and finally getting detailed information about the article.

[See it in action](http://zalando.github.io/shop-api-demo/)

## Development

If you choose to use this as a starting point for your, there are a couple of things that need to be installed:

* [Node.js](http://nodejs.org/)
* gulp (`npm install -g gulp`)

After that you navigate to the route of this repository and type:

    npm install
    gulp

This will install all the necessary dependencies and spin up webpack development server with hot code pushes for React components and LESS styles for blazing fast development experience.

## Demo Technology Stack 

* [Gulp](http://gulpjs.com/) + [Webpack](http://webpack.github.io/) for building
* [React](http://facebook.github.io/react/) for UX layer
* [LESS](http://lesscss.org/) for styles
* [Karma](http://karma-runner.github.io/) + [Chai](http://chaijs.com/) for testing
