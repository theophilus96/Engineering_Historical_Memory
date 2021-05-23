import React from "react";
import ListArticles from "../components/ListArticles";
import ListWelcome, { ListShape } from "../components/ListWelcome";
export default function ArticlesList() {
  return (
    <div>
      <ListWelcome />
      <ListShape />
      <ListArticles />
    </div>
  );
}
