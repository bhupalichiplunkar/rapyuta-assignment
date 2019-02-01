import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { getIconByType } from "../../helpers";
import "./Notification.scss";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.node = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("click", this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick, false);
  }

  toggleDropDown = e => {
    e.stopPropagation();
    this.setState({
      open: !this.state.open
    });
    this.setState({ open: !this.state.open });
  };

  handleOutsideClick = e => {
    if (this.node.current && this.node.current.contains(e.target)) {
      return;
    }
    if (this.state.open) {
      this.setState({ open: false });
    }
  };

  dismiss = event => {
    if (this.props.onDismissallNotifications) {
      this.props.onDismissallNotifications();
    }
  };

  setCurrentNode = node => {
    this.node = node;
  };

  render() {
    const { notifications } = this.props;
    const { open } = this.state;
    return (
      <div className="container" ref={this.node}>
        <div
          className="dropdown-label flex-hbox flex-cross-center"
          onClick={this.toggleDropDown}
        >
          <div className="flex-auto pd-r-sm">
            <FontAwesomeIcon icon={faBell} color="#279e76" />
          </div>
          {notifications.length > 0 ? (
            <div className="badge">{notifications.length}</div>
          ) : null}
        </div>
        {open && (
          <div className="dropdown-options">
            <div className="h-percent-100 pd-md">
              <div
                className={`pd-xs cursor-pointer text-success dismiss-all text-right ${
                  notifications.length > 0 ? "text-success" : "text-body"
                }`}
                onClick={this.dismiss}
              >
                Dismiss all
              </div>
              {notifications.length > 0 ? (
                <div>
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className="card pd-sm pd-sm mr-tb-sm bg-vapour"
                    >
                      <div className="row-1 flex-hbox flex-cross-center ">
                        <div className="flex-auto pd-r-sm">
                          <FontAwesomeIcon
                            icon={getIconByType(notification.type)}
                            color="#279e76"
                          />
                        </div>
                        <div className="flex-full pd-lr-sm title">
                          {notification.title}
                        </div>
                        <div className="flex-auto pd-l-sm chip">
                          {notification.createdAt.fromNow()}
                        </div>
                      </div>
                      <div className="row-2 pd-tb-md">
                        {notification.content}
                      </div>
                      <div className="row-3 flex-hbox flex-cross-center">
                        {notification.actions.map((action, index) => (
                          <div className="flex-auto" key={index}>
                            {action}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-percent-100 text-center text-warning pd-tb-md">
                  No notification !
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Notification;
