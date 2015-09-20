var React = require('react/addons');

module.exports = React.createClass({
    displayName: 'Currentcy',
    render: function () {
        var value = this.props.value || {};
        return (
            <div className="currentcy">
              {value}
            </div>
        );
    }
});
