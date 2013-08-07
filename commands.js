function where(list,conditions)
{


function selector(type,value,condition)
{ 
   var result;
			switch(type)
			{
				case "ne:
				  result = value != condition;
				  break;
				case "lt":
				  result = value < condition;
				  break;
				case "lte":
				  result = value <= condition;
				  break;
				case "gt":
				  result = value > condition;
				  break;
				case "gte":
				  result = value > condition;
				  break;
				case "in":
				  result = _.contains(condition, value);
				case "nin":
				  result = !(_.contains(condition, value) );
				case "all":
					//value and condition should an array
				   result = _.difference(condition, value).length == 0;
				case "or":
					//value should an array
				   var conditions_array = condition;
				    result = _.some(conditions_array,function(c){
					
						var i_result = compare(value,c);
						return i_result;
				   });
				 case "and":
					//value should an array
				   var conditions_array = condition;
				    result = _.every(conditions_array,function(c){
								var i_result = compare(value,c);
								return i_result;
								});
				 case "nor": // every condition should be false
				   var conditions_array = condition;
				    result = _.every(conditions_array,function(c){
						var i_result = !compare(value,c);
						return i_result;
				   });
				 case "not":

					result = !compare(value,condition);
				 case "exists":
					 //this will not work as the x[y] is null if y is there or not, have to change design a little
				 case "elemMatch": //one of the elements of array should match this
					 //value is an array
					result = _.some(value,function(v){
						var i_result = compare(v,condition);
						return i_result;
				   });	
				  case 'size': //check the size of array
					  //value is an array
					  result = value.length == condition;
				  case 'regex': 
					  result = condition.test(value);
				  case 'where'://condition is a function
				  {
					  result = condition(value);
				  }

	              default:
				  console.log("filter $" + filter + "is not defined");
				  result = false;
			}

			return result;
}

function compare(object,conditions)
{
	result = true;
	var key;
    for(key in conditions)
	{
		
		//check if key is $
		if(key[0] == "$")
		{
			var filter = key.substring(1);
			result = selector(filter,object,conditions[key]);
			break;
		}
		
		
		if(_.isObject(conditions[key]))
		{
			result = compare(object[key],conditions[key])

		}
		else
		{
		   result = deepValue(object,key) == conditions[key]
		}
		
		if(!result)
		{break;}
	}
	return result;

}

 function deepValue(obj, path){
    for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
        obj = obj[path[i]];
    };
    return obj;
};

	
	var result = _.filter(list, function(object){ return compare(object,conditions) });
	return result;
}

