module.exports =(seqeulize, DataTyes) =>{
    
    const Users = seqeulize.define("Users",{
        id:{
            type: DataTyes.INTEGER,
            alllowNull:false,
            autoIncrement: true,
            primaryKey: true,
        },
        username:{
            type: DataTyes.STRING,
            alllowNull:false,
        },
        email:{
            type: DataTyes.STRING,
            alllowNull:false,
        },
        password:{
            type: DataTyes.STRING,
            alllowNull:false,
        },
        
    },
    {
        timestamps : false
    },
    )

    return Users
}

