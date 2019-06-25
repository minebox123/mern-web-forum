import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../utils/Spinner";
import { addComment, getPostById } from "../../actions/postActions";
import { Editor, EditorState } from "draft-js";
import createToolbarPlugin from "draft-js-static-toolbar-plugin";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton
} from "draft-js-buttons";

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];

class CreateComment extends Component {
  state = {
    attachments: false,
    editorState: EditorState.createEmpty()
  };

  onChange = editorState => this.setState({ editorState });
  setEditor = editor => {
    this.editor = editor;
  };
  focusEditor = () => {
    if (this.editor) {
      this.editor.focus();
    }
  };

  componentDidMount() {
    this.props.getPostById(this.props.match.params.post_id);
    this.focusEditor();
  }

  onAttachmentsClick = e =>
    this.setState({
      attachments: !this.state.attachments
    });

  render() {
    const { post } = this.props.post;
    const { attachments } = this.state;
    return (
      <React.Fragment>
        {post !== null ? (
          <React.Fragment>
            <div className="post">
              <div className="post-user">
                <div className="image-wrapper">
                  <img
                    src={`http://localhost:5000/${post.avatar}`}
                    alt="avatar"
                    className="profile-pic"
                  />
                </div>
                <h2 onClick={this.profileHandler} id={post.user}>
                  {post.name}
                </h2>
              </div>
              <div className="post-text">
                <h3>Theme: {post.theme}</h3>
                <p>Text: {post.text}</p>
                {post.file.length === 0 ? null : (
                  <React.Fragment>
                    <p className="attachments">
                      Attachments{" "}
                      <i
                        className="fas fa-angle-down"
                        onClick={this.onAttachmentsClick}
                      />
                    </p>
                    {!attachments ? null : (
                      <img
                        src={`http://localhost:5000/${post.file[0]}`}
                        alt="user's file"
                        className="attachments-files"
                      />
                    )}
                  </React.Fragment>
                )}
              </div>
            </div>

            <div onClick={this.focusEditor} className="editor">
              <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
                plugins={plugins}
                ref={element => {
                  this.editor = element;
                }}
              />
              <Toolbar>
                {// may be use React.Fragment instead of div to improve perfomance after React 16
                externalProps => (
                  <div>
                    <BoldButton {...externalProps} />
                    <ItalicButton {...externalProps} />
                    <UnderlineButton {...externalProps} />
                    <CodeButton {...externalProps} />
                    {/* <Separator {...externalProps} />
                    <HeadlinesButton {...externalProps} /> */}
                    <UnorderedListButton {...externalProps} />
                    <OrderedListButton {...externalProps} />
                    <BlockquoteButton {...externalProps} />
                    <CodeBlockButton {...externalProps} />
                  </div>
                )}
              </Toolbar>
            </div>
          </React.Fragment>
        ) : (
          <Spinner />
        )}
      </React.Fragment>
    );
  }
}

CreateComment.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { addComment, getPostById }
)(CreateComment);
