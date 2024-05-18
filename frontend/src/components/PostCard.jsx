import PropTypes from "prop-types";

function PostCard({ post }) {
    return (
        <div className="rounded-lg p-3 mb-2 shadow bg-gray-50 border border-teal-200">
            {post.image ? (
                <div className="flex flex-col lg:flex-row">
                    <div className="mb-2 lg:mb-0 lg:mr-3 lg:w-1/3">
                        {post.image && (
                            <img
                                alt="post"
                                src={post.image && post.image.secure_url}
                                className="w-full rounded-md object-cover border-2 border-teal-200"
                            />
                        )}
                    </div>
                    <div className="lg:w-2/3">{post.content}</div>
                </div>
            ) : (
                <div className="w-full">{post.content}</div>
            )}

            <div className="text-gray-500 text-right">
                {post.createdAt.split("T")[0]}
            </div>
        </div>
    );
}

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
};

export default PostCard;
