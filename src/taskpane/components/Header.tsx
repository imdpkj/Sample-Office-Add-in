import * as React from "react";
import { Text, ColorClassNames, FontWeights } from "office-ui-fabric-react";

const BoldStyle = { root: { fontWeight: FontWeights.semibold } };
const Classes: string = `${ColorClassNames.neutralLightBackground} app-header-section`;

const what = "An add-in to help you understand and learn features of Office JS API's for MS Word";

export interface HeaderProps {
  message: string;
}

export default class Header extends React.Component<HeaderProps> {
  render() {
    const { message } = this.props;

    return (
      <section className={Classes}>
        <Text variant="xLarge" styles={BoldStyle}>
          {message}
        </Text>
        <Text variant="small" block>
          {what}
        </Text>
      </section>
    );
  }
}
