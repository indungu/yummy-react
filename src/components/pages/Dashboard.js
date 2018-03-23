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
import SearchForm from '../forms/SearchForm';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
      categoryDescription: '',
      categories: [],
      categoryPage: 1,
      categoryPages: 1,
      redirect: false,
      recipes: [],
      recipePage: 1,
      recipePages: 1,
      displayRecipesTable: 'none',
      displayRecipeAddModal: 'none',
      displayRecipeEditModal: 'none',
      displayCategoryAddModal: 'none',
      displayRecipeDeletePrompt: 'none',
      categoryId: '',
      categoryViewName: '',
      recipeName: '',
      recipeIngredients: '',
      recipeDescription: '',
      toDelete: '',
      queryString: '',
    };

    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleAddRecipe = this.handleAddRecipe.bind(this);
    this.handleEditRecipe = this.handleEditRecipe.bind(this);
    this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleCategoryPagination = this.handleCategoryPagination.bind(this);
    this.handleRecipePagination = this.handleRecipePagination.bind(this);
    this.onFormFieldsChange = this.onFormFieldsChange.bind(this);
    this.onCategorySearch = this.onCategorySearch.bind(this);
    this.onRecipeSearch = this.onRecipeSearch.bind(this);
    this.loadRecipes = this.loadRecipes.bind(this);
    this.launchCategoryAddModal = this.launchCategoryAddModal.bind(this);
    this.launchRecipeAddModal = this.launchRecipeAddModal.bind(this);
    this.launchRecipeEditModal = this.launchRecipeEditModal.bind(this);
    this.launchRecipeDeletePrompt = this.launchRecipeDeletePrompt.bind(this);
    this.dismissCategoryAddModal = this.dismissCategoryAddModal.bind(this);
    this.dismissRecipeAddModal = this.dismissRecipeAddModal.bind(this);
    this.dismissRecipeEditModal = this.dismissRecipeEditModal.bind(this);
    this.dismissRecipeDeletePrompt = this.dismissRecipeDeletePrompt.bind(this);
  }

  // Launch category add modal
  launchCategoryAddModal() {
    this.setState({ displayCategoryAddModal: 'block' });
  }

  // Dismiss Recipes Add Modal
  dismissCategoryAddModal() {
    this.setState({
      displayCategoryAddModal: 'none',
    });
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
        const { categories } = response.data;
        if (categories) {
          toast.success('Category was successfully created!');
          const newCategory = {
            id: categories.id,
            name: categories.name,
            description: categories.description,
          };
          this.setState({
            categories: [...this.state.categories, newCategory],
            displayCategoryAddModal: 'none',
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          const { message } = error.response.data;
          if (message) {
            this.reportErrors(message);
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
          window.localStorage.removeItem('username');
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
    this.getCategories(this.state.categoryPage, this.state.queryString);
  }

  // Search for category
  onCategorySearch(e) {
    e.preventDefault();
    const queryString = this.state.queryString;
    const page = 1;
    this.getCategories(page, queryString);
  }

  // load categories
  getCategories(pageNumber, query) {
    // Make API call to retrieve users categories
    if (!query) {
      axiosInstance
        .get(`/category?page=${pageNumber}`)
        .then((response) => {
          const categories = response.data.categories;
          const pages = response.data.page_details.pages;
          if (categories) {
            this.setState({
              categories: categories,
              categoryPages: pages,
              categoryPage: pageNumber,
            });
          }
        })
        .catch((error) => {
          if (error.response) {
            // toast.error(error.response.data.message);
          }
        });
    } else {
      axiosInstance
        .get(`/category?page=${pageNumber}&q=${query}`)
        .then((response) => {
          const categories = response.data.categories;
          const pages = response.data.page_details.pages;
          if (categories) {
            this.setState({
              categories: categories,
              categoryPages: pages,
              categoryPage: pageNumber,
            });
          }
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data.message);
          }
        });
    }
  }

  // Handle Recipe Search
  onRecipeSearch(e) {
    e.preventDefault();
    const { categoryId, queryString } = this.state;
    const page = 1;

    // Get recipes that meet search creterion and return
    // the first page of the results
    this.getRecipes(categoryId, page, queryString);
  }

  // Retrieve recipes for category
  loadRecipes(e) {
    e.preventDefault();
    const id = e.target.id;
    const { recipePage } = this.state;
    this.setState({
      categoryId: id,
      categoryViewName: e.target.name,
    });
    // Retrieve the specified recipes
    this.getRecipes(id, recipePage);
    this.setState({
      displayRecipesTable: 'block',
    });
  }

  // Get recipes
  getRecipes(categoryId, page, query) {
    // Make API call to get recipes for specified category
    if (!query) {
      axiosInstance
        .get(`/category/${categoryId}/recipes?page=${page}`)
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
    } else {
      axiosInstance
        .get(`/category/${categoryId}/recipes?q=${query}&page=${page}`)
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
    }
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
          const newRecipe = response.data.recipes[0];
          toast.success('Recipe was successfully created!');
          this.setState({
            recipes: [...this.state.recipes, newRecipe],
            displayRecipeAddModal: 'none',
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data.errors) {
            this.reportErrors(error.response.data.errors);
          }
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
    // Make call to the API and update the respective recipe in state
    const { categoryId, recipeId } = this.state;
    axiosInstance
      .put(`/category/${categoryId}/recipes/${recipeId}`, recipeDetails)
      .then((response) => {
        if (response.data) {
          toast.success(response.data.message);
          const page = 1;
          this.getRecipes(categoryId, page);
          this.setState({ displayRecipeEditModal: 'none' });
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

  // Handle category pagination
  handleCategoryPagination(e) {
    e.preventDefault(e);
    const page = e.target.id;
    this.getCategories(page);
  }

  // Handle recipes pagination
  handleRecipePagination(e) {
    e.preventDefault(e);
    const page = e.target.id;
    const { categoryId } = this.state;
    this.getRecipes(categoryId, page);
  }

  // Error reporter
  reportErrors(errors) {
    Object.keys(errors).map((fieldName) => {
      return errors[fieldName].map((errorMessage) => {
        return toast.error(errorMessage);
      });
    });
  }

  render() {
    this.isLoggedIn = true;
    this.sessionUser = window.localStorage.getItem('username');

    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <NavBar
          isLoggedIn={this.isLoggedIn}
          onLogoutClick={this.handleLogout}
          user={this.sessionUser}
        />
        <ToastContainer />
        <CategoriesModal
          onChange={this.onFormFieldsChange}
          onSubmit={this.handleAddCategory}
          display={this.state.displayCategoryAddModal}
          hide={this.dismissCategoryAddModal}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-2 top">
              <button
                className="btn btn-outline-primary btn-block"
                onClick={this.launchCategoryAddModal}
              >
                Add Category
              </button>
            </div>
            <div
              className="col-md-10"
              style={{ marginTop: '10px' }}
            >
              <SearchForm
                scope="Category Name"
                onChange={this.onFormFieldsChange}
                onSubmit={this.onCategorySearch}
              />
            </div>
          </div>
          <div className="content">
            <div>
              <CategoriesTable
                data={this.state.categories}
                onEditClick={this.launchEditPrompt}
                modalDisplay={this.state.displayModal}
                onRecipesView={this.loadRecipes}
                listRecipes={this.loadRecipes}
                pages={this.state.categoryPages}
                page={this.state.categoryPage}
                handlePagination={this.handleCategoryPagination}
                repopulate={() => this.getCategories(1)}
              />
            </div>
            <div>
              <RecipesTable
                recipes={this.state.recipes}
                display={this.state.displayRecipesTable}
                categoryId={this.state.categoryId}
                categoryName={this.state.categoryViewName}
                onAddRecipeClick={this.launchRecipeAddModal}
                launchEditPrompt={this.launchRecipeEditModal}
                launchDeletePrompt={this.launchRecipeDeletePrompt}
                data={this.state.recipes}
                onQueryChange={this.onFormFieldsChange}
                onQuerySubmit={this.onRecipeSearch}
                pages={this.state.recipePages}
                page={this.state.recipePage}
                handlePagination={this.handleRecipePagination}
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
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Dashboard;
