
post_patterns = [
    path("<int:user_id>/posts/", UserPostsView.as_view(), name="posts"),
    path("<int:user_id>/posts/<int:post_id>/", APostView.as_view(), name="posts"),
    path("<int:user_id>/posts/<int:post_id>/", APostView.as_view(), name="posts"),
]