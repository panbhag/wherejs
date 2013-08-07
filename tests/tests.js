

var should = chai.should();
//alert(1);



describe("where method",function(){
     //pending things
     // negative assertions, create from assertion class


    it("match properties at level one",function(){
    
         var input = [{x:1,y:2},{x:3,y:4}];
         
         var output = where(input,{x:1});
         output.should.have.length(1);
		 output.should.not.contain.a.thing.with.property("x",2);
    })

    it("match properties at level two ,object notation",function(){
    
         var input = [{name:{fname:"Pankaj",lname:"B"} },{name:{fname:"Sam",lname:"J"} }];
         
         var output = where(input,{name:{fname:"Pankaj"} } );
         output.should.have.length(1);
		 //output.should.contain.a.thing.with.property("fname","Pankaj");
		 output.should.contain.a.thing.that.deep.equals({name:{fname:"Pankaj",lname:"B"}});
		 output.should.not.contain.a.thing.that.deep.equals({name:{fname:"Sam",lname:"J"}});
    })

	it("match properties at level two ,string notation",function(){
    
         var input = [{name:{fname:"Pankaj",lname:"B"} },{name:{fname:"Sam",lname:"J"} }];
         
         var output = where(input,{'name.fname':"Pankaj" } );
         output.should.have.length(1);
		 output.should.contain.a.thing.that.deep.equals({name:{fname:"Pankaj",lname:"B"}});
		 output.should.not.contain.a.thing.that.deep.equals({name:{fname:"Sam",lname:"J"}});

    })

	it("selector $ne",function(){
    
         var input = [{x:1},{x:2},{x:3}];
         
         var output = where(input,{x:{$ne:1}});
         output.should.have.length(2);
		 console.log(output);
		 output.should.not.contain.a.thing.with.property("x", 1);
    })

    it("selector $gt",function(){
    
         var input = [{x:1},{x:2},{x:3}];
         
         var output = where(input,{x:{$gt:1}});
         output.should.have.length(2);
		 console.log(output);
		 output.should.not.contain.a.thing.with.property("x", 1);
    })


    it("selector $gte",function(){
    
         var input = [{x:1},{x:2},{x:3}];
         
         var output = where(input,{x:{$gte:2}});
         output.should.have.length(2);
		 console.log(output);
		 output.should.not.contain.a.thing.with.property("x", 1);
    })

    it("selector $lt",function(){
    
         var input = [{x:1},{x:2},{x:3}];
         
         var output = where(input,{x:{$lt:3}});
         output.should.have.length(2);
		 console.log(output);
		 output.should.not.contain.a.thing.with.property("x", 3);
    })

    it("selector $lte",function(){
    
         var input = [{x:1},{x:2},{x:3}];
         
         var output = where(input,{x:{$lte:2}});
         output.should.have.length(2);
		 output.should.not.contain.a.thing.with.property("x", 3);
    })

    it("selector $in",function(){
    
         var input = [{x:1},{x:2},{x:3}];
         
         var output = where(input,{x:{$in:[1,2]}});
         output.should.have.length(2);
		 output.should.not.contain.a.thing.with.property("x", 3);
    })

    it("selector $nin",function(){
    
         var input = [{x:1},{x:2},{x:3}];
         
         var output = where(input,{x:{$nin:[1,2]}});
         output.should.have.length(1);
		 output.should.not.contain.a.thing.with.property("x", 1);
		 output.should.not.contain.a.thing.with.property("x", 2);
    })

    it("selector $all",function(){
    
         var input = [{x:[1]},{x:[1,2]},{x:[2,3,1]}];
         
         var output = where(input,{x:{$all:[1,2,3]}});
         output.should.have.length(1);
		 output.should.contain.a.thing.that.deep.equals({"x" : [2,3,1]});
		 output.should.not.contain.a.thing.that.deep.equals({"x":[1]});
		 output.should.not.contain.a.thing.that.deep.equals({"x":[1,2]});

    })

    it("selector $or",function(){
    
         var input = [{x:1},{x:2},{x:3}];
         
         var output = where(input,{x:{$or:[{$gt:2},{$lt:2}]   }});
         output.should.have.length(2);
		 output.should.not.contain.a.thing.with.property("x", 2);
		 output.should.contain.a.thing.with.property("x", 1);
		 output.should.contain.a.thing.with.property("x", 3);

    })
    
	it("selector $and",function(){
    
         var input = [{x:1},{x:2},{x:3}];
         
         var output = where(input,{x:{$and:[{$ne:2},{$gt:1}]   }});
         output.should.have.length(1);
		 output.should.not.contain.a.thing.with.property("x", 2);
		 output.should.not.contain.a.thing.with.property("x", 1);
		 output.should.contain.a.thing.with.property("x", 3);
    })

    it("selector $not",function(){
    
         var input = [{x:1},{x:2},{x:3}];
         
         var output = where(input,{x:{$not:{$gt:1}}});
         output.should.have.length(1);
		 output.should.not.contain.a.thing.with.property("x", 2);
		 output.should.not.contain.a.thing.with.property("x", 3);
		 output.should.contain.a.thing.with.property("x", 1);
    })

    it("selector $nor",function(){
    
         var input = [{x:1},{x:2},{x:3}];
         
         var output = where(input,{x:{$nor:[{$lte:1},{$gte:3}]   }});
         output.should.have.length(1);
		 output.should.not.contain.a.thing.with.property("x", 1);
		 output.should.not.contain.a.thing.with.property("x", 3);
		 output.should.contain.a.thing.with.property("x", 2);
    })

  
   it("selector $size",function(){
    
         var input = [{x:[1]},{x:[1,2]},{x:[2,3,1]}];
         
         var output = where(input,{x:{$size:3}});
         output.should.have.length(1);
		 output.should.contain.a.thing.that.deep.equals({"x" : [2,3,1]});
		 output.should.not.contain.a.thing.that.deep.equals({"x":[1]});
		 output.should.not.contain.a.thing.that.deep.equals({"x":[1,2]});
    })

   it("selector elemMatch",function(){
    
         var input = [ {x:[{a:1,b:2},{a:2,b:3}]}, {x:[{a:3,b:4},{a:4,b:5}]}     ];
         
         var output = where(input,{x:{$elemMatch:{a:1,b:2}} });
         output.should.have.length(1);
		 output.should.contain.a.thing.that.deep.equals({x:[{a:1,b:2},{a:2,b:3}]});
		 output.should.not.contain.a.thing.that.deep.equals({x:[{a:3,b:4},{a:4,b:5}]});
    })

   it("selector where",function(){
    
         var input =    [{x:1},{x:2},{x:3}];
         
         var output = where(input, {x:{$where:function( e){ return e==1}} });
         output.should.have.length(1);
		 output.should.not.contain.a.thing.with.property("x", 2);
		 output.should.not.contain.a.thing.with.property("x", 3);
		 output.should.contain.a.thing.with.property("x", 1);

    })


   it("without where, when condition is a function",function(){
    
         var input =    [{x:1},{x:2},{x:3}];
         
         var output = where(input, {x:function( e){ return e==1} } );
         output.should.have.length(1);
		 output.should.not.contain.a.thing.with.property("x", 2);
		 output.should.not.contain.a.thing.with.property("x", 3);
		 output.should.contain.a.thing.with.property("x", 1);

    })

    

})




