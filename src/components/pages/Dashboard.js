import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import axiosInstance from '../common/AxiosIntance';
import DeletePromptModal from '../common/DeletePromptModal';
import CategoriesModal from '../resources/categories/CategoriesModal';
import CategoriesTable from '../resources/categories/CategoriesTable';
import RecipesTable from '../resources/recipes/RecipesTable';
import RecipesAddModal from '../resources/recipes/RecipesAddModal';
import RecipesEditModal from '../resources/recipes/RecipesEditModal';

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
      displayRecipeEditModal: 'none',
      displayRecipeDeletePrompt: 'none',
      categoryId: '',
      categoryViewName: '',
      recipeName: '',
      recipeIngredients: '',
      recipeDescription: '',
      toDelete: '',
    };

    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleAddRecipe = this.handleAddRecipe.bind(this);
    this.handleEditRecipe = this.handleEditRecipe.bind(this);
    this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.onFormFieldsChange = this.onFormFieldsChange.bind(this);
    this.loadRecipes = this.loadRecipes.bind(this);
    this.launchRecipeAddModal = this.launchRecipeAddModal.bind(this);
    this.launchRecipeEditModal = this.launchRecipeEditModal.bind(this);
    this.launchRecipeDeletePrompt = this.launchRecipeDeletePrompt.bind(this);
    this.dismissRecipeAddModal = this.dismissRecipeAddModal.bind(this);
    this.dismissRecipeEditModal = this.dismissRecipeEditModal.bind(this);
    this.dismissRecipeDeletePrompt = this.dismissRecipeDeletePrompt.bind(this);
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
      name: this.state.categoryName,
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
          const errors = error.response.data;
          if (errors.message) {
            toast.error(errors.message);
          } else {
            toast.error('Please check your input and try again');
          }
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

  // launch Recipe edit modal
  launchRecipeEditModal(e) {
    const name = e.target.name;
    // Get the respective recipe
    const recipeToBeEdited = this.state.recipes.filter((recipe) => {
      return recipe.name === name;
    });
    // Populate the form fields
    const recipe = recipeToBeEdited[0];
    console.log(recipe);
    this.setState({
      recipeId: recipe.id,
      recipeName: recipe.name,
      recipeIngredients: recipe.ingredients,
      recipeDescription: recipe.description,
      displayRecipeEditModal: 'block',
    });
  }

  // Dismiss recipe edit modal
  dismissRecipeEditModal() {
    this.setState({
      displayRecipeEditModal: 'none',
    });
  }

  // launch Recipe delete modal
  launchRecipeDeletePrompt(e) {
    const name = e.target.name;
    console.log(name);
    this.setState({
      toDelete: name,
      displayRecipeDeletePrompt: 'block',
    });
  }

  // Dismiss recipe delete modal
  dismissRecipeDeletePrompt() {
    this.setState({
      displayRecipeDeletePrompt: 'none',
    });
  }

  // Add recipe to category
  handleAddRecipe(e) {
    e.preventDefault();
    const id = e.target.id;
    const recipeDetails = {
      name: this.state.recipeName,
      ingredients: this.state.recipeIngredients,
      description: this.state.recipeDescription,
    };
    // Make Api request to add category
    axiosInstance
      .post(`/category/${id}/recipes`, recipeDetails)
      .then((response) => {
        if (response.data.recipes) {
          toast.success('Recipe was successfully created!');
          this.setState({
            recipes: [...this.state.recipes, recipeDetails],
            displayRecipeAddModal: 'none',
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          const errors = error.response.data;
          console.log(errors);
        }
      });
  }

  // Handle recipe edit
  handleEditRecipe(e) {
    e.preventDefault();
    const recipeDetails = {
      name: this.state.recipeName,
      ingredients: this.state.recipeIngredients,
      description: this.state.recipeDescription,
    };
    // Make callto the API and update the respective recipe in state
    const { categoryId, recipeId } = this.state;
    axiosInstance
      .put(`/category/${categoryId}/recipes/${recipeId}`, recipeDetails)
      .then((response) => {
        if (response.data) {
          toast.success(response.data.message);
          this.setState({ displayRecipeEditModal: 'none' });
          window.location.reload();
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      });
  }

  // Handle recipe delete
  handleDeleteRecipe(e) {
    const { recipes } = this.state;
    e.preventDefault();
    const name = e.target.name;
    const categoryId = this.state.categoryId;
    // Get the specific recipe from recipe array in state
    const recipeToDelete = recipes.filter((recipe) => {
      return recipe.name === name;
    });
    // Get the index of the element in the state recipes array
    const indexToDelete = recipes.indexOf(recipeToDelete[0]);
    // Retrieve the recipe ID
    const recipeId = recipeToDelete[0].id;
    // make axios call and update state when successful
    axiosInstance
      .delete(`/category/${categoryId}/recipes/${recipeId}`)
      .then((response) => {
        if (response.data) {
          toast.success(response.data.message);
          this.setState({
            recipes: this.state.recipes.filter((_, i) => i !== indexToDelete),
            displayRecipeDeletePrompt: 'none',
          });
        }
      })
      .catch((error) => {
        if (error.response) {
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
                launchEditPrompt={this.launchRecipeEditModal}
                launchDeletePrompt={this.launchRecipeDeletePrompt}
                data={this.state.recipes}
              />
              <RecipesAddModal
                categoryId={this.state.categoryId}
                display={this.state.displayRecipeAddModal}
                hide={this.dismissRecipeAddModal}
                onChange={this.onFormFieldsChange}
                onSubmit={this.handleAddRecipe}
              />
              <RecipesEditModal
                display={this.state.displayRecipeEditModal}
                name={this.state.recipeName}
                ingredients={this.state.recipeIngredients}
                description={this.state.recipeDescription}
                hide={this.dismissRecipeEditModal}
                onChange={this.onFormFieldsChange}
                onEditSubmit={this.handleEditRecipe}
              />
              <DeletePromptModal
                query="recipe"
                toBeDeleted={this.state.toDelete}
                display={this.state.displayRecipeDeletePrompt}
                hide={this.dismissRecipeDeletePrompt}
                handleDelete={this.handleDeleteRecipe}
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
