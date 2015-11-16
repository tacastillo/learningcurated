var Header = React.createClass({displayName: "Header",
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("nav", {className: "blue darken-1"}, 
                    React.createElement("div", {className: "wrapper"}, 
                        React.createElement("a", {href: "#", className: "brand-logo center"}, "learningCurated")
                    )
                )
            ))
    }
})

var Footer = React.createClass({displayName: "Footer",
    render: function () {
        return (
            React.createElement("footer", {className: "page-footer blue darken-1"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col l6 s12"}, 
                            React.createElement("h5", {className: "white-text"}, "LEARNINGCURATED"), 
                            React.createElement("p", {className: "grey-text text-lighten-4"}, "learningCurated is an educational platform whose mission is to bring together a" + ' ' +
                                "community of lifelong learners and students to submit online content on educational topics, sorted based on one of" + ' ' +
                                "three learning styles: visual, auditory and kinesthetic.")
                        ), 
                        React.createElement("div", {className: "col l5 offset-l1 s12"}, 
                            React.createElement("div", {id: "donate-button", className: "right"}, 
                                React.createElement("form", {action: "https://www.paypal.com/cgi-bin/webscr", method: "post", target: "_top"}, 
                                    React.createElement("input", {type: "hidden", name: "cmd", value: "_s-xclick"}), 
                                    React.createElement("input", {type: "hidden", name: "hosted_button_id", value: "JSJX6L9JK5WHS"}), 
                                    React.createElement("input", {type: "image", src: "https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif", border: "0", name: "submit", alt: "PayPal - The safer, easier way to pay online!"}), 
                                    React.createElement("img", {alt: "", border: "0", src: "https://www.paypalobjects.com/en_US/i/scr/pixel.gif", width: "1", height: "1"})
                                )
                            )
                        )
                    )
                ), 
                React.createElement("div", {className: "footer-copyright"}, 
                    React.createElement("div", {className: "container"}, 
                        "© Timothy Castillo 2015", 
                        React.createElement("span", {className: "grey-text text-lighten-4 right"}, 
                            "For ", React.createElement("a", {className: "grey-text text-lighten-4", href: "http://www.jpedia.org/"}, "JP Allen's"), " BUS-370 at" + ' ' +
                            "the ", React.createElement("a", {className: "grey-text text-lighten-4", href: "http://www.usfca.edu"}, "University of San Francisco")
                        )
                    )
                )
            )
        )
    }
})

var Resource = React.createClass({displayName: "Resource",
    render: function () {
        return (
            React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col m10 offset-m1"}, 
                    React.createElement("div", {className: "card blue-grey lighten-1 z-depth-2"}, 
                        React.createElement("div", {className: "card-content white-text"}, 
                            React.createElement("a", {href: this.props.resource.url}, 
                                React.createElement("span", {className: "card-title"}, this.props.resource.title)
                            ), 
                            React.createElement("div", {className: "row"}, 
                                React.createElement("p", {className: "col s3"}, 
                                    "Score: ", this.props.resource.score
                                ), 
                                React.createElement("p", {className: "col s3"}, 
                                    "Clicks: ", this.props.resource.clicks
                                )
                            )
                        ), 
                        React.createElement("div", {className: "card-action"}, 
                            React.createElement("a", {href: this.props.resource.url}, "Link to Resource")
                        )
                    )
                )
            )
            )
    }
})

var SearchBar = React.createClass({displayName: "SearchBar",
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
            React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "input-field col m4"}, 
                        React.createElement("input", {id: "topic", type: "text", className: "validate", onKeyUp: this.keyup}), 
                        React.createElement("label", {htmlFor: "topic"}, "Topic")
                    ), 
                    React.createElement("div", {className: "input-field col m2"}, 
                        React.createElement("select", {id: "style-select"}, 
                            React.createElement("option", {value: "Auditory"}, "Auditory"), 
                            React.createElement("option", {value: "Kinesthetic"}, "Kinesthetic"), 
                            React.createElement("option", {value: "Visual"}, "Visual")
                        ), 
                        React.createElement("label", null, "Learning Style")
                    ), 
                    React.createElement("div", {className: "input-field col m2"}, 
                        React.createElement("a", {id: "send", onClick: this.send}, 
                            React.createElement("button", {className: "btn green accent-4 waves-effect waves-light"}, "GO", 
                                React.createElement("i", {className: "material-icons right"}, "send")
                            )
                        )
                    )
            )
        )
    }
})

var SearchResults = React.createClass({displayName: "SearchResults",
    render: function () {
        if (this.props.results.length === 0) {
            return (
                React.createElement("div", {id: "no-results", className: "valign-wrapper"}, 
                    React.createElement("div", {className: "row valign"}, 
                        React.createElement("div", {className: "col m10 center-align"}, 
                            React.createElement("a", {href: "http://www.learning-styles-online.com/"}, 
                                React.createElement("div", {className: "card blue lighten-2 z-depth-3", id: "no-results-card"}, 
                                    React.createElement("div", {className: "card-content white-text"}, 
                                        React.createElement("h4", null, "Welcome to learningCurated"), 
                                        React.createElement("p", null, "Everyone has their own unique way to learn, and learningCurated is here to help people not only figure out how they learn the best, but also find the best resources on the internet to help them learn best."), 
                                        React.createElement("br", null), 
                                        React.createElement("p", null, "Click here to find out what learning styles fit you best."), 
                                        React.createElement("h5", null, "Please input a category above and pick your desired learning style."), 
                                        React.createElement("p", null, "(PS: If you hit search and the page doesn't update with results, it's because I haven't made a \"No Results Found\" page yet. Sorry. Will get to that)")
                                    )
                                )
                            )
                        )
                    )
                )
            )
        }
        else {
            return(
                React.createElement("div", {id: "collection-wrapper"}, 
                    React.createElement("ul", null, 
                        this.props.results.map(function (resource) {
                            return (
                            React.createElement("li", {key: resource.title}, 
                                React.createElement(Resource, {resource: resource})
                            ))
                        })
                    )
                ))
        }
    }
})

var InsertModal = React.createClass({displayName: "InsertModal",
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
            React.createElement("div", {id: "submit", className: "modal"}, 
                React.createElement("div", {className: "modal-content"}, 
                    React.createElement("h4", null, "Submit New Content"), 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("form", {className: "col s12"}, 
                            React.createElement("div", {className: "row"}, 
                                React.createElement("div", {className: "input-field col s6"}, 
                                    React.createElement("input", {id: "title", type: "text", className: "validate"}), 
                                    React.createElement("label", {htmlFor: "title"}, "Title")
                                )
                            ), 
                            React.createElement("div", {className: "row"}, 
                                React.createElement("div", {className: "col s8 input-field"}, 
                                    React.createElement("input", {id: "material-tags", type: "text", name: "tags", value: "", "data-role": "materialtags"}), 
                                    React.createElement("label", {htmlFor: "tags"}, "Categories")
                                )
                            )
                        )
                    )
                ), 
                React.createElement("div", {className: "modal-footer"}, 
                    React.createElement("a", {href: "#!", onClick: this.insert, className: "modal-action modal-close waves-effect waves-orange btn-flat"}, "Insert")
                )
            ) /* jshint ignore:end */)
    }
})

var AddButton = React.createClass({displayName: "AddButton",
    open: function() {
        $('#submit').openModal();
    },
    render: function() {
        return (
            React.createElement("div", {className: "fixed-action-btn", id: "fixed-btn", onClick: this.open}, 
                React.createElement("p", {className: "btn-floating btn-large red z-depth-1"}, 
                    "+"
                )
            ))
    }
})

var Ad = React.createClass({displayName: "Ad",
    render: function() {
        return (
            React.createElement("div", null
            )
        )
    }
})

var Main = React.createClass({displayName: "Main",
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
            React.createElement("div", null, 
                React.createElement(SearchBar, {results: this.state.results, update: this.updateResults}), 
                React.createElement(SearchResults, {results: this.state.results, update: this.updateResults})
            )
        )
    }
})

React.render(React.createElement(Header, null), document.getElementById("header"))
React.render(React.createElement(Main, null), document.getElementById("main"))
React.render(React.createElement(Footer, null), document.getElementById("footer"))
React.render(React.createElement(AddButton, null), document.getElementById('add'))
React.render(React.createElement(InsertModal, null), document.getElementById('modal'))