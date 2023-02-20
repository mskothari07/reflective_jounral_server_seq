module.exports =(seqeulize, DataTyes) =>{
    
    const Blogs = seqeulize.define("Blogs",{
        id:{
            type: DataTyes.INTEGER,
            alllowNull:false,
            autoIncrement: true,
            primaryKey: true,

        },
        title:{
            type: DataTyes.STRING,
            alllowNull:false,
        },
        desc:{
            type: DataTyes.STRING,
            alllowNull:false,
        },
        img:{
            type: DataTyes.STRING,
            alllowNull:false,
        },
        date:{
            type: DataTyes.DATE,
            alllowNull:true,
        },
        userid:{
            type: DataTyes.INTEGER,
            alllowNull:false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        cat:{
            type: DataTyes.STRING
        },
    },
    {
        timestamps : false
    },
    )

    return Blogs
}