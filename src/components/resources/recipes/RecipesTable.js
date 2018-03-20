import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export default class RecipesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toEdit: '',
      toDelete: '',
    };
  }
  render() {
    if (this.props.recipes.length !== 0 && this.props.categoryId !== undefined) {
      console.log(this.props);
      return (
        <div>
          <AddRecipeButton
            categoryName={this.props.categoryName}
            categoryId={this.props.categoryId}
            onAddRecipeClick={this.props.onAddRecipeClick}
          />
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Ingredients</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { this.props.data.map((data, index) => {
                return (
                  <tr key={index} >
                    <td>{ data.recipe_name }</td>
                    <td>{ data.recipe_ingredients }</td>
                    <td>{ data.recipe_description }</td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-primary btn-sm"
                          id={data.recipe_id}
                          name={data.recipe_name}
                          onClick={this.props.listRecipes}
                          style={{ marginRight: '5px' }}
                        >View Recipe
                        </button>
                        <button
                          className="btn btn-success btn-sm"
                          name={data.recipe_name}
                          onClick={this.launchEditPrompt}
                          data-toggle="modal"
                          // eslint-disable-next-line
                          data-target={'#'+data.recipe_name}
                          style={{ marginRight: '5px' }}
                        >Edit recipe
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          name={data.recipe_name}
                          onClick={this.launchDeletePrompt}
                          data-toggle="modal"
                          // eslint-disable-next-line
                          data-target={'#'+data.recipe_name}
                        >Delete recipe
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
    } else {
      return (
        <div className="" style={{ display: this.props.display }}>
          <AddRecipeButton
            categoryName={this.props.categoryName}
            categoryId={this.props.categoryId}
            onAddRecipeClick={this.props.onAddRecipeClick}
          />
          <p className="text-center info">
            You currently have no recipes for category {this.props.categoryName}.
          </p>
        </div>
      );
    }
  }
}

const AddRecipeButton = (props) => {
  console.log(`child props ${props.onAddRecipeClick}`);
  return (
    <div className="col-md-2 add-recipe">
      <div className="well">
        <button
          className="btn btn-outline-primary btn-block"
          name={props.categoryName}
          id={props.categoryId}
          onClick={props.onAddRecipeClick}
        >Add Recipe
        </button>
      </div>
    </div>
  );
};
