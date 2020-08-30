import React from "react";
import { removeNote } from "../actions/note_actions";
import { connect } from "react-redux";
import EditNoteContainer from "./edit_note_container";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false, showEdit: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.showEdit = this.showEdit.bind(this);
  }

  handleClick() {
    if (this.state.show === false) {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
  }

  showEdit() {
    if (this.state.showEdit === false) {
      this.setState({ showEdit: true });
    } else {
      this.setState({ showEdit: false });
    }
  }

  handleDelete(e) {
    e.preventDefault();

    this.props.removeNote(this.props.note.id);
  }

  render() {
    let description;

    if (this.state.show === true) {
      description = (
        <div className="render-description">
          <p onClick={this.showEdit}>{this.props.note.description}</p>
        </div>
      );
    } else {
      description = <div></div>;
    }
    let editForm;
    if (this.state.showEdit === true) {
      editForm = (
        <div>
          <EditNoteContainer note={this.props.note} showEdit={this.showEdit} />
        </div>
      );
    } else {
      editForm = (
        <div>
          <h3 className="note-title" onClick={this.handleClick}>
            {this.props.note.title}
          </h3>

          {description}
        </div>
      );
    }

    return (
      <div className="note-item">
        <div className="note-display">{editForm}</div>
        <span onClick={this.handleDelete} className="delete-note">
          x
        </span>
      </div>
    );
  }
}

const mSTP = (state, ownProps) => {
  return {};
};

const mDTP = (dispatch) => ({
  removeNote: (id) => dispatch(removeNote(id)),
});

export default connect(mSTP, mDTP)(Note);
