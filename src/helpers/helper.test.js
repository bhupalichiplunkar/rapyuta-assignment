import { getDefaultConfigObject } from "./index";

it("unique id for notifications", () => {
  const notifications = [];
  let isUnique = true;
  for (let i = 0; i < 50; i++) {
    const configObj = getDefaultConfigObject();
    if (
      notifications.findIndex(
        notification => notification.id === configObj.id
      ) === -1
    ) {
      notifications.push(configObj);
    } else {
      break;
    }
  }
  expect(isUnique).toEqual(true);
});
