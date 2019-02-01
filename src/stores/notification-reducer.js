const initialState = {
  notifications: []
};

export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";
export const REPLACE_NOTIFICATION = "REPLACE_NOTIFICATION";
export const DISMISS_ALL_NOTIFICATION = "DISMISS_ALL_NOTIFICATION";

const addNotification = notifications => ({
  type: ADD_NOTIFICATION,
  notifications
});

const removeNotification = notifications => ({
  type: REMOVE_NOTIFICATION,
  notifications
});

const replaceNotification = notifications => ({
  type: REPLACE_NOTIFICATION,
  notifications
});

const dismissAllNotification = () => ({
  type: DISMISS_ALL_NOTIFICATION
});

export const AddNotification = (
  configObject,
  notifications
) => async dispatch => {
  try {
    const doesNotificationExists = notifications.find(
      notification => notification.id === configObject.id
    );
    if (!doesNotificationExists) {
      dispatch(addNotification([configObject, ...notifications]));
    } else {
      throw new Error(
        `Notification with id : ${configObject.id} already exists`
      );
    }
  } catch (e) {
    console.log("ERROR OCCURRED");
  }
};

export const RemoveNotification = (
  configObject,
  notifications
) => async dispatch => {
  try {
    const modifiedNotifications = notifications.filter(
      notification => notification.id !== configObject.id
    );
    dispatch(removeNotification(modifiedNotifications));
  } catch (e) {
    console.log("ERROR OCCURRED");
  }
};

export const ReplaceNotification = (
  configObject,
  notifications
) => async dispatch => {
  try {
    const modifiedNotifications = notifications.map(notification =>
      configObject.id === notifications.id ? configObject : notification
    );
    dispatch(replaceNotification(modifiedNotifications));
  } catch (e) {
    console.log("ERROR OCCURRED");
  }
};

export const DismissAllNotifications = () => async dispatch => {
  try {
    dispatch(dismissAllNotification());
  } catch (e) {
    console.log("ERROR OCCURRED");
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
    case REMOVE_NOTIFICATION:
    case REPLACE_NOTIFICATION:
      return {
        ...state,
        notifications: action.notifications
      };
    case DISMISS_ALL_NOTIFICATION:
      return {
        ...state,
        notifications: []
      };
    default:
      return { ...state };
  }
};
