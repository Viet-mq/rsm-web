import {ListResponseBase2, ResponseBase2} from "src/models/common";
import {GET, POST} from "src/services";
import {SkillEntity} from "../../types";

export const getListSkill = async (params: any): Promise<ListResponseBase2<SkillEntity>> => {
  const response = (await GET('api-svc/skill/list', params)) as any;
  return {
    total: response.total,
    rows: response.rows || [],
    code: response.code,
    message: response.message
  }
};

export const createSkill = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/skill/create', params)) as ResponseBase2;
};

export const deleteSkill = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/skill/delete', params)) as ResponseBase2;
};

export const updateSkill = async (params?: any): Promise<ResponseBase2> => {
  return (await POST('api-svc/skill/update', params)) as ResponseBase2;
};
