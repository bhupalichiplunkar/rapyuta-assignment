import React from "react";
import moment from "moment";
import {
  faCircle,
  faCircleNotch,
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

const TypeIcons = {
  started: faCircle,
  ongoing: faCircleNotch,
  completed: faCheckCircle,
  failed: faTimesCircle
};

export const createActions = () => {
  const actions = [
    <button
      className="btn btn-error"
      onClick={() => {
        console.log("clicked 1");
      }}
    >
      B1
    </button>,
    <button
      className="btn btn-warn"
      onClick={() => {
        console.log("clicked 2");
      }}
    >
      B1
    </button>,
    <button
      className="btn btn-success"
      onClick={() => {
        console.log("clicked 3");
      }}
    >
      B1
    </button>
  ];
  return actions;
};

export const createContent = () => {
  return (
    <div>
      This is Dummy content. This is Dummy content.This is Dummy content
    </div>
  );
};

export const generateRandomId = () => {
  return Math.random();
};

export const getDefaultConfigObject = () => ({
  type: "started", // (started | ongoing | completed | failed)
  title: "Here goes title", // can be node as well
  createdAt: moment(),
  actions: createActions(),
  content: createContent(),
  id: generateRandomId()
});

export const getIconByType = type => TypeIcons[type];
