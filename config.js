module.exports = {
    PORT: 3000,
    DATABASE: { URI: '-',
                NAME: 'DataBase',
                COLLECTION_USERS: 'Users',
                COLLECTION_TODOS: 'Todos'
    },
    JWT: {
        SECRET: "TEST",
        EXPIRES_IN: "1 hour"
    }
    }