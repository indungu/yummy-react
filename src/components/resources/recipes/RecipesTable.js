import React from 'react';
import { Table } from 'react-bootstrap';
import Pagination from '../../common/Pagination';
import SearchForm from '../../forms/SearchForm';

export default (props) => {
  if (props.data.length !== 0 && props.categoryId !== undefined) {
    return (
      <div>
        <div className="row">
          <AddRecipeButton
            categoryName={props.categoryName}
            categoryId={props.categoryId}
            onAddRecipeClick={props.onAddRecipeClick}
          />
          <SearchForm
            scope="Recipe Name"
            onChange={props.onQueryChange}
            onSubmit={props.onQuerySubmit}
          />
        </div>
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
            { props.data.map((data, index) => {
              return (
                <tr key={index} >
                  <td>{ data.name }</td>
                  <td>{ data.ingredients }</td>
                  <td>{ data.description }</td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-success btn-sm"
                        name={data.name}
                        onClick={props.launchEditPrompt}
                        data-toggle="modal"
                        data-target={`#edit${data.name}`}
                        style={{ marginRight: '5px' }}
                      >Edit Recipe
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        id={data.id}
                        name={data.name}
                        onClick={props.launchDeletePrompt}
                        data-toggle="modal"
                        data-target={`#${data.name}`}
                      >Delete Recipe
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Pagination
          pageCount={props.pages}
          showPageItems={props.handlePagination}
          activePage={props.page}
        />
      </div>
    );
  } else {
    return (
      <div className="" style={{ display: props.display }}>
        <AddRecipeButton
          categoryName={props.categoryName}
          categoryId={props.categoryId}
          onAddRecipeClick={props.onAddRecipeClick}
        />
        <p className="text-center info">
          You currently have no recipes for category {props.categoryName}.
        </p>
      </div>
    );
  }
};

const AddRecipeButton = (props) => {
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
