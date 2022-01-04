import {ChatBotContent} from "../../types";

export interface ContentFormAction {
  type: string,
  show_create?: boolean,
  show_update?: boolean,
  show_import?: boolean,
  show_export?: boolean,
  content?: ChatBotContent
}

export const CB_CONTENT_SHOW_CREATE_FORM = "CB_CONTENT_SHOW_CREATE_FORM";
export const CB_CONTENT_SHOW_UPDATE_FORM = "CB_CONTENT_SHOW_UPDATE_FORM";
export const CB_CONTENT_SHOW_IMPORT_FORM = "CB_CONTENT_SHOW_IMPORT_FORM";
export const CB_CONTENT_SHOW_EXPORT_FORM = "CB_CONTENT_SHOW_EXPORT_FORM";

export const showFormCreateContent = (show: boolean): ContentFormAction => ({
  type: CB_CONTENT_SHOW_CREATE_FORM,
  show_create: show
});

export const showFormUpdateContent = (show: boolean, content?: ChatBotContent): ContentFormAction => ({
  type: CB_CONTENT_SHOW_UPDATE_FORM,
  show_update: show,
  content
});

export const showFormImportContent = (show: boolean): ContentFormAction => ({
  type: CB_CONTENT_SHOW_IMPORT_FORM,
  show_import: show
});

export const showFormExportContent = (show: boolean): ContentFormAction => ({
  type: CB_CONTENT_SHOW_EXPORT_FORM,
  show_export: show
});
