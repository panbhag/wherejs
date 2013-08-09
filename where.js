(function(){

 var root = this;

function selector(type,value,condition)
{
	
   var result;
			switch(type)
			{
				case 'eq':
					
					if(condition instanceof RegExp)
					{
						result = condition.test(value);
					}
					else
				    {
						result = value == condition;
					}
					break;
				case "ne":
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
				  result = value >= condition;
				  break;
				case "in":
				  result = _.contains(condition, value);
				  break;
				case "nin":
				  result = !(_.contains(condition, value) );
				  break;
				case "all":
					//value and condition should an array
				   result = _.difference(condition, value).length == 0;
        		   break;
				case "or":
					//value should an array
				   var conditions_array = condition;
				    result = _.some(conditions_array,function(c){
					
						var i_result = compare(value,c);
						return i_result;
				   });
				  break;

				 case 'startsWith':

				   result = (value[0] == condition);
				   break;
                 
				 case 'endsWith':

				   result = (value.slice(-1) == condition);
				   break;
			     case 'iMatch': // case insensitive match
				   result = (value.toLowerCase() == condition.toLowerCase() );
				   break;
				 case 'contains': //
					result = (value.indexOf(condition) != -1);
				  break;

				 case "and":
					//value should an array
				   var conditions_array = condition;
				    result = _.every(conditions_array,function(c){
								var i_result = compare(value,c);
								return i_result;
								});
     			   break;
				 case "nor": // every condition should be false
				   var conditions_array = condition;
				    result = _.every(conditions_array,function(c){
						var i_result = !compare(value,c);
						return i_result;
				   });
				  break;
				 case "not":

					result = !compare(value,condition);
  				  break;

				 case "exists":
					 //this will not work as the x[y] is null if y is there or not, have to change design a little
				   break;

				 case "elemMatch": //one of the elements of array should match this
					 //value is an array
					result = _.some(value,function(v){
						var i_result = compare(v,condition);
						return i_result;
				   });
				   break;

				  case 'size': //check the size of array
					  //value is an array
					  result = value.length == condition;
					  break;

				  case 'regex': 
					  result = condition.test(value);
				      break;

				  case 'where'://condition is a function
					  result = condition(value);
				      break;
	              default:
				  console.log("filter $" + filter + "is not defined");
				  result = false;
			}

			return result;
}


function compare(object,conditions)
{
	result = false;

	if(_.isBoolean(conditions) || _.isNumber(conditions) || _.isString(conditions) )
    {
	    conditions = {$eq:conditions};
	}

	if(_.isArray(conditions))
	{
		conditions = {$in:conditions};
	}

	if(_.isFunction(conditions))
    {
	    return conditions(object)
	} 

	for(key in conditions)
	{
		
		//check if key is $
		if(key[0] == "$")
		{
			var filter = key.substring(1);
			result = selector(filter,object,conditions[key]);
			break;
		}
		
		else if(_.isObject(conditions[key]))
		{
			result = compare(deepValue(object,key),conditions[key])

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


function where(list,conditions)
{
	var result = _.filter(list, function(object){ return compare(object,conditions) });
	return result;
}

root.where = where;

})(this)



