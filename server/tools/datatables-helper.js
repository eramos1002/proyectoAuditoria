module.exports = {
    toMongooseParams: query => {
        const parsedQuery = {
            datatables: query,
            fieldIndex: {},
            projection: [],
            filter: null,
            draw: query.draw,
            options: {
                sort: {},
                skip: parseInt(query.start) || 0,
                limit: parseInt(query.length) || 10
            }
        };

        if (Array.isArray(query.columns)) {
            for(let i = 0; i < query.columns.length; i++) {
                const column = query.columns[i];
                parsedQuery.projection.push(column.data);
                parsedQuery.fieldIndex[column.data] = { index: i, ...column };
            }
        }

        if (Array.isArray(query.order)) {
            for(let i = 0; i < query.order.length; i++) {
                const index = query.order[i].column;
                const field = query.columns[index].data;
                const dir = query.order[i].dir;
                parsedQuery.options.sort[field] = dir === 'desc' ? -1 : +1;
            }
        }

        return parsedQuery;
    }
}
