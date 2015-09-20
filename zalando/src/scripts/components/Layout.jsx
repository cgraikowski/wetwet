var React = require('react/addons');

module.exports = React.createClass({
    displayName: 'Layout',
    render: function () {
        return (
            <div className="app">
                <nav>
                    <a href="." className="logo">
                        <img className="logoImage" src="images/logo.png" alt="Zalando"/>
                    </a>
                </nav>
                {this.props.children}
                <footer>
                    <div className="points">hi</div>
                </footer>
            </div>
        );
    }
});
