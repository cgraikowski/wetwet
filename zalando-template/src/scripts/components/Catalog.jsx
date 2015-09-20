var React = require('react/addons');
var ArticleStore = require('../stores/Article');
var CatalogArticle = require('./CatalogArticle');
var $ = require('jquery');
require('../util/slick');

module.exports = React.createClass({
    displayName: 'Catalog',
    updateFromStoreState: function () {
        this.setState(this.store.getState());
    },
    componentWillMount: function () {
        this.store = new ArticleStore({
            category: this.props.category,
            season: this.props.season,
            gender: this.props.gender
        });
        this.store.on('change', this.updateFromStoreState);
        this.updateFromStoreState();
    },
    componentDidUpdate: function () {
        var $slider = $(this.getDOMNode()).find('.slider');
        $slider.unslick();
        $slider.slick({
            dots: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            draggable: true
        });
    },
    componentWillReceiveProps: function (nextProps) {
        if (this.props.category !== nextProps.category) {
            this.store.update({
                category: nextProps.category,
                gender: nextProps.gender
            });
        }
    },
    render: function () {
        var list = this.state.data || [];

        return <div className="sliderWrapper">
            <div className="slider">
                {list.map(function(article, i) {
                    return (
                        <div className="slide" key={i}>
                        {<CatalogArticle article={article} key={article.id} />}
                        </div>
                    );
                })}
            </div>
        </div>;
    }
});
