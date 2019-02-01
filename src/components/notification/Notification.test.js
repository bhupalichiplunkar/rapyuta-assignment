import React from "react";
import { mount } from "enzyme";
import Notification from "./Notification";
import { getDefaultConfigObject } from "../../helpers";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  let notifications = [];
  for (let i = 0; i < 50; i++) {
    const configObj = getDefaultConfigObject();
    notifications.push(configObj);
  }
  const onDismissallNotifications = () => {
    notifications = [];
  };
  const tree = renderer
    .create(
      <Notification
        notifications={notifications}
        onDismissallNotifications={onDismissallNotifications}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("has dismiss div", () => {
  let notifications = [];
  for (let i = 0; i < 50; i++) {
    const configObj = getDefaultConfigObject();
    notifications.push(configObj);
  }
  const onDismissallNotifications = () => {
    notifications = [];
  };
  const notificationComponent = mount(
    <Notification
      notifications={notifications}
      onDismissallNotifications={onDismissallNotifications}
    />
  );
  const dismissDiv = (
    <div
      className={`pd-xs cursor-pointer text-success dismiss-all text-right ${
        notifications.length > 0 ? "text-success" : "text-body"
      }`}
      onClick={onDismissallNotifications}
    >
      Dismiss all
    </div>
  );
  expect(notificationComponent.contains(dismissDiv)).toEqual(false);
});
