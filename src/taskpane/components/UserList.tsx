import * as React from "react";
import { User } from "./utils/Types";
import {
  DetailsList,
  IColumn,
  mergeStyleSets,
  IconButton,
  IIconProps,
  SelectionMode,
  DetailsListLayoutMode
} from "office-ui-fabric-react";

const classes = mergeStyleSets({
  avatarCell: {
    textAlign: "center",
    selectors: {
      "&:before": {
        content: ".",
        display: "inline-block",
        verticalAlign: "middle",
        height: "100%",
        width: "0px",
        visibility: "hidden"
      }
    }
  },
  avatarImg: {
    verticalAlign: "middle",
    maxHeight: "16px",
    maxWidth: "16px"
  },
  controlWrapper: {
    display: "flex",
    flexWrap: "wrap"
  },
  exampleToggle: {
    display: "inline-block",
    marginBottom: "10px",
    marginRight: "30px"
  },
  selectionDetails: {
    marginBottom: "20px"
  }
});

const selectIcon: IIconProps = { iconName: "DocumentReply" };

export interface UserListProps {
  users: User[];
  select: Function;
}

export default class UserList extends React.Component<UserListProps> {
  columns: IColumn[] = [
    {
      key: "avtar",
      name: "avatar",
      className: classes.avatarCell,
      minWidth: 16,
      maxWidth: 16,
      onRender: (user: User) => {
        return <img src={user.avatar} className={classes.avatarImg} />;
      }
    },
    {
      key: "id",
      name: "ID",
      minWidth: 20,
      maxWidth: 20,
      onRender: (user: User) => {
        return <span>{user.id}</span>;
      }
    },
    {
      key: "name",
      name: "Name",
      minWidth: 100,
      maxWidth: 100,
      onRender: (user: User) => {
        return <span>{user.first_name + " " + user.last_name}</span>;
      }
    },
    {
      key: "email",
      name: "Email",
      minWidth: 130,
      maxWidth: 130,
      onRender: (user: User) => {
        return <span>{user.email}</span>;
      }
    },
    {
      key: "select",
      name: "Render",
      minWidth: 20,
      maxWidth: 20,
      onRender: (user: User) => {
        return (
          <IconButton
            iconProps={selectIcon}
            title="Select"
            ariaLabel="Select"
            onClick={() => {
              this.props.select(user.id);
            }}
          />
        );
      }
    }
  ];

  render() {
    return (
      <div>
        <DetailsList
          items={this.props.users}
          compact={true}
          columns={this.columns}
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
        />
      </div>
    );
  }
}
