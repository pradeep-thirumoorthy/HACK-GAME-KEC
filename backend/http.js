const HttpManager = ((app)=>{

// Handle HTTP requests
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });
})
export default HttpManager;