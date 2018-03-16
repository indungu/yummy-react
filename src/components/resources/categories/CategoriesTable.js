import { Table } from 'react-bootstrap';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import DeletePromptModal from '../../common/DeletePromptModal';
import axiosInstance from '../../common/AxiosIntance';

class CategoriesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayModal: 'none',
      toDelete: '',
    };

    this.launchDeletePrompt = this.launchDeletePrompt.bind(this);
    this.dismissModal = this.dismissModal.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
  }

  // Launch category delete propmt
  launchDeletePrompt(e) {
    this.setState({ toDelete: e.target.name });
    this.setState({ displayModal: 'block' });
    console.log(e.target.name);
    console.log(this.state.toDelete);
  }
  // Hide/dismiss modal
  dismissModal() {
    this.setState({ displayModal: 'none' });
  }

  // Handle actual delete on confirmation
  handleDeleteCategory() {
    console.log(this.state.toDelete);
    const categoryToDelete = this.props.data.filter((category) => {
      return category.category_name === this.state.toDelete;
    });
    console.log(categoryToDelete);
    axiosInstance
      // eslint-disable-next-line
      .delete('/category/' + categoryToDelete[0].category_id)
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message);
        }
        this.setState({ displayModal: 'none' });
        window.location.reload();
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      });
  }
  render() {
    if (!this.props.data) {
      return (
        <div className="row text-center">
          <p className="info">Please add some new categories.</p>
        </div>
      );
    }
    return (
      <div>
        <DeletePromptModal
          query="category"
          toBeDeleted={this.state.toDelete}
          handleDelete={this.handleDeleteCategory}
          display={this.state.displayModal}
          hide={this.dismissModal}
        />
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { this.props.data.map((data, index) => {
              return (
                <tr key={index} >
                  <td>{ data.category_name }</td>
                  <td>{ data.description }</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      name={data.category_name}
                      onClick={this.launchDeletePrompt}
                      data-toggle="modal"
                      // eslint-disable-next-line
                      data-target={'#'+data.category_name}
                    >Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CategoriesTable;
