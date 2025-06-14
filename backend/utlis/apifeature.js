
class apifeature{
    constructor(query,querystr){
        this.query=query;
        this.querystr=querystr;
    }
    search(){
        const keyword=this.querystr.keyword ?{
            title:{
                $regex:this.querystr.keyword ,
                $options: "i" ,
            },
        } :{};
        this.query=this.query.find({...keyword});
        return this;
    }
    filter(){
        const copyquerystr={...this.querystr};
        const removequery=["keyword","page","limit"];
        removequery.forEach((ele) => delete copyquerystr[ele]);
        //filter for price 
        let querystr=JSON.stringify(copyquerystr); //we have to convert object to strig to modify the querystr { '$regex': 'd', '$options': 'i' } we have obj{ keyword: 'dsfl', price: '50000' } object
        querystr=querystr.replace(/\b(gt|lt|gte|lte)\b/g,(ele)=>`$${ele}`); 
        const newquerystr=JSON.parse(querystr);
        this.query=this.query.find(newquerystr);
        return this;

        
    }
    pagination(resultperpage){
        const currpage=Number(this.querystr.page) ||1;
        const skip=resultperpage*(currpage-1)
        this.query=this.query.limit(resultperpage).skip(skip);
        return this;
    }
}
module.exports= apifeature;