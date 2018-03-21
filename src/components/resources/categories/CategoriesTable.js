import { Table } from 'react-bootstrap';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import DeletePromptModal from '../../common/DeletePromptModal';
import axiosInstance from '../../common/AxiosIntance';
import CategoriesEditModal from '../../resources/categories/CategoriesEditModal';

class CategoriesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayModal: 'none',
      displayEditModal: 'none',
      toDelete: '',
      categoryId: '',
      categoryName: '',
      categoryDescription: '',
    };

    this.launchDeletePrompt = this.launchDeletePrompt.bind(this);
    this.dismissModal = this.dismissModal.bind(this);
    this.launchEditPrompt = this.launchEditPrompt.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    this.handleEditCategory = this.handleEditCategory.bind(this);
    this.onCategoryFieldsChange = this.onCategoryFieldsChange.bind(this);
  }

  // Launch category delete propmt
  launchDeletePrompt(e) {
    this.setState({ toDelete: e.target.name });
    this.setState({ displayModal: 'block' });
  }

  // Hide/dismiss modal
  dismissModal() {
    this.setState({ displayModal: 'none' });
    this.setState({ displayEditModal: 'none' });
    this.setState({ toDelete: '' });
  }

  // Handle actual delete on confirmation
  handleDeleteCategory() {
    const categoryToDelete = this.props.data.filter((category) => {
      return category.name === this.state.toDelete;
    });
    axiosInstance
      // eslint-disable-next-line
      .delete('/category/' + categoryToDelete[0].id)
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

  // Launch category delete propmt
  launchEditPrompt(e) {
    e.preventDefault();
    const categoryToBeEdited = this.props.data.filter((category) => {
      return category.name === e.target.name;
    });
    this.setState({
      categoryId: categoryToBeEdited[0].id,
      categoryName: categoryToBeEdited[0].name,
      categoryDescription: categoryToBeEdited[0].description,
      displayEditModal: 'block',
    });
  }

  // On category field change
  onCategoryFieldsChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  // Handle actual edit on confirmation
  handleEditCategory(event) {
    event.preventDefault();
    const categoryDetails = {
      name: this.state.categoryName,
      description: this.state.categoryDescription,
    };
    axiosInstance
      .put(`/category/${this.state.categoryId}`, categoryDetails)
      .then((response) => {
        if (response.data) {
          toast.success(response.data.message);
        }
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
        <CategoriesEditModal
          display={this.state.displayEditModal}
          onEditSubmit={this.handleEditCategory}
          onChange={this.onCategoryFieldsChange}
          name={this.state.categoryName}
          description={this.state.categoryDescription}
          hide={this.dismissModal}
        />
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
                  <td>{ data.name }</td>
                  <td>{ data.description }</td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-primary btn-sm"
                        id={data.id}
                        name={data.name}
                        onClick={this.props.listRecipes}
                        style={{ marginRight: '5px' }}
                      >View Recipes
                      </button>
                      <button
                        className="btn btn-success btn-sm"
                        name={data.name}
                        onClick={this.launchEditPrompt}
                        data-toggle="modal"
                        // eslint-disable-next-line
                        data-target={'#'+data.name}
                        style={{ marginRight: '5px' }}
                      >Edit Category
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        name={data.name}
                        onClick={this.launchDeletePrompt}
                        data-toggle="modal"
                        // eslint-disable-next-line
                        data-target={'#'+data.name}
                      >Delete Category
                      </button>
                    </div>
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
