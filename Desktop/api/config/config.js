module.exports = {
    database: "sesamo",
    username: "postgres",
    password: "postgres",
    params: {
        dialect: "postgres",
        define:{
            underscored: false
        }
    },
    jwt:{
        secret: 's3cr3t',
        session: {session: false}
    }
}