import {combineReducers} from 'redux';
import createState, {CreateChatBotState} from "./create";
import formCreate, {CreateFormState} from "./createForm";
import list, {GetListChatBotState} from "./list";
import deleteChatBot, {DeleteChatBotState} from "./deleteBot";
import updateChatBotState, {UpdateChatBotState} from "./update";
import selector_bot, {SelectedBotState} from "./selector_bot";

export interface ChatBotModuleState {
  createState: CreateChatBotState,
  formCreate: CreateFormState,
  list: GetListChatBotState,
  deleteChatBot: DeleteChatBotState,
  updateChatBotState: UpdateChatBotState,
  selector_bot: SelectedBotState
}

export default combineReducers<ChatBotModuleState>({
  createState,
  formCreate,
  list,
  deleteChatBot,
  updateChatBotState,
  selector_bot
});
