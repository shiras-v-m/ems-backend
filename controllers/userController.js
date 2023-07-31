const users = require('../Models/userSchema')

exports.register = async (req, res) => {
    console.log("Inside register function");
    console.log(req.file);

    // res.send('Register request received')

    const file = req.file.filename
    const { fname, lname, email, mobile, gender, location, status } = req.body
    if (!fname || !lname || !email || !mobile || !gender || !location || !status || !file) {
        res.status(403).json("All inputs are required!!")
    }

    try {
        const preuser = await users.findOne({ email })
        if (preuser) {
            res.status(406).json("Employee alredy Registerd")
        }
        else {
            const newuser = new users({
                fname, lname, email, mobile, gender, status, profile: file, location
            })
            await newuser.save()
            res.status(200).json(newuser)
        }
    }
    catch (err) {
        res.status(401).json(err)
    }

}

//get allemployees

exports.getAllEmployees = async (req, res) => {
    console.log("inside get all employee fn");
    //get query

    const {search} = req.query
    console.log(search);
    const query = {
        fname:{$regex:search,$options:"i"}  //case inactive - $options:"i"
    }

    try {
        const allEmployees = await users.find(query)
        // console.log(allEmployees);
        res.status(200).json(allEmployees)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

//view user

exports.viewuser = async (req,res)=>{
    console.log("Inside view user fn");
    const {id} = req.params
    try{
         const  employee = await users.findOne({_id:id})
         if(employee){
            res.status(200).json(employee)
         }
         else{
            res.status(404).json("Employee not found")

         }
    }
    catch(err){
        res.status(401).json(err)
    }
}

//delete user


exports.removeUser = async(req,res)=>{
    //get id from req
    const {id} = req.params

    try{
        const removeItem = await users.findByIdAndDelete({_id:id})
        res.status(200).json(removeItem)
    }
    catch(err){
        res.status(401).json(err)
    }

}


// edit
exports.edit = async (req, res) => {
    console.log("Inside Eidt function");
    const {id}=req.params
    // console.log(req.file);

    // res.send('Register request received')


    const { fname, lname, email, mobile, gender, location, status,user_profile } = req.body
    const file = req.file?req.file.filename:user_profile
    // if (!fname || !lname || !email || !mobile || !gender || !location || !status || !file) {
    //     res.status(403).json("All inputs are required!!")
    // }

    try {
        const updateuser = await users.findByIdAndUpdate({ _id:id},{
            fname, lname, email, mobile, gender, status, profile:file, location
        },{
            new:true
        })
        await updateuser.save()
        res.status(200).json(updateuser)
       
    }
    catch (err) {
        res.status(401).json(err)
    }

}
