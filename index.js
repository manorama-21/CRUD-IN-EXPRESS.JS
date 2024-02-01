express = require('express')
app =express()
port =3000
Student = require('./database.js')

app.listen(port,()=>{
    console.log(`successfully running ${port}`)
})

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

              // --create--
app.get('/', async(req,res)=>{
    students = await Student.find();
    res.render('index.ejs',{
        page:"CRUD with express & mongoose ",
        title: "Read & Delete Operations",
        students:students
    })
})

             // --read---
app.get('/register',(req,res)=>{
    res.render('register')
})
         
app.post('/register',async(req,res)=>{
    const {name,mail,age}= req.body;
    newstudent = new Student({
        name, mail, age
    });
    studentsave = await newstudent.save();
    res.redirect('/');
})

            // --delete--
app.get('/delete/:id',async(req,res)=>
{
    const {id} = req.params;
    deleteStudent = await Student.findByIdAndDelete({_id:id});
    res.redirect('/')
})

            // --update--
app.get('/edit/:id', async(req,res)=>{
    id =req.params.id;
    editStudent = await Student.findById({_id:id});
    if(editStudent==null){
        res.redirect('/')
    }
    else{
        res.render('edit',{students: editStudent})
    };
   
})

app.post('/edit/:id', async(req,res)=>{
    id =req.params.id;
    const {name, mail, age} = req.body;
    updateStudent = await Student.findByIdAndUpdate({_id:id},
    {name, mail, age}, {new: true});
  res.redirect('/')
})