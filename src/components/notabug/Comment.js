import React, { PureComponent } from "react";
import { ThingComment } from "snew-classic-ui";
import { Markdown } from "./Markdown";
import { Timestamp } from "./Timestamp";
import { Link } from "./Link";
import { NestedListing } from "./NestedListing";
import { ThingCommentEntry } from "./CommentEntry";

export class Comment extends PureComponent {
  constructor(props) {
    super(props);
    const { collapsed=false } = props;
    this.state = { collapsed };
    this.onToggleExpand = this.onToggleExpand.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.collapsed !== this.props.collapsed) {
      this.setState({ collapsed: nextProps.collapsed });
    }
  }

  render() {
    const { id, item, ups, downs, isMine } = this.props;

    return (
      <ThingComment
        ThingCommentEntry={ThingCommentEntry}
        Markdown={Markdown}
        Timestamp={Timestamp}
        Link={Link}
        NestedListing={NestedListing}
        id={id}
        body={item.body}
        name={id}
        parent_id={item.replyToId}
        created={item.timestamp / 1000}
        created_utc={item.timestamp / 1000}
        ups={ups}
        downs={downs}
        votableId={id}
        score={ups-downs}
        distinguished={isMine ? "me" : null}
        collapsed={this.state.collapsed}
        onToggleExpand={this.onToggleExpand}
      />
    );
  }

  onToggleExpand() {
    this.setState({ collapsed: !this.state.collapsed });
  }
}
