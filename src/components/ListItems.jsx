import React, { forwardRef } from "react";

const ListItems = forwardRef(function ListItems(props, ref) {
  // add to refs array function
  const addToRefs = (el) => {
    if (el && !ref.current.includes(el)) {
      ref.current.push(el);
    }
  };

  // get items
  const items = props.items;

  // list items function
  const listItems = items.map((item) => (
    <p className={item.className} key={item.id} ref={addToRefs}>
      {item.content}
    </p>
  ));

  // JSX
  return <>{listItems}</>;
});

export default ListItems;
