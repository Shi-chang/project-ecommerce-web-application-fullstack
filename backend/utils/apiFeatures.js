
// This feature class provides 3 methods for searching, filtering and pagination functions.
class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    // The search function that searches the products based on the keyword.
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }

    // The filter function that filters the products based on the price and ratings.
    filter() {
        const queryCopy = { ...this.queryStr };
        // delete unnecessary fields from query string
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(e => delete queryCopy[e]);

        // advanced filter for price and ratings
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    // The pagination function that returns the products on the specified page.
    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skipDocuments = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skipDocuments);
        return this;
    }
}

export default APIFeatures;
