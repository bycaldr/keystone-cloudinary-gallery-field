function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/** @jsx jsx */
import { jsx, ClassNames } from '@emotion/core';
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@arch-ui/button';
import { PlusIcon, PencilIcon } from '@arch-ui/icons';
import { borderRadius, gridSize, colors } from '@arch-ui/theme';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
const GalleryTile = SortableElement(({
  src,
  caption,
  state,
  onClick
}) => jsx(GridTile, null, jsx(Button, {
  variant: "subtle",
  onClick: onClick,
  css: {
    width: 120,
    height: 120,
    padding: 0,
    border: 0,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: state === 'active' ? borderRadius : borderRadius / 2,
    boxShadow: state === 'active' ? `0 0 0 3px ${colors.blue}` : '',
    transition: 'all .2s ease-out'
  }
}, jsx("span", {
  css: {
    opacity: 0,
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.45)',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    transition: 'opacity 0.2s ease-out',
    padding: gridSize * 1.5,
    '&:hover': {
      opacity: 1
    }
  }
}, jsx(PencilIcon, {
  css: {
    color: '#fff',
    opacity: 0.65,
    width: 24,
    height: 24
  }
})), jsx("img", {
  src: src,
  alt: "",
  title: caption,
  css: {
    position: 'relative',
    zIndex: 0,
    display: 'block',
    width: 120,
    height: 120,
    objectPosition: 'center',
    objectFit: 'cover',
    opacity: state === 'inactive' ? 0.4 : 1,
    transition: 'opacity .2s ease-out'
  }
}))));
const GalleryAddTile = SortableElement(({
  onClick,
  active
}) => jsx(GridTile, null, jsx(Button, {
  variant: "subtle",
  onClick: onClick,
  css: {
    padding: 0
  }
}, jsx("div", {
  css: {
    width: 120,
    height: 120,
    background: colors.N15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background .2s ease-out',
    borderRadius: active ? borderRadius : borderRadius / 2,
    boxShadow: active ? `0 0 0 3px ${colors.blue}` : '',
    transition: 'all .2s ease-out',
    '&:hover': {
      background: colors.N20
    }
  }
}, jsx(PlusIcon, {
  css: {
    color: colors.N50,
    width: 24,
    height: 24
  }
})))));
const GalleryList = SortableContainer(({
  items,
  onEdit,
  onCreate
}) => {
  const editing = items.find(x => x.isEditing);
  const editMode = !!editing;
  const createMode = editMode && !editing.src;
  return jsx(Grid, null, items.map(({
    id,
    src,
    caption,
    isEditing
  }, index) => {
    if (!src) return null;
    let editState = 'default';
    if (editMode) editState = isEditing ? 'active' : 'inactive';
    return jsx(GalleryTile, {
      key: id,
      id: id,
      src: src,
      caption: caption,
      state: editState,
      onClick: () => onEdit(id),
      index: index,
      value: id
    });
  }), jsx(GalleryAddTile, {
    onClick: onCreate,
    index: items.length,
    value: "create",
    active: createMode,
    disabled: true
  }));
});

const FieldGallery = ({
  images,
  onEdit,
  onCreate,
  onMove
}) => jsx(ClassNames, null, ({
  css
}) => jsx(GalleryList, {
  items: images,
  onEdit: onEdit,
  onCreate: onCreate,
  axis: "xy",
  onSortEnd: ({
    oldIndex,
    newIndex
  }) => onMove(oldIndex, newIndex),
  distance: 2,
  helperClass: css`
          z-index: 5;
        `
}));

const Grid = props => jsx("div", _extends({
  css: {
    display: 'flex',
    flexWrap: 'wrap',
    maxHeight: 324,
    overflowY: 'auto'
  }
}, props));

const GridTile = props => jsx("div", _extends({
  css: {
    flexShrink: 0,
    padding: gridSize * 0.75
  }
}, props));

FieldGallery.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    src: PropTypes.string,
    caption: PropTypes.string,
    isEditing: PropTypes.bool
  }))
};
FieldGallery.defaultProps = {
  images: []
};
export default FieldGallery;