Meteor.methods({
	addCate:function(obj){
		console.log(obj);
		categories.insert(obj);
	},
	editCate:function(id,obj){
		categories.update({_id:id},{$set:obj});
	},
	removeCate:function(id){
		this.unblock();
		categories.remove({_id:id});
		
	}
	


	
	
})