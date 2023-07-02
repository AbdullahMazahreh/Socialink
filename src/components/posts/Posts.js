import React, { Fragment, useContext } from "react";
import "./posts.css";
import { Onepost } from "../Index";
import { allData } from "../../context/Context";

function Posts() {
  const { allPosts } = useContext(allData);

  const displayPosts = allPosts?.map((post) => {
    return (
      <Onepost
        id={post.id}
        key={post.id}
        user={post.username}
        userid={post.userid}
        content={post.content}
        likes={post.likes}
        comments={post.comments}
        date={post.date}
        time={post.time}
        edited={post.edited}
      />
    );
  });

  return <Fragment>{displayPosts?.reverse()}</Fragment>;
}

export default Posts;
