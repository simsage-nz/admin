import React from 'react';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {appCreators} from "../actions/appActions";
import {Home} from "../home";

import "react-datepicker/dist/react-datepicker.css";


const styles = {
    page: {
        float: 'left'
    },
    pageWidth: {
        width: '900px',
    },
    logFiles: {
        marginTop: '10px',
        maxHeight: '60vh',
        minWidth: '900px',
        width: '900px',
        overflowX: 'auto',
        overflowY: 'auto',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        resize: 'both',
    },
    logLine: {
        fontFamily: 'Courier',
        fontSize: '0.65em',
        color: '#666',
        marginBottom: '4px',
    },
    item: {
    },
    selectedItem: {
        color: '#000',
    }
};


export class Logs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            has_error: false,
            onError : props.onError,
            openDialog: props.openDialog,
            closeDialog: props.closeDialog,
        };
        this.messagesEndRef = React.createRef();
    }
    componentDidCatch(error, info) {
        this.props.setError(error, info);
        console.log(error, info);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            openDialog: nextProps.openDialog,
            closeDialog: nextProps.closeDialog,
        });
    }
    componentDidMount() {
    }
    componentDidUpdate(prevPops, prevState, snapshot) {
        this.scrollToBottom()
    }
    showLogs(log) {
        this.setState({selectedItem: log});
        this.props.getLogList(log);
    }
    restart(log) {
        this.props.restartService(log);
    }
    selected(log) {
        if (log === this.props.selected_log) {
            return "selected-chip";
        }
        return "chip";
    }
    get_active(subItem) {
        if (this.props.active_components && this.props.active_components[subItem] === true) {
            return "chip-image-area";
        }
        return "chip-image-area-not-active";
    }
    scrollToBottom() {
        this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    render() {
        return (
            <div style={styles.page}>
                <div style={styles.pageWidth}>

                    <div>

                        <div className={this.selected('auth')} onClick={() => this.showLogs('auth')} title="show authentication system logs">
                            <div className={this.get_active('auth')}>
                                <img className="chip-image-area-img" src="../images/login-icon.png" alt="auth" width="96" height="96" />
                            </div>
                            Authentication
                            {Home.hasRole(this.props.user, ['admin']) &&
                            <img className="restart-image" src="../images/refresh.svg" alt="restart" width="24"
                                 height="24"
                                 title="restart authentication service" onClick={() => this.restart('auth')}/>
                            }
                        </div>

                        <div className={this.selected('conversion')} onClick={() => this.showLogs('conversion')} title="show conversion system logs">
                            <div className={this.get_active('conversion')}>
                                <img className="chip-image-area-img" src="../images/conversion.svg" alt="auth" width="96" height="96" />
                            </div>
                            Conversion
                            {Home.hasRole(this.props.user, ['admin']) &&
                            <img className="restart-image" src="../images/refresh.svg" alt="restart" width="24"
                                 height="24"
                                 title="restart conversion service" onClick={() => this.restart('conversion')}/>
                            }
                        </div>

                        <div className={this.selected('crawler')} onClick={() => this.showLogs('crawler')} title="show crawler system logs">
                            <div className={this.get_active('crawler')}>
                                <img className="chip-image-area-img" src="../images/web-crawler.svg" alt="auth" width="96" height="96" />
                            </div>
                            Crawler
                            {Home.hasRole(this.props.user, ['admin']) &&
                            <img className="restart-image" src="../images/refresh.svg" alt="restart" width="24"
                                 height="24"
                                 title="restart crawler service" onClick={() => this.restart('crawler')}/>
                            }
                        </div>

                        <div className={this.selected('document')} onClick={() => this.showLogs('document')} title="show document system logs">
                            <div className={this.get_active('document')}>
                                <img className="chip-image-area-img" src="../images/edit.svg" alt="auth" width="96" height="96" />
                            </div>
                            Document
                            {Home.hasRole(this.props.user, ['admin']) &&
                            <img className="restart-image" src="../images/refresh.svg" alt="restart" width="24"
                                 height="24"
                                 title="restart document service" onClick={() => this.restart('document')}/>
                            }
                        </div>

                        <div className={this.selected('knowledgebase')} onClick={() => this.showLogs('knowledgebase')} title="show knowledge-base system logs">
                            <div className={this.get_active('knowledgebase')}>
                                <img className="chip-image-area-img" src="../images/kb.svg" alt="auth" width="96" height="96" />
                            </div>
                            Knowledgebase
                            {Home.hasRole(this.props.user, ['admin']) &&
                            <img className="restart-image" src="../images/refresh.svg" alt="restart" width="24"
                                 height="24"
                                 title="restart knowledge-base service" onClick={() => this.restart('knowledgebase')}/>
                            }
                        </div>

                        <div className={this.selected('language')} onClick={() => this.showLogs('language')} title="show language system logs">
                            <div className={this.get_active('language')}>
                                <img className="chip-image-area-img" src="../images/language.svg" alt="auth" width="96" height="96" />
                            </div>
                            Language
                            {Home.hasRole(this.props.user, ['admin']) &&
                            <img className="restart-image" src="../images/refresh.svg" alt="restart" width="24"
                                 height="24"
                                 title="restart language service" onClick={() => this.restart('language')}/>
                            }
                        </div>

                        <div className={this.selected('mind')} onClick={() => this.showLogs('mind')} title="show mind system logs">
                            <div className={this.get_active('mind')}>
                                <img className="chip-image-area-img" src="../images/mind.svg" alt="auth" width="96" height="96" />
                            </div>
                            SimSage Mind
                            {Home.hasRole(this.props.user, ['admin']) &&
                            <img className="restart-image" src="../images/refresh.svg" alt="restart" width="24"
                                 height="24"
                                 title="restart mind service" onClick={() => this.restart('mind')}/>
                            }
                        </div>

                        <div className={this.selected('operator')} onClick={() => this.showLogs('operator')} title="show operator system logs">
                            <div className={this.get_active('operator')}>
                                <img className="chip-image-area-img" src="../images/operator.svg" alt="auth" width="96" height="96" />
                            </div>
                            Operator
                            {Home.hasRole(this.props.user, ['admin']) &&
                            <img className="restart-image" src="../images/refresh.svg" alt="restart" width="24"
                                 height="24"
                                 title="restart operator service" onClick={() => this.restart('operator')}/>
                            }
                        </div>

                        <div className={this.selected('search')} onClick={() => this.showLogs('search')} title="show search system logs">
                            <div className={this.get_active('search')}>
                                <img className="chip-image-area-img" src="../images/search.svg" alt="auth" width="96" height="96" />
                            </div>
                            Search
                            {Home.hasRole(this.props.user, ['admin']) &&
                            <img className="restart-image" src="../images/refresh.svg" alt="restart" width="24"
                                 height="24"
                                 title="restart search service" onClick={() => this.restart('search')}/>
                            }
                        </div>

                        <div className={this.selected('stats')} onClick={() => this.showLogs('stats')} title="show statistics system logs">
                            <div className={this.get_active('stats')}>
                                <img className="chip-image-area-img" src="../images/stats.svg" alt="auth" width="96" height="96" />
                            </div>
                            Statistics
                            {Home.hasRole(this.props.user, ['admin']) &&
                            <img className="restart-image" src="../images/refresh.svg" alt="restart" width="24"
                                 height="24"
                                 title="restart statistics service" onClick={() => this.restart('stats')}/>
                            }
                        </div>

                        <div className={this.selected('web')} onClick={() => this.showLogs('web')} title="show web-server system logs">
                            <div className={this.get_active('web')}>
                                <img className="chip-image-area-img" src="../images/web.svg" alt="auth" width="96" height="96" />
                            </div>
                            Web server
                            {Home.hasRole(this.props.user, ['admin']) &&
                            <img className="restart-image" src="../images/refresh.svg" alt="restart" width="24"
                                 height="24"
                                 title="restart web service" onClick={() => this.restart('web')}/>
                            }
                        </div>

                    </div>
                </div>

                <div style={styles.logFiles}>
                    {
                        this.props.log_list &&
                        this.props.log_list.map((line) => {
                            return (<div style={styles.logLine} id={line}>{line}</div>)
                        })
                    }
                    <div ref={this.messagesEndRef} />
                </div>

            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        error: state.appReducer.error,
        error_title: state.appReducer.error_title,

        selected_knowledgebase_id: state.appReducer.selected_knowledgebase_id,
        selected_organisation_id: state.appReducer.selected_organisation_id,

        log_list: state.appReducer.log_list,
        selected_log: state.appReducer.selected_log,
        active_components: state.appReducer.active_components,

        user: state.appReducer.user,
    };
};

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(appCreators, dispatch)
)(Logs);

