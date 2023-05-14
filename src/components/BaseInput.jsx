import React from "react";

export default function BaseInput(props) {
  return (
    <>
      <input
        type={props.type}
        name={props.name}
        onChange={props.onChange}
        className="border border-inherit rounded p-2 w-full"
      />
    </>
  );
}