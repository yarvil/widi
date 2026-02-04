import React from "react";
import { useSelector } from "react-redux";
import {
    selectFeedPosts,
} from "@/app/store/posts/postsSelectors";
import Favorite from "../Favorite/Favorite";
import { FavoriteWrapper, Favorites } from './FavoriteListStyled'
import { selectorSearch } from "@/app/store/search/searchSelectors";

export default function FavoriteList() {
    const posts = useSelector(selectFeedPosts);
    const searchValue = useSelector(selectorSearch)
    const filteredPosts = posts
        .filter(post =>
            post.text.toLowerCase().includes(searchValue.toLowerCase())
        )
        .sort((a, b) => b.createdTime - a.createdTime);
    return (
        <Favorites>
            <FavoriteWrapper>
                {filteredPosts.map(post => (
                    <Favorite post={post} key={post.postId} />
                ))}
            </FavoriteWrapper>
        </Favorites>



    )

}