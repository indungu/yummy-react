import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import axiosInatance from '../common/AxiosIntance';
import CategoriesModal from '../resources/categories/CategoriesModal';
import CategoriesTable from '../resources/categories/CategoriesTable';

const QuickAccess = () => {
  return (
    <div className="col-md-2 top">
      <div className="well">
        <button className="btn btn-outline-primary btn-block" data-toggle="modal" data-target="#categoryModal">
          Add Category
        </button>
      </div>
    </div>
  );
};


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
      categoryDescription: '',
      categories: [],
      redirect: false,
    };

    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.onCategoryFieldsChange = this.onCategoryFieldsChange.bind(this);
  }

  onCategoryFieldsChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }
  // handles adding user recipe categories
  handleAddCategory(e) {
    e.preventDefault();
    const categoryDetails = {
      category_name: this.state.categoryName,
      description: this.state.categoryDescription,
    };
    // Make Api request to add category
    axiosInatance
      .post('/category', categoryDetails)
      .then((response) => {
        if (response.data.categories) {
          toast.success('Category was successfully created!');
        }
        this.setState({ categories: [...this.state.categories, categoryDetails] });
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      });
  }
  // Handles user logout
  handleLogout() {
    // make axios call to invalidate current token
    const token = window.localStorage.getItem('token');
    axiosInatance
      .post('/auth/logout')
      .then((response) => {
        if (token) {
          window.localStorage.removeItem('token');
          this.setState({
            redirect: true,
          });
        }
        if (response.data.message) {
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      });
    return 0;
  }
  // Load categroies on component mount
  componentWillMount() {
    // Make API call to retrieve users categories
    axiosInatance
      .get('/category')
      .then((response) => {
        const categories = response.data.categories;
        if (categories) {
          this.setState({ categories: categories });
        }
      })
      .catch((error) => {
        if (error.response.data) {
          toast.error(error.response.data.message);
        }
      });
  }
  render() {
    this.isLoggedIn = true;
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <NavBar
          isLoggedIn={this.isLoggedIn}
          onLogoutClick={this.handleLogout}
        />
        <ToastContainer />
        <CategoriesModal
          onChange={this.onCategoryFieldsChange}
          onSubmit={this.handleAddCategory}
        />
        <div className="container">
          <QuickAccess />
          <section className="main">
            <div className="container-fluid">
              <CategoriesTable data={this.state.categories} />
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Dashboard;
