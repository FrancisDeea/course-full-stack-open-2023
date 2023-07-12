const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;

    const maxLikes = Math.max(...blogs.map(blog => blog.likes));
    const { title, author, likes } = blogs.find(blog => blog.likes === maxLikes);
    return { title, author, likes }
}

const mostFamous = (blogs) => {
    if (blogs.length < 1) return null;

    const authors = blogs.reduce((acc, blog) => {
        if (blog.author in acc) {
            acc[blog.author]++;
        } else {
            acc[blog.author] = 1;
        }
        return acc;
    }, {});
    const maxBlogs = Math.max(...Object.values(authors));
    const mostFamousAuthor = Object.keys(authors).find(key => authors[key] === maxBlogs)

    return {
        author: mostFamousAuthor,
        blogs: maxBlogs
    }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostFamous }