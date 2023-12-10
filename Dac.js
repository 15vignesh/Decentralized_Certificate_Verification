const express=require('express')
const path=require('path')
const dcapp=express();
const port=process.env.PORT || 8675;
dcapp.use(express.static(__dirname));
dcapp.set('view engine', 'ejs');
dcapp.set('views', __dirname);
dcapp.use(express.static(__dirname));
dcapp.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});
dcapp.get('/Verify',(req,res)=>{
    res.sendFile(path.join(__dirname,'verify.html'));
});

dcapp.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});