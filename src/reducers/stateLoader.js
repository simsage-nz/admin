import Api from '../common/api'

//
// this defines the initial state of the entire application - the state store
//
export function initializeState() {
    return {
        // which tab is selected in the app
        selected_tab: 'organisations',

        // notification system
        notification_list: [],
        show_notifications: false,
        operator_wait_timeout_in_ms: 10000,
        notification_list_display_size: 50,

        // organisational data
        selected_organisation_id: "",
        selected_organisation: "",
        organisation_filter: "",
        organisation_list: [],

        // kb status
        selected_knowledgebase: null,
        selected_knowledgebase_id: "",
        knowledge_base_list: [],

        // inventory items for a given kb
        inventorize_list: [],
        inventorize_busy: false,

        // the users
        user_list: [],
        user_filter: '',

        // crawlers
        crawler_list: [],

        // system busy
        busy: false,

        // program busy uploading
        uploading: false,

        // session and user objects
        session: null,
        user: null,

        // system license
        license: null,

        // documents
        document_list: [],
        document_previous: null,
        document_filter: '',
        prev_document_filter: '',   // see what the last filter was (reset pagination if changed)
        document_page: 0,
        document_page_size: 5,
        num_documents: 0,
        // nav-list with page 0 id
        document_nav_list: ["null"],

        // mind items
        mind_item_list: [],
        mind_item_previous: null,
        mind_item_filter: '',
        mind_item_page: 0,
        mind_item_page_size: 5,
        num_mind_items: 0,
        prev_mind_item_filter: '',
        mind_item_nav_list: ["null"],

        // mind query (aka. bot query)
        bot_query: "",
        bot_query_result_list: [],
        bot_query_page_size: 10,
        bot_query_threshold: 0.01,

        // synonyms
        synonym_list: [],
        synonym_prev_id: null,
        synonym_filter: "",
        synonym_page: 0,
        synonym_page_size: 5,
        num_synonyms: 0,
        prev_synonym_filter: '',
        synonym_nav_list: ["null"],

        // semantics
        semantic_list: [],
        semantic_prev_id: null,
        semantic_filter: "",
        semantic_page: 0,
        semantic_page_size: 5,
        num_semantics: 0,
        prev_semantic_filter: '',
        semantic_nav_list: ["null"],

        // syn-sets
        synset_filter: "",
        synset_list: [],
        synset_page: 0,
        synset_page_size: 10,
        synset_total_size: 0,

        // reports
        report_date: Api.toIsoDate(new Date()),
        report_num_items: 20,
        access_frequency: {labels: []},
        general_statistics: [],
        query_word_frequency: [],
        file_type_statistics: [],

        // operator
        operators: [Api.createOperator()],
        num_active_connections: 0,
        operator_connected: false,

        // html5 notification permissions asked already?
        html5_notifications: '',

        // list of log files
        log_size: 100,
        log_list: [],
        selected_log: 'web',
        active_components: {}, // what processes are active

        // ad domain manager
        domain_list: [],

        // semantic display categories for org:kb
        semantic_display_category_list: [],
        // list of semantics that are existing / defined for org:kb
        defined_semantic_list: [],

        // application error messages
        error_title: "Error",
        error: "",
    }
}


export function loadState() {
    try {
        let serializedState = localStorage.getItem("https://simsage.nz:state");
        if (serializedState === null || window.location.href.endsWith("/#/")) {
            return {"appReducer": initializeState()};
        }
        return JSON.parse(serializedState);
    }
    catch (err) {
        return {"appReducer": initializeState()};
    }
}


export function saveState(state) {
    try {
        let serializedState = JSON.stringify(state);
        localStorage.setItem("https://simsage.nz:state", serializedState);
    }
    catch (err) {
    }
}


export function clearState(state) {
    try {
        localStorage.removeItem("https://simsage.nz:state");
    }
    catch (err) {
    }
}

