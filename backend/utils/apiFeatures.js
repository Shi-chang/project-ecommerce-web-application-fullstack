class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

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

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skipDocuments = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skipDocuments);
        return this;
    }
}

export default APIFeatures;