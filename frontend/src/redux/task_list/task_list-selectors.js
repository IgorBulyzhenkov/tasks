export const getDataTaskList = (state) => state?.task_list?.taskListData;
export const getTaskListId = (state) => state?.task_list?.id;
export const getTaskListDescription= (state) => state?.task_list?.description;
export const getTaskListIsCompleted = (state) => state?.task_list?.is_completed;
export const getTaskListUserCreated = (state) => state?.task_list?.userName;
export const getTaskListCreatedAt = (state) => state?.task_list?.created_at;
export const getTaskListName = (state) => state?.task_list?.name;
export const getIsLoading = (state) => state.task_list.isLoading;