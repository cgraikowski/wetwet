var React = require('react/addons');
var Router = require('react-router');
var Layout = require('./components/Layout');
var App = require('./components/App');
var Article = require('./components/Article');
require('./../styles/main.less');

React.renderComponent((
    <Layout>
        {/* to allow running demo from file using "hash", but could be "location" for nicer experience */}
        <Router.Routes location="hash">
            <Router.Route path="/article/:id/?" handler={Article} name="article"/>
            <Router.Route path="/:gender/?" handler={App} name="gender"/>
            <Router.Route path="/:gender/?:category?/" handler={App} name="catalog"/>
            <Router.NotFoundRoute handler={App}/>
        </Router.Routes>
    </Layout>
), document.body);
