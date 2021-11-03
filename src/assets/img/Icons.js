import React from "react";
import { Icon } from "@ui-kitten/components";

export const BackIcon = (props) => (
  <Icon {...props} fill="#FFF" name="arrow-back" />
);
export const AlertIcon = (props) => (
  <Icon {...props} name="alert-circle-outline" />
);

export const CartIcon = (props) => (
  <Icon {...props} name="shopping-cart-outline" />
);

export const FileIcon = (props) => <Icon {...props} name="file-text-outline" />;

export const PersonIcon = (props) => <Icon {...props} name="person-outline" />;

export const MinusIcon = (props) => <Icon {...props} name="minus" />;

export const PlusIcon = (props) => <Icon {...props} name="plus" />;
