import React, { Component } from "react";
import { connect } from "react-redux";
import {
  AddNotification,
  RemoveNotification,
  ReplaceNotification,
  DismissAllNotifications
} from "../../stores/notification-reducer";
import { getDefaultConfigObject } from "../../helpers";
import Notification from "../../components/notification/Notification";
import "./App.scss";

class App extends Component {
  onAddNotification = () => {
    const { notifications, addNotification } = this.props;
    const configObject = getDefaultConfigObject();
    addNotification(configObject, notifications);
  };

  onRemoveFirstNotification = () => {
    const { notifications, removeNotification } = this.props;
    if (notifications.length > 0) {
      removeNotification(notifications[0], notifications);
    }
  };

  onReplaceFirstNotification = () => {
    const { notifications, replaceNotification } = this.props;
    if (notifications.length > 0) {
      try {
        const firstNotification = notifications[0];
        switch (firstNotification.type) {
          case "started":
            firstNotification.type = "ongoing";
            break;
          case "ongoing":
            firstNotification.type = "completed";
            break;
          case "completed":
            firstNotification.type = "failed";
            break;
          case "failed":
            firstNotification.type = "started";
            break;
          default:
            throw new Error("Unhandled type");
        }
        replaceNotification(firstNotification, notifications);
      } catch (error) {
        console.log(error);
      }
    }
  };

  onDismissallNotifications = () => {
    const { dismissAllNotifications } = this.props;
    dismissAllNotifications();
  };

  render() {
    const { notifications } = this.props;
    return (
      <div className="h-vh-100 flex-vbox">
        <div className="flex-auto flex-hbox flex-main-end flex-cross-center pd-lg header-border">
          <Notification
            notifications={notifications}
            onDismissallNotifications={this.onDismissallNotifications}
          />
        </div>
        <div className="flex-full pd-md">
          <div className="flex-hbox flex-cross-center">
            <button className="btn btn-info" onClick={this.onAddNotification}>
              Add Notification
            </button>
            <button
              className="btn btn-info"
              onClick={this.onRemoveFirstNotification}
            >
              Remove First Notification
            </button>
            <button
              className="btn btn-info"
              onClick={this.onReplaceFirstNotification}
            >
              Replace First Notification
            </button>
            <button
              className="btn btn-info"
              onClick={this.onDismissallNotifications}
            >
              Dismiss All Notifications
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapsStateToProps = ({ notificationReducer: { notifications } }) => ({
  notifications
});

const mapDispatchToProps = dispatch => ({
  addNotification: (configObject, notifications) =>
    dispatch(AddNotification(configObject, notifications)),
  removeNotification: (configObject, notifications) =>
    dispatch(RemoveNotification(configObject, notifications)),
  replaceNotification: (configObject, notifications) =>
    dispatch(ReplaceNotification(configObject, notifications)),
  dismissAllNotifications: () => dispatch(DismissAllNotifications())
});

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(App);
