import decode from "jwt-decode";

import {
  ON_LOGIN,
  ON_LOGIN_FAILURE,
  ON_LOGIN_SUCCESS,

  ON_LOGOUT,
  ON_LOGOUT_FAILURE,
  ON_LOGOUT_SUCCESS,

  ON_REGISTER,
  ON_REGISTER_FAILURE,
  ON_REGISTER_SUCCESS,

  GET_TOPICS,
  GET_TOPICS_FAILURE,
  GET_TOPICS_SUCCESS,

  ON_CREATE_TOPIC,
  ON_CREATE_TOPIC_FAILURE,
  ON_CREATE_TOPIC_SUCCESS,

  ON_UPDATE_TOPIC,
  ON_UPDATE_TOPIC_FAILURE,
  ON_UPDATE_TOPIC_SUCCESS,

  ON_DELETE_TOPIC,
  ON_DELETE_TOPIC_FAILURE,
  ON_DELETE_TOPIC_SUCCESS,

  ON_CREATE_MSG,
  ON_CREATE_MSG_FAILURE,
  ON_CREATE_MSG_SUCCESS,

  ON_GET_MSG,
  ON_GET_MSG_FAILURE,
  ON_GET_MSG_SUCCESS,
} from './constants';

const initialState = {
  loading: false,
  error: "",
  success: false,
  response: {},
  user: {},
  topics: [],
  token: "",
  currentTopicMsgs: [],
  topicId: "",
  currentUser: {},
  currentPage: 1,
  hasMore: true,
  redirectFromMsg: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ON_LOGIN:
      return { ...state, loading: true, error: "" }
    case ON_LOGIN_SUCCESS:
      let user = {};
      let token = "";
      if (action.data.token) {
        user = decode(action.data.token);
        token = action.data.token;
      }
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('token', token);
      return { ...state, loading: false, error: "", currentUser: user, token }
    case ON_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.data.data, currentUser: {}}

    case ON_LOGOUT:
      return { ...state }
    case ON_LOGOUT_SUCCESS:
      sessionStorage.clear();
      return initialState
    case ON_LOGOUT_FAILURE:
      return { ...state }

    case ON_REGISTER:
      return { ...state, loading: true, error: "" }
    case ON_REGISTER_SUCCESS:
      return { ...state, loading: false, error: "", success: true }
    case ON_REGISTER_FAILURE:
      return { ...state, loading: false, error: action.data.data, currentUser: {}}

    case GET_TOPICS:
      return { ...state, loading: true, error: "", success: false, hasMore: false }
    case GET_TOPICS_SUCCESS:
    const topicsList = state
      .topics
      .concat(action.data)
      .filter((topic, index, self) =>
      index === self.findIndex((t) => (t._id === topic._id)));
      return {
        ...state,
        loading: false,
        error: "",
        hasMore: Boolean(action.data.length),
        topics: topicsList,
        currentTopicMsgs: [],
      }
    case GET_TOPICS_FAILURE:
      return { ...state, loading: false, redirectFromTopic: false }

    case ON_CREATE_TOPIC:
      return { ...state, loading: true, error: "", success: false }
    case ON_CREATE_TOPIC_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        success: true,
        response: action.data,
        topics: state.topics.concat([{ ...action.data, _id: action.data.id }])
      }
    case ON_CREATE_TOPIC_FAILURE:
      return { ...state, loading: false, error: action.data.message, success: false }
    
    case ON_UPDATE_TOPIC:
      return { ...state, loading: true, error: "", topicId: action.data.id, success: false }
    case ON_UPDATE_TOPIC_SUCCESS:
      const list = state.topics.map((topic) => {
        if (topic._id === action.data.id) {
          return { ...topic, subject: action.data.subject, description: action.data.description }
        }
        return topic;
      });
      return {
        ...state,
        loading: false,
        error: "",
        topics: list,
        success: true,
        topicId: "",
        response: action.data.data,
      }
    case ON_UPDATE_TOPIC_FAILURE:
      return { ...state, loading: false, error: action.data.message, success: false }

    case ON_DELETE_TOPIC:
      return { ...state, loading: true, error: "", topicId: action.data.id }
    case ON_DELETE_TOPIC_SUCCESS:
      const topics = state.topics.filter((topic) => topic._id !== state.topicId);
      return { ...state, topics, loading: false, error: "", success: true, response: action.data, topicId: "" }
    case ON_DELETE_TOPIC_FAILURE:
      return { ...state, loading: false, error: action.data, topicId: "" }

    case ON_CREATE_MSG:
      return { ...state, loading: true, error: "", success: false, response: {} }
    case ON_CREATE_MSG_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        success: true,
        response: action.data,
        currentTopicMsgs: state.currentTopicMsgs.concat([{ ...action.data, _id: action.data.id }],)
      }
    case ON_CREATE_MSG_FAILURE:
      return { ...state, loading: false, error: action.data.message, response: {} }

    case ON_GET_MSG:
      return {
        ...state,
        loading: true,
        error: "",
        hasMore: false,
        success: false,
        redirectFromMsg: false,
        redirectFromTopic: false,
      }
    case ON_GET_MSG_SUCCESS:
      const id = action.data.topicId;
      delete action.data.topicId;
      const params =  action.data.data;
      const msgs = state
        .currentTopicMsgs
        .concat(params)
        .filter((msg, index, self) =>
          msg.topic_id === id &&
          index === self.findIndex((m) => (m._id === msg._id)));
      return {
        ...state,
        loading: false,
        error: "",
        hasMore: Boolean(action.data.length),
        currentTopicMsgs: msgs,
        redirectFromTopic: false,
        redirectFromMsg: true,
      }
    case ON_GET_MSG_FAILURE:
      return { ...state, loading: false, error: "Cannot get messages", hasMore: false }
    default:
      return state;
  }
}