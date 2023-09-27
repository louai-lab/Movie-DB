const users = [ 
    { username: 'John', password: '1234' }, 
    { username: 'Jane', password: '5678' } 
];


const auth = (req,res,next) =>{

const {username,password} = req.headers;

const user = users.find(user => user.username === username && user.password === password);

if(user ){
    return next()
}
else{
    res.json({message:"you do not have a permission"})
}

// return  res.json({username: username, password:password})

}

module.exports = {auth};