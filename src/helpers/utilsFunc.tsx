import store from "../redux/store";

export const CheckViewAction = (viewPath: string, action: string) => {
  const state = store.getState();
  const permission = state.auth.auth.data?.permissions
  return permission?.some((item: any) => {
    if (item.path === viewPath) {
      if (item.actions.some((el: any) => el.key === action)) return true
    }
  })
}

export const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 24},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 24},
  },
};

export const convertArrayToTree = (arrays: any) => {
  let dataFetch: any = [];
  for (let i = 0; i < arrays.length; i++) {
    if (arrays[i]?.children) {
      dataFetch.push({
        title: arrays[i].name,
        key: arrays[i].id,
        value: arrays[i].id,
        children: convertArrayToTree(arrays[i].children)
      })
    } else {
      dataFetch.push({
        title: arrays[i].name,
        key: arrays[i].id,
        value: arrays[i].id,
      })
    }
  }
  return dataFetch;
}

export const getInitials = (name: string) => {
  if (name) {
    let initials: any = name.split(' ');
    if (initials.length > 1) {
      initials = initials.shift().charAt(0) + initials.pop().charAt(0);
    } else {
      initials = name.substring(0, 2);
    }
    return initials.toUpperCase();
  }
}

export const view_role_path = "/view-roles-manager";
export const view_path = "/view-manager"
export const home_path = "/home"
export const recruitment_path = "/recruitment-manager"
export const profile_path = "/profile-manager"
export const schedule_path = "/schedule"
export const reminder_path = "/reminder"
export const account_path = "/account-manager"
export const api_path = "/api-manager"
export const api_roles_path = "/api-roles-manager"
export const roles_path = "/roles-manager"
export const job_path = "/job-manager"
export const skill_path = "/skill-manager"
export const joblevel_path = "/joblevel-manager"
export const department_path = "/department-manager"
export const school_path = "/school-manager"
export const sourcecv_path = "/sourcecv-manager"
export const statuscv_path = "/statuscv-manager"
export const blacklist_path = "/blacklist-manager"
export const reason_reject_path = "/reason-reject-manager"
export const address_path = "/address-manager"
export const talent_pool_path = "/talent-pool-manager"
export const email_path = "/email-manager"
export const company_path = "/company-manager"

