import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Stack, IStackStyles } from "office-ui-fabric-react/lib/Stack";
import { PrimaryButton } from "office-ui-fabric-react";

const stackTokens = { childrenGap: 10 };
const stackStyles: Partial<IStackStyles> = { root: { padding: 20 } };

export interface LoginFormProps {
  login: Function;
}

export interface LoginFormState {
  email: string;
  password: string;
}

export default class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: "eve.holt@reqres.in",
      password: "cityslicka"
    };
  }

  private login = () => {
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  private email = (email: string) => {
    this.setState({ email });
  };

  private password = (password: string) => {
    this.setState({ password });
  };

  render() {
    return (
      <Stack tokens={stackTokens} styles={stackStyles}>
        <TextField
          label="Email"
          required
          placeholder="Enter e-mail"
          type="email"
          value="eve.holt@reqres.in"
          onChange={(_, value) => this.email(value)}
        />
        <TextField
          label="Password"
          required
          placeholder="Enter password"
          type="password"
          value="cityslicka"
          onChange={(_, value) => this.password(value)}
        />
        <PrimaryButton text="Login" onClick={() => this.login()} />
      </Stack>
    );
  }
}
