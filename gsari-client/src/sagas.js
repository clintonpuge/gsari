import { takeLatest, call, put } from "redux-saga/effects";
import axios from 'axios';

import {
  ON_LOGIN,
  ON_REGISTER,
  GET_TOPICS,
  ON_CREATE_TOPIC,
  ON_UPDATE_TOPIC,
  ON_DELETE_TOPIC,
  ON_CREATE_MSG,
  ON_GET_MSG,
  ON_LOGOUT,
} from './constants';
import {
  onLoginFailure,
  onLoginSuccess,
  onRegisterFailure,
  onLogoutFailure,
  onLogoutSuccess,
  onRegisterSuccess,
  onGetTopicsSuccess,
  onGetTopicsFailure,
  onCreateTopicFailure,
  onCreateTopicSuccess,
  onUpdateTopicFailure,
  onUpdateTopicSuccess,
  onDeleteTopicFailure,
  onDeleteTopicSuccess,
  onCreateMsgFailure,
  onCreateMsgSuccess,
  onGetMsgFailure,
  onGetMsgSuccess,
} from './actions';

const URI = process.env.REACT_APP_API_URI;

const getMsg = async ({ id, page }) => axios.get(`${URI}topic/${id}/messages?page=${page}`);
const createMsg = async ({ message, token, id }) => axios.post(`${URI}topic/${id}/message`, { message, token });
const deleteTopic = async ({ id, token }) => axios.delete(`${URI}topic/${id}`, { data: { token } });
const updateTopic = async ({ subject, description, token, id }) => axios
  .patch(`${URI}topic/${id}`, { subject, description, token });
const createTopic = async ({ subject, description, token }) => axios
  .post(`${URI}topic`, { subject, description, token });
const getTopics = async (page) => axios.get(`${URI}topics?page=${page}`);
const login = async ({ email, password }) => axios.post(`${URI}user/login`, { email, password });
const register = async ({ name, email, password }) => axios.post(`${URI}user/register`, { name, email, password });

function* onLoginSaga(data) {
  try {
    const resp = yield call(login, data.data);
    yield put(onLoginSuccess(resp.data));
  } catch (e) {
    yield put(onLoginFailure(e.response));
  }
}

function* onLogoutSaga() {
  try {
    yield put(onLogoutSuccess());
  } catch {
    yield put(onLogoutFailure());
  }
}

function* onRegisterSaga(data) {
  try {
    const resp = yield call(register, data.data);
    yield put(onRegisterSuccess(resp.data));
  } catch (e) {
    yield put(onRegisterFailure(e.response));
  }
}

function* onGetTopicsSaga(data) {
  try {
    const resp = yield call(getTopics, data.data);
    yield put(onGetTopicsSuccess(resp.data.data));
  } catch (e) {
    yield put(onGetTopicsFailure());
  }
}

function* onCreateTopicsSaga(data) {
  try {
    const resp = yield call(createTopic, data.data);
    yield put(onCreateTopicSuccess(resp.data));
  } catch (e) {
    console.log('e resp', e.response)
    yield put(onCreateTopicFailure(e.response.data));
  }
}

function* onUpdateTopicsSaga(data) {
  try {
    const resp = yield call(updateTopic, data.data);
    yield put(onUpdateTopicSuccess(resp.data));
  } catch (e) {
    yield put(onUpdateTopicFailure(e.response.data));
  }
}

function* onDeleteTopicsSaga(data) {
  try {
    const resp = yield call(deleteTopic, data.data);
    yield put(onDeleteTopicSuccess(resp.data));
  } catch (e) {
    yield put(onDeleteTopicFailure(e.response));
  }
}

function* onCreateMsgSaga(data) {
  try {
    const resp = yield call(createMsg, data.data);
    yield put(onCreateMsgSuccess(resp.data));
  } catch (e) {
    return yield put(onCreateMsgFailure(e.response.data));
  }
}

function* onGetMsgSaga(data) {
  try {
    const resp = yield call(getMsg, data.data);
    yield put(onGetMsgSuccess({ data: resp.data.data, topicId: data.data.id }));
  } catch (e) {
    return yield put(onGetMsgFailure());
  }
}

export function* watcherSaga() {
  yield takeLatest(ON_LOGIN, onLoginSaga);
  yield takeLatest(ON_REGISTER, onRegisterSaga);
  yield takeLatest(GET_TOPICS, onGetTopicsSaga);
  yield takeLatest(ON_CREATE_TOPIC, onCreateTopicsSaga);
  yield takeLatest(ON_UPDATE_TOPIC, onUpdateTopicsSaga);
  yield takeLatest(ON_DELETE_TOPIC, onDeleteTopicsSaga);
  yield takeLatest(ON_CREATE_MSG, onCreateMsgSaga);
  yield takeLatest(ON_GET_MSG, onGetMsgSaga);
  yield takeLatest(ON_LOGOUT, onLogoutSaga);
}