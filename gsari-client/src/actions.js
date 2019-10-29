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

// login
export function onLogin(data) {
  return {
    type: ON_LOGIN,
    data,
  };
}

export function onLoginFailure(data) {
  return {
    type: ON_LOGIN_FAILURE,
    data,
  };
}

export function onLoginSuccess(data) {
  return {
    type: ON_LOGIN_SUCCESS,
    data,
  };
}

// logout
export function onLogout() {
  return {
    type: ON_LOGOUT,
  };
}

export function onLogoutFailure() {
  return {
    type: ON_LOGOUT_FAILURE,
  };
}

export function onLogoutSuccess() {
  return {
    type: ON_LOGOUT_SUCCESS,
  };
}

// register
export function onRegister(data) {
  return {
    type: ON_REGISTER,
    data,
  };
}

export function onRegisterFailure(data) {
  return {
    type: ON_REGISTER_FAILURE,
    data,
  };
}

export function onRegisterSuccess(data) {
  return {
    type: ON_REGISTER_SUCCESS,
    data,
  };
}

// get topics
export function onGetTopics(data) {
  return {
    type: GET_TOPICS,
    data,
  };
}

export function onGetTopicsFailure() {
  return {
    type: GET_TOPICS_FAILURE,
  };
}

export function onGetTopicsSuccess(data) {
  return {
    type: GET_TOPICS_SUCCESS,
    data,
  };
}

// create topic
export function onCreateTopic(data) {
  return {
    type: ON_CREATE_TOPIC,
    data,
  };
}

export function onCreateTopicFailure(data) {
  return {
    type: ON_CREATE_TOPIC_FAILURE,
    data,
  };
}

export function onCreateTopicSuccess(data) {
  return {
    type: ON_CREATE_TOPIC_SUCCESS,
    data,
  };
}

// update topic
export function onUpdateTopic(data) {
  return {
    type: ON_UPDATE_TOPIC,
    data,
  };
}

export function onUpdateTopicFailure() {
  return {
    type: ON_UPDATE_TOPIC_FAILURE,
  };
}

export function onUpdateTopicSuccess(data) {
  return {
    type: ON_UPDATE_TOPIC_SUCCESS,
    data,
  };
}

// delete topic
export function onDeleteTopic(data) {
  return {
    type: ON_DELETE_TOPIC,
    data,
  };
}

export function onDeleteTopicFailure() {
  return {
    type: ON_DELETE_TOPIC_FAILURE,
  };
}

export function onDeleteTopicSuccess(data) {
  return {
    type: ON_DELETE_TOPIC_SUCCESS,
    data,
  };
}

// create message
export function onCreateMsg(data) {
  return {
    type: ON_CREATE_MSG,
    data,
  };
}

export function onCreateMsgFailure(data) {
  return {
    type: ON_CREATE_MSG_FAILURE,
    data,
  };
}

export function onCreateMsgSuccess(data) {
  return {
    type: ON_CREATE_MSG_SUCCESS,
    data,
  };
}

// get messages
export function onGetMsg(data) {
  return {
    type: ON_GET_MSG,
    data,
  };
}

export function onGetMsgFailure(data) {
  return {
    type: ON_GET_MSG_FAILURE,
    data,
  };
}

export function onGetMsgSuccess(data) {
  return {
    type: ON_GET_MSG_SUCCESS,
    data,
  };
}
