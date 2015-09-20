var React = require('react/addons');
var Navigation = require('react-router').Navigation;

module.exports = React.createClass({
    displayName: 'CatalogArticle',
    mixins: [Navigation],
    getDefaultProps: function () {
        return {
            gender: '',
            category: '',
            categoryList: []
        };
    },
    handleGenderChange: function (e) {
        // This method is provided by React Router
        this.transitionTo('gender', {
            gender: e.target.value
        });
    },
    handleCategoryChange: function (e) {
        this.transitionTo('catalog', {
            gender: this.props.gender,
            category: e.target.value
        });
    },
    render: function () {
        return (
            <div className="filters">
                <select onChange={this.handleGenderChange} value={this.props.gender}>
                    <option value="">Fashion for...</option>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                </select>
            </div>
        );
    }
});
