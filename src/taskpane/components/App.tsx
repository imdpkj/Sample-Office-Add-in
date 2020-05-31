import * as React from "react";
import Header from "./Header";
import Progress from "./Progress";
import { MessageBar, MessageBarType, Spinner, CompoundButton, IIconProps } from "office-ui-fabric-react";
import { OverlayState, LoginApiResponse, User, FullUser } from "./utils/Types";
import LoginForm from "./LoginForm";
import API from "./utils/Api";
import UserList from "./UserList";
import WordOperations from "./utils/WordOperations";

const validateIcon: IIconProps = { iconName: "TriggerApproval" };

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppState {
  isLoggedIn: boolean;
  token?: string;
  users: User[];
  overlay?: {
    state: OverlayState;
    messages?: Array<string>;
  };
  isValidating: boolean;
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoggedIn: false,
      users: [],
      isValidating: false
    };
  }

  users = () => {
    this.overlay(OverlayState.LOADING);
    API.users().then((users: User[]) => {
      this.setState(
        {
          users
        },
        () => {
          this.overlay(OverlayState.NONE);
        }
      );
    });
  };

  login = (email: string, password: string) => {
    if (!email || !password) {
      this.overlay(OverlayState.ERROR, ["No email or password provided"]);
      return;
    }

    this.overlay(OverlayState.LOADING);

    API.login(email, password)
      .then((response: LoginApiResponse) => {
        if (response.error) {
          this.overlay(OverlayState.ERROR, [`Login errror ${response.error}`]);
        } else if (response.token) {
          this.setState(
            {
              isLoggedIn: true,
              token: response.token,
              overlay: {
                state: OverlayState.NONE,
                messages: null
              }
            },
            () => {
              this.users();
            }
          );
        }
      })
      .catch(error => {
        this.overlay(OverlayState.ERROR, [`Login errror ${error}`]);
      });
  };

  selectUser = (id: number) => {
    this.overlay(OverlayState.LOADING);
    API.user(id).then((response: FullUser) => {
      WordOperations.addUser(response);
      this.overlay(OverlayState.NONE);
    });
  };

  overlay = (state: OverlayState, messages?: Array<string>) => {
    this.setState({
      overlay: {
        state: state,
        messages: messages
      }
    });
  };

  hideOverlay = () => {
    this.setState({
      overlay: {
        state: OverlayState.NONE,
        messages: null
      }
    });
  };

  validate = () => {
    WordOperations.update(this.state.users);
  };

  render() {
    const { title, isOfficeInitialized } = this.props;
    const { isLoggedIn, overlay, users } = this.state;

    if (!isOfficeInitialized) {
      return (
        <Progress title={title} logo="assets/logo-filled.png" message="Please sideload your addin to see app body." />
      );
    }

    let messageBar = <div></div>;

    if (overlay) {
      switch (overlay.state) {
        case OverlayState.ERROR:
          messageBar = (
            <div>
              <MessageBar
                messageBarType={MessageBarType.error}
                isMultiline={true}
                onDismiss={() => this.hideOverlay()}
                dismissButtonAriaLabel="Close"
              >
                {overlay.messages.join(", ")}
              </MessageBar>
            </div>
          );
          break;
        case OverlayState.LOADING:
          messageBar = (
            <div>
              <MessageBar isMultiline={false} onDismiss={() => this.hideOverlay()} dismissButtonAriaLabel="Close">
                <div>
                  <Spinner labelPosition="right" label="Wait for response ..." />
                </div>
              </MessageBar>
            </div>
          );
          break;
        case OverlayState.MESSAGE:
          messageBar = (
            <div>
              <MessageBar isMultiline={true} onDismiss={() => this.hideOverlay()} dismissButtonAriaLabel="Close">
                {overlay.messages.join(", ")}
              </MessageBar>
            </div>
          );
          break;
        default:
          messageBar = <div></div>;
      }
    }

    return (
      <div className="ms-welcome">
        <Header message="Sample Office Add-in" />
        {messageBar}
        <main className="app-content">
          {!isLoggedIn ? (
            <LoginForm login={(email, password) => this.login(email, password)} />
          ) : (
            <div>
              <UserList users={users} select={id => this.selectUser(id)} />
              <div className="app-validate">
                <CompoundButton
                  primary={true}
                  secondaryText="Validate all rows in document to match user data with ID"
                  iconProps={validateIcon}
                  onClick={() => this.validate()}
                >
                  Verify & Correct Document
                </CompoundButton>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }
}
