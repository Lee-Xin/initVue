function domain(){
    let domain = null,
        env = process.env.NODE_ENV
    switch(env){
        case 'production':
            domain = {
                requestHost: 'http://localhost:3000'
            }
            break;
        default:
            domain = {
                requestHost: 'http://localhost:3000'
            }
            break;
    }
    return domain
}

export default domain()