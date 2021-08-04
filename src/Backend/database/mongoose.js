const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://ArthurMestdagh:Ollifant0603@materialsbv-2qlld.gcp.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})