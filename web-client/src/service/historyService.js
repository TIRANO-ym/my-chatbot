import apiService from './apiService';

const get = (bot_id) => {
  return apiService.post('/bot/get_bot_chat_history', bot_id);
};
const update = (bot_id, histories) => {
  while (histories.length > 1000) {
    histories.shift();
  }
  return apiService.post('/bot/update_bot_chat_history', {bot_id, histories: JSON.stringify(histories)});
}
const historyService = {
  get: get,
  update: update
};
export default historyService;