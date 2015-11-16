var Header = React.createClass({
    render: function() {
        return (
            <div>
                <nav className="blue darken-1">
                    <div className="wrapper">
                        <a href="#" className="brand-logo center">learningCurated</a>
                    </div>
                </nav>
            </div>)
    }
})

var Footer = React.createClass({
    render: function () {
        return (
            <footer className="page-footer blue darken-1">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <h5 className="white-text">LEARNINGCURATED</h5>
                            <p className="grey-text text-lighten-4">learningCurated is an educational platform whose mission is to bring together a
                                community of lifelong learners and students to submit online content on educational topics, sorted based on one of
                                three learning styles: visual, auditory and kinesthetic.</p>
                        </div>
                        <div className="col l5 offset-l1 s12">
                            <div id="donate-button" className="right">
                                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                                    <input type="hidden" name="cmd" value="_s-xclick"/>
                                    <input type="hidden" name="hosted_button_id" value="JSJX6L9JK5WHS"/>
                                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
                                    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        © Timothy Castillo 2015
                        <span className="grey-text text-lighten-4 right">
                            For <a className="grey-text text-lighten-4" href="http://www.jpedia.org/">JP Allen's</a> BUS-370 at
                            the <a className="grey-text text-lighten-4" href="http://www.usfca.edu">University of San Francisco</a>
                        </span>
                    </div>
                </div>
            </footer>
        )
    }
})

var Resource = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col m10 offset-m1">
                    <div className="card blue-grey lighten-1 z-depth-2">
                        <div className="card-content white-text">
                            <a href={this.props.resource.url}>
                                <span className="card-title">{this.props.resource.title}</span>
                            </a>
                            <div className="row">
                                <p className="col s3">
                                    Score: {this.props.resource.score}
                                </p>
                                <p className="col s3">
                                    Clicks: {this.props.resource.clicks}
                                </p>
                            </div>
                        </div>
                        <div className="card-action">
                            <a href={this.props.resource.url}>Link to Resource</a>
                        </div>
                    </div>
                </div>
            </div>
            )
    }
})

var SearchBar = React.createClass({
    send: function () {
        var category = $("#topic").val().toLowerCase()
        if (!category) category = ""
        var style = $("#style-select").val().toLowerCase()
        this.props.update({filterCategory: category, filterStyle: style})
    },
    keyup: function (e) {
        if (e.keyCode == 13) return this.send()
    },
    render: function () {
        return (
            <div className="row">
                    <div className="input-field col m4">
                        <input id="topic" type="text" className="validate" onKeyUp={this.keyup}/>
                        <label htmlFor="topic">Topic</label>
                    </div>
                    <div className="input-field col m2">
                        <select id="style-select">
                            <option value="Auditory">Auditory</option>
                            <option value="Kinesthetic">Kinesthetic</option>
                            <option value="Visual">Visual</option>
                        </select>
                        <label>Learning Style</label>
                    </div>
                    <div className="input-field col m2">
                        <a id="send" onClick={this.send}>
                            <button className="btn green accent-4 waves-effect waves-light">GO
                                <i className="material-icons right">send</i>
                            </button>
                        </a>
                    </div>
            </div>
        )
    }
})

var SearchResults = React.createClass({
    render: function () {
        if (this.props.results.length === 0) {
            return (
                <div id="no-results" className="valign-wrapper">
                    <div className="row valign">
                        <div className="col m10 center-align">
                            <a href="http://www.learning-styles-online.com/">
                                <div className="card blue lighten-2 z-depth-3" id="no-results-card">
                                    <div className="card-content white-text">
                                        <h4>Welcome to learningCurated</h4>
                                        <p>Everyone has their own unique way to learn, and learningCurated is here to help people not only figure out how they learn the best, but also find the best resources on the internet to help them learn best.</p>
                                        <br/>
                                        <p>Click here to find out what learning styles fit you best.</p>
                                        <h5>Please input a category above and pick your desired learning style.</h5>
                                        <p>(PS: If you hit search and the page doesn't update with results, it's because I haven't made a "No Results Found" page yet. Sorry. Will get to that)</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return(
                <div id="collection-wrapper">
                    <ul>
                        {this.props.results.map(function (resource) {
                            return (
                            <li key={resource.title}>
                                <Resource resource={resource} />
                            </li>)
                        })}
                    </ul>
                </div>)
        }
    }
})

var InsertModal = React.createClass({
    getInitialState: function () {
        return {
            chips: []
        }
    },
    insert: function() {
        $("#material-tags").empty()
    },
    render: function() {
        return ( /* jshint ignore:start */
            <div id="submit" className="modal">
                <div className="modal-content">
                    <h4>Submit New Content</h4>
                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="title" type="text" className="validate"/>
                                    <label htmlFor="title">Title</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s8 input-field">
                                    <input id="material-tags" type="text" name="tags" value="" data-role="materialtags"/>
                                    <label htmlFor="tags">Categories</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#!" onClick={this.insert} className="modal-action modal-close waves-effect waves-orange btn-flat">Insert</a>
                </div>
            </div> /* jshint ignore:end */)
    }
})

var AddButton = React.createClass({
    open: function() {
        $('#submit').openModal();
    },
    render: function() {
        return (
            <div className="fixed-action-btn" id="fixed-btn" onClick={this.open}>
                <p className="btn-floating btn-large red z-depth-1">
                    +
                </p>
            </div>)
    }
})

var Ad = React.createClass({
    render: function() {
        return (
            <div>
            </div>
        )
    }
})

var Main = React.createClass({
    getInitialState: function () {
        return ({
            results: [],
            filterCategory: "",
            filterStyle: ""
        })
    },
    updateResults: function (search) {
        var url = "/submissions"
        var _this = this
        $.getJSON(url, {category: search.filterCategory, style: search.filterStyle}, function (result) {

            if(!result || !result.length)
                return
            _this.setState({results: result})
        })
    },
    render: function () {
        return (
            <div>
                <SearchBar results={this.state.results} update={this.updateResults}/>
                <SearchResults results={this.state.results} update={this.updateResults}/>
            </div>
        )
    }
})

React.render(<Header />, document.getElementById("header"))
React.render(<Main />, document.getElementById("main"))
React.render(<Footer />, document.getElementById("footer"))
React.render(<AddButton />, document.getElementById('add'))
React.render(<InsertModal />, document.getElementById('modal'))