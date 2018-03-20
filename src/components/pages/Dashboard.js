import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import axiosInstance from '../common/AxiosIntance';
import CategoriesModal from '../resources/categories/CategoriesModal';
import CategoriesTable from '../resources/categories/CategoriesTable';
import RecipesTable from '../resources/recipes/RecipesTable';
import RecipesAddModal from '../resources/recipes/RecipesAddModal';

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
      recipes: [],
      displayRecipesTable: 'none',
      displayRecipeAddModal: 'none',
      categoryId: '',
      categoryViewName: '',
      recipeName: '',
      recipeIngredients: '',
      recipesDescription: '',
    };

    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleAddRecipe = this.handleAddRecipe.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.onFormFieldsChange = this.onFormFieldsChange.bind(this);
    this.loadRecipes = this.loadRecipes.bind(this);
    this.launchRecipeAddModal = this.launchRecipeAddModal.bind(this);
    this.dismissRecipeAddModal = this.dismissRecipeAddModal.bind(this);
  }

  // On category field change
  onFormFieldsChange(e) {
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
    axiosInstance
      .post('/category', categoryDetails)
      .then((response) => {
        if (response.data.categories) {
          toast.success('Category was successfully created!');
          this.setState({ categories: [...this.state.categories, categoryDetails] });
        }
        window.location.reload();
      })
      .catch((error) => {
        if (error.response) {
          const errors = error.response.data.message;
          console.log(errors);
        }
      });
  }
  // Handles user logout
  handleLogout() {
    // make axios call to invalidate current token
    const token = window.localStorage.getItem('token');
    axiosInstance
      .post('/auth/logout')
      .then((response) => {
        if (token) {
          window.localStorage.removeItem('token');
          this.setState({
            redirect: true,
          });
          window.location.reload();
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
    axiosInstance
      .get('/category')
      .then((response) => {
        const categories = response.data.categories;
        if (categories) {
          this.setState({ categories: categories });
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      });
  }

  // Retrieve recipes for category
  loadRecipes(e) {
    e.preventDefault();
    const id = e.target.id;
    this.setState({
      categoryId: id,
      categoryViewName: e.target.name,
    });
    // Make API call to get recipes for specified category
    axiosInstance
      .get(`/category/${id}/recipes`)
      .then((response) => {
        if (response.data) {
          this.setState({
            recipes: response.data.recipes,
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
          this.setState({
            recipes: [],
          });
        }
      });
    this.setState({
      displayRecipesTable: 'block',
    });
  }

  // launch add recipe modal
  launchRecipeAddModal(e) {
    e.preventDefault();
    console.log(e.target.id);
    this.setState({
      displayRecipeAddModal: 'block',
    });
  }

  // Dismiss Recipes Add Modal
  dismissRecipeAddModal() {
    this.setState({
      displayRecipeAddModal: 'none',
    });
  }

  // Add recipe to category
  handleAddRecipe(e) {
    e.preventDefault();
    const id = e.target.id;
    const recipeDetails = {
      recipe_name: this.state.recipeName,
      ingredients: this.state.recipeIngredients,
      description: this.state.recipeDescription,
    };
    // Make Api request to add category
    axiosInstance
      .post(`/category/${id}/recipes`, recipeDetails)
      .then((response) => {
        if (response.data.categories) {
          toast.success('Category was successfully created!');
          this.setState({ categories: [...this.state.recipes, recipeDetails] });
        }
        window.location.reload();
      })
      .catch((error) => {
        if (error.response) {
          const errors = error.response.data.message;
          console.log(errors);
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
          onChange={this.onFormFieldsChange}
          onSubmit={this.handleAddCategory}
        />
        <div className="container">
          <QuickAccess />
          <section className="main">
            <div className="container-fluid">
              <CategoriesTable
                data={this.state.categories}
                onEditClick={this.launchEditPrompt}
                modalDisplay={this.state.displayModal}
                onRecipesView={this.loadRecipes}
                listRecipes={this.loadRecipes}
              />
            </div>
            <div className="container-fluid">
              <RecipesTable
                recipes={this.state.recipes}
                display={this.state.displayRecipesTable}
                categoryId={this.state.categoryId}
                categoryName={this.state.categoryViewName}
                onAddRecipeClick={this.launchRecipeAddModal}
                data={this.state.recipes}
              />
              <RecipesAddModal
                categoryId={this.state.categoryId}
                display={this.state.displayRecipeAddModal}
                hide={this.dismissRecipeAddModal}
                onChange={this.onFormFieldsChange}
                onSubmit={this.handleAddRecipe}
              />
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Dashboard;
