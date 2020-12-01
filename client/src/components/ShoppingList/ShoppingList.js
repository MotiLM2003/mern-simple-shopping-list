import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  getItems,
  addItem,
  deleteItem,
  updateItem,
} from '../../actions/itemAction';

import {
  setStatus,
  updateModel,
  closeModel,
} from '../../actions/itemModelActions';
import PropsTypes from 'prop-types';
import ShoppingListItem from './ShoppingListItem';
import { motion, AnimatePresence } from 'framer-motion';
import { itemsContainerVariants } from './motionVarirants';

const ShoppingList = ({
  getItems,
  item,
  addItem,
  deleteItem,
  updateItem,
  setStatus,
  updateModel,
  closeModel,
}) => {
  const newItemNameRef = useRef();

  useEffect(() => {
    // getting list of items;

    getItems();
  }, [getItems]);

  const onUpdate = (item) => {
    updateItem(item);
  };

  const onDelete = (id) => {
    deleteItem(id);
  };

  const renderNewItem = () => ({
    header: 'Add new item',
    jsx: (
      <div>
        <div>name:</div>
        <diiv>
          <input type='text' ref={newItemNameRef} />
          <button
            className='btn btn-dark'
            className='btn btn-dark'
            onClick={() => {
              addItem({ name: newItemNameRef.current.value });
              closeModel();
            }}
          >
            Add
          </button>
        </diiv>
      </div>
    ),
    isOpen: true,
  });

  const renderUpdateItem = (item) => ({
    header: 'Update shopping item',
    jsx: (
      <div>
        <div>name:</div>
        <div>
          <input type='text' ref={newItemNameRef} defaultValue={item.name} />
          <button
            onClick={() => {
              onUpdate({ ...item, name: newItemNameRef.current.value });
              closeModel();
            }}
          >
            Update
          </button>
        </div>
      </div>
    ),
    isOpen: true,
  });

  return (
    <motion.div className='container'>
      <buttno
        className='btn btn-dark mb-2'
        onClick={() => updateModel(renderNewItem())}
      >
        Add Item
      </buttno>

      <motion.div
        className='list-group'
        variants={itemsContainerVariants}
        initial='hidden'
        animate='visible'
      >
        {item.items.map((item) => {
          return (
            <ShoppingListItem
              key={item.id}
              item={item}
              onUpdate={() => {
                updateModel(renderUpdateItem(item));
              }}
              onDelete={onDelete}
            />
          );
        })}
      </motion.div>
    </motion.div>
  );
};

ShoppingList.propTypes = {
  getItems: PropsTypes.func.isRequired,
  addItem: PropsTypes.func.isRequired,
  deleteItem: PropsTypes.func.isRequired,
  updateItem: PropsTypes.func.isRequired,
  item: PropsTypes.object.isRequired,
};

const stateToProps = (state) => ({
  item: state.item,
  itemModel: state.itemModel,
});

export default connect(stateToProps, {
  getItems,
  addItem,
  deleteItem,
  updateItem,
  setStatus,
  updateModel,
  closeModel,
})(ShoppingList);
