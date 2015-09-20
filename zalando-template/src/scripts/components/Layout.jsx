var React = require('react/addons');

module.exports = React.createClass({
    displayName: 'Layout',
    render: function () {
        return (
            <div className="app">
                {this.props.children}
            </div>
        );
    }
});
