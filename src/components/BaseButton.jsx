import React from "react";

export default function BaseButton(props) {
  let style = "px-6 py-2 rounded";
  let disabled = false;
  if (props.disabled == true) {
    disabled = true;
  }
  let labelButton = props.label;
  const isLoading = props.isLoading;
  if (isLoading == true) {
    labelButton = "Loading...";
    style += " opacity-75";
    disabled = true;
  } else {
    style += "";
  }

  if (disabled == true) {
    style += " opacity-75";
  }

  switch (props.color) {
    case "indigo":
      if (disabled == false) {
        style +=
          " bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 text-white";
      } else if (disabled == true) {
        style += " bg-indigo-500 text-white";
      }
      break;
    case "red":
      if (disabled == false) {
        style +=
          " bg-red-500 hover:bg-red-600 active:bg-red-500 text-white";
      } else if (disabled == true) {
        style += " bg-red-500 text-white";
      }
      break;
    case "plain":
      style += " border border-slate-200 hover:bg-slate-100 active:bg-white";
      break;
  }

  return (
    <>
      <button type={props.type} className={style} disabled={disabled}>
        {labelButton}
      </button>
    </>
  );
}
