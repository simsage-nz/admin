import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TimeSelect from '../common/time-select'

import CrawlerGeneral from './crawler-general'
import CrawlerFile from './crawler-file'
import CrawlerWeb from "./crawler-web";
import CrawlerDatabase from "./crawler-database";


const styles = {
    formContent: {
        overflowY: 'scroll',
        height: '400px',
    },
    tab: {
        backgroundColor: '#f8f8f8',
        color: '#000',
    },
    timeTabContent: {
        marginLeft: '20px',
    }
};

export class CrawlerDialog extends Component {
    constructor(props) {
        super(props);
        const crawler = props.crawler;
        this.state = {
            open: props.open,

            onSave: props.onSave,  // save callback
            onUpdate: props.onUpdate, // update callback

            onError: props.onError,
            error_title: props.error_title,
            error_msg: props.error_msg,

            selectedTab: 'general',

            // organisational details
            organisation_id: props.organisation_id,
            kb_id: props.kb_id,

            has_error: false,
        };
        this.setupFromCrawler(props.crawler);
    }

    componentWillUnmount() {
    }

    componentDidCatch(error, info) {
        this.setState({has_error: true});
        console.log(error, info);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            if (nextProps.crawler && nextProps.crawler) {
                this.setupFromCrawler(nextProps.crawler);
                this.setState({
                    open: nextProps.open,
                    title: nextProps.title,

                    onSave: nextProps.onSave,
                    onUpdate: nextProps.onUpdate,

                    onError: nextProps.onError,
                    error_title: nextProps.error_title,
                    error_msg: nextProps.error_msg,

                    organisation_id: nextProps.organisation_id,
                    kb_id: nextProps.kb_id,
                });

            } else {
                this.setState({
                    open: nextProps.open,
                    title: nextProps.title,

                    onSave: nextProps.onSave,
                    onError: nextProps.onError,
                });
            }
        }
    }
    setupFromCrawler(crawler) {
        let file_username = '';
        let file_password = '';
        let file_domain = '';
        let file_server = '';
        let file_share_name = '';
        let file_share_path = '';

        if (crawler.crawlerType === "file") {
            if (crawler.specificJson && crawler.specificJson.length > 0) {
                const obj = JSON.parse(crawler.specificJson);
                file_username = obj['username'];
                file_password = obj['password'];
                file_domain = obj['domain'];
                file_server = obj['server'];
                file_share_name = obj['shareName'];
                file_share_path = obj['sharePath'];
            }
        }

        let web_base_url = '';
        let web_extension_filter = '';
        let web_extension_filter_ignore = '';
        let web_css = '';
        let web_css_ignore = '';
        if (crawler.crawlerType === "web") {
            if (crawler.specificJson && crawler.specificJson.length > 0) {
                const obj = JSON.parse(crawler.specificJson);
                web_base_url = obj['baseUrlList'];
                web_extension_filter = obj['validExtensions'] ? obj['validExtensions'] : '';
                web_extension_filter_ignore = obj['validExtensionsIgnore'] ? obj['validExtensionsIgnore'] : '';
                web_css = obj['webCss'] ? obj['webCss'] : '';
                web_css_ignore = obj['webCssIgnore'] ? obj['webCssIgnore']: '';
            }
        }

        let db_username = '';
        let db_password = '';
        let db_jdbc = '';
        let db_query = '';
        let db_template = '';

        if (crawler.crawlerType === "database") {
            if (crawler.specificJson && crawler.specificJson.length > 0) {
                const obj = JSON.parse(crawler.specificJson);
                db_username = obj['username'];
                db_password = obj['password'];
                db_jdbc = obj['jdbc'];
                db_query = obj['query'];
                db_template = obj['template'];
            }
        }

        this.setState({
            id: crawler.id ? crawler.id : '',
            name: crawler.name,
            crawlerType: crawler.crawlerType,
            filesPerSecond: crawler.filesPerSecond,
            schedule: (crawler.schedule ? crawler.schedule : ''),
            deleteFiles: crawler.deleteFiles,

            file_username: file_username,
            file_password: file_password,
            file_domain: file_domain,
            file_server: file_server,
            file_share_name: file_share_name,
            file_share_path: file_share_path,

            web_base_url: web_base_url,
            web_extension_filter: web_extension_filter,
            web_extension_filter_ignore: web_extension_filter_ignore,
            web_css: web_css,
            web_css_ignore: web_css_ignore,

            db_username: db_username,
            db_password: db_password,
            db_jdbc: db_jdbc,
            db_query: db_query,
            db_template: db_template,
        });
    }
    showError(title, error_msg) {
        if (this.props.onError) {
            this.props.onError(title, error_msg);
        }
    }
    handleCancel() {
        if (this.state.onSave) {
            this.state.onSave(null);
        }
        this.setState({open: false});
    };
    handleSave() {
        if (this.state.crawlerType === 'file' && (
            this.state.name.length === 0 ||
            this.state.file_username.length === 0 ||
            this.state.file_server.length === 0 ||
            this.state.file_share_name.length === 0)) {

            this.showError('invalid parameters', 'you must supply crawler-type, name, username, server and share path as a minimum.');

        } else if (this.state.crawlerType === 'web' && (
                this.state.web_base_url.length === 0 ||
                (!this.state.web_base_url.startsWith("http://") && !this.state.web_base_url.startsWith("https://")) )) {

            this.showError('invalid parameters', 'you must supply a base url of type http:// or https://');

        } else if (this.state.crawlerType === 'database' && (
                this.state.db_jdbc.length === 0 ||
                this.state.db_query.length === 0 ||
                this.state.db_template.length === 0)) {

            this.showError('invalid parameters', 'you must supply crawler-type, jdbc, query, and template as a minimum.');

        } else if (this.state.crawlerType !== 'web' && this.state.crawlerType !== 'file' && this.state.crawlerType !== 'database') {

            this.showError('invalid parameters', 'you must select a crawler-type first.');

        } else {
            // save setup?
            if (this.state.onSave) {
                this.state.onSave(this.getCrawlerData(this.state));
            }
        }
    };
    getCrawlerData(data) {
        let specificJson = this.convertSpecificJson(this.state);
        return {
            id: data.id,
            name: data.name,
            crawlerType: data.crawlerType,
            deleteFiles: data.deleteFiles,
            filesPerSecond: parseInt(data.filesPerSecond),
            schedule: data.schedule,
            specificJson: specificJson,
        }
    };
    convertSpecificJson(data) {
        let specificJson = {};
        if (data) {
            if (this.state.crawlerType === 'file') {
                specificJson = JSON.stringify({
                    username: data.file_username ? data.file_username : '',
                    password: data.file_password ? data.file_password : '',
                    domain: data.file_domain ? data.file_domain : '',
                    server: data.file_server ? data.file_server : '',
                    shareName: data.file_share_name ? data.file_share_name : '',
                    sharePath: data.file_share_path ? data.file_share_path : '',
                });
            } else if (this.state.crawlerType === 'database') {
                specificJson = JSON.stringify({
                    username: data.db_username ? data.db_username : '',
                    password: data.db_password ? data.db_password : '',
                    jdbc: data.db_jdbc ? data.db_jdbc : '',
                    query: data.db_query ? data.db_query : '',
                    template: data.db_template ? data.db_template : '',
                });
            } else if (this.state.crawlerType === 'web') {
                specificJson = JSON.stringify({
                    baseUrlList: data.web_base_url ? data.web_base_url : '',
                    validExtensions: data.web_extension_filter ? data.web_extension_filter : '',
                    validExtensionsIgnore: data.web_extension_filter_ignore ? data.web_extension_filter_ignore : '',
                    webCss: data.web_css ? data.web_css : '',
                    webCssIgnore: data.web_css_ignore ? data.web_css_ignore : '',
                });
            }
        }
        return specificJson;
    };
    updateSchedule(time) {
        if (time !== null) {
            this.setState({schedule: time});
            if (this.state.onUpdate) {
                this.state.onUpdate({...this.getCrawlerData(this.state), "schedule": time});
            }
        }
    }
    update_general_data(data) {
        this.setState({...this.state, data});
        if (this.state.onUpdate) {
            this.state.onUpdate(this.getCrawlerData(data));
        }
    }
    update_control_data(data) {
        this.setState({...this.state, data});
        if (this.state.onUpdate) {
            this.state.onUpdate({...this.getCrawlerData(this.state), "specificJson": this.convertSpecificJson(data)});
        }
    }
    render() {
        if (this.state.has_error) {
            return <h1>crawler-dialog.js: Something went wrong.</h1>;
        }
        const t_value = this.state.selectedTab;
        return (
            <div>
                <Dialog aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        open={this.state.open}
                        fullWidth={true}
                        maxWidth="md"
                        onClose={this.handleCancel.bind(this)} >
                    <DialogTitle id="alert-dialog-title">{this.state.title}</DialogTitle>
                    <div>
                        <div>
                            <Tabs value={this.state.selectedTab} onChange={(event, value)=> this.setState({selectedTab: value})}>
                                <Tab label="general" value="general" style={styles.tab} />
                                {this.state.crawlerType === "file" && <Tab label="file-crawler" value="file crawler" style={styles.tab} />}
                                {this.state.crawlerType === "web" && <Tab label="web-crawler" value="web crawler" style={styles.tab} />}
                                {this.state.crawlerType === "database" && <Tab label="database-crawler" value="database crawler" style={styles.tab} />}
                                <Tab label="schedule" value="schedule" style={styles.tab} />
                            </Tabs>

                            <div style={styles.formContent}>
                                {t_value === 'general' &&
                                                            <CrawlerGeneral
                                                                id={this.state.id}
                                                                organisation_id={this.state.organisation_id}
                                                                kb_id={this.state.kb_id}
                                                                name={this.state.name}
                                                                filesPerSecond={this.state.filesPerSecond}
                                                                crawlerType={this.state.crawlerType}
                                                                deleteFiles={this.state.deleteFiles}
                                                                error_title={this.state.crawler_error_title}
                                                                error_msg={this.state.crawler_error_msg}
                                                                onError={(title, errStr) => this.showError(title, errStr)}
                                                                onSave={(crawler) => this.update_general_data(crawler)}/>
                                }
                                {t_value === 'file crawler' &&
                                                            <CrawlerFile
                                                                file_username={this.state.file_username}
                                                                file_password={this.state.file_password}
                                                                file_server={this.state.file_server}
                                                                file_domain={this.state.file_domain}
                                                                file_share_name={this.state.file_share_name}
                                                                file_share_path={this.state.file_share_path}
                                                                onError={(title, errStr) => this.showError(title, errStr)}
                                                                onSave={(crawler) => this.update_control_data(crawler)}/>
                                                            }
                                {t_value === 'web crawler' &&
                                                            <CrawlerWeb
                                                                web_base_url={this.state.web_base_url}
                                                                web_css={this.state.web_css}
                                                                web_css_ignore={this.state.web_css_ignore}
                                                                web_extension_filter={this.state.web_extension_filter}
                                                                web_extension_filter_ignore={this.state.web_extension_filter_ignore}
                                                                onError={(title, errStr) => this.showError(title, errStr)}
                                                                onSave={(crawler) => this.update_control_data(crawler)}/>
                                }
                                {t_value === 'database crawler' &&
                                                            <CrawlerDatabase
                                                                db_username={this.state.db_username}
                                                                db_password={this.state.db_password}
                                                                db_jdbc={this.state.db_jdbc}
                                                                db_query={this.state.db_query}
                                                                db_template={this.state.db_template}
                                                                onError={(title, errStr) => this.showError(title, errStr)}
                                                                onSave={(crawler) => this.update_control_data(crawler)}/>
                                }
                                {t_value === 'schedule' &&
                                                            <div style={styles.timeTabContent}>
                                                                <TimeSelect time={this.state.schedule}
                                                                            onSave={(time) => this.updateSchedule(time)}/>
                                                            </div>
                                }
                            </div>


                            </div>
                    </div>
                    <DialogActions>
                        <Button onClick={this.handleCancel.bind(this)}>cancel</Button>
                        <Button onClick={this.handleSave.bind(this)}>save</Button>
                    </DialogActions>

                </Dialog>
            </div>
        );
    }
}

export default CrawlerDialog;
